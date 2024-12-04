import { createAction, props } from '@ngrx/store';

export const loadReceptionChequeTraites = createAction(
  '[ReceptionChequeTraite] Load ReceptionChequeTraites'
);

export const loadReceptionChequeTraitesSuccess = createAction(
  '[ReceptionChequeTraite] Load ReceptionChequeTraites Success',
  props<{ data: any }>()
);

export const loadReceptionChequeTraitesFailure = createAction(
  '[ReceptionChequeTraite] Load ReceptionChequeTraites Failure',
  props<{ error: any }>()
);
