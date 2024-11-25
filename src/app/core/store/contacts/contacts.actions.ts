import { createAction, props } from '@ngrx/store';
import {
  Contact,
  ContactAddForm,
  ContactUpdateForm,
} from 'app/core/models/contact.model';

export const contactActionFailure = createAction(
  '[Contacts] Contacts Action Failure',
  props<{ action: string; error: any }>()
);

export const fetchContacts = createAction(
  '[Contacts] Fetch List Contacts'
);
export const fetchContactsSuccess = createAction(
  '[Contacts] Fetch List Contacts Success',
  props<{ payload: Contact[] }>()
);

export const addContact = createAction(
  '[Contacts] Add Contact',
  props<{ data: ContactAddForm }>()
);
export const addContactsuccess = createAction(
  '[Contacts] Add Contact Success',
  props<{ payload: Contact }>()
);

export const updateContact = createAction(
  '[Contacts] Update Contact',
  props<{ data: ContactUpdateForm,  uuid: number  }>()
);
export const updateContactsuccess = createAction(
  '[Contacts] Update Contact Success',
  props<{ payload: Contact }>()
);

export const deleteContact = createAction(
  '[Contacts] Delete Contact',
  props<{ uuid: string }>()
);
export const deleteContactsuccess = createAction(
  '[Contacts] Delete Contact Success',
  props<{ uuid: string }>()
);
