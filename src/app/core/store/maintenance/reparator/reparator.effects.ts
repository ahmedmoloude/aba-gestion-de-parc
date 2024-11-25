import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import { AnyResponse} from 'app/core/models/facturation/response-data.model';
import * as ReparatorsActions from'app/core/store/maintenance/reparator/reparator.actions';
import { ReparatorService } from 'app/core/services/maintenance/reparator.service';




@Injectable()
export class ReparatorEffects {

  constructor(private actions$: Actions,
    private reparatorService: ReparatorService,
    private _toast: ToastService) {}

  loadReparators$ = createEffect( () => this.actions$.pipe(
    ofType(ReparatorsActions.ReparatorActionsType.LOAD_REPARATORS),
    exhaustMap((action: any) => {
      return this.reparatorService.getReparators().pipe(
        map((resp: any) => {
          console.log('Reparators');
          console.log(resp);
          if(resp.success) {
            return ReparatorsActions.loadReparatorsSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return ReparatorsActions.loadReparatorsFailure(
              {
                action: 'Load Reparators',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(ReparatorsActions.loadReparatorsFailure(
          {
            action: 'Load Reparators',
            error: err
          }
        )))
      )
    })
  ));

}
