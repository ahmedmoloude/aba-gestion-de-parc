import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { prestataireState } from './prestataire.reducer';

export const appSelectPrestatires = (state: AppState) => state.prestataire;
export const selectEnvprestatairePayload = createSelector(
  appSelectPrestatires,
  (state: prestataireState) => state.payload
);
export const selectEnvprestataireIsLoading = createSelector(
  appSelectPrestatires,
  (state: prestataireState) => state.loading
);
export const selectEnvprestataireError = createSelector(
  appSelectPrestatires,
  (state: prestataireState) => state.error
);
export const selectEnvprestataireStatus = createSelector(
  appSelectPrestatires,
  (state: prestataireState) => state.status
);

