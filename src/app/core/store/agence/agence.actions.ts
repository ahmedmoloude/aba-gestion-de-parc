import { createAction, props } from '@ngrx/store';
import {
  Agence,
  AgenceAddForm,
  AgenceUpdateForm,
} from 'app/core/models/agence.model';

export const AgenceActionFailure = createAction(
  '[Agence] Agence Action Failure',
  props<{ action: string; error: any }>()
);

export const fetchAgence = createAction(
  '[Agence] Fetch List Agence'
);
export const fetchAgenceSuccess = createAction(
  '[Agence] Fetch List Agence Success',
  props<{ payload: Agence[] }>()
);

export const addAgence = createAction(
  '[Agence] Add Agence',
  props<{ data: AgenceAddForm }>()
);
export const addAgenceuccess = createAction(
  '[Agence] Add Agence Success',
  props<{ payload: Agence }>()
);

export const updateAgence = createAction(
  '[Agence] Update Agence',
  props<{ data: AgenceUpdateForm  }>()
);
export const updateAgenceuccess = createAction(
  '[Agence] Update Agence Success',
  props<{ payload: Agence }>()
);

export const deleteAgence = createAction(
  '[Agence] Delete Agence',
  props<{ uuid: string }>()
);
export const deleteAgenceuccess = createAction(
  '[Agence] Delete Agence Success',
  props<{ uuid: string }>()
);
