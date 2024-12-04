import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {  ToastService } from 'app/services';
import {
  locationActionFailure,
  fetchCities,
  fetchCitiesSuccess,
  fetchZones,
  fetchZonesSuccess,
} from './location.actions';
import { AdressService } from 'app/core/services/adress.service';

@Injectable()
export class LocationsEffects {
  constructor(
    private actions$: Actions,
    private adresseService: AdressService,
    private _toast: ToastService
  ) {}

  getListCities$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchCities),
      switchMap(() => {
        return this.adresseService.getAllCities().pipe(
          map((res: any) => {
            return fetchCitiesSuccess({ payload: res });
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              locationActionFailure({ action: 'Fetching cities', error })
            );
          })
        );
      })
    );
  });
  getListZones$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchZones),
      switchMap(() => {
        return this.adresseService.getAllZones().pipe(
          map((res: any) => {
            return fetchZonesSuccess({ payload: res });
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              locationActionFailure({ action: 'Fetching zones', error })
            );
          })
        );
      })
    );
  });
}
