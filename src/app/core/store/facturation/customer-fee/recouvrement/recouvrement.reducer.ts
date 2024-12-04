import { Action, createReducer, on } from '@ngrx/store';
import * as RecouvrementActions from 'app/core/store/facturation/customer-fee/recouvrement/recouvrement.actions';



export const recouvrementFeatureKey = 'recouvrement';

export enum RecouvrementStateEnum {
  INIT ='INIT',
  LOADING ='LOADING',
  SUCCESS ='SUCCESS',
  ERROR ='ERROR',
}
export interface RecouvrementState {
  recouvrements: any[],
  recouvrementsStatistics: any[],
  recouvrement: any,
  recouvrementsByRange: any,
  dataState: RecouvrementStateEnum,
  errorMessage: { action: string; error: any } | null,
}

export const initialState: RecouvrementState = {
  recouvrements: null,
  recouvrementsStatistics: null,
  recouvrement: null,
  recouvrementsByRange: null,
  dataState: RecouvrementStateEnum.INIT,
  errorMessage: null,
};


export const RecouvrementReducer = createReducer(
  initialState,
  on(RecouvrementActions.loadRecouvrements, state => ({...state, dataState: RecouvrementStateEnum.LOADING})),
  on(RecouvrementActions.loadRecouvrementsSuccess, (state, {data}) => ({...state, dataState: RecouvrementStateEnum.SUCCESS, recouvrements: data})),
  on(RecouvrementActions.loadRecouvrementsFailure, (state, {error}) => ({...state, dataState: RecouvrementStateEnum.ERROR, errorMessage: error})),
  on(RecouvrementActions.loadTotalRecouvrements, state => ({...state, dataState: RecouvrementStateEnum.LOADING})),
  on(RecouvrementActions.loadTotalRecouvrementsSuccess, (state, {data}) => ({...state, dataState: RecouvrementStateEnum.SUCCESS, recouvrementsStatistics: data})),
  on(RecouvrementActions.loadTotalRecouvrementsFailure, (state, {error}) => ({...state, dataState: RecouvrementStateEnum.ERROR, errorMessage: error})),
  on(RecouvrementActions.loadRecouvrement, state => ({...state, dataState: RecouvrementStateEnum.LOADING})),
  on(RecouvrementActions.loadRecouvrementSuccess, (state, {data}) => ({...state, dataState: RecouvrementStateEnum.SUCCESS, recouvrement: data})),
  on(RecouvrementActions.loadRecouvrementFailure, (state, {error}) => ({...state, dataState: RecouvrementStateEnum.ERROR, errorMessage: error})),
  on(RecouvrementActions.loadRecouvrementsByRange, state => ({...state, dataState: RecouvrementStateEnum.LOADING})),
  on(RecouvrementActions.loadRecouvrementsByRangeSuccess, (state, {data}) => ({...state, dataState: RecouvrementStateEnum.SUCCESS, recouvrementsByRange: data})),
  on(RecouvrementActions.loadRecouvrementsByRangeFailure, (state, {error}) => ({...state, dataState: RecouvrementStateEnum.ERROR, errorMessage: error})),
);

