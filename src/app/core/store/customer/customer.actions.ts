import { createAction, props } from '@ngrx/store';
import { Customer } from 'app/core/models/customer.model';

export enum Customeractionstypes {
  /* Load Account Customers */
  LOAD_ACCOUNT_CUSTOMERS = '[Customer] Load Account Customers',
  LOAD_ACCOUNT_CUSTOMERS_SUCCESS = '[Customer] Load Account Customers Success',
  LOAD_ACCOUNT_CUSTOMERS_FAILURE = '[Customer] Load Account Customers Failure',

  /* Load Unpaid Customers */
  LOAD_UNPAID_CUSTOMERS = '[Customer] Load Unpaid Customers',
  LOAD_UNPAID_CUSTOMERS_SUCCESS = '[Customer] Load Unpaid Customers Success',
  LOAD_UNPAID_CUSTOMERS_FAILURE = '[Customer] Load Unpaid Customers Failure',

  /* Load Customer */
  LOAD_CUSTOMER = '[Customer] Load Customer',
  LOAD_CUSTOMER_SUCCESS = '[Customer] Load Customer Success',
  LOAD_CUSTOMER_FAILURE = '[Customer] Load Customer Failure',

  /* Load Customer detail */
  LOAD_CUSTOMER_DETAIL = '[Customer] Load Customer Detail',
  LOAD_CUSTOMER_DETAIL_SUCCESS = '[Customer] Load Customer Detail Success',
  LOAD_CUSTOMER_DETAIL_FAILURE = '[Customer] Load Customer Detail Failure',

}

export const customerActionFailure = createAction(
  '[Customer] Customer Action Failure',
  props<{ action: string; error: any }>()
);

export const fetchCustomer = createAction(
  '[Customer] Fetch List Customer'
);
export const fetchCustomerSuccess = createAction(
  '[Customer] Fetch List Customer Success',
  props<{ payload: Customer[] }>()
);

 export const getCustomersSuccess = createAction(
  '[Customer] Get Customers Action Success',
  props<{ customers: any[] }>()
);



/* Load Account Customers Actions */
export const loadAccountCustomers = createAction(
  Customeractionstypes.LOAD_ACCOUNT_CUSTOMERS,
);

export const loadAccountCustomersSuccess = createAction(
  Customeractionstypes.LOAD_ACCOUNT_CUSTOMERS_SUCCESS,
  props<{ payload: Customer[]  }>()
);

export const loadAccountCustomersFailure = createAction(
  Customeractionstypes.LOAD_ACCOUNT_CUSTOMERS_FAILURE,
  props<{ action: string; error: any }>()
);
/* End Load Account Customers Actions */

/* Load Unpaid Customers Actions */
export const loadUnpaidCustomers = createAction(
  Customeractionstypes.LOAD_UNPAID_CUSTOMERS,
);

export const loadUnpaidCustomersSuccess = createAction(
  Customeractionstypes.LOAD_UNPAID_CUSTOMERS_SUCCESS,
  props<{ payload: Customer[]  }>()
);

export const loadUnpaidCustomersFailure = createAction(
  Customeractionstypes.LOAD_UNPAID_CUSTOMERS_FAILURE,
  props<{ action: string; error: any }>()
);
/* End Load Unpaid Customers Actions */
