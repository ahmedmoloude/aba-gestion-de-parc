import { createReducer, on } from '@ngrx/store';
import {
  addVehiculeDocuments,
  addVehiculeDocumentsuccess,
  updateVehiculeDocuments,
  updateVehiculeDocumentsuccess,
  deleteVehiculeDocuments,
  deleteVehiculeDocumentsuccess,
  fetchVehiculeDocuments,
  fetchVehiculeDocumentsSuccess,
  VehiculeDocumentsActionFailure,
} from './vehiculedocument.actions';

export interface VehiculeDocumentState {
  payload: any[];
  loading: boolean;
  error: {
    action: string;
    error: any;
  } | null;
  status: 'INIT' | 'LOADING' | 'SUCCESS' | 'ERROR';
}

export const initialState: VehiculeDocumentState = {
  payload: [],
  loading: false,
  error: null,
  status: 'INIT',
};

export const VehiculeDocumentReducer = createReducer(
  initialState,
  on(fetchVehiculeDocuments, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(fetchVehiculeDocumentsSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload,
    status: 'SUCCESS',
    error: null,
  })),

  on(addVehiculeDocuments, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(addVehiculeDocumentsuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload: [payload, ...state.payload],
    status: 'SUCCESS',
    error: null,
  })),

  on(updateVehiculeDocuments, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(updateVehiculeDocumentsuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload: updateItemFromList(payload, state.payload),
    status: 'SUCCESS',
    error: null,
  })),

  on(deleteVehiculeDocuments, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(deleteVehiculeDocumentsuccess, (state, { uuid }) => ({
    ...state,
    loading: false,
    payload: state.payload.filter((item) => item.uuid != uuid),
    status: 'SUCCESS',
    error: null,
  })),

  on(VehiculeDocumentsActionFailure, (state, { action, error }) => ({
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
