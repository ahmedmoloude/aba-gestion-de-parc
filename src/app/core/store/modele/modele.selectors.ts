import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { modeleState } from './modele.reducer';

export const appSelectmodele = (state: AppState) => state.modele;
export const selectEnvmodelePayload = createSelector(
  appSelectmodele,
  (state: modeleState) => state.payload
);
export const selectEnvmodeleIsLoading = createSelector(
  appSelectmodele,
  (state: modeleState) => state.loading
);
export const selectEnvmodeleError = createSelector(
  appSelectmodele,
  (state: modeleState) => state.error
);
export const selectEnvmodeleStatus = createSelector(
  appSelectmodele,
  (state: modeleState) => state.status
);

