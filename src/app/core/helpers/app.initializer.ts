import { NavigationEnd, Router  } from '@angular/router';
import { AuthService } from '../services';

// export function appInitializer(authenticationService: AuthenticationService) {
export function appInitializer(authService: AuthService) {
  return () =>
    new Promise((resolve) => {

      if (window.location.pathname.includes('confirm-user')) {
        resolve(true)
      }

      else{
        authService.me().subscribe((res) => {
          // authService.setUser(res)
          resolve(true);
        });

      }
     
    });
}
