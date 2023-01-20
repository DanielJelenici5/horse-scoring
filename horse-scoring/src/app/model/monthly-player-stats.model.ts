import { PlayerStats } from "./player-stats.model";

export class MonthlyPlayerStats extends PlayerStats {

    public month: string;
    public score: number;
    public static allMonthlyPlayerStats: MonthlyPlayerStats[] = new Array();
    public qualified: boolean = false;

    constructor(name, addToStaticList){
        super(name, false);
    }

    registerMonthlyPlayerStat(month, score){
        this.month = month;
        this.score = score;
        MonthlyPlayerStats.allMonthlyPlayerStats.push(this);
    }

    static getAllByMonth(month){
        return MonthlyPlayerStats.allMonthlyPlayerStats.filter(obj => obj.month === month)
    }


}
