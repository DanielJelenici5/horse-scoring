import { Component, OnInit } from '@angular/core';
import { PlayerStats } from '../model/player-stats.model';
import { ActivatedRoute } from '@angular/router';
import { StatCalcService } from '../stat-calc.service';

@Component({
  selector: 'app-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.css']
})
export class PlayerStatsComponent implements OnInit {

  playerStat: PlayerStats;

  sortedData: PlayerStats[];

  displayedColumns: string[] = ["Games Played", "Games Won", "Win %", "Total Points", "Average Points per Game", "Average Points per Round", "Total Horses", "Avergae Horses per Game", "Average Horses per Round"];

  constructor(private ActivedRoute: ActivatedRoute, private statCalcService: StatCalcService) { }

  ngOnInit(): void {
   this.statCalcService.createStats();
   this.wait()

  }

  async wait(){
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    await sleep(1500)
    this.playerStat =  PlayerStats.getPlayerStats(this.ActivedRoute.snapshot.paramMap.get("name"));
    this.sortedData = new Array();
    this.sortedData.push(this.playerStat)
    console.log(this.playerStat)
  }

}
