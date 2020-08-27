import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkoutPlan } from '../models/workout-plan';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorkoutPlanService {

  private workoutPlansUrl = 'workoutPlans';

  constructor(private http: HttpClient) { }

  getWorkoutPlanById(id: number): Observable<WorkoutPlan> {
    return this.http.get<WorkoutPlan>(`${this.workoutPlansUrl}/${id}`);
  }

  getWorkoutPlans(): Observable<WorkoutPlan[]> {
    return this.http.get<WorkoutPlan[]>(this.workoutPlansUrl);
  }
}
