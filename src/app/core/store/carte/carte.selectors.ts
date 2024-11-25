import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { carteState } from './carte.reducer';

export const appSelectcarte = (state: AppState) => state.carte;
export const selectEnvcartePayload = createSelector(
  appSelectcarte,
  (state: carteState) => state.payload
);
export const selectEnvcarteIsLoading = createSelector(
  appSelectcarte,
  (state: carteState) => state.loading
);
export const selectEnvcarteError = createSelector(
  appSelectcarte,
  (state: carteState) => state.error
);
export const selectEnvcarteStatus = createSelector(
  appSelectcarte,
  (state: carteState) => state.status
);

