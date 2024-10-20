import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { TokenService } from '@core/services';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  return tokenService.isAuthentication.pipe(
    map((isAuthenticated) => {
      if(!isAuthenticated) {
        router.navigate(['']);
        return false
      }
      return true;
    })
  )
};