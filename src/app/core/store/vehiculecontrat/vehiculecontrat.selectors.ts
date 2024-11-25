import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { VehiculeContratState } from './vehiculecontrat.reducer';

export const appSelectVehicule = (state: AppState) => state.contrat;
export const selectEnvVehiculeContratPayload = createSelector(
  appSelectVehicule,
  (state: VehiculeContratState) => state.payload
);
export const selectEnvVehiculeContratIsLoading = createSelector(
  appSelectVehicule,
  (state: VehiculeContratState) => state.loading
);
export const selectEnvVehiculeContratError = createSelector(
  appSelectVehicule,
  (state: VehiculeContratState) => state.error
);
export const selectEnvVehiculeContratStatus = createSelector(
  appSelectVehicule,
  (state: VehiculeContratState) => state.status
);

