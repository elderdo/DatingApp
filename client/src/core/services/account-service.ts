import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { User } from '../../types/user';
import { tap } from 'rxjs';

// Created with cli: ng g s account-service
// angular.json schematics configured to put services in "src/core/services"
@Service()
export class AccountService {
  private http = inject(HttpClient);
  currentUser = signal<User | null>(null);

  // C#'s .NET Web API server
  baseUrl = 'https://localhost:5001/api/';

  login(creds: any) {
    // endpoint for the C# Web API's login POST
    return this.http.post<User>(this.baseUrl + 'account/login', creds).pipe(
      tap((user) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user);
        }
      }),
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}
