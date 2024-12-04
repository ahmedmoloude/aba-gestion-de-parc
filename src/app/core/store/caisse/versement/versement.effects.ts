import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { VersementService } from 'app/core/services/caisse/versement.service';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import * as VersementActions from 'app/core/store/caisse/versement/versement.actions';
import { AnyResponse, VersementResponse } from 'app/core/models/facturation/response-data.model';
import { cloneDeep } from 'lodash';
import { VersementFilter } from 'app/core/models/caisse/filter/versement-filter.model';



@Injectable()
export class VersementEffects {



  constructor(private actions$: Actions,
    private versementService: VersementService,
              private _toast: ToastService) {}

  loadVersementsVirement$ = createEffect( () => this.actions$.pipe(
    ofType(VersementActions.VersementActionstypes.LOAD_VERSEMENTS_VIREMENT),
    exhaustMap((action: any) => {
      let data = cloneDeep(action.data);
      if(!data)
      data = new VersementFilter();
      data.type = 'Virement';
      return this.versementService.getVersements(action.data).pipe(
        map((resp: VersementResponse) => {
          console.log('Versement Virement');
          console.log(resp);
          if(resp.success) {
            return VersementActions.loadVersementsVirementSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return VersementActions.loadVersementsVirementFailure(
              {
                action: 'Load Versements Virement',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(VersementActions.loadVersementsVirementFailure(
          {
            action: 'Load Versements Virement',
            error: err
          }
        )))
      )
    })
  ));

  loadVersementsCheck$ = createEffect( () => this.actions$.pipe(
    ofType(VersementActions.VersementActionstypes.LOAD_VERSEMENTS_CHECK),
    exhaustMap((action: any) => {
      let data = cloneDeep(action.data);
      if(!data)
      data = new VersementFilter();
      data.type = 'CHECK';
      return this.versementService.getVersements(action.data).pipe(
        map((resp: VersementResponse) => {
          console.log('Versement CHECK');
          console.log(resp);
          if(resp.success) {
            return VersementActions.loadVersementsCheckSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return VersementActions.loadVersementsCheckFailure(
              {
                action: 'Load Versements CHECK',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(VersementActions.loadVersementsCheckFailure(
          {
            action: 'Load Versements CHECK',
            error: err
          }
        )))
      )
    })
  ));

  validateVersementVirement$ = createEffect( () => this.actions$.pipe(
    ofType(VersementActions.VersementActionstypes.VALIDATE_VERSEMENT_VIREMENT),
    exhaustMap((action: any) => {
      return this.versementService.validateVersement(action.data).pipe(
        map((resp: AnyResponse) => {
          console.log('VALIDATE_VERSEMENT_VIREMENT');
          console.log(resp);
          if(resp.success) {
            return VersementActions.validateVersementVirementSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return VersementActions.validateVersementVirementFailure(
              {
                action: 'VALIDATE_VERSEMENT_VIREMENT',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(VersementActions.validateVersementVirementFailure(
          {
            action: 'VALIDATE_VERSEMENT_VIREMENT',
            error: err
          }
        )))
      )
    })
  ));

  validateVersementCheck$ = createEffect( () => this.actions$.pipe(
    ofType(VersementActions.VersementActionstypes.VALIDATE_VERSEMENT_CHECK),
    exhaustMap((action: any) => {

      return this.versementService.validateVersement(action.data).pipe(
        map((resp: AnyResponse) => {
          console.log('VALIDATE_VERSEMENT_CHECK');
          console.log(resp);
          if(resp.success) {
            return VersementActions.validateVersementCheckSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return VersementActions.validateVersementCheckFailure(
              {
                action: 'VALIDATE_VERSEMENT_CHECK',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(VersementActions.validateVersementCheckFailure(
          {
            action: 'VALIDATE_VERSEMENT_CHECK',
            error: err
          }
        )))
      )
    })
  ));

}
