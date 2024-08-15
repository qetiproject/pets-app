import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TokenService } from '.';
import { ILogin, ILoginResponse, IRegister, IRegisterResponse } from '@core/models';
import { apiEndpoint } from '../constants/constants';

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

  onLogin(data: ILogin) {
    return this.http
      .post<ILoginResponse>(`${apiEndpoint.AuthEndpoint.login}`, data)
      .pipe(
        map((response) => {
          if (response) {
            this.tokenService.setToken(response.token);
          }
          return response;
        })
      )
  }

  onLogout() {
    this.tokenService.removeToken();
    this.router.navigate(['/']);
  }
}
