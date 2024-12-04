import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ComplaintService } from 'app/core/services/complaint.service';
import { Observable, of } from 'rxjs';
import { ToastService } from 'app/services';
import { Complaint } from 'app/core/models';
import { fetshActionFailure, fetshMotPorture, fetshMotPortureSuccess } from './motporture.action';
import { Customer } from 'app/core/services/customer.service';

@Injectable()
export class MotPortureEffects {
  constructor(
    private actions$: Actions,
    private custom:Customer,
    private _toast: ToastService
  ) {}


Motporture$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetshMotPorture),
      switchMap(() => {
        return this.custom.getType().pipe(
          map((res: any) => {
            const payload = res.response;
           // console.log(payload,"test");
            return fetshMotPortureSuccess({ payload: payload });
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              fetshActionFailure({ action: 'Fetch Motporture', error })
            );
          })
        );
      })
    );
});





}