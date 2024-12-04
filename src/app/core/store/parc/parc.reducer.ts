import { createReducer, on } from '@ngrx/store';
import {
  addparc,
  addparcuccess,
  fetchparc,
  fetchparcSuccess,
  parcActionFailure,
} from './parc.actions';

export interface parcState {
  payload: any[];
  loading: boolean;
  error: {
    action: string;
    error: any;
  } | null;
  status: 'INIT' | 'LOADING' | 'SUCCESS' | 'ERROR';
}

export const initialState: parcState = {
  payload: [],
  loading: false,
  error: null,
  status: 'INIT',
};

export const parcReducer = createReducer(
  initialState,
  on(fetchparc, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(fetchparcSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload,
    status: 'SUCCESS',
    error: null,
  })),

  on(addparc, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(addparcuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload: [payload, ...state.payload],
    status: 'SUCCESS',
    error: null,
  })),

  // on(updateparc, (state) => ({
  //   ...state,
  //   loading: true,
  //   status: 'LOADING',
  //   error: null,
  // })),
  // on(updateparcsuccess, (state, { payload }) => ({
  //   ...state,
  //   loading: false,
  //   payload: updateItemFromList(payload, state.payload),
  //   status: 'SUCCESS',
  //   error: null,
  // })),

  // on(deleteparc, (state) => ({
  //   ...state,
  //   loading: true,
  //   status: 'LOADING',
  //   error: null,
  // })),
  // on(deleteparcsuccess, (state, { uuid }) => ({
  //   ...state,
  //   loading: false,
  //   payload: state.payload.filter((item) => item.uuid != uuid),
  //   status: 'SUCCESS',
  //   error: null,
  // })),

  on(parcActionFailure, (state, { action, error }) => ({
    ...state,
    loading: false,
    status: 'ERROR',
    error: { action, error },
  }))
  //
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
