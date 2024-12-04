import { createReducer, on } from '@ngrx/store';
import {
  addtonnage,
  addtonnagesuccess,
  updatetonnage,
  updatetonnagesuccess,
  deletetonnage,
  deletetonnagesuccess,
  fetchtonnages,
  fetchtonnagesSuccess,
  tonnageActionFailure,
} from './tonnage.actions';

export interface tonnageState {
  payload: any[];
  loading: boolean;
  error: {
    action: string;
    error: any;
  } | null;
  status: 'INIT' | 'LOADING' | 'SUCCESS' | 'ERROR';
}

export const initialState: tonnageState = {
  payload: [],
  loading: false,
  error: null,
  status: 'INIT',
};

export const tonnageReducer = createReducer(
  initialState,
  on(fetchtonnages, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(fetchtonnagesSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload,
    status: 'SUCCESS',
    error: null,
  })),

  on(addtonnage, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(addtonnagesuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload: [payload, ...state.payload],
    status: 'SUCCESS',
    error: null,
  })),

  on(updatetonnage, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(updatetonnagesuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload: updateItemFromList(payload, state.payload),
    status: 'SUCCESS',
    error: null,
  })),

  on(deletetonnage, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(deletetonnagesuccess, (state, { uuid }) => ({
    ...state,
    loading: false,
    payload: state.payload.filter((item) => item.uuid != uuid),
    status: 'SUCCESS',
    error: null,
  })),

  on(tonnageActionFailure, (state, { action, error }) => ({
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
