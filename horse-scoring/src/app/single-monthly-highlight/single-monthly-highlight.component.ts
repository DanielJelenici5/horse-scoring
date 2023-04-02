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

  displayedColumns: string[] = ["Player", "Calculated Score", "Games Played", "Point Breakdown"];
  sortedData: RankingTableObj[];

  displayedColumns2: string[] = ["Stat", "Player", "Score", "Game"];
  sortedData2: StatMonthTableObj[];

  totalGamesPlayed: number = 0;
  totalPlayers: number = 0;
  flooredAvg: number = 0;

  viewingPointsFor: MonthlyPlayerStats;


  goToGame(gameId){
    this.router.navigate(["/past-game", gameId])
  }

  constructor(private ActivedRoute: ActivatedRoute, private databaseService: DatabaseService, private router: Router) {
  }

  ngOnInit(): void {
    this.formattedMonth = this.ActivedRoute.snapshot.paramMap.get("month").split('-').join(' ')
    this.scores = MonthlyPlayerStats.getAllByMonth(this.formattedMonth);
    //temp value below so it doesnt cause null pointer exception
    this.viewingPointsFor = this.scores[0];
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
    this.findLeastHorsesInGame(filteredMonth);
    //this.findMostCleanSheets(filteredMonth);
    this.findMostPointsInGame(filteredMonth);
    this.findLeastPointsInGame(filteredMonth);

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

    const statObject: StatMonthTableObj = {
      stat: "Most horses in a game",
      player: Array.from(mostHorsesOverallMap.keys()).join(", "),
      score: mostHorsesOverall,
      gameId: Array.from(mostHorsesOverallMap.values()).flat(),
    }
    this.sortedData2.push(statObject);
  }
  
  findLeastHorsesInGame(filteredMonth){
    var leastHorsesOverall = Infinity;
    var leastHorsesOverallMap : Map<string, string[]> = new Map();
    for(let i =0 ; i < filteredMonth.length; i++){
      var game: DatabaseObject = filteredMonth[i];
      var leastHorsesGame = Infinity;
      var leastHorsesPlayerGame = "";
      var leastHorsesGameId = "";
      for(var key in game.scores){
        var player = key;
        var horses = game.scores[player][1]
        if(horses < leastHorsesGame){
          leastHorsesGame = horses;
          leastHorsesPlayerGame = player;
          leastHorsesGameId = game.id;
        }
      }
      if(leastHorsesGame < leastHorsesOverall){
        leastHorsesOverall = leastHorsesGame;
        leastHorsesOverallMap = new Map();
        var leastHorsesGameIDArray : string[] = new Array();
        leastHorsesGameIDArray.push(leastHorsesGameId);
        leastHorsesOverallMap.set(leastHorsesPlayerGame, leastHorsesGameIDArray)
      }
      else if(leastHorsesGame == leastHorsesOverall){
        if(leastHorsesOverallMap.has(leastHorsesPlayerGame)){
          leastHorsesOverallMap.get(leastHorsesPlayerGame).push(leastHorsesGameId)
        }
        else{
          var leastHorsesGameIDArray : string[] = new Array();
          leastHorsesGameIDArray.push(leastHorsesGameId);
          leastHorsesOverallMap.set(leastHorsesPlayerGame, leastHorsesGameIDArray)
        }
      }
    }

    const statObject: StatMonthTableObj = {
      stat: "Least horses in a game",
      player: Array.from(leastHorsesOverallMap.keys()).join(", "),
      score: leastHorsesOverall,
      gameId: Array.from(leastHorsesOverallMap.values()).flat(),
    }
    this.sortedData2.push(statObject);
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
        stat: "Most clean sheets",
        player: "n/a",
        score: 0,
        gameId: [],
      }
      this.sortedData2.push(statObject);
    }
    else{
    const statObject: StatMonthTableObj = {
      stat: "Most clean sheets",
      player: Array.from(cleanSheets.keys()).join(", "),
      score: cleanSheets.values().next().value.length,
      gameId: Array.from(cleanSheets.values()).flat(),
    }
    this.sortedData2.push(statObject);
    }

  }

  findMostPointsInGame(filteredMonth){
    var mostPointsOverall = 0;
    var mostPointsOverallMap : Map<string, string[]> = new Map();
    for(let i =0 ; i < filteredMonth.length; i++){

      var game: DatabaseObject = filteredMonth[i];
      var mostPointsGame = 0;
      var mostPointsPlayerGame = "";
      var mostPointsGameId = "";
      for(var key in game.scores){
        var player = key;
        var points = game.scores[player][0]
        if(points > mostPointsGame){
          mostPointsGame = points;
          mostPointsPlayerGame = player;
          mostPointsGameId = game.id;
        }
      }
      if(mostPointsGame > mostPointsOverall){
          mostPointsOverall = mostPointsGame;
          mostPointsOverallMap = new Map();
          var mostPointsGameIDArray : string[] = new Array();
          mostPointsGameIDArray.push(mostPointsGameId);
          mostPointsOverallMap.set(mostPointsPlayerGame, mostPointsGameIDArray)
      }
      else if(mostPointsGame == mostPointsOverall){
        if(mostPointsOverallMap.has(mostPointsPlayerGame)){
          mostPointsOverallMap.get(mostPointsPlayerGame).push(mostPointsGameId)
        }
        else{
          var mostPointsGameIDArray : string[] = new Array();
          mostPointsGameIDArray.push(mostPointsGameId);
          mostPointsOverallMap.set(mostPointsPlayerGame, mostPointsGameIDArray)
        }
      }
    }

    const statObject: StatMonthTableObj = {
      stat: "Most points in a game",
      player: Array.from(mostPointsOverallMap.keys()).join(", "),
      score: mostPointsOverall,
      gameId: Array.from(mostPointsOverallMap.values()).flat(),
    }
    this.sortedData2.push(statObject);
  }

  findLeastPointsInGame(filteredMonth){
    var leastPointsOverall = Infinity;
    var leastPointsOverallMap : Map<string, string[]> = new Map();
    for(let i =0 ; i < filteredMonth.length; i++){

      var game: DatabaseObject = filteredMonth[i];
      var leastPointsGame = Infinity;
      var leastPointsPlayerGame = "";
      var leastPointsGameId = "";
      for(var key in game.scores){
        var player = key;
        var points = game.scores[player][0]
        if(points < leastPointsGame){
          leastPointsGame = points;
          leastPointsPlayerGame = player;
          leastPointsGameId = game.id;
        }
      }
      if(leastPointsGame < leastPointsOverall){
          leastPointsOverall = leastPointsGame;
          leastPointsOverallMap = new Map();
          var leastPointsGameIDArray : string[] = new Array();
          leastPointsGameIDArray.push(leastPointsGameId);
          leastPointsOverallMap.set(leastPointsPlayerGame, leastPointsGameIDArray)
      }
      else if(leastPointsGame == leastPointsOverall){
        if(leastPointsOverallMap.has(leastPointsPlayerGame)){
          leastPointsOverallMap.get(leastPointsPlayerGame).push(leastPointsGameId)
        }
        else{
          var leastPointsGameIDArray : string[] = new Array();
          leastPointsGameIDArray.push(leastPointsGameId);
          leastPointsOverallMap.set(leastPointsPlayerGame, leastPointsGameIDArray)
        }
      }
    }


    const statObject: StatMonthTableObj = {
      stat: "Least points in a game",
      player: Array.from(leastPointsOverallMap.keys()).join(", "),
      score: leastPointsOverall,
      gameId: Array.from(leastPointsOverallMap.values()).flat(),
    }
    this.sortedData2.push(statObject);
  }

  updateViewPointsFor(element){
    this.viewingPointsFor = this.scores.find(score => score.name == element.name)
  }

}



