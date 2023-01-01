import { Component, OnInit } from '@angular/core';
import { HorseGame } from '../model/horse-game.model';
import { PlayerStats } from '../model/player-stats.model';

import {MatSort, Sort} from '@angular/material/sort';
import { StatCalcService } from '../stat-calc.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  allGames: HorseGame[];

  constructor(private statCalcService: StatCalcService, private router: Router) {
    this.allGames = HorseGame.allGames;
   }

  ngOnInit(): void {
    this.statCalcService.createStats();
    this.updateTable()
    
   
  }

  displayedColumns: string[] = ["Player", "Games Played", "Games Won", "Total Points", "Total Horses"];

  sortedData: PlayerStats[];
  
  async updateTable(){
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    await sleep(1500)
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
        case 'Games Played': return this.compare(a.gamesPlayed, b.gamesPlayed, isAsc);
        case 'Total Points': return this.compare(a.totalPoints, b.totalPoints, isAsc);
        case 'Total Horses': return this.compare(a.totalHorses, b.totalHorses, isAsc);
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
