import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';
import { Router } from '@angular/router';

/**
 * Main service for the Webapp, responsible for getting data and for calculations, which results are served to components
 */
@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<any>(undefined);

  constructor(private http: HttpClient, private router: Router) {}

  loadInitialData() {
    return this.http.get<Array<Olympic>>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        console.error(error);
        this.olympics$.next(null);
        this.router.navigateByUrl('error');
        return caught;
      })
    );
  }

  getOlympics(): Observable<Array<Olympic>> {
    return this.olympics$.asObservable();
  }

  /**
   * Returns the total number of medals for a chosen country
   *
   * @param olympic - The chosen country
   * @returns The addition of all numbers of medals for that country
   */
  countMedals(olympic: Olympic): number {
    let medals: number = 0;

    for (let participation of olympic.participations) {
      medals += participation.medalsCount;
    }
    return medals;
  }

  /**
   * Counts how many unique olympic game events have been recorded
   *
   * @param olympics - Data from API
   * @returns The number of olympic game events
   */
  countUniqueGames(olympics: Array<Olympic> | null): number {
    var setOlympic = new Set<number>();
    if (olympics) {
      for (let olympic of olympics) {
        for (let participation of olympic.participations) {
          setOlympic.add(participation.year);
        }
      }
      return setOlympic.size;
    } else {
      return 0;
    }
  }
}
