import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { TokenService } from '@core/services';
import { map } from 'rxjs';

export const guestGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  return tokenService.isAuthentication.pipe(
    map((isAuthenticated) => {
      if (isAuthenticated) {
        router.navigate(['home']);
        return false; 
      }
      return true; 
    })
  );

};