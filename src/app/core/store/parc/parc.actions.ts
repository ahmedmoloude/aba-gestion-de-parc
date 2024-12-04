import { createAction, props } from '@ngrx/store';

export const parcActionFailure = createAction(
  '[parc] parc Action Failure',
  props<{ action: string; error: any }>()
);

export const fetchparc = createAction(
  '[parc] Fetch List parc'
);
export const fetchparcSuccess = createAction(
  '[parc] Fetch List parc Success',
  props<{ payload: any[] }>()
);

export const addparc = createAction(
  '[parc] Add parc',
  props<{ data: any }>()
);
export const addparcuccess = createAction(
  '[parc] Add parc Success',
  props<{ payload: any }>()
);

export const updateparc = createAction(
  '[parc] Update parc',
  props<{ data: any,  uuid: string  }>()
);
export const updateparcuccess = createAction(
  '[parc] Update parc Success',
  props<{ payload: any }>()
);

export const deleteparc = createAction(
  '[parc] Delete parc',
  props<{ uuid: string }>()
);
export const deleteparcuccess = createAction(
  '[parc] Delete parc Success',
  props<{ uuid: string }>()
);
