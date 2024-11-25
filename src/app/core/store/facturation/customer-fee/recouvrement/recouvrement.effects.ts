import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import * as RecouvrementActions from 'app/core/store/facturation/customer-fee/recouvrement/recouvrement.actions'
import { RecouvrementService } from 'app/core/services/facturation/customer-fee/recouvrement.service';
import { ToastService } from 'app/services';
import { RecouvrementsResponse } from 'app/core/models/facturation/response-data.model';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { updatePagination } from 'app/core/store/pagination/pagination.actions';



@Injectable()
export class RecouvrementEffects {



  constructor(private actions$: Actions,
              private recouvrementService: RecouvrementService,
              private _toast: ToastService,
              private store : Store<AppState>
            ) {}

  loadRecouvrements$ = createEffect( () => this.actions$.pipe(
    ofType(RecouvrementActions.RecouvrementActionstypes.LOAD_RECOUVREMENTS),
    exhaustMap((action: any) => {
      return this.recouvrementService.getCreanceClientList(action.data, action.per_page, action.page).pipe(
        map((resp: RecouvrementsResponse) => {
          console.log('getCreanceClientList');
          console.log(resp);
          if(resp.success) {
            this.store.dispatch(updatePagination({
              currentPage: resp.response.current_page,
              pageSize: resp.response.per_page,
              totalItems: resp.response.total
             }));
            return RecouvrementActions.loadRecouvrementsSuccess({data: resp.response.data})
          } else {
            this._toast.error('une erreur est survenue!');
            return RecouvrementActions.loadRecouvrementsFailure(
              {
                action: 'Load Recouvrements',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(RecouvrementActions.loadRecouvrementsFailure(
          {
            action: 'Load Recouvrements',
            error: err
          }
        )))
      )
    })
  ));

  loadRecouvrementsStatisctics$ = createEffect( () => this.actions$.pipe(
    ofType(RecouvrementActions.RecouvrementActionstypes.LOAD_TOTAL_RECOUVREMENTS),
    exhaustMap((action: any) => {
      return this.recouvrementService.getCreanceClientStatistics().pipe(
        map((resp: RecouvrementsResponse) => {
          console.log('getCreanceClientStatistics');
          console.log(resp);
          if(resp.success) {
            return RecouvrementActions.loadTotalRecouvrementsSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return RecouvrementActions.loadTotalRecouvrementsFailure(
              {
                action: 'Load Recouvrements statisctics',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(RecouvrementActions.loadTotalRecouvrementsFailure(
          {
            action: 'Load Recouvrements statistics',
            error: err
          }
        )))
      )
    })
  ));

  loadRecouvrement$ = createEffect( () => this.actions$.pipe(
    ofType(RecouvrementActions.RecouvrementActionstypes.LOAD_RECOUVREMENT),
    exhaustMap((action: any) => {
      return this.recouvrementService.getCreanceClientdetail(action.data).pipe(
        map((resp: RecouvrementsResponse) => {
          console.log('getCreanceClientdetail');
          console.log(resp);
          if(resp.success) {
            return RecouvrementActions.loadRecouvrementSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return RecouvrementActions.loadRecouvrementFailure(
              {
                action: 'Load Recouvrement',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(RecouvrementActions.loadRecouvrementFailure(
          {
            action: 'Load Recouvrement',
            error: err
          }
        )))
      )
    })
  ));

  loadRecouvrementByRange$ = createEffect( () => this.actions$.pipe(
    ofType(RecouvrementActions.RecouvrementActionstypes.LOAD_RECOUVREMENTS_BY_RANGE),
    exhaustMap((action: any) => {
      return this.recouvrementService.getCreanceByRange(action.data).pipe(
        map((resp: RecouvrementsResponse) => {
          console.log('getCreanceByRange');
          console.log(resp);
          if(resp.success) {
            return RecouvrementActions.loadRecouvrementsByRangeSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return RecouvrementActions.loadRecouvrementsByRangeFailure(
              {
                action: 'Load Recouvrements By Range',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(RecouvrementActions.loadRecouvrementsByRangeFailure(
          {
            action: 'Load Recouvrements By Range',
            error: err
          }
        )))
      )
    })
  ));

}
