import { MessageService, ToastService } from 'app/services';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { messageActionTypes } from './message.action';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Message } from 'app/core/models';
import { Store } from '@ngrx/store';
import { complaintActionTypes, selectComplaint } from '../complaint';
import { selectTask, taskActionTypes } from '../tasks';

@Injectable()
export class MessageEffects {
  constructor(
    private messageService: MessageService,
    private actions$: Actions,
    private _toast: ToastService,
    private store: Store
  ) {}

  loadMessages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(messageActionTypes.loadMessages),
      switchMap((data: any) =>
        this.messageService.getListMessages(data.filter).pipe(
          map((res) => {
            let messages = res['response'].messages;
            messages = messages.map((item) => new Message(item));
            return messageActionTypes.loadMessagesSuccess({ messages });
          }),
          catchError(() => [messageActionTypes.loadMessagesError()])
        )
      )
    )
  );

  public readonly addMessage$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(messageActionTypes.addMessage),
      withLatestFrom(
        this.store.select(selectComplaint),
        this.store.select(selectTask),),
      switchMap(([data, selectComplaint, selectedTask]) => {
        return this.messageService.create(data).pipe(
          switchMap((res) => {
            let message = res['response'];
            this._toast.success('Commentaire ajouté avec succès !');
            let complaint = message?.complaint?.parent_id ? {...selectComplaint.childs.filter(item => item.id === message.complaint.id).pop()} : {...selectComplaint}
            if (message.is_interne) {
              let task = { ...selectedTask };
              task.messages = [...selectedTask.messages, message]
              complaint.tasks = complaint.tasks.map((item) =>
                item.id === task.id ? task : item)
              return of(
                taskActionTypes.selectedTask({ task }),
                complaintActionTypes.updateComplaintSuccess({ complaint }))
            } else {
              complaint.messages = [...complaint.messages, message]
              return of(
                complaintActionTypes.updateComplaintSuccess({ complaint }))
            }
          }),
          catchError((err) => {
            this._toast.error(err.message);
            return [messageActionTypes.addMessageError()];
          })
        );
      }),

    )
  );
}
