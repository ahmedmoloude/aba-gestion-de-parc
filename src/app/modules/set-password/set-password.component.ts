import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services';

import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css']
})
export class SetPasswordComponent implements OnInit {

 

  spinner = true;
  focus;
  focus1;
  errors: any = null;
  isLoading = false;

  auth_token = null;


  setPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    new_paasword: new FormControl('', [Validators.required, Validators.min(6)]),
    confirm_password: new FormControl('', [
      Validators.required,
      Validators.min(6),
    ]),
  });

  constructor(
    private _authServcie: AuthService,
    private _activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setPasswordForm.setValidators(this.createCompareValidator());
    this.setPasswordForm.get('email').disable();
    this.auth_token = this._activatedRoute.snapshot.paramMap.get('user_token');
    this._authServcie
      .getUserByConfirmationToken(this.auth_token)
      .subscribe((res) => {


        console.log('user token: ',res)
        this.setPasswordForm.get('email').setValue(res.response.email);
        this.spinner = false
      });
  }

  createCompareValidator(): ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
      const control1 = group.controls['new_paasword'];
      const control2 = group.controls['confirm_password'];
      if (control1.value !== control2.value) {
        control2.setErrors({ notEquivalent: true });
      } else {
        control2.setErrors(null);
      }
      return;
    };
  }
  // Submit function
  onSubmit() {
    if (this.setPasswordForm.valid) {
      this.isLoading = true;
      this._authServcie
        .setPassword(
          this.setPasswordForm.get('new_paasword').value,
          this.auth_token
        )
        .subscribe((v) => {
          this.isLoading = false;
          this.router.navigate(['/login']);
        });
    }
  }
}
