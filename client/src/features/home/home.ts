import { Component, inject, signal, input } from '@angular/core';
import { Register } from '../account/register/register';
import { AccountService } from '../../core/services/account-service';
import { User } from '../../types/user';

// generated with cli command: ng g c features/home
@Component({
  selector: 'app-home',
  imports: [Register],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected registerMode = signal(false);
  protected accountService = inject(AccountService);

  showRegister(value: boolean) {
    this.registerMode.set(value);
  }
}
