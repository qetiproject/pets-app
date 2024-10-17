import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { IRegisterResponse } from '@app/core/models';
import { IRole } from '@app/core/models/enums';
import { AuthService } from '@app/core/services';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [AuthService]
})
export class RegisterComponent {
  userRegisterForm!: FormGroup;
  errorMessage: string = ""
  authService = inject(AuthService);
  fb = inject(FormBuilder);
  router = inject(Router);

  constructor() {
    this.userRegisterForm = this.fb.group({
      username: ['', [Validators.required]],
      role: [IRole.ADMIN],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.userRegisterForm.valid) {
      this.authService.register(this.userRegisterForm.value)
        .subscribe({
          next: (data: IRegisterResponse) => {
            this.router.navigate(['']);
          },
          error: (err: string) =>this.errorMessage = err
        });
    }
  }
}
