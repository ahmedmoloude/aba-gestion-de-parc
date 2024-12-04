import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import {
  addciterne,
  addciternesuccess,
  updateciterne,
  updateciternesuccess,
  deleteciterne,
  deleteciternesuccess,
  fetchciternes,
  fetchciternesSuccess,
  citerneActionFailure,
} from './citerne.actions';
import { VehiculeService } from 'app/core/services/vehicule.service';

@Injectable()
export class citerneEffects {
  constructor(
    private actions$: Actions,
    private vehiculeService: VehiculeService,
    private _toast: ToastService // private _navigationHelper: NavigationHelper
  ) {}

  getListciterne$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchciternes),
      switchMap(() => {
        return this.vehiculeService.getCiterne().pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store citerne get",  res)
              const payload = res.response;
              return fetchciternesSuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return citerneActionFailure({
                action: 'Fetching citerne',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              citerneActionFailure({
                action: 'Fetching citerne',
                error,
              })
            );
          })
        );
      })
    );
  });

  createNewContact$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addciterne),
      switchMap(({ data }) => {
        return this.vehiculeService.addCiterne(data).pipe(
          map((res: any) => {
            if (res.success) {
              console.log("store citerne add",  res.response)
              const payload = res.response;
              this._toast.success('Citerne ajoutée avec succès !');
              return addciternesuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return citerneActionFailure({
                action: 'Add new contact',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              citerneActionFailure({ action: 'Add new contact', error })
            );
          })
        );
      })
    );
  });

  updateContact$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateciterne),
      switchMap(({data, uuid }) => {
        return this.vehiculeService.updateCiterne(data, uuid).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store citerne update",  res)
              const payload = res.response;
              this._toast.success('Citerne modifiée avec succès !');
              return updateciternesuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return citerneActionFailure({
                action: 'Update Citerne',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              citerneActionFailure({ action: 'Update Citerne', error })
            );
          })
        );
      })
    );
  });

  deleteContact$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteciterne),
      switchMap(({ uuid }) => {
        return this.vehiculeService.deletCiterne(uuid).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("===== delete",res)
              this._toast.success('Citerne supprimée avec succès !');
              return deleteciternesuccess({ uuid });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return citerneActionFailure({
                action: 'Delete Citerne',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              citerneActionFailure({ action: 'Delete contact', error })
            );
          })
        );
      })
    );
  });
}
