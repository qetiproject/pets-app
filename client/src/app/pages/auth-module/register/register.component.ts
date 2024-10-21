import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { catchError, of } from 'rxjs';

import { passwordValidator } from '@app/core/constants/password-validator';
import { IRole } from '@app/core/models/enums';
import { AuthService } from '@app/core/services';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [AuthService]
})
export class RegisterComponent {
  authService = inject(AuthService);
  fb = inject(FormBuilder);
  router = inject(Router);
  
  userRegisterForm!: FormGroup;

  errorMessage = signal<string>('');
 

  constructor() {
    this.userRegisterForm = this.fb.group({
      username: ['', [Validators.required]],
      role: [IRole.ADMIN],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordValidator()]]
    });
  }

  onSubmit() {
    if (this.userRegisterForm.valid) {
      this.authService.register(this.userRegisterForm.value).pipe(
        catchError((error) => {
          this.errorMessage.set(error); 
          return of(null); 
        })
      ).subscribe({
        next: (response) => {
          if(response) {
            this.router.navigate(['']);
          }
        },
        error: (err) => {
          console.error('Registration error', err);
        }
      });
    } else {
      this.userRegisterForm.markAllAsTouched();
    }
  }
  
}
