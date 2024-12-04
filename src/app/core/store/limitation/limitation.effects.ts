import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
// import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  addLimitation,
  addLimitationuccess,
  updateLimitation,
  updateLimitationuccess,
  deleteLimitation,
  deleteLimitationuccess,
  fetchLimitation,
  fetchLimitationSuccess,
  limitationActionFailure,
} from './limitation.actions';
import { ParametreService } from 'app/core/services/parametre.service';

@Injectable()
export class LimitationsEffects {
  constructor(
    // public dialogRef: MatDialogRef<IntervallesDialogComponent>,
    private actions$: Actions,
    private parameterService: ParametreService,
    private _toast: ToastService // private _navigationHelper: NavigationHelper
  ) {}

  getListLimitations$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchLimitation),
      switchMap(() => {
        return this.parameterService.getLimitation().pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store Limitation get",  res)
              const payload = res.response;
              return fetchLimitationSuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return limitationActionFailure({
                action: 'Fetching Limitations',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              limitationActionFailure({
                action: 'Fetching Limitations',
                error,
              })
            );
          })
        );
      })
    );
  });

  createNewLimitation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addLimitation),
      switchMap(({ data }) => {
        return this.parameterService.addLimitation(data).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store Limitation add",  res)
              const payload = res.response;
              console.log("store Limitation add payload",  payload)
              this._toast.success('Limitation ajouté avec succès !');
              // this.dialogRef.close();
              return addLimitationuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return limitationActionFailure({
                action: 'Add new Limitation',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              limitationActionFailure({ action: 'Add new Limitation', error })
            );
          })
        );
      })
    );
  });

  deleteLimitation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteLimitation),
      switchMap(({ uuid }) => {
        return this.parameterService.DeleteLimitation(uuid).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("===== delete",res)
              this._toast.success('Intervalle de valeur supprimé avec succès !');
              return deleteLimitationuccess({ uuid });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return limitationActionFailure({
                action: 'Delete Intervalle de valeur',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              limitationActionFailure({ action: 'Delete Intervalle de valeur', error })
            );
          })
        );
      })
    );
  });

  
  updateLimitation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateLimitation),
      switchMap(({data, uuid }) => {
        return this.parameterService.updateLimitation(data, uuid).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store Intervalle de valeur update",  res)
              const payload = res.response;
              this._toast.success('Intervalle de valeur modifié avec succès !');
              return updateLimitationuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return limitationActionFailure({
                action: 'Update Intervalle de valeur',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              limitationActionFailure({ action: 'Update Intervalle de valeur', error })
            );
          })
        );
      })
    );
  });

}