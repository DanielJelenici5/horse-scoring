import { Component, OnInit } from '@angular/core';
import { HorseGame } from '../model/horse-game.model';
import { PlayerStats } from '../model/player-stats.model';

import {MatSort, Sort} from '@angular/material/sort';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  allGames: HorseGame[];

  constructor() {
    this.allGames = HorseGame.allGames;
   }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ["Player", "Games Played", "Total Points", "Total Horses"];

  sortedData: PlayerStats[];
  

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
        


}
