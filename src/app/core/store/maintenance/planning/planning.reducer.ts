import { Action, createReducer, on } from '@ngrx/store';
import { MaintenanceStateEnum } from '../maintenance-intervention/maintenance-intervention.reducer';
import * as PlanningActions from'app/core/store/maintenance/planning/planning.actions';


export const planningFeatureKey = 'planning';

export interface PlanningState {
  plannings: any[];
  planning: any;
  dataState: MaintenanceStateEnum;
  planningState: MaintenanceStateEnum;
  deletePlanningState: MaintenanceStateEnum;
  errorMessage: { action: string; error: any } | null;
}

export const initialState: PlanningState = {
  plannings: null,
  planning: null,
  dataState: MaintenanceStateEnum.INIT,
  planningState: MaintenanceStateEnum.INIT,
  deletePlanningState: MaintenanceStateEnum.INIT,
  errorMessage: null,
};


export const PlanningReducer = createReducer(
  initialState,
  on(PlanningActions.loadPlannings,(state, ) => ({...state, dataState: MaintenanceStateEnum.LOADING})),
  on(PlanningActions.loadPlanningsSuccess,(state, {data}) => ({...state, dataState: MaintenanceStateEnum.SUCCESS, plannings:data})),
  on(PlanningActions.loadPlanningsFailure,(state, {error}) => ({...state, dataState: MaintenanceStateEnum.ERROR, errorMessage: error})),
  on(PlanningActions.addPlanning,(state, ) => ({...state, planningState: MaintenanceStateEnum.LOADING})),
  on(PlanningActions.addPlanningSuccess,(state, {data}) => ({...state, planningState: MaintenanceStateEnum.SUCCESS, planning:data, plannings:[data, ...state.plannings] })),
  on(PlanningActions.addPlanningFailure,(state, {error}) => ({...state, planningState: MaintenanceStateEnum.ERROR, errorMessage: error})),
  on(PlanningActions.accomplishPlanning,(state, ) => ({...state, planningState: MaintenanceStateEnum.LOADING})),
  on(PlanningActions.accomplishPlanningSuccess,(state, {data}) => ({...state, planningState: MaintenanceStateEnum.SUCCESS, planning:data, plannings: state.plannings?.map(item => item.id === data.id ? data : item) })),
  on(PlanningActions.accomplishPlanningFailure,(state, {error}) => ({...state, planningState: MaintenanceStateEnum.ERROR, errorMessage: error})),
  on(PlanningActions.updatePlanning,(state, ) => ({...state, planningState: MaintenanceStateEnum.LOADING})),
  on(PlanningActions.updatePlanningSuccess,(state, {data}) => ({...state, planningState: MaintenanceStateEnum.SUCCESS, planning:data, plannings: state.plannings?.map(item => item.id === data.id ? data : item)})),
  on(PlanningActions.updatePlanningFailure,(state, {error}) => ({...state, planningState: MaintenanceStateEnum.ERROR, errorMessage: error})),
  on(PlanningActions.deletePlanning,(state, ) => ({...state, deletePlanningState: MaintenanceStateEnum.LOADING})),
  on(PlanningActions.deletePlanningSuccess,(state, {data}) => ({...state, deletePlanningState: MaintenanceStateEnum.SUCCESS, plannings:state.plannings?.filter(element => element.id != data)})),
  on(PlanningActions.deletePlanningFailure,(state, {error}) => ({...state, deletePlanningState: MaintenanceStateEnum.ERROR, errorMessage: error})),

);



