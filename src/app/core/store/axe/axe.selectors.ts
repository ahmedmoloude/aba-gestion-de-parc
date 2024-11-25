import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { axeState } from './axe.reducer';

export const appSelectAxe = (state: AppState) => state.axe;
export const selectEnvPayloadAxe = createSelector(
    appSelectAxe,
  (state: axeState) => state.payload
);
export const selectEnvIsLoadingAxe = createSelector(
    appSelectAxe,
  (state: axeState) => state.loading
);
export const selectEnvErrorAxe = createSelector(
    appSelectAxe,
  (state: axeState) => state.error
);
export const selectEnvStatusAxe = createSelector(
    appSelectAxe,
  (state: axeState) => state.status
);

