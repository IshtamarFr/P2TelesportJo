import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Chart } from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  olympics$!: Observable<Array<Olympic>>;
  pieChart!: any;
  mLabels: Array<string> = [];
  mMedals: Array<number> = [];
  mNumberOfGames: number = 0;

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.subscribe((value) => this.modifyChart(value));
  }

  //This code makes an empty chart
  createChart(): void {
    this.pieChart = new Chart('MyChart', {
      type: 'pie',
      plugins: [ChartDataLabels],

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
        maintainAspectRatio: false,

        onClick: (e) => {
          //Need to use this nasty getElementsAtEventForMode to get the index for the click (got data from chart.js API)
          try {
            this.router.navigateByUrl(
              '/' +
                this.pieChart.getElementsAtEventForMode(
                  e,
                  'nearest',
                  { intersect: true },
                  true
                )[0].index
            );
            //Used this catch to not throw error when clicked on empty space : no problem at all
          } catch {}
        },
        plugins: {
          legend: {
            display: false,
          },
          datalabels: {
            anchor: 'end',
            align: 'start',
            offset: 15,
            color: 'black',
            font: {
              size: 15,
              weight: 1000,
            },
            formatter: function (value, context) {
              if (context.chart.data.labels) {
                return context.chart.data.labels[context.dataIndex];
              } else {
                return value;
              }
            },
          },
        },
      },
    });
  }

  //Callback from Observable
  modifyChart(olympics: Array<Olympic>): void {
    if (olympics) {
      for (let i = 0; i < olympics.length; i++) {
        this.mLabels.push(olympics[i].country);
        this.mMedals.push(this.olympicService.countMedals(olympics[i]));
      }
      this.mNumberOfGames = this.olympicService.countUniqueGames(olympics);
      this.createChart();
    }
  }
}
