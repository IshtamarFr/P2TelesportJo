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
  olympics$!: Observable<Array<Olympic>>;
  pieChart!: any;
  mLabels!: Array<string>;
  mMedals!: Array<number>;

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.mLabels = [];
    this.mMedals = [];
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.subscribe((value) => this.modifyChart(value));
  }

  //This code makes an empty chart
  createChart() {
    this.pieChart = this.pieChart = new Chart('MyChart', {
      type: 'pie',

      data: {
        labels: this.mLabels,
        datasets: [
          {
            data: this.mMedals,
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        aspectRatio: 2.5,
        onClick: () => console.log('clicked'),
      },
    });
  }

  //This code makes a chart from all countries and counts how many medals they get in total
  modifyChart(olympics: Array<Olympic>) {
    if (olympics) {
      for (let i = 0; i < olympics.length; i++) {
        this.mLabels.push(olympics[i].country);
        let medals: number = 0;

        for (let j = 0; j < olympics[i].participations.length; j++) {
          medals += olympics[i].participations[j].medalsCount;
        }
        this.mMedals.push(medals);
      }
      this.createChart();
    }
  }
}
