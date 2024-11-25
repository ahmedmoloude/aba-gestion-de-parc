import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { RdvState } from './rdv.reducer';

export const appSelectRdv = (state: AppState) => state.rdv;
export const selectEnvRDVPayload = createSelector(
  appSelectRdv,
  (state: RdvState) => state.payload
);
export const selectEnvRDVIsLoading = createSelector(
  appSelectRdv,
  (state: RdvState) => state.loading
);
export const selectEnvRDVError = createSelector(
  appSelectRdv,
  (state: RdvState) => state.error
);
export const selectEnvRDVStatus = createSelector(
  appSelectRdv,
  (state: RdvState) => state.status
);

