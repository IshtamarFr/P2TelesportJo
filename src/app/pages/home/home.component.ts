import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, of, take } from 'rxjs';
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
export class HomeComponent implements OnInit, OnDestroy {
  olympics$!: Observable<Array<Olympic>>;
  pieChart!: any;
  mLabels: Array<string> = [];
  mMedals: Array<number> = [];
  mNumberOfGames: number = 0;
  subscription!: Subscription;
  data!: Subscription;

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.data = this.olympicService.loadInitialData().subscribe();
    this.olympics$ = this.olympicService.getOlympics();
    this.subscription = this.olympics$.subscribe((value) => {
      this.modifyChartData(value);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.data.unsubscribe();
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

  //Sets chart and data from Observable subscription
  modifyChartData(olympics: Array<Olympic>): void {
    if (olympics) {
      for (let olympic of olympics) {
        this.mLabels.push(olympic.country);
        this.mMedals.push(this.olympicService.countMedals(olympic));
      }
      this.mNumberOfGames = this.olympicService.countUniqueGames(olympics);
      this.createChart();
    }
  }
}
