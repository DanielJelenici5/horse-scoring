import { Component, OnInit } from '@angular/core';
import { DatabaseObject } from '../model/database-object.model';
import { DatabaseService } from '../database.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HorseGame } from '../model/horse-game.model';

interface PastGameObject{
  gameId: string;
  dateTime: string;
  winner: string;
  loserPoints: string;
  loserHorses: string;
}

@Component({
  selector: 'app-month-past-games',
  templateUrl: './month-past-games.component.html',
  styleUrls: ['./month-past-games.component.css']
})

export class MonthPastGamesComponent implements OnInit {

  sortedData: PastGameObject[];

  allDBObjects: DatabaseObject[] = new Array();

  filteredMonth: String;

  constructor(private databaseService: DatabaseService, private router: Router, private ActivedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.filteredMonth = this.ActivedRoute.snapshot.paramMap.get("month").split('-').join(' ')
    HorseGame.allGames = new Array();
    this.databaseService.getAllJsonData().then((response)=> {
      for(let i = 0; i < response.length; i++){
        this.allDBObjects.push(response[i])
        console.log(response[i].id)
        console.log(response[i].dateTime)
      }
    })
    this.generateTable()
  }

  displayedColumns: string[] = ["Date Played", "Winner", "Loser By Points", "Loser By Horses", "Game Scores"];

  async generateTable(){
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    await sleep(1500)

    const filteredMonth = this.allDBObjects.filter(obj =>(new Date(obj.dateTime)).toLocaleString('default', { month: 'long' }) + " " + (new Date(obj.dateTime)).getFullYear() === this.filteredMonth);

    this.sortedData = new Array();

    filteredMonth.sort(function(a,b){
      return new Date(b.dateTime).valueOf() - new Date(a.dateTime).valueOf();
    });
    
    for(let i=0; i <filteredMonth.length; i++){
      var game: DatabaseObject = filteredMonth[i]
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
