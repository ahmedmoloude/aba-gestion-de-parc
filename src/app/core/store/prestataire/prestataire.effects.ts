import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import {
  addprestataire,
  addprestataireuccess,
  deleteprestataire,
  deleteprestatairesuccess,
  fetchprestataire,
  fetchprestataireSuccess,
  prestataireActionFailure,
  updateprestataire,
  updateprestatairesuccess,
} from './prestataire.actions';
import { VehiculeService } from 'app/core/services/vehicule.service';

@Injectable()
export class prestataireEffects {
  constructor(
    private actions$: Actions,
    private vehiculeService: VehiculeService,
    private _toast: ToastService // private _navigationHelper: NavigationHelper
  ) {}

  getListprestataire$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchprestataire),
      switchMap(() => {
        return this.vehiculeService.getPrestataire().pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store prestataire get",  res)
              const payload = res.response;
              return fetchprestataireSuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return prestataireActionFailure({
                action: 'Fetching prestataire',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              prestataireActionFailure({
                action: 'Fetching prestataire',
                error,
              })
            );
          })
        );
      })
    );
  });

  createNewprestataire$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addprestataire),
      switchMap(({ data }) => {
        return this.vehiculeService.addPrestataire(data).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store prestataire add",  res)
              const payload = res.response;
              this._toast.success('prestataire ajouté avec succès !');
              return addprestataireuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return prestataireActionFailure({
                action: 'Add new prestataire',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              prestataireActionFailure({ action: 'Add new prestataire', error })
            );
          })
        );
      })
    );
  });

  updatePrestataire$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateprestataire),
      switchMap(({data, uuid }) => {
        return this.vehiculeService.editPrestataire(data, uuid).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store Prestataire update",  res)
              const payload = res.response;
              this._toast.success('Prestataire modifié avec succès !');
              return updateprestatairesuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return prestataireActionFailure({
                action: 'Update Prestataire',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              prestataireActionFailure({ action: 'Update Prestataire', error })
            );
          })
        );
      })
    );
  });

  deletePrestataire$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteprestataire),
      switchMap(({ uuid }) => {
        return this.vehiculeService.deletPrestataire(uuid).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("===== delete",res)
              this._toast.success('Prestataire supprimé avec succès !');
              return deleteprestatairesuccess({ uuid });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return prestataireActionFailure({
                action: 'Delete Prestataire',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              prestataireActionFailure({ action: 'Delete Prestataire', error })
            );
          })
        );
      })
    );
  });

}
