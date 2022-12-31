import { Component, OnInit } from '@angular/core';
import { HorseGame } from '../model/horse-game.model';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../database.service';
import { DatabaseObject } from '../model/database-object.model';

@Component({
  selector: 'app-save-final-score',
  templateUrl: './save-final-score.component.html',
  styleUrls: ['./save-final-score.component.css']
})
export class SaveFinalScoreComponent implements OnInit {

  numPlayers: number;
  startingCardNum: number;

  game: HorseGame;
  tableColumns: string[];

  tableData: string[];

  model = {};

  constructor(private ActivedRoute: ActivatedRoute, private databaseService: DatabaseService) { }

  ngOnInit(): void {
    this.game =  HorseGame.getGame(this.ActivedRoute.snapshot.paramMap.get("id")); 
    this.numPlayers = this.game.players.length;
    this.startingCardNum = this.game.numRounds/2;
    this.tableColumns = new Array()
    this.tableColumns.push("Round")
    this.tableColumns = this.tableColumns.concat(this.game.players)


    this.tableData = new Array()
    this.tableData.push("Total Score");
    this.tableData.push("Total Horses");

    for(let i =0; i < this.game.players.length; i++){
      this.model[this.game.players[i]] = [0,0]
    }

  }

  saveFinalScores(){
    console.log("before save ")
    const dbObject = new DatabaseObject(this.game, this.model)
    this.databaseService.addData(dbObject)
    console.log("after save ")
  }





}
