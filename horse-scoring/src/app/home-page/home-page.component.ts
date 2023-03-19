import { Component, OnInit } from '@angular/core';

import { FormBuilder, ValidatorFn, ValidationErrors, AbstractControl, FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';
import { HorseGame } from '../model/horse-game.model';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private router: Router, private databaseService: DatabaseService) { }

  ngOnInit(): void {
    HorseGame.allGames = new Array();
  }

  createNewGame(){
    this.router.navigate(['/create-game'])
  }

  gotoLeaderboard(){
    this.router.navigate(['/leaderboard'])
  }

  goToPastGames(){
    this.router.navigate(['/past-games'])
  }

  goToMonthlyHighlights(){
    this.router.navigate(['/monthly-highlights'])
  }
}
