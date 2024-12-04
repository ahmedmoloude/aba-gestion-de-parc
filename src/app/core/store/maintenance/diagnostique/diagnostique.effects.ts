import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import {
  AnyResponse,
  CreateInterventionResponse,
  DiagnostiqueResponse,
  InterventionResponse,
} from 'app/core/models/facturation/response-data.model';
import { InterventionMaintenanceService } from 'app/core/services/maintenance/intervention-maintenance.service';
import * as DiagnostiqueActions from 'app/core/store/maintenance/diagnostique/diagnostique.actions';

@Injectable()
export class DiagnostiqueEffects {
  constructor(
    private actions$: Actions,
    private interventionMaintenanceService: InterventionMaintenanceService,
    private _toast: ToastService
  ) {}

  loadDiagnostique$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DiagnostiqueActions.DiagnostiqueActionsType.LOAD_DIAGNOSTIQUE),
      exhaustMap((action: any) => {
        return this.interventionMaintenanceService
          .getDiagnosticDetail(action.data)
          .pipe(
            map((resp: InterventionResponse) => {
              console.log('intervention Maintenance');
              console.log(resp);
              if (resp.success) {
                return DiagnostiqueActions.loadDiagnostiqueSuccess({
                  data: resp.response,
                });
              } else {
                this._toast.error('une erreur est survenue!');
                return DiagnostiqueActions.loadDiagnostiqueFailure({
                  action: 'Load Intervention',
                  error: resp.message,
                });
              }
            }),
            catchError((err) =>
              of(
                DiagnostiqueActions.loadDiagnostiqueFailure({
                  action: 'Load Intervention',
                  error: err,
                })
              )
            )
          );
      })
    )
  );

  createDiagnostique$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DiagnostiqueActions.DiagnostiqueActionsType.CREATE_DIAGNOSTIQUE),
      exhaustMap((action: any) => {
        return this.interventionMaintenanceService
          .createDiagnostic(action.data)
          .pipe(
            map((resp: DiagnostiqueResponse) => {
              console.log('Diagnostique');
              console.log(resp);
              if (resp.success) {
                return DiagnostiqueActions.createDiagnostiqueSuccess({
                  data: resp.response,
                });
              } else {
                this._toast.error('une erreur est survenue!');
                return DiagnostiqueActions.createDiagnostiqueFailure({
                  action: 'Create Diagnostique',
                  error: resp.message,
                });
              }
            }),
            catchError((err) =>
              of(
                DiagnostiqueActions.createDiagnostiqueFailure({
                  action: 'Create Diagnostique',
                  error: err,
                })
              )
            )
          );
      })
    )
  );

  createIntervention$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DiagnostiqueActions.DiagnostiqueActionsType.CREATE_INTERVENTION),
      exhaustMap((action: any) => {
        return this.interventionMaintenanceService
          .createIntervention(action.data)
          .pipe(
            map((resp: CreateInterventionResponse) => {
              console.log('Intervention');
              console.log(resp);
              if (resp.success) {
                return DiagnostiqueActions.createInterventionSuccess({
                  data: resp.response,
                });
              } else {
                this._toast.error('une erreur est survenue!');
                return DiagnostiqueActions.createInterventionFailure({
                  action: 'Create Intervention',
                  error: resp.message,
                });
              }
            }),
            catchError((err) =>
              of(
                DiagnostiqueActions.createInterventionFailure({
                  action: 'Create Intervention',
                  error: err,
                })
              )
            )
          );
      })
    )
  );

  addPieceToIntervention$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        DiagnostiqueActions.DiagnostiqueActionsType.ADD_PIECE_TO_INTERVENTION
      ),
      exhaustMap((action: any) => {
        return this.interventionMaintenanceService
          .addPieceToIntervention(action.data)
          .pipe(
            map((resp: InterventionResponse) => {
              console.log('add Piece To Intervention');
              console.log(resp);
              if (resp.success) {
                this._toast.success('la pièce jointe est ajoutée avec succés');
                return DiagnostiqueActions.addPieceToInterventionSuccess();
              } else {
                this._toast.error('une erreur est survenue!');
                return DiagnostiqueActions.addPieceToInterventionFailure({
                  action: 'add Piece To Intervention',
                  error: resp.message,
                });
              }
            }),
            catchError((err) =>
              of(
                DiagnostiqueActions.addPieceToInterventionFailure({
                  action: 'add Piece To Intervention',
                  error: err,
                })
              )
            )
          );
      })
    )
  );
}
