import { createReducer, on } from '@ngrx/store';
import {
  fetchPersonnels,
  fetchPersonnelsSuccess,
  deletePersonnel,
  addPersonnel,
  addPersonnelsuccess,
  updatePersonnel,
  updatePersonneluccess,
  deletePersonnelsuccess,
  PersonnelActionFailure,

} from './personnel.actions';

export interface PersonnelState {
  payload: any;
  loading: boolean;
  error: {
    action: string;
    error: any;
  } | null;
  status: 'INIT' | 'LOADING' | 'SUCCESS' | 'ERROR';
}

export const initialState: PersonnelState = {
  payload: [],
  loading: false,
  error: null,
  status: 'INIT',
};

export const PersonelReducer = createReducer(
  initialState,
  on(fetchPersonnels, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(fetchPersonnelsSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload,
    status: 'SUCCESS',
    error: null,
  })),

  on(addPersonnel, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(addPersonnelsuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload: [payload, ...state.payload],
    status: 'SUCCESS',
    error: null,
  })),

  on(updatePersonnel, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(updatePersonneluccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload: updateItemFromList(payload, state.payload),
    status: 'SUCCESS',
    error: null,
  })),

  on(deletePersonnel, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(deletePersonnelsuccess, (state, { uuid }) => ({
    ...state,
    loading: false,
    payload: state.payload.filter((item) => item.uuid != uuid),
    status: 'SUCCESS',
    error: null,
  })),

  on(PersonnelActionFailure, (state, { action, error }) => ({
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
