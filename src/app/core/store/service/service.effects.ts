import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import {
  addService,
  addServiceuccess,
  fetchService,
  fetchServiceSuccess,
  ServiceActionFailure,
} from './service.actions';
import { ParametreService } from 'app/core/services/parametre.service';

@Injectable()
export class ServicesEffects {
  constructor(
    private actions$: Actions,
    private parameterService: ParametreService,
    private _toast: ToastService // private _navigationHelper: NavigationHelper
  ) {}

  getListService$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchService),
      switchMap(() => {
        return this.parameterService.getrubrics().pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store Service get",  res)
              const payload = res.response;
              return fetchServiceSuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return ServiceActionFailure({
                action: 'Fetching Services',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              ServiceActionFailure({
                action: 'Fetching Services',
                error,
              })
            );
          })
        );
      })
    );
  });

  createNewService$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addService),
      switchMap(({ data }) => {
        return this.parameterService.addRubric(data).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store Service add",  res)
              const payload = res.response;
              this._toast.success('Service ajouté avec succès !');
              return addServiceuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return ServiceActionFailure({
                action: 'Add new Service',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            console.log(error)
            this._toast.error('Une Erreur est survenu !');
            return of(
              ServiceActionFailure({ action: 'Add new Service', error })
            );
          })
        );
      })
    );
  });

}
