import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { mapTo, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Activity, CreateActivity } from './models';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private readonly endpoint = `${environment.apiRoot}/user/workout-activities`;
  private activities = new BehaviorSubject<Activity[] | undefined>(undefined);
  activities$ = this.activities.asObservable();

  constructor(private http: HttpClient) {}

  getActivities(): Observable<void> {
    return this.http.get<Activity[]>(this.endpoint).pipe(
      tap(activities => this.activities.next(activities)),
      mapTo(undefined)
    );
  }

  createActivity(activity: CreateActivity): Observable<Activity> {
    return this.http.post<Activity>(this.endpoint, activity).pipe(
      tap(newActivity => {
        const currentActivities = this.activities.value
          ? this.activities.value
          : [];
        currentActivities.push(newActivity);
        this.activities.next(currentActivities);
      })
    );
  }
}
