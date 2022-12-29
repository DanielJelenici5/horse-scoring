import { Component, OnInit, Input } from '@angular/core';
import { HorseGame } from '../model/horse-game.model';



@Component({
  selector: 'app-scoring-board',
  templateUrl: './scoring-board.component.html',
  styleUrls: ['./scoring-board.component.css']
})
export class ScoringBoardComponent implements OnInit {

  @Input() numPlayers: number;
  @Input() startingCardNum: number;

  game: HorseGame;

  tableData: string[];

  tableColumns: string[];


  constructor() {
  }

  ngOnInit(): void {
    this.game =  new HorseGame(["danny","adrian"], 12);
    this.tableColumns = new Array()
    this.tableColumns.push("Round")
    this.tableColumns = this.tableColumns.concat(this.game.players)

    this.tableData = new Array();
    this.createTable()

    this.game.setScore("danny",2,5);

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

  updateScore(index, player){
    console.log(index)
    console.log(player)
  }


}
