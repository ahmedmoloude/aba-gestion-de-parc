import { Injectable } from '@angular/core';
import { localStorageHelper } from '../helpers';
import { User } from '../models';
import { TOKEN_SlUG, USER_SlUG } from '../../config';
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private iss = {
    login: 'http://127.0.0.1:8000/api/auth/login',
    register: 'http://127.0.0.1:8000/api/auth/register',
  };
  constructor() {}

  // Verify the token
  isValidToken() {
    const token = this.getToken();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return Object.values(this.iss).indexOf(payload.iss) > -1;
      }
    }
    return false;
  }
  payload(token: any) {
    const jwtPayload = token.split('.')[1];
    return JSON.parse(atob(jwtPayload));
  }
  // User state based on valid token
  isLoggedIn() {
    return this.isValidToken();
  }
  // Remove token
  removeToken() {
    localStorage.removeItem(TOKEN_SlUG);
  }

  getUser(): any {
    return localStorageHelper.getItem(USER_SlUG);
  }

  setUser(user: any) {
    return localStorageHelper.setItem(USER_SlUG, user);
  }

  getToken(): string {
    return localStorageHelper.getItem(TOKEN_SlUG);
  }

  setToken(token: string) {
    return localStorageHelper.setItem(TOKEN_SlUG, token);
  }
}
