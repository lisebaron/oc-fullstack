import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import Olympic from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private _olympics: BehaviorSubject<Olympic[]> = new BehaviorSubject<Olympic[]>([]);

  constructor(private http: HttpClient) { }

  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this._olympics.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this._olympics.next([]);
        return caught;
      })
    );
  }

  getOlympics(): Observable<Olympic[]> {
    return this._olympics.asObservable();
  }

  getOlympicById(id: number): Observable<Olympic | undefined> {
    console.log(id);
    console.log(this._olympics.getValue());
    
    // if (id <= 0 || !isNaN(id) || id > this._olympics.getValue().length) {
    //   console.log("Hello");
    //   // this.router.navigate(["/not-found"]);
    // }
    let obs = this._olympics.asObservable();

    return obs.pipe(
      map(olympics => olympics.find(o => o.id == id)),
      catchError((error, caught) => {
        console.error("Error while finding olympic by Id : ", error);
        return caught;
      })
    );
  }
}
