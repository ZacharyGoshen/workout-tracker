import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = 'users';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  authorize(): Observable<boolean> {
    return this.http.get<boolean>(`${this.usersUrl}/authorize`);
  }

  login(user: User): Observable<boolean> {
    let url = `${this.usersUrl}/login`;
    return this.http.post<boolean>(url, user, this.httpOptions);
  }

  logout(): Observable<null> {
    let url = `${this.usersUrl}/logout`;
    return this.http.post<null>(url, null, this.httpOptions);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, this.httpOptions);
  }
}
