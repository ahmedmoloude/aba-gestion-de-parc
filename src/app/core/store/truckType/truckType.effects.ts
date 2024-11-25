import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import {
  addtruckType,
  addtruckTypesuccess,
  updatetruckType,
  updatetruckTypesuccess,
  deletetruckType,
  deletetruckTypesuccess,
  fetchtruckTypes,
  fetchtruckTypesSuccess,
  truckTypeActionFailure,
} from './truckType.actions';
import { VehiculeService } from 'app/core/services/vehicule.service';

@Injectable()
export class truckTypeEffects {
  constructor(
    private actions$: Actions,
    private vehiculeService: VehiculeService,
    private _toast: ToastService // private _navigationHelper: NavigationHelper
  ) {}

  getListtruckType$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchtruckTypes),
      switchMap(() => {
        return this.vehiculeService.getTruckType().pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store truckType get",  res)
              const payload = res.response;
              return fetchtruckTypesSuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return truckTypeActionFailure({
                action: 'Fetching truckType',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              truckTypeActionFailure({
                action: 'Fetching truckType',
                error,
              })
            );
          })
        );
      })
    );
  });

  createNewtruckType$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addtruckType),
      switchMap(({ data }) => {
        return this.vehiculeService.addTruckType(data).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store truckType add",  res)
              const payload = res.response;
              this._toast.success('truckType ajouté avec succès !');
              return addtruckTypesuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return truckTypeActionFailure({
                action: 'Add new truckType',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              truckTypeActionFailure({ action: 'Add new truckType', error })
            );
          })
        );
      })
    );
  });

  updatetruckType$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updatetruckType),
      switchMap(({data, uuid }) => {
        return this.vehiculeService.editTruckType(data, uuid).pipe(
          map((res: any) => {
            // console.log(data, uuid)
            if (res.success) {
              // console.log("store truckType update",  res)
              const payload = res.response;
              // console.log("payload", payload)
              this._toast.success('truckType modifié avec succès !');
              return updatetruckTypesuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return truckTypeActionFailure({
                action: 'Update truckType',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              truckTypeActionFailure({ action: 'Update truckType', error })
            );
          })
        );
      })
    );
  });

  deletetruckType$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deletetruckType),
      switchMap(({ uuid }) => {
        return this.vehiculeService.deletTruckType(uuid).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("===== delete",res)
              this._toast.success('truckType supprimé avec succès !');
              return deletetruckTypesuccess({ uuid });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return truckTypeActionFailure({
                action: 'Delete truckType',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              truckTypeActionFailure({ action: 'Delete truckType', error })
            );
          })
        );
      })
    );
  });
}
