import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import * as UnpaidActions from 'app/core/store/facturation/customer-fee/unpaid/unpaid.actions';
import { UnpaidService } from 'app/core/services/facturation/customer-fee/unpaid.service';
import { UnpaidResponse, UnpaidsResponse } from 'app/core/models/facturation/response-data.model';




@Injectable()
export class UnpaidEffects {



  constructor(private actions$: Actions,
              private unpaidService: UnpaidService,
              private _toast: ToastService ) {}

  loadUnpaids$ = createEffect( () => this.actions$.pipe(
    ofType(UnpaidActions.UnpaidActionstypes.LOAD_UNPAIDS),
    exhaustMap((action: any) => {
      return this.unpaidService.getUnpaids(action.data).pipe(
        map((resp: UnpaidsResponse) => {
          console.log('unpaids');
          console.log(resp);
          if(resp.success) {
            return UnpaidActions.loadUnpaidsSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return UnpaidActions.loadUnpaidsFailure(
              {
                action: 'Load Unpaids',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(UnpaidActions.loadUnpaidsFailure(
          {
            action: 'Load Unpaids',
            error: err
          }
        )))
      )
    })
  ));




  createUnpaid$ = createEffect( () => this.actions$.pipe(
    ofType(UnpaidActions.UnpaidActionstypes.CREATE_UNPAID),
    exhaustMap((action: any) => {
      return this.unpaidService.createUnpaid(action.data).pipe(
        map((resp: UnpaidResponse) => {
          console.log('unpaid');
          console.log(resp);
          if(resp.success) {
            this._toast.success('Impayé crée avec succès!');

            return UnpaidActions.createUnpaidSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return UnpaidActions.createUnpaidFailure(
              {
                action: 'create Unpaid',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(UnpaidActions.createUnpaidFailure(
          {
            action: 'create Unpaid',
            error: err
          }
        )))
      )
    })
  ));

}
