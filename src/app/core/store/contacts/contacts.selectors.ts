import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { ContactState } from './contacts.reducer';

export const appSelectContact = (state: AppState) => state.contact;
export const selectEnvPayload = createSelector(
  appSelectContact,
  (state: ContactState) => state.payload
);
export const selectEnvIsLoading = createSelector(
  appSelectContact,
  (state: ContactState) => state.loading
);
export const selectEnvError = createSelector(
  appSelectContact,
  (state: ContactState) => state.error
);
export const selectEnvStatus = createSelector(
  appSelectContact,
  (state: ContactState) => state.status
);

