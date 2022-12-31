export class PlayerStats {

    public static allPlayerStats: PlayerStats[] = new Array();
    
    public name: string;
    public gamesPlayed: number;
    public totalHorses: number;
    public totalPoints: number;
    public placementFinished: Map<number, number>
    public gamesWon: number;
    public gamesLostOnPoints: number;
    public gamesLostOnHorses: number;

    constructor(name){
        this.name = name;
        PlayerStats.allPlayerStats.push(this);

        this.gamesPlayed = 0;
        this.totalHorses =0;
        this.totalPoints = 0;
        this.gamesWon = 0;
        this.gamesLostOnHorses = 0;
        this.gamesLostOnPoints = 0;

    }

    public static playerStatsExist(name: string): boolean{
        for(let i =0; i < PlayerStats.allPlayerStats.length; i++){
            if(PlayerStats.allPlayerStats[i].name === name){
                return true;
            }
        }
        return false;
    }

    public static getPlayerStats(name: string): PlayerStats{
        for(let i =0; i < PlayerStats.allPlayerStats.length; i++){
            if(PlayerStats.allPlayerStats[i].name === name){
                return PlayerStats.allPlayerStats[i];
            }
        }
        return null;
    }
}
