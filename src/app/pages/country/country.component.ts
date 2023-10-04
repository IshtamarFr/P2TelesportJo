import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Observable, Subscription } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit, OnDestroy {
  country!: Olympic;
  olympics$!: Observable<Array<Olympic>>;
  countryId!: number;
  lineChart: any;
  mLabels: Array<number> = [];
  mMedals: Array<number> = [];
  totalMedals: number = 0;
  totalAthletes: number = 0;
  subscription!: Subscription;

  constructor(
    private olympicService: OlympicService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.countryId = +this.route.snapshot.params['id'];
    this.olympics$ = this.olympicService.getOlympics();
    this.subscription = this.olympics$.subscribe((value) =>
      this.modifyChartData(value)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Creates an empty line chart, responsive.
   *
   * @remarks
   * Requires {@link chart.js/auto} and {@link chartjs-plugin-datalabels}
   */
  createChart(): void {
    this.lineChart = new Chart('MyChart', {
      type: 'line',
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

        plugins: {
          legend: {
            display: false,
          },
          datalabels: {
            formatter: function (value, context) {
              return null;
            },
          },
        },
      },
    });
  }

  /**
   * Populates the empty line chart with correct data
   *
   * @param olympics - The array of olympics retrieved by service
   *
   * @remarks
   * Only the selected country is used
   */
  modifyChartData(olympics: Array<Olympic>): void {
    if (olympics) {
      const olympic = olympics[this.countryId].participations;
      for (let entry of olympic) {
        this.mLabels.push(entry.year);
        this.mMedals.push(entry.medalsCount);
        this.totalMedals += entry.medalsCount;
        this.totalAthletes += entry.athleteCount;
      }
      this.createChart();
    } else {
      this.router.navigateByUrl('error');
    }
  }

  goBackHome(): void {
    this.router.navigateByUrl('');
  }
}
