import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ERROR_MSG_500, RESPONSE_CODES, ROUTES } from '../../config';
import { localStorageHelper, NavigationHelper } from '../helpers';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class HandleResponse {
  constructor(
    private _navigationHelper: NavigationHelper,
    private _toast: ToastService
  ) {}

  handleError(error: HttpErrorResponse) {
    switch (error.status) {
      case 500:
        this._toast.error(ERROR_MSG_500);
        break;
      case 401:
        localStorageHelper.clear();
        this._navigationHelper.navigate(ROUTES['login'].name);
        break;
    }

    if (error.status !== 500) {
      this.showToastError(error.error.code);
    }
  }

  handleData(data: any) {
    Object.keys(RESPONSE_CODES).forEach((key) => {
      if (RESPONSE_CODES[key].code === data.code && RESPONSE_CODES[key].show) {
        this._toast.success(RESPONSE_CODES[key].message);
      }
    });
  }

  showToastError(code) {
    if (code) {
      Object.keys(RESPONSE_CODES).forEach((key) => {
        if (RESPONSE_CODES[key].code === code && RESPONSE_CODES[key].message) {
          this._toast.error(RESPONSE_CODES[key].message);
        }
      });
    } else {
      this._toast.error(RESPONSE_CODES['_500_INTERNAL_ERROR'].message);
    }
  }
}
