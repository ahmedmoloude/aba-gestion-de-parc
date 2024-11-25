import { createReducer, on } from '@ngrx/store';
import {
    addtypeExtincteur,
    addtypeExtincteuruccess,
    updatetypeExtincteur,
    updatetypeExtincteuruccess,
    deletetypeExtincteur,
    deletetypeExtincteuruccess,
    fetchtypeExtincteur,
    fetchtypeExtincteurSuccess,
    typeExtincteurActionFailure,
  } from './typeExtincteur.actions';

export interface typeExtincteurState {
  payload: any[];
  loading: boolean;
  error: {
    action: string;
    error: any;
  } | null;
  status: 'INIT' | 'LOADING' | 'SUCCESS' | 'ERROR';
}

export const initialState: typeExtincteurState = {
  payload: [],
  loading: false,
  error: null,
  status: 'INIT',
};

export const typeExtincteurReducer = createReducer(
  initialState,
  on(fetchtypeExtincteur, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(fetchtypeExtincteurSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload,
    status: 'SUCCESS',
    error: null,
  })),

  on(addtypeExtincteur, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(addtypeExtincteuruccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload: [payload, ...state.payload],
    status: 'SUCCESS',
    error: null,
  })),

  on(updatetypeExtincteur, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(updatetypeExtincteuruccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload: updateItemFromList(payload, state.payload),
    status: 'SUCCESS',
    error: null,
  })),

  on(deletetypeExtincteur, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(deletetypeExtincteuruccess, (state, { uuid }) => ({
    ...state,
    loading: false,
    payload: state.payload.filter((item) => item.uuid != uuid),
    status: 'SUCCESS',
    error: null,
  })),

  on(typeExtincteurActionFailure, (state, { action, error }) => ({
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
