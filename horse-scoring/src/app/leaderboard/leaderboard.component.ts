import { Component, OnInit } from '@angular/core';
import { HorseGame } from '../model/horse-game.model';
import { PlayerStats } from '../model/player-stats.model';

import {MatSort, Sort} from '@angular/material/sort';
import { StatCalcService } from '../stat-calc.service';
import { Router } from '@angular/router';
import { DatabaseObject } from '../model/database-object.model';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  allGames: HorseGame[];

  constructor(private statCalcService: StatCalcService, private router: Router, private databaseService: DatabaseService) {
    this.allGames = HorseGame.allGames;
   }

  ngOnInit(): void {
    const allDBObjects: DatabaseObject[] = new Array();
    if(PlayerStats.allPlayerStats.length == 0){
      this.databaseService.getAllData().then((response)=> {
        for(let i = 0; i < response.length; i++){
          allDBObjects.push(response[i]["data"])
        }
       }) 
      this.createPlayerStats(allDBObjects);
    }
    this.updateTable()
    
   
  }

  displayedColumns: string[] = ["Player", "Games Played", "Games Won", "Points Per 12", "Horses Per 12", "Additional Stats"];

  sortedData: PlayerStats[];

  async createPlayerStats(allDBObjects){
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    await sleep(1500)
    this.statCalcService.createStats(allDBObjects, true);
    
  }
  
  async updateTable(){
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    await sleep(1500)
    console.log(PlayerStats.allPlayerStats)
    this.sortedData = PlayerStats.allPlayerStats;
  }

  SortChange(sort: Sort) {
    const data = this.sortedData.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Player': return this.compare(a.name, b.name, isAsc);
        case 'Games Won': return this.compare(a.gamesWon, b.gamesWon, isAsc);
        case 'Points Per 12': return this.compare(((a.totalPoints / a.roundsPlayed) * 12 ).toFixed(2), ((b.totalPoints / b.roundsPlayed) *12 ).toFixed(2), isAsc);
        case 'Horses Per 12': return this.compare(((a.totalHorses / a.roundsPlayed) * 12 ).toFixed(2), ((b.totalHorses / b.roundsPlayed) *12 ).toFixed(2), isAsc);
        case 'Games Played': return this.compare(a.gamesPlayed, b.gamesPlayed, isAsc);
        default: return 0;
      }
    });

  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

seeStats(name){
  this.router.navigate(["/player-stats", name])
}
        


}
