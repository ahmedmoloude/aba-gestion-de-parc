import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import {
  addtonnage,
  addtonnagesuccess,
  updatetonnage,
  updatetonnagesuccess,
  deletetonnage,
  deletetonnagesuccess,
  fetchtonnages,
  fetchtonnagesSuccess,
  tonnageActionFailure,
} from './tonnage.actions';
import { VehiculeService } from 'app/core/services/vehicule.service';

@Injectable()
export class tonnageEffects {
  constructor(
    private actions$: Actions,
    private vehiculeService: VehiculeService,
    private _toast: ToastService // private _navigationHelper: NavigationHelper
  ) {}

  getListtonnage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchtonnages),
      switchMap(() => {
        return this.vehiculeService.getTonnage().pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store tonnage get",  res)
              const payload = res.response;
              return fetchtonnagesSuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return tonnageActionFailure({
                action: 'Fetching tonnage',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              tonnageActionFailure({
                action: 'Fetching tonnage',
                error,
              })
            );
          })
        );
      })
    );
  });

  createNewtonnage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addtonnage),
      switchMap(({ data }) => {
        return this.vehiculeService.addTonnage(data).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store tonnage add",  res)
              const payload = res.response;
              this._toast.success('tonnage ajouté avec succès !');
              return addtonnagesuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return tonnageActionFailure({
                action: 'Add new tonnage',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              tonnageActionFailure({ action: 'Add new tonnage', error })
            );
          })
        );
      })
    );
  });

  updatetonnage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updatetonnage),
      switchMap(({data, uuid }) => {
        return this.vehiculeService.editTonnage(data, uuid).pipe(
          map((res: any) => {
            // console.log(data, uuid)
            if (res.success) {
              // console.log("store tonnage update",  res)
              const payload = res.response;
              // console.log("payload", payload)
              this._toast.success('tonnage modifié avec succès !');
              return updatetonnagesuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return tonnageActionFailure({
                action: 'Update tonnage',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              tonnageActionFailure({ action: 'Update tonnage', error })
            );
          })
        );
      })
    );
  });

  deletetonnage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deletetonnage),
      switchMap(({ uuid }) => {
        return this.vehiculeService.deletTonnage(uuid).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("===== delete",res)
              this._toast.success('tonnage supprimé avec succès !');
              return deletetonnagesuccess({ uuid });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return tonnageActionFailure({
                action: 'Delete tonnage',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              tonnageActionFailure({ action: 'Delete tonnage', error })
            );
          })
        );
      })
    );
  });
}
