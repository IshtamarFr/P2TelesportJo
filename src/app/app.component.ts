import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OlympicService } from './core/services/olympic.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private olympicService: OlympicService, public title: Title) {}
  data!: Subscription;

  ngOnInit(): void {
    this.data = this.olympicService.loadInitialData().subscribe();
    this.title.setTitle('olympic-games-starter');
  }

  ngOnDestroy(): void {
    this.data.unsubscribe();
  }
}
