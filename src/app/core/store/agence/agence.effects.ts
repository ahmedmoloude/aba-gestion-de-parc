import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import {
  addAgence,
  addAgenceuccess,
  updateAgence,
  updateAgenceuccess,
  deleteAgence,
  deleteAgenceuccess,
  fetchAgence,
  fetchAgenceSuccess,
  AgenceActionFailure,
} from './agence.actions';
import { ParametreService } from 'app/core/services/parametre.service';

@Injectable()
export class AgenceEffects {
  constructor(
    private actions$: Actions,
    private parameterService: ParametreService,
    private _toast: ToastService // private _navigationHelper: NavigationHelper
  ) {}

  getListAgence$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchAgence),
      switchMap(() => {
        return this.parameterService.allAgence().pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store agence get",  res)
              const payload = res.response;
              return fetchAgenceSuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return AgenceActionFailure({
                action: 'Fetching agence',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              AgenceActionFailure({
                action: 'Fetching contacts',
                error,
              })
            );
          })
        );
      })
    );
  });

  createNewAgence$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addAgence),
      switchMap(({ data }) => {
        return this.parameterService.addAgence(data).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store agence add",  res)
              const payload = res.response;
              this._toast.success('Agence ajouté avec succès !');
              return addAgenceuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return AgenceActionFailure({
                action: 'Add new agence',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              AgenceActionFailure({ action: 'Add new agence', error })
            );
          })
        );
      })
    );
  });

  updateAgence$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateAgence),
      switchMap(({data }) => {
        return this.parameterService.updateAgence(data).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store agence update",  res)
              const payload = res.response;
              this._toast.success('Agence modifié avec succès !');
              return updateAgenceuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return AgenceActionFailure({
                action: 'Update agence',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              AgenceActionFailure({ action: 'Update contact', error })
            );
          })
        );
      })
    );
  });

  deleteAgence$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteAgence),
      switchMap(({ uuid }) => {
        return this.parameterService.deleteAgence(uuid).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("===== delete",res)
              this._toast.success('Agence supprimé avec succès !');
              return deleteAgenceuccess({ uuid });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return AgenceActionFailure({
                action: 'Delete agence',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              AgenceActionFailure({ action: 'Delete contact', error })
            );
          })
        );
      })
    );
  });
}
