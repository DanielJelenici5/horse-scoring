import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { DatabaseObject } from '../model/database-object.model';
import { StatCalcService } from '../stat-calc.service';
import { PlayerStats } from '../model/player-stats.model';

interface MonthlyHighlightObject{
  month:string,
  potm: string,
  mip: string,
  wpotm: string,
}

@Component({
  selector: 'app-monthly-highlights',
  templateUrl: './monthly-highlights.component.html',
  styleUrls: ['./monthly-highlights.component.css']
})


export class MonthlyHighlightsComponent implements OnInit {

  ScoringWeights = {
    wins: 4,
    placement: 3,
    pointsPerRound: 2,
    gamesLostOnHorses: -1.5,
    gamesLostOnPoints: -1.5
  }
  
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

    this.sortedData = new Array();

    for(let i= 0 ; i < this.currentDisplayedMonths.length; i++){
      const monthlyHighlightObjectMonth = this.currentDisplayedMonths[i];
      const filteredMonth = this.allDBObjects.filter(obj =>(new Date(obj.dateTime)).toLocaleString('default', { month: 'long' }) + " " + (new Date(obj.dateTime)).getFullYear() === this.currentDisplayedMonths[i]);
      const scoreArray = this.calculatePOTM(filteredMonth);
      const potm = scoreArray[0].name
      const wpotm = scoreArray[scoreArray.length - 1].name;
      const mipotm = "n/a"
      if(monthlyHighlightObjectMonth != "January 2023"){
        //do most imporved potm here
      }
      const  monthlyHighlightObject = {
        month: monthlyHighlightObjectMonth,
        potm: potm,
        mip: mipotm,
        wpotm: wpotm,
      }
      this.sortedData.push(monthlyHighlightObject)
    }
  }

  calculatePOTM(array){
    const monthlyPlayerStats: PlayerStats[] = this.statcalcService.createStats(array, false)

    const totalGamesPlayed = monthlyPlayerStats.reduce((total, currentValue: PlayerStats) => total + currentValue.gamesPlayed, 0)
    const floorAverageGamesPlayed = Math.floor(totalGamesPlayed/monthlyPlayerStats.length);
  
    const filteredByGamesPlayed = monthlyPlayerStats.filter(obj => obj.gamesPlayed >= floorAverageGamesPlayed)
    for(let i=0; i < filteredByGamesPlayed.length; i++){
      this.calculateAveragePlacementPre(filteredByGamesPlayed[i])
      this.calculateScore(filteredByGamesPlayed[i])
    }
    filteredByGamesPlayed.sort(function(a,b){return b.monthScore-a.monthScore})
    return filteredByGamesPlayed
  }
  calculateAveragePlacementPre(playerStats: PlayerStats){
    const placement = { 
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0
    };
    for(let i =1; i <= 8;i++){
      placement[i] = playerStats.placementFinished.get(i);
    }
    playerStats.averagePlacement = this.calculateAveragePlacement(placement)
  }
  
  calculateAveragePlacement(placement){
    var total: number = 0;
    var sum: number = 0;
    for(let i=1; i <= 8; i++){
      if(placement[i] != 0){
        total += placement[i];
        sum += placement[i] * i
      }
    }
    return parseFloat((sum / total).toFixed(2))
  }

  calculateScore(playerStats: PlayerStats){
    var score: number = 0;
    score += playerStats.gamesWon * this.ScoringWeights.wins;
    score += playerStats.averagePlacement * this.ScoringWeights.placement;
    score += (playerStats.totalPoints / playerStats.roundsPlayed) * this.ScoringWeights.pointsPerRound;
    score += playerStats.gamesLostOnHorses * this.ScoringWeights.gamesLostOnHorses;
    score += playerStats.gamesLostOnPoints * this.ScoringWeights.gamesLostOnPoints;
    playerStats.monthScore = parseFloat(score.toFixed(2));
  }
}
