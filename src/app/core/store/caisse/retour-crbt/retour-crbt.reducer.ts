import { Action, createReducer, on } from '@ngrx/store';
import { StateEnum } from '../carte/carte.reducer';
import * as RetourCrbtsActions from 'app/core/store/caisse/retour-crbt/retour-crbt.actions';



export const retourCrbtFeatureKey = 'retourCrbt';

export interface retourCrbtState {
  retourCrbts:any[];
  retourCrbt:any;
  dataState: StateEnum;
  errorMessage: { action: string; error: any } | null;
}

export const initialState: retourCrbtState = {
  retourCrbts: null,
  retourCrbt: null,
  dataState: StateEnum.INIT,
  errorMessage: null,

};


export const retourCrbtReducer = createReducer(
  initialState,
  on(RetourCrbtsActions.loadRetourCrbts, state => ({...state, dataState: StateEnum.LOADING})),
  on(RetourCrbtsActions.loadRetourCrbtsSuccess, (state, {data}) => ({...state, dataState: StateEnum.SUCCESS, retourCrbts: data})),
  on(RetourCrbtsActions.loadRetourCrbtsFailure, (state, {error}) => ({...state, dataState: StateEnum.ERROR, errorMessage: error})),
  on(RetourCrbtsActions.validateRetourCrbt, state => ({...state, dataState: StateEnum.LOADING})),
  on(RetourCrbtsActions.validateRetourCrbtSuccess, (state, {data}) => ({...state, dataState: StateEnum.SUCCESS, retourCrbt: data,retourCrbts:state.retourCrbts.map(item=> item.id_crb === data.id_crb ? data : item) })),
  on(RetourCrbtsActions.validateRetourCrbtFailure, (state, {error}) => ({...state, dataState: StateEnum.ERROR, errorMessage: error})),

);

