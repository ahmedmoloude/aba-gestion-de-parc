import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, TokenService } from '../services';
import { MENU, ROUTES, USER_SlUG } from '../../config';
import { localStorageHelper, NavigationHelper } from '../helpers';
import { User } from '../models';
@Injectable()
export class AuthGuard implements CanActivate {
  route: any;
  constructor(
    private _navigationHelper: NavigationHelper,
    public authService: AuthService,
    public tokenService: TokenService
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.route = route;
    return !this.isAuthenticated();
  }

  // Chech si 'utilisateur est connecté
  isAuthenticated() {
    const currentUser = this.authService.userValue as User;
    const token = this.tokenService.getToken();
    if (currentUser && token) {
      if (this.isUnauthorized(currentUser)) {
        this.redirectToAuthorizedRoute(currentUser);
        return false;
      }
      return true;
    }
    this._navigationHelper.navigate(ROUTES['login'].name);
    return false;
  }

  // Chech si la route demandé est non authorisée
  isUnauthorized(user: any) {
    /*const route = MENU.find(item => item.role.indexOf(user.role) !== -1 && item.routeName === this.route.data.route);
    return route === undefined;*/ // TODO
    return true;
  }

  // Redirege l'utilisateur vers sa page d'accueil
  redirectToAuthorizedRoute(user: any) {
    /*const routeName = MENU.find(item => item.role.indexOf(user.role) !== -1).routeName;
    this._navigationHelper.navigate(routeName);*/
    // TODO
    // this._navigationHelper.navigate(ROUTES['dashboard'].name);
  }
}
