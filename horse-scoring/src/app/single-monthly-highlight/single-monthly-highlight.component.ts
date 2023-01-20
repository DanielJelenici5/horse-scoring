import { Component, OnInit } from '@angular/core';
import { MonthlyPlayerStats } from '../model/monthly-player-stats.model';
import { ActivatedRoute } from '@angular/router';
import { DatabaseObject } from '../model/database-object.model';
import { DatabaseService } from '../database.service';

interface RankingTableObj{
  name:string,
  score: number,
}

@Component({
  selector: 'app-single-monthly-highlight',
  templateUrl: './single-monthly-highlight.component.html',
  styleUrls: ['./single-monthly-highlight.component.css']
})
export class SingleMonthlyHighlightComponent implements OnInit {

  allDBObjects: DatabaseObject[] = new Array();
  scores: MonthlyPlayerStats[];

  formattedMonth: string;

  displayedColumns: string[] = ["Player", "Calculated Score"];
  sortedData: RankingTableObj[];

  constructor(private ActivedRoute: ActivatedRoute, private databaseService: DatabaseService) {
  }

  ngOnInit(): void {
    this.formattedMonth = this.ActivedRoute.snapshot.paramMap.get("month").split('-').join(' ')
    this.scores = MonthlyPlayerStats.getAllByMonth(this.formattedMonth);
    this.scores.sort(function(a,b){return b.score-a.score})

    this.populateRankingsTable();

    this.databaseService.getAllData().then((response)=> {
      for(let i = 0; i < response.length; i++){
        this.allDBObjects.push(response[i]["data"])
      }
     }) 

     this.generateData()
  }

  async generateData(){
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    await sleep(1500)

    const filteredMonth = this.allDBObjects.filter(obj =>(new Date(obj.dateTime)).toLocaleString('default', { month: 'long' }) + " " + (new Date(obj.dateTime)).getFullYear() === this.formattedMonth);


  }

  populateRankingsTable(){
    this.sortedData = new Array();
    for(let i =0 ; i < this.scores.length; i++){
      const rankingObject: RankingTableObj = {
        name: this.scores[i].name,
        score: this.scores[i].score
      }
      this.sortedData.push(rankingObject)
    }

  }

  

}
