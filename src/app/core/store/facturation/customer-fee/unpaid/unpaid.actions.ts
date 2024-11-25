import { createAction, props } from '@ngrx/store';
import { Unpaid } from 'app/core/models/facturation/customer-fee/unpaid.model';
import { UnpaidFilter } from 'app/core/models/facturation/filters/unpaid-filter.model';

export enum UnpaidActionstypes {
  /* Load Unpaids */
  LOAD_UNPAIDS = '[Unpaid] Load Unpaids',
  LOAD_UNPAIDS_SUCCESS = '[Unpaid] Load Unpaids Success',
  LOAD_UNPAIDS_FAILURE = '[Unpaid] Load Unpaids Failure',

  /* Load Unpaid */
  LOAD_UNPAID = '[Unpaid] Load Unpaid',
  LOAD_UNPAID_SUCCESS = '[Unpaid] Load Unpaid Success',
  LOAD_UNPAID_FAILURE = '[Unpaid] Load Unpaid Failure',

  /* Create Unpaid */
  CREATE_UNPAID = '[Unpaid] Create Unpaid',
  CREATE_UNPAID_SUCCESS = '[Unpaid] Create Unpaid Success',
  CREATE_UNPAID_FAILURE = '[Unpaid] Create Unpaid Failure',

  /* Update Unpaid */
  UPDATE_UNPAID = '[Unpaid] Update Unpaid',
  UPDATE_UNPAID_SUCCESS = '[Unpaid] Update Unpaid Success',
  UPDATE_UNPAID_FAILURE = '[Unpaid] Update Unpaid Failure',

  /* Delete Unpaid */
  DELETE_UNPAID = '[Unpaid] Delete Unpaid',
  DELETE_UNPAID_SUCCESS = '[Unpaid] Delete Unpaid Success',
  DELETE_UNPAID_FAILURE = '[Unpaid] Delete Unpaid Failure',

}

/* End Load Unpaids Actions */
export const loadUnpaids = createAction(
  UnpaidActionstypes.LOAD_UNPAIDS,
  props<{ data: UnpaidFilter }>()
);

export const loadUnpaidsSuccess = createAction(
  UnpaidActionstypes.LOAD_UNPAIDS_SUCCESS,
  props<{ data: any }>()
);

export const loadUnpaidsFailure = createAction(
  UnpaidActionstypes.LOAD_UNPAIDS_FAILURE,
  props<{ action: string; error: any }>()
);
/* End Load Unpaids Actions */


/* Create Unpaid Actions */
export const createUnpaid = createAction(
  UnpaidActionstypes.CREATE_UNPAID,
  props<{ data: any }>()
);

export const createUnpaidSuccess = createAction(
  UnpaidActionstypes.CREATE_UNPAID_SUCCESS,
  props<{ data: any }>()
);

export const createUnpaidFailure = createAction(
  UnpaidActionstypes.CREATE_UNPAID_FAILURE,
  props<{ action: string; error: any }>()
);
/* End Create Unpaid Actions */
