import _ from 'underscore';

import Packets from '../network/packets';

/**
 * This package is used for creating functions used all throughout the
 * game server.
 */
const Utils: { [key: string]: any } = {};

Utils.random = (range) => {
    return Math.floor(Math.random() * range);
};

Utils.randomRange = (min, max) => {
    return min + Math.random() * (max - min);
};

Utils.randomInt = (min, max) => {
    return min + Math.floor(Math.random() * (max - min + 1));
};

Utils.getDistance = (startX, startY, toX, toY) => {
    const x = Math.abs(startX - toX);
    const y = Math.abs(startY - toY);

    return x > y ? x : y;
};

Utils.positionOffset = (radius) => {
    return {
        x: this.randomInt(0, radius),
        y: this.randomInt(0, radius)
    };
};

/**
 * There is seriously no way two clients can end up with the same ID
 */
Utils.generateClientId = () => {
    return (
        this.randomInt(0, 1000000) +
        this.randomInt(0, 40000) +
        this.randomInt(0, 9000)
    );
};

Utils.generateInstance = (randomizer, id, modulo, posY?) => {
    return `${randomizer}${this.randomInt(0, id)}${randomizer}${this.randomInt(
        0,
        modulo
    )}${posY || 0}`;
};

Utils.generateRandomId = () => {
    return `${1}${this.random(0, 200)}${this.random(0, 20)}${2}`;
};

Utils.validPacket = (packet) => {
    const keys = Object.keys(Packets);
    const filtered = [];

    for (let i = 0; i < keys.length; i++)
        if (!keys[i].endsWith('Opcode')) filtered.push(keys[i]);

    return packet > -1 && packet < Packets[filtered[filtered.length - 1]] + 1;
};

Utils.getCurrentEpoch = () => {
    return new Date().getTime();
};

Utils.formatUsername = (username) => {
    return username.replace(/\w\S*/g, (string) => {
        return string.charAt(0).toUpperCase() + string.substr(1).toLowerCase();
    });
};

/**
 * This function is responsible for parsing a message and looking for special
 * characters (primarily used for colour codes). This function will be expanded
 * if necessary in the nearby future.
 */
Utils.parseMessage = (message) => {
    const messageBlocks = message.split('@');

    if (messageBlocks.length % 2 === 0) {
        console.warn('Improper message block format!');
        console.warn('Ensure format follows @COLOUR@ format.');
        return messageBlocks.join(' ');
    }

    const codeCount = messageBlocks.length / 2;

    _.each(messageBlocks, (block, index) => {
        if (index % 2 !== 0)
            // we hit a colour code.
            messageBlocks[
                index
            ] = `<span style="color:${messageBlocks[index]};">`;
    });

    for (let i = 0; i < codeCount; i++) messageBlocks.push('</span>');

    return messageBlocks.join(' ');
};

export default Utils;
