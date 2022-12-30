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


@NgModule({
  declarations: [
    AppComponent,
    ScoringBoardComponent,
    HomePageComponent,
    CreateGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatSelectModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
