import { Injectable } from '@angular/core';
import { DatabaseService } from '../app/database.service';
import { DatabaseObject } from './model/database-object.model';
import { PlayerStats } from './model/player-stats.model';

@Injectable({
  providedIn: 'root'
})
export class StatCalcService {

  allDBObjects: DatabaseObject[];

  constructor(private databaseService: DatabaseService) {
    this.allDBObjects = new Array();
    this.populateInitialObjects()
   }

   populateInitialObjects(){
    this.databaseService.getAllData().then((response)=> {
      for(let i = 0; i < response.length; i++){
        this.allDBObjects.push(response[i]["data"])
      }
     }) 
     
   }
  async createStats(){
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    await sleep(1500)
    
    for(let i =0; i < this.allDBObjects.length; i++){
      let dbObject: DatabaseObject = this.allDBObjects[i]
      console.log(dbObject)
      for(let j = 0 ; j < dbObject.players.length; j++){
        if(!PlayerStats.playerStatsExist(dbObject.players[j])){
          new PlayerStats(dbObject.players[j])
        }
      }
      for(var player in dbObject.scores){
        var playerStats : PlayerStats = PlayerStats.getPlayerStats(player)
        playerStats.gamesPlayed++;
        playerStats.totalPoints += dbObject.scores[player][0]
        playerStats.totalHorses += dbObject.scores[player][1]
        this.giveWinStat(dbObject.scores, playerStats, player);
        this.giveLosePointsStat(dbObject.scores, playerStats, player);
        this.giveLoseHorseStat(dbObject.scores, playerStats, player);
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

  giveWinStat(scores, playerStat, player){
    const maxScore : number = this.findMaxScore(scores);
    if(parseInt(scores[player][0]) === maxScore){
      playerStat.gamesWon++;
    }
  }

  giveLosePointsStat(scores, playerStat, player){
    const minScore : number = this.findLostScore(scores);
    if(parseInt(scores[player][0]) === minScore){
      playerStat.gamesLostOnPoints++;
    }
  }

  giveLoseHorseStat(scores, playerStat, player){
    const maxHorse : number = this.findLostHorses(scores);
    if(parseInt(scores[player][1]) === maxHorse){
      playerStat.gamesLostOnHorses++;
    }
  }


}
