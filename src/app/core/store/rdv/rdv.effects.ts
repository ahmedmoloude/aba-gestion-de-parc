import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import {
  addrdv,
  addrdvsuccess,
  updaterdv,
  updaterdvsuccess,
  deleterdv,
  deleterdvsuccess,
  fetchrdv,
  fetchrdvSuccess,
  rdvActionFailure,
  // addTask,
  // addTasksuccess
} from './rdv.actions';
import { ActivityService } from 'app/core/services/activity.service'

@Injectable()
export class rdvEffects {
  constructor(
    private actions$: Actions,
    private activityService: ActivityService,
    private _toast: ToastService // private _navigationHelper: NavigationHelper
  ) {}

  getListRDV$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchrdv),
      switchMap(() => {
        return this.activityService.getRdvv('').pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store rdv get",  res.response.data)
              // console.log("store rdv get",  res.data)
              const payload = res.response;
              return fetchrdvSuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return rdvActionFailure({
                action: 'Fetching rdv',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              rdvActionFailure({
                action: 'Fetching rdv',
                error,
              })
            );
          })
        );
      })
    );
  });

  createNewRDV$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addrdv),
      switchMap(({ data }) => {
        return this.activityService.addComercialActivity(data).pipe(
          map((res: any) => {
            if (res.success) {
              console.log("store rdv activ add",  res.response)
              const payload = res.response;
              // this._toast.success('Rendez vous ajouté avec succès !');
              return addrdvsuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return rdvActionFailure({
                action: 'Add new rdv',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            console.log("error",error.message)
            return of(
              rdvActionFailure({ action: 'Add new rdv', error })
            );
          })
        );
      })
    );
  });

  // createNewTask$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(addTask),
  //     switchMap(({ data }) => {
  //       return this.activityService.addrdvTache(data).pipe(
  //         map((res: any) => {
  //           if (res.success) {
  //             console.log("store tache activ add",  res)
  //             const payload = res.response;
  //             this._toast.success('Tache ajouté avec succès !');
  //             return addTasksuccess({ payload });
  //           } else {
  //             this._toast.error('Une Erreur est survenu !');
  //             return rdvActionFailure({
  //               action: 'Add new rdv',
  //               error: res.message,
  //             });
  //           }
  //         }),
  //         catchError((error) => {
  //           this._toast.error('Une Erreur est survenu !');
  //           return of(
  //             rdvActionFailure({ action: 'Add new rdv', error })
  //           );
  //         })
  //       );
  //     })
  //   );
  // });

  updateRDV$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updaterdv),
      switchMap(({data, uuid }) => {
        return this.activityService.updateActivity(data, uuid).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store rdv acti update",  res)
              const payload = res.response;
              // console.log("payload", payload)
              // this._toast.success('Rendez vous modifié avec succès !');
              return updaterdvsuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return rdvActionFailure({
                action: 'Update rdv',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              rdvActionFailure({ action: 'Update rdv', error })
            );
          })
        );
      })
    );
  });

  deleteRDV$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleterdv),
      switchMap(({ uuid }) => {
        return this.activityService.deleteActivity(uuid).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("===== delete",res)
              // this._toast.success('Rendez vous supprimé avec succès !');
              return deleterdvsuccess({ uuid });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return rdvActionFailure({
                action: 'Delete rdv',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              rdvActionFailure({ action: 'Delete rdv', error })
            );
          })
        );
      })
    );
  });
}
