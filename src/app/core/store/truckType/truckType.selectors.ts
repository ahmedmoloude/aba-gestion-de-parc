import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { truckTypeState } from './truckType.reducer';

export const appSelecttruckType = (state: AppState) => state.truckType;
export const selectEnvtruckTypePayload = createSelector(
  appSelecttruckType,
  (state: truckTypeState) => state.payload
);
export const selectEnvtruckTypeIsLoading = createSelector(
  appSelecttruckType,
  (state: truckTypeState) => state.loading
);
export const selectEnvtruckTypeError = createSelector(
  appSelecttruckType,
  (state: truckTypeState) => state.error
);
export const selectEnvtruckTypeStatus = createSelector(
  appSelecttruckType,
  (state: truckTypeState) => state.status
);

