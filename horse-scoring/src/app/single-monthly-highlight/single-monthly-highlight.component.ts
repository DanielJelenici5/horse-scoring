import { Component, OnInit } from '@angular/core';
import { MonthlyPlayerStats } from '../model/monthly-player-stats.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseObject } from '../model/database-object.model';
import { DatabaseService } from '../database.service';
import { PlayerStats } from '../model/player-stats.model';

interface RankingTableObj{
  name: string,
  score: number,
  gp: number
}

interface StatMonthTableObj{
  stat: string,
  player: string,
  score: number,
  gameId: string[],
}

@Component({
  selector: 'app-single-monthly-highlight',
  templateUrl: './single-monthly-highlight.component.html',
  styleUrls: ['./single-monthly-highlight.component.css']
})
export class SingleMonthlyHighlightComponent implements OnInit {

  allDBObjects: DatabaseObject[] = new Array();
  scores: MonthlyPlayerStats[];
  scoresNotQualified: MonthlyPlayerStats[];

  formattedMonth: string;

  displayedColumns: string[] = ["Player", "Calculated Score", "Games Played"];
  sortedData: RankingTableObj[];

  displayedColumns2: string[] = ["Stat", "Player", "Score", "Game"];
  sortedData2: StatMonthTableObj[];

  totalGamesPlayed: number = 0;
  totalPlayers: number = 0;
  flooredAvg: number = 0;


  goToGame(gameId){
    this.router.navigate(["/past-game", gameId])
  }

  constructor(private ActivedRoute: ActivatedRoute, private databaseService: DatabaseService, private router: Router) {
  }

  ngOnInit(): void {
    this.formattedMonth = this.ActivedRoute.snapshot.paramMap.get("month").split('-').join(' ')
    this.scores = MonthlyPlayerStats.getAllByMonth(this.formattedMonth);
    this.totalGamesPlayed = this.scores.reduce((total, currentValue: MonthlyPlayerStats) => total + currentValue.gamesPlayed, 0)
    this.totalPlayers = this.scores.length;
    this.flooredAvg = Math.floor(this.totalGamesPlayed/this.totalPlayers)
    this.scoresNotQualified = this.scores.filter(obj => obj.qualified == false);
    this.scores = this.scores.filter(obj => obj.qualified)
    this.scores.sort(function(a,b){return b.score-a.score})

    this.populateRankingsTable();

    this.databaseService.getAllJsonData().then((response)=> {
      for(let i = 0; i < response.length; i++){
        this.allDBObjects.push(response[i])
      }
     }) 
     this.generateData()
  }

  async generateData(){
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    await sleep(1500)

    this.sortedData2 = new Array();

    const filteredMonth = this.allDBObjects.filter(obj =>(new Date(obj.dateTime)).toLocaleString('default', { month: 'long' }) + " " + (new Date(obj.dateTime)).getFullYear() === this.formattedMonth);

    this.findMostHorsesInGame(filteredMonth);
    this.findMostCleanSheets(filteredMonth);

  }

  populateRankingsTable(){
    this.sortedData = new Array();
    for(let i =0 ; i < this.scores.length; i++){
      const rankingObject: RankingTableObj = {
        name: this.scores[i].name,
        score: this.scores[i].score,
        gp: this.scores[i].gamesPlayed
      }
      this.sortedData.push(rankingObject)
    }

  }

  findMostHorsesInGame(filteredMonth){
    var mostHorsesOverall = 0;
    var mostHorsesOverallMap : Map<string, string[]> = new Map();
    for(let i =0 ; i < filteredMonth.length; i++){
      var game: DatabaseObject = filteredMonth[i];
      var mostHorsesGame = 0;
      var mostHorsesPlayerGame = "";
      var mostHorsesGameId = "";
      for(var key in game.scores){
        var player = key;
        var horses = game.scores[player][1]
        if(horses > mostHorsesGame){
          mostHorsesGame = horses;
          mostHorsesPlayerGame = player;
          mostHorsesGameId = game.id;
        }
      }
      if(mostHorsesGame > mostHorsesOverall){
          mostHorsesOverall = mostHorsesGame;
          mostHorsesOverallMap = new Map();
          var mostHorsesGameIDArray : string[] = new Array();
          mostHorsesGameIDArray.push(mostHorsesGameId);
          mostHorsesOverallMap.set(mostHorsesPlayerGame, mostHorsesGameIDArray)
      }
      else if(mostHorsesGame == mostHorsesOverall){
        if(mostHorsesOverallMap.has(mostHorsesPlayerGame)){
          mostHorsesOverallMap.get(mostHorsesPlayerGame).push(mostHorsesGameId)
        }
        else{
          var mostHorsesGameIDArray : string[] = new Array();
          mostHorsesGameIDArray.push(mostHorsesGameId);
          mostHorsesOverallMap.set(mostHorsesPlayerGame, mostHorsesGameIDArray)
        }
      }
    }

    for (const [key, value] of mostHorsesOverallMap) {
      const statObject: StatMonthTableObj = {
        stat: "Most horses in a game",
        player: key,
        score: mostHorsesOverall,
        gameId: value,
      }
      this.sortedData2.push(statObject);

    }

  }

  findMostCleanSheets(filteredMonth){
    var cleanSheets: Map<string, string[]> = new Map();
    for(let i =0 ; i < filteredMonth.length; i++){
      var game: DatabaseObject = filteredMonth[i];
      for(var key in game.scores){
        var player = key;
        var horses = game.scores[player][1]
        var gameId = game.id;
        if(horses == 0){
          if(cleanSheets.has(player)){
            cleanSheets.get(player).push(gameId);
          }
          else{
            const gameIdArray = new Array();
            gameIdArray.push(gameId);
            cleanSheets.set(player, gameIdArray);
          }

        }
      }
    }


    if(cleanSheets.size == 0){
      const statObject: StatMonthTableObj = {
        stat: "Most Clean Sheets",
        player: "n/a",
        score: 0,
        gameId: [],
      }
      this.sortedData2.push(statObject);
    }
    else{
      for (const [key, value] of cleanSheets) {
        const statObject: StatMonthTableObj = {
          stat: "Most Clean Sheets",
          player: key,
          score: value.length,
          gameId: value,
        }
        this.sortedData2.push(statObject);
    }
    }

  }

  findMostPointsInGame(filteredMonth){

  }

  findLeastPointsInGame(filteredMonth){

  }

}

