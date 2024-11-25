import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import {
  addtypeExtincteur,
  addtypeExtincteuruccess,
  updatetypeExtincteur,
  updatetypeExtincteuruccess,
  deletetypeExtincteur,
  deletetypeExtincteuruccess,
  fetchtypeExtincteur,
  fetchtypeExtincteurSuccess,
  typeExtincteurActionFailure,
} from './typeExtincteur.actions';
import { ExtincteurService } from 'app/core/services/extincteur.service';

@Injectable()
export class typeExtincteurEffects {
  constructor(
    private actions$: Actions,
    private extincteurService: ExtincteurService,
    private _toast: ToastService // private _navigationHelper: NavigationHelper
  ) {}

  getListtypeExtincteur$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchtypeExtincteur),
      switchMap(() => {
        return this.extincteurService.getTypeExtincteur().pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store typeExtincteur get",  res)
              const payload = res.response;
              return fetchtypeExtincteurSuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return typeExtincteurActionFailure({
                action: 'Fetching typeExtincteur',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              typeExtincteurActionFailure({
                action: 'Fetching contacts',
                error,
              })
            );
          })
        );
      })
    );
  });

  createNewtypeExtincteur$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addtypeExtincteur),
      switchMap(({ data }) => {
        return this.extincteurService.addTypeExtincteur(data).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store typeExtincteur add",  res)
              const payload = res.response;
              this._toast.success('typeExtincteur ajouté avec succès !');
              return addtypeExtincteuruccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return typeExtincteurActionFailure({
                action: 'Add new typeExtincteur',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              typeExtincteurActionFailure({ action: 'Add new typeExtincteur', error })
            );
          })
        );
      })
    );
  });

  updatetypeExtincteur$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updatetypeExtincteur),
      switchMap(({data, uuid }) => {
        return this.extincteurService.updateTypeExtincteur(data, uuid).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store typeExtincteur update",  res)
              const payload = res.response;
              this._toast.success('typeExtincteur modifié avec succès !');
              return updatetypeExtincteuruccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return typeExtincteurActionFailure({
                action: 'Update typeExtincteur',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              typeExtincteurActionFailure({ action: 'Update contact', error })
            );
          })
        );
      })
    );
  });

  deletetypeExtincteur$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deletetypeExtincteur),
      switchMap(({ uuid }) => {
        return this.extincteurService.deletTypeExtincteur(uuid).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("===== delete",res)
              this._toast.success('typeExtincteur supprimé avec succès !');
              return deletetypeExtincteuruccess({ uuid });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return typeExtincteurActionFailure({
                action: 'Delete typeExtincteur',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              typeExtincteurActionFailure({ action: 'Delete contact', error })
            );
          })
        );
      })
    );
  });
}
