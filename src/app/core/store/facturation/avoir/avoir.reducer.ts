import { Action, createReducer, on } from '@ngrx/store';
import { Avoir } from 'app/core/models/facturation/avoir.model';
import * as AvoirActions from 'app/core/store/facturation/avoir/avoir.actions';


export const avoirFeatureKey = 'avoir';

export enum AvoirStateEnum {
  INIT ='INIT',
  LOADING ='LOADING',
  SUCCESS ='SUCCESS',
  ERROR ='ERROR',
}

export interface AvoirState {
  avoirs: Avoir[];
  avoir: Avoir;
  montantAvoir: any;
  rapportAvoir: any;
  file: any;
  dataState: AvoirStateEnum;
  pdfFile: any;
  pdfFileState: AvoirStateEnum;
  errorMessage: { action: string; error: any } | null;
}

export const initialState: AvoirState = {
  avoirs: null,
  avoir: null,
  montantAvoir: null,
  rapportAvoir: null,
  file: null,
  dataState: AvoirStateEnum.INIT,
  pdfFile: null,
  pdfFileState: AvoirStateEnum.INIT,
  errorMessage: null,
};


export const avoirReducer = createReducer(
  initialState,
  on(AvoirActions.loadAvoirs, state => ({...state, dataState: AvoirStateEnum.LOADING, pdfFileState: AvoirStateEnum.INIT})),
  on(AvoirActions.loadAvoirsSuccess, (state, {data}) => ({...state, dataState: AvoirStateEnum.SUCCESS, avoirs: data})),
  on(AvoirActions.loadAvoirsFailure, (state, {error}) => ({...state, dataState: AvoirStateEnum.ERROR, errorMessage: error})),
  on(AvoirActions.loadAvoir, state => ({...state, dataState: AvoirStateEnum.LOADING, pdfFileState: AvoirStateEnum.INIT})),
  on(AvoirActions.loadAvoirSuccess, (state, {data}) => ({...state, dataState: AvoirStateEnum.SUCCESS, avoir: data})),
  on(AvoirActions.loadAvoirFailure, (state, {error}) => ({...state, dataState: AvoirStateEnum.ERROR, errorMessage: error})),
  on(AvoirActions.createAvoir, state => ({...state, dataState: AvoirStateEnum.LOADING, pdfFileState: AvoirStateEnum.INIT})),
  on(AvoirActions.createAvoirSuccess, (state, { data }) => ({...state, dataState: AvoirStateEnum.SUCCESS, avoir: data, avoirs: [data, ...state.avoirs],})),
  on(AvoirActions.createAvoirFailure, (state, {error}) => ({...state, dataState: AvoirStateEnum.ERROR, errorMessage: error})),
  on(AvoirActions.updateAvoir, state => ({...state, dataState: AvoirStateEnum.LOADING, pdfFileState: AvoirStateEnum.INIT})),
  on(AvoirActions.updateAvoirSuccess, (state, {data}) => ({...state, dataState: AvoirStateEnum.SUCCESS, avoir: data})),
  on(AvoirActions.updateAvoirFailure, (state, {error}) => ({...state, dataState: AvoirStateEnum.ERROR, errorMessage: error})),
  on(AvoirActions.deleteAvoir, state => ({...state, dataState: AvoirStateEnum.LOADING, pdfFileState: AvoirStateEnum.INIT})),
  on(AvoirActions.deleteAvoirSuccess, (state, {data}) => ({...state, dataState: AvoirStateEnum.SUCCESS, avoir: data})),
  on(AvoirActions.deleteAvoirFailure, (state, {error}) => ({...state, dataState: AvoirStateEnum.ERROR, errorMessage: error})),
  on(AvoirActions.loadFactureAvoir, state => ({...state, dataState: AvoirStateEnum.LOADING, pdfFileState: AvoirStateEnum.INIT})),
  on(AvoirActions.loadFactureAvoirSuccess, (state, {data}) => ({...state, dataState: AvoirStateEnum.SUCCESS, avoir: data})),
  on(AvoirActions.loadFactureAvoirFailure, (state, {error}) => ({...state, dataState: AvoirStateEnum.ERROR, errorMessage: error})),
  on(AvoirActions.loadConventionClient, state => ({...state, dataState: AvoirStateEnum.LOADING, pdfFileState: AvoirStateEnum.INIT})),
  on(AvoirActions.loadConventionClientSuccess, (state, {data}) => ({...state, dataState: AvoirStateEnum.SUCCESS, montantAvoir: data})),
  on(AvoirActions.loadConventionClientFailure, (state, {error}) => ({...state, dataState: AvoirStateEnum.ERROR, errorMessage: error})),
  on(AvoirActions.exportAvoirs, state => ({...state, dataState: AvoirStateEnum.LOADING, pdfFileState: AvoirStateEnum.INIT})),
  on(AvoirActions.exportAvoirsSuccess, (state, {data}) => ({...state, dataState: AvoirStateEnum.SUCCESS, file: data})),
  on(AvoirActions.exportAvoirsFailure, (state, {error}) => ({...state, dataState: AvoirStateEnum.ERROR, errorMessage: error})),
  on(AvoirActions.exportPdfAvoir, state => ({...state, pdfFileState: AvoirStateEnum.LOADING})),
  on(AvoirActions.exportPdfAvoirSuccess, (state, {data}) => ({...state, pdfFileState: AvoirStateEnum.SUCCESS, pdfFile: data})),
  on(AvoirActions.exportPdfAvoirFailure, (state, {error}) => ({...state, pdfFileState: AvoirStateEnum.ERROR, errorMessage: error})),
  on(AvoirActions.loadRapportAvoir, state => ({...state, dataState: AvoirStateEnum.LOADING, pdfFileState: AvoirStateEnum.INIT})),
  on(AvoirActions.loadRapportAvoirSuccess, (state, {data}) => ({...state, dataState: AvoirStateEnum.SUCCESS, rapportAvoir: data})),
  on(AvoirActions.loadRapportAvoirFailure, (state, {error}) => ({...state, dataState: AvoirStateEnum.ERROR, errorMessage: error})),
);

