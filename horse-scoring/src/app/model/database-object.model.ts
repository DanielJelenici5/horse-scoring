import { HorseGame } from "./horse-game.model";

export class DatabaseObject {

    public id: string;
    public dateTime: Date;
    public players: string[];
    public numRounds: number;

    public scores; //ex: {"Danny": [10,2]}

    constructor(game: HorseGame, scores){
        this.id = game.id;
        this.dateTime = game.dateTime;
        this.players = game.players;
        this.numRounds = game.numRounds;

        this.scores = scores

    }
}
