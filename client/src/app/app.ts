import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Nav } from '../layout/nav/nav';

@Component({
  selector: 'app-root',
  imports: [Nav],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  // perform dependency inject of the HttpClient
  private http = inject(HttpClient);

  protected readonly title = signal('Dating app');
  protected members = signal<any[]>([]); // turned off strong typing temporarily

  // required by interface OnInit
  ngOnInit(): void {
    // Send a GET request to the DatingApp's endpoint:
    this.http.get<any[]>('https://localhost:5001/api/members').subscribe({
      next: (response) => this.members.set(response),
      error: (error) => console.log(error),
      complete: () => console.log('Completed the http request'),
      // when complete is finished, then we're unsubscribed from the response
    });
  }
}
