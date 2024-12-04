import { createAction, props } from '@ngrx/store';

export enum RecouvreurActionstypes {
  /* Load Recouvreurs */
  LOAD_RECOUVREURS = '[Recouvreur] Load Recouvreurs',
  LOAD_RECOUVREURS_SUCCESS = '[Recouvreur] Load Recouvreurs Success',
  LOAD_RECOUVREURS_FAILURE = '[Recouvreur] Load Recouvreurs Failure',
}

/* Load Recouvreurs Actions */
export const loadRecouvreurs = createAction(
  RecouvreurActionstypes.LOAD_RECOUVREURS
);

export const loadRecouvreursSuccess = createAction(
  RecouvreurActionstypes.LOAD_RECOUVREURS_SUCCESS,
  props<{ data: any }>()
);

export const loadRecouvreursFailure = createAction(
  RecouvreurActionstypes.LOAD_RECOUVREURS_FAILURE,
  props<{action: string, error: any }>()
);
  /* Load Recouvreurs Actions */

