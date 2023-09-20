import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, take } from 'rxjs';
import { OlympicService } from './core/services/olympic.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private olympicService: OlympicService, public title: Title) {}
  subscription!: Subscription;

  ngOnInit(): void {
    //Included in starter : mandatory so data are imported from mock/backend
    this.subscription = this.olympicService
      .loadInitialData()
      .pipe(take(1))
      .subscribe();
    this.title.setTitle('olympic-games-starter');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
