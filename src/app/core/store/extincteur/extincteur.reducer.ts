import { createReducer, on } from '@ngrx/store';
import {
    addextincteur,
    addextincteursuccess,
    updateextincteur,
    updateextincteursuccess,
    deleteextincteur,
    deleteextincteursuccess,
    fetchextincteurs,
    fetchextincteursSuccess,
    extincteurActionFailure,
  } from './extincteur.actions';

export interface ExtincteurState {
  payload: any;
  loading: boolean;
  error: {
    action: string;
    error: any;
  } | null;
  status: 'INIT' | 'LOADING' | 'SUCCESS' | 'ERROR';
}

export const initialState: ExtincteurState = {
  payload: [],
  loading: false,
  error: null,
  status: 'INIT',
};

export const extincteurReducer = createReducer(
  initialState,
  on(fetchextincteurs, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(fetchextincteursSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload,
    status: 'SUCCESS',
    error: null,
  })),

  on(addextincteur, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(addextincteursuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload: { ...state.payload , data : [payload , ...state.payload.data] },
    status: 'SUCCESS',
    error: null,
  })),

  on(updateextincteur, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(updateextincteursuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload: { ...state.payload , data : updateItemFromList(payload, state.payload.data) },
    status: 'SUCCESS',
    error: null,
  })),

  on(deleteextincteur, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(deleteextincteursuccess, (state, { uuid }) => ({
    ...state,
    loading: false,
    payload: state.payload.filter((item) => item.uuid != uuid),
    status: 'SUCCESS',
    error: null,
  })),

  on(extincteurActionFailure, (state, { action, error }) => ({
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
