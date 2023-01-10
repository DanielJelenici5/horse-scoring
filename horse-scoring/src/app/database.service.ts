import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatabaseObject } from './model/database-object.model';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) { }


  async getAllData(): Promise<DatabaseObject[]>{
    var returnData : DatabaseObject[] = new Array();
    this.http.get<DatabaseObject[]>("https://272.selfip.net/apps/CLSkMKlYYi/collections/horse-scoring/documents/").subscribe((data: DatabaseObject[])=>{
      returnData = returnData.concat(data)
    })
    this.http.get<DatabaseObject[]>("https://272.selfip.net/apps/CLSkMKlYYi/collections/horse-scoring-2/documents/").subscribe((data2: DatabaseObject[])=>{
      returnData = returnData.concat(data2)
    })
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  await sleep(1000)
  return returnData
  }

  addData(obj: DatabaseObject){
    /*this.http.post("https://272.selfip.net/apps/CLSkMKlYYi/collections/horse-scoring/documents/",{"key":obj.id, "data": obj}).subscribe((data:any)=>{
      console.log("Added data: " + data)
    })*/
    this.http.post("https://272.selfip.net/apps/CLSkMKlYYi/collections/horse-scoring-2/documents/",{"key":obj.id, "data": obj}).subscribe((data:any)=>{
      console.log("Added data: " + data)
    })
  }

  async getSingleDataObject(gameId: string): Promise<DatabaseObject>{
    var returnData : DatabaseObject;
    this.http.get<DatabaseObject>("https://272.selfip.net/apps/CLSkMKlYYi/collections/horse-scoring/documents/" + gameId + "/").subscribe((data: DatabaseObject)=>{
      returnData = data
    })
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  await sleep(1000)
  return returnData
  }
}
