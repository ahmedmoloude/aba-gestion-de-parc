import { createReducer, on } from '@ngrx/store';
import { GlobalConfig } from 'app/core/models/globalConfig.model';
import {
  fetchTaxe,
  fetchTaxeSuccess,
  TaxeActionFailure,
} from './taxe.actions';

export interface TaxeState {
  payload: GlobalConfig[];
  loading: boolean;
  error: {
    action: string;
    error: any;
  } | null;
  status: 'INIT' | 'LOADING' | 'SUCCESS' | 'ERROR';
}

export const initialState: TaxeState = {
  payload: [],
  loading: false,
  error: null,
  status: 'INIT',
};

export const taxeReducer = createReducer(
  initialState,

  on(fetchTaxe, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(fetchTaxeSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload,
    status: 'SUCCESS',
    error: null,
  })),
  
  on(TaxeActionFailure, (state, { action, error }) => ({
    ...state,
    loading: false,
    status: 'ERROR',
    error: { action, error },
  }))
);

// #TODO move to helpers
const updateItemFromList = (updateItem: any, listItems: any[]) => {
  return listItems.map((item) => {
    if (item.uuid == updateItem.uuid) {
      return updateItem;
    }
    return item;
  });
};
