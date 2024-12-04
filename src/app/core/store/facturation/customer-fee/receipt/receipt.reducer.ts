import { Action, createReducer, on } from '@ngrx/store';
import * as ReceiptActions from 'app/core/store/facturation/customer-fee/receipt/receipt.actions';



export const receiptFeatureKey = 'receipt';

export enum ReceiptStateEnum {
  INIT ='INIT',
  LOADING ='LOADING',
  SUCCESS ='SUCCESS',
  ERROR ='ERROR',
}

export interface ReceiptState {
  receipts: any[],
  receipt: any,
  dataState: ReceiptStateEnum,
  errorMessage: { action: string; error: any } | null
}

export const initialState: ReceiptState = {
  receipts: null,
  receipt: null,
  dataState: ReceiptStateEnum.INIT,
  errorMessage: null,
};


export const receiptReducer = createReducer(
  initialState,
  on(ReceiptActions.loadReceipts, state => ({...state, dataState: ReceiptStateEnum.LOADING})),
  on(ReceiptActions.loadReceiptsSuccess, (state, {data}) => ({...state, dataState: ReceiptStateEnum.SUCCESS, receipts: data})),
  on(ReceiptActions.loadReceiptsFailure, (state, {error}) => ({...state, dataState: ReceiptStateEnum.ERROR, errorMessage: error})),
  on(ReceiptActions.createReceipt, state => ({...state, dataState: ReceiptStateEnum.LOADING})),
  on(ReceiptActions.createReceiptSuccess, (state, { data }) => ({...state, dataState: ReceiptStateEnum.SUCCESS, receipt: data, receipts: [data, ...state.receipts],})),
  on(ReceiptActions.createReceiptFailure, (state, {error}) => ({...state, dataState: ReceiptStateEnum.ERROR, errorMessage: error})),
);

