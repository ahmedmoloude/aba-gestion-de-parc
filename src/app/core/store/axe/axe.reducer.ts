import { createReducer, on } from '@ngrx/store';
// import { Axe } from 'app/core/models/axe.model';
import {
    addAxe,
    addAxeSuccess,
    updateAxe,
    updateAxeSuccess,
    deleteAxe,
    deleteAxeSuccess,
    fetchAxe,
    fetchAxeSuccess,
    AxeActionFailure,
  } from './axe.action';

export interface axeState {
  payload: any[];
  loading: boolean;
  error: {
    action: string;
    error: any;
  } | null;
  status: 'INIT' | 'LOADING' | 'SUCCESS' | 'ERROR';
}

export const initialState: axeState = {
  payload: [],
  loading: false,
  error: null,
  status: 'INIT',
};

export const axeReducer = createReducer(
  initialState,
  on(fetchAxe, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(fetchAxeSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload,
    status: 'SUCCESS',
    error: null,
  })),

  on(addAxe, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(addAxeSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload: [payload, ...state.payload],
    status: 'SUCCESS',
    error: null,
  })),

  on(updateAxe, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(updateAxeSuccess, (state, { payload, uuid }) => ({
    ...state,
    loading: false,
    payload: updateItemFromList(payload, state.payload, uuid),
    status: 'SUCCESS',
    error: null,
  })),

  on(AxeActionFailure, (state, { action, error }) => ({
    ...state,
    loading: false,
    status: 'ERROR',
    error: { action, error },
  }))
  //
);

// #TODO move to helpers
const updateItemFromList = (updateItem: any, listItems: any[], uuid:any) => {
  console.log("REDUCER ID", uuid)
  return listItems.map((item) => {
    if (item.id == uuid) {
      return updateItem;
    }
    return item;
  });
};
