import { createAction, props } from '@ngrx/store';

export enum RetourCrbtActionstypes {
  /* Load RetourCrbts */
  LOAD_RETOUR_CRBTS = '[RetourCrbt] Load RetourCrbts',
  LOAD_RETOUR_CRBTS_SUCCESS = '[RetourCrbt] Load RetourCrbts Success',
  LOAD_RETOUR_CRBTS_FAILURE = '[RetourCrbt] Load RetourCrbts Failure',

  /* Validate RetourCrbt */
  VALIDATE_RETOUR_CRBT = '[RetourCrbt] Validate RetourCrbt',
  VALIDATE_RETOUR_CRBT_SUCCESS = '[RetourCrbt] Validate RetourCrbt Success',
  VALIDATE_RETOUR_CRBT_FAILURE = '[RetourCrbt] Validate RetourCrbt Failure',
}

/* Load RetourCrbts Actions */
export const loadRetourCrbts = createAction(
  RetourCrbtActionstypes.LOAD_RETOUR_CRBTS,
  props<{ data: any }>()
  );

export const loadRetourCrbtsSuccess = createAction(
  RetourCrbtActionstypes.LOAD_RETOUR_CRBTS_SUCCESS,
  props<{ data: any }>()
);

export const loadRetourCrbtsFailure = createAction(
  RetourCrbtActionstypes.LOAD_RETOUR_CRBTS_FAILURE,
  props<{ action: string; error: any }>()
);

/* Validate RetourCrbt Actions */
export const validateRetourCrbt = createAction(
  RetourCrbtActionstypes.VALIDATE_RETOUR_CRBT,
  props<{ data: any }>()
  );

export const validateRetourCrbtSuccess = createAction(
  RetourCrbtActionstypes.VALIDATE_RETOUR_CRBT_SUCCESS,
  props<{ data: any }>()
);

export const validateRetourCrbtFailure = createAction(
  RetourCrbtActionstypes.VALIDATE_RETOUR_CRBT_FAILURE,
  props<{ action: string; error: any }>()

);
