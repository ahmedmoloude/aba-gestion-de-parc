import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import {
  addVehiculeContrat,
  addVehiculeContratsuccess,
  updateVehiculeContrat,
  updateVehiculeContratsuccess,
  deleteVehiculeContrat,
  deleteVehiculeContratsuccess,
  fetchVehiculeContrats,
  fetchVehiculeContratsSuccess,
  VehiculeContratActionFailure,
} from './vehiculecontrat.actions';
import { VehiculeService } from 'app/core/services/vehicule.service';
import { Router } from '@angular/router';

@Injectable()
export class VehiculeContartEffects {
  constructor(
    private _router: Router,
    private actions$: Actions,
    private vehiculeService: VehiculeService,
    private _toast: ToastService // private _navigationHelper: NavigationHelper
  ) {}

  getListVehicule$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchVehiculeContrats),
      switchMap(() => {
        return this.vehiculeService.getTruckContrat().pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store vehicule contrat get",  res)
              const payload = res.response;
              return fetchVehiculeContratsSuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return VehiculeContratActionFailure({
                action: 'Fetching Vehicule',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
                VehiculeContratActionFailure({
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
      ofType(addVehiculeContrat),
      switchMap(({ data }) => {
        return this.vehiculeService.addTruckContart(data).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store Vehicule contrat add",  res)
              const payload = res.response;
              console.log("payload add vehicule", payload)
              this._toast.success('Contrat ajouté avec succès !');
              return addVehiculeContratsuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return VehiculeContratActionFailure({
                action: 'Add new Vehicule',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
                VehiculeContratActionFailure({ action: 'Add new Vehicule', error })
            );
          })
        );
      })
    );
  });

  updateVehicule$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateVehiculeContrat),
      switchMap(({data, uuid }) => {
        return this.vehiculeService.updateTruckContart(data, uuid).pipe(
          map((res: any) => {
            if (res.success) {
              console.log("store contrat update",  res)
              const payload = res.response;
              this._toast.success('Contrat modifié avec succès !');
              return updateVehiculeContratsuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return VehiculeContratActionFailure({
                action: 'Update Vehicule',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              VehiculeContratActionFailure({ action: 'Update Vehicule', error })
            );
          })
        );
      })
    );
  });

  deleteVehicule$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteVehiculeContrat),
      switchMap(({ uuid }) => {
        return this.vehiculeService.deletTruckContart(uuid).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("===== delete",res)
              this._toast.success('Vehicule supprimé avec succès !');
              return deleteVehiculeContratsuccess({ uuid });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return VehiculeContratActionFailure({
                action: 'Delete Vehicule',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              VehiculeContratActionFailure({ action: 'Delete Vehicule', error })
            );
          })
        );
      })
    );
  });
}
