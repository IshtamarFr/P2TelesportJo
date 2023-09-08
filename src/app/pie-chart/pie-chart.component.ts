import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Olympic } from '../core/models/Olympic';
import { Observable } from 'rxjs';
import { OlympicService } from '../core/services/olympic.service';

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
    return new Chart('MyChart', {
      type: 'pie',

      data: {
        // values on X-Axis
        labels: olympics.map((x) => x.country),
        datasets: [
          {
            data: olympics.map((x) => x.participations.length),
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
