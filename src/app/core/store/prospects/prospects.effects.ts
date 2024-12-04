import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import {
  addProspect,
  addProspectSuccess,
  fetchProspects,
  fetchProspectSuccess,
  prospectActionFailure,
} from './prospects.actions';
import { ProspectService } from 'app/core/services/prospects.service';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class ProspectsEffects {
  constructor(
    private actions$: Actions,
    private prospectService : ProspectService,
    private _toast: ToastService,
    private dialog: MatDialog
  ) { }

  

  createNewProspect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addProspect),
      switchMap(({ data }) => {
        return this.prospectService.addProspect(data).pipe(
          map((res: any) => {
            if (res.success) {


              // TODO: to be replaced by dialog_id 
              this.dialog.closeAll(); // Close all Material dialogs
              const payload = res.response;

              // console.warn('response' , payload)
              this._toast.success('Prospect ajouté avec succès !');
              return addProspectSuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return prospectActionFailure({
                action: 'Add new prospect',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              prospectActionFailure({ action: 'Add new prospect', error })
            );
          })
        );
      })
    );
  });



  getProspect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchProspects),
      // switchMap(() => {
      //   return this.prospectService.getProspects().pipe(
      //     map((res: any) => {
      //       if (res.success) {
              
      //         console.warn('prospects' , res)
      //         const payload = res.response;
      //         return fetchProspectSuccess({ payload });
      //       } else {
      //         this._toast.error('Une Erreur est survenu !');
      //         return prospectActionFailure({
      //           action: 'fetch prospects',
      //           error: res.message,
      //         });
      //       }
      //     }),
      //     catchError((error) => {
      //       this._toast.error('Une Erreur est survenu !');
      //       return of(
      //         prospectActionFailure({ action: 'fetch prospects', error })
      //       );
      //     })
      //   );
      // })
    );
  });




}
