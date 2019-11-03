import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { mapTo, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../auth/user.model';
import { CreateExercise } from './exercise/exercise.model';
import { CreateWorkout, Workout } from './workout.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private readonly workoutEndpoint: string =
    environment.apiRoot + '/workout-programs';

  workouts$ = new BehaviorSubject<Workout[] | undefined>(undefined);

  constructor(private httpClient: HttpClient) {}

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

  public addExercise(
    id: string,
    user: User,
    exercise: CreateExercise
  ): Observable<CreateExercise> {
    const headers = new HttpHeaders({ user: JSON.stringify(user) });
    return this.httpClient.post<CreateExercise>(
      `${this.workoutEndpoint}/${id}/exercises`,
      exercise,
      { headers }
    );
  }

  public getWorkout(id: string): Observable<Workout> {
    return this.httpClient.get<Workout>(`${this.workoutEndpoint}/${id}`);
  }
}
