import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import {
  addVehicule,
  addVehiculesuccess,
  updateVehicule,
  updateVehiculesuccess,
  deleteVehicule,
  deleteVehiculesuccess,
  fetchVehicules,
  fetchVehiculesSuccess,
  VehiculeActionFailure,
} from './vehicule.actions';
import { VehiculeService } from 'app/core/services/vehicule.service';
import { Router } from '@angular/router';
import { AppState } from '../app.states';
import { Store } from '@ngrx/store';
import { updatePagination } from '../pagination/pagination.actions';

@Injectable()
export class VehiculeEffects {
  constructor(
    private _router: Router,
    private actions$: Actions,
    private vehiculeService: VehiculeService,
    private _toast: ToastService ,// private _navigationHelper: NavigationHelper,
    private store : Store<AppState>
  ) {}

  getListVehicule$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchVehicules),
      switchMap((action: any) => {
        return this.vehiculeService.getTruck(action.data, action.per_page , action.page).pipe(
          map((res: any) => {
            if (res.success) {
              this.store.dispatch(updatePagination({
                currentPage: res.response.current_page,
                pageSize: res.response.per_page,
                totalItems: res.response.total
               }));
              // console.log("store vehicule get",  res)
              const payload = res.response;
              return fetchVehiculesSuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return VehiculeActionFailure({
                action: 'Fetching Vehicule',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
                VehiculeActionFailure({
                action: 'Fetching Vehicule',
                error,
              })
            );
          })
        );
      })
    );
  });

  createNewVehicule$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addVehicule),
      switchMap(({ data }) => {
        return this.vehiculeService.addTruck(data).pipe(
          map((res: any) => {
            if (res.success) {
              console.log("store Vehicule add",  res)
              const payload = res.response;
              console.log("payload add vehicule", payload)
              this._toast.success('Vehicule ajouté avec succès !');
              this._router.navigate([`detailsvehicules/${payload.uuid}`]);
              return addVehiculesuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return VehiculeActionFailure({
                action: 'Add new Vehicule',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            console.log(error)
            this._toast.error('Une Erreur est survenu !');
            return of(
                VehiculeActionFailure({ action: 'Add new Vehicule', error })
            );
          })
        );
      })
    );
  });

  updateVehicule$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateVehicule),
      switchMap(({data, uuid }) => {
        return this.vehiculeService.editTruck(data, uuid).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store Vehicule update",  res)
              const payload = res.response;
              this._toast.success('Vehicule modifié avec succès !');
              return updateVehiculesuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return VehiculeActionFailure({
                action: 'Update Vehicule',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              VehiculeActionFailure({ action: 'Update Vehicule', error })
            );
          })
        );
      })
    );
  });

  deleteVehicule$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteVehicule),
      switchMap(({ uuid }) => {
        return this.vehiculeService.deletTruck(uuid).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("===== delete",res)
              this._toast.success('Vehicule supprimé avec succès !');
              return deleteVehiculesuccess({ uuid });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return VehiculeActionFailure({
                action: 'Delete Vehicule',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              VehiculeActionFailure({ action: 'Delete Vehicule', error })
            );
          })
        );
      })
    );
  });
}
