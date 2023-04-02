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
import { StatGraphsComponent } from './stat-graphs/stat-graphs.component';

import { CommonModule } from '@angular/common';


import * as CanvasJSAngularChart from '../assets/canvasjs.angular.component';
import { MonthlyHighlightsComponent } from './monthly-highlights/monthly-highlights.component';
import { SingleMonthlyHighlightComponent } from './single-monthly-highlight/single-monthly-highlight.component';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;

import { NgxStarsModule } from 'ngx-stars';
import {MatTooltipModule} from '@angular/material/tooltip';

import { MatIconModule } from '@angular/material/icon';
import { MonthPastGamesComponent } from './month-past-games/month-past-games.component';


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
    SinglePastGameComponent,
    StatGraphsComponent,
    CanvasJSChart,
    MonthlyHighlightsComponent,
    SingleMonthlyHighlightComponent,
    MonthPastGamesComponent
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
    NotifierModule,
    CommonModule, 
    NgxStarsModule,
    MatTooltipModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
