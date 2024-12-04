import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { PersonnelState } from './personnel.reducer';
export const appSelectPersonnel = (state: AppState) => state.personnels;
export const selectEnvPersonnelPayload = createSelector(
  appSelectPersonnel,
  (state: PersonnelState) => state.payload
);
export const selectEnvPersonnelsLoading = createSelector(
  appSelectPersonnel,
  (state: PersonnelState) => state.loading
);
export const selectEnvPersonnelError = createSelector(
  appSelectPersonnel,
  (state: PersonnelState) => state.error
);
export const selectEnvPersonnelStatus = createSelector(
  appSelectPersonnel,
  (state: PersonnelState) => state.status
);
