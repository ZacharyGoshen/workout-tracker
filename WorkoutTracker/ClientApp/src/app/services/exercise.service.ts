import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exercise } from '../models/exercise';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  private exercisesUrl = 'exercises';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getExerciseById(id: number): Observable<Exercise> {
    return this.http.get<Exercise>(`${this.exercisesUrl}/${id}`);
  }

}
