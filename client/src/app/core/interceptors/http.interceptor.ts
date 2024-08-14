import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { TokenService } from '@core/services';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  tokenService.isAuthentication.subscribe({
    next: (value) => {
      if (value) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${tokenService.getToken()}`,
          },
        });
      }
    },
  });

  return next(req).pipe(
    catchError((e: HttpErrorResponse) => {
      if (e.status === 401) {
        tokenService.removeToken();
        router.navigate(['']);
      }
      const error = e.error?.error?.message || e.statusText;
      return throwError(() => error);
    })
  );
};
