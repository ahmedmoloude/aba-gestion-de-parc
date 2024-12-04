import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import {
  addActivity,
  addActivitysuccess,
  updateActivity,
  updateActivitysuccess,
  deleteActivity,
  deleteActivitysuccess,
  fetchActivity,
  fetchActivitySuccess,
  // fetchAtaskSuccess,
  // fetchtask,
  // fetchrdv,
  // fetchrdvSuccess,
  ActivityActionFailure,
  // addTask,
  // addTasksuccess
} from './comercialActivity.actions';
import { ActivityService } from 'app/core/services/activity.service'

@Injectable()
export class ActivityEffects {
  constructor(
    private actions$: Actions,
    private activityService: ActivityService,
    private _toast: ToastService // private _navigationHelper: NavigationHelper
  ) {}

  // getListallrdv$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(fetchrdv),
  //     switchMap(() => {
  //       return this.activityService.getRdvv().pipe(
  //         map((res: any) => {
  //           if (res.success) {
  //             // console.log("store activity get",  res.response.data)
  //             // console.log("store activity get",  res.data)
  //             const payload = res.response;
  //             return fetchrdvSuccess({ payload });
  //           } else {
  //             this._toast.error('Une Erreur est survenu !');
  //             return ActivityActionFailure({
  //               action: 'Fetching rdv',
  //               error: res.message,
  //             });
  //           }
  //         }),
  //         catchError((error) => {
  //           this._toast.error('Une Erreur est survenu !');
  //           return of(
  //             ActivityActionFailure({
  //               action: 'Fetching rdv',
  //               error,
  //             })
  //           );
  //         })
  //       );
  //     })
  //   );
  // });

  // getListtask$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(fetchtask),
  //     switchMap(() => {
  //       return this.activityService.getTask().pipe(
  //         map((res: any) => {
  //           if (res.success) {
  //             // console.log("store activity get",  res.response.data)
  //             // console.log("store activity get",  res.data)
  //             const payload = res.response;
  //             return fetchAtaskSuccess({ payload });
  //           } else {
  //             this._toast.error('Une Erreur est survenu !');
  //             return ActivityActionFailure({
  //               action: 'Fetching rdv',
  //               error: res.message,
  //             });
  //           }
  //         }),
  //         catchError((error) => {
  //           this._toast.error('Une Erreur est survenu !');
  //           return of(
  //             ActivityActionFailure({
  //               action: 'Fetching rdv',
  //               error,
  //             })
  //           );
  //         })
  //       );
  //     })
  //   );
  // });

  getListRDV$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchActivity),
      switchMap(() => {
        return this.activityService.getAllActivity().pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store activity get",  res.response.data)
              // console.log("store activity get",  res.data)
              const payload = res.response;
              return fetchActivitySuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return ActivityActionFailure({
                action: 'Fetching rdv',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              ActivityActionFailure({
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
      ofType(addActivity),
      switchMap(({ data }) => {
        return this.activityService.addComercialActivity(data).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store rdv activ add",  res)
              const payload = res.response;
              // this._toast.success('Rendez vous ajouté avec succès !');
              return addActivitysuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return ActivityActionFailure({
                action: 'Add new rdv',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            console.log("error",error.message)
            return of(
              ActivityActionFailure({ action: 'Add new rdv', error })
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
  //       return this.activityService.addActivityTache(data).pipe(
  //         map((res: any) => {
  //           if (res.success) {
  //             console.log("store tache activ add",  res)
  //             const payload = res.response;
  //             this._toast.success('Tache ajouté avec succès !');
  //             return addTasksuccess({ payload });
  //           } else {
  //             this._toast.error('Une Erreur est survenu !');
  //             return ActivityActionFailure({
  //               action: 'Add new rdv',
  //               error: res.message,
  //             });
  //           }
  //         }),
  //         catchError((error) => {
  //           this._toast.error('Une Erreur est survenu !');
  //           return of(
  //             ActivityActionFailure({ action: 'Add new rdv', error })
  //           );
  //         })
  //       );
  //     })
  //   );
  // });

  updateRDV$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateActivity),
      switchMap(({data, uuid }) => {
        return this.activityService.updateActivity(data, uuid).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store rdv acti update",  res)
              const payload = res.response;
              // console.log("payload", payload)
              // this._toast.success('Rendez vous modifié avec succès !');
              return updateActivitysuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return ActivityActionFailure({
                action: 'Update rdv',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              ActivityActionFailure({ action: 'Update rdv', error })
            );
          })
        );
      })
    );
  });

  deleteRDV$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteActivity),
      switchMap(({ uuid }) => {
        return this.activityService.deleteActivity(uuid).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("===== delete",res)
              // this._toast.success('Rendez vous supprimé avec succès !');
              return deleteActivitysuccess({ uuid });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return ActivityActionFailure({
                action: 'Delete rdv',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              ActivityActionFailure({ action: 'Delete rdv', error })
            );
          })
        );
      })
    );
  });
}
