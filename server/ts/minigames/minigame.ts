class Minigame {
    public id: any;

    public name: any;

    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    /**
     * Used to mark if `player` is in a minigame instance.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getState(_?) {
        return {
            id: this.id,
            name: this.name,
            team: this.team
        };
    }
}

export default Minigame;
