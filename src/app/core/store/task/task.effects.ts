import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import {
  addTask,
  addTasksuccess,
  updateTask,
  updateTasksuccess,
  deleteTask,
  deleteTasksuccess,
  fetchTask,
  fetchTaskSuccess,
  TaskActionFailure,
  // addTask,
  // addTasksuccess
} from './task.actions';
import { ActivityService } from 'app/core/services/activity.service'

@Injectable()
export class TaskEffects {
  constructor(
    private actions$: Actions,
    private activityService: ActivityService,
    private _toast: ToastService // private _navigationHelper: NavigationHelper
  ) {}

  getListRDV$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchTask),
      switchMap(() => {
        return this.activityService.getTask('').pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store Task get",  res.response.data)
              // console.log("store Task get",  res.data)
              const payload = res.response;
              return fetchTaskSuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return TaskActionFailure({
                action: 'Fetching rdv',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              TaskActionFailure({
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
      ofType(addTask),
      switchMap(({ data }) => {
        return this.activityService.addComercialActivity(data).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store rdv activ add",  res)
              const payload = res.response;
              // this._toast.success('Rendez vous ajouté avec succès !');
              return addTasksuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return TaskActionFailure({
                action: 'Add new rdv',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            console.log("error",error.message)
            return of(
              TaskActionFailure({ action: 'Add new rdv', error })
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
  //       return this.TaskService.addTaskTache(data).pipe(
  //         map((res: any) => {
  //           if (res.success) {
  //             console.log("store tache activ add",  res)
  //             const payload = res.response;
  //             this._toast.success('Tache ajouté avec succès !');
  //             return addTasksuccess({ payload });
  //           } else {
  //             this._toast.error('Une Erreur est survenu !');
  //             return TaskActionFailure({
  //               action: 'Add new rdv',
  //               error: res.message,
  //             });
  //           }
  //         }),
  //         catchError((error) => {
  //           this._toast.error('Une Erreur est survenu !');
  //           return of(
  //             TaskActionFailure({ action: 'Add new rdv', error })
  //           );
  //         })
  //       );
  //     })
  //   );
  // });

  updateRDV$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateTask),
      switchMap(({data, uuid }) => {
        return this.activityService.updateActivity(data, uuid).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store rdv acti update",  res)
              const payload = res.response;
              // console.log("payload", payload)
              // this._toast.success('Rendez vous modifié avec succès !');
              return updateTasksuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return TaskActionFailure({
                action: 'Update rdv',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              TaskActionFailure({ action: 'Update rdv', error })
            );
          })
        );
      })
    );
  });

  deleteRDV$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteTask),
      switchMap(({ uuid }) => {
        return this.activityService.deleteActivity(uuid).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("===== delete",res)
              // this._toast.success('Rendez vous supprimé avec succès !');
              return deleteTasksuccess({ uuid });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return TaskActionFailure({
                action: 'Delete rdv',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              TaskActionFailure({ action: 'Delete rdv', error })
            );
          })
        );
      })
    );
  });
}
