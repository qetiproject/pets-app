import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { TokenService } from '@core/services';

export const GuestGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  tokenService.isAuthentication$.subscribe({
    next: (isAuthentication => {
      if (isAuthentication) {
        router.navigate(['home']);
        return false; 
      }
      
    })
  })
  return true; 
}