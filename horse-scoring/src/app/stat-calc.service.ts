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
      var scorePlacments = this.sortPlacement(dbObject.scores)
      for(let j = 0 ; j < dbObject.players.length; j++){
        if(!PlayerStats.playerStatsExist(dbObject.players[j])){
          new PlayerStats(dbObject.players[j])
        }
      }
      for(var player in dbObject.scores){
        var playerStats : PlayerStats = PlayerStats.getPlayerStats(player)
        playerStats.gamesPlayed++;
        playerStats.roundsPlayed += dbObject.numRounds;
        playerStats.totalPoints += dbObject.scores[player][0]
        playerStats.totalHorses += dbObject.scores[player][1]
        this.giveWinStat(dbObject.scores, playerStats, player);
        this.giveLosePointsStat(dbObject.scores, playerStats, player);
        this.giveLoseHorseStat(dbObject.scores, playerStats, player);
  
        
      }
      this.updatePlacementStats(scorePlacments, dbObject.scores )
      

    }
  }

  sortPlacement(scores){
    let keysSorted = Object.keys(scores).sort(function(a,b){return scores[b][0]-scores[a][0]})
    return keysSorted
  }

  updatePlacementStats(scorePlacement, scores){
    var currentPlacement: number = 1;
    var currentScore: number = scores[scorePlacement[0]][0];
    console.log("test")
    
    for(let i=0; i < scorePlacement.length; i++){

      if(scores[scorePlacement[i]][0] < currentScore){
        currentScore = scores[scorePlacement[i]][0];
        currentPlacement++;
      }
      var placementFinish = PlayerStats.getPlayerStats(scorePlacement[i]).placementFinished.get(currentPlacement);
      PlayerStats.getPlayerStats(scorePlacement[i]).placementFinished.set(currentPlacement, placementFinish + 1);
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
