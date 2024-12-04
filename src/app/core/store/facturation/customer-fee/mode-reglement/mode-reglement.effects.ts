import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import * as ModeReglementActions from 'app/core/store/facturation/customer-fee/mode-reglement/mode-reglement.actions';
import { AnyResponse } from 'app/core/models/facturation/response-data.model';
import { RecouvrementService } from 'app/core/services/facturation/customer-fee/recouvrement.service';



@Injectable()
export class ModeReglementEffects {

  constructor(private actions$: Actions,
              private recouvrementService: RecouvrementService,
              private _toast: ToastService) {}

  loadModeReglements$ = createEffect( () => this.actions$.pipe(
    ofType(ModeReglementActions.ModeReglementActionstypes.LOAD_MODE_REGLEMENTS),
    exhaustMap((action: any) => {
      return this.recouvrementService.getModeReglementList().pipe(
        map((resp: AnyResponse) => {
          console.log('modeReglements');
          console.log(resp);
          if(resp.success) {
            return ModeReglementActions.loadModeReglementsSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return ModeReglementActions.loadModeReglementsFailure(
              {
                action: 'Load ModeReglements',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(ModeReglementActions.loadModeReglementsFailure(
          {
            action: 'Load ModeReglements',
            error: err
          }
        )))
      )
    })
  ));

}
