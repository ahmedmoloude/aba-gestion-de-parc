import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import {
  addremplacement,
  addremplacementsuccess,
  updateremplacement,
  updateremplacementsuccess,
  deleteremplacement,
  deleteremplacementsuccess,
  fetchremplacements,
  fetchremplacementsSuccess,
  remplacementActionFailure,
} from './remplacement.actions';
import { VehiculeService } from 'app/core/services/vehicule.service';

@Injectable()
export class RemplacementEffects {
  constructor(
    private actions$: Actions,
    private vehiculeService: VehiculeService,
    private _toast: ToastService // private _navigationHelper: NavigationHelper
  ) {}

  getListExtincteur$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchremplacements),
      switchMap(() => {
        return this.vehiculeService.getRemplacement().pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store remplacement get",  res)
              const payload = res.response;
              return fetchremplacementsSuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return remplacementActionFailure({
                action: 'Fetching Extincteur',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              remplacementActionFailure({
                action: 'Fetching Extincteur',
                error,
              })
            );
          })
        );
      })
    );
  });

  createNewContact$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addremplacement),
      switchMap(({ data }) => {
        return this.vehiculeService.addRemplacement(data).pipe(
          map((res: any) => {
            if (res.success) {
              console.log("store remplacement add",  res)
              const payload = res.response;
              this._toast.success('Véhicule remplacé avec succès !');
              return addremplacementsuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return remplacementActionFailure({
                action: 'Add new contact',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              remplacementActionFailure({ action: 'Add new contact', error })
            );
          })
        );
      })
    );
  });

}