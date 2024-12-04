import { Injectable } from '@angular/core';
import * as ValidationVersementActions from 'app/core/store/caisse/validation-versement/validation-versement.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import { AnyResponse } from 'app/core/models/facturation/response-data.model';
import { ValidationVersementService } from 'app/core/services/caisse/validation-versement.service';


@Injectable()
export class ValidationVersementEffects {



  constructor(private actions$: Actions,
    private validationVersementService: ValidationVersementService,
    private _toast: ToastService) {}

  loadValidationVersements$ = createEffect( () => this.actions$.pipe(
    ofType(ValidationVersementActions.ValidationVersementActionstypes.LOAD_VALIDATION_VERSEMENTS),
    exhaustMap((action: any) => {

      return this.validationVersementService.getVersementsToValidate(action.data).pipe(
        map((resp: AnyResponse) => {
          console.log('getTValidationVersements');
          console.log(resp);
          if(resp.success) {
            return ValidationVersementActions.loadValidationVersementsSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return ValidationVersementActions.loadValidationVersementsFailure(
              {
                action: 'LOAD_VALIDATION_VERSEMENTS',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(ValidationVersementActions.loadValidationVersementsFailure(
          {
            action: 'LOAD_VALIDATION_VERSEMENTS',
            error: err
          }
        )))
      )
    })
  ));

  validateVersement$ = createEffect( () => this.actions$.pipe(
    ofType(ValidationVersementActions.ValidationVersementActionstypes.VALIDATE_VERSEMENT),
    exhaustMap((action: any) => {

      return this.validationVersementService.validateVersement(action.data).pipe(
        map((resp: AnyResponse) => {
          console.log('getTValidationVersements');
          console.log(resp);
          if(resp.success) {
            return ValidationVersementActions.validateVersementSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return ValidationVersementActions.validateVersementFailure(
              {
                action: 'LOAD_VALIDATION_VERSEMENTS',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(ValidationVersementActions.validateVersementFailure(
          {
            action: 'LOAD_VALIDATION_VERSEMENTS',
            error: err
          }
        )))
      )
    })
  ));
}
