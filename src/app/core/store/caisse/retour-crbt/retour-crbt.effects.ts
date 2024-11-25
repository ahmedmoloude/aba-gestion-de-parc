import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import * as RetourCrbtsActions from 'app/core/store/caisse/retour-crbt/retour-crbt.actions';
import { AnyResponse } from 'app/core/models/facturation/response-data.model';
import { RetourCrbtService } from 'app/core/services/caisse/retour-crbt.service';


@Injectable()
export class RetourCrbtEffects {



  constructor(private actions$: Actions,
    private retourCrbtService: RetourCrbtService,
    private _toast: ToastService) {}

  loadRetourCrbts$ = createEffect( () => this.actions$.pipe(
    ofType(RetourCrbtsActions.RetourCrbtActionstypes.LOAD_RETOUR_CRBTS),
    exhaustMap((action: any) => {

      return this.retourCrbtService.getTRetoursCrbtToValidate(action.data).pipe(
        map((resp: AnyResponse) => {
          console.log('getTRetoursCrbtToValidate');
          console.log(resp);
          if(resp.success) {
            return RetourCrbtsActions.loadRetourCrbtsSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return RetourCrbtsActions.loadRetourCrbtsFailure(
              {
                action: 'LOAD_RETOUR_CRBTS',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(RetourCrbtsActions.loadRetourCrbtsFailure(
          {
            action: 'LOAD_RETOUR_CRBTS',
            error: err
          }
        )))
      )
    })
  ));

  validateRetourCrbt$ = createEffect( () => this.actions$.pipe(
    ofType(RetourCrbtsActions.RetourCrbtActionstypes.VALIDATE_RETOUR_CRBT),
    exhaustMap((action: any) => {

      return this.retourCrbtService.validateTRetourCrbt(action.data).pipe(
        map((resp: AnyResponse) => {
          console.log('VALIDATE_RETOUR_CRBT');
          console.log(resp);
          if(resp.success) {
            return RetourCrbtsActions.validateRetourCrbtSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return RetourCrbtsActions.validateRetourCrbtFailure(
              {
                action: 'VALIDATE_RETOUR_CRBT',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(RetourCrbtsActions.validateRetourCrbtFailure(
          {
            action: 'VALIDATE_RETOUR_CRBT',
            error: err
          }
        )))
      )
    })
  ));
}
