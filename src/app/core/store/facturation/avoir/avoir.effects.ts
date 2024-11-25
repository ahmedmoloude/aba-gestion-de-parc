import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AvoirService } from 'app/core/services/facturation/avoir.service';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import { AnyResponse, AvoirResponse, AvoirsResponse, FactureResponse, RapportAvoirResponse } from 'app/core/models/facturation/response-data.model';
import * as AvoirActions from 'app/core/store/facturation/avoir/avoir.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.states';
import { updatePagination } from '../../pagination/pagination.actions';

@Injectable()
export class AvoirEffects {

  constructor(private actions$: Actions,
              private avoirService: AvoirService,
              private _toast: ToastService,
              private store : Store<AppState> ) {}

  loadAvoirs$ = createEffect( () => this.actions$.pipe(
    ofType(AvoirActions.AvoirActionstypes.LOAD_AVOIRS),
    exhaustMap((action: any) => {
      return this.avoirService.getAvoirs(action.data, action.per_page , action.page).pipe(
        map((resp: AvoirsResponse) => {
          console.log('avoirs');
          console.log(resp);
          if(resp.success) {
            this.store.dispatch(updatePagination({
              currentPage: resp.response.current_page,
              pageSize: resp.response.per_page,
              totalItems: resp.response.total
             }));
            return AvoirActions.loadAvoirsSuccess({data: resp.response.data})
          } else {
            this._toast.error('une erreur est survenue!');
            return AvoirActions.loadAvoirsFailure(
              {
                action: 'Load Avoirs',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(AvoirActions.loadAvoirsFailure(
          {
            action: 'Load Avoirs',
            error: err
          }
        )))
      )
    })
  ));

  loadAvoir$ = createEffect( () => this.actions$.pipe(
    ofType(AvoirActions.AvoirActionstypes.LOAD_AVOIR),
    exhaustMap((action: any) => {
      return this.avoirService.getAvoir(action.uuid).pipe(
        map((resp: AvoirResponse) => {
          console.log('avoir');
          console.log(resp);
          if(resp.success) {
            return AvoirActions.loadAvoirSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return AvoirActions.loadAvoirFailure(
              {
                action: 'Avoir',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(AvoirActions.loadAvoirFailure(
          {
            action: 'Avoir',
            error: err
          }
        )))
      )
    })
  ));

  createAvoir$ = createEffect( () => this.actions$.pipe(
    ofType(AvoirActions.AvoirActionstypes.CREATE_AVOIR),
    exhaustMap((action: any) => {
      return this.avoirService.createAvoir(action.data).pipe(
        map((resp: AvoirResponse) => {
          console.log('avoir');
          console.log(resp);
          if(resp.success) {
            return AvoirActions.createAvoirSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return AvoirActions.createAvoirFailure(
              {
                action: 'Avoir',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(AvoirActions.createAvoirFailure(
          {
            action: 'Avoir',
            error: err
          }
        )))
      )
    })
  ));

  updateAvoir$ = createEffect( () => this.actions$.pipe(
    ofType(AvoirActions.AvoirActionstypes.UPDATE_AVOIR),
    exhaustMap((action: any) => {
      return this.avoirService.updateAvoir(action.data).pipe(
        map((resp: AvoirResponse) => {
          console.log('avoir');
          console.log(resp);
          if(resp.success) {
            return AvoirActions.updateAvoirSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return AvoirActions.updateAvoirFailure(
              {
                action: 'Avoir',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(AvoirActions.updateAvoirFailure(
          {
            action: 'Avoir',
            error: err
          }
        )))
      )
    })
  ));

  deleteAvoir$ = createEffect( () => this.actions$.pipe(
    ofType(AvoirActions.AvoirActionstypes.DELETE_AVOIR),
    exhaustMap((action: any) => {
      return this.avoirService.deleteAvoir(action.uuid).pipe(
        map((resp: AvoirResponse) => {
          console.log('avoir');
          console.log(resp);
          if(resp.success) {
            return AvoirActions.deleteAvoirSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return AvoirActions.deleteAvoirFailure(
              {
                action: 'Avoir',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(AvoirActions.deleteAvoirFailure(
          {
            action: 'Avoir',
            error: err
          }
        )))
      )
    })
  ));

  loadFactureAvoir$ = createEffect( () => this.actions$.pipe(
    ofType(AvoirActions.AvoirActionstypes.LOAD_FACTURE_AVOIR),
    exhaustMap((action: any) => {
      return this.avoirService.getFactureAvoir(action.reference).pipe(
        map((resp: FactureResponse) => {
          console.log('avoir');
          console.log(resp);
          if(resp.success) {
            return AvoirActions.loadFactureAvoirSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return AvoirActions.loadFactureAvoirFailure(
              {
                action: 'Avoir',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(AvoirActions.loadFactureAvoirFailure(
          {
            action: 'Avoir',
            error: err
          }
        )))
      )
    })
  ));

  loadConventionClient$ = createEffect( () => this.actions$.pipe(
    ofType(AvoirActions.AvoirActionstypes.LOAD_CONVENTION_CLIENT),
    exhaustMap((action: any) => {
      return this.avoirService.getMontantAvoir(action.uuid).pipe(
        map((resp: AnyResponse) => {
          console.log('load Convention Client');
          console.log(resp);
          if(resp.success) {
            return AvoirActions.loadConventionClientSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return AvoirActions.loadConventionClientFailure(
              {
                action: 'load Convention Client',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(AvoirActions.loadConventionClientFailure(
          {
            action: 'load Convention Client',
            error: err
          }
        )))
      )
    })
  ));

  exportAvoirs$ = createEffect( () => this.actions$.pipe(
    ofType(AvoirActions.AvoirActionstypes.EXPORT_AVOIRS),
    exhaustMap((action: any) => {
      return this.avoirService.exportAvoirs().pipe(
        map((resp: AnyResponse) => {
          console.log('export avoir');
          console.log(resp);
          if(resp.success) {
            return AvoirActions.exportAvoirsSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return AvoirActions.exportAvoirsFailure(
              {
                action: 'Export Avoirs',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(AvoirActions.exportAvoirsFailure(
          {
            action: 'Export Avoirs',
            error: err
          }
        )))
      )
    })
  ));

  exportPdfAvoir$ = createEffect( () => this.actions$.pipe(
    ofType(AvoirActions.AvoirActionstypes.EXPORT_PDF_AVOIR),
    exhaustMap((action: any) => {
      return this.avoirService.exportPdfAvoir(action.data).pipe(
        map((resp: AnyResponse) => {
          console.log('EXPORT_PDF_AVOIR');
          console.log(resp);
          if(resp.success) {
            return AvoirActions.exportPdfAvoirSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return AvoirActions.exportPdfAvoirFailure(
              {
                action: 'EXPORT_PDF_AVOIR',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(AvoirActions.exportPdfAvoirFailure(
          {
            action: 'EXPORT_PDF_AVOIR',
            error: err
          }
        )))
      )
    })
  ));

  loadRapportAvoir$ = createEffect( () => this.actions$.pipe(
    ofType(AvoirActions.AvoirActionstypes.LOAD_RAPPORT_AVOIR),
    exhaustMap((action: any) => {
      return this.avoirService.getRapportAvoir().pipe(
        map((resp: RapportAvoirResponse) => {
          console.log('Rapport avoir');
          console.log(resp);
          if(resp.success) {
            return AvoirActions.loadRapportAvoirSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return AvoirActions.loadRapportAvoirFailure(
              {
                action: 'Rapport Avoir',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(AvoirActions.loadRapportAvoirFailure(
          {
            action: 'Rapport Avoir',
            error: err
          }
        )))
      )
    })
  ));


}
