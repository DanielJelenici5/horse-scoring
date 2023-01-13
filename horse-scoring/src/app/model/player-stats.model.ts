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
    public roundsPlayed: number;

    constructor(name, addToStaticList){
        this.name = name.toLowerCase();
        if(addToStaticList){
            PlayerStats.allPlayerStats.push(this);
        }
        this.gamesPlayed = 0;
        this.totalHorses =0;
        this.totalPoints = 0;
        this.gamesWon = 0;
        this.gamesLostOnHorses = 0;
        this.gamesLostOnPoints = 0;
        this.roundsPlayed = 0;

        this.placementFinished = new Map()

        for(let i =1; i <= 8; i++){
            this.placementFinished.set(i,0)
        }

    }

    public static playerStatsExist(name: string): boolean{
        for(let i =0; i < PlayerStats.allPlayerStats.length; i++){
            if(PlayerStats.allPlayerStats[i].name.toLowerCase() === name.toLowerCase()){
                return true;
            }
        }
        return false;
    }

    public static getPlayerStats(name: string): PlayerStats{
        for(let i =0; i < PlayerStats.allPlayerStats.length; i++){
            if(PlayerStats.allPlayerStats[i].name.toLowerCase() === name.toLowerCase()){
                return PlayerStats.allPlayerStats[i];
            }
        }
        return null;
    }
}
