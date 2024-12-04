import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { localStorageHelper, NavigationHelper } from '../helpers';
import { AuthService, TokenService } from '../services';
import { MENU, ROUTES, USER_SlUG } from '../../config';
import { User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  route: any;
  constructor(
    private _navigationHelper: NavigationHelper,
    public authService: AuthService,
    public tokenService: TokenService,
    public router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.route = route;
    return this.isAuthenticated();
  }

  // Check si 'utilisateur est connecté
  isAuthenticated() {
    // const currentUser = localStorageHelper.getItem(USER_SlUG) as User;
    const currentUser = this.authService.userValue as User;
    const token = this.tokenService.getToken();
    if (currentUser && token) {
      this.redirectToAuthorizedRoute(currentUser);
      return false;
    }
    return true;
  }

  // Redirege l'utilisateur vers sa page d'accueil
  redirectToAuthorizedRoute(user: any) {
    //const routeName = MENU.find(item => item.role.indexOf(user.role) !== -1).path; // TODO
    this._navigationHelper.navigate(ROUTES['parametre'].name);
    // this.router.navigate(['/dashboard']);
  }
}
