import { createAction, props } from '@ngrx/store';
import { Message } from 'app/core/models';

export const loadMessages = createAction(
  '[Messages List] Load Message',
  props<{ filter }>()
);
export const loadMessagesSuccess = createAction(
  '[Messages List] Messages Loaded Successfully',
  props<{ messages: Message[] }>()
);
export const loadMessagesError = createAction(
  '[Messages List] Load Messages Error'
);

export const addMessage = createAction(
  '[Message] Get Random Message',
  props<{ message }>()
);

export const addMessageError = createAction(
  '[Message] Get Random Message Error'
);

export const addMessageSuccess = createAction(
  '[Message] Get Random Message Successfully',
  props<{ message }>()
);

export const selectedMessage = createAction(
  '[Message] set selectedMessage',
  props<{ message: Message }>()
);

export const messageActionTypes = {
  addMessage,
  addMessageError,
  addMessageSuccess,
  loadMessages,
  loadMessagesSuccess,
  loadMessagesError,
  selectedMessage
};
