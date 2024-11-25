import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import {
  addvolume,
  addvolumeuccess,
  updatevolume,
  updatevolumeuccess,
  deletevolume,
  deletevolumeuccess,
  fetchvolume,
  fetchvolumeSuccess,
  volumeActionFailure,
} from './volume.actions';
import { ExtincteurService } from 'app/core/services/extincteur.service';

@Injectable()
export class volumeEffects {
  constructor(
    private actions$: Actions,
    private extincteurService: ExtincteurService,
    private _toast: ToastService // private _navigationHelper: NavigationHelper
  ) {}

  getListvolume$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchvolume),
      switchMap(() => {
        return this.extincteurService.getVolume().pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store volume get",  res)
              const payload = res.response;
              return fetchvolumeSuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return volumeActionFailure({
                action: 'Fetching volume',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              volumeActionFailure({
                action: 'Fetching contacts',
                error,
              })
            );
          })
        );
      })
    );
  });

  createNewvolume$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addvolume),
      switchMap(({ data }) => {
        return this.extincteurService.addVolume(data).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store volume add",  res)
              const payload = res.response;
              this._toast.success('volume ajouté avec succès !');
              return addvolumeuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return volumeActionFailure({
                action: 'Add new volume',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              volumeActionFailure({ action: 'Add new volume', error })
            );
          })
        );
      })
    );
  });

  updatevolume$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updatevolume),
      switchMap(({data, uuid }) => {
        return this.extincteurService.updateVolume(data, uuid).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store volume update",  res)
              const payload = res.response;
              this._toast.success('volume modifié avec succès !');
              return updatevolumeuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return volumeActionFailure({
                action: 'Update volume',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              volumeActionFailure({ action: 'Update contact', error })
            );
          })
        );
      })
    );
  });

  deletevolume$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deletevolume),
      switchMap(({ uuid }) => {
        return this.extincteurService.deletVolume(uuid).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("===== delete",res)
              this._toast.success('volume supprimé avec succès !');
              return deletevolumeuccess({ uuid });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return volumeActionFailure({
                action: 'Delete volume',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              volumeActionFailure({ action: 'Delete contact', error })
            );
          })
        );
      })
    );
  });
}
