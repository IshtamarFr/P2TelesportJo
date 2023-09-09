import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<any>(undefined);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<Array<Olympic>>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next(null);
        return caught;
      })
    );
  }

  getOlympics(): Observable<Array<Olympic>> {
    return this.olympics$.asObservable();
  }

  countUniqueGames(): number {
    var setOlympic = new Set<number>();
    const olympics = this.olympics$.getValue();
    for (let i = 0; i < olympics.getValue().length; i++) {
      for (let j = 0; j < olympics[i].participations.length; j++) {
        setOlympic.add(olympics[i].participations[j].year);
      }
    }
    return setOlympic.size;
  }
}
