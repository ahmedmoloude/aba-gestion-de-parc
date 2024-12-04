import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import { InterventionMaintenance } from 'app/core/models/maintenance/intervention-maintenance.model';
import * as MaintenanceInterventionsActions from'app/core/store/maintenance/maintenance-intervention/maintenance-intervention.actions';

export const maintenanceInterventionFeatureKey = 'maintenanceIntervention';

export enum MaintenanceStateEnum {
  INIT ='INIT',
  LOADING ='LOADING',
  SUCCESS ='SUCCESS',
  ERROR ='ERROR',
}

export interface MaintenanceInterventionState {
  maintenanceInterventions: InterventionMaintenance[];
  dataState: MaintenanceStateEnum;
  errorMessage: { action: string; error: any } | null;
}

export const initialState: MaintenanceInterventionState = {
  maintenanceInterventions: null,
  dataState: MaintenanceStateEnum.INIT,
  errorMessage: null,
};


export const MaintenanceInterventionReducer = createReducer(
  initialState,
  on(MaintenanceInterventionsActions.loadMaintenanceInterventions,(state, {data}) => ({...state, dataState: MaintenanceStateEnum.LOADING})),
  on(MaintenanceInterventionsActions.loadMaintenanceInterventionsSuccess,(state, {data}) => ({...state, dataState: MaintenanceStateEnum.SUCCESS, maintenanceInterventions: data})),
  on(MaintenanceInterventionsActions.loadMaintenanceInterventionsFailure,(state, {error}) => ({...state, dataState: MaintenanceStateEnum.ERROR, errorMessage: error})),
  on(MaintenanceInterventionsActions.closeIntervention,(state, {data}) => ({...state, dataState: MaintenanceStateEnum.LOADING})),
  on(MaintenanceInterventionsActions.closeInterventionSuccess,(state, {data}) => ({...state, dataState: MaintenanceStateEnum.SUCCESS, maintenanceInterventions: state.maintenanceInterventions?.map(item => item.id === data.id ? data : item)})),
  on(MaintenanceInterventionsActions.closeInterventionFailure,(state, {error}) => ({...state, dataState: MaintenanceStateEnum.ERROR, errorMessage: error})),
);

