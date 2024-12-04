import { createReducer, on } from '@ngrx/store';
import {
  addVehiculeSinistres,
  addVehiculeSinistresuccess,
  updateVehiculeSinistres,
  updateVehiculeSinistresuccess,
  deleteVehiculeSinistres,
  deleteVehiculeSinistresuccess,
  fetchVehiculeSinistres,
  fetchVehiculeSinistresSuccess,
  VehiculeSinistresActionFailure,
} from './vehiculesinistre.actions';

export interface VehiculeSinistreState {
  payload: any[];
  loading: boolean;
  error: {
    action: string;
    error: any;
  } | null;
  status: 'INIT' | 'LOADING' | 'SUCCESS' | 'ERROR';
}

export const initialState: VehiculeSinistreState = {
  payload: [],
  loading: false,
  error: null,
  status: 'INIT',
};

export const VehiculeSinistreReducer = createReducer(
  initialState,
  on(fetchVehiculeSinistres, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(fetchVehiculeSinistresSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload,
    status: 'SUCCESS',
    error: null,
  })),

  on(addVehiculeSinistres, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(addVehiculeSinistresuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload: [payload, ...state.payload],
    status: 'SUCCESS',
    error: null,
  })),

  on(updateVehiculeSinistres, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(updateVehiculeSinistresuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload: updateItemFromList(payload, state.payload),
    status: 'SUCCESS',
    error: null,
  })),

  on(deleteVehiculeSinistres, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(deleteVehiculeSinistresuccess, (state, { uuid }) => ({
    ...state,
    loading: false,
    payload: state.payload.filter((item) => item.uuid != uuid),
    status: 'SUCCESS',
    error: null,
  })),

  on(VehiculeSinistresActionFailure, (state, { action, error }) => ({
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
