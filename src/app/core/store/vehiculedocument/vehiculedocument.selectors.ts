import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { VehiculeDocumentState } from './vehiculedocument.reducer';

export const appSelectVehicule = (state: AppState) => state.document;
export const selectEnvVehiculeDocumentPayload = createSelector(
  appSelectVehicule,
  (state: VehiculeDocumentState) => state.payload
);
export const selectEnvVehiculeDocumentIsLoading = createSelector(
  appSelectVehicule,
  (state: VehiculeDocumentState) => state.loading
);
export const selectEnvVehiculeDocumentError = createSelector(
  appSelectVehicule,
  (state: VehiculeDocumentState) => state.error
);
export const selectEnvVehiculeDocumentStatus = createSelector(
  appSelectVehicule,
  (state: VehiculeDocumentState) => state.status
);

