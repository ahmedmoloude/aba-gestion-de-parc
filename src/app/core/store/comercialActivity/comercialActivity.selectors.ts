import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { ActivityState } from './comercialActivity.reducer';

export const appSelectActivity = (state: AppState) => state.activity;

export const selectEnvPayload = createSelector(
  appSelectActivity,
  (state: ActivityState) => state.payload
);
export const selectEnvIsLoading = createSelector(
  appSelectActivity,
  (state: ActivityState) => state.loading
);
export const selectEnvError = createSelector(
  appSelectActivity,
  (state: ActivityState) => state.error
);
export const selectEnvStatus = createSelector(
  appSelectActivity,
  (state: ActivityState) => state.status
);

