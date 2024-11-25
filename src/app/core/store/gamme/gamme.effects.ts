import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import {
  addgamme,
  addgammesuccess,
  updategamme,
  updategammesuccess,
  deletegamme,
  deletegammesuccess,
  fetchgammes,
  fetchgammesSuccess,
  gammeActionFailure,
} from './gamme.actions';
import { VehiculeService } from 'app/core/services/vehicule.service';

@Injectable()
export class gammeEffects {
  constructor(
    private actions$: Actions,
    private vehiculeService: VehiculeService,
    private _toast: ToastService // private _navigationHelper: NavigationHelper
  ) {}

  getListgamme$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchgammes),
      switchMap(() => {
        return this.vehiculeService.getGamme().pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store gamme get",  res)
              const payload = res.response;
              return fetchgammesSuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return gammeActionFailure({
                action: 'Fetching gamme',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              gammeActionFailure({
                action: 'Fetching gamme',
                error,
              })
            );
          })
        );
      })
    );
  });

  createNewgamme$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addgamme),
      switchMap(({ data }) => {
        return this.vehiculeService.addGamme(data).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store gamme add",  res)
              const payload = res.response;
              this._toast.success('Gamme ajouté avec succès !');
              return addgammesuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return gammeActionFailure({
                action: 'Add new gamme',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              gammeActionFailure({ action: 'Add new gamme', error })
            );
          })
        );
      })
    );
  });

  updategamme$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updategamme),
      switchMap(({data, uuid }) => {
        return this.vehiculeService.editGamme(data, uuid).pipe(
          map((res: any) => {
            // console.log(data, uuid)
            if (res.success) {
              // console.log("store gamme update",  res)
              const payload = res.response;
              // console.log("payload", payload)
              this._toast.success('Gamme modifié avec succès !');
              return updategammesuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return gammeActionFailure({
                action: 'Update gamme',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              gammeActionFailure({ action: 'Update gamme', error })
            );
          })
        );
      })
    );
  });

  deletegamme$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deletegamme),
      switchMap(({ uuid }) => {
        return this.vehiculeService.deletGamme(uuid).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("===== delete",res)
              this._toast.success('Gamme supprimé avec succès !');
              return deletegammesuccess({ uuid });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return gammeActionFailure({
                action: 'Delete gamme',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              gammeActionFailure({ action: 'Delete gamme', error })
            );
          })
        );
      })
    );
  });
}
