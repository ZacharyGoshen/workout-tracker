import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SetPlan } from '../models/set-plan';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SetPlanService {

  private setPlansUrl = 'setPlans';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getSetPlansWithWorkoutPlanId(workoutPlanId: number): Observable<SetPlan[]> {
    return this.http.get<SetPlan[]>(`${this.setPlansUrl}?workoutPlanId=${workoutPlanId}`);
  }
}
