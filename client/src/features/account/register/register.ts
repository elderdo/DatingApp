import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterCreds } from '../../../types/user';

// created with ng g c features/account/register

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  protected creds = {} as RegisterCreds;

  register() {
    console.log(this.creds);
  }

  // demo cancel feature of Angular
  cancel() {
    console.log('canceled');
  }
}
