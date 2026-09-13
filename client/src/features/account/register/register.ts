import { Component, input } from '@angular/core';
import type { User, RegisterCreds } from '../../../types/user';
import { FormsModule } from '@angular/forms';

// created with ng g c features/account/register

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  membersFromHome = input.required<User[]>();
  protected creds = {} as RegisterCreds;

  register() {
    console.log(this.creds);
  }

  // demo cancel feature of Angular
  cancel() {
    console.log('canceled');
  }
}
