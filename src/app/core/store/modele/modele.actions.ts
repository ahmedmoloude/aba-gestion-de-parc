import { createAction, props } from '@ngrx/store';

export const modeleActionFailure = createAction(
  '[modeles] modeles Action Failure',
  props<{ action: string; error: any }>()
);

export const fetchmodeles = createAction(
  '[modeles] Fetch List modeles'
);
export const fetchmodelesSuccess = createAction(
  '[modeles] Fetch List modeles Success',
  props<{ payload: any[] }>()
);

export const addmodele = createAction(
  '[modeles] Add modele',
  props<{ data: any }>()
);
export const addmodelesuccess = createAction(
  '[modeles] Add modele Success',
  props<{ payload: any }>()
);

export const updatemodele = createAction(
  '[modeles] Update modele',
  props<{ data: any,  uuid: string  }>()
);
export const updatemodelesuccess = createAction(
  '[modeles] Update modele Success',
  props<{ payload: any }>()
);

export const deletemodele = createAction(
  '[modeles] Delete modele',
  props<{ uuid: string }>()
);
export const deletemodelesuccess = createAction(
  '[modeles] Delete modele Success',
  props<{ uuid: string }>()
);
