import { createReducer, on } from '@ngrx/store';
import {
  addcarte,
  addcartesuccess,
  updatecarte,
  updatecartesuccess,
  deletecarte,
  deletecartesuccess,
  fetchcartes,
  fetchcartesSuccess,
  carteActionFailure,
  } from './carte.actions';

export interface carteState {
  payload: any;
  loading: boolean;
  error: {
    action: string;
    error: any;
  } | null;
  status: 'INIT' | 'LOADING' | 'SUCCESS' | 'ERROR';
}

export const initialState: carteState = {
  payload: [],
  loading: false,
  error: null,
  status: 'INIT',
};

export const carteReducer = createReducer(
  initialState,
  on(fetchcartes, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(fetchcartesSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload,
    status: 'SUCCESS',
    error: null,
  })),

  on(addcarte, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(addcartesuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload: { ...state.payload , data : [payload , ...state.payload.data] },
    status: 'SUCCESS',
    error: null,
  })),

  on(updatecarte, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(updatecartesuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload: { ...state.payload , data : updateItemFromList(payload, state.payload.data) },
    status: 'SUCCESS',
    error: null,
  })),

  on(deletecarte, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(deletecartesuccess, (state, { uuid }) => ({
    ...state,
    loading: false,
    payload: { ...state.payload , data : state.payload.data.filter((item) => item.uuid != uuid) },
    status: 'SUCCESS',
    error: null,
  })),

  on(carteActionFailure, (state, { action, error }) => ({
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
