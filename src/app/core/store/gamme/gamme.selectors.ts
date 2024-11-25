import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { gammeState } from './gamme.reducer';

export const appSelectgamme = (state: AppState) => state.gamme;
export const selectEnvgammePayload = createSelector(
  appSelectgamme,
  (state: gammeState) => state.payload
);
export const selectEnvgammeIsLoading = createSelector(
  appSelectgamme,
  (state: gammeState) => state.loading
);
export const selectEnvgammeError = createSelector(
  appSelectgamme,
  (state: gammeState) => state.error
);
export const selectEnvgammeStatus = createSelector(
  appSelectgamme,
  (state: gammeState) => state.status
);

