import { createReducer, on } from '@ngrx/store';
import { Contact } from 'app/core/models/contact.model';
import {
  addContact,
  addContactsuccess,
  updateContact,
  updateContactsuccess,
  deleteContact,
  deleteContactsuccess,
  fetchContacts,
  fetchContactsSuccess,
  contactActionFailure,
} from './contacts.actions';

export interface ContactState {
  payload: any;
  loading: boolean;
  error: {
    action: string;
    error: any;
  } | null;
  status: 'INIT' | 'LOADING' | 'SUCCESS' | 'ERROR';
}

export const initialState: ContactState = {
  payload: [],
  loading: false,
  error: null,
  status: 'INIT',
};

export const contactReducer = createReducer(
  initialState,
  on(fetchContacts, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(fetchContactsSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload,
    status: 'SUCCESS',
    error: null,
  })),

  on(addContact, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(addContactsuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload: { ...state.payload , data : [payload , ...state.payload.data] },
    status: 'SUCCESS',
    error: null,
  })),

  on(updateContact, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(updateContactsuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload:  { ...state.payload , data : updateItemFromList(payload, state.payload.data) },
    status: 'SUCCESS',
    error: null,
  })),

  on(deleteContact, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(deleteContactsuccess, (state, { uuid }) => ({
    ...state,
    loading: false,
    payload: { ...state.payload , data : state.payload.data.filter((item) => item.uuid != uuid) },
    status: 'SUCCESS',
    error: null,
  })),

  on(contactActionFailure, (state, { action, error }) => ({
    ...state,
    loading: false,
    status: 'ERROR',
    error: { action, error },
  }))
  //
);

// #TODO move to helpers
const updateItemFromList = (updateItem: any, listItems: any[]) => {
  return listItems.map((item) => {
    if (item.uuid == updateItem.uuid) {
      return updateItem;
    }
    return item;
  });
};
