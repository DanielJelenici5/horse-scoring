import { Component, OnInit, Input } from '@angular/core';
import { HorseGame } from '../model/horse-game.model';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../database.service';
import { DatabaseObject } from '../model/database-object.model';

@Component({
  selector: 'app-scoring-board',
  templateUrl: './scoring-board.component.html',
  styleUrls: ['./scoring-board.component.css']
})
export class ScoringBoardComponent implements OnInit {

  numPlayers: number;
  startingCardNum: number;

  game: HorseGame;

  tableData: string[];

  tableColumns: string[];


  constructor(private ActivedRoute: ActivatedRoute, private databaseService: DatabaseService) {
  }

  ngOnInit(): void {
    this.game =  HorseGame.getGame(this.ActivedRoute.snapshot.paramMap.get("id")); 
    this.numPlayers = this.game.players.length;
    this.startingCardNum = this.game.numRounds/2;
    this.tableColumns = new Array()
    this.tableColumns.push("Round")
    this.tableColumns = this.tableColumns.concat(this.game.players)

    this.tableData = new Array();
    this.createTable()

  }


  createTable(){
    for(let i = 0; i < this.startingCardNum * 2; i++){
      var rowNumber =  Math.abs(this.startingCardNum - i);
      if(i >= this.startingCardNum){
        rowNumber++
      }
      this.tableData.push(rowNumber.toString())
    }
    this.tableData.push("Total Points")
    this.tableData.push("Total Horses")
  }

  updateScore(index, player, score){
    const parsedScore = parseInt(score)
    if(!Number.isNaN(parsedScore)){
      this.game.setScore(player,index, parsedScore)
    }
  }

  updateHorse(index, player){
    const oldHorseValue = this.game.getSingleHorse(player,index);
    this.game.setHorse(player,index,!oldHorseValue);

  }

  saveGame(){
    console.log("before save ")
    const dbObject = new DatabaseObject(this.game)
    this.databaseService.addData(dbObject)
    console.log("after save ")
  }


}
