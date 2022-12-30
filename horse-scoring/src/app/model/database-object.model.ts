import { HorseGame } from "./horse-game.model";

export class DatabaseObject {

    public id: string;
    public dateTime: Date;
    public players: string[];
    public numRounds: number;

    public rounds;
    public horses;

    constructor(game: HorseGame){
        this.id = game.id;
        this.dateTime = game.dateTime;
        this.players = game.players;
        this.numRounds = game.numRounds;

        this.rounds = this.mapToJson(game.rounds)
        this.horses = this.mapToJson(game.horses)
    }


    mapToJson(map){
        const toObject = (map = new Map) =>
        Object.fromEntries
          ( Array.from
              ( map.entries()
              , ([ k, v ]) =>
                  v instanceof Map
                    ? [ k, toObject (v) ]
                    : [ k, v ]
              )
          )

          return toObject(map);
    }
    

}
