import { Action, createReducer, on } from '@ngrx/store';
import * as ExpenseActions from 'app/core/store/caisse/expense/expense.actions';



export const expenseFeatureKey = 'expense';

export enum StateEnum {
  INIT ='INIT',
  LOADING ='LOADING',
  SUCCESS ='SUCCESS',
  ERROR ='ERROR',
}
export interface ExpenseState {
  expenseSuppliers: any[],
  expenseNatures: any[],
  expenseSupplier: any,
  expenseNature: any,
  expenseSuppliersState: StateEnum,
  expenseNaturesState: StateEnum,
  expenseSupplierState: StateEnum,
  expenseNatureState: StateEnum,
  errorMessage: { action: string; error: any } | null;
}

export const initialState: ExpenseState = {
  expenseSuppliers: null,
  expenseNatures: null,
  expenseSupplier: null,
  expenseNature: null,
  expenseSuppliersState: StateEnum.INIT,
  expenseNaturesState: StateEnum.INIT,
  expenseSupplierState: StateEnum.INIT,
  expenseNatureState: StateEnum.INIT,
  errorMessage: null,
};



export const expenseReducer = createReducer(
  initialState,
  on(ExpenseActions.loadExpenseNatures, state => ({...state, expenseNaturesState: StateEnum.LOADING})),
  on(ExpenseActions.loadExpenseNaturesSuccess, (state, {data}) => ({...state, expenseNaturesState: StateEnum.SUCCESS, expenseNatures: data})),
  on(ExpenseActions.loadExpenseNaturesFailure, (state, {error}) => ({...state, expenseNaturesState: StateEnum.ERROR, errorMessage: error})),
  on(ExpenseActions.loadExpenseSuppliers, state => ({...state, expenseSuppliersState: StateEnum.LOADING})),
  on(ExpenseActions.loadExpenseSuppliersSuccess, (state, {data}) => ({...state, expenseSuppliersState: StateEnum.SUCCESS, expenseSuppliers: data})),
  on(ExpenseActions.loadExpenseSuppliersFailure, (state, {error}) => ({...state, expenseSuppliersState: StateEnum.ERROR, errorMessage: error})),
  on(ExpenseActions.addExpenseNature, state => ({...state, expenseNatureState: StateEnum.LOADING})),
  on(ExpenseActions.addExpenseNatureSuccess, (state, {data}) => ({...state, expenseNatureState: StateEnum.SUCCESS, expenseNature: data, expenseNatures: [data, ...state.expenseNatures]})),
  on(ExpenseActions.addExpenseNatureFailure, (state, {error}) => ({...state, expenseNatureState: StateEnum.ERROR, errorMessage: error})),
  on(ExpenseActions.addExpenseSupplier, state => ({...state, expenseSupplierState: StateEnum.LOADING})),
  on(ExpenseActions.addExpenseSupplierSuccess, (state, {data}) => ({...state, expenseSupplierState: StateEnum.SUCCESS, expenseSupplier: data, expenseSuppliers: [data, ...state.expenseSuppliers]})),
  on(ExpenseActions.addExpenseSupplierFailure, (state, {error}) => ({...state, expenseSupplierState: StateEnum.ERROR, errorMessage: error})),
  on(ExpenseActions.updateExpenseNature, state => ({...state, expenseNatureState: StateEnum.LOADING})),
  on(ExpenseActions.updateExpenseNatureSuccess, (state, {data}) => ({...state, expenseNatureState: StateEnum.SUCCESS, expenseNature: data, expenseNatures: state.expenseNatures?.map(item=>item.id == data.id? data : item)})),
  on(ExpenseActions.updateExpenseNatureFailure, (state, {error}) => ({...state, expenseNatureState: StateEnum.ERROR, errorMessage: error})),
  on(ExpenseActions.updateExpenseSupplier, state => ({...state, expenseSupplierState: StateEnum.LOADING})),
  on(ExpenseActions.updateExpenseSupplierSuccess, (state, {data}) => ({...state, expenseSupplierState: StateEnum.SUCCESS, expenseSupplier: data, expenseSuppliers: state.expenseSuppliers?.map(item=>item.id == data.id? data : item)})),
  on(ExpenseActions.updateExpenseSupplierFailure, (state, {error}) => ({...state, expenseSupplierState: StateEnum.ERROR, errorMessage: error})),
  on(ExpenseActions.deleteExpenseNature, state => ({...state, expenseNatureState: StateEnum.LOADING})),
  on(ExpenseActions.deleteExpenseNatureSuccess, (state, {data}) => ({...state, expenseNatureState: StateEnum.SUCCESS, expenseNatures: state.expenseNatures?.filter(element => element.uuid !== data)})),
  on(ExpenseActions.deleteExpenseNatureFailure, (state, {error}) => ({...state, expenseNatureState: StateEnum.ERROR, errorMessage: error})),
  on(ExpenseActions.deleteExpenseSupplier, state => ({...state, expenseSupplierState: StateEnum.LOADING})),
  on(ExpenseActions.deleteExpenseSupplierSuccess, (state, {data}) => ({...state, expenseSupplierState: StateEnum.SUCCESS, expenseSuppliers: state.expenseSuppliers?.filter(element => element.uuid !== data)})),
  on(ExpenseActions.deleteExpenseSupplierFailure, (state, {error}) => ({...state, expenseSupplierState: StateEnum.ERROR, errorMessage: error})),
);

