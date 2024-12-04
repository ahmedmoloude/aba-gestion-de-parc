import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES } from '../../config';

@Injectable({
  providedIn: 'root',
})
export class NavigationHelper {
  constructor(private router: Router) {}

  navigate(routerParams: any, extras?: any) {
    if (typeof routerParams === 'string') {
      this.router.navigate([ROUTES[routerParams].route], extras);
    } else if (routerParams.length === 2) {
      this.router.navigate(
        [ROUTES[routerParams[0]].route, routerParams[1]],
        extras
      );
    } else {
      this.router.navigate([ROUTES[routerParams[0]].route], extras);
    }
  }
}
