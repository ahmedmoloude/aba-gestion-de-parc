import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import {
  addparc,
  addparcuccess,
  fetchparc,
  fetchparcSuccess,
  parcActionFailure,
} from './parc.actions';
import { VehiculeService } from 'app/core/services/vehicule.service';

@Injectable()
export class parcEffects {
  constructor(
    private actions$: Actions,
    private vehiculeService: VehiculeService,
    private _toast: ToastService // private _navigationHelper: NavigationHelper
  ) {}

  getListparc$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchparc),
      switchMap(() => {
        return this.vehiculeService.getParc().pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store parc get",  res)
              const payload = res.response;
              return fetchparcSuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              console.log("store parc error",  res)
              return parcActionFailure({
                action: 'Fetching parc',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              parcActionFailure({
                action: 'Fetching parc',
                error,
              })
            );
          })
        );
      })
    );
  });

  createNewparc$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addparc),
      switchMap(({ data }) => {
        return this.vehiculeService.addParc(data).pipe(
          map((res: any) => {
            if (res.success) {
              console.log("store parc add",  res)
              const payload = res.response;
              this._toast.success('parc ajouté avec succès !');
              return addparcuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return parcActionFailure({
                action: 'Add new parc',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              parcActionFailure({ action: 'Add new parc', error })
            );
          })
        );
      })
    );
  });

}
