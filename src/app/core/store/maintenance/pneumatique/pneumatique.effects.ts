import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import { AnyResponse, PneuAffectationResponse, PneuResponse, PneusResponse} from 'app/core/models/facturation/response-data.model';
import * as PneumatiqueActions from'app/core/store/maintenance/pneumatique/pneumatique.actions';
import { PneumatiqueService } from 'app/core/services/maintenance/pneumatique.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.states';
import { updatePagination } from '../../pagination/pagination.actions';

@Injectable()
export class PneumatiqueEffects {

  constructor(private actions$: Actions,
    private pneumatiqueService: PneumatiqueService,
    private _toast: ToastService,
    private store : Store<AppState>) {}

  loadPneus$ = createEffect( () => this.actions$.pipe(
    ofType(PneumatiqueActions.PneumatiqueActionsType.LOAD_PNEUS),
    exhaustMap((action: any) => {
      return this.pneumatiqueService.getPneus(action.data, action.per_page, action.page).pipe(
        map((resp: PneusResponse) => {
          console.log('Pneus');
          console.log(resp);
          if(resp.success) {
            this.store.dispatch(updatePagination({
              currentPage: resp.response.current_page,
              pageSize: resp.response.per_page,
              totalItems: resp.response.total
             }));
            return PneumatiqueActions.loadPneusSuccess({data: resp.response.data})
          } else {
            this._toast.error('une erreur est survenue!');
            return PneumatiqueActions.loadPneusFailure(
              {
                action: 'Load Pneus',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(PneumatiqueActions.loadPneusFailure(
          {
            action: 'Load Pneus',
            error: err
          }
        )))
      )
    })
  ));

  createPneu$ = createEffect( () => this.actions$.pipe(
    ofType(PneumatiqueActions.PneumatiqueActionsType.CREATE_PNEU),
    exhaustMap((action: any) => {
      return this.pneumatiqueService.createPneu(action.data).pipe(
        map((resp: PneuResponse) => {
          console.log('Pneu');
          console.log(resp);
          if(resp.success) {
            return PneumatiqueActions.createPneuSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return PneumatiqueActions.createPneuFailure(
              {
                action: 'Create Pneu',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(PneumatiqueActions.createPneuFailure(
          {
            action: 'Create Pneu',
            error: err
          }
        )))
      )
    })
  ));

  getPneu$ = createEffect( () => this.actions$.pipe(
    ofType(PneumatiqueActions.PneumatiqueActionsType.GET_PNEU),
    exhaustMap((action: any) => {
      return this.pneumatiqueService.getPneu(action.data).pipe(
        map((resp: PneuResponse) => {
          console.log('Pneu');
          console.log(resp);
          if(resp.success) {
            return PneumatiqueActions.getPneuSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return PneumatiqueActions.getPneuFailure(
              {
                action: 'Get Pneu',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(PneumatiqueActions.getPneuFailure(
          {
            action: 'Get Pneu',
            error: err
          }
        )))
      )
    })
  ));

  affectPneu$ = createEffect( () => this.actions$.pipe(
    ofType(PneumatiqueActions.PneumatiqueActionsType.AFFECT_PNEU),
    exhaustMap((action: any) => {
      return this.pneumatiqueService.affectPneu(action.data).pipe(
        map((resp: PneuAffectationResponse) => {
          console.log('Pneu');
          console.log(resp);
          if(resp.success) {
            return PneumatiqueActions.affectPneuSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return PneumatiqueActions.affectPneuFailure(
              {
                action: 'Affect Pneu',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(PneumatiqueActions.affectPneuFailure(
          {
            action: 'Affect Pneu',
            error: err
          }
        )))
      )
    })
  ));

  desaffectPneu$ = createEffect( () => this.actions$.pipe(
    ofType(PneumatiqueActions.PneumatiqueActionsType.DESAFFECT_PNEU),
    exhaustMap((action: any) => {
      return this.pneumatiqueService.desaffectPneu(action.data).pipe(
        map((resp: PneuAffectationResponse) => {
          console.log('Pneu');
          console.log(resp);
          if(resp.success) {
            return PneumatiqueActions.desaffectPneuSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return PneumatiqueActions.desaffectPneuFailure(
              {
                action: 'Desaffect Pneu',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(PneumatiqueActions.desaffectPneuFailure(
          {
            action: 'Desaffect Pneu',
            error: err
          }
        )))
      )
    })
  ));

  updatePneu$ = createEffect( () => this.actions$.pipe(
    ofType(PneumatiqueActions.PneumatiqueActionsType.UPDATE_PNEU),
    exhaustMap((action: any) => {
      return this.pneumatiqueService.updatePneu(action.data).pipe(
        map((resp: PneuResponse) => {
          console.log('Pneu');
          console.log(resp);
          if(resp.success) {
            return PneumatiqueActions.updatePneuSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return PneumatiqueActions.updatePneuFailure(
              {
                action: 'Update Pneu',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(PneumatiqueActions.updatePneuFailure(
          {
            action: 'Update Pneu',
            error: err
          }
        )))
      )
    })
  ));

  deletePneu$ = createEffect( () => this.actions$.pipe(
    ofType(PneumatiqueActions.PneumatiqueActionsType.DELETE_PNEU),
    exhaustMap((action: any) => {
      return this.pneumatiqueService.deletePneu(action.data).pipe(
        map((resp: AnyResponse) => {
          console.log('Pneu');
          console.log(resp);
          if(resp.success) {
            return PneumatiqueActions.deletePneuSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return PneumatiqueActions.deletePneuFailure(
              {
                action: 'Delete Pneu',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(PneumatiqueActions.deletePneuFailure(
          {
            action: 'Delete Pneu',
            error: err
          }
        )))
      )
    })
  ));
}
