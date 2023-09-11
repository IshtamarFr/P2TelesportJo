import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';
import { Router } from '@angular/router';

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

  countMedals(olympic: Olympic): number {
    let medals: number = 0;

    for (let i = 0; i < olympic.participations.length; i++) {
      medals += olympic.participations[i].medalsCount;
    }
    return medals;
  }

  countUniqueGames(olympics: Array<Olympic> | null): number {
    var setOlympic = new Set<number>();
    if (olympics) {
      for (let i = 0; i < olympics.length; i++) {
        for (let j = 0; j < olympics[i].participations.length; j++) {
          setOlympic.add(olympics[i].participations[j].year);
        }
      }
      return setOlympic.size;
    } else {
      return 0;
    }
  }
}
