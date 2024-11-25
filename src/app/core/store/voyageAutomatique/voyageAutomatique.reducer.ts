import { createReducer, on } from '@ngrx/store';
import { VoyageAutomatique } from 'app/core/models/voyageAutomatique.model';
import {
    addVoyageAutomatique,
    addVoyageAutomatiqueuccess,
    updateVoyageAutomatique,
    updateVoyageAutomatiqueuccess,
    deleteVoyageAutomatique,
    deleteVoyageAutomatiqueuccess,
    fetchVoyageAutomatique,
    fetchVoyageAutomatiqueSuccess,
    VoyageAutomatiqueActionFailure,
  } from './voyageAutomatique.actions';

export interface VoyageAutomatiqueState {
  payload: VoyageAutomatique[];
  loading: boolean;
  error: {
    action: string;
    error: any;
  } | null;
  status: 'INIT' | 'LOADING' | 'SUCCESS' | 'ERROR';
}

export const initialState: VoyageAutomatiqueState = {
  payload: [],
  loading: false,
  error: null,
  status: 'INIT',
};

export const voyageAutomatiqueReducer = createReducer(
  initialState,
  on(fetchVoyageAutomatique, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(fetchVoyageAutomatiqueSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload,
    status: 'SUCCESS',
    error: null,
  })),

  on(addVoyageAutomatique, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(addVoyageAutomatiqueuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload: [payload, ...state.payload],
    status: 'SUCCESS',
    error: null,
  })),

  on(updateVoyageAutomatique, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(updateVoyageAutomatiqueuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload: updateItemFromList(payload, state.payload),
    status: 'SUCCESS',
    error: null,
  })),

  on(deleteVoyageAutomatique, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(deleteVoyageAutomatiqueuccess, (state, { uuid }) => ({
    ...state,
    loading: false,
    payload: state.payload.filter((item) => item.uuid != uuid),
    status: 'SUCCESS',
    error: null,
  })),

  on(VoyageAutomatiqueActionFailure, (state, { action, error }) => ({
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
