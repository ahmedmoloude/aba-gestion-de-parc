import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import { AnyResponse} from 'app/core/models/facturation/response-data.model';
import * as demandePiecesActions from'app/core/store/maintenance/demande-piece/demande-piece.actions';
import { DemandePieceService } from 'app/core/services/maintenance/demande-piece.service';




@Injectable()
export class DemandePiecesEffects {
  constructor(private actions$: Actions,
    private demandePieceService: DemandePieceService,
    private _toast: ToastService) {}

  loadDemandePiecesList$ = createEffect( () => this.actions$.pipe(
    ofType(demandePiecesActions.DemandePiecesActionsType.LOAD_DEMANDE_PIECES_LIST),
    exhaustMap((action: any) => {
      return this.demandePieceService.getDemandePiecesList(action.data).pipe(
        map((resp: any) => {
          console.log('PieceRequested');
          console.log(resp);
          if(resp.success) {
            return demandePiecesActions.loadDemandePiecesListSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return demandePiecesActions.loadDemandePiecesListFailure(
              {
                action: 'Load PieceRequested',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(demandePiecesActions.loadDemandePiecesListFailure(
          {
            action: 'Load PieceRequested',
            error: err
          }
        )))
      )
    })
  ));

  loadDemandePiecesHistoric$ = createEffect( () => this.actions$.pipe(
    ofType(demandePiecesActions.DemandePiecesActionsType.LOAD_DEMANDE_PIECES_HISTORIC),
    exhaustMap((action: any) => {
      return this.demandePieceService.getDemandePiecesHistoric(action.data).pipe(
        map((resp: any) => {
          console.log('loadDemandePiecesHistoric');
          console.log(resp);
          if(resp.success) {
            return demandePiecesActions.loadDemandePiecesHistoricSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return demandePiecesActions.loadDemandePiecesHistoricFailure(
              {
                action: 'Load PieceRequested Historic',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(demandePiecesActions.loadDemandePiecesHistoricFailure(
          {
            action: 'Load PieceRequested Historic',
            error: err
          }
        )))
      )
    })
  ));

  loadDemandePiecesDetail$ = createEffect( () => this.actions$.pipe(
    ofType(demandePiecesActions.DemandePiecesActionsType.LOAD_DEMANDE_PIECES_DETAIL),
    exhaustMap((action: any) => {
      return this.demandePieceService.getDemandePiecesDetail(action.data).pipe(
        map((resp: any) => {
          console.log('PieceRequested');
          console.log(resp);
          if(resp.success) {
            return demandePiecesActions.loadDemandePiecesDetailSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return demandePiecesActions.loadDemandePiecesDetailFailure(
              {
                action: 'Load PieceRequested Detail',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(demandePiecesActions.loadDemandePiecesDetailFailure(
          {
            action: 'Load PieceRequested Detail',
            error: err
          }
        )))
      )
    })
  ));

  loadDemandePiecesBonCommande$ = createEffect( () => this.actions$.pipe(
    ofType(demandePiecesActions.DemandePiecesActionsType.LOAD_DEMANDE_PIECES_BON_COMMANDE),
    exhaustMap((action: any) => {
      return this.demandePieceService.getDemandePiecesBonCommande(action.data).pipe(
        map((resp: any) => {
          console.log('PieceRequested Bon commande');
          console.log(resp);
          if(resp.success) {
            return demandePiecesActions.loadDemandePiecesBonCommandeSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return demandePiecesActions.loadDemandePiecesBonCommandeFailure(
              {
                action: 'Load PieceRequested',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(demandePiecesActions.loadDemandePiecesBonCommandeFailure(
          {
            action: 'Load PieceRequested',
            error: err
          }
        )))
      )
    })
  ));

  loadDemandePiecesBon$ = createEffect( () => this.actions$.pipe(
    ofType(demandePiecesActions.DemandePiecesActionsType.LOAD_DEMANDE_PIECES_BON),
    exhaustMap((action: any) => {
      return this.demandePieceService.getDemandePiecesBon(action.data).pipe(
        map((resp: any) => {
          console.log('PieceRequested');
          console.log(resp);
          if(resp.success) {
            return demandePiecesActions.loadDemandePiecesBonSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return demandePiecesActions.loadDemandePiecesBonFailure(
              {
                action: 'Load PieceRequested',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(demandePiecesActions.loadDemandePiecesBonFailure(
          {
            action: 'Load PieceRequested',
            error: err
          }
        )))
      )
    })
  ));

  generateDemandePiecesBonAchat$ = createEffect( () => this.actions$.pipe(
    ofType(demandePiecesActions.DemandePiecesActionsType.GENERATE_DEMANDE_PIECES_BON_ACHAT),
    exhaustMap((action: any) => {
      return this.demandePieceService.generateDemandePiecesBonAchat(action.data).pipe(
        map((resp: any) => {
          console.log('PieceRequested');
          console.log(resp);
          if(resp.success) {
            this._toast.success('Bon d\'Achat généré avec succès!');
            return demandePiecesActions.generateDemandePiecesBonAchatSuccess({dataG: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return demandePiecesActions.generateDemandePiecesBonAchatFailure(
              {
                action: 'Load PieceRequested',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(demandePiecesActions.generateDemandePiecesBonAchatFailure(
          {
            action: 'Load PieceRequested',
            error: err
          }
        )))
      )
    })
  ));

  loadDemandePiecesBonSortie$ = createEffect( () => this.actions$.pipe(
    ofType(demandePiecesActions.DemandePiecesActionsType.LOAD_DEMANDE_PIECES_BON_SORTIE),
    exhaustMap((action: any) => {
      return this.demandePieceService.getDemandePiecesBonSortie(action.data).pipe(
        map((resp: any) => {
          console.log('PieceRequested');
          console.log(resp);
          if(resp.success) {
            return demandePiecesActions.loadDemandePiecesBonSortieSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return demandePiecesActions.loadDemandePiecesBonSortieFailure(
              {
                action: 'Load PieceRequested',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(demandePiecesActions.loadDemandePiecesBonSortieFailure(
          {
            action: 'Load PieceRequested',
            error: err
          }
        )))
      )
    })
  ));

  completeDemandePiecesCommande$ = createEffect( () => this.actions$.pipe(
    ofType(demandePiecesActions.DemandePiecesActionsType.COMPLETE_DEMANDE_PIECES_COMMANDE),
    exhaustMap((action: any) => {
      return this.demandePieceService.CompleteDemandePiecesCommande(action.data).pipe(
        map((resp: any) => {
          console.log('PieceRequested');
          console.log(resp);
          if(resp.success) {
            return demandePiecesActions.completeDemandePiecesCommandeSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return demandePiecesActions.completeDemandePiecesCommandeFailure(
              {
                action: 'Load PieceRequested',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(demandePiecesActions.completeDemandePiecesCommandeFailure(
          {
            action: 'Load PieceRequested',
            error: err
          }
        )))
      )
    })
  ));

  addDemandePiecesAttachment$ = createEffect( () => this.actions$.pipe(
    ofType(demandePiecesActions.DemandePiecesActionsType.ADD_DEMANDE_PIECES_ATTACHMENT),
    exhaustMap((action: any) => {
      return this.demandePieceService.addDemandePiecesattachment(action.data).pipe(
        map((resp: any) => {
          console.log('PieceRequested');
          console.log(resp);
          if(resp.success) {
            return demandePiecesActions.addDemandePiecesAttachmentSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return demandePiecesActions.addDemandePiecesAttachmentFailure(
              {
                action: 'Load PieceRequested',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(demandePiecesActions.addDemandePiecesAttachmentFailure(
          {
            action: 'Load PieceRequested',
            error: err
          }
        )))
      )
    })
  ));

}
