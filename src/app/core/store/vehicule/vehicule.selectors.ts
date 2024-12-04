import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { VehiculeState } from './vehicule.reducer';

export const appSelectVehicule = (state: AppState) => state.vehicule;
export const selectEnvVehiculePayload = createSelector(
  appSelectVehicule,
  (state: VehiculeState) => state.payload
);
export const selectEnvVehiculeIsLoading = createSelector(
  appSelectVehicule,
  (state: VehiculeState) => state.loading
);
export const selectEnvVehiculeError = createSelector(
  appSelectVehicule,
  (state: VehiculeState) => state.error
);
export const selectEnvVehiculeStatus = createSelector(
  appSelectVehicule,
  (state: VehiculeState) => state.status
);

