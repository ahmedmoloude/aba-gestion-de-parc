import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ExpenseService } from 'app/core/services/caisse/expense.service';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import * as ExpenseActions from 'app/core/store/caisse/expense/expense.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.states';
import { updatePagination } from '../../pagination/pagination.actions';


@Injectable()
export class ExpenseEffects {



  constructor(private actions$: Actions,
    private expenseService: ExpenseService,
    private _toast: ToastService,
    private store : Store<AppState>) {}

  loadExpenseNatures$ = createEffect( () => this.actions$.pipe(
    ofType(ExpenseActions.ExpenseActionstypes.LOAD_EXPENSE_NATURES),
    exhaustMap((action: any) => {
      return this.expenseService.getExpenseNatures().pipe(
        map((resp: any) => {
          console.log('Expense');
          console.log(resp);
          if(resp.success) {
            this.store.dispatch(updatePagination({
              currentPage: resp.response.current_page,
              pageSize: resp.response.per_page,
              totalItems: resp.response.total
             }));
            return ExpenseActions.loadExpenseNaturesSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return ExpenseActions.loadExpenseNaturesFailure(
              {
                action: 'Load Expenses',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(ExpenseActions.loadExpenseNaturesFailure(
          {
            action: 'Load Expenses',
            error: err
          }
        )))
      )
    })
  ));

  addExpenseNature$ = createEffect( () => this.actions$.pipe(
    ofType(ExpenseActions.ExpenseActionstypes.ADD_EXPENSE_NATURE),
    exhaustMap((action: any) => {
      return this.expenseService.addExpenseNature(action.data).pipe(
        map((resp: any) => {
          console.log('Expense');
          console.log(resp);
          if(resp.success) {
            return ExpenseActions.addExpenseNatureSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return ExpenseActions.addExpenseNatureFailure(
              {
                action: 'add Expense',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(ExpenseActions.addExpenseNatureFailure(
          {
            action: 'add Expense',
            error: err
          }
        )))
      )
    })
  ));

  updateExpenseNature$ = createEffect( () => this.actions$.pipe(
    ofType(ExpenseActions.ExpenseActionstypes.UPDATE_EXPENSE_NATURE),
    exhaustMap((action: any) => {
      return this.expenseService.updateExpenseNature(action.data, action.uuid).pipe(
        map((resp: any) => {
          console.log('Expense');
          console.log(resp);
          if(resp.success) {
            return ExpenseActions.updateExpenseNatureSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return ExpenseActions.updateExpenseNatureFailure(
              {
                action: 'update Expense',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(ExpenseActions.updateExpenseNatureFailure(
          {
            action: 'update Expense',
            error: err
          }
        )))
      )
    })
  ));

  loadExpenseSuppliers$ = createEffect( () => this.actions$.pipe(
    ofType(ExpenseActions.ExpenseActionstypes.LOAD_EXPENSE_SUPPLIERS),
    exhaustMap((action: any) => {
      return this.expenseService.getExpenseSuppliers().pipe(
        map((resp: any) => {
          console.log('Expense Suppliers');
          console.log(resp);
          if(resp.success) {

            return ExpenseActions.loadExpenseSuppliersSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return ExpenseActions.loadExpenseSuppliersFailure(
              {
                action: 'Load Expense Suppliers',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(ExpenseActions.loadExpenseSuppliersFailure(
          {
            action: 'Load Expense Suppliers',
            error: err
          }
        )))
      )
    })
  ));

  addExpenseSupplier$ = createEffect( () => this.actions$.pipe(
    ofType(ExpenseActions.ExpenseActionstypes.ADD_EXPENSE_SUPPLIER),
    exhaustMap((action: any) => {
      return this.expenseService.addExpenseSupplier(action.data).pipe(
        map((resp: any) => {
          console.log('Expense Supplier');
          console.log(resp);
          if(resp.success) {
            return ExpenseActions.addExpenseSupplierSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return ExpenseActions.addExpenseSupplierFailure(
              {
                action: 'add Expense Supplier',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(ExpenseActions.addExpenseSupplierFailure(
          {
            action: 'add Expense Supplier',
            error: err
          }
        )))
      )
    })
  ));

  updateExpenseSupplier$ = createEffect( () => this.actions$.pipe(
    ofType(ExpenseActions.ExpenseActionstypes.UPDATE_EXPENSE_SUPPLIER),
    exhaustMap((action: any) => {
      return this.expenseService.updateExpenseSupplier(action.data, action.uuid).pipe(
        map((resp: any) => {
          console.log('Expense Supplier');
          console.log(resp);
          if(resp.success) {
            return ExpenseActions.updateExpenseSupplierSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return ExpenseActions.updateExpenseSupplierFailure(
              {
                action: 'update Expense Supplier',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(ExpenseActions.updateExpenseSupplierFailure(
          {
            action: 'update Expense Supplier',
            error: err
          }
        )))
      )
    })
  ));

  deleteExpenseNature$ = createEffect( () => this.actions$.pipe(
    ofType(ExpenseActions.ExpenseActionstypes.DELETE_EXPENSE_NATURE),
    exhaustMap((action: any) => {
      return this.expenseService.deleteExpenseNature(action.data).pipe(
        map((resp: any) => {
          console.log('Delete Expense Nature');
          console.log(resp);
          if(resp.success) {
            return ExpenseActions.deleteExpenseNatureSuccess({data: action.data})
          } else {
            this._toast.error('une erreur est survenue!');
            return ExpenseActions.deleteExpenseNatureFailure(
              {
                action: 'Delete Expense Nature',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(ExpenseActions.deleteExpenseNatureFailure(
          {
            action: 'Delete Expense Nature',
            error: err
          }
        )))
      )
    })
  ));

  deleteExpenseSupplier$ = createEffect( () => this.actions$.pipe(
    ofType(ExpenseActions.ExpenseActionstypes.DELETE_EXPENSE_SUPPLIER),
    exhaustMap((action: any) => {
      return this.expenseService.deleteExpenseSupplier(action.data).pipe(
        map((resp: any) => {
          console.log('Delete Expense Supplier');
          console.log(resp);
          if(resp.success) {
            return ExpenseActions.deleteExpenseSupplierSuccess({data: action.data})
          } else {
            this._toast.error('une erreur est survenue!');
            return ExpenseActions.deleteExpenseSupplierFailure(
              {
                action: 'Delete Expense Supplier',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(ExpenseActions.deleteExpenseSupplierFailure(
          {
            action: 'Delete Expense Supplier',
            error: err
          }
        )))
      )
    })
  ));


}
