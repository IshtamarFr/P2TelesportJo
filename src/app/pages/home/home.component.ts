import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$!: Observable<Array<Olympic>>;
  public pieChart!: any;

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
    this.pieChart = new Chart('MyChart', {
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
