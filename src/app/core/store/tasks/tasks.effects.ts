import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap, withLatestFrom, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ToastService } from 'app/services';
import {
  addTask,
  addTaskSuccess,
  deleteTask,
  deleteTaskSuccess,
  taskActionFailure,
  fetchTasks,
  fetchTasksSuccess,
  updateTask,
  updateTaskSuccess,
  taskActionTypes,
} from './tasks.actions';
import { BoTaskService } from 'app/core/services/admin-bo/bo-tasks.service';
import { Store } from '@ngrx/store';
import { complaintActionTypes, selectComplaint } from '../complaint';
import { Complaint } from 'app/core/models';

@Injectable()
export class TasksEffects {
  constructor(
    private actions$: Actions,
    private boTaskService: BoTaskService,
    private _toast: ToastService,
    private store: Store
  ) { }

  getListTasks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchTasks),
      mergeMap(() => {
        return this.boTaskService.fetchListTasks().pipe(
          map((res: any) => {
            if (res.success) {
              const payload = res.response.tasks;
              return fetchTasksSuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return taskActionFailure({
                action: 'Fetching tasks',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              taskActionFailure({ action: 'Fetching tasks', error })
            );
          })
        );
      }),

    );
  });

  createNewTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addTask),
      withLatestFrom(this.store.select(selectComplaint)),
      mergeMap(([{ data }, selectedComplaint]) => {
        return this.boTaskService.addTask(data).pipe(
          map((res: any) => {
            if (res.success) {
              const payload = res.response.task;
              // todo optimiser
              let complaint = new Complaint(selectedComplaint);
              complaint.childs = complaint.setList(selectedComplaint.childs);
              complaint.tasks = selectedComplaint.tasks
              if (complaint.id === payload.complaint.id) {
                complaint.tasks = [...selectedComplaint.tasks, payload];
              } else {
                for (let child of complaint.childs) {
                  if (child.id === payload.complaint.id)
                    child.tasks = [...child.tasks, payload];
                }
              }
              return complaintActionTypes.updateComplaintSuccessNew({ complaint })

            } else {
              this._toast.error('Une Erreur est survenu !');
              return taskActionFailure({
                action: 'Add new task',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              taskActionFailure({ action: 'Add new task', error })
            );
          })
        );
      }),

    );
  });
  // public readonly addMessage$: Observable<any> = createEffect(() =>
  public readonly updateTask$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTask),
      withLatestFrom(this.store.select(selectComplaint)),
      switchMap(([{ uuid, data }, selectComplaint]) => {
        return this.boTaskService.updateTask(uuid, data).pipe(
          switchMap((res) => {
            // if (res.success) {
            const payload = res['response'].task;
            let complaint = payload?.complaint?.parent_id ? {...selectComplaint.childs.filter(item => item.id === payload.complaint.id).pop()} : {...selectComplaint}

            complaint.tasks = complaint.tasks.map((item) =>
              item.id === payload.id ? payload : item
            );
            if (payload?.complaint?.parent_id) {
              complaint['parentStatus'] = payload.complaint.parent.status
            }
            else {
              complaint.status = payload.complaint.status
            }

            return of(
              taskActionTypes.updateTaskSuccess({ payload }),
              complaintActionTypes.updateComplaintSuccess({ complaint})
            );
            // } else {
            // this._toast.error('Une Erreur est survenu !');
            // return taskActionFailure({
            //   action: 'Update task',
            //   error: res.message,
            // });
            // }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              taskActionFailure({ action: 'Update task', error })
            );
          })
        );
      }),

    )
  );

  deleteTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteTask),
      mergeMap(({ uuid }) => {
        return this.boTaskService.deleteTask(uuid).pipe(
          map((res: any) => {
            if (res.success) {
              const payload = res.response;
              return deleteTaskSuccess({ uuid: payload.uuid });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return taskActionFailure({
                action: 'Delete task',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              taskActionFailure({ action: 'Delete task', error })
            );
          })
        );
      }),
    );
  });

  // getSelectedTask$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(getTask),
  //     mergeMap(({ uuid }) => {
  //       return this.boTaskService.getTask(uuid).pipe(
  //         map((res: any) => {
  //           if (res.success) {
  //             const payload = res.response.task;
  //             console.log('---->>> get task in effects', payload)
  //             return getTaskSuccess({ payload });
  //           } else {
  //             this._toast.error('Une Erreur est survenu !');
  //             return taskActionFailure({
  //               action: 'Get task',
  //               error: res.message,
  //             });
  //           }
  //         }),
  //         catchError((error) => {
  //           this._toast.error('Une Erreur est survenu !');
  //           return of(taskActionFailure({ action: 'Get task', error }));
  //         })
  //       );
  //     }),
  //   );
  // });
}
