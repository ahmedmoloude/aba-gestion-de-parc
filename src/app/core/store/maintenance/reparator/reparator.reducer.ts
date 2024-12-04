import { Action, createReducer, on } from '@ngrx/store';
import { MaintenanceStateEnum } from '../maintenance-intervention/maintenance-intervention.reducer';
import * as ReparatorsActions from'app/core/store/maintenance/reparator/reparator.actions';


export const reparatorFeatureKey = 'reparator';

export interface ReparatorState {
  reparators: any[];
  dataState: MaintenanceStateEnum;
  errorMessage: { action: string; error: any } | null;
}

export const initialState: ReparatorState = {
  reparators: null,
  dataState: MaintenanceStateEnum.INIT,
  errorMessage: null,
};


export const ReparatorReducer = createReducer(
  initialState,
  on(ReparatorsActions.loadReparators,(state, ) => ({...state, dataState: MaintenanceStateEnum.LOADING})),
  on(ReparatorsActions.loadReparatorsSuccess,(state, {data}) => ({...state, dataState: MaintenanceStateEnum.SUCCESS, reparators: data})),
  on(ReparatorsActions.loadReparatorsFailure,(state, {error}) => ({...state, dataState: MaintenanceStateEnum.ERROR, errorMessage: error})),

);



