import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Workout, CreateWorkout } from './workout.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, mapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  private readonly workoutEndpoint: string = environment.apiRoot + '/workout-programs';

  workouts$: BehaviorSubject<Workout[] | undefined> = new BehaviorSubject<Workout[] | undefined>(undefined);

  constructor(private httpClient: HttpClient) { }

  public getWorkouts(): Observable<void> {
    return this.httpClient.get<Workout[]>(this.workoutEndpoint).pipe(
      tap(workout => this.workouts$.next(workout)),
      mapTo(undefined)
    );
  }

  public addWorkout(workout: CreateWorkout): Observable<Workout> {
    return this.httpClient.post<Workout>(this.workoutEndpoint, workout).pipe(
      tap(newWorkout => {
        const workouts = this.workouts$.value ? this.workouts$.value : [];
        workouts.push(newWorkout);
        this.workouts$.next(workouts);
      })
    );
  }

  public getWorkout(id: string): Observable<Workout> {
    return this.httpClient.get<Workout>(`${this.workoutEndpoint}/${id}`);
  }
}
