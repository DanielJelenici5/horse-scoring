import { Component, OnInit } from '@angular/core';
import { DatabaseObject } from '../model/database-object.model';
import { HorseGame } from '../model/horse-game.model';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';

interface PastGameObject{
  gameId: string;
  dateTime: string;
  winner: string;
  loserPoints: string;
  loserHorses: string;
}

@Component({
  selector: 'app-past-games',
  templateUrl: './past-games.component.html',
  styleUrls: ['./past-games.component.css']
})
export class PastGamesComponent implements OnInit {

  sortedData: PastGameObject[];

  allDBObjects: DatabaseObject[] = new Array();

  constructor(private databaseService: DatabaseService, private router: Router) { }

  ngOnInit(): void {
    HorseGame.allGames = new Array();
    this.databaseService.getAllData().then((response)=> {
      for(let i = 0; i < response.length; i++){
        this.allDBObjects.push(response[i]["data"])
      }
     }) 
    this.generateTable()
  }

  displayedColumns: string[] = ["Date Played", "Winner", "Loser By Points", "Loser By Horses", "Game Scores"];

  async generateTable(){
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    await sleep(1500)
    this.sortedData = new Array();

    this.allDBObjects.sort(function(a,b){
      return new Date(b.dateTime).valueOf() - new Date(a.dateTime).valueOf();
    });
    
    for(let i=0; i <this.allDBObjects.length; i++){
      var game: DatabaseObject = this.allDBObjects[i]
      const winners : string[] = new Array();
      const loserHorse : string[] = new Array();
      const loserWinner : string[] = new Array();
      this.populateWinner(winners, game.scores)
      this.populateLoserHorse(loserHorse, game.scores)
      this.populateLoserPoints(loserWinner, game.scores)
      var gameObject : PastGameObject ={
        gameId: game.id,
        dateTime: (new Date(game.dateTime)).toDateString(),
        winner: winners.join(', '),
        loserPoints: loserWinner.join(', '),
        loserHorses: loserHorse.join(', '),
      }
      this.sortedData.push(gameObject)
    }
  }

  viewGameScore(gameId){
    this.router.navigate(["/past-game", gameId])
  }

  populateWinner(winnerArray, scores){
    const maxScore : number = this.findMaxScore(scores);
    for(var player in scores){
      if(parseInt(scores[player][0]) == maxScore){
        winnerArray.push(player)
      }
    }
  }

  populateLoserHorse(loserHorseArray, scores){
    const maxHorse : number = this.findLostHorses(scores);
    for(var player in scores){
      if(parseInt(scores[player][1]) == maxHorse){
        loserHorseArray.push(player)
      }
    }
  }

  populateLoserPoints(loserScoreArray, scores){
    const minScore : number = this.findLostScore(scores);
    for(var player in scores){
      if(parseInt(scores[player][0]) == minScore){
        loserScoreArray.push(player)
      }
    }
  }

  findMaxScore(scores){
    let maxScore: number = 0;
    for(var player in scores){
      if(parseInt(scores[player][0]) > maxScore){
        maxScore = parseInt(scores[player][0]);
      }
    }
    return maxScore;
  }

  findLostScore(scores){
    let minScore: number = 10000;
    for(var player in scores){
      if(parseInt(scores[player][0]) < minScore){
        minScore = parseInt(scores[player][0]);
      }
    }
    return minScore;
  }

  findLostHorses(scores){
    let maxHorse: number = 0;
    for(var player in scores){
      if(parseInt(scores[player][1]) > maxHorse){
        maxHorse = parseInt(scores[player][1]);
      }
    }
    return maxHorse;
  }

}
