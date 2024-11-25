import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { LocationState } from './location.reducer';

export const appSelectLocation = (state: AppState) => state.location;
export const selectCities = createSelector(
  appSelectLocation,
  (state: LocationState) => state.cities
);
export const selectZones = createSelector(
  appSelectLocation,
  (state: LocationState) => state.zones
);
export const selectLocationIsLoading = createSelector(
  appSelectLocation,
  (state: LocationState) => state.loading
);
export const selectLocationError = createSelector(
  appSelectLocation,
  (state: LocationState) => state.error
);
export const selectLocationStatus = createSelector(
  appSelectLocation,
  (state: LocationState) => state.error
);
