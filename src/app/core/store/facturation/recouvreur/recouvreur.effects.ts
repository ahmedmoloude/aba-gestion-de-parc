import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as RecouvreurActions from './recouvreur.actions';
import { RecouvreurService } from 'app/core/services/facturation/recouvreur.service';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { AnyResponse, RecouvreursResponse } from 'app/core/models/facturation/response-data.model';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import { Router } from '@angular/router';



@Injectable()
export class RecouvreurEffects {

  constructor(private actions$: Actions,
              private recouvreurService: RecouvreurService,
              private router: Router,
              private _toast: ToastService ) {}

  loadRecouvreurs$ = createEffect(() => this.actions$.pipe(
    ofType(RecouvreurActions.RecouvreurActionstypes.LOAD_RECOUVREURS),
    exhaustMap((action: any) => {
      return this.recouvreurService.getRecouvreurs()
      .pipe(
        map((resp: RecouvreursResponse) => {
          if (resp.success) {
            return RecouvreurActions.loadRecouvreursSuccess({data: resp.response});
          } else {
            this._toast.error('Une Erreur est survenu !');
            return RecouvreurActions.loadRecouvreursFailure({
              action: 'load Recouvreurs Failure',
              error: resp.message,
            });
          }
        }),
        catchError((error) => of(RecouvreurActions.loadRecouvreursFailure({action: 'load Recouvreurs Failure', error})))
      )})
    )
  );
}
