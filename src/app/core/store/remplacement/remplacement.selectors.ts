import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { RemplacementState } from './remplacement.reducer';

export const appSelectRemplacement = (state: AppState) => state.remplacement;
export const selectEnvRemplacementPayload = createSelector(
  appSelectRemplacement,
  (state: RemplacementState) => state.payload
);
export const selectEnvRemplacementIsLoading = createSelector(
  appSelectRemplacement,
  (state: RemplacementState) => state.loading
);
export const selectEnvRemplacementError = createSelector(
  appSelectRemplacement,
  (state: RemplacementState) => state.error
);
export const selectEnvRemplacementStatus = createSelector(
  appSelectRemplacement,
  (state: RemplacementState) => state.status
);

