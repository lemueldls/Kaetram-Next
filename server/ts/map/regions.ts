import * as _ from 'underscore';
import map from '../../data/map/world_server.json';
import Player from '../game/entity/character/player/player';

interface Region {
    x: number;
    y: number;
};

/**
 *
 */
class Regions {
    public zoneWidth: any;

    public zoneHeight: any;

    public linkedRegions: any;

    public regionWidth: any;

    public regionHeight: any;

    map: any;

    width: any;

    height: any;

    constructor(map) {
        this.map = map;

        this.width = this.map.width;
        this.height = this.map.height;

        this.zoneWidth = this.map.zoneWidth; // 25
        this.zoneHeight = this.map.zoneHeight; // 20

        this.regionWidth = this.map.regionWidth; // 40
        this.regionHeight = this.map.regionHeight; // 50

        this.linkedRegions = {};

        this.loadDoors();
    }

    loadDoors() {
        const { doors } = map;

        _.each(doors, (door) => {
            const regionId = this.regionIdFromPosition(door.x, door.y);
            const linkedRegionId = this.regionIdFromPosition(door.tx, door.ty);
            const linkedRegionPosition = this.regionIdToPosition(
                linkedRegionId
            );

            if (regionId in this.linkedRegions)
                this.linkedRegions[regionId].push(linkedRegionPosition);
            else this.linkedRegions[regionId] = [linkedRegionPosition];
        });
    }

    /**
     * This is dynamic approuch for getting player regions.
     * What we are doing is building surrounding regions according
     * to the player.
     */
    getDynamicRegions(player: Player) {
        // TODO: Dynamic approuch for getting player regions
    }

    // y y x y y
    // y y x y y
    // y x x x y
    // y y x y x
    // y y x y y

    getSurroundingRegions(id, offset = 1, stringFormat?: any): Region[] {
        const position = this.regionIdToPosition(id);
        const { x } = position;
        const { y } = position;

        let list = [];
        const stringList = [];

        for (
            let i = -offset;
            i <= offset;
            i++ // y
        )
            for (
                let j = -1;
                j <= 1;
                j++ // x
            )
                if (i > -2 || i < 2)
                    list.push({
                        x: x + j,
                        y: y + i
                    });

        _.each(this.linkedRegions[id], (regionPosition) => {
            if (
                !_.any(list, (regionPosition) => {
                    return regionPosition.x === x && regionPosition.y === y;
                })
            )
                list.push(regionPosition);
        });

        list = _.reject(list, (regionPosition) => {
            const gX = regionPosition.x;
            const gY = regionPosition.y;

            return (
                gX < 0 ||
                gY < 0 ||
                gX >= this.regionWidth ||
                gY >= this.regionHeight
            );
        });

        return stringFormat ? this.regionsToCoordinates(list) : list;
    }

    getAdjacentRegions(id, offset, stringFormat) {
        const surroundingRegions = this.getSurroundingRegions(id, offset);

        /**
         * We will have to leave this hardcoded to surrounding areas of
         * 9 since we will not be processing larger regions at
         * the moment
         */

        if (surroundingRegions.length !== 9) return;

        /**
         * 11-0 12-0 13-0
         * 11-1 12-1 13-1
         * 11-2 12-2 13-2
         */

        const centreRegions = this.regionIdToPosition(id);
        const adjacentRegions = [];

        _.each(surroundingRegions, (region) => {
            if (region.x !== centreRegions.x && region.y !== centreRegions.y)
                return;

            adjacentRegions.push(region);
        });

        return stringFormat
            ? this.regionsToCoordinates(adjacentRegions)
            : adjacentRegions;
    }

    forEachRegion(callback) {
        for (let x = 0; x < this.regionWidth; x++)
            for (let y = 0; y < this.regionHeight; y++) callback(`${x}-${y}`);
    }

    forEachSurroundingRegion(regionId, callback, offset) {
        if (!regionId) return;

        _.each(
            this.getSurroundingRegions(regionId, offset),
            (region: Region) => {
                callback(`${region.x}-${region.y}`);
            }
        );
    }

    forEachSurroundingRegion(regionId, callback, offset) {
        if (!regionId) return;

        _.each(this.getSurroundingRegions(regionId, offset), (region: any) => {
            callback(`${region.x}-${region.y}`);
        });
    }

    regionIdFromPosition(x, y) {
        return `${Math.floor(x / this.zoneWidth)}-${Math.floor(
            y / this.zoneHeight
        )}`;
    }

    regionIdToPosition(id) {
        const position = id.split('-');

        return {
            x: parseInt(position[0], 10),
            y: parseInt(position[1], 10)
        };
    }

    regionIdToCoordinates(id) {
        const position = id.split('-');

        return {
            x: parseInt(position[0]) * this.zoneWidth,
            y: parseInt(position[1]) * this.zoneHeight
        };
    }

    /**
     * Converts an array of regions from object type to string format.
     */
    regionsToCoordinates(regions: Region[]) {
        const stringList = [];

        _.each(regions, (region) => {
            stringList.push(`${region.x}-${region.y}`);
        });

        return stringList;
    }

    isSurrounding(regionId, toRegionId) {
        return this.getSurroundingRegions(regionId, 1, true).indexOf(regionId) > -1;
    }
}

export default Regions;
