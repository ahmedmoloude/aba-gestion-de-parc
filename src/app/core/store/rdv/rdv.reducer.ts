import { createReducer, on } from '@ngrx/store';
import { RDV } from 'app/core/models/rdv.model';
import {
  addrdv,
  addrdvsuccess,
  updaterdv,
  updaterdvsuccess,
  deleterdv,
  deleterdvsuccess,
  fetchrdv,
  fetchrdvSuccess,
  rdvActionFailure,
  // addTask,
  // addTasksuccess
} from './rdv.actions';

export interface RdvState {
  payload: any;
  loading: boolean;
  error: {
    action: string;
    error: any;
  } | null;
  status: 'INIT' | 'LOADING' | 'SUCCESS' | 'ERROR';
}

export const initialState: RdvState = {
  payload: [],
  loading: false,
  error: null,
  status: 'INIT',
};

export const RdvReducer = createReducer(
  initialState,
  on(fetchrdv, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(fetchrdvSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload,
    status: 'SUCCESS',
    error: null,
  })),

  on(addrdv, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(addrdvsuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload: { ...state.payload , data : [payload , ...state.payload.data] },
    status: 'SUCCESS',
    error: null,
  })),

  // on(addTask, (state) => ({
  //   ...state,
  //   loading: true,
  //   status: 'LOADING',
  //   error: null,
  // })),
  // on(addTasksuccess, (state, { payload }) => ({
  //   ...state,
  //   loading: false,
  //   payload: [payload, ...state.payload],
  //   status: 'SUCCESS',
  //   error: null,
  // })),

  on(updaterdv, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(updaterdvsuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload:  { ...state.payload , data : updateItemFromList(payload, state.payload.data) },
    status: 'SUCCESS',
    error: null,
  })),

  on(deleterdv, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(deleterdvsuccess, (state, { uuid }) => ({
    ...state,
    loading: false,
    payload: { ...state.payload , data : state.payload.data.filter((item) => item.uuid != uuid) },
    status: 'SUCCESS',
    error: null,
  })),

  on(rdvActionFailure, (state, { action, error }) => ({
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
