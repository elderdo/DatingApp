import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

// Created with cli: ng g s account-service
// angular.json schematics configured to put services in "src/core/services"
@Service()
export class AccountService {
  private http = inject(HttpClient);

  // C#'s .NET Web API server
  baseUrl = 'https://localhost:5001/api/';

  login(creds: any) {
    // endpoint for the C# Web API's login POST
    return this.http.post(this.baseUrl + 'account/login', creds);
  }
}
