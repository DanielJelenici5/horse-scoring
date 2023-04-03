import { HorseGame } from "./horse-game.model";

export class DatabaseObject {

    public id: string;
    public dateTime: Date | string;
    public players: string[];
    public numRounds: number;

    public scores; //ex: {"Danny": [10,2]}

    public tiebreakers;

    constructor(game: HorseGame, scores, tiebreaker = null){
        this.id = game.id;
        this.dateTime = game.dateTime;
        this.players = game.players;
        this.numRounds = game.numRounds;

        this.scores = scores

        this.tiebreakers = tiebreaker;

    }
}
