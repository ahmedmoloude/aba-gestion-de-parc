import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import {
  addbrand,
  addbrandsuccess,
  updatebrand,
  updatebrandsuccess,
  deletebrand,
  deletebrandsuccess,
  fetchbrands,
  fetchbrandsSuccess,
  brandActionFailure,
} from './brand.actions';
import { VehiculeService } from 'app/core/services/vehicule.service';

@Injectable()
export class brandEffects {
  constructor(
    private actions$: Actions,
    private vehiculeService: VehiculeService,
    private _toast: ToastService // private _navigationHelper: NavigationHelper
  ) {}

  getListbrand$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchbrands),
      switchMap(() => {
        return this.vehiculeService.getBrand().pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store brand get",  res)
              const payload = res.response;
              return fetchbrandsSuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return brandActionFailure({
                action: 'Fetching brand',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              brandActionFailure({
                action: 'Fetching brand',
                error,
              })
            );
          })
        );
      })
    );
  });

  createNewbrand$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addbrand),
      switchMap(({ data }) => {
        return this.vehiculeService.addBrand(data).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store brand add",  res)
              const payload = res.response;
              this._toast.success('brand ajouté avec succès !');
              return addbrandsuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return brandActionFailure({
                action: 'Add new brand',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              brandActionFailure({ action: 'Add new brand', error })
            );
          })
        );
      })
    );
  });

  updatebrand$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updatebrand),
      switchMap(({data, uuid }) => {
        return this.vehiculeService.editBrand(data, uuid).pipe(
          map((res: any) => {
            // console.log(data, uuid)
            if (res.success) {
              // console.log("store brand update",  res)
              const payload = res.response;
              // console.log("payload", payload)
              this._toast.success('brand modifié avec succès !');
              return updatebrandsuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return brandActionFailure({
                action: 'Update brand',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              brandActionFailure({ action: 'Update brand', error })
            );
          })
        );
      })
    );
  });

  deletebrand$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deletebrand),
      switchMap(({ uuid }) => {
        return this.vehiculeService.deletBrand(uuid).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("===== delete",res)
              this._toast.success('brand supprimé avec succès !');
              return deletebrandsuccess({ uuid });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return brandActionFailure({
                action: 'Delete brand',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              brandActionFailure({ action: 'Delete brand', error })
            );
          })
        );
      })
    );
  });
}
