import { createReducer, on } from '@ngrx/store';
import { Customer } from 'app/core/models/customer.model';
import * as CustomerActions from './customer.actions';


export enum CustomerStateEnum {
  INIT ='INIT',
  LOADING ='LOADING',
  SUCCESS ='SUCCESS',
  ERROR ='ERROR',
}

export interface CustomerState {
  payload: Customer[];
  loading: boolean;
  error: { action: string, error: any} | null;
  status: CustomerStateEnum;
}

export const initialState: CustomerState = {
  payload: [],
  loading: false,
  error: null,
  status: CustomerStateEnum.INIT,
};

export const customerReducer = createReducer(
  initialState,
  on(CustomerActions.fetchCustomer, (state) => ({...state, loading: true, status: CustomerStateEnum.LOADING, error: null})),
  on(CustomerActions.fetchCustomerSuccess, (state, { payload }) => ({ ...state, loading: false, payload, status: CustomerStateEnum.SUCCESS, error: null})),
  on(CustomerActions.customerActionFailure, (state, { action, error }) => ({ ...state, loading: false, status: CustomerStateEnum.ERROR, error: { action, error }})),
  on(CustomerActions.loadAccountCustomers, (state) => ({...state, loading: true, status: CustomerStateEnum.LOADING, error: null})),
  on(CustomerActions.loadAccountCustomersSuccess, (state, { payload }) => ({ ...state, loading: false, payload, status: CustomerStateEnum.SUCCESS, error: null})),
  on(CustomerActions.loadAccountCustomersFailure, (state, { action, error }) => ({ ...state, loading: false, status: CustomerStateEnum.ERROR, error: { action, error }})),
  on(CustomerActions.loadUnpaidCustomers, (state) => ({...state, loading: true, status: CustomerStateEnum.LOADING, error: null})),
  on(CustomerActions.loadUnpaidCustomersSuccess, (state, { payload }) => ({ ...state, loading: false, payload, status: CustomerStateEnum.SUCCESS, error: null})),
  on(CustomerActions.loadUnpaidCustomersFailure, (state, { action, error }) => ({ ...state, loading: false, status: CustomerStateEnum.ERROR, error: { action, error }}))
);



// #TODO move to helpers
const updateItemFromList = (updateItem: any, listItems: any[]) => {
  return listItems.map((item) => { if (item.uuid == updateItem.uuid) {   return updateItem; } return item;
  });
};
