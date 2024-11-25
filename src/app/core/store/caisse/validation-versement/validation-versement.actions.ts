import { createAction, props } from '@ngrx/store';

export enum ValidationVersementActionstypes {
  /* Load ValidationVersements */
  LOAD_VALIDATION_VERSEMENTS = '[ValidationVersement] Load ValidationVersements',
  LOAD_VALIDATION_VERSEMENTS_SUCCESS = '[ValidationVersement] Load ValidationVersements Success',
  LOAD_VALIDATION_VERSEMENTS_FAILURE = '[ValidationVersement] Load ValidationVersements Failure',

  /* Validate Versement */
  VALIDATE_VERSEMENT = '[ValidationVersement] Validate Versement',
  VALIDATE_VERSEMENT_SUCCESS = '[ValidationVersement] Validate Versement Success',
  VALIDATE_VERSEMENT_FAILURE = '[ValidationVersement] Validate Versement Failure',
}


export const loadValidationVersements = createAction(
  ValidationVersementActionstypes.LOAD_VALIDATION_VERSEMENTS,
  props<{ data: any }>()
  );

export const loadValidationVersementsSuccess = createAction(
  ValidationVersementActionstypes.LOAD_VALIDATION_VERSEMENTS_SUCCESS,
  props<{ data: any }>()
);

export const loadValidationVersementsFailure = createAction(
  ValidationVersementActionstypes.LOAD_VALIDATION_VERSEMENTS_FAILURE,
  props<{ action: string; error: any }>()
);


export const validateVersement = createAction(
  ValidationVersementActionstypes.VALIDATE_VERSEMENT,
  props<{ data: any }>()
  );

export const validateVersementSuccess = createAction(
  ValidationVersementActionstypes.VALIDATE_VERSEMENT_SUCCESS,
  props<{ data: any }>()
);

export const validateVersementFailure = createAction(
  ValidationVersementActionstypes.VALIDATE_VERSEMENT_FAILURE,
  props<{ action: string; error: any }>()

);
