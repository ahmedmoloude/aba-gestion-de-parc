import { createAction, props } from '@ngrx/store';

export enum ExpenseActionstypes {
  /* Load Expense Natures */
  LOAD_EXPENSE_NATURES = '[Nature] Load Expense Natures',
  LOAD_EXPENSE_NATURES_SUCCESS = '[Nature] Load Expense Natures Success',
  LOAD_EXPENSE_NATURES_FAILURE = '[Nature] Load Expense Natures Failure',

  /* Load Expense Suppliers */
  LOAD_EXPENSE_SUPPLIERS = '[Supplier] Load Expense Suppliers',
  LOAD_EXPENSE_SUPPLIERS_SUCCESS = '[Supplier] Load Expense Suppliers Success',
  LOAD_EXPENSE_SUPPLIERS_FAILURE = '[Supplier] Load Expense Suppliers Failure',

  /* Add Expense Nature */
  ADD_EXPENSE_NATURE = '[Nature] Add Expense Nature',
  ADD_EXPENSE_NATURE_SUCCESS = '[Nature] Add Expense Nature Success',
  ADD_EXPENSE_NATURE_FAILURE = '[Nature] Add Expense Nature Failure',


  /* Add Expense Supplier */
  ADD_EXPENSE_SUPPLIER = '[Supplier] Add Expense Supplier',
  ADD_EXPENSE_SUPPLIER_SUCCESS = '[Supplier] Add Expense Supplier Success',
  ADD_EXPENSE_SUPPLIER_FAILURE = '[Supplier] Add Expense Supplier Failure',

  /* Update Expense Nature */
  UPDATE_EXPENSE_NATURE = '[Nature] Update Expense Nature',
  UPDATE_EXPENSE_NATURE_SUCCESS = '[Nature] Update Expense Nature Success',
  UPDATE_EXPENSE_NATURE_FAILURE = '[Nature] Update Expense Nature Failure',


  /* Update Expense Supplier */
  UPDATE_EXPENSE_SUPPLIER = '[Supplier] Update Expense Supplier',
  UPDATE_EXPENSE_SUPPLIER_SUCCESS = '[Supplier] Update Expense Supplier Success',
  UPDATE_EXPENSE_SUPPLIER_FAILURE = '[Supplier] Update Expense Supplier Failure',


  /* Delete Expense Nature */
  DELETE_EXPENSE_NATURE = '[Nature] Delete Expense Nature',
  DELETE_EXPENSE_NATURE_SUCCESS = '[Nature] Delete Expense Nature Success',
  DELETE_EXPENSE_NATURE_FAILURE = '[Nature] Delete Expense Nature Failure',

  /* Delete Expense Supplier */
  DELETE_EXPENSE_SUPPLIER = '[Supplier] Delete Expense Supplier',
  DELETE_EXPENSE_SUPPLIER_SUCCESS = '[Supplier] Delete Expense Supplier Success',
  DELETE_EXPENSE_SUPPLIER_FAILURE = '[Supplier] Delete Expense Supplier Failure',

}

/* Load Expense Actions */
export const loadExpenseNatures = createAction(
  ExpenseActionstypes.LOAD_EXPENSE_NATURES,
);

export const loadExpenseNaturesSuccess = createAction(
  ExpenseActionstypes.LOAD_EXPENSE_NATURES_SUCCESS,
  props<{ data: any[] }>()
);

export const loadExpenseNaturesFailure = createAction(
  ExpenseActionstypes.LOAD_EXPENSE_NATURES_FAILURE,
  props<{ action: string; error: any }>()
);

/* Load Expense Suppliers Actions */
export const loadExpenseSuppliers = createAction(
  ExpenseActionstypes.LOAD_EXPENSE_SUPPLIERS,
);

export const loadExpenseSuppliersSuccess = createAction(
  ExpenseActionstypes.LOAD_EXPENSE_SUPPLIERS_SUCCESS,
  props<{ data: any[] }>()
);

export const loadExpenseSuppliersFailure = createAction(
  ExpenseActionstypes.LOAD_EXPENSE_SUPPLIERS_FAILURE,
  props<{ action: string; error: any }>()
);

/* Add Expense Nature Actions */
export const addExpenseNature = createAction(
  ExpenseActionstypes.ADD_EXPENSE_NATURE,
  props<{ data: any }>()
);

export const addExpenseNatureSuccess = createAction(
  ExpenseActionstypes.ADD_EXPENSE_NATURE_SUCCESS,
  props<{ data: any }>()
);

export const addExpenseNatureFailure = createAction(
  ExpenseActionstypes.ADD_EXPENSE_NATURE_FAILURE,
  props<{ action: string; error: any }>()
);

/* Add Expense Supplier Actions */
export const addExpenseSupplier = createAction(
  ExpenseActionstypes.ADD_EXPENSE_SUPPLIER,
  props<{ data: any }>()
);

export const addExpenseSupplierSuccess = createAction(
  ExpenseActionstypes.ADD_EXPENSE_SUPPLIER_SUCCESS,
  props<{ data: any }>()
);

export const addExpenseSupplierFailure = createAction(
  ExpenseActionstypes.ADD_EXPENSE_SUPPLIER_FAILURE,
  props<{ action: string; error: any }>()
);

/* Update Expense Nature Actions */
export const updateExpenseNature = createAction(
  ExpenseActionstypes.UPDATE_EXPENSE_NATURE,
  props<{ data: any, uuid: string }>()
);

export const updateExpenseNatureSuccess = createAction(
  ExpenseActionstypes.UPDATE_EXPENSE_NATURE_SUCCESS,
  props<{ data: any }>()
);

export const updateExpenseNatureFailure = createAction(
  ExpenseActionstypes.UPDATE_EXPENSE_NATURE_FAILURE,
  props<{ action: string; error: any }>()
);

/* Update Expense Supplier Actions */
export const updateExpenseSupplier = createAction(
  ExpenseActionstypes.UPDATE_EXPENSE_SUPPLIER,
  props<{ data: any, uuid: string }>()
);

export const updateExpenseSupplierSuccess = createAction(
  ExpenseActionstypes.UPDATE_EXPENSE_SUPPLIER_SUCCESS,
  props<{ data: any }>()
);

export const updateExpenseSupplierFailure = createAction(
  ExpenseActionstypes.UPDATE_EXPENSE_SUPPLIER_FAILURE,
  props<{ action: string; error: any }>()
);

/* Delete Expense Nature Actions */
export const deleteExpenseNature = createAction(
  ExpenseActionstypes.DELETE_EXPENSE_NATURE,
  props<{ data: string }>()
);

export const deleteExpenseNatureSuccess = createAction(
  ExpenseActionstypes.DELETE_EXPENSE_NATURE_SUCCESS,
  props<{ data: any }>()
);

export const deleteExpenseNatureFailure = createAction(
  ExpenseActionstypes.DELETE_EXPENSE_NATURE_FAILURE,
  props<{ action: string; error: any }>()
);

/* Delete Expense Supplier Actions */
export const deleteExpenseSupplier = createAction(
  ExpenseActionstypes.DELETE_EXPENSE_SUPPLIER,
  props<{ data: string }>()
);

export const deleteExpenseSupplierSuccess = createAction(
  ExpenseActionstypes.DELETE_EXPENSE_SUPPLIER_SUCCESS,
  props<{ data: any }>()
);

export const deleteExpenseSupplierFailure = createAction(
  ExpenseActionstypes.DELETE_EXPENSE_SUPPLIER_FAILURE,
  props<{ action: string; error: any }>()
);
