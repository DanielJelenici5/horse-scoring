import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatabaseObject } from './model/database-object.model';
import { data } from 'jquery';
import { HorseGame } from './model/horse-game.model';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }


  async getAllJsonData() : Promise<DatabaseObject[]>{
    var returnData : DatabaseObject[] = new Array();
    fetch("assets/data/data.json").then(response => response.json()).then(dbObjectArray => {
      for(let i = 0; i <  dbObjectArray.length; i++){
        const game = new HorseGame(dbObjectArray[i].data.players, dbObjectArray[i].data.numRounds, new Date(dbObjectArray[i].data.dateTime), dbObjectArray[i].data.id) ;
        returnData.push(new DatabaseObject(game, dbObjectArray[i].data.scores));
      }
    });
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    await sleep(500)
    return returnData;
  }


  addData(obj: DatabaseObject){
    this.http.post("https://272.selfip.net/apps/CLSkMKlYYi/collections/horse-scoring-3/documents/",{"key":obj.id, "data": obj}).subscribe((data:any)=>{
      console.log("Added data: " + data)
    })
    /*this.http.post("https://272.selfip.net/apps/CLSkMKlYYi/collections/horse-scoring/documents/",{"key":obj.id, "data": obj}).subscribe((data:any)=>{
      console.log("Added data: " + data)
    })
    this.http.post("https://272.selfip.net/apps/CLSkMKlYYi/collections/horse-scoring-2/documents/",{"key":obj.id, "data": obj}).subscribe((data:any)=>{
      console.log("Added data: " + data)
    })*/
  }


  async getSingleJsonDataObject(gameId: string): Promise<DatabaseObject>{
    var returnData : DatabaseObject;
    fetch("assets/data/data.json").then(response => response.json()).then(dbObjectArray => {
      for(let i = 0; i <  dbObjectArray.length; i++){
        if( dbObjectArray[i].data.id === gameId){
          const game = new HorseGame(dbObjectArray[i].data.players, dbObjectArray[i].data.numRounds, new Date(dbObjectArray[i].data.dateTime), dbObjectArray[i].data.id) ;
          returnData = (new DatabaseObject(game, dbObjectArray[i].data.scores));
          break;
        }
      }
    });
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    await sleep(500)
    return returnData
  }
}
