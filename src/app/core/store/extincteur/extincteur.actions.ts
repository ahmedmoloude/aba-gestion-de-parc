import { createAction, props } from '@ngrx/store';

export const extincteurActionFailure = createAction(
  '[extincteurs] extincteurs Action Failure',
  props<{ action: string; error: any }>()
);

export const fetchextincteurs = createAction(
  '[extincteurs] Fetch List extincteurs'
);
export const fetchextincteursSuccess = createAction(
  '[extincteurs] Fetch List extincteurs Success',
  props<{ payload: any[] }>()
);

export const addextincteur = createAction(
  '[extincteurs] Add extincteur',
  props<{ data: any }>()
);
export const addextincteursuccess = createAction(
  '[extincteurs] Add extincteur Success',
  props<{ payload: any }>()
);

export const updateextincteur = createAction(
  '[extincteurs] Update extincteur',
  props<{ data: any,  uuid: number  }>()
);
export const updateextincteursuccess = createAction(
  '[extincteurs] Update extincteur Success',
  props<{ payload: any }>()
);

export const deleteextincteur = createAction(
  '[extincteurs] Delete extincteur',
  props<{ uuid: string }>()
);
export const deleteextincteursuccess = createAction(
  '[extincteurs] Delete extincteur Success',
  props<{ uuid: string }>()
);
