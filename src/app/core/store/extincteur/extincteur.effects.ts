import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import {
  addextincteur,
  addextincteursuccess,
  updateextincteur,
  updateextincteursuccess,
  deleteextincteur,
  deleteextincteursuccess,
  fetchextincteurs,
  fetchextincteursSuccess,
  extincteurActionFailure,
} from './extincteur.actions';
import { ExtincteurService } from 'app/core/services/extincteur.service';

@Injectable()
export class ExtincteurEffects {
  constructor(
    private actions$: Actions,
    private extincteurService: ExtincteurService,
    private _toast: ToastService // private _navigationHelper: NavigationHelper
  ) {}

  getListExtincteur$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchextincteurs),
      switchMap(() => {
        return this.extincteurService.getExtincteur().pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store extincteur get",  res)
              const payload = res.response;
              return fetchextincteursSuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return extincteurActionFailure({
                action: 'Fetching Extincteur',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              extincteurActionFailure({
                action: 'Fetching Extincteur',
                error,
              })
            );
          })
        );
      })
    );
  });

  createNewExtincteur$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addextincteur),
      switchMap(({ data }) => {
        return this.extincteurService.addExtincteur(data).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store extincteur add",  res)
              const payload = res.response;
              this._toast.success('Extincteur ajouté avec succès !');
              return addextincteursuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return extincteurActionFailure({
                action: 'Add new Extincteur',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              extincteurActionFailure({ action: 'Add new Extincteur', error })
            );
          })
        );
      })
    );
  });

  updateExtincteur$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateextincteur),
      switchMap(({data, uuid }) => {
        return this.extincteurService.updateExtincteur(data, uuid).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store extincteur update",  res)
              const payload = res.response;
              this._toast.success('Extincteur modifié avec succès !');
              return updateextincteursuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return extincteurActionFailure({
                action: 'Update Extincteur',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              extincteurActionFailure({ action: 'Update Extincteur', error })
            );
          })
        );
      })
    );
  });

  deleteExtincteur$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteextincteur),
      switchMap(({ uuid }) => {
        return this.extincteurService.deletExtincteur(uuid).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("===== delete",res)
              this._toast.success('Extincteur supprimé avec succès !');
              return deleteextincteursuccess({ uuid });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return extincteurActionFailure({
                action: 'Delete Extincteur',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              extincteurActionFailure({ action: 'Delete Extincteur', error })
            );
          })
        );
      })
    );
  });
}
