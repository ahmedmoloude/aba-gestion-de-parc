import { createAction, props } from '@ngrx/store';

export enum ModeReglementActionstypes {
  /* Load ModeReglements */
  LOAD_MODE_REGLEMENTS = '[ModeReglement] Load ModeReglements',
  LOAD_MODE_REGLEMENTS_SUCCESS = '[ModeReglement] Load ModeReglements Success',
  LOAD_MODE_REGLEMENTS_FAILURE = '[ModeReglement] Load ModeReglements Failure',
}

/* End Load ModeReglements Actions */
export const loadModeReglements = createAction(
  ModeReglementActionstypes.LOAD_MODE_REGLEMENTS,
);

export const loadModeReglementsSuccess = createAction(
  ModeReglementActionstypes.LOAD_MODE_REGLEMENTS_SUCCESS,
  props<{ data: any }>()
);

export const loadModeReglementsFailure = createAction(
  ModeReglementActionstypes.LOAD_MODE_REGLEMENTS_FAILURE,
  props<{ action: string; error: any }>()
);
/* End Load ModeReglements Actions */
