import { catchError, map, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILogin, ILoginResponse, IRegister, IRegisterResponse } from '@core/models';
import { apiEndpoint } from '../constants/constants';
import { TokenService } from './token.service';

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
    return this.http.post<IRegisterResponse>(`${apiEndpoint.AuthEndpoint.register}`, data);
  }

  onLogin(data: ILogin): Observable<ILoginResponse> {
    return this.http
      .post<ILoginResponse>(`${apiEndpoint.AuthEndpoint.login}`, data)
      .pipe(
        map((response) => {
          if (response) {
            this.tokenService.setToken(response.accessToken);
          }
          return response;
        }),
        catchError((error) => {
          // Optional: You can handle specific error messages here if needed
          return throwError(error); // Re-throw the error for the component to handle
        })
      )
  }

  onLogout() {
    this.tokenService.removeToken();
    this.router.navigate(['/']);
  }
}
