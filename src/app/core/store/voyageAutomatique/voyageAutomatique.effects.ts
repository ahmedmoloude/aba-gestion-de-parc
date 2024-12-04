import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  addVoyageAutomatique,
  addVoyageAutomatiqueuccess,
  updateVoyageAutomatique,
  updateVoyageAutomatiqueuccess,
  deleteVoyageAutomatique,
  deleteVoyageAutomatiqueuccess,
  fetchVoyageAutomatique,
  fetchVoyageAutomatiqueSuccess,
  VoyageAutomatiqueActionFailure,
} from './voyageAutomatique.actions';
import { ToastService } from 'app/services';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';

@Injectable()
export class VoyageAutomatiqueEffects {
  constructor(
    private actions$: Actions,
    private boGridService: BoGridService,
    private _toast: ToastService // private _navigationHelper: NavigationHelper
  ) {}

  getListVoyage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchVoyageAutomatique),
      switchMap(() => {
        return this.boGridService.allPlanifiedCovoyage().pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store voyage get",  res)
              const payload = res.response;
              return fetchVoyageAutomatiqueSuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return VoyageAutomatiqueActionFailure({
                action: 'Fetching Voyage Automatiques',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
                VoyageAutomatiqueActionFailure({
                action: 'Fetching Voyage Automatiques',
                error,
              })
            );
          })
        );
      })
    );
  });

  createNewVoyage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addVoyageAutomatique),
      switchMap(({ data }) => {
        return this.boGridService.addPlanifiedCovoyage(data).pipe(
          map((res: any) => {
            if (res.success) {
               console.log("store voyage add",  res)
              const payload = res.response.data;
              this._toast.success('Voyage Automatique ajouté avec succès !');
              return addVoyageAutomatiqueuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return VoyageAutomatiqueActionFailure({
                action: 'Add new Voyage Automatique',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
                VoyageAutomatiqueActionFailure({ action: 'Add new Voyage Automatique', error })
            );
          })
        );
      })
    );
  });

  updateVoyage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateVoyageAutomatique),
      switchMap(({data, uuid }) => {
        return this.boGridService.updatePlanifiedCovoyage(data, uuid).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store Voyage Automatique update",  res)
              const payload = res.response.data;
              this._toast.success('Voyage Automatique modifié avec succès !');
              return updateVoyageAutomatiqueuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return VoyageAutomatiqueActionFailure({
                action: 'Update Voyage Automatique',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
                VoyageAutomatiqueActionFailure({ action: 'Update Voyage Automatique', error })
            );
          })
        );
      })
    );
  });

  deleteVoyage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteVoyageAutomatique),
      switchMap(({ uuid }) => {
        return this.boGridService.deletePlanifiedCovoyage(uuid).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("===== delete",res)
              this._toast.success('Voyage Automatique supprimé avec succès !');
              return deleteVoyageAutomatiqueuccess({ uuid });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return VoyageAutomatiqueActionFailure({
                action: 'Delete Voyage Automatique',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              VoyageAutomatiqueActionFailure({ action: 'Delete Voyage Automatique', error })
            );
          })
        );
      })
    );
  });
}
