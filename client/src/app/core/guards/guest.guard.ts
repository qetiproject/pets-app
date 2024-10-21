import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { TokenService } from '@core/services';

export const guestGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  tokenService.isAuthentication$.subscribe({
    next: (isAuthentication: boolean) => {
      if (isAuthentication) {
        router.navigate(['home']);
      }
    },
  });

  return true;
};