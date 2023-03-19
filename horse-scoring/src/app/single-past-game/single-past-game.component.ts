import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../database.service';
import { DatabaseObject } from '../model/database-object.model';
import { HorseGame } from '../model/horse-game.model';

interface DisplayObject{
  stat: string;
}

@Component({
  selector: 'app-single-past-game',
  templateUrl: './single-past-game.component.html',
  styleUrls: ['./single-past-game.component.css']
})
export class SinglePastGameComponent implements OnInit {

  dbObject: DatabaseObject;

  dateObject: string;

  numPlayers: number;
  startingCardNum: number;

  gameId: string = this.ActivedRoute.snapshot.paramMap.get("gameId");

  tableData: DisplayObject[];
  tableColumns: string[];

  constructor(private ActivedRoute: ActivatedRoute, private databaseService: DatabaseService) { }

  ngOnInit(): void {
    this.databaseService.getAllJsonData().then((response)=> {
      for(let i = 0; i < response.length; i++){
        console.log(response[i].id == this.gameId)
        if(response[i].id == this.gameId){
            this.dbObject = response[i];
            this.dateObject = (new Date(this.dbObject.dateTime)).toDateString()
            break;
        }
      }
     }) 
     this.populateData();
  }

  async populateData(){
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    await sleep(1500)
    
    this.tableColumns = new Array();
    this.tableData = new Array();
    this.tableColumns.push("stat")
   // this.tableColumns = this.tableColumns.concat(this.dbObject.players);
    for(let i =0; i < this.dbObject.players.length; i++){

      this.tableColumns.push(Object.entries(this.dbObject.scores)[i][0])
    }

    const obj: DisplayObject= {
      stat: "Score"
    }
    for(let i =1; i < this.tableColumns.length; i++){
      var score = <string>this.dbObject.scores[this.tableColumns[i]][0]
      obj[this.tableColumns[i]] = score;
    }
    this.tableData.push(obj)


    const obj2: DisplayObject= {
      stat: "Horses"
    }
    for(let i =1; i < this.tableColumns.length; i++){
      var score = <string>this.dbObject.scores[this.tableColumns[i]][1]
      obj2[this.tableColumns[i]] = score;
    }
    this.tableData.push(obj2)
    console.log(this.dbObject)
    
  }

}
