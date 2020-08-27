import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkoutSession } from '../models/workout-session';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorkoutSessionService {

  private workoutSessionsUrl = 'workoutSessions';

  constructor(private http: HttpClient) { }

  getWorkoutSessions(): Observable<WorkoutSession[]> {
    return this.http.get<WorkoutSession[]>(this.workoutSessionsUrl);
  }

}
