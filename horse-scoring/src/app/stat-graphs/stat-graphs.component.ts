import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayerStats } from '../model/player-stats.model';

@Component({
  selector: 'app-stat-graphs',
  templateUrl: './stat-graphs.component.html',
  styleUrls: ['./stat-graphs.component.css']
})
export class StatGraphsComponent implements OnInit {

  currentPlayer: string;
  allPlayerStats: PlayerStats[];

  constructor(private ActivedRoute: ActivatedRoute) {
   }

  ngOnInit(): void {
    this.currentPlayer = this.ActivedRoute.snapshot.paramMap.get("name");
    this.getPlaterStats();
    this.populateGamesPlayed()
  }

  chart: any;
	
  chartOptions = {
    animationEnabled: true,
    data: [{        
      type: "column",
      dataPoints: [    
      ]
    }]
  }

  getChartInstance(chart: object) {
		this.chart = chart;
	}

  updateChart = () => {
		this.chart.render();
	}	

  statChange(event){
    let newStatToShow = (<HTMLSelectElement>event).value

    switch (newStatToShow){
      case "gamesPlayed":
        this.setGamePlayedStat();
        break;
      case "gamesWon":
        this.setGameWonStat();
        break;
      case "winPercentage":
        this.setWinPercentage();
        break;
      case "totalPoints":
        this.setTotalPoints();
        break;
      case "totalHorses":
        this.setTotalHorses();
        break;
      case "avgPointsPerGame":
        this.setAvgPointsPerGame();
        break;
      case "avgHorsesPerGame":
        this.setAvgHorsesPerGame();
        break;
      case "averagePointsPerRound":
        this.setAvgPointsPerRound();
        break;
      case "averageHorsesPerRound":
        this.setAvgHorsesPerRound();
        break;
      case "totalLossesPoints":
        this.setTotalLossesPoints();
        break;
      case "totalLossesHorses":
        this.setTotalLossesHorses();
        break;
      case "tieBreakersWon":
        this.setTireBreakersWon();
        break;
      case "tieBreakersLost":
        this.setTireBreakersLost();
        break;
    }
    this.updateChart()
      
  }

  async getPlaterStats(){
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    await sleep(1750)
    this.allPlayerStats = PlayerStats.allPlayerStats;
  }

  async populateGamesPlayed(){
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    await sleep(1750)

    this.allPlayerStats.sort(function(a,b){
      return b.gamesPlayed - a.gamesPlayed;
    });

    for(let i =0; i < this.allPlayerStats.length; i++){
      var currentPlayerStats: PlayerStats = this.allPlayerStats[i]
      var obj = {
        label: currentPlayerStats.name,
        y: currentPlayerStats.gamesPlayed
      }
      if(currentPlayerStats.name === this.currentPlayer){
        obj["color"] = "red"
      }
      else{
        obj["color"] = "RoyalBlue"
      }
      this.chartOptions["data"][0]["dataPoints"].push(obj)
    }
    this.updateChart()
  }

  setGamePlayedStat(){
    this.chartOptions["data"][0]["dataPoints"] = []
    this.allPlayerStats.sort(function(a,b){
      return b.gamesPlayed - a.gamesPlayed;
    });
    for(let i =0; i < this.allPlayerStats.length; i++){
      var currentPlayerStats: PlayerStats = this.allPlayerStats[i]
      var obj = {  label: currentPlayerStats.name, y: currentPlayerStats.gamesPlayed}
      if(currentPlayerStats.name === this.currentPlayer){
        obj["color"] = "red"
      }
      else{
        obj["color"] = "RoyalBlue"
      }
      this.chartOptions["data"][0]["dataPoints"].push(obj)
    }
  }

  setGameWonStat(){
    this.chartOptions["data"][0]["dataPoints"] = []
    this.allPlayerStats.sort(function(a,b){
      return b.gamesWon - a.gamesWon;
    });
    for(let i =0; i < this.allPlayerStats.length; i++){
      var currentPlayerStats: PlayerStats = this.allPlayerStats[i]
      var obj = {  label: currentPlayerStats.name, y: currentPlayerStats.gamesWon}
      if(currentPlayerStats.name === this.currentPlayer){
        obj["color"] = "red"
      }
      else{
        obj["color"] = "RoyalBlue"
      }
      this.chartOptions["data"][0]["dataPoints"].push(obj)
    }
  }

