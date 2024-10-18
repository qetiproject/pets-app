import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { LoginComponent } from '@app/pages/auth-module';

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet, 
    LoginComponent
  ],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss',
})
export class DefaultComponent {}
