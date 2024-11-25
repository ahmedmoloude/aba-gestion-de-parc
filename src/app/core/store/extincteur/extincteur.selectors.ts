import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { ExtincteurState} from './extincteur.reducer';

export const appSelectExtincteur = (state: AppState) => state.extincteur;
export const selectEnvExtincteurPayload = createSelector(
  appSelectExtincteur,
  (state: ExtincteurState) => state.payload
);
export const selectEnvExtincteurIsLoading = createSelector(
  appSelectExtincteur,
  (state: ExtincteurState) => state.loading
);
export const selectEnvExtincteurError = createSelector(
  appSelectExtincteur,
  (state: ExtincteurState) => state.error
);
export const selectEnvExtincteurStatus = createSelector(
  appSelectExtincteur,
  (state: ExtincteurState) => state.status
);

