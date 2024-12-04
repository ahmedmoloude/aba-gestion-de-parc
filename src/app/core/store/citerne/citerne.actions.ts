import { createAction, props } from '@ngrx/store';

export const citerneActionFailure = createAction(
  '[citernes] citernes Action Failure',
  props<{ action: string; error: any }>()
);

export const fetchciternes = createAction(
  '[citernes] Fetch List citernes'
);
export const fetchciternesSuccess = createAction(
  '[citernes] Fetch List citernes Success',
  props<{ payload: any[] }>()
);

export const addciterne = createAction(
  '[citernes] Add citerne',
  props<{ data: any }>()
);
export const addciternesuccess = createAction(
  '[citernes] Add citerne Success',
  props<{ payload: any }>()
);

export const updateciterne = createAction(
  '[citernes] Update citerne',
  props<{ data: any,  uuid: number  }>()
);
export const updateciternesuccess = createAction(
  '[citernes] Update citerne Success',
  props<{ payload: any }>()
);

export const deleteciterne = createAction(
  '[citernes] Delete citerne',
  props<{ uuid: string }>()
);
export const deleteciternesuccess = createAction(
  '[citernes] Delete citerne Success',
  props<{ uuid: string }>()
);
