import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as FactureActions from './facture.actions';
import { FactureService } from 'app/core/services/facturation/facture.service';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { AnyResponse, FactureResponse, FacturesHistoryResponse, FacturesResponse, GenerateFacturesResponse, PrefacturationResponse } from 'app/core/models/facturation/response-data.model';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.states';
import { updatePagination } from '../../pagination/pagination.actions';

@Injectable()
export class FactureEffects {

  constructor(private actions$: Actions,
              private factureService: FactureService,
              private router: Router,
              private _toast: ToastService,
              private store : Store<AppState>) {}

  loadFactures$ = createEffect(() => this.actions$.pipe(
    ofType(FactureActions.FactureActionstypes.LOAD_FACTURES),
    exhaustMap((action: any) => {
      return this.factureService.getBills(action.data, action.per_page , action.page)
      .pipe(
        map((resp: FacturesResponse) => {
          if (resp.success) {
            this.store.dispatch(updatePagination({
              currentPage: resp.response.current_page,
              pageSize: resp.response.per_page,
              totalItems: resp.response.total
             }));
            return FactureActions.loadFacturesSuccess({data: resp.response.data});
          } else {
            this._toast.error('Une Erreur est survenu !');
            return FactureActions.loadFacturesFailure({
              action: 'load Factures Failure',
              error: resp.message,
            });
          }
        }),
        catchError((error) => of(FactureActions.loadFacturesFailure({action: 'load Factures Failure', error})))
      )})
    )
  );

  loadFactureDetail$ = createEffect(() => this.actions$.pipe(
    ofType(FactureActions.FactureActionstypes.LOAD_FACTURE_DETAIL),
    exhaustMap((action: any) => {
      return this.factureService.getBillDetail(action.data)
      .pipe(
        map((resp: FactureResponse) => {
          console.log('facture detail');
          console.log(resp.response);
          if (resp.success) {
            return FactureActions.loadFactureDetailSuccess({data: resp.response});
          } else {
            this._toast.error('Une Erreur est survenu !');
            return FactureActions.loadFactureDetailFailure({
              action: 'load Facture detail Failure',
              error: resp.message,
            });
          }
        }),
        catchError((error) => of(FactureActions.loadFactureDetailFailure({action: 'load Facture Detail Failure', error})))
      )})
    )
  );

  prepareFacture$ = createEffect(() => this.actions$.pipe(
    ofType(FactureActions.FactureActionstypes.PREPARE_FACTURE),
    exhaustMap((action: any) => {
      return this.factureService.onPrefacturation(action.data)
      .pipe(
        map((resp: PrefacturationResponse) => {
          if (resp.success) {
            return FactureActions.prepareFactureSuccess({data: resp.response});
          } else {
            this._toast.error('Une Erreur est survenu !');
            return FactureActions.prepareFactureFailure({
              action: 'prepare Facture  Failure',
              error: resp.message,
            });
          }
        }),
        catchError((error) => of(FactureActions.prepareFactureFailure({action: 'prepare Facture Failure', error})))
      )})
    )
  );

  generateFacture$ = createEffect(() => this.actions$.pipe(
    ofType(FactureActions.FactureActionstypes.GENERATE_FACTURES),
    exhaustMap((action: any) => {
      return this.factureService.onGnerateFactures(action.data)
      .pipe(
        map((resp: GenerateFacturesResponse) => {
          if (resp.success) {
            console.log(resp);
            this.router.navigate(['/listefactures']);
            return FactureActions.generateFacturesSuccess();
          } else {
            this._toast.error('Une Erreur est survenu !');
            return FactureActions.generateFacturesFailure({
              action: 'generate Factures Failure',
              error: resp.message,
            });
          }
        }),
        catchError((error) => of(FactureActions.generateFacturesFailure({action: 'generate Factures Failure', error})))
      )})
    )
  );

  addAttachmentToFacture$ = createEffect(() => this.actions$.pipe(
    ofType(FactureActions.FactureActionstypes.ADD_ATTACHMENT_FACTURE),
    exhaustMap((action: any) => {
      return this.factureService.onAddAttachmentToFacture(action.data)
      .pipe(
        map((resp: GenerateFacturesResponse) => {
          if (resp.success) {
            console.log(resp);
            this._toast.success('la pièce jointe est ajoutée avec succés');
            return FactureActions.addAttachmentToFactureSuccess({data:resp.response});
          } else {
            this._toast.error('Une Erreur est survenu !');
            return FactureActions.addAttachmentToFactureFailure({
              action: 'add attachment to Facture Failure',
              error: resp.message,
            });
          }
        }),
        catchError((error) => of(FactureActions.addAttachmentToFactureFailure({action: 'add attachment to Facture Failure', error})))
      )})
    )
  );

  recalculateFacture$ = createEffect(() => this.actions$.pipe(
    ofType(FactureActions.FactureActionstypes.RECALCULATE_FACTURE),
    exhaustMap((action: any) => {
      return this.factureService.recalculateFacture(action.data)
      .pipe(
        map((resp: GenerateFacturesResponse) => {
          if (resp.success) {
            console.log(resp);
            this._toast.success('la facture est recalculée avec succés');
            return FactureActions.recalculateFactureSuccess({data:resp.response});
          } else {
            this._toast.error('Une Erreur est survenu !');
            return FactureActions.recalculateFactureFailure({
              action: 'recalculate Facture Failure',
              error: resp.message,
            });
          }
        }),
        catchError((error) => of(FactureActions.recalculateFactureFailure({action: 'recalculate Facture Failure', error})))
      )})
    )
  );

