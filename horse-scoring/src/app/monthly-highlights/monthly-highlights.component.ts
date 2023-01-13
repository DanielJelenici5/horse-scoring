import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { DatabaseObject } from '../model/database-object.model';
import { StatCalcService } from '../stat-calc.service';

interface MonthlyHighlightObject{
  month:string,
  potm: string,
  mip: string,
  wpotm: string,
}

interface AllPlayerMonthStats{
  name: string;
  gamesPlayed: number;
  totalHorses: number;
  totalPoints: number;
  placementFinished: Map<number, number>
  gamesWon: number;
  gamesLostOnPoints: number;
  gamesLostOnHorses: number;
  roundsPlayed: number;
}

@Component({
  selector: 'app-monthly-highlights',
  templateUrl: './monthly-highlights.component.html',
  styleUrls: ['./monthly-highlights.component.css']
})


export class MonthlyHighlightsComponent implements OnInit {
  
  allDBObjects: DatabaseObject[] = new Array();

  displayedColumns: string[] = ["Month", "POTM", "MIP", "WPOTM","Additional Stats"];
  sortedData: MonthlyHighlightObject[];

  currentDisplayedMonths: string[] = ["January 2023"]

  constructor(private databaseService: DatabaseService, private statcalcService: StatCalcService) { }

  ngOnInit(): void {
    this.databaseService.getAllData().then((response)=> {
      for(let i = 0; i < response.length; i++){
        this.allDBObjects.push(response[i]["data"])
      }
     }) 
     this.generateData()
  }

  seeStats(month){
    const monthFormatted = month.split(' ').join('-')

  }

  async generateData(){
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    await sleep(1500)

    for(let i= 0 ; i < this.currentDisplayedMonths.length; i++){
      const monthlyHighlightObjectMonth = this.currentDisplayedMonths[i];
      const filteredMonth = this.allDBObjects.filter(obj =>(new Date(obj.dateTime)).toLocaleString('default', { month: 'long' }) + " " + (new Date(obj.dateTime)).getFullYear() === this.currentDisplayedMonths[i]);
      this.calculatePOTM(filteredMonth);
    }
  }

  async calculatePOTM(array){
    //console.log("test")
    console.log(array)
    const test = this.statcalcService.createStats(array, false)
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    await sleep(1500)
    console.log(test)
  }

}
