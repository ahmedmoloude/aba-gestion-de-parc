import { createAction, props } from '@ngrx/store';
import { Receipt } from 'app/core/models/facturation/customer-fee/receipt.model';
import { ReceiptFilter } from 'app/core/models/facturation/filters/receipt-filter.model';

export enum ReceiptActionstypes {
  /* Load Receipts */
  LOAD_RECEIPTS = '[Receipt] Load Receipts',
  LOAD_RECEIPTS_SUCCESS = '[Receipt] Load Receipts Success',
  LOAD_RECEIPTS_FAILURE = '[Receipt] Load Receipts Failure',

  /* Load Receipt */
  LOAD_RECEIPT = '[Receipt] Load Receipt',
  LOAD_RECEIPT_SUCCESS = '[Receipt] Load Receipt Success',
  LOAD_RECEIPT_FAILURE = '[Receipt] Load Receipt Failure',

  /* Create Receipt */
  CREATE_RECEIPT = '[Receipt] Create Receipt',
  CREATE_RECEIPT_SUCCESS = '[Receipt] Create Receipt Success',
  CREATE_RECEIPT_FAILURE = '[Receipt] Create Receipt Failure',

  /* Update Receipt */
  UPDATE_RECEIPT = '[Receipt] Update Receipt',
  UPDATE_RECEIPT_SUCCESS = '[Receipt] Update Receipt Success',
  UPDATE_RECEIPT_FAILURE = '[Receipt] Update Receipt Failure',

  /* Delete Receipt */
  DELETE_RECEIPT = '[Receipt] Delete Receipt',
  DELETE_RECEIPT_SUCCESS = '[Receipt] Delete Receipt Success',
  DELETE_RECEIPT_FAILURE = '[Receipt] Delete Receipt Failure',

}

/* End Load Receipts Actions */
export const loadReceipts = createAction(
  ReceiptActionstypes.LOAD_RECEIPTS,
  props<{ data: ReceiptFilter, per_page :number, page : number }>()
);

export const loadReceiptsSuccess = createAction(
  ReceiptActionstypes.LOAD_RECEIPTS_SUCCESS,
  props<{ data: any }>()
);

export const loadReceiptsFailure = createAction(
  ReceiptActionstypes.LOAD_RECEIPTS_FAILURE,
  props<{ action: string; error: any }>()
);
/* End Load Receipts Actions */


/* Create Receipt Actions */
export const createReceipt = createAction(
  ReceiptActionstypes.CREATE_RECEIPT,
  props<{ data: Receipt }>()
);

export const createReceiptSuccess = createAction(
  ReceiptActionstypes.CREATE_RECEIPT_SUCCESS,
  props<{ data: any }>()
);

export const createReceiptFailure = createAction(
  ReceiptActionstypes.CREATE_RECEIPT_FAILURE,
  props<{ action: string; error: any }>()
);
/* End Create Receipt Actions */
