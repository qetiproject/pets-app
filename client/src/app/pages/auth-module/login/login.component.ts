import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthService } from '@app/core/services';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [AuthService],
})
export class LoginComponent {
  authService = inject(AuthService);
  loginForm!: FormGroup;
  errorMessage = signal<string>('');
  
  constructor() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.onLogin(this.loginForm.value).pipe(
        catchError(error => {
          this.errorMessage.set(error.error.message);
          return [];
        })
      ).subscribe({
        next: () => {},
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
