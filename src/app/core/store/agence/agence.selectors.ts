import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { AgenceState } from './agence.reducer';

export const appSelectAgence = (state: AppState) => state.agence;
export const selectEnvPayloadAgence = createSelector(
    appSelectAgence,
  (state: AgenceState) => state.payload
);
export const selectEnvIsLoadingAgence = createSelector(
    appSelectAgence,
  (state: AgenceState) => state.loading
);
export const selectEnvErrorAgence = createSelector(
    appSelectAgence,
  (state: AgenceState) => state.error
);
export const selectEnvStatusAgence = createSelector(
    appSelectAgence,
  (state: AgenceState) => state.status
);