  setWinPercentage(){
    
    this.chartOptions["data"][0]["dataPoints"] = []
    this.allPlayerStats.sort(function(a,b){
      return ((b.gamesWon / b.gamesPlayed)* 100)- ((a.gamesWon / a.gamesPlayed)* 100);
    });
    for(let i =0; i < this.allPlayerStats.length; i++){
      var currentPlayerStats: PlayerStats = this.allPlayerStats[i]
      var obj = {  label: currentPlayerStats.name, y: parseFloat(((currentPlayerStats.gamesWon / currentPlayerStats.gamesPlayed)*100).toFixed(2))}
      if(currentPlayerStats.name === this.currentPlayer){
        obj["color"] = "red"
      }
      else{
        obj["color"] = "RoyalBlue"
      }
      this.chartOptions["data"][0]["dataPoints"].push(obj)
    }
  }

  setTotalPoints(){
    this.chartOptions["data"][0]["dataPoints"] = []
    this.allPlayerStats.sort(function(a,b){
      return b.totalPoints - a.totalPoints;
    });
    for(let i =0; i < this.allPlayerStats.length; i++){
      var currentPlayerStats: PlayerStats = this.allPlayerStats[i]
      var obj = {  label: currentPlayerStats.name, y: currentPlayerStats.totalPoints}
      if(currentPlayerStats.name === this.currentPlayer){
        obj["color"] = "red"
      }
      else{
        obj["color"] = "RoyalBlue"
      }
      this.chartOptions["data"][0]["dataPoints"].push(obj)
    }
  }

  setTotalHorses(){
    this.chartOptions["data"][0]["dataPoints"] = []
    this.allPlayerStats.sort(function(a,b){
      return b.totalHorses - a.totalHorses;
    });
    for(let i =0; i < this.allPlayerStats.length; i++){
      var currentPlayerStats: PlayerStats = this.allPlayerStats[i]
      var obj = {  label: currentPlayerStats.name, y: currentPlayerStats.totalHorses}
      if(currentPlayerStats.name === this.currentPlayer){
        obj["color"] = "red"
      }
      else{
        obj["color"] = "RoyalBlue"
      }
      this.chartOptions["data"][0]["dataPoints"].push(obj)
    }
  }

  setAvgPointsPerGame(){
    this.chartOptions["data"][0]["dataPoints"] = []
    this.allPlayerStats.sort(function(a,b){
      return parseFloat((b.totalPoints / b.gamesPlayed).toFixed(2)) - parseFloat((a.totalPoints / a.gamesPlayed).toFixed(2));
    });
    for(let i =0; i < this.allPlayerStats.length; i++){
      var currentPlayerStats: PlayerStats = this.allPlayerStats[i]
      var obj = {  label: currentPlayerStats.name, y: parseFloat((currentPlayerStats.totalPoints / currentPlayerStats.gamesPlayed).toFixed(2))}
      if(currentPlayerStats.name === this.currentPlayer){
        obj["color"] = "red"
      }
      else{
        obj["color"] = "RoyalBlue"
      }
      this.chartOptions["data"][0]["dataPoints"].push(obj)
    }
  }

  setAvgHorsesPerGame(){
    this.chartOptions["data"][0]["dataPoints"] = []
    this.allPlayerStats.sort(function(a,b){
      return parseFloat((b.totalHorses / b.gamesPlayed).toFixed(2)) - parseFloat((a.totalHorses / a.gamesPlayed).toFixed(2));
    });
    for(let i =0; i < this.allPlayerStats.length; i++){
      var currentPlayerStats: PlayerStats = this.allPlayerStats[i]
      var obj = {  label: currentPlayerStats.name, y: parseFloat((currentPlayerStats.totalHorses / currentPlayerStats.gamesPlayed).toFixed(2))}
      if(currentPlayerStats.name === this.currentPlayer){
        obj["color"] = "red"
      }
      else{
        obj["color"] = "RoyalBlue"
      }
      this.chartOptions["data"][0]["dataPoints"].push(obj)
    }
  }

