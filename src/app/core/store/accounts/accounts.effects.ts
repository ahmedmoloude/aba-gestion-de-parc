import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import {
  addAccount,
  addAccountSuccess,
  deleteAccount,
  deleteAccountSuccess,
  accountActionFailure,
  fetchAccounts,
  fetchAccountsSuccess,
  updateAccount,
  updateAccountSuccess,
} from './accounts.actions';
import { BoAccountService } from 'app/core/services/admin-bo/bo-accounts.service';

@Injectable()
export class AccountsEffects {
  constructor(
    private actions$: Actions,
    private boAccountService: BoAccountService,
    private _toast: ToastService
  ) { }

  getListAccounts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchAccounts),
      switchMap(() => {
        return this.boAccountService.fetchListAccounts().pipe(
          map((res: any) => {
            if (res.success) {
              const payload = res.response.users;
              return fetchAccountsSuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return accountActionFailure({
                action: 'Fetching accounts',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              accountActionFailure({ action: 'Fetching accounts', error })
            );
          })
        );
      })
    );
  });

  createNewAccount$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addAccount),
      switchMap(({ data }) => {
        return this.boAccountService.addAccount(data).pipe(
          map((res: any) => {
            if (res.success) {
              const payload = res.response.user;
              this._toast.success('Compte ajouté avec succès !');
              return addAccountSuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return accountActionFailure({
                action: 'Add new account',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              accountActionFailure({ action: 'Add new account', error })
            );
          })
        );
      })
    );
  });

  updateAccount$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateAccount),
      switchMap(({ uuid, data }) => {
        return this.boAccountService.updateAccount(uuid, data).pipe(
          map((res: any) => {
            if (res.success) {
              const payload = res.response.user;
              this._toast.success('Compte modifié avec succès !');
              return updateAccountSuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return accountActionFailure({
                action: 'Update account',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              accountActionFailure({ action: 'Update account', error })
            );
          })
        );
      })
    );
  });

  deleteAccount$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteAccount),
      switchMap(({ uuid }) => {
        return this.boAccountService.deleteAccount(uuid).pipe(
          map((res: any) => {
            if (res.success) {
              this._toast.success('Compte supprimé avec succès !');
              return deleteAccountSuccess({ uuid });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return accountActionFailure({
                action: 'Delete account',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              accountActionFailure({ action: 'Delete account', error })
            );
          })
        );
      })
    );
  });
}
