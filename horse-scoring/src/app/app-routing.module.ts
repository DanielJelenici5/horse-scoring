import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ScoringBoardComponent } from './scoring-board/scoring-board.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { SaveFinalScoreComponent } from './save-final-score/save-final-score.component';
import { PlayerStatsComponent } from './player-stats/player-stats.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'create-game', component: CreateGameComponent},
  {path: 'leaderboard', component: LeaderboardComponent},
  {path: 'save-final-score/:id', component: SaveFinalScoreComponent},
  {path: 'player-stats/:name', component: PlayerStatsComponent},
  {path: 'new-game/:id', component: ScoringBoardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