  setAvgPointsPerRound(){
    this.chartOptions["data"][0]["dataPoints"] = []
    this.allPlayerStats.sort(function(a,b){
      return parseFloat((b.totalPoints / b.roundsPlayed).toFixed(2)) - parseFloat((a.totalPoints / a.roundsPlayed).toFixed(2));
    });
    for(let i =0; i < this.allPlayerStats.length; i++){
      var currentPlayerStats: PlayerStats = this.allPlayerStats[i]
      var obj = {  label: currentPlayerStats.name, y: parseFloat((currentPlayerStats.totalPoints / currentPlayerStats.roundsPlayed).toFixed(2))}
      if(currentPlayerStats.name === this.currentPlayer){
        obj["color"] = "red"
      }
      else{
        obj["color"] = "RoyalBlue"
      }
      this.chartOptions["data"][0]["dataPoints"].push(obj)
    }
  }

  setAvgHorsesPerRound(){
    this.chartOptions["data"][0]["dataPoints"] = []
    this.allPlayerStats.sort(function(a,b){
      return parseFloat((b.totalHorses / b.roundsPlayed).toFixed(2)) - parseFloat((a.totalHorses / a.roundsPlayed).toFixed(2));
    });
    for(let i =0; i < this.allPlayerStats.length; i++){
      var currentPlayerStats: PlayerStats = this.allPlayerStats[i]
      var obj = {  label: currentPlayerStats.name, y: parseFloat((currentPlayerStats.totalHorses / currentPlayerStats.roundsPlayed).toFixed(2))}
      if(currentPlayerStats.name === this.currentPlayer){
        obj["color"] = "red"
      }
      else{
        obj["color"] = "RoyalBlue"
      }
      this.chartOptions["data"][0]["dataPoints"].push(obj)
    }
  }

  setTotalLossesPoints(){
    this.chartOptions["data"][0]["dataPoints"] = []
    this.allPlayerStats.sort(function(a,b){
      return b.gamesLostOnPoints - a.gamesLostOnPoints;
    });
    for(let i =0; i < this.allPlayerStats.length; i++){
      var currentPlayerStats: PlayerStats = this.allPlayerStats[i]
      var obj = {  label: currentPlayerStats.name, y: currentPlayerStats.gamesLostOnPoints}
      if(currentPlayerStats.name === this.currentPlayer){
        obj["color"] = "red"
      }
      else{
        obj["color"] = "RoyalBlue"
      }
      this.chartOptions["data"][0]["dataPoints"].push(obj)
    }
  }

  setTotalLossesHorses(){
    this.chartOptions["data"][0]["dataPoints"] = []
    this.allPlayerStats.sort(function(a,b){
      return b.gamesLostOnHorses - a.gamesLostOnHorses;
    });
    for(let i =0; i < this.allPlayerStats.length; i++){
      var currentPlayerStats: PlayerStats = this.allPlayerStats[i]
      var obj = {  label: currentPlayerStats.name, y: currentPlayerStats.gamesLostOnHorses}
      if(currentPlayerStats.name === this.currentPlayer){
        obj["color"] = "red"
      }
      else{
        obj["color"] = "RoyalBlue"
      }
      this.chartOptions["data"][0]["dataPoints"].push(obj)
    }
  }

  setTireBreakersWon(){
    this.chartOptions["data"][0]["dataPoints"] = []
    this.allPlayerStats.sort(function(a,b){
      return b.tiebreakersWon - a.tiebreakersWon;
    });
    for(let i =0; i < this.allPlayerStats.length; i++){
      var currentPlayerStats: PlayerStats = this.allPlayerStats[i]
      var obj = {  label: currentPlayerStats.name, y: currentPlayerStats.tiebreakersWon}
      if(currentPlayerStats.name === this.currentPlayer){
        obj["color"] = "red"
      }
      else{
        obj["color"] = "RoyalBlue"
      }
      this.chartOptions["data"][0]["dataPoints"].push(obj)
    }
  }

  setTireBreakersLost(){
    this.chartOptions["data"][0]["dataPoints"] = []
    this.allPlayerStats.sort(function(a,b){
      return b.tiebreakersLost - a.tiebreakersLost;
    });
    for(let i =0; i < this.allPlayerStats.length; i++){
      var currentPlayerStats: PlayerStats = this.allPlayerStats[i]
      var obj = {  label: currentPlayerStats.name, y: currentPlayerStats.tiebreakersLost}
      if(currentPlayerStats.name === this.currentPlayer){
        obj["color"] = "red"
      }
      else{
        obj["color"] = "RoyalBlue"
      }
      this.chartOptions["data"][0]["dataPoints"].push(obj)
    }
  }

}
