import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import * as ReceiptActions from 'app/core/store/facturation/customer-fee/receipt/receipt.actions';
import { ReceiptService } from 'app/core/services/facturation/customer-fee/receipt.service';
import { ReceiptResponse, ReceiptsResponse } from 'app/core/models/facturation/response-data.model';
import { updatePagination } from 'app/core/store/pagination/pagination.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';




@Injectable()
export class ReceiptEffects {



  constructor(private actions$: Actions,
              private receiptService: ReceiptService,
              private _toast: ToastService,
              private store : Store<AppState> ) {}

  loadReceipts$ = createEffect( () => this.actions$.pipe(
    ofType(ReceiptActions.ReceiptActionstypes.LOAD_RECEIPTS),
    exhaustMap((action: any) => {
      return this.receiptService.getReceipts(action.data, action.per_page , action.page).pipe(
        map((resp: ReceiptsResponse) => {
          console.log('receipts');
          console.log(resp);
          if(resp.success) {
            this.store.dispatch(updatePagination({
              currentPage: resp.response.current_page,
              pageSize: resp.response.per_page,
              totalItems: resp.response.total
             }));
            return ReceiptActions.loadReceiptsSuccess({data: resp.response.data})
          } else {
            this._toast.error('une erreur est survenue!');
            return ReceiptActions.loadReceiptsFailure(
              {
                action: 'Load Receipts',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(ReceiptActions.loadReceiptsFailure(
          {
            action: 'Load Receipts',
            error: err
          }
        )))
      )
    })
  ));




  createReceipt$ = createEffect( () => this.actions$.pipe(
    ofType(ReceiptActions.ReceiptActionstypes.CREATE_RECEIPT),
    exhaustMap((action: any) => {
      return this.receiptService.createReceipt(action.data).pipe(
        map((resp: ReceiptResponse) => {
          console.log('receipt');
          console.log(resp);
          if(resp.success) {
            return ReceiptActions.createReceiptSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return ReceiptActions.createReceiptFailure(
              {
                action: 'create Receipt',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(ReceiptActions.createReceiptFailure(
          {
            action: 'create Receipt',
            error: err
          }
        )))
      )
    })
  ));

}
