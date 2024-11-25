import { createAction, props } from '@ngrx/store';
// import {
//   Axe,
//   AxeAddForm,
//   AxeUpdateForm,
// } from 'app/core/models/axe.model';

export const AxeActionFailure = createAction(
  '[Axe] Axe Action Failure',
  props<{ action: string; error: any }>()
);

export const fetchAxe = createAction(
  '[Axe] Fetch List Axe'
);
export const fetchAxeSuccess = createAction(
  '[Axe] Fetch List Axe Success',
  props<{ payload: any[] }>()
);

export const addAxe = createAction(
  '[Axe] Add Axe',
  props<{ data: any }>()
);
export const addAxeSuccess = createAction(
  '[Axe] Add Axe Success',
  props<{ payload: any }>()
);

export const updateAxe = createAction(
  '[Axe] Update Axe',
  props<{ data: any, uuid:number  }>()
);
export const updateAxeSuccess = createAction(
  '[Axe] Update Axe Success',
  props<{ payload: any, uuid:number }>()
);

export const deleteAxe = createAction(
  '[Axe] Delete Axe',
  props<{ uuid: string }>()
);
export const deleteAxeSuccess = createAction(
  '[Axe] Delete Axe Success',
  props<{ uuid: string }>()
);
