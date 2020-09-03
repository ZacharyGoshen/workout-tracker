import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkoutPlan } from '../models/workout-plan';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorkoutPlanService {

  private workoutPlansUrl = 'workoutPlans';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getWorkoutPlanById(id: number): Observable<WorkoutPlan> {
    return this.http.get<WorkoutPlan>(`${this.workoutPlansUrl}/${id}`);
  }

  getWorkoutPlans(): Observable<WorkoutPlan[]> {
    return this.http.get<WorkoutPlan[]>(this.workoutPlansUrl);
  }

  addWorkoutPlan(workoutPlan: WorkoutPlan): Observable<WorkoutPlan> {
    return this.http.post<WorkoutPlan>(this.workoutPlansUrl, workoutPlan, this.httpOptions);
  }

  deleteWorkoutPlan(workoutPlanId: number): Observable<WorkoutPlan> {
    let url = `${this.workoutPlansUrl}/${workoutPlanId}`;
    return this.http.delete<WorkoutPlan>(url);
  }
}
