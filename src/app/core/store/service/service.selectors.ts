import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { ServiceState } from './service.reducer';

export const appSelectService = (state: AppState) => state.service;
export const selectEnvPayloadService = createSelector(
  appSelectService,
  (state: ServiceState) => state.payload
);
export const selectEnvIsLoadingService = createSelector(
  appSelectService,
  (state: ServiceState) => state.loading
);
export const selectEnvErrorService = createSelector(
  appSelectService,
  (state: ServiceState) => state.error
);
export const selectEnvStatusService = createSelector(
  appSelectService,
  (state: ServiceState) => state.status
);

