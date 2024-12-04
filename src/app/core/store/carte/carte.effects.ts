import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import {
  addcarte,
  addcartesuccess,
  updatecarte,
  updatecartesuccess,
  deletecarte,
  deletecartesuccess,
  fetchcartes,
  fetchcartesSuccess,
  carteActionFailure,
} from './carte.actions';
import { VehiculeService } from 'app/core/services/vehicule.service';

@Injectable()
export class carteEffects {
  constructor(
    private actions$: Actions,
    private vehiculeService: VehiculeService,
    private _toast: ToastService // private _navigationHelper: NavigationHelper
  ) {}

  getListcarte$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchcartes),
      switchMap(() => {
        return this.vehiculeService.getCarte().pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store carte get",  res)
              const payload = res.response;
              return fetchcartesSuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return carteActionFailure({
                action: 'Fetching carte',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              carteActionFailure({
                action: 'Fetching carte',
                error,
              })
            );
          })
        );
      })
    );
  });

  createNewCarte$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addcarte),
      switchMap(({ data }) => {
        return this.vehiculeService.addCarte(data).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store carte add",  res)
              const payload = res.response;
              this._toast.success('carte ajouté avec succès !');
              return addcartesuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return carteActionFailure({
                action: 'Add new Carte',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              carteActionFailure({ action: 'Add new Carte', error })
            );
          })
        );
      })
    );
  });

  updateCarte$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updatecarte),
      switchMap(({data, uuid }) => {
        return this.vehiculeService.updateCarte(data, uuid).pipe(
          map((res: any) => {
            // console.log(data, uuid)
            if (res.success) {
              // console.log("store carte update",  res)
              const payload = res.response;
              // console.log("payload", payload)
              this._toast.success('Carte modifié avec succès !');
              return updatecartesuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return carteActionFailure({
                action: 'Update Carte',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              carteActionFailure({ action: 'Update Carte', error })
            );
          })
        );
      })
    );
  });

  deleteCarte$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deletecarte),
      switchMap(({ uuid }) => {
        return this.vehiculeService.deletCarte(uuid).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("===== delete",res)
              this._toast.success('Carte supprimé avec succès !');
              return deletecartesuccess({ uuid });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return carteActionFailure({
                action: 'Delete Carte',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              carteActionFailure({ action: 'Delete Carte', error })
            );
          })
        );
      })
    );
  });
}
