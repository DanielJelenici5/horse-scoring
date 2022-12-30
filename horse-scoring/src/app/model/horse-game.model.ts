export class HorseGame {


    public id: string;
    public players: string[];
    public numRounds: number;
    public dateTime: Date;

    public static allGames : HorseGame[];

    // rounds start from 1
    rounds: Map<number, Map<string, number>>;

    horses: Map<number, Map<string, boolean>>;

    constructor(players: string[], rounds: number, dateTime: Date){
        if(HorseGame.allGames == null){
            HorseGame.allGames = new Array();
        }
        this.id = (+new Date * Math.random()).toString(36).substring(0,8) 
        this.players = players;
        this.numRounds = rounds;

        this.rounds = new Map();
        this.horses = new Map();

        this.dateTime = dateTime;

        for(let i = 1; i <= this.numRounds; i++){
            this.rounds.set(i,new Map());
            this.horses.set(i,new Map());
            for(let j =0; j< this.players.length; j++){
                let roundMap: Map<string, number>  = this.rounds.get(i);
                let horseMap: Map<string, boolean>  = this.horses.get(i);
                roundMap.set(this.players[j], 0);
                horseMap.set(this.players[j], false);
            }
        }
        HorseGame.allGames.push(this);
    }

    getSingleHorse(player: string, round: number){
        return this.horses.get(round).get(player)
    }

    setScore(player: string, round: number, score: number){
        let roundMap: Map<string, number>  = this.rounds.get(round);
        roundMap.set(player, score);
    }

    setHorse(player: string, round: number, horse: boolean){
        let horseMap: Map<string, boolean>  = this.horses.get(round);
        horseMap.set(player, horse);
    }

    getTotalScore(player: string): number {
        var totalscore: number = 0;
        for(let i = 1; i <= this.numRounds; i++){
            totalscore += this.rounds.get(i).get(player)
        }
        return totalscore;
    }

    getTotalHorses(player: string): number {
        var totalhorses: number = 0;
        for(let i = 1; i <= this.numRounds; i++){
            if(this.horses.get(i).get(player) == true){
                totalhorses += 1;
            }
        }
        return totalhorses;
    }

    static getGame(id: string): HorseGame{
        for(let i =0; i < HorseGame.allGames.length; i++){
            if(HorseGame.allGames[i].id === id){
                return HorseGame.allGames[i];
            }
        }
        return null;
    }
}
