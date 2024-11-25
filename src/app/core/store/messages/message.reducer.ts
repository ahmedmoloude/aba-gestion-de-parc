import { createReducer, on } from '@ngrx/store';
import { Message } from '../../models';
import { messageActionTypes } from './message.action';

export interface MessageState {
  messages: Message[];
  selectedMessage: Message;
  loading: boolean;
}

const initialState: MessageState = {
  messages: [],
  selectedMessage: null,
  loading: false,
};

export const messageReducer = createReducer(
  initialState,

  on(messageActionTypes.loadMessages, (state) => ({
    ...state,
    loading: true,
  })),
  on(messageActionTypes.loadMessagesSuccess, (state, { messages }) => {
    return {
      ...state,
      messages,
      loading: false,
    };
  }),

  on(messageActionTypes.addMessage, (state) => ({
    ...state,
  })),
  on(messageActionTypes.addMessageSuccess, (state, { message }) => {
    return {
      ...state,
      messages: [new Message(message), ...state.messages],
      selectedMessage: message
    };
  })
);
