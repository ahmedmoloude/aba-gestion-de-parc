import { createAction, props } from '@ngrx/store';
import { DiagnostiqueRequest } from 'app/core/models/maintenance/diagnostique-request.model';
import { Diagnostique } from 'app/core/models/maintenance/diagnostique.model';
import { InterventionMaintenance } from 'app/core/models/maintenance/intervention-maintenance.model';

export enum DiagnostiqueActionsType {
  /* Load Diagnostique */
  LOAD_DIAGNOSTIQUE = '[Diagnostique] Load Diagnostique',
  LOAD_DIAGNOSTIQUE_SUCCESS = '[Diagnostique] Load Diagnostique Success',
  LOAD_DIAGNOSTIQUE_FAILURE = '[Diagnostique] Load Diagnostique Failure',

  /* Create Diagnostique */
  CREATE_DIAGNOSTIQUE = '[Diagnostique] Create Diagnostique',
  CREATE_DIAGNOSTIQUE_SUCCESS = '[Diagnostique] Create Diagnostique Success',
  CREATE_DIAGNOSTIQUE_FAILURE = '[Diagnostique] Create Diagnostique Failure',

  /* Create Intervention */
  CREATE_INTERVENTION = '[Intervention] Create Intervention',
  CREATE_INTERVENTION_SUCCESS = '[Intervention] Create Intervention Success',
  CREATE_INTERVENTION_FAILURE = '[Intervention] Create Intervention Failure',

  /* Add Piece To Intervention */
  ADD_PIECE_TO_INTERVENTION = '[Intervention] Add Piece To Intervention',
  ADD_PIECE_TO_INTERVENTION_SUCCESS = '[Intervention] Add Piece To Intervention Success',
  ADD_PIECE_TO_INTERVENTION_FAILURE = '[Intervention] Add Piece To Intervention Failure',
}


 /* Load Diagnostique Actions*/
 export const loadDiagnostique = createAction(
  DiagnostiqueActionsType.LOAD_DIAGNOSTIQUE,
  props<{ data: string }>()
);

export const loadDiagnostiqueSuccess = createAction(
  DiagnostiqueActionsType.LOAD_DIAGNOSTIQUE_SUCCESS,
  props<{ data: InterventionMaintenance }>()
);

export const loadDiagnostiqueFailure = createAction(
  DiagnostiqueActionsType.LOAD_DIAGNOSTIQUE_FAILURE,
  props<{action: string, error: any} >()
);

/* Create Diagnostique Actions*/
export const createDiagnostique = createAction(
  DiagnostiqueActionsType.CREATE_DIAGNOSTIQUE,
  props<{ data: DiagnostiqueRequest }>()
);

export const createDiagnostiqueSuccess = createAction(
  DiagnostiqueActionsType.CREATE_DIAGNOSTIQUE_SUCCESS,
  props<{ data: Diagnostique }>()
);

export const createDiagnostiqueFailure = createAction(
  DiagnostiqueActionsType.CREATE_DIAGNOSTIQUE_FAILURE,
  props<{action: string, error: any} >()
);

/* Create Intervention Actions*/
export const createIntervention = createAction(
  DiagnostiqueActionsType.CREATE_INTERVENTION,
  props<{ data: any }>()
);

export const createInterventionSuccess = createAction(
  DiagnostiqueActionsType.CREATE_INTERVENTION_SUCCESS,
  props<{ data: any }>()
);

export const createInterventionFailure = createAction(
  DiagnostiqueActionsType.CREATE_INTERVENTION_FAILURE,
  props<{action: string, error: any} >()
);

/* Add Piece To Intervention Actions*/
export const addPieceToIntervention = createAction(
  DiagnostiqueActionsType.ADD_PIECE_TO_INTERVENTION,
  props<{ data: FormData }>()
);

export const addPieceToInterventionSuccess = createAction(
  DiagnostiqueActionsType.ADD_PIECE_TO_INTERVENTION_SUCCESS,
);

export const addPieceToInterventionFailure = createAction(
  DiagnostiqueActionsType.ADD_PIECE_TO_INTERVENTION_FAILURE,
  props<{action: string, error: any} >()
);
