import { createAction, props } from '@ngrx/store';
import { Account, AccountAddForm, AccountUpdateForm } from 'app/core/models';

export const accountActionFailure = createAction(
  '[accounts] Accounts Action Failure',
  props<{ action: string; error: any }>()
);

export const fetchAccounts = createAction('[accounts] Fetch List Accounts');
export const fetchAccountsSuccess = createAction(
  '[accounts] Fetch List Accounts Success',
  props<{ payload: any[] }>()
);

export const addAccount = createAction(
  '[accounts] Add Account',
  props<{ data: AccountAddForm }>()
);
export const addAccountSuccess = createAction(
  '[accounts] Add Account Success',
  props<{ payload: Account }>()
);

export const updateAccount = createAction(
  '[accounts] Update Account',
  props<{ uuid: string; data: AccountUpdateForm }>()
);
export const updateAccountSuccess = createAction(
  '[accounts] Update Account Success',
  props<{ payload: Account }>()
);

export const deleteAccount = createAction(
  '[accounts] Delete Account',
  props<{ uuid: string }>()
);
export const deleteAccountSuccess = createAction(
  '[accounts] Delete Account Success',
  props<{ uuid: string }>()
);
