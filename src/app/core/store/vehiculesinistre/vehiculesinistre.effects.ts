import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import {
  addVehiculeSinistres,
  addVehiculeSinistresuccess,
  updateVehiculeSinistres,
  updateVehiculeSinistresuccess,
  deleteVehiculeSinistres,
  deleteVehiculeSinistresuccess,
  fetchVehiculeSinistres,
  fetchVehiculeSinistresSuccess,
  VehiculeSinistresActionFailure,
} from './vehiculesinistre.actions';
import { VehiculeService } from 'app/core/services/vehicule.service';
import { Router } from '@angular/router';

@Injectable()
export class VehiculeSinistreEffects {
  constructor(
    private _router: Router,
    private actions$: Actions,
    private vehiculeService: VehiculeService,
    private _toast: ToastService // private _navigationHelper: NavigationHelper
  ) {}

  getListVehicule$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchVehiculeSinistres),
      switchMap(() => {
        return this.vehiculeService.getTruckSinistre().pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store vehicule sinistre get",  res)
              const payload = res.response;
              return fetchVehiculeSinistresSuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return VehiculeSinistresActionFailure({
                action: 'Fetching Vehicule',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              VehiculeSinistresActionFailure({
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
      ofType(addVehiculeSinistres),
      switchMap(({ data }) => {
        console.log("data store", data)
        return this.vehiculeService.addTruckSinistre(data).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store Vehicule sinistre add",  res.response)
              const payload = res.response;
              // console.log("payload add vehicule sinistre", payload)
              this._toast.success('Sinistre ajouté avec succès !');
              return addVehiculeSinistresuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return VehiculeSinistresActionFailure({
                action: 'Add new Vehicule',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              VehiculeSinistresActionFailure({ action: 'Add new Vehicule', error })
            );
          })
        );
      })
    );
  });

//   updateVehicule$ = createEffect(() => {
//     return this.actions$.pipe(
//       ofType(updateVehicule),
//       switchMap(({data, uuid }) => {
//         return this.vehiculeService.editVehicule(data, uuid).pipe(
//           map((res: any) => {
//             if (res.success) {
//               // console.log("store Vehicule update",  res)
//               const payload = res.response.data;
//               this._toast.success('Vehicule modifié avec succès !');
//               return updateVehiculeuccess({ payload });
//             } else {
//               this._toast.error('Une Erreur est survenu !');
//               return VehiculeDocumentsActionFailure({
//                 action: 'Update Vehicule',
//                 error: res.message,
//               });
//             }
//           }),
//           catchError((error) => {
//             this._toast.error('Une Erreur est survenu !');
//             return of(
//               VehiculeDocumentsActionFailure({ action: 'Update Vehicule', error })
//             );
//           })
//         );
//       })
//     );
//   });

//   deleteVehicule$ = createEffect(() => {
//     return this.actions$.pipe(
//       ofType(deleteVehicule),
//       switchMap(({ uuid }) => {
//         return this.vehiculeService.deletVehicule(uuid).pipe(
//           map((res: any) => {
//             if (res.success) {
//               // console.log("===== delete",res)
//               this._toast.success('Vehicule supprimé avec succès !');
//               return deleteVehiculeuccess({ uuid });
//             } else {
//               this._toast.error('Une Erreur est survenu !');
//               return VehiculeDocumentsActionFailure({
//                 action: 'Delete Vehicule',
//                 error: res.message,
//               });
//             }
//           }),
//           catchError((error) => {
//             this._toast.error('Une Erreur est survenu !');
//             return of(
//               VehiculeDocumentsActionFailure({ action: 'Delete Vehicule', error })
//             );
//           })
//         );
//       })
//     );
//   });
}
