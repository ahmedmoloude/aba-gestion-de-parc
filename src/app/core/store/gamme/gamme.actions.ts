import { createAction, props } from '@ngrx/store';

export const gammeActionFailure = createAction(
  '[gammes] gammes Action Failure',
  props<{ action: string; error: any }>()
);

export const fetchgammes = createAction(
  '[gammes] Fetch List gammes'
);
export const fetchgammesSuccess = createAction(
  '[gammes] Fetch List gammes Success',
  props<{ payload: any[] }>()
);

export const addgamme = createAction(
  '[gammes] Add gamme',
  props<{ data: any }>()
);
export const addgammesuccess = createAction(
  '[gammes] Add gamme Success',
  props<{ payload: any }>()
);

export const updategamme = createAction(
  '[gammes] Update gamme',
  props<{ data: any,  uuid: string  }>()
);
export const updategammesuccess = createAction(
  '[gammes] Update gamme Success',
  props<{ payload: any }>()
);

export const deletegamme = createAction(
  '[gammes] Delete gamme',
  props<{ uuid: string }>()
);
export const deletegammesuccess = createAction(
  '[gammes] Delete gamme Success',
  props<{ uuid: string }>()
);
