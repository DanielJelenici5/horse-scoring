import { Component, OnInit } from '@angular/core';
import { PlayerStats } from '../model/player-stats.model';
import { ActivatedRoute } from '@angular/router';
import { StatCalcService } from '../stat-calc.service';

interface PlacementObject{
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  6: number;
  7: number;
  8: number;
}

@Component({
  selector: 'app-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.css']
})
export class PlayerStatsComponent implements OnInit {

  playerStat: PlayerStats;

  sortedData: PlayerStats[];

  placement: PlacementObject;

  placementFinishes: PlacementObject[];

  averagePlacement: number = 0;

  displayedColumns: string[] = ["Games Played", "Games Won", "Win %", "Total Points", "Average Points per Game", "Average Points per Round", "Total Horses", "Average Horses per Game", "Average Horses per Round", "Total Losses By Points", "Total Losses By Horses"];
  placemenetColumns: string[] = ["1st","2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];

  
  constructor(private ActivedRoute: ActivatedRoute, private statCalcService: StatCalcService) { }

  ngOnInit(): void {
    if(PlayerStats.allPlayerStats.length == 0){
      this.statCalcService.createStats();
    }
  
   this.getPlaterStats();
   this.fillPlacementStats();

  }

  async getPlaterStats(){
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    await sleep(1500)
    this.playerStat =  PlayerStats.getPlayerStats(this.ActivedRoute.snapshot.paramMap.get("name"));
    this.sortedData = new Array();
    this.sortedData.push(this.playerStat)
    console.log(this.playerStat)
  }

  async fillPlacementStats(){
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    await sleep(1500)
    this.placementFinishes = new Array();
    this.placement = { 
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0
    };
    for(let i =1; i <=8;i++){
      this.placement[i] = this.playerStat.placementFinished.get(i);
    }
    this.placementFinishes.push(this.placement)
    this.calculateAveragePlacement()
  }

  calculateAveragePlacement(){
    var total: number = 0;
    var sum: number = 0;
    for(let i=1; i <= 8; i++){
      if(this.placement[i] != 0){
        total += this.placement[i];
        sum += this.placement[i] * i
      }
    }
    this.averagePlacement = parseFloat((sum / total).toFixed(2))
  }

}
