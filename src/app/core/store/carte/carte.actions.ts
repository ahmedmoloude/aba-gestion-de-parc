import { createAction, props } from '@ngrx/store';

export const carteActionFailure = createAction(
  '[cartes] cartes Action Failure',
  props<{ action: string; error: any }>()
);

export const fetchcartes = createAction(
  '[cartes] Fetch List cartes'
);
export const fetchcartesSuccess = createAction(
  '[cartes] Fetch List cartes Success',
  props<{ payload: any[] }>()
);

export const addcarte = createAction(
  '[cartes] Add carte',
  props<{ data: any }>()
);
export const addcartesuccess = createAction(
  '[cartes] Add carte Success',
  props<{ payload: any }>()
);

export const updatecarte = createAction(
  '[cartes] Update carte',
  props<{ data: any,  uuid: string  }>()
);
export const updatecartesuccess = createAction(
  '[cartes] Update carte Success',
  props<{ payload: any }>()
);

export const deletecarte = createAction(
  '[cartes] Delete carte',
  props<{ uuid: string }>()
);
export const deletecartesuccess = createAction(
  '[cartes] Delete carte Success',
  props<{ uuid: string }>()
);
