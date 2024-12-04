import { createReducer, on } from '@ngrx/store';
import * as FactureActions from './facture.actions';
import { Facture } from 'app/core/models/facturation/facture.model';
import { Prefacturation } from 'app/core/models/facturation/prefacturation.model';
import { History } from 'app/core/models/facturation/history.model';


export const factureFeatureKey = 'facture';

export enum FactureStateEnum {
  INIT ='Init',
  LOADING ='Loading',
  SUCCESS ='Success',
  ERROR ='Error',
}

export interface FactureState {
  factures: Facture[];
  history: History[];
  facture: Facture;
  file: any;
  fileState: FactureStateEnum;
  prefacturation: Prefacturation;
  dataState: FactureStateEnum;
  regenerateState: FactureStateEnum;
  errorMessage: { action: string; error: any } | null;
  recalculation: any;
}

export const initialState: FactureState = {
  factures : null,
  history: null,
  facture : null,
  file: null,
  fileState: FactureStateEnum.INIT,
  prefacturation: null,
  dataState: FactureStateEnum.INIT,
  regenerateState: FactureStateEnum.INIT,
  errorMessage: null,
  recalculation: null
};


export const factureReducer = createReducer(
  initialState,
  on(FactureActions.loadFactures, state => ({ ...state, dataState: FactureStateEnum.LOADING})),
  on(FactureActions.loadFacturesSuccess, (state, { data }) => ({ ...state, dataState: FactureStateEnum.SUCCESS, factures: data})),
  on(FactureActions.loadFacturesFailure, (state, { error }) => ({...state, dataState: FactureStateEnum.ERROR,  errorMessage: error})),
  on(FactureActions.loadFactureDetail, state => ({ ...state, dataState: FactureStateEnum.LOADING})),
  on(FactureActions.loadFactureDetailSuccess, (state, { data }) => ({ ...state, dataState: FactureStateEnum.SUCCESS, facture: data})),
  on(FactureActions.loadFactureDetailFailure, (state, { error }) => ({...state, dataState: FactureStateEnum.ERROR,  errorMessage: error})),
  on(FactureActions.prepareFacture, state => ({ ...state, dataState: FactureStateEnum.LOADING})),
  on(FactureActions.prepareFactureSuccess, (state, { data }) => ({ ...state, dataState: FactureStateEnum.SUCCESS, prefacturation: data})),
  on(FactureActions.prepareFactureFailure, (state, { error }) => ({...state, dataState: FactureStateEnum.ERROR,  errorMessage: error})),
  on(FactureActions.generateFactures, state => ({ ...state, dataState: FactureStateEnum.LOADING})),
  on(FactureActions.generateFacturesSuccess, (state) => ({ ...state, dataState: FactureStateEnum.SUCCESS})),
  on(FactureActions.generateFacturesFailure, (state, { error }) => ({...state, dataState: FactureStateEnum.ERROR,  errorMessage: error})),
  on(FactureActions.addAttachmentToFacture, state => ({ ...state, dataState: FactureStateEnum.LOADING})),
  on(FactureActions.addAttachmentToFactureSuccess, (state) => ({ ...state, dataState: FactureStateEnum.SUCCESS})),
  on(FactureActions.addAttachmentToFactureFailure, (state, { error }) => ({...state, dataState: FactureStateEnum.ERROR,  errorMessage: error})),
  on(FactureActions.recalculateFacture, state => ({ ...state, dataState: FactureStateEnum.LOADING})),
  on(FactureActions.recalculateFactureSuccess, (state, { data }) => ({ ...state, dataState: FactureStateEnum.SUCCESS, recalculation: data, factures: state.factures?.map(item => item.id === data.facture.id ? {...item, ...data.facture} : item)})),
  on(FactureActions.recalculateFactureFailure, (state, { error }) => ({...state, dataState: FactureStateEnum.ERROR,  errorMessage: error})),
  on(FactureActions.loadFacturesHistory, state => ({ ...state, dataState: FactureStateEnum.LOADING})),
  on(FactureActions.loadFacturesHistorySuccess, (state, { data }) => ({ ...state, dataState: FactureStateEnum.SUCCESS, history: data})),
  on(FactureActions.loadFacturesHistoryFailure, (state, { error }) => ({...state, dataState: FactureStateEnum.ERROR,  errorMessage: error})),
  on(FactureActions.cancelFacture, state => ({ ...state, dataState: FactureStateEnum.LOADING})),
  on(FactureActions.cancelFactureSuccess, (state, { data }) => ({ ...state, dataState: FactureStateEnum.SUCCESS, factures: state.factures?.map(item => item.id === data.id ? {...item, ...data} : item)})),
  on(FactureActions.cancelFactureFailure, (state, { error }) => ({...state, dataState: FactureStateEnum.ERROR,  errorMessage: error})),
  on(FactureActions.addMotifToFacture, state => ({ ...state, dataState: FactureStateEnum.LOADING})),
  on(FactureActions.addMotifToFactureSuccess, (state) => ({ ...state, dataState: FactureStateEnum.SUCCESS})),
  on(FactureActions.addMotifToFactureFailure, (state, { error }) => ({...state, dataState: FactureStateEnum.ERROR,  errorMessage: error})),
  on(FactureActions.loadPayedFactures, state => ({ ...state, dataState: FactureStateEnum.LOADING})),
  on(FactureActions.loadPayedFacturesSuccess, (state, { data }) => ({ ...state, dataState: FactureStateEnum.SUCCESS, factures: data})),
  on(FactureActions.loadPayedFacturesFailure, (state, { error }) => ({...state, dataState: FactureStateEnum.ERROR,  errorMessage: error})),
  on(FactureActions.loadCustomerPayedFactures, state => ({ ...state, dataState: FactureStateEnum.LOADING})),
  on(FactureActions.loadCustomerPayedFacturesSuccess, (state, { data }) => ({ ...state, dataState: FactureStateEnum.SUCCESS, factures: data})),
  on(FactureActions.loadCustomerPayedFacturesFailure, (state, { error }) => ({...state, dataState: FactureStateEnum.ERROR,  errorMessage: error})),
  on(FactureActions.exportFactures, state => ({...state, fileState: FactureStateEnum.LOADING})),
  on(FactureActions.exportFacturesSuccess, (state, {data}) => ({...state, fileState: FactureStateEnum.SUCCESS, file: data})),
  on(FactureActions.exportFacturesFailure, (state, {error}) => ({...state, fileState: FactureStateEnum.ERROR, errorMessage: error})),
  on(FactureActions.regenerateAffretementFacture, state => ({ ...state, regenerateState: FactureStateEnum.LOADING})),
  on(FactureActions.regenerateAffretementFactureSuccess, (state, { data }) => ({ ...state, regenerateState: FactureStateEnum.SUCCESS, factures: state.factures?.map(item => item.id === data.id ? {...item, ...data} : item)})),
  on(FactureActions.regenerateAffretementFactureFailure, (state, { error }) => ({...state, regenerateState: FactureStateEnum.ERROR,  errorMessage: error})),

  // on(FactureActions.updateFacture, (state, { data }) => ({...state, dataState: FactureStateEnum.SUCCESS,  factures: state.factures?.map(f => items)})),
);

