import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Observable } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit {
  country!: Olympic;
  olympics$!: Observable<Array<Olympic>>;
  countryId!: number;
  lineChart: any;
  mLabels: Array<number> = [];
  mMedals: Array<number> = [];
  totalMedals: number = 0;
  totalAthletes: number = 0;

  constructor(
    private olympicService: OlympicService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.countryId = +this.route.snapshot.params['id'];
    this.olympics$ = this.olympicService.getOlympics();
    this.olympics$.subscribe((value) => this.modifyChart(value));
  }

  //This code makes an empty chart
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

  //This code makes a chart from selected country
  modifyChart(olympics: Array<Olympic>): void {
    if (olympics) {
      const olympic = olympics[this.countryId].participations;
      for (let i = 0; i < olympic.length; i++) {
        this.mLabels.push(olympic[i].year);
        this.mMedals.push(olympic[i].medalsCount);
        this.totalMedals += olympic[i].medalsCount;
        this.totalAthletes += olympic[i].athleteCount;
      }
      this.createChart();
    } else {
      this.router.navigateByUrl('error');
    }
  }
}
