import { createAction, props } from '@ngrx/store';

export const remplacementActionFailure = createAction(
  '[remplacements] remplacements Action Failure',
  props<{ action: string; error: any }>()
);

export const fetchremplacements = createAction(
  '[remplacements] Fetch List remplacements'
);
export const fetchremplacementsSuccess = createAction(
  '[remplacements] Fetch List remplacements Success',
  props<{ payload: any[] }>()
);

export const addremplacement = createAction(
  '[remplacements] Add remplacement',
  props<{ data: any }>()
);
export const addremplacementsuccess = createAction(
  '[remplacements] Add remplacement Success',
  props<{ payload: any }>()
);

export const updateremplacement = createAction(
  '[remplacements] Update remplacement',
  props<{ data: any,  uuid: number  }>()
);
export const updateremplacementsuccess = createAction(
  '[remplacements] Update remplacement Success',
  props<{ payload: any }>()
);

export const deleteremplacement = createAction(
  '[remplacements] Delete remplacement',
  props<{ uuid: string }>()
);
export const deleteremplacementsuccess = createAction(
  '[remplacements] Delete remplacement Success',
  props<{ uuid: string }>()
);
