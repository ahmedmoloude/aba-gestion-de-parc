import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import {
  fetchTaxe,
  fetchTaxeSuccess,
  TaxeActionFailure,
} from './taxe.actions';
import { ParametreService } from 'app/core/services/parametre.service';

@Injectable()
export class TaxeEffects {
  constructor(
    private actions$: Actions,
    private ParameterService: ParametreService,
    private _toast: ToastService // private _navigationHelper: NavigationHelper
  ) {}

  getTaxe$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchTaxe),
      switchMap(() => {
        return this.ParameterService.getTaxe().pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store taxe get",  res.response)
              const payload = res.response;
              return fetchTaxeSuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return TaxeActionFailure({
                action: 'Fetching contacts',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              TaxeActionFailure({
                action: 'Fetching contacts',
                error,
              })
            );
          })
        );
      })
    );
  });


}
