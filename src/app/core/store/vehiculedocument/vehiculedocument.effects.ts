import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import {
  addVehiculeDocuments,
  addVehiculeDocumentsuccess,
  updateVehiculeDocuments,
  updateVehiculeDocumentsuccess,
  deleteVehiculeDocuments,
  deleteVehiculeDocumentsuccess,
  fetchVehiculeDocuments,
  fetchVehiculeDocumentsSuccess,
  VehiculeDocumentsActionFailure,
} from './vehiculedocument.actions';
import { VehiculeService } from 'app/core/services/vehicule.service';
import { Router } from '@angular/router';
import { deleteVehicule, deleteVehiculesuccess, updateVehicule, updateVehiculesuccess } from '../vehicule/vehicule.actions';

@Injectable()
export class VehiculeDocumentEffects {
  constructor(
    private _router: Router,
    private actions$: Actions,
    private vehiculeService: VehiculeService,
    private _toast: ToastService // private _navigationHelper: NavigationHelper
  ) {}

  getListVehicule$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchVehiculeDocuments),
      switchMap(() => {
        return this.vehiculeService.getTruckDocument().pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store vehicule Documents get",  res)
              const payload = res.response;
              return fetchVehiculeDocumentsSuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return VehiculeDocumentsActionFailure({
                action: 'Fetching Vehicule',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              VehiculeDocumentsActionFailure({
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
      ofType(addVehiculeDocuments),
      switchMap(({ data }) => {
        return this.vehiculeService.addTruckDocument(data).pipe(
          map((res: any) => {
            if (res.success) {
              console.log("store Vehicule Documents add",  res.response)
              const payload = res.response;
              console.log("payload add vehicule Document", payload)
              this._toast.success('Document ajouté avec succès !');
              return addVehiculeDocumentsuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return VehiculeDocumentsActionFailure({
                action: 'Add new Vehicule',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            console.log("erreur store", error)
            this._toast.error('Une Erreur est survenu !');
            return of(
              VehiculeDocumentsActionFailure({ action: 'Add new Vehicule', error })
            );
          })
        );
      })
    );
  });

  updateVehiculeDocument$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateVehiculeDocuments),
      switchMap(({data, uuid }) => {
        return this.vehiculeService.updateTruckDocument(data, uuid).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store Vehicule update",  res)
              const payload = res.response;
              this._toast.success('Document modifié avec succès !');
              return updateVehiculeDocumentsuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return VehiculeDocumentsActionFailure({
                action: 'Update Vehicule Document',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              VehiculeDocumentsActionFailure({ action: 'Update Vehicule Document', error })
            );
          })
        );
      })
    );
  });

  deleteVehiculeDocument$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteVehiculeDocuments),
      switchMap(({ uuid }) => {
        return this.vehiculeService.deletTruckDocument(uuid).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("===== delete",res)
              this._toast.success('Document supprimé avec succès !');
              return deleteVehiculeDocumentsuccess({ uuid });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return VehiculeDocumentsActionFailure({
                action: 'Delete Vehicule Document',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              VehiculeDocumentsActionFailure({ action: 'Delete Vehicule Document', error })
            );
          })
        );
      })
    );
  });
}
