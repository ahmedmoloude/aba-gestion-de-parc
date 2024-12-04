import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import { AnyResponse, DemandeResponse, DemandesResponse } from 'app/core/models/facturation/response-data.model';
import * as DemandeActions from 'app/core/store/affretement/demande/demande.actions'
import { AffretementService } from 'app/core/services/affretement.service';



@Injectable()
export class DemandeEffects {



  constructor(private actions$: Actions,
              private affretementService: AffretementService,
              private _toast: ToastService ) {}

  loadDemandes$ = createEffect( () => this.actions$.pipe(
    ofType(DemandeActions.DemandeActionstypes.LOAD_DEMANDES),
    exhaustMap((action: any) => {
      return this.affretementService.getDemandesDocuments(0, action.data).pipe(
        map((resp: DemandesResponse) => {
          console.log('demandes');
          console.log(resp);
          if(resp.success) {
            return DemandeActions.loadDemandesSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return DemandeActions.loadDemandesFailure(
              {
                action: 'Load Demandes',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(DemandeActions.loadDemandesFailure(
          {
            action: 'Load Demandes',
            error: err
          }
        )))
      )
    })
  ));

  loadClosedDemandes$ = createEffect( () => this.actions$.pipe(
    ofType(DemandeActions.DemandeActionstypes.LOAD_CLOSED_DEMANDES),
    exhaustMap((action: any) => {
      return this.affretementService.getDemandesDocuments(1, action.data).pipe(
        map((resp: DemandesResponse) => {
          console.log(' closed demandes');
          console.log(resp);
          if(resp.success) {
            return DemandeActions.loadClosedDemandesSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return DemandeActions.loadClosedDemandesFailure(
              {
                action: 'Load Closed Demandes',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(DemandeActions.loadClosedDemandesFailure(
          {
            action: 'Load Closed Demandes',
            error: err
          }
        )))
      )
    })
  ));

  updateDemandeDocumentStatus$ = createEffect( () => this.actions$.pipe(
    ofType(DemandeActions.DemandeActionstypes.UPDATE_DEMANDE_DOCUMENT_STATUS),
    exhaustMap((action: any) => {
      return this.affretementService.updateDemandeDocumentStatus(action.data).pipe(
        map((resp: DemandeResponse) => {
          console.log('update document demande status');
          console.log(resp);
          if(resp.success) {
            return DemandeActions.updateDemandeDocumentStatusSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return DemandeActions.updateDemandeDocumentStatusFailure(
              {
                action: 'Lupdate document demande status',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(DemandeActions.updateDemandeDocumentStatusFailure(
          {
            action: 'Lupdate document demande status',
            error: err
          }
        )))
      )
    })
  ));

  deliverDemandeDocuments$ = createEffect( () => this.actions$.pipe(
    ofType(DemandeActions.DemandeActionstypes.DELIVER_DEMANDE_DOCUMENTS),
    exhaustMap((action: any) => {
      return this.affretementService.deliverDemandeDocuments(action.data).pipe(
        map((resp: DemandeResponse) => {
          console.log('deliver document demandes');
          console.log(resp);
          if(resp.success) {
            return DemandeActions.deliverDemandeDocumentsSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return DemandeActions.deliverDemandeDocumentsFailure(
              {
                action: 'deliver document demandes',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(DemandeActions.deliverDemandeDocumentsFailure(
          {
            action: 'deliver document demandes',
            error: err
          }
        )))
      )
    })
  ));

}
