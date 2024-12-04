import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { brandState } from './brand.reducer';

export const appSelectbrand = (state: AppState) => state.brand;
export const selectEnvbrandPayload = createSelector(
  appSelectbrand,
  (state: brandState) => state.payload
);
export const selectEnvbrandIsLoading = createSelector(
  appSelectbrand,
  (state: brandState) => state.loading
);
export const selectEnvbrandError = createSelector(
  appSelectbrand,
  (state: brandState) => state.error
);
export const selectEnvbrandStatus = createSelector(
  appSelectbrand,
  (state: brandState) => state.status
);

