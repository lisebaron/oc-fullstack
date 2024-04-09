import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import Olympic from '../models/Olympic';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private _olympics: BehaviorSubject<Olympic[]> = new BehaviorSubject<Olympic[]>([]);

  constructor(private http: HttpClient,
    private toastr: ToastrService) { }

  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => {
        this._olympics.next(value)}),
      catchError((error) => {
        console.error("Error while loading Data: ", error);
        this.toastr.error("Error while loading Data", "Error", {
          timeOut: 5000,
          positionClass: "toast-bottom-right"
        });
        return of([]);
      })
    );
  }

  getOlympics(): Observable<Olympic[]> {
    return this._olympics.asObservable();
  }

  getOlympicById(id: number) {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      map((olympics: Olympic[]) => olympics.find(o => o.id == id)),
      catchError((error) => {
        console.error("Error while finding olympic by Id: ", error);
        this.toastr.error("Error while finding olympic by Id", "Error", {
          timeOut: 5000,
          positionClass: "toast-bottom-right"
        });
        return of(undefined);
      })
    )
  }
}