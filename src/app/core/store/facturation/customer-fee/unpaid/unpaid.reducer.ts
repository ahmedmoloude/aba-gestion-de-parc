import { Action, createReducer, on } from '@ngrx/store';
import * as UnpaidActions from 'app/core/store/facturation/customer-fee/unpaid/unpaid.actions';



export const unpaidFeatureKey = 'unpaid';

export enum UnpaidStateEnum {
  INIT ='INIT',
  LOADING ='LOADING',
  SUCCESS ='SUCCESS',
  ERROR ='ERROR',
}

export interface UnpaidState {
  unpaids: any[],
  unpaid: any
  dataState: UnpaidStateEnum;
  errorMessage: { action: string; error: any } | null;
}

export const initialState: UnpaidState = {
  unpaids: null,
  unpaid: null,
  dataState: UnpaidStateEnum.INIT,
  errorMessage: null,
};


export const unpaidReducer = createReducer(
  initialState,
  on(UnpaidActions.loadUnpaids, state => ({...state, dataState: UnpaidStateEnum.LOADING})),
  on(UnpaidActions.loadUnpaidsSuccess, (state, {data}) => ({...state, dataState: UnpaidStateEnum.SUCCESS, unpaids: data})),
  on(UnpaidActions.loadUnpaidsFailure, (state, {error}) => ({...state, dataState: UnpaidStateEnum.ERROR, errorMessage: error})),
  on(UnpaidActions.createUnpaid, state => ({...state, dataState: UnpaidStateEnum.LOADING})),
  on(UnpaidActions.createUnpaidSuccess, (state, { data }) => ({...state, dataState: UnpaidStateEnum.SUCCESS, unpaid: data, unpaids: [data, ...state.unpaids],})),
  on(UnpaidActions.createUnpaidFailure, (state, {error}) => ({...state, dataState: UnpaidStateEnum.ERROR, errorMessage: error.error})),
);

