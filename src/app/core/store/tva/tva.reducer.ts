import { createReducer, on } from '@ngrx/store';
import {
  fetchTva,
  fetchTvaSuccess,
  TvaActionFailure
} from './tva.actions';

export interface TvaState {
  payload: any[];
  loading: boolean;
  error: {
    action: string;
    error: any;
  } | null;
  status: 'INIT' | 'LOADING' | 'SUCCESS' | 'ERROR';
}

export const initialState: TvaState = {
  payload: [],
  loading: false,
  error: null,
  status: 'INIT',
};

export const tvaReducer = createReducer(
  initialState,
  on(fetchTva, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(fetchTvaSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload,
    status: 'SUCCESS',
    error: null,
  })),
  
  on(TvaActionFailure, (state, { action, error }) => ({
    ...state,
    loading: false,
    status: 'ERROR',
    error: { action, error },
  })),

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
