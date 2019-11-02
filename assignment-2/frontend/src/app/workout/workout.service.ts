import { Injectable } from '@angular/core';
import { Workout } from './workout.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap, mapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  private readonly endpoint: string = "http://localhost:3000"
  workouts$ = new BehaviorSubject<Workout[] | undefined>(undefined);

  constructor(private httpClient: HttpClient) { }

  public getWorkouts(): Observable<void> {
    return this.httpClient.get<any>(this.endpoint).pipe(
      map(res => res.json),
      tap(workout => this.workouts$.next(workout)),
      mapTo(undefined)
    )
  }
}
