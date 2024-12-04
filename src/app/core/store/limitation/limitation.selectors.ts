import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { LimitationState } from './limitation.reducer';

export const appSelectLimitation = (state: AppState) => state.limitation;
export const selectEnvPayloadLimitation = createSelector(
  appSelectLimitation,
  (state: LimitationState) => state.payload
);
export const selectEnvIsLoadingLimitation = createSelector(
  appSelectLimitation,
  (state: LimitationState) => state.loading
);
export const selectEnvErrorLimitation = createSelector(
  appSelectLimitation,
  (state: LimitationState) => state.error
);
export const selectEnvStatusLimitation = createSelector(
  appSelectLimitation,
  (state: LimitationState) => state.status
);

