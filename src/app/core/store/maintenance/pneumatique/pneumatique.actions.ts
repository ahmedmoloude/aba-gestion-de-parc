import { createAction, props } from '@ngrx/store';
import { Affectation, AffectationRequest, Pneu } from 'app/core/models/maintenance/pneu.model';

export enum PneumatiqueActionsType {
  /* Load Pneumatique */
  LOAD_PNEUS = '[Pneu] Load Pneus',
  LOAD_PNEUS_SUCCESS = '[Pneu] Load Pneus Success',
  LOAD_PNEUS_FAILURE = '[Pneu] Load Pneus Failure',

  /* Create pneu */
  CREATE_PNEU = '[Pneu] Create Pneu',
  CREATE_PNEU_SUCCESS = '[Pneu] Create Pneu Success',
  CREATE_PNEU_FAILURE = '[Pneu] Create Pneu Failure',

  /* Get pneu */
  GET_PNEU = '[Pneu] Get Pneu',
  GET_PNEU_SUCCESS = '[Pneu] Get Pneu Success',
  GET_PNEU_FAILURE = '[Pneu] Get Pneu Failure',

  /* Affect pneu */
  AFFECT_PNEU = '[Pneu] Affect Pneu',
  AFFECT_PNEU_SUCCESS = '[Pneu] Affect Pneu Success',
  AFFECT_PNEU_FAILURE = '[Pneu] Affect Pneu Failure',

  /* Desaffect pneu */
  DESAFFECT_PNEU = '[Pneu] Desaffect Pneu',
  DESAFFECT_PNEU_SUCCESS = '[Pneu] Desaffect Pneu Success',
  DESAFFECT_PNEU_FAILURE = '[Pneu] Desaffect Pneu Failure',

  /* Update pneu */
  UPDATE_PNEU = '[Pneu] Update Pneu',
  UPDATE_PNEU_SUCCESS = '[Pneu] Update Pneu Success',
  UPDATE_PNEU_FAILURE = '[Pneu] Update Pneu Failure',

  /* Delete pneu */
  DELETE_PNEU = '[Pneu] Delete Pneu',
  DELETE_PNEU_SUCCESS = '[Pneu] Delete Pneu Success',
  DELETE_PNEU_FAILURE = '[Pneu] Delete Pneu Failure',

}


// Load Pneus Action
export const loadPneus = createAction(
  PneumatiqueActionsType.LOAD_PNEUS,
  props<{ data: any, per_page :number, page : number }>()
);

export const loadPneusSuccess = createAction(
  PneumatiqueActionsType.LOAD_PNEUS_SUCCESS,
  props<{ data: Pneu[] }>()
);

export const loadPneusFailure = createAction(
  PneumatiqueActionsType.LOAD_PNEUS_FAILURE,
  props<{action: string, error: any} >()
);


// Create Pneu Action
export const createPneu = createAction(
  PneumatiqueActionsType.CREATE_PNEU,
  props<{ data: Pneu }>()
);

export const createPneuSuccess = createAction(
  PneumatiqueActionsType.CREATE_PNEU_SUCCESS,
  props<{ data: Pneu }>()
);

export const createPneuFailure = createAction(
  PneumatiqueActionsType.CREATE_PNEU_FAILURE,
  props<{action: string, error: any} >()
);

// Get Pneu Action
export const getPneu = createAction(
  PneumatiqueActionsType.GET_PNEU,
  props<{ data: number }>()
);

export const getPneuSuccess = createAction(
  PneumatiqueActionsType.GET_PNEU_SUCCESS,
  props<{ data: Pneu }>()
);

export const getPneuFailure = createAction(
  PneumatiqueActionsType.GET_PNEU_FAILURE,
  props<{action: string, error: any} >()
);

// Affect Pneu Action
export const affectPneu = createAction(
  PneumatiqueActionsType.AFFECT_PNEU,
  props<{ data: AffectationRequest }>()
);

export const affectPneuSuccess = createAction(
  PneumatiqueActionsType.AFFECT_PNEU_SUCCESS,
  props<{ data: Affectation }>()
);

export const affectPneuFailure = createAction(
  PneumatiqueActionsType.AFFECT_PNEU_FAILURE,
  props<{action: string, error: any} >()
);

// Desaffect Pneu Action
export const desaffectPneu = createAction(
  PneumatiqueActionsType.DESAFFECT_PNEU,
  props<{ data: {pneu_id: number} }>()
);

export const desaffectPneuSuccess = createAction(
  PneumatiqueActionsType.DESAFFECT_PNEU_SUCCESS,
  props<{ data: Affectation }>()
);

export const desaffectPneuFailure = createAction(
  PneumatiqueActionsType.DESAFFECT_PNEU_FAILURE,
  props<{action: string, error: any} >()
);

// Update Pneu Action
export const updatePneu = createAction(
  PneumatiqueActionsType.UPDATE_PNEU,
  props<{ data: Pneu }>()
);

export const updatePneuSuccess = createAction(
  PneumatiqueActionsType.UPDATE_PNEU_SUCCESS,
  props<{ data: Pneu }>()
);

export const updatePneuFailure = createAction(
  PneumatiqueActionsType.UPDATE_PNEU_FAILURE,
  props<{action: string, error: any} >()
);
// Delete Pneu Action
export const deletePneu = createAction(
  PneumatiqueActionsType.DELETE_PNEU,
  props<{ data: number }>()
);

export const deletePneuSuccess = createAction(
  PneumatiqueActionsType.DELETE_PNEU_SUCCESS,
  props<{ data: number }>()
);

export const deletePneuFailure = createAction(
  PneumatiqueActionsType.DELETE_PNEU_FAILURE,
  props<{action: string, error: any} >()
);
