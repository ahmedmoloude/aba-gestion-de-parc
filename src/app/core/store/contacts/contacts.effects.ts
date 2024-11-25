import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
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
import { ContactService } from 'app/core/services/contact.service';

@Injectable()
export class ContactsEffects {
  constructor(
    private actions$: Actions,
    private contactService: ContactService,
    private _toast: ToastService // private _navigationHelper: NavigationHelper
  ) {}

  getListContacts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchContacts),
      switchMap(() => {
        return this.contactService.getContact().pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store contact get",  res.response)
              // console.log("store contact get",  res.response.contacts)
              // console.log("store contact get",  res.response.data)
              const payload = res.response;
              return fetchContactsSuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return contactActionFailure({
                action: 'Fetching contacts',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              contactActionFailure({
                action: 'Fetching contacts',
                error,
              })
            );
          })
        );
      })
    );
  });

  createNewContact$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addContact),
      switchMap(({ data }) => {
        return this.contactService.addContact(data).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("store contact add",  res)
              const payload = res.response;
              this._toast.success('Contact ajouté avec succès !');
              return addContactsuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return contactActionFailure({
                action: 'Add new contact',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              contactActionFailure({ action: 'Add new contact', error })
            );
          })
        );
      })
    );
  });

  updateContact$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateContact),
      switchMap(({data, uuid }) => {
        return this.contactService.editContact(data, uuid).pipe(
          map((res: any) => {
            if (res.success) {
              console.log("store contact update",  res.response)
              const payload = res.response;
              this._toast.success('Contact modifié avec succès !');
              return updateContactsuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return contactActionFailure({
                action: 'Update contact',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              contactActionFailure({ action: 'Update contact', error })
            );
          })
        );
      })
    );
  });

  deleteContact$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteContact),
      switchMap(({ uuid }) => {
        return this.contactService.deletContact(uuid).pipe(
          map((res: any) => {
            if (res.success) {
              // console.log("===== delete",res)
              this._toast.success('Contact supprimé avec succès !');
              return deleteContactsuccess({ uuid });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return contactActionFailure({
                action: 'Delete contact',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              contactActionFailure({ action: 'Delete contact', error })
            );
          })
        );
      })
    );
  });
}
