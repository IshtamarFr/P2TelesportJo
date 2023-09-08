import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Olympic } from '../../core/models/Olympic';
import { Observable } from 'rxjs';
import { OlympicService } from '../../core/services/olympic.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
  public olympics$!: Observable<Array<Olympic>>;

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
  }

  createChart(olympics: Array<Olympic>) {
    //This code lists all countries and counts how many medals they get in total
    let mLabels: Array<string> = [];
    let mMedals: Array<number> = [];

    for (let i = 0; i < olympics.length; i++) {
      mLabels.push(olympics[i].country);
      let medals: number = 0;

      for (let j = 0; j < olympics[i].participations.length; j++) {
        medals += olympics[i].participations[j].medalsCount;
      }
      mMedals.push(medals);
    }

    //This code returns the pie chart
    return new Chart('MyChart', {
      type: 'pie',

      data: {
        labels: mLabels,
        datasets: [
          {
            data: mMedals,
            hoverOffset: 4,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
}
