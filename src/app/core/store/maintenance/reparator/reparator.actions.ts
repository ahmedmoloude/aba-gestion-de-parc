import { createAction, props } from '@ngrx/store';

export enum ReparatorActionsType {
  /* Load Reparators */
  LOAD_REPARATORS = '[Reparator] Load Reparators',
  LOAD_REPARATORS_SUCCESS = '[Reparator] Load Reparators Success',
  LOAD_REPARATORS_FAILURE = '[Reparator] Load Reparators Failure',
}


export const loadReparators = createAction(
  ReparatorActionsType.LOAD_REPARATORS,
);

export const loadReparatorsSuccess = createAction(
  ReparatorActionsType.LOAD_REPARATORS_SUCCESS,
  props<{ data: any }>()
);

export const loadReparatorsFailure = createAction(
  ReparatorActionsType.LOAD_REPARATORS_FAILURE,
  props<{action: string, error: any} >()
);

