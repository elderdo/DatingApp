import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { LoginCreds, RegisterCreds, User } from '../../types/user';
import { Observable, tap } from 'rxjs';

// Created with cli: ng g s account-service
// angular.json schematics configured to put services in "src/core/services"
@Service()
export class AccountService {
  private http = inject(HttpClient);
  currentUser = signal<User | null>(null);

  // C#'s .NET Web API server
  baseUrl = 'https://localhost:5001/api/';

  register(creds: RegisterCreds): Observable<User> {
    return this.http.post<User>(this.baseUrl + 'account/register', creds).pipe(
      tap((user) => {
        if (user) {
          this.setCurrentUser(user);
        }
      }),
    );
  }

  login(creds: LoginCreds): Observable<User> {
    // endpoint for the C# Web API's login POST
    return this.http.post<User>(this.baseUrl + 'account/login', creds).pipe(
      tap((user) => {
        if (user) {
          this.setCurrentUser(user);
        }
      }),
    );
  }

  setCurrentUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.set(user);
  }

  logout(): void {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}
