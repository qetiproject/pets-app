import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IRegisterResponse } from '@app/core/models';
import { IRole } from '@app/core/models/enums';
import { AuthService } from '@app/core/services';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [AuthService]
})
export class RegisterComponent {
  userRegisterForm!: FormGroup;
  errorMessage: string = ""

  constructor(
    private fb: FormBuilder, private authService: AuthService,
    private route: Router
  ) {
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
            this.route.navigate(['']);
          },
          error: (err: string) =>this.errorMessage = err
        });
    }
  }
}
