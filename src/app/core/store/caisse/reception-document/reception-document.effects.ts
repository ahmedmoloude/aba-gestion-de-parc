import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ReceptionDocumentseService } from 'app/core/services/caisse/reception-documents.service';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import { AnyResponse, CarteResponse, CartesResponse, DocumentsResponse, confirmDocumentsReceptionResponse} from 'app/core/models/facturation/response-data.model';
import * as DocumentActions from 'app/core/store/caisse/reception-document/reception-document.actions';


@Injectable()
export class ReceptionDocumentEffects {



  constructor(private actions$: Actions,
              private receptionDocumentseService: ReceptionDocumentseService,
              private _toast: ToastService) {}

  loadDocuments$ = createEffect( () => this.actions$.pipe(
    ofType(DocumentActions.DocumentActionstypes.LOAD_DOCUMENTS),
    exhaustMap((action: any) => {
      return this.receptionDocumentseService.getDocuments(action.data).pipe(
        map((resp: DocumentsResponse) => {
          console.log('Document');
          console.log(resp);
          if(resp.success) {
            return DocumentActions.loadDocumentsSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return DocumentActions.loadDocumentsFailure(
              {
                action: 'Load Documents',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(DocumentActions.loadDocumentsFailure(
          {
            action: 'Load Documents',
            error: err
          }
        )))
      )
    })
  ));

  loadChecks$ = createEffect( () => this.actions$.pipe(
    ofType(DocumentActions.DocumentActionstypes.LOAD_CHECKS),
    exhaustMap((action: any) => {
      return this.receptionDocumentseService.getChecks(action.data).pipe(
        map((resp: DocumentsResponse) => {
          console.log('Checks');
          console.log(resp);
          if(resp.success) {
            return DocumentActions.loadChecksSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return DocumentActions.loadChecksFailure(
              {
                action: 'Load Checks',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(DocumentActions.loadChecksFailure(
          {
            action: 'Load Checks',
            error: err
          }
        )))
      )
    })
  ));

  confirmDocumentsReception$ = createEffect( () => this.actions$.pipe(
    ofType(DocumentActions.DocumentActionstypes.CONFIRM_DOCUMENTS_RECEPTION),
    exhaustMap((action: any) => {
      return this.receptionDocumentseService.confirmdocumentsReception(action.data).pipe(
        map((resp: confirmDocumentsReceptionResponse) => {
          console.log('confirmDocumentsReception');
          console.log(resp);
          if(resp.success) {
            return DocumentActions.confirmDocumentsReceptionSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return DocumentActions.confirmDocumentsReceptionFailure(
              {
                action: 'confirm Documents Reception',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(DocumentActions.confirmDocumentsReceptionFailure(
          {
            action: 'confirm Documents Reception',
            error: err
          }
        )))
      )
    })
  ));
}
