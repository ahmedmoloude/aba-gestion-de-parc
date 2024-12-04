import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { CustomerState } from './customer.reducer';

export const appSelectCustomer = (state: AppState) => state.customer;
export const selectEnvPayload = createSelector(
    appSelectCustomer,
  (state: CustomerState) => state.payload
);
export const selectEnvIsLoading = createSelector(
    appSelectCustomer,
  (state: CustomerState) => state.loading
);
export const selectEnvError = createSelector(
    appSelectCustomer,
  (state: CustomerState) => state.error
);
export const selectEnvStatus = createSelector(
    appSelectCustomer,
  (state: CustomerState) => state.error
);

