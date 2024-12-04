import { createAction, props } from '@ngrx/store';

export const prestataireActionFailure = createAction(
  '[prestataire] prestataire Action Failure',
  props<{ action: string; error: any }>()
);

export const fetchprestataire = createAction(
  '[prestataire] Fetch List prestataire'
);
export const fetchprestataireSuccess = createAction(
  '[prestataire] Fetch List prestataire Success',
  props<{ payload: any[] }>()
);

export const addprestataire = createAction(
  '[prestataire] Add prestataire',
  props<{ data: any }>()
);
export const addprestataireuccess = createAction(
  '[prestataire] Add prestataire Success',
  props<{ payload: any }>()
);

export const updateprestataire = createAction(
  '[prestataire] Update prestataire',
  props<{ data: any,  uuid: string  }>()
);
export const updateprestatairesuccess = createAction(
  '[prestataire] Update prestataire Success',
  props<{ payload: any }>()
);

export const deleteprestataire = createAction(
  '[prestataire] Delete prestataire',
  props<{ uuid: string }>()
);
export const deleteprestatairesuccess = createAction(
  '[prestataire] Delete prestataire Success',
  props<{ uuid: string }>()
);
