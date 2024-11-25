import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import * as CustomerActions from './customer.actions';
import { CustomerService } from 'app/core/services/facturation/customer.service';
import { AccountCustomersResponse } from 'app/core/models/facturation/response-data.model';



@Injectable()
export class CustomerEffects {
  constructor(
    private actions$: Actions,
    private boGridService: BoGridService,
    private customerservice: CustomerService,
    private _toast: ToastService // private _navigationHelper: NavigationHelper
  ) {}

  getListCustomers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CustomerActions.fetchCustomer),
      switchMap(() => {
        return this.boGridService.getCustomer().pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store customer get",  res.response.data)
              const payload = res.response.data;
              return CustomerActions.fetchCustomerSuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return CustomerActions.customerActionFailure({
                action: 'Fetching contacts',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              CustomerActions.customerActionFailure({
                action: 'Fetching contacts',
                error,
              })
            );
          })
        );
      })
    );
  });


  loadAccountsCustomers$ = createEffect(() => this.actions$.pipe(
    ofType(CustomerActions.Customeractionstypes.LOAD_ACCOUNT_CUSTOMERS),
    exhaustMap(() => {
      return this.customerservice.getAccountCustomers()
      .pipe(
        map((resp: AccountCustomersResponse) => {
          if (resp.success) {
            return CustomerActions.loadAccountCustomersSuccess({payload: resp.response});
          } else {
            this._toast.error('Une Erreur est survenu !');
              return CustomerActions.loadAccountCustomersFailure({
                action: 'load customers Failure',
                error: resp.message,
              });
          }

        }),
        catchError((error) => of(CustomerActions.loadAccountCustomersFailure(error)))
      )})
    )
  );

  loadUnpaidCustomers$ = createEffect(() => this.actions$.pipe(
    ofType(CustomerActions.Customeractionstypes.LOAD_UNPAID_CUSTOMERS),
    exhaustMap(() => {
      return this.customerservice.getUnpaidCustomers()
      .pipe(
        map((resp: AccountCustomersResponse) => {
          if (resp.success) {
            return CustomerActions.loadUnpaidCustomersSuccess({payload: resp.response});
          } else {
            this._toast.error('Une Erreur est survenu !');
              return CustomerActions.loadUnpaidCustomersFailure({
                action: 'load unpaid customers Failure',
                error: resp.message,
              });
          }

        }),
        catchError((error) => of(CustomerActions.loadAccountCustomersFailure({
          action: 'load unpaid customers Failure',
          error: error,
        })))
      )})
    )
  );

}
