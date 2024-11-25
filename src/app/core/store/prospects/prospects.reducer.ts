import { createReducer, on } from '@ngrx/store';
import {
  addProspect,
  addProspectSuccess,
  fetchProspects,
  fetchProspectSuccess,
  prospectActionFailure,
} from './prospects.actions';

export interface ProspectState {
  payload: any[];
  loading: boolean;
  error: {
    action: string;
    error: any;
  } | null;
  status: 'INIT' | 'LOADING' | 'SUCCESS' | 'ERROR';
}

export const initialState: ProspectState = {
  payload: [],
  loading: false,
  error: null,
  status: 'INIT',
};

export const prospectReducer = createReducer(
  initialState,


  on(addProspect, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(addProspectSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    // payload: [payload, ...state.payload],
    status: 'SUCCESS',
    error: null,
  })),

  on(prospectActionFailure, (state, { action, error }) => ({
    ...state,
    loading: false,
    status: 'ERROR',
    error: { action, error },
  })),

  on(fetchProspectSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload: payload,
    status: 'SUCCESS',
    error: null,
  })),

  on(fetchProspects, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  
  
);
