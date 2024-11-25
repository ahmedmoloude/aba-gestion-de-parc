import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { citerneState} from './citerne.reducer';

export const appSelectciterne = (state: AppState) => state.citerne;
export const selectEnvciternePayload = createSelector(
  appSelectciterne,
  (state: citerneState) => state.payload
);
export const selectEnvciterneIsLoading = createSelector(
  appSelectciterne,
  (state: citerneState) => state.loading
);
export const selectEnvciterneError = createSelector(
  appSelectciterne,
  (state: citerneState) => state.error
);
export const selectEnvciterneStatus = createSelector(
  appSelectciterne,
  (state: citerneState) => state.status
);

