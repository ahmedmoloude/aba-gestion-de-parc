import { createReducer, on } from '@ngrx/store';
import {
    addVehicule,
    addVehiculesuccess,
    updateVehicule,
    updateVehiculesuccess,
    deleteVehicule,
    deleteVehiculesuccess,
    fetchVehicules,
    fetchVehiculesSuccess,
    VehiculeActionFailure,
  } from './vehicule.actions';

export interface VehiculeState {
  payload: any;
  loading: boolean;
  error: {
    action: string;
    error: any;
  } | null;
  status: 'INIT' | 'LOADING' | 'SUCCESS' | 'ERROR';
}

export const initialState: VehiculeState = {
  payload: [],
  loading: false,
  error: null,
  status: 'INIT',
};

export const VehiculeReducer = createReducer(
  initialState,
  on(fetchVehicules, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(fetchVehiculesSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload,
    status: 'SUCCESS',
    error: null,
  })),

  on(addVehicule, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(addVehiculesuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload: { ...state.payload , data : [payload , ...state.payload.data] },
    status: 'SUCCESS',
    error: null,
  })),

  on(updateVehicule, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(updateVehiculesuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload: { ...state.payload , data : updateItemFromList(payload, state.payload.data) },
    status: 'SUCCESS',
    error: null,
  })),

  on(deleteVehicule, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(deleteVehiculesuccess, (state, { uuid }) => ({
    ...state,
    loading: false,
    payload: { ...state.payload , data : state.payload.data.filter((item) => item.uuid != uuid) },
    status: 'SUCCESS',
    error: null,
  })),

  on(VehiculeActionFailure, (state, { action, error }) => ({
    ...state,
    loading: false,
    status: 'ERROR',
    error: { action, error },
  }))
  //
);

// #TODO move to helpers
const updateItemFromList = (updateItem: any, listItems: any[]) => {
  return listItems?.map((item) => {
    // console.log("uuid reducer", item.uuid)
    if (item.uuid == updateItem.uuid) {
      return updateItem;
    }
    return item;
  });
};
