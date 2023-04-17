import { Injectable } from '@angular/core';
import { DatabaseObject } from './model/database-object.model';
import { PlayerStats } from './model/player-stats.model';
import { MonthlyPlayerStats } from './model/monthly-player-stats.model';

@Injectable({
  providedIn: 'root'
})
export class StatCalcService {

  playerStatArray = new Array();
  constructor() {}

  createStats(allDBObjects, addToStaticList, monthlyStats){
    
    this.playerStatArray = new Array();
    for(let i =0; i < allDBObjects.length; i++){
      let dbObject: DatabaseObject = allDBObjects[i]
      var scorePlacments = this.sortPlacement(dbObject.scores)
      for(let j = 0 ; j < dbObject.players.length; j++){
        if(!PlayerStats.playerStatsExist(dbObject.players[j]) && !this.playerStatsExist(dbObject.players[j]) ){
          if(monthlyStats){
            this.playerStatArray.push(new MonthlyPlayerStats(dbObject.players[j], addToStaticList))
          }
          else{
            this.playerStatArray.push(new PlayerStats(dbObject.players[j], addToStaticList))
          }
          
        }
      }
      for(var player in dbObject.scores){
        var playerStats : PlayerStats = this.playerStatArray.filter(obj => obj.name.toLowerCase() === player.toLowerCase())[0] // PlayerStats.getPlayerStats(player)
        playerStats.gamesPlayed++;
        playerStats.roundsPlayed += dbObject.numRounds;
        playerStats.totalPoints += dbObject.scores[player][0]
        playerStats.totalHorses += dbObject.scores[player][1]
        if(dbObject.tiebreakers != null){
          if(dbObject.tiebreakers.points != null){
            if(dbObject.tiebreakers.points.won.toLowerCase() === player.toLowerCase()){
              playerStats.tiebreakersWon++;
            }
            if(dbObject.tiebreakers.points.lost.toLowerCase() === player.toLowerCase()){
              playerStats.tiebreakersLost++;
            }
          }
          if(dbObject.tiebreakers.horses != null){
            if(dbObject.tiebreakers.horses.won.toLowerCase() === player.toLowerCase()){
              playerStats.tiebreakersWon++;
            }
            if(dbObject.tiebreakers.horses.lost.toLowerCase() === player.toLowerCase()){
              playerStats.tiebreakersLost++;
            }
          }
        }

        this.giveWinStat(dbObject.scores, playerStats, player);
        this.giveLosePointsStat(dbObject.scores, playerStats, player);
        this.giveLoseHorseStat(dbObject.scores, playerStats, player);
      }
      this.updatePlacementStats(scorePlacments, dbObject.scores)
    }
    return this.playerStatArray;

  }

  sortPlacement(scores){
    let keysSorted = Object.keys(scores).sort(function(a,b){return scores[b][0]-scores[a][0]})
    return keysSorted
  }

  updatePlacementStats(scorePlacement, scores){
    var currentPlacement: number = 1;
    var currentScore: number = scores[scorePlacement[0]][0];

    
    for(let i=0; i < scorePlacement.length; i++){

      if(scores[scorePlacement[i]][0] < currentScore){
        currentScore = scores[scorePlacement[i]][0];
        currentPlacement++;
      }
     
     // var placementFinish = PlayerStats.getPlayerStats(scorePlacement[i]).placementFinished.get(currentPlacement);
      var placementFinish =  this.playerStatArray.filter(obj => obj.name.toLowerCase() === scorePlacement[i])[0].placementFinished.get(currentPlacement);
      this.playerStatArray.filter(obj => obj.name.toLowerCase() === scorePlacement[i])[0].placementFinished.set(currentPlacement, placementFinish + 1);
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

  playerStatsExist(name: string): boolean{
    for(let i =0; i < this.playerStatArray.length; i++){
        if(this.playerStatArray[i].name.toLowerCase() === name.toLowerCase()){
            return true;
        }
    }
    return false;
  }

  


}
