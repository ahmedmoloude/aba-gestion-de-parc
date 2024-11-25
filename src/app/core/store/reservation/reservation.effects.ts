import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ROUTES, Router } from '@angular/router';
import { ToastService } from 'app/core/services/toast.service';
import { NavigationHelper } from 'app/core/helpers/navigation.helper';
import {
  addDemande,
  addDemandeSuccess,
  getDemandes,
  getDemandesSuccess,
  getReservationFailure,
  getVehicules,
  getVehiculesSuccess,
  reservationInit,
  successfulAction,
  updateDemande,
} from './reservation.actions';
import { VehiculeService } from 'app/core/services/vehicule.service';
import { AffretementService } from 'app/core/services/affretement.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.states';
import { Action } from 'rxjs/internal/scheduler/Action';

@Injectable()
export class ReservationEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private _toast: ToastService,
    private _navigationHelper: NavigationHelper,
    private vehiculeService: VehiculeService,
    private affretementService: AffretementService,
    private store: Store<AppState>
  ) {}

  getAllVehicules$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getVehicules),
      switchMap(() => {
        return this.affretementService.getListVehiculesType().pipe(
          map((res: any) => {
            if (res.success) {
              return getVehiculesSuccess({ vehicules: res.response });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return;
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              getReservationFailure({ action: getVehicules.type, error })
            );
          })
        );
      })
    );
  });

  getAllDemandes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getDemandes),
      switchMap(() => {
        return this.affretementService.list().pipe(
          map((res: any) => {
            if (res.success) {
              this._toast.success('Demandes fetched avec succès !');
              console.log(res.response);
              return getDemandesSuccess({ demandes: res.response });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return;
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              getReservationFailure({ action: getDemandes.type, error })
            );
          })
        );
      })
    );
  });

  addDemande$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addDemande),
      switchMap((action) => {
        return this.affretementService.create(action.data).pipe(
          map((res: any) => {
            if (res.success) {
              this._toast.success('Reservation ajoutée avec succès !');
              console.log('response', res);

              this.store.dispatch(reservationInit());
              this.router.navigate(['/listeclients']);
              //this._navigationHelper.navigate(ROUTES['listeclients'].name);
              return addDemandeSuccess({ demande: res.response });
              //return successfulAction;
            } else {
              this._toast.error('Une Erreur est survenu !');
              return;
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              getReservationFailure({ action: getDemandes.type, error })
            );
          })
        );
      })
    );
  });


  upadateDemande$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateDemande),
      switchMap((action) => {
        return this.affretementService.updateDemande(action.data , action.uuid).pipe(
          map((res: any) => {
            if (res.success) {
              this._toast.success('Reservation modifier avec succès !');
              this.store.dispatch(reservationInit());
              this.router.navigate(['/listeclients']);
              return addDemandeSuccess({ demande: res.response });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return;
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              getReservationFailure({ action: getDemandes.type, error })
            );
          })
        );
      })
    );
  });
}
