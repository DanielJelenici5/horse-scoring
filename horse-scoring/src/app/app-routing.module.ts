import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ScoringBoardComponent } from './scoring-board/scoring-board.component';
import { CreateGameComponent } from './create-game/create-game.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'create-game', component: CreateGameComponent},
  {path: 'new-game/:id', component: ScoringBoardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
