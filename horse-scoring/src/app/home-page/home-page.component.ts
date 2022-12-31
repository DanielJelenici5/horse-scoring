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
    this.databaseService.getAllData().then((response)=> {
      for(let i = 0; i < response.length; i++){
        const game = new HorseGame(response[i]["data"]["players"], response[i]["data"]["numRounds"], response[i]["data"]["dateTime"])
        game.rounds = HorseGame.mapFromJson(response[i]["data"]["rounds"])
        game.horses = HorseGame.mapFromJson(response[i]["data"]["horses"])
      }
     })
  }

  createNewGame(){
    this.router.navigate(['/create-game'])
  }

  gotoLeaderboard(){
    this.router.navigate(['/leaderboard'])
  }
}
