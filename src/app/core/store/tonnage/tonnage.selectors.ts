import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { tonnageState } from './tonnage.reducer';

export const appSelecttonnage = (state: AppState) => state.tonnage;
export const selectEnvtonnagePayload = createSelector(
  appSelecttonnage,
  (state: tonnageState) => state.payload
);
export const selectEnvtonnageIsLoading = createSelector(
  appSelecttonnage,
  (state: tonnageState) => state.loading
);
export const selectEnvtonnageError = createSelector(
  appSelecttonnage,
  (state: tonnageState) => state.error
);
export const selectEnvtonnageStatus = createSelector(
  appSelecttonnage,
  (state: tonnageState) => state.status
);

