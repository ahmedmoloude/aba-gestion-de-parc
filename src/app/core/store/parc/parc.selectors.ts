import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { parcState } from './parc.reducer';

export const appSelectParc = (state: AppState) => state.parc;
export const selectEnvparcPayload = createSelector(
  appSelectParc,
  (state: parcState) => state.payload
);
export const selectEnvparcIsLoading = createSelector(
  appSelectParc,
  (state: parcState) => state.loading
);
export const selectEnvparcError = createSelector(
  appSelectParc,
  (state: parcState) => state.error
);
export const selectEnvparcStatus = createSelector(
  appSelectParc,
  (state: parcState) => state.status
);

