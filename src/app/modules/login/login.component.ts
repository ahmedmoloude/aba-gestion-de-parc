import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ROUTES } from '@angular/router';
import { ROUTES as _ROUTES } from '../../config';
import {
  AuthService,
  TokenService,
  AuthStateService,
  localStorageHelper,
  NavigationHelper,
  ToastService,
} from './../../core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RESPONSE_CODES, DEMO_login } from '../../config';
// import { User } from 'src/app/core/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  focus;
  focus1;
  loginForm: FormGroup;
  errors: any = null;
  isLoading = false;

  constructor(
    public router: Router,
    public authService: AuthService,
    private token: TokenService,
    private authState: AuthStateService,
    private _navigationHelper: NavigationHelper,
    private _toast: ToastService
  ) {
    this.setForm();
  }

  ngOnInit() {
    console.log('login');
  }

  setForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(DEMO_login.email, [Validators.required]),
      password: new FormControl(DEMO_login.password, [Validators.required]),
    });
  }

  login() {
    this.isLoading = true;
    this.authService.login(this.loginForm.value).subscribe(
      (result) => {
        this.handleResponse(result);
      },
      (error) => {
        this.errors = error.error;
        this.isLoading = false;
        this._toast.error("Vos informations d'identification sont invalides !");
      },
      () => {
        // this.authState.setAuthState(true);
        // this.loginForm.reset();
      }
    );
  }

  handleResponse(data: any): void {
    // if (data.code == RESPONSE_CODES._200_U_AUTH_OK.code) {

    this.token.setUser(data.response.user);
    console.log('data ==>', data);
    this.token.setToken(data.response.access_token);
    console.log('get token', this.token.getToken());

    this.authService.me().subscribe((res) => {
      this.isLoading = false;
      this._navigationHelper.navigate(_ROUTES['reclamations'].name);
    });

    // if (user.isSuper)
    //   this._navigationHelper.navigate(ROUTES['home'].name);
    // else {
    //   const authorizedArea = (user.permissions.find(item => item.permissions.read == 1));
    //   if (authorizedArea) {
    //     const ig_groupe = authorizedArea.id_group;
    //     this._navigationHelper.navigate(MENU.find(elem => elem.id_group == ig_groupe).routeName);
    //   } else {
    //     //Redirect to 404
    //     this.router.navigate(['WithoutAnyPermissions']);
    //   }
    // }
    // }
  }

  // Handle response
  // responseHandler(data:any) {
  //   this.token.handleData(data.access_token);
  // }
}
