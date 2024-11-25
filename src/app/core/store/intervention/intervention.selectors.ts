import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { interventionState} from './intervention.reducer';

export const appSelectintervention = (state: AppState) => state.intervention;
export const selectEnvinterventionPayload = createSelector(
  appSelectintervention,
  (state: interventionState) => state.payload
);
export const selectEnvinterventionIsLoading = createSelector(
  appSelectintervention,
  (state: interventionState) => state.loading
);
export const selectEnvinterventionError = createSelector(
  appSelectintervention,
  (state: interventionState) => state.error
);
export const selectEnvinterventionStatus = createSelector(
  appSelectintervention,
  (state: interventionState) => state.status
);

