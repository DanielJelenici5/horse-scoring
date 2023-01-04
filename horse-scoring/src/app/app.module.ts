import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScoringBoardComponent } from './scoring-board/scoring-board.component';

import {MatTableModule} from '@angular/material/table'  
import {MatSelectModule} from '@angular/material/select';
import { HomePageComponent } from './home-page/home-page.component';

import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { ReactiveFormsModule } from '@angular/forms';
import { CreateGameComponent } from './create-game/create-game.component';

import { HttpClientModule } from '@angular/common/http';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';

import { MatSortModule } from '@angular/material/sort';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SaveFinalScoreComponent } from './save-final-score/save-final-score.component';
import { PlayerStatsComponent } from './player-stats/player-stats.component';

import { NotifierModule } from 'angular-notifier';
import { PastGamesComponent } from './past-games/past-games.component';
import { SinglePastGameComponent } from './single-past-game/single-past-game.component';



@NgModule({
  declarations: [
    AppComponent,
    ScoringBoardComponent,
    HomePageComponent,
    CreateGameComponent,
    LeaderboardComponent,
    SaveFinalScoreComponent,
    PlayerStatsComponent,
    PastGamesComponent,
    SinglePastGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatSelectModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSortModule,
    BrowserAnimationsModule,
    NotifierModule   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
