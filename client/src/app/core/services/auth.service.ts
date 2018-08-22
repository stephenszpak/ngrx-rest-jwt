import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User, Authenticate } from '../models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatSnackBar } from '@angular/material';

const helper = new JwtHelperService();

@Injectable({ providedIn: 'root' })
export class AuthService {
  private BASE_URL = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  getToken(): string {
    return localStorage.getItem('currentUser');
  }

  login({username, password}: Authenticate): Observable<any> {
    return this.http.post<User>(`${this.BASE_URL}/users/authenticate`, { username, password }).pipe(
      map(user => {
        if (user && user.token) {
          console.log('logged in user', user);
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
      })
    );
  }

  register(user: User): Observable<User> {
    const url = `${this.BASE_URL}/users/register`;
    return this.http.post<User>(url, { user });
  }

  logout() {
    localStorage.clear();
    setTimeout(() => { this.router.navigate(['auth/login']) });
  }
}
