import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Workout } from './workout.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, mapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  private readonly workoutEndpoint: string = environment.apiRoot + '/workout-program';

  workouts$: BehaviorSubject<Workout[] | undefined> = new BehaviorSubject<Workout[] | undefined>(undefined);
  
  constructor(private httpClient: HttpClient) { }
  
  public getWorkouts(): Observable<void> {
    // return this.httpClient.get<Workout[]>(this.workoutEndpoint).pipe(
    return of(this.workoutStub()).pipe(
      tap(workout => this.workouts$.next(workout)),
      mapTo(undefined)
    )
  }

  public getSingleWorkout(id: string): Observable<Workout> {
    // return this.httpClient.get<Workout>(this.workoutEndpoint + '/' + id);
    return of({
      'id': '312dsagas!',
      'title': 'Løbetur1',
      'owner': 'Nian',
      'exercises': [
        {
          'id': 'id1',
          'name': 'løb',
          'description': 'bare løb hurtigt og langt',
          'numberOfSets': 2,
          'numberOfRepetitions': 0,
          'timeInMinutes': 20,
        },
        {
          'id': 'id2',
          'name': 'hop',
          'description': 'indtil døden',
          'numberOfSets': 20,
          'numberOfRepetitions': 5,
          'timeInMinutes': 0,
        },
        {
          'id': 'id2',
          'name': 'hop',
          'description': 'indtil døden',
          'numberOfSets': 20,
          'numberOfRepetitions': 5,
          'timeInMinutes': 0,
        },
        {
          'id': 'id2',
          'name': 'hop',
          'description': 'indtil døden',
          'numberOfSets': 20,
          'numberOfRepetitions': 5,
          'timeInMinutes': 0,
        },
        {
          'id': 'id2',
          'name': 'hop',
          'description': 'indtil døden',
          'numberOfSets': 20,
          'numberOfRepetitions': 5,
          'timeInMinutes': 0,
        },
        {
          'id': 'id2',
          'name': 'hop',
          'description': 'indtil døden',
          'numberOfSets': 20,
          'numberOfRepetitions': 5,
          'timeInMinutes': 0,
        },
        {
          'id': 'id2',
          'name': 'hop',
          'description': 'indtil døden',
          'numberOfSets': 20,
          'numberOfRepetitions': 5,
          'timeInMinutes': 0,
        },
        {
          'id': 'id2',
          'name': 'hop',
          'description': 'indtil døden',
          'numberOfSets': 20,
          'numberOfRepetitions': 5,
          'timeInMinutes': 0,
        },
        {
          'id': 'id2',
          'name': 'hop',
          'description': 'indtil døden',
          'numberOfSets': 20,
          'numberOfRepetitions': 5,
          'timeInMinutes': 0,
        },
        {
          'id': 'id2',
          'name': 'hop',
          'description': 'indtil døden',
          'numberOfSets': 20,
          'numberOfRepetitions': 5,
          'timeInMinutes': 0,
        },
        {
          'id': 'id2',
          'name': 'hop',
          'description': 'indtil døden',
          'numberOfSets': 20,
          'numberOfRepetitions': 5,
          'timeInMinutes': 0,
        },
        {
          'id': 'id2',
          'name': 'hop',
          'description': 'indtil døden',
          'numberOfSets': 20,
          'numberOfRepetitions': 5,
          'timeInMinutes': 0,
        },
        {
          'id': 'id2',
          'name': 'hop',
          'description': 'indtil døden',
          'numberOfSets': 20,
          'numberOfRepetitions': 5,
          'timeInMinutes': 0,
        },
        {
          'id': 'id2',
          'name': 'hop',
          'description': 'indtil døden',
          'numberOfSets': 20,
          'numberOfRepetitions': 5,
          'timeInMinutes': 0,
        },
        {
          'id': 'id2',
          'name': 'hop',
          'description': 'indtil døden',
          'numberOfSets': 20,
          'numberOfRepetitions': 5,
          'timeInMinutes': 0,
        },
        {
          'id': 'id2',
          'name': 'hop',
          'description': 'indtil døden',
          'numberOfSets': 20,
          'numberOfRepetitions': 5,
          'timeInMinutes': 0,
        },
        {
          'id': 'id2',
          'name': 'hop',
          'description': 'indtil døden',
          'numberOfSets': 20,
          'numberOfRepetitions': 5,
          'timeInMinutes': 0,
        },
        {
          'id': 'id2',
          'name': 'hop',
          'description': 'indtil døden',
          'numberOfSets': 20,
          'numberOfRepetitions': 5,
          'timeInMinutes': 0,
        },
        {
          'id': 'id2',
          'name': 'hop',
          'description': 'indtil døden',
          'numberOfSets': 20,
          'numberOfRepetitions': 5,
          'timeInMinutes': 0,
        },
        {
          'id': 'id2',
          'name': 'hop',
          'description': 'indtil døden',
          'numberOfSets': 20,
          'numberOfRepetitions': 5,
          'timeInMinutes': 0,
        },
        {
          'id': 'id2',
          'name': 'hop',
          'description': 'indtil døden',
          'numberOfSets': 20,
          'numberOfRepetitions': 5,
          'timeInMinutes': 0,
        },
        {
          'id': 'id2',
          'name': 'hop',
          'description': 'indtil døden',
          'numberOfSets': 20,
          'numberOfRepetitions': 5,
          'timeInMinutes': 0,
        },
        {
          'id': 'id2',
          'name': 'hop',
          'description': 'indtil døden',
          'numberOfSets': 20,
          'numberOfRepetitions': 5,
          'timeInMinutes': 0,
        },
        {
          'id': 'id2',
          'name': 'hop',
          'description': 'indtil døden',
          'numberOfSets': 20,
          'numberOfRepetitions': 5,
          'timeInMinutes': 0,
        },
        {
          'id': 'id2',
          'name': 'hop',
          'description': 'indtil døden',
          'numberOfSets': 20,
          'numberOfRepetitions': 5,
          'timeInMinutes': 0,
        },
        {
          'id': 'id2',
          'name': 'hop',
          'description': 'indtil døden',
          'numberOfSets': 20,
          'numberOfRepetitions': 5,
          'timeInMinutes': 0,
        },
        {
          'id': 'id2',
          'name': 'hop',
          'description': 'indtil døden',
          'numberOfSets': 20,
          'numberOfRepetitions': 5,
          'timeInMinutes': 0,
        },
        {
          'id': 'id2',
          'name': 'hop',
          'description': 'indtil døden',
          'numberOfSets': 20,
          'numberOfRepetitions': 5,
          'timeInMinutes': 0,
        },
        {
          'id': 'id2',
          'name': 'hop',
          'description': 'indtil døden',
          'numberOfSets': 20,
          'numberOfRepetitions': 5,
          'timeInMinutes': 0,
        },
        {
          'id': 'id2',
          'name': 'hop',
          'description': 'indtil døden',
          'numberOfSets': 20,
          'numberOfRepetitions': 5,
          'timeInMinutes': 0,
        },
        {
          'id': 'id2',
          'name': 'hop',
          'description': 'indtil døden',
          'numberOfSets': 20,
          'numberOfRepetitions': 5,
          'timeInMinutes': 0,
        },
        {
          'id': 'id2',
          'name': 'hop',
          'description': 'indtil døden',
          'numberOfSets': 20,
          'numberOfRepetitions': 5,
          'timeInMinutes': 0,
        },
        {
          'id': 'id2',
          'name': 'hop',
          'description': 'indtil døden',
          'numberOfSets': 20,
          'numberOfRepetitions': 5,
          'timeInMinutes': 0,
        },
        {
          'id': 'id2',
          'name': 'hop',
          'description': 'indtil døden',
          'numberOfSets': 20,
          'numberOfRepetitions': 5,
          'timeInMinutes': 0,
        },
        {
          'id': 'id2',
          'name': 'hop',
          'description': 'indtil døden',
          'numberOfSets': 20,
          'numberOfRepetitions': 5,
          'timeInMinutes': 0,
        },
        {
          'id': 'id2',
          'name': 'hop',
          'description': 'indtil døden',
          'numberOfSets': 20,
          'numberOfRepetitions': 5,
          'timeInMinutes': 0,
        },
        {
          'id': 'id2',
          'name': 'hop',
          'description': 'indtil døden',
          'numberOfSets': 20,
          'numberOfRepetitions': 5,
          'timeInMinutes': 0,
        },
        {
          'id': 'id2',
          'name': 'hop',
          'description': 'indtil døden',
          'numberOfSets': 20,
          'numberOfRepetitions': 5,
          'timeInMinutes': 0,
        },
        {
          'id': 'id2',
          'name': 'hop',
          'description': 'indtil døden',
          'numberOfSets': 20,
          'numberOfRepetitions': 5,
          'timeInMinutes': 0,
        },
        {
          'id': 'id2',
          'name': 'hop',
          'description': 'indtil døden',
          'numberOfSets': 20,
          'numberOfRepetitions': 5,
          'timeInMinutes': 0,
        },
        {
          'id': 'id2',
          'name': 'hop',
          'description': 'indtil døden',
          'numberOfSets': 20,
          'numberOfRepetitions': 5,
          'timeInMinutes': 0,
        },
        {
          'id': 'id2',
          'name': 'hop',
          'description': 'indtil døden',
          'numberOfSets': 20,
          'numberOfRepetitions': 5,
          'timeInMinutes': 0,
        },
        {
          'id': 'id2',
          'name': 'hop',
          'description': 'indtil døden',
          'numberOfSets': 20,
          'numberOfRepetitions': 5,
          'timeInMinutes': 0,
        },
      ]
    })
  }

  private workoutStub(): Workout[] {
    return [
      {
        'id': '312dsagas!',
        'title': 'Løbetur1',
        'owner': 'Nian',
      },
      {
        'id': '3123453sagas!',
        'title': 'Løbetur2',
        'owner': 'Liv',
      },
      {
        'id': '312dsdasfgas!',
        'title': 'Løbetur3',
        'owner': 'NianLiv',
      },
      {
        'id': '3123453sagas!',
        'title': 'Løbetur2',
        'owner': 'Liv',
      },
      {
        'id': '312dsdasfgas!',
        'title': 'Løbetur3',
        'owner': 'NianLiv',
      },
      {
        'id': '3123453sagas!',
        'title': 'Løbetur2',
        'owner': 'Liv',
      },
      {
        'id': '312dsdasfgas!',
        'title': 'Løbetur3',
        'owner': 'NianLiv',
      },
      {
        'id': '3123453sagas!',
        'title': 'Løbetur2',
        'owner': 'Liv',
      },
      {
        'id': '312dsdasfgas!',
        'title': 'Løbetur3',
        'owner': 'NianLiv',
      },
      {
        'id': '3123453sagas!',
        'title': 'Løbetur2',
        'owner': 'Liv',
      },
      {
        'id': '312dsdasfgas!',
        'title': 'Løbetur3',
        'owner': 'NianLiv',
      },
      {
        'id': '3123453sagas!',
        'title': 'Løbetur2',
        'owner': 'Liv',
      },
      {
        'id': '312dsdasfgas!',
        'title': 'Løbetur3',
        'owner': 'NianLiv',
      },
      {
        'id': '3123453sagas!',
        'title': 'Løbetur2',
        'owner': 'Liv',
      },
      {
        'id': '312dsdasfgas!',
        'title': 'Løbetur3',
        'owner': 'NianLiv',
      },
      {
        'id': '3123453sagas!',
        'title': 'Løbetur2',
        'owner': 'Liv',
      },
      {
        'id': '312dsdasfgas!',
        'title': 'Løbetur3',
        'owner': 'NianLiv',
      },
    ];
  }

}
