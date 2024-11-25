import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { TvaState } from './tva.reducer';

export const appSelectTvaTaxe = (state: AppState) => state.tva;
export const selectEnvPayloadTva = createSelector(
  appSelectTvaTaxe,
  (state: TvaState) => state.payload
);
export const selectEnvIsLoadingTva = createSelector(
  appSelectTvaTaxe,
  (state: TvaState) => state.loading
);
export const selectEnvErrorTva = createSelector(
  appSelectTvaTaxe,
  (state: TvaState) => state.error
);
export const selectEnvStatusTva = createSelector(
  appSelectTvaTaxe,
  (state: TvaState) => state.status
);

