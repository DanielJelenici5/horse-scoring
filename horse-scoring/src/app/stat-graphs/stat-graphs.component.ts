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

    console.log(this.allPlayerStats)

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

}
