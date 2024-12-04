import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import { AnyResponse} from 'app/core/models/facturation/response-data.model';
import * as PieceRechangesActions from'app/core/store/maintenance/piece-rechange/piece-rechange.actions';
import { PieceRechangeService } from 'app/core/services/maintenance/piece-rechange.service';
import { updatePagination } from '../../pagination/pagination.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.states';




@Injectable()
export class PieceRechangeEffects {

  constructor(private actions$: Actions,
    private pieceRechangeService: PieceRechangeService,
    private _toast: ToastService,
    private store : Store<AppState>) {}

  loadPieceRechanges$ = createEffect( () => this.actions$.pipe(
    ofType(PieceRechangesActions.PieceRechangesActionsType.LOAD_PIECES_RECHANGE),
    exhaustMap((action: any) => {
      return this.pieceRechangeService.getPiecesRechange().pipe(
        map((resp: any) => {
          console.log('PieceRechanges');
          console.log(resp);
          if(resp.success) {
            return PieceRechangesActions.loadPieceRechangesSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return PieceRechangesActions.loadPieceRechangesFailure(
              {
                action: 'Load PieceRechanges',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(PieceRechangesActions.loadPieceRechangesFailure(
          {
            action: 'Load PieceRechanges',
            error: err
          }
        )))
      )
    })
  ));

  loadInventoryList$ = createEffect( () => this.actions$.pipe(
    ofType(PieceRechangesActions.PieceRechangesActionsType.LOAD_INVENTORY_LIST),
    exhaustMap((action: any) => {
      return this.pieceRechangeService.getInventoryList(action.reference, action.name, action.per_page, action.page).pipe(
        map((resp: any) => {
          console.log('Inventory List');
          console.log(resp);
          if(resp.success) {
            this.store.dispatch(updatePagination({
              currentPage: resp.response.current_page,
              pageSize: resp.response.per_page,
              totalItems: resp.response.total
             }));
            return PieceRechangesActions.loadInventoryListSuccess({data: resp.response.data})
          } else {
            this._toast.error('une erreur est survenue!');
            return PieceRechangesActions.loadInventoryListFailure(
              {
                action: 'Load Inventory List',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(PieceRechangesActions.loadInventoryListFailure(
          {
            action: 'Load Inventory List',
            error: err
          }
        )))
      )
    })
  ));

  addInventory$ = createEffect( () => this.actions$.pipe(
    ofType(PieceRechangesActions.PieceRechangesActionsType.ADD_INVENTORY),
    exhaustMap((action: any) => {
      return this.pieceRechangeService.addInventory(action.data).pipe(
        map((resp: any) => {
          console.log('Inventory');
          console.log(resp);
          if(resp.success) {
            return PieceRechangesActions.addInventorySuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return PieceRechangesActions.addInventoryFailure(
              {
                action: 'Add Inventory',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(PieceRechangesActions.addInventoryFailure(
          {
            action: 'Add Inventory',
            error: err
          }
        )))
      )
    })
  ));

  loadInventoryHistoric$ = createEffect( () => this.actions$.pipe(
    ofType(PieceRechangesActions.PieceRechangesActionsType.LOAD_INVENTORY_Historic),
    exhaustMap((action: any) => {
      return this.pieceRechangeService.getInventoryHistoric(action.data).pipe(
        map((resp: any) => {
          console.log('Inventory Historic');
          console.log(resp);
          if(resp.success) {
            return PieceRechangesActions.loadInventoryHistoricSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return PieceRechangesActions.loadInventoryHistoricFailure(
              {
                action: 'Load Inventory Historic',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(PieceRechangesActions.loadInventoryHistoricFailure(
          {
            action: 'Load Inventory Historic',
            error: err
          }
        )))
      )
    })
  ));

}
