import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

@Service()
export class AccountService {
  private http = inject(HttpClient);

  baseUrl = 'https://localhost:5001/api/';

  login(creds: any) {
    return this.http.post(this.baseUrl + 'account/login', creds);
  }
}
