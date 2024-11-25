import { createAction, props } from '@ngrx/store';
import { VersementFilter } from 'app/core/models/caisse/filter/versement-filter.model';
import { Versement } from 'app/core/models/caisse/versement.model';

export enum VersementActionstypes {
  /* Load Versements Virement */
  LOAD_VERSEMENTS_VIREMENT = '[Versement] Load Versements Virement',
  LOAD_VERSEMENTS_VIREMENT_SUCCESS = '[Versement] Load Versements Virement Success',
  LOAD_VERSEMENTS_VIREMENT_FAILURE = '[Versement] Load Versements Virement Failure',

  /* Load Versements Check */
  LOAD_VERSEMENTS_CHECK = '[Versement] Load Versements Check',
  LOAD_VERSEMENTS_CHECK_SUCCESS = '[Versement] Load Versements Check Success',
  LOAD_VERSEMENTS_CHECK_FAILURE = '[Versement] Load Versements Check Failure',

  /* Validate Versement Virement */
  VALIDATE_VERSEMENT_VIREMENT = '[Versement] Validate Versement',
  VALIDATE_VERSEMENT_VIREMENT_SUCCESS = '[Versement] Validate Versement Virement Success',
  VALIDATE_VERSEMENT_VIREMENT_FAILURE = '[Versement] Validate Versement Virement Failure',

  /* Validate Versement Check */
  VALIDATE_VERSEMENT_CHECK = '[Versement] Validate Versement Check ',
  VALIDATE_VERSEMENT_CHECK_SUCCESS = '[Versement] Validate Versement Check Success',
  VALIDATE_VERSEMENT_CHECK_FAILURE = '[Versement] Validate Versement Check Failure',
}

/* Load Versements Virement */
export const loadVersementsVirement = createAction(
  VersementActionstypes.LOAD_VERSEMENTS_VIREMENT,
  props<{ data: VersementFilter }>()
);

export const loadVersementsVirementSuccess = createAction(
  VersementActionstypes.LOAD_VERSEMENTS_VIREMENT_SUCCESS,
  props<{ data: Versement[] }>()
);

export const loadVersementsVirementFailure = createAction(
  VersementActionstypes.LOAD_VERSEMENTS_VIREMENT_FAILURE,
  props<{ action: string; error: any }>()
);

/* Load Versements Check */
export const loadVersementsCheck = createAction(
  VersementActionstypes.LOAD_VERSEMENTS_CHECK,
  props<{ data: VersementFilter }>()
);

export const loadVersementsCheckSuccess = createAction(
  VersementActionstypes.LOAD_VERSEMENTS_CHECK_SUCCESS,
  props<{ data: Versement[] }>()
);

export const loadVersementsCheckFailure = createAction(
  VersementActionstypes.LOAD_VERSEMENTS_CHECK_FAILURE,
  props<{ action: string; error: any }>()
);

export const validateVersementVirement = createAction(
  VersementActionstypes.VALIDATE_VERSEMENT_VIREMENT,
  props<{ data: any }>()
  );

export const validateVersementVirementSuccess = createAction(
  VersementActionstypes.VALIDATE_VERSEMENT_VIREMENT_SUCCESS,
  props<{ data: any }>()
);

export const validateVersementVirementFailure = createAction(
  VersementActionstypes.VALIDATE_VERSEMENT_VIREMENT_FAILURE,
  props<{ action: string; error: any }>()

);

export const validateVersementCheck = createAction(
  VersementActionstypes.VALIDATE_VERSEMENT_CHECK,
  props<{ data: any }>()
  );

export const validateVersementCheckSuccess = createAction(
  VersementActionstypes.VALIDATE_VERSEMENT_CHECK_SUCCESS,
  props<{ data: any }>()
);

export const validateVersementCheckFailure = createAction(
  VersementActionstypes.VALIDATE_VERSEMENT_CHECK_FAILURE,
  props<{ action: string; error: any }>()

);
