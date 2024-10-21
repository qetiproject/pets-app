import { catchError, map, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ILogin, ILoginResponse, IRegister, IRegisterResponse } from '@core/models';
import { apiEndpoint } from '../constants/constants';
import { TokenService } from '.';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) {}

  register(data: IRegister): Observable<IRegisterResponse> {
    return this.http.post<IRegisterResponse>(`${apiEndpoint.AuthEndpoint.register}`, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  onLogin(data: ILogin): Observable<ILoginResponse> {
    return this.http
      .post<ILoginResponse>(`${apiEndpoint.AuthEndpoint.login}`, data)
      .pipe(
        map((response) => {
          if (response?.accessToken) {
            this.tokenService.setToken(response.accessToken);
          }
          return response;
        }),
        catchError(this.handleError)
      )
  }

  onLogout() {
    this.tokenService.removeToken();
    this.router.navigate(['/']);
  }

  private handleError(error: any): Observable<never> {    
    const errorMessage = error?.message || 'An unknown error occurred';
    const cleanedMessage = typeof errorMessage === 'string'
      ? errorMessage.replace(/^(Error:\s*)+/g, '').trim()
      : 'An unknown error occurred';
    
    return throwError(() => new Error(cleanedMessage));
  }

}
