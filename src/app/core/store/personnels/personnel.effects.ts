import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import {
  PersonnelActionFailure,
  fetchPersonnels,
  fetchPersonnelsSuccess,
  addPersonnel,
  addPersonnelsuccess,
  updatePersonnel,
  updatePersonneluccess,
  deletePersonnel,
  deletePersonnelsuccess
} from './personnel.actions';
import { PersonelService } from '../../../core/services/personel.service';

@Injectable()
export class Personneleffects {
  constructor(
    private actions$: Actions,
    private personelService: PersonelService,
    private _toast: ToastService // private _navigationHelper: NavigationHelper
  ) {}

  getListPersonnel$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchPersonnels),
      switchMap(() => {
        return this.personelService.getPersonnels().pipe(
          map((res: any) => {
            console.log(res)
            return fetchPersonnelsSuccess({ payload :res });

          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              PersonnelActionFailure({
                action: 'Fetching personnel',
                error,
              })
            );
          })
        );
      })
    );
  });

  createNewPersoneel$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addPersonnel),
      switchMap(({ data }) => {
        return this.personelService.addUser(data).pipe(
          map((res: any) => {
            if (res) {
              console.log("store personnel add",  res)
              const payload = res.response;
              this._toast.success('personnel ajouté avec succès !');
              return addPersonnelsuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return PersonnelActionFailure({
                action: 'Add new personnel',
                error: res.message,
              });
            }
          }
          ),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              PersonnelActionFailure({ action: 'Add new Personnel', error })
            );
          })
        );
      })
    );
  });

  updatePersonnel$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updatePersonnel),
      switchMap(({data }) => {
        return this.personelService.EditPersonnel(data).pipe(
          map((res: any) => {
      
              const payload = res.response.data;
              this._toast.success('Vehicule modifié avec succès !');
              return   updatePersonneluccess({ payload });
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              PersonnelActionFailure({ action: 'Update Vehicule', error })
            );
          })
        );
      })
    );
  });

  deletePersonnel$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deletePersonnel),
      switchMap(({ uuid }) => {
        return this.personelService.deletePersonnel(uuid).pipe(
          map((res: any) => {

              this._toast.success('Personnel supprimé avec succès !');
              return deletePersonnelsuccess({ uuid });
  
          }),
        );
      })
    );
  });
}
