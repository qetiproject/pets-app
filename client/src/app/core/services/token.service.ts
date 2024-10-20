import { BehaviorSubject } from 'rxjs';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

import { constants } from '../constants/constants';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  isAuthentication: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    const token = this.getToken();
    if (token) {
      this.updateToken(true);
    }
  }

  updateToken(status: boolean): void {
    this.isAuthentication.next(status);
  }

  setToken(token: string): void {
    this.updateToken(true);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(constants.CURRENT_TOKEN, token);
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('CURRENT_TOKEN');
    }
    return null;
  }

  removeToken(): void {
    this.updateToken(false);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(constants.CURRENT_TOKEN);
    }
  }
}
