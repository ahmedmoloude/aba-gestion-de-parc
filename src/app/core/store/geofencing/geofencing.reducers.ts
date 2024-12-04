import { createReducer, on } from '@ngrx/store';
import {
    PolygonFailure,
    addPolygon,
    addPolygonSuccess
  } from './geofencing.actions';

export interface GeofencingState {
  payload: any;
  loading: boolean;
  error: {
    action: string;
    error: any;
  } | null;
}

export const initialState: GeofencingState = {
  payload: [],
  loading: false,
  error: null,
};

export const geofencingReducer = createReducer(
  initialState,
//   on(fetchextincteurs, (state) => ({
//     ...state,
//     loading: true,
//     status: 'LOADING',
//     error: null,
//   })),
//   on(fetchextincteursSuccess, (state, { payload }) => ({
//     ...state,
//     loading: false,
//     payload,
//     status: 'SUCCESS',
//     error: null,
//   })),

  on(addPolygon, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(addPolygonSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload: { ...state.payload , data : [payload , ...state.payload.data] },
    status: 'SUCCESS',
    error: null,
  })),

//   on(updateextincteur, (state) => ({
//     ...state,
//     loading: true,
//     status: 'LOADING',
//     error: null,
//   })),
//   on(updateextincteursuccess, (state, { payload }) => ({
//     ...state,
//     loading: false,
//     payload: updateItemFromList(payload, state.payload),
//     status: 'SUCCESS',
//     error: null,
//   })),

//   on(deleteextincteur, (state) => ({
//     ...state,
//     loading: true,
//     status: 'LOADING',
//     error: null,
//   })),
//   on(deleteextincteursuccess, (state, { uuid }) => ({
//     ...state,
//     loading: false,
//     payload: state.payload.filter((item) => item.uuid != uuid),
//     status: 'SUCCESS',
//     error: null,
//   })),

//   on(extincteurActionFailure, (state, { action, error }) => ({
//     ...state,
//     loading: false,
//     status: 'ERROR',
//     error: { action, error },
//   }))
//   //
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
