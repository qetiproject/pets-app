import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '@app/core/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule,  CommonModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [AuthService],
})
export class LoginComponent {
  authService = inject(AuthService);
  loginForm!: FormGroup;
  errorMessage: string = '';
  
  constructor() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.onLogin(this.loginForm.value).subscribe({
        next: () => {},
        error: (e) => {
          console.log(e)
          this.errorMessage = e.error.message
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
