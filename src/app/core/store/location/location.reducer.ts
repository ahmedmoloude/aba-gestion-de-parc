import { createReducer, on } from '@ngrx/store';
import { City } from 'app/core/models/location.model';
import {
  locationActionFailure,
  fetchCities,
  fetchCitiesSuccess,
  fetchZones,
  fetchZonesSuccess,
} from './location.actions';

export interface LocationState {
  cities: City[];
  zones: City[];
  loading: boolean;
  error: {
    action: string;
    error: any;
  } | null;
  status: 'INIT' | 'LOADING' | 'SUCCESS' | 'ERROR';
}

export const initialState: LocationState = {
  cities: [],
  zones: [],
  loading: false,
  error: null,
  status: 'INIT',
};

export const locationReducer = createReducer(
  initialState,
  on(fetchCities, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(fetchCitiesSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    cities: payload,
    status: 'SUCCESS',
    error: null,
  })),
  on(fetchZones, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(fetchZonesSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    zones: payload,
    status: 'SUCCESS',
    error: null,
  })),

  on(locationActionFailure, (state, { action, error }) => ({
    ...state,
    loading: false,
    status: 'ERROR',
    error: { action, error },
  }))
  //
);
