import { Component, input, output, inject } from '@angular/core';
import type { User, RegisterCreds } from '../../../types/user';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../../core/services/account-service';

// created with ng g c features/account/register

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private accountService = inject(AccountService);
  cancelRegister = output<boolean>();
  protected creds = {} as RegisterCreds;

  register(): void {
    this.accountService.register(this.creds).subscribe({
      next: (response) => {
        console.log(response);
        this.cancel();
      },
      error: (error) => console.log(error),
    });
  }

  // demo cancel feature of Angular
  cancel(): void {
    this.cancelRegister.emit(false);
  }
}
