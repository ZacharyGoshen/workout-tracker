import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkoutSession } from '../models/workout-session';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorkoutSessionService {

  private workoutSessionsUrl = 'workoutSessions';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getWorkoutSessions(): Observable<WorkoutSession[]> {
    return this.http.get<WorkoutSession[]>(this.workoutSessionsUrl);
  }

  addWorkoutSession(workoutSession: WorkoutSession): Observable<WorkoutSession> {
    return this.http.post<WorkoutSession>(this.workoutSessionsUrl, workoutSession, this.httpOptions);
  }

  deleteWorkoutSession(workoutSessionId: number): Observable<WorkoutSession> {
    let url = `${this.workoutSessionsUrl}/${workoutSessionId}`;
    return this.http.delete<WorkoutSession>(url);
  }

}
