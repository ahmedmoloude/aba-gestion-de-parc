import { createSelector } from '@ngrx/store';
import { AppState } from '../../app.states';
import { ExpenseState } from './expense.reducer';

export const appSelectExpenseParameter = (state: AppState) => state.expense;
export const selectExpenseNatures = createSelector(
  appSelectExpenseParameter,
  (state: ExpenseState) => state.expenseNatures
);
export const selectExpenseNaturesState = createSelector(
  appSelectExpenseParameter,
  (state: ExpenseState) => state.expenseNaturesState
);

export const selectExpenseNature = createSelector(
  appSelectExpenseParameter,
  (state: ExpenseState) => state.expenseNature
);
export const selectExpenseNatureState = createSelector(
  appSelectExpenseParameter,
  (state: ExpenseState) => state.expenseNatureState
);


export const selectExpenseSuppliers = createSelector(
  appSelectExpenseParameter,
  (state: ExpenseState) => state.expenseSuppliers
);
export const selectExpenseSuppliersState = createSelector(
  appSelectExpenseParameter,
  (state: ExpenseState) => state.expenseSuppliersState
);

export const selectExpenseSupplier = createSelector(
  appSelectExpenseParameter,
  (state: ExpenseState) => state.expenseSupplier
);
export const selectExpenseSupplierState = createSelector(
  appSelectExpenseParameter,
  (state: ExpenseState) => state.expenseSupplierState
);


export const selectExpenseError = createSelector(
  appSelectExpenseParameter,
  (state: ExpenseState) => state.errorMessage
);
