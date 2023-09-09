import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private olympicService: OlympicService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.countryId = +this.route.snapshot.params['id'];
    this.olympics$ = this.olympicService.getOlympics();
  }
}
