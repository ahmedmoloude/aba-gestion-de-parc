import { createAction, props } from '@ngrx/store';

/* Customers */
export const SetLoggedUser = createAction(
  '[profil] Set Logged User',
  props<{ payload: any; auth: any }>()
);

/* ------------------------------ */
