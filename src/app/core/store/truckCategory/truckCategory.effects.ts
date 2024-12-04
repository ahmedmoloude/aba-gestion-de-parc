import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import {
  addtruckCategory,
  addtruckCategorysuccess,
  updatetruckCategory,
  updatetruckCategorysuccess,
  deletetruckCategory,
  deletetruckCategorysuccess,
  fetchtruckCategorys,
  fetchtruckCategorysSuccess,
  truckCategoryActionFailure,
} from './truckCategory.actions';
import { VehiculeService } from 'app/core/services/vehicule.service';

@Injectable()
export class truckCategoryEffects {
  constructor(
    private actions$: Actions,
    private vehiculeService: VehiculeService,
    private _toast: ToastService // private _navigationHelper: NavigationHelper
  ) {}

  getListtruckCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchtruckCategorys),
      switchMap(() => {
        return this.vehiculeService.getTruckCategory().pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store truckCategory get",  res)
              const payload = res.response;
              return fetchtruckCategorysSuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return truckCategoryActionFailure({
                action: 'Fetching truckCategory',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              truckCategoryActionFailure({
                action: 'Fetching truckCategory',
                error,
              })
            );
          })
        );
      })
    );
  });

  createNewtruckCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addtruckCategory),
      switchMap(({ data }) => {
        return this.vehiculeService.addTruckCategory(data).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store truckCategory add",  res)
              const payload = res.response;
              this._toast.success('truckCategory ajouté avec succès !');
              return addtruckCategorysuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return truckCategoryActionFailure({
                action: 'Add new truckCategory',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              truckCategoryActionFailure({ action: 'Add new truckCategory', error })
            );
          })
        );
      })
    );
  });

  updatetruckCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updatetruckCategory),
      switchMap(({data, uuid }) => {
        return this.vehiculeService.editTruckCategory(data, uuid).pipe(
          map((res: any) => {
            // console.log(data, uuid)
            if (res.success) {
              // console.log("store truckCategory update",  res)
              const payload = res.response;
              // console.log("payload", payload)
              this._toast.success('truckCategory modifié avec succès !');
              return updatetruckCategorysuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return truckCategoryActionFailure({
                action: 'Update truckCategory',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              truckCategoryActionFailure({ action: 'Update truckCategory', error })
            );
          })
        );
      })
    );
  });

  deletetruckCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deletetruckCategory),
      switchMap(({ uuid }) => {
        return this.vehiculeService.deletTruckCategory(uuid).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("===== delete",res)
              this._toast.success('truckCategory supprimé avec succès !');
              return deletetruckCategorysuccess({ uuid });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return truckCategoryActionFailure({
                action: 'Delete truckCategory',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              truckCategoryActionFailure({ action: 'Delete truckCategory', error })
            );
          })
        );
      })
    );
  });
}
