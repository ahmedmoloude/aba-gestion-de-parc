import { createReducer, on } from '@ngrx/store';
import {
  addVehiculeContrat,
  addVehiculeContratsuccess,
  updateVehiculeContrat,
  updateVehiculeContratsuccess,
  deleteVehiculeContrat,
  deleteVehiculeContratsuccess,
  fetchVehiculeContrats,
  fetchVehiculeContratsSuccess,
  VehiculeContratActionFailure,
} from './vehiculecontrat.actions';

export interface VehiculeContratState {
  payload: any[];
  loading: boolean;
  error: {
    action: string;
    error: any;
  } | null;
  status: 'INIT' | 'LOADING' | 'SUCCESS' | 'ERROR';
}

export const initialState: VehiculeContratState = {
  payload: [],
  loading: false,
  error: null,
  status: 'INIT',
};

export const VehiculeContratReducer = createReducer(
  initialState,
  on(fetchVehiculeContrats, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(fetchVehiculeContratsSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload,
    status: 'SUCCESS',
    error: null,
  })),

  on(addVehiculeContrat, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(addVehiculeContratsuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload: [payload, ...state.payload],
    status: 'SUCCESS',
    error: null,
  })),

  on(updateVehiculeContrat, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(updateVehiculeContratsuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload: updateItemFromList(payload, state.payload),
    status: 'SUCCESS',
    error: null,
  })),

  on(deleteVehiculeContrat, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(deleteVehiculeContratsuccess, (state, { uuid }) => ({
    ...state,
    loading: false,
    payload: state.payload.filter((item) => item.uuid != uuid),
    status: 'SUCCESS',
    error: null,
  })),

  on(VehiculeContratActionFailure, (state, { action, error }) => ({
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
