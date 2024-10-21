import { BehaviorSubject } from 'rxjs';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

import { constants } from '../constants/constants';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  isAuthentication$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.initializeAuthState();
  }

  updateToken(status: boolean): void {
    this.isAuthentication$.next(status);
  }

  setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem(constants.CURRENT_TOKEN, token);
        this.updateToken(true);
      } catch (error) {
        console.error('Could not set token in localStorage', error);
      }
    }
  }

  getToken(): string | null {
    return isPlatformBrowser(this.platformId) ? localStorage.getItem('CURRENT_TOKEN') : null;
  }

  removeToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.removeItem(constants.CURRENT_TOKEN);
        this.updateToken(false);
      } catch (error) {
        console.error('Could not remove token from localStorage', error);
      }
    }
  }

  isAuthenticated(): boolean {
    return this.isAuthentication$.value;
  }
  
  private initializeAuthState(): void {
    const token = this.getToken();
    this.updateToken(!!token);
     if (token && this.isTokenExpired(token)) {
      this.removeToken();
    }
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp < Date.now() / 1000;
    } catch (error) {
      console.error('Error parsing token payload:', error);
      return true; 
    }
  }

}
