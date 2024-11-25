import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { HandleResponse } from '../services/handleResponse.service';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { TokenService } from '../services';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private _handleResponse: HandleResponse,
    private tokenService: TokenService
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.tokenService.getToken();
    let newReq;
    if (token !== null) {
      newReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
      });
    } else {
      newReq = req.clone();
    }

    return next.handle(newReq).pipe(
      map((event) => {
        if (event instanceof HttpResponse) {
          this._handleResponse.handleData(event.body);
        }
        return event;
      }),
      catchError(this.catchError)
    );
  }

  catchError(error) {
    return throwError(error);
  }
}
