import { Action, createReducer, on } from '@ngrx/store';
import { MaintenanceStateEnum } from '../maintenance-intervention/maintenance-intervention.reducer';
import * as PneumatiqueActions from'app/core/store/maintenance/pneumatique/pneumatique.actions';
import { Affectation, Pneu } from 'app/core/models/maintenance/pneu.model';


export const pneumatiqueFeatureKey = 'pneumatique';

export interface PneumatiqueState {
  pneus: Pneu[];
  pneu: Pneu;
  affectation: Affectation;
  dataState: MaintenanceStateEnum;
  pneuState: MaintenanceStateEnum;
  getPneuState: MaintenanceStateEnum;
  errorMessage: { action: string; error: any } | null;
}

export const initialState: PneumatiqueState = {
  pneus: null,
  pneu: null,
  affectation: null,
  dataState: MaintenanceStateEnum.INIT,
  pneuState: MaintenanceStateEnum.INIT,
  getPneuState: MaintenanceStateEnum.INIT,
  errorMessage: null,
};


export const PneumatiqueReducer = createReducer(
  initialState,
  on(PneumatiqueActions.loadPneus,(state, ) => ({...state, dataState: MaintenanceStateEnum.LOADING})),
  on(PneumatiqueActions.loadPneusSuccess,(state, {data}) => ({...state, dataState: MaintenanceStateEnum.SUCCESS, pneus: data})),
  on(PneumatiqueActions.loadPneusFailure,(state, {error}) => ({...state, dataState: MaintenanceStateEnum.ERROR, errorMessage: error})),
  on(PneumatiqueActions.createPneu,(state, ) => ({...state, pneuState: MaintenanceStateEnum.LOADING})),
  on(PneumatiqueActions.createPneuSuccess,(state, {data}) => ({...state, pneuState: MaintenanceStateEnum.SUCCESS, pneu: data, pneus: [data, ...state.pneus]})),
  on(PneumatiqueActions.createPneuFailure,(state, {error}) => ({...state, pneuState: MaintenanceStateEnum.ERROR, errorMessage: error})),
  on(PneumatiqueActions.affectPneu,(state, ) => ({...state, dataState: MaintenanceStateEnum.LOADING})),
  on(PneumatiqueActions.affectPneuSuccess,(state, {data}) => ({...state, dataState: MaintenanceStateEnum.SUCCESS, affectation: data, pneus: state.pneus?.map(item => item.id === data.pneu.id ? {...item, ...data.pneu} : item)})),
  on(PneumatiqueActions.affectPneuFailure,(state, {error}) => ({...state, dataState: MaintenanceStateEnum.ERROR, errorMessage: error})),
  on(PneumatiqueActions.desaffectPneu,(state, ) => ({...state, dataState: MaintenanceStateEnum.LOADING})),
  on(PneumatiqueActions.desaffectPneuSuccess,(state, {data}) => ({...state, dataState: MaintenanceStateEnum.SUCCESS, affectation: data, pneus: state.pneus?.map(item => item.id === data.pneu.id ? {...item, ...data.pneu} : item)})),
  on(PneumatiqueActions.desaffectPneuFailure,(state, {error}) => ({...state, dataState: MaintenanceStateEnum.ERROR, errorMessage: error})),
  on(PneumatiqueActions.getPneu,(state, ) => ({...state, getPneuState: MaintenanceStateEnum.LOADING})),
  on(PneumatiqueActions.getPneuSuccess,(state, {data}) => ({...state, getPneuState: MaintenanceStateEnum.SUCCESS, pneu: data})),
  on(PneumatiqueActions.getPneuFailure,(state, {error}) => ({...state, getPneuState: MaintenanceStateEnum.ERROR, errorMessage: error})),
  on(PneumatiqueActions.updatePneu,(state, ) => ({...state, pneuState: MaintenanceStateEnum.LOADING})),
  on(PneumatiqueActions.updatePneuSuccess,(state, {data}) => ({...state, pneuState: MaintenanceStateEnum.SUCCESS, pneu: data, pneus: state.pneus?.map(item => item.id === data.id ? data : item)})),
  on(PneumatiqueActions.updatePneuFailure,(state, {error}) => ({...state, pneuState: MaintenanceStateEnum.ERROR, errorMessage: error})),
  on(PneumatiqueActions.deletePneu,(state, ) => ({...state, dataState: MaintenanceStateEnum.LOADING})),
  on(PneumatiqueActions.deletePneuSuccess,(state, {data}) => ({...state, dataState: MaintenanceStateEnum.SUCCESS, pneus: state.pneus?.filter(element => element.id != data)})),
  on(PneumatiqueActions.deletePneuFailure,(state, {error}) => ({...state, dataState: MaintenanceStateEnum.ERROR, errorMessage: error})),
);



