import Database from './database/database';
import World from './game/world';
import WebSocket from './network/websocket';
import Parser from './util/parser';
import config from '../config';

class Main {
    webSocket: WebSocket;
    database: Database;
    parser: Parser;
    world: World;

    constructor() {
        console.info(`Initializing ${config.name} game engine...`);

        this.webSocket = new WebSocket(config.host, config.port, config.gver);
        this.database = new Database(config.database);
        this.parser = new Parser();
        this.world = null;

        this.webSocket.onWebSocketReady(() => {
            /**
             * Initialize the world after we have finished loading
             * the websocket.
             */

            const onWorldLoad = () => {
                console.info('World has successfully been created.');

                if (!config.allowConnectionsToggle)
                    this.world.allowConnections = true;

                const host =
                    config.host === '0.0.0.0' ? 'localhost' : config.host;
                console.info(
                    `Connect locally via http://${host}:${config.port}`
                );
            };

            this.world = new World(this.webSocket, this.getDatabase());

            this.world.load(onWorldLoad);
        });

        this.webSocket.onConnect((connection) => {
            if (this.world.allowConnections)
                if (this.world.isFull()) {
                    console.info(
                        'All the worlds are currently full. Please try again later.'
                    );

                    connection.sendUTF8('full');
                    connection.close();
                } else this.world.playerConnectCallback(connection);
            else {
                connection.sendUTF8('disallowed');
                connection.close();
            }
        });

        this.loadConsole();
    }

    loadConsole() {
        const stdin = process.openStdin();

        stdin.addListener('data', (data) => {
            const message = data.toString().replace(/(\r\n|\n|\r)/gm, '');
            const type = message.charAt(0);

            if (type !== '/') return;

            const blocks = message.substring(1).split(' ');
            const command = blocks.shift();

            if (!command) return;

            switch (command) {
                case 'players':
                    console.info(
                        `There are a total of ${this.getPopulation()} player(s) logged in.`
                    );

                    break;

                case 'registered':
                    this.world.database.registeredCount((count) => {
                        console.info(`There are ${count} users registered.`);
                    });

                    break;

                case 'deleteGuilds':
                    this.world.database.deleteGuilds();

                    break;

                case 'kill': {
                    const username = blocks.join(' ');

                    if (!this.world.isOnline(username)) {
                        console.info('Player is not logged in.');
                        return;
                    }

                    const player = this.world.getPlayerByName(username);

                    if (!player) {
                        console.info('An error has occurred.');
                        return;
                    }

                    this.world.kill(player);

                    break;
                }

                case 'resetPositions': {
                    const newX = parseInt(blocks.shift());
                    const newY = parseInt(blocks.shift());

                    // x: 325, y: 87

                    if (!newX || !newY) {
                        console.info(
                            'Invalid command parameters. Expected: /resetPositions <newX> <newY>'
                        );
                        return;
                    }

                    /**
                     * We are iterating through all of the users in the database
                     * and resetting their position to the paramters inputted.
                     * This is to be used when doing some game-breaking map
                     * updates. This command is best used in tandem with the
                     * `allowConnectionsToggle` to prevent users from logging
                     * in.
                     */

                    this.world.database.resetPositions(newX, newY, (result) => {
                        console.info(result);
                    });

                    break;
                }

                case 'allowConnections':
                    this.world.allowConnections = !this.world.allowConnections;

                    if (this.world.allowConnections)
                        console.info('Server is now allowing connections.');
                    else
                        console.info('The server is not allowing connections.');

                    break;
            }
        });
    }

    getDatabase() {
        return this.database.getDatabase();
    }

    getPopulation() {
        return this.world.getPopulation();
    }
}

// if (typeof String.prototype.startsWith !== 'function')
//     String.prototype.startsWith = function (str) {
//         return str.length > 0 && this.substring(0, str.length) === str;
//     };

// if (typeof String.prototype.endsWith !== 'function')
//     String.prototype.endsWith = function (str) {
//         return (
//             str.length > 0 &&
//             this.substring(this.length - str.length, this.length) === str
//         );
//     };

module.exports = Main;

new Main();
