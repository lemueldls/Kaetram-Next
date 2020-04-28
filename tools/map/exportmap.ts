#!/usr/bin/env node

import fs from 'fs';
import file from '../file';
import processMap from './processmap';
config = { debugLevel: 'all' };

let source = process.argv[2];

function parseClient(data: any, destination: string) {
    const processedMap = processMap(data, { mode: 'client' });
    const map = JSON.stringify(processedMap);

    fs.writeFile(`${destination}.json`, map, (err) => {
        if (err) console.error(JSON.stringify(err));
        else console.info(`[Client] Map saved at: ${destination}.json`);
    });

    return processedMap;
}

function parseInfo(data: any, destination: string, clientMap: { depth: any }) {
    const mapData = processMap(data, { mode: 'info' });

    if (clientMap) mapData.depth = clientMap.depth;

    let map = JSON.stringify(mapData);

    fs.writeFile(`${destination}.json`, map, (err) => {
        if (err) console.error(JSON.stringify(err));
        else console.info(`[Client] Map saved at: ${destination}.json`);
    });

    map = `let mapData = ${map}`;

    fs.writeFile(`${destination}.js`, map, (err) => {
        if (err) console.error(JSON.stringify(err));
        else console.info(`[Client] Map saved at: ${destination}.js`);
    });
}

function parseServer(data: any, destination: string) {
    const map = JSON.stringify(
        processMap(data, {
            mode: 'server'
        })
    );

    fs.writeFile(`${destination}.json`, map, (err) => {
        if (err) console.error(JSON.stringify(err));
        else console.info(`[Server] Map saved at: ${destination}.json`);
    });
}

function onMap(data: any) {
    const clientMap = parseClient(data, '../../server/data/map/world_client');

    parseServer(data, '../../server/data/map/world_server');
    parseInfo(data, '../../client/data/maps/map', clientMap);
}

function getMap() {
    if (!source) source = 'data/map.json';

    file.exists(source, (exists: any) => {
        if (!exists) {
            console.error(`The file: ${source} could not be found.`);
            return;
        }

        fs.readFile(source, (err, map) => {
            if (err) throw err;

            onMap(JSON.parse(map.toString()));
        });
    });
}

getMap();
