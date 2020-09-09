import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SetResult } from '../models/set-result';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SetResultService {

  private setResultsUrl = 'setResults';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getSetResultsWithWorkoutSessionId(workoutSessionId: number): Observable<SetResult[]> {
    return this.http.get<SetResult[]>(`${this.setResultsUrl}?workoutSessionId=${workoutSessionId}`);
  }

  addSetResult(setResult: SetResult): Observable<SetResult> {
    return this.http.post<SetResult>(this.setResultsUrl, setResult, this.httpOptions);
  }

  updateSetResult(setResult: SetResult): Observable<SetResult> {
    return this.http.put<SetResult>(this.setResultsUrl, setResult, this.httpOptions);
  }

  deleteSetResult(setResultId: number): Observable<SetResult> {
    return this.http.delete<SetResult>(`${this.setResultsUrl}/${setResultId}`);
  }
}
