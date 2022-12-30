
import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, FormArray, FormBuilder} from '@angular/forms';
import { HorseGame } from '../model/horse-game.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }

  data = [{name: ''}]

  form: FormGroup = this.formBuilder.group({
    players: this.formBuilder.array(this.data.map(
      player => this.formBuilder.group(player)
    )),
    startingHand: new FormControl()
  });

  get players(): FormArray {
    return this.form.get('players') as FormArray;
  }

  addPlayer() {
    this.players.push(this.formBuilder.group({
      name: null,
    }))
  }


  
  onSubmit(values){
    const startingCardNum: number = parseInt(values.startingHand) 
    const playerArray : string[] = new Array();
    for(let i =0; i < values.players.length; i++){
      playerArray.push(values.players[i]["name"])
    }

    const newGame: HorseGame = new HorseGame(playerArray, startingCardNum * 2, new Date());

    this.router.navigate(["/new-game", newGame.id])
  }

}
