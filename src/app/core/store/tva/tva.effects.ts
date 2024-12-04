import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import {
  fetchTva,
  fetchTvaSuccess,
  TvaActionFailure,
} from './tva.actions';
import { ParametreService } from 'app/core/services/parametre.service';

@Injectable()
export class TvaEffects {
  constructor(
    private actions$: Actions,
    private ParameterService: ParametreService,
    private _toast: ToastService // private _navigationHelper: NavigationHelper
  ) {}

  getTva$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchTva),
      switchMap(() => {
        return this.ParameterService.getTva().pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store tva get",  res)
              const payload = res.response;
              return fetchTvaSuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return TvaActionFailure({
                action: 'Fetching contacts',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              TvaActionFailure({
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
