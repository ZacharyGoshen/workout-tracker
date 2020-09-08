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

  addSetPlan(setPlan: SetPlan): Observable<SetPlan> {
    return this.http.post<SetPlan>(this.setPlansUrl, setPlan, this.httpOptions);
  }

  updateSetPlan(setPlan: SetPlan): Observable<SetPlan> {
    return this.http.put<SetPlan>(this.setPlansUrl, setPlan, this.httpOptions);
  }

  deleteSetPlan(setPlanId: number): Observable<SetPlan> {
    return this.http.delete<SetPlan>(`${this.setPlansUrl}/${setPlanId}`);
  }
}
