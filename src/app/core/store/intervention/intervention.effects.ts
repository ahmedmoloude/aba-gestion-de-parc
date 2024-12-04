import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import {
  addintervention,
  addinterventionsuccess,
  updateintervention,
  updateinterventionsuccess,
  deleteintervention,
  deleteinterventionsuccess,
  fetchinterventions,
  fetchinterventionsSuccess,
  interventionActionFailure,
} from './intervention.actions';
import { VehiculeService } from 'app/core/services/vehicule.service';

@Injectable()
export class interventionEffects {
  constructor(
    private actions$: Actions,
    private vehiculeService: VehiculeService,
    private _toast: ToastService // private _navigationHelper: NavigationHelper
  ) {}

  getListintervention$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchinterventions),
      switchMap(() => {
        return this.vehiculeService.getIntervention().pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store intervention get",  res)
              const payload = res.response;
              return fetchinterventionsSuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return interventionActionFailure({
                action: 'Fetching intervention',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              interventionActionFailure({
                action: 'Fetching intervention',
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
      ofType(addintervention),
      switchMap(({ data }) => {
        return this.vehiculeService.addIntervention(data).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store intervention add",  res)
              const payload = res.response;
              this._toast.success('intervention ajouté avec succès !');
              return addinterventionsuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return interventionActionFailure({
                action: 'Add new contact',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              interventionActionFailure({ action: 'Add new contact', error })
            );
          })
        );
      })
    );
  });

  updateContact$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateintervention),
      switchMap(({data, uuid }) => {
        return this.vehiculeService.updateIntervention(data, uuid).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store intervention update",  res)
              const payload = res.response;
              this._toast.success('Contact modifié avec succès !');
              return updateinterventionsuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return interventionActionFailure({
                action: 'Update contact',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              interventionActionFailure({ action: 'Update contact', error })
            );
          })
        );
      })
    );
  });

  deleteContact$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteintervention),
      switchMap(({ uuid }) => {
        return this.vehiculeService.deletIntervention(uuid).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("===== delete",res)
              this._toast.success('Contact supprimé avec succès !');
              return deleteinterventionsuccess({ uuid });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return interventionActionFailure({
                action: 'Delete contact',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              interventionActionFailure({ action: 'Delete contact', error })
            );
          })
        );
      })
    );
  });
}
