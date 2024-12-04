import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import {
  addmodele,
  addmodelesuccess,
  updatemodele,
  updatemodelesuccess,
  deletemodele,
  deletemodelesuccess,
  fetchmodeles,
  fetchmodelesSuccess,
  modeleActionFailure,
} from './modele.actions';
import { VehiculeService } from 'app/core/services/vehicule.service';

@Injectable()
export class modeleEffects {
  constructor(
    private actions$: Actions,
    private vehiculeService: VehiculeService,
    private _toast: ToastService // private _navigationHelper: NavigationHelper
  ) {}

  getListmodele$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchmodeles),
      switchMap(() => {
        return this.vehiculeService.getModele().pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store modele get",  res)
              const payload = res.response;
              return fetchmodelesSuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return modeleActionFailure({
                action: 'Fetching modele',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              modeleActionFailure({
                action: 'Fetching modele',
                error,
              })
            );
          })
        );
      })
    );
  });

  createNewmodele$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addmodele),
      switchMap(({ data }) => {
        return this.vehiculeService.addModele(data).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store modele add",  res)
              const payload = res.response;
              this._toast.success('modele ajouté avec succès !');
              return addmodelesuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return modeleActionFailure({
                action: 'Add new modele',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              modeleActionFailure({ action: 'Add new modele', error })
            );
          })
        );
      })
    );
  });

  updatemodele$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updatemodele),
      switchMap(({data, uuid }) => {
        return this.vehiculeService.editModele(data, uuid).pipe(
          map((res: any) => {
            // console.log(data, uuid)
            if (res.success) {
              // console.log("store modele update",  res)
              const payload = res.response;
              // console.log("payload", payload)
              this._toast.success('modele modifié avec succès !');
              return updatemodelesuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return modeleActionFailure({
                action: 'Update modele',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              modeleActionFailure({ action: 'Update modele', error })
            );
          })
        );
      })
    );
  });

  deletemodele$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deletemodele),
      switchMap(({ uuid }) => {
        return this.vehiculeService.deletModele(uuid).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("===== delete",res)
              this._toast.success('modele supprimé avec succès !');
              return deletemodelesuccess({ uuid });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return modeleActionFailure({
                action: 'Delete modele',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              modeleActionFailure({ action: 'Delete modele', error })
            );
          })
        );
      })
    );
  });
}
