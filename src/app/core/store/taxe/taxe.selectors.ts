import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { TaxeState } from './taxe.reducer';

export const appSelectTaxe = (state: AppState) => state.taxe;
export const selectEnvPayloadTaxe = createSelector(
  appSelectTaxe,
  (state: TaxeState) => state.payload
);
export const selectEnvIsLoadingTaxe = createSelector(
  appSelectTaxe,
  (state: TaxeState) => state.loading
);
export const selectEnvErrorTaxe = createSelector(
  appSelectTaxe,
  (state: TaxeState) => state.error
);
export const selectEnvStatusTaxe = createSelector(
  appSelectTaxe,
  (state: TaxeState) => state.error
);

