import { createAction, props } from '@ngrx/store';

export const typeExtincteurActionFailure = createAction(
  '[typeExtincteur] typeExtincteur Action Failure',
  props<{ action: string; error: any }>()
);

export const fetchtypeExtincteur = createAction(
  '[typeExtincteur] Fetch List typeExtincteur'
);
export const fetchtypeExtincteurSuccess = createAction(
  '[typeExtincteur] Fetch List typeExtincteur Success',
  props<{ payload: any[] }>()
);

export const addtypeExtincteur = createAction(
  '[typeExtincteur] Add typeExtincteur',
  props<{ data: any }>()
);
export const addtypeExtincteuruccess = createAction(
  '[typeExtincteur] Add typeExtincteur Success',
  props<{ payload: any }>()
);

export const updatetypeExtincteur = createAction(
  '[typeExtincteur] Update typeExtincteur',
  props<{ data: any,  uuid: string   }>()
);
export const updatetypeExtincteuruccess = createAction(
  '[typeExtincteur] Update typeExtincteur Success',
  props<{ payload: any }>()
);

export const deletetypeExtincteur = createAction(
  '[typeExtincteur] Delete typeExtincteur',
  props<{ uuid: string }>()
);
export const deletetypeExtincteuruccess = createAction(
  '[typeExtincteur] Delete typeExtincteur Success',
  props<{ uuid: string }>()
);
