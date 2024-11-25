import { createAction, props } from '@ngrx/store';
import { InterventionMaintenance } from 'app/core/models/maintenance/intervention-maintenance.model';

export enum MaintenanceInterventionsActionsType {
  /* Load MaintenanceInterventions */
  LOAD_MAINTENANCE_INTERVENTIONS = '[Demande] Load MaintenanceInterventions',
  LOAD_MAINTENANCE_INTERVENTIONS_SUCCESS = '[Demande] Load MaintenanceInterventions Success',
  LOAD_MAINTENANCE_INTERVENTIONS_FAILURE = '[Demande] Load MaintenanceInterventions Failure',

  /* Close Intervention */
  CLOSE_INTERVENTION = '[Intervention] Close Intervention',
  CLOSE_INTERVENTION_SUCCESS = '[Intervention] Close Intervention Success',
  CLOSE_INTERVENTION_FAILURE = '[Intervention] Close Intervention Failure',
}


export const loadMaintenanceInterventions = createAction(
  MaintenanceInterventionsActionsType.LOAD_MAINTENANCE_INTERVENTIONS,
  props<{ data: any, per_page :number, page : number  }>()
);

export const loadMaintenanceInterventionsSuccess = createAction(
  MaintenanceInterventionsActionsType.LOAD_MAINTENANCE_INTERVENTIONS_SUCCESS,
  props<{ data: InterventionMaintenance[] }>()
);

export const loadMaintenanceInterventionsFailure = createAction(
  MaintenanceInterventionsActionsType.LOAD_MAINTENANCE_INTERVENTIONS_FAILURE,
  props<{action: string, error: any} >()
);

/* Close Intervention Actions*/
export const closeIntervention = createAction(
  MaintenanceInterventionsActionsType.CLOSE_INTERVENTION,
  props<{ data: string }>()
);

export const closeInterventionSuccess = createAction(
  MaintenanceInterventionsActionsType.CLOSE_INTERVENTION_SUCCESS,
  props<{ data: InterventionMaintenance }>()
);

export const closeInterventionFailure = createAction(
  MaintenanceInterventionsActionsType.CLOSE_INTERVENTION_FAILURE,
  props<{action: string, error: any} >()
);
