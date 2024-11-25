import { Action, createReducer, on } from '@ngrx/store';
import { MaintenanceStateEnum } from '../maintenance-intervention/maintenance-intervention.reducer';
import { InterventionMaintenance } from 'app/core/models/maintenance/intervention-maintenance.model';
import * as DiagnostiquesActions from'app/core/store/maintenance/diagnostique/diagnostique.actions';
import { Diagnostique } from 'app/core/models/maintenance/diagnostique.model';


export const diagnostiqueFeatureKey = 'diagnostique';

export interface DiagnostiqueState {
  maintenanceIntervention: InterventionMaintenance;
  diagnostique: Diagnostique;
  intervention: any;
  addPieceToIntervention: any;
  dataState: MaintenanceStateEnum;
  diagnostiqueState: MaintenanceStateEnum;
  interventionState: MaintenanceStateEnum;
  addPieceState: MaintenanceStateEnum;
  errorMessage: { action: string; error: any } | null;
}

export const initialState: DiagnostiqueState = {
  maintenanceIntervention: null,
  diagnostique: null,
  intervention: null,
  addPieceToIntervention: null,
  dataState: MaintenanceStateEnum.INIT,
  diagnostiqueState: MaintenanceStateEnum.INIT,
  interventionState: MaintenanceStateEnum.INIT,
  addPieceState: MaintenanceStateEnum.INIT,
  errorMessage: null,
};


export const DiagnostiqueReducer = createReducer(
  initialState,
  on(DiagnostiquesActions.loadDiagnostique,(state, {data}) => ({...state, dataState: MaintenanceStateEnum.LOADING})),
  on(DiagnostiquesActions.loadDiagnostiqueSuccess,(state, {data}) => ({...state, dataState: MaintenanceStateEnum.SUCCESS, maintenanceIntervention: data})),
  on(DiagnostiquesActions.loadDiagnostiqueFailure,(state, {error}) => ({...state, dataState: MaintenanceStateEnum.ERROR, errorMessage: error})),
  on(DiagnostiquesActions.createDiagnostique,(state, {data}) => ({...state, diagnostiqueState: MaintenanceStateEnum.LOADING})),
  on(DiagnostiquesActions.createDiagnostiqueSuccess,(state, {data}) => ({...state, diagnostiqueState: MaintenanceStateEnum.SUCCESS, diagnostique: data})),
  on(DiagnostiquesActions.createDiagnostiqueFailure,(state, {error}) => ({...state, diagnostiqueState: MaintenanceStateEnum.ERROR, errorMessage: error})),
  on(DiagnostiquesActions.createIntervention,(state, {data}) => ({...state, interventionState: MaintenanceStateEnum.LOADING})),
  on(DiagnostiquesActions.createInterventionSuccess,(state, {data}) => ({...state, interventionState: MaintenanceStateEnum.SUCCESS, intervention: data})),
  on(DiagnostiquesActions.createInterventionFailure,(state, {error}) => ({...state, interventionState: MaintenanceStateEnum.ERROR, errorMessage: error})),
  on(DiagnostiquesActions.addPieceToIntervention,(state) => ({...state, addPieceState: MaintenanceStateEnum.LOADING})),
  on(DiagnostiquesActions.addPieceToInterventionSuccess,(state) => ({...state, addPieceState: MaintenanceStateEnum.SUCCESS})),
  on(DiagnostiquesActions.addPieceToInterventionFailure,(state, {error}) => ({...state, addPieceState: MaintenanceStateEnum.ERROR, errorMessage: error})),
);

