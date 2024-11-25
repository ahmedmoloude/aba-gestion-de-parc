import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { VehiculeSinistreState } from './vehiculesinistre.reducer';

export const appSelectVehicule = (state: AppState) => state.sinistre;
export const selectEnvVehiculeSinistresPayload = createSelector(
  appSelectVehicule,
  (state: VehiculeSinistreState) => state.payload
);
export const selectEnvVehiculeSinistresIsLoading = createSelector(
  appSelectVehicule,
  (state: VehiculeSinistreState) => state.loading
);
export const selectEnvVehiculeSinistresError = createSelector(
  appSelectVehicule,
  (state: VehiculeSinistreState) => state.error
);
export const selectEnvVehiculeSinistresStatus = createSelector(
  appSelectVehicule,
  (state: VehiculeSinistreState) => state.status
);

