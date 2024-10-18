import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthService, TokenService } from '@app/core/services';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isAuthenticated$;

  tokenService = inject(TokenService)
  authService = inject(AuthService)

  constructor() {
    this.isAuthenticated$ = this.tokenService.isAuthentication;
  }

  onLogout() {
    this.authService.onLogout();
  }
}
