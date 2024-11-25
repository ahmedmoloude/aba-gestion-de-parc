import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { AccountState } from './accounts.reducer';

export const appSelectAccount = (state: AppState) => state.accounts;
export const selectAccountPayload = createSelector(
  appSelectAccount,
  (state: AccountState) => state.payload
);
export const selectAccountIsLoading = createSelector(
  appSelectAccount,
  (state: AccountState) => state.loading
);
export const selectAccountError = createSelector(
  appSelectAccount,
  (state: AccountState) => state.error
);
export const selectAccountStatus = createSelector(
  appSelectAccount,
  (state: AccountState) => state.error
);
