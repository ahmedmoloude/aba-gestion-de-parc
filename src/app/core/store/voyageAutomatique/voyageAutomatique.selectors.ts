import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { VoyageAutomatiqueState } from './voyageAutomatique.reducer';

export const appSelectVoyage = (state: AppState) => state.voyageAutomatique;
export const selectEnvPayloadVoyage = createSelector(
  appSelectVoyage,
  (state: VoyageAutomatiqueState) => state.payload
);
export const selectEnvIsLoadingVoyage = createSelector(
  appSelectVoyage,
  (state: VoyageAutomatiqueState) => state.loading
);
export const selectEnvErrorVoyage = createSelector(
  appSelectVoyage,
  (state: VoyageAutomatiqueState) => state.error
);
export const selectEnvStatusVoyage = createSelector(
  appSelectVoyage,
  (state: VoyageAutomatiqueState) => state.status
);

