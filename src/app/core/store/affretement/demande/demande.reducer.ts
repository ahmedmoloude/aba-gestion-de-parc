import { Action, createReducer, on } from '@ngrx/store';
import * as DemandeActions from 'app/core/store/affretement/demande/demande.actions'


export const demandeFeatureKey = 'demande';
export enum DemandeStateEnum {
  INIT ='INIT',
  LOADING ='LOADING',
  SUCCESS ='SUCCESS',
  ERROR ='ERROR',
}

export interface DemandeState {
  demandes: any[],
  closedDemandes: any[],
  demande: any,
  document: any,
  dataState: DemandeStateEnum;
  errorMessage: { action: string; error: any } | null;
}

export const initialState: DemandeState = {
  demandes: null,
  closedDemandes: null,
  demande: null,
  document: null,
  dataState: DemandeStateEnum.INIT,
  errorMessage: null,
};


export const demandeReducer = createReducer(
  initialState,
  on(DemandeActions.loadDemandes, state => ({...state, dataState: DemandeStateEnum.LOADING})),
  on(DemandeActions.loadDemandesSuccess, (state, {data}) => ({...state, dataState: DemandeStateEnum.SUCCESS, demandes: data})),
  on(DemandeActions.loadDemandesFailure, (state, {error}) => ({...state, dataState: DemandeStateEnum.ERROR, errorMessage: error})),
  on(DemandeActions.loadClosedDemandes, state => ({...state, dataState: DemandeStateEnum.LOADING})),
  on(DemandeActions.loadClosedDemandesSuccess, (state, {data}) => ({...state, dataState: DemandeStateEnum.SUCCESS, closedDemandes: data})),
  on(DemandeActions.loadClosedDemandesFailure, (state, {error}) => ({...state, dataState: DemandeStateEnum.ERROR, errorMessage: error})),
  on(DemandeActions.updateDemandeDocumentStatus, state => ({...state, dataState: DemandeStateEnum.LOADING})),
  on(DemandeActions.updateDemandeDocumentStatusSuccess, (state, {data}) => ({...state, dataState: DemandeStateEnum.SUCCESS, document: data})),
  on(DemandeActions.updateDemandeDocumentStatusFailure, (state, {error}) => ({...state, dataState: DemandeStateEnum.ERROR, errorMessage: error})),
  on(DemandeActions.deliverDemandeDocuments, state => ({...state, dataState: DemandeStateEnum.LOADING})),
  on(DemandeActions.deliverDemandeDocumentsSuccess, (state, {data}) => ({...state, dataState: DemandeStateEnum.SUCCESS, document: data})),
  on(DemandeActions.deliverDemandeDocumentsFailure, (state, {error}) => ({...state, dataState: DemandeStateEnum.ERROR, errorMessage: error})),
);

