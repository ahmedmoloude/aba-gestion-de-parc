import { Action, createReducer, on } from '@ngrx/store';
import * as ModeReglementActions from 'app/core/store/facturation/customer-fee/mode-reglement/mode-reglement.actions';

export const modeReglementFeatureKey = 'modeReglement';

export enum ModeReglementStateEnum {
  INIT ='INIT',
  LOADING ='LOADING',
  SUCCESS ='SUCCESS',
  ERROR ='ERROR',
}

export interface ModeReglementState {
  modeReglements: any[],
  modeReglement: any,
  dataState: ModeReglementStateEnum,
  errorMessage: { action: string; error: any } | null
}

export const initialState: ModeReglementState = {
  modeReglements: null,
  modeReglement: null,
  dataState: ModeReglementStateEnum.INIT,
  errorMessage: null,
};


export const modeReglementReducer = createReducer(
  initialState,
  on(ModeReglementActions.loadModeReglements, state => ({...state, dataState: ModeReglementStateEnum.LOADING})),
  on(ModeReglementActions.loadModeReglementsSuccess, (state, {data}) => ({...state, dataState: ModeReglementStateEnum.SUCCESS, modeReglements: data})),
  on(ModeReglementActions.loadModeReglementsFailure, (state, {error}) => ({...state, dataState: ModeReglementStateEnum.ERROR, errorMessage: error})),
);

