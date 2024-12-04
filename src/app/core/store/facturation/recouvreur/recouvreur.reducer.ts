import { Action, createReducer, on } from '@ngrx/store';
import * as RecouvreurActions from './recouvreur.actions';
import { Recouvreur } from 'app/core/models/facturation/recouvreur.model';

export const recouvreurFeatureKey = 'recouvreur';

export enum RecouvreurStateEnum {
  INIT ='Init',
  LOADING ='Loading',
  SUCCESS ='Success',
  ERROR ='Error',
}


export interface RecouvreurState {
  recouvreurs: Recouvreur[];
  dataState: RecouvreurStateEnum;
  errorMessage: { action: string; error: any } | null;
}

export const initialState: RecouvreurState = {
  recouvreurs:null,
  dataState: null,
  errorMessage:  null,
};


export const recouvreurReducer = createReducer(
  initialState,
  on(RecouvreurActions.loadRecouvreurs, state => ({ ...state, dataState: RecouvreurStateEnum.LOADING})),
  on(RecouvreurActions.loadRecouvreursSuccess, (state, { data }) => ({ ...state, dataState: RecouvreurStateEnum.SUCCESS, recouvreurs: data})),
  on(RecouvreurActions.loadRecouvreursFailure, (state, { error }) => ({...state, dataState: RecouvreurStateEnum.ERROR,  errorMessage: error})),
);

