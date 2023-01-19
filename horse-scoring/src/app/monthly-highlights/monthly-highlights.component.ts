import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { DatabaseObject } from '../model/database-object.model';
import { StatCalcService } from '../stat-calc.service';
import { PlayerStats } from '../model/player-stats.model';
import { Router } from '@angular/router';

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
    winPercentage: 20,
    placement: 2,
    pointsPerRound: 3,
    gamesLostOnHorses: -1,
    gamesLostOnPoints: -1
  }

  
  allDBObjects: DatabaseObject[] = new Array();

  displayedColumns: string[] = ["Month", "POTM", "MIP", "WPOTM","Additional Stats"];
  sortedData: MonthlyHighlightObject[];

  currentDisplayedMonths: string[] = ["January 2023"]

  constructor(private databaseService: DatabaseService, private statcalcService: StatCalcService, private router: Router) { }

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
    this.router.navigate(["/monthly-highlights", monthFormatted])

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
        //do most improved potm here
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

    console.log("name")
    console.log(playerStats.name)

    const winPercentagePoints = (playerStats.gamesWon / playerStats.gamesPlayed) * this.ScoringWeights.winPercentage
    score += winPercentagePoints;

    const placementPoints = (8 - playerStats.averagePlacement) * this.ScoringWeights.placement
    score += placementPoints;

    const pointsPerRound = (playerStats.totalPoints / playerStats.roundsPlayed) * this.ScoringWeights.pointsPerRound;
    score += pointsPerRound

    const lostOnHorses = playerStats.gamesLostOnHorses * this.ScoringWeights.gamesLostOnHorses
    score += lostOnHorses;

    const lostOnPoints = playerStats.gamesLostOnPoints * this.ScoringWeights.gamesLostOnPoints;
    score += lostOnPoints;

    playerStats.monthScore = parseFloat(score.toFixed(2));
    console.log("total score")
    console.log(playerStats.monthScore)
  }
}
