import { createReducer, on } from '@ngrx/store';
import {
  addciterne,
  addciternesuccess,
  updateciterne,
  updateciternesuccess,
  deleteciterne,
  deleteciternesuccess,
  fetchciternes,
  fetchciternesSuccess,
  citerneActionFailure,
  } from './citerne.actions';

export interface citerneState {
  payload: any;
  loading: boolean;
  error: {
    action: string;
    error: any;
  } | null;
  status: 'INIT' | 'LOADING' | 'SUCCESS' | 'ERROR';
}

export const initialState: citerneState = {
  payload: [],
  loading: false,
  error: null,
  status: 'INIT',
};

export const citerneReducer = createReducer(
  initialState,
  on(fetchciternes, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(fetchciternesSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload,
    status: 'SUCCESS',
    error: null,
  })),

  on(addciterne, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(addciternesuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload: { ...state.payload , data : [payload , ...state.payload.data] },
    status: 'SUCCESS',
    error: null,
  })),

  on(updateciterne, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(updateciternesuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload: updateItemFromList(payload, state.payload),
    status: 'SUCCESS',
    error: null,
  })),

  on(deleteciterne, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(deleteciternesuccess, (state, { uuid }) => ({
    ...state,
    loading: false,
    payload: state.payload.filter((item) => item.uuid != uuid),
    status: 'SUCCESS',
    error: null,
  })),

  on(citerneActionFailure, (state, { action, error }) => ({
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
