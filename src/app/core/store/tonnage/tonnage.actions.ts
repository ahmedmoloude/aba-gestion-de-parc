import { createAction, props } from '@ngrx/store';

export const tonnageActionFailure = createAction(
  '[tonnages] tonnages Action Failure',
  props<{ action: string; error: any }>()
);

export const fetchtonnages = createAction(
  '[tonnages] Fetch List tonnages'
);
export const fetchtonnagesSuccess = createAction(
  '[tonnages] Fetch List tonnages Success',
  props<{ payload: any[] }>()
);

export const addtonnage = createAction(
  '[tonnages] Add tonnage',
  props<{ data: any }>()
);
export const addtonnagesuccess = createAction(
  '[tonnages] Add tonnage Success',
  props<{ payload: any }>()
);

export const updatetonnage = createAction(
  '[tonnages] Update tonnage',
  props<{ data: any,  uuid: string  }>()
);
export const updatetonnagesuccess = createAction(
  '[tonnages] Update tonnage Success',
  props<{ payload: any }>()
);

export const deletetonnage = createAction(
  '[tonnages] Delete tonnage',
  props<{ uuid: string }>()
);
export const deletetonnagesuccess = createAction(
  '[tonnages] Delete tonnage Success',
  props<{ uuid: string }>()
);
