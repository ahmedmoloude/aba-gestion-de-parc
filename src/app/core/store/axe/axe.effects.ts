import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import {
  addAxe,
  addAxeSuccess,
  updateAxe,
  updateAxeSuccess,
  deleteAxe,
  deleteAxeSuccess,
  fetchAxe,
  fetchAxeSuccess,
  AxeActionFailure,
} from './axe.action';
import { ParametreService } from 'app/core/services/parametre.service';

@Injectable()
export class AxeEffects {
  constructor(
    private actions$: Actions,
    private parameterService: ParametreService,
    private _toast: ToastService 
  ) {}

  getListAxe$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchAxe),
      switchMap(() => {
        return this.parameterService.getAllAxe().pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store axe get",  res)
              const payload = res.response;
              return fetchAxeSuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return AxeActionFailure({
                action: 'Fetching Axe',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              AxeActionFailure({
                action: 'Fetching contacts',
                error,
              })
            );
          })
        );
      })
    );
  });

  createNewAxe$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addAxe),
      switchMap(({ data }) => {
        return this.parameterService.addAxe(data).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store Axe add",  res)
              const payload = res.response;
              this._toast.success('Axe ajouté avec succès !');
              return addAxeSuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return AxeActionFailure({
                action: 'Add new Axe',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              AxeActionFailure({ action: 'Add new Axe', error })
            );
          })
        );
      })
    );
  });

  updateAxe$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateAxe),
      switchMap(({data, uuid}) => {
        return this.parameterService.updateAxe(data).pipe(
          map((res: any) => {
            if (res.success) {
              console.log("uuid store", uuid)
              console.log("store Axe update",  res.response)
              const payload = res.response;
              this._toast.success('Axe modifié avec succès !');
              return updateAxeSuccess({ payload, uuid });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return AxeActionFailure({
                action: 'Update Axe',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              AxeActionFailure({ action: 'Update contact', error })
            );
          })
        );
      })
    );
  });

}