  loadFacturesHistory$ = createEffect(() => this.actions$.pipe(
    ofType(FactureActions.FactureActionstypes.LOAD_FACTURES_HISTORY),
    exhaustMap((action: any) => {
      return this.factureService.getBillsHistory(action.data, action.per_page , action.page)
      .pipe(
        map((resp: FacturesHistoryResponse) => {
          if (resp.success) {
            return FactureActions.loadFacturesHistorySuccess({data: resp.response.data});
          } else {
            this._toast.error('Une Erreur est survenu !');
            return FactureActions.loadFacturesHistoryFailure({
              action: 'load Factures History Failure',
              error: resp.message,
            });
          }
        }),
        catchError((error) => of(FactureActions.loadFacturesHistoryFailure({action: 'load Factures History Failure', error})))
      )})
    )
  );

  cancelFactures$ = createEffect(() => this.actions$.pipe(
    ofType(FactureActions.FactureActionstypes.CANCEL_FACTURE),
    exhaustMap((action: any) => {
      console.log('type action');
      console.log(action);
      return this.factureService.cancelBill(action.data)
      .pipe(
        map((resp: FacturesResponse) => {
          if (resp.success) {
            this._toast.success('La facture est annulée avec succès!');
            return FactureActions.cancelFactureSuccess({data: resp.response});
          } else {
            this._toast.error('Une Erreur est survenu !');
            return FactureActions.cancelFactureFailure({
              action: 'cancel Facture Failure',
              error: resp.message,
            });
          }
        }),
        catchError((error) => of(FactureActions.cancelFactureFailure({action: 'cancel Facture Failure', error})))
      )})
    )
  );

  addMotifToFacture$ = createEffect(() => this.actions$.pipe(
    ofType(FactureActions.FactureActionstypes.ADD_MOTIF_FACTURE),
    exhaustMap((action: any) => {
      return this.factureService.onAddMotifToFacture(action.data)
      .pipe(
        map((resp: AnyResponse) => {
          if (resp.success) {
            console.log(resp);
            this._toast.success('le motif est ajouté avec succés');
            return FactureActions.addMotifToFactureSuccess({data:resp.response});
          } else {
            this._toast.error('Une Erreur est survenu !');
            return FactureActions.addMotifToFactureFailure({
              action: 'add Motif to Facture Failure',
              error: resp.message,
            });
          }
        }),
        catchError((error) => of(FactureActions.addMotifToFactureFailure({action: 'add Motif to Facture Failure', error})))
      )})
    )
  );

  loadPayedFactures$ = createEffect(() => this.actions$.pipe(
    ofType(FactureActions.FactureActionstypes.LOAD_PAYED_FACTURES),
    exhaustMap((action: any) => {
      return this.factureService.getPayedBills()
      .pipe(
        map((resp: AnyResponse) => {
          if (resp.success) {
            return FactureActions.loadPayedFacturesSuccess({data: resp.response.data});
          } else {
            this._toast.error('Une Erreur est survenu !');
            return FactureActions.loadPayedFacturesFailure({
              action: 'load Payed Factures Failure',
              error: resp.message,
            });
          }
        }),
        catchError((error) => of(FactureActions.loadPayedFacturesFailure({action: 'load Payed Factures Failure', error})))
      )})
    )
  );

  loadCustomerPayedFactures$ = createEffect(() => this.actions$.pipe(
    ofType(FactureActions.FactureActionstypes.LOAD_CUSTOMER_PAYED_FACTURES),
    exhaustMap((action: any) => {
      return this.factureService.getCustomerPayedBills(action.data)
      .pipe(
        map((resp: AnyResponse) => {
          if (resp.success) {
            return FactureActions.loadCustomerPayedFacturesSuccess({data: resp.response});
          } else {
            this._toast.error('Une Erreur est survenu !');
            return FactureActions.loadCustomerPayedFacturesFailure({
              action: 'load CustomerPayed Factures Failure',
              error: resp.message,
            });
          }
        }),
        catchError((error) => of(FactureActions.loadCustomerPayedFacturesFailure({action: 'load CustomerPayed Factures Failure', error})))
      )})
    )
  );

  exportFactures$ = createEffect( () => this.actions$.pipe(
    ofType(FactureActions.FactureActionstypes.EXPORT_FACTURES),
    exhaustMap((action: any) => {
      return this.factureService.exportFacture(action.data).pipe(
        map((resp) => {
          console.log('export facture');
          console.log(resp);
            return FactureActions.exportFacturesSuccess({data: resp})
        }),
        catchError((err) => of(FactureActions.exportFacturesFailure(
          {
            action: 'Export Factures',
            error: err
          }
        )))
      )
    })
  ));

  regenerateAffretementFactures$ = createEffect(() => this.actions$.pipe(
    ofType(FactureActions.FactureActionstypes.REGENERATE_AFFRETEMENT_FACTURE),
    exhaustMap((action: any) => {
      console.log('type action');
      console.log(action);
      return this.factureService.regenerateAffretementFacture(action.data)
      .pipe(
        map((resp: FacturesResponse) => {
          if (resp.success) {
            this._toast.success('La facture est regénerée avec succès!');
            return FactureActions.regenerateAffretementFactureSuccess({data: resp.response});
          } else {
            this._toast.error('Une Erreur est survenu !');
            return FactureActions.regenerateAffretementFactureFailure({
              action: 'regenerate Affretement Facture Failure',
              error: resp.message,
            });
          }
        }),
        catchError((error) => of(FactureActions.regenerateAffretementFactureFailure({action: 'regenerate Affretement Facture Failure', error})))
      )})
    )
  );

}


