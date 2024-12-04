import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import { AnyResponse} from 'app/core/models/facturation/response-data.model';
import * as PlanningActions from 'app/core/store/maintenance/planning/planning.actions';
import { PlanningService } from 'app/core/services/maintenance/planning.service';




@Injectable()
export class PlanningEffects {

  constructor(private actions$: Actions,
    private pieceRechangeService: PlanningService,
    private _toast: ToastService) {}

  loadPlannings$ = createEffect( () => this.actions$.pipe(
    ofType(PlanningActions.PlanningActionsType.LOAD_PLANNINGS),
    exhaustMap((action: any) => {
      return this.pieceRechangeService.getPlannings(action.data).pipe(
        map((resp: any) => {
          console.log('Plannings');
          console.log(resp);
          if(resp.success) {
            return PlanningActions.loadPlanningsSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return PlanningActions.loadPlanningsFailure(
              {
                action: 'Load Plannings',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(PlanningActions.loadPlanningsFailure(
          {
            action: 'Load Plannings',
            error: err
          }
        )))
      )
    })
  ));

  addPlanning$ = createEffect( () => this.actions$.pipe(
    ofType(PlanningActions.PlanningActionsType.ADD_PLANNING),
    exhaustMap((action: any) => {
      return this.pieceRechangeService.addPlanning(action.data).pipe(
        map((resp: any) => {
          console.log('Planning');
          console.log(resp);
          if(resp.success) {
            return PlanningActions.addPlanningSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return PlanningActions.addPlanningFailure(
              {
                action: 'Add Planning',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(PlanningActions.addPlanningFailure(
          {
            action: 'Add Planning',
            error: err
          }
        )))
      )
    })
  ));


  accomplishPlanning$ = createEffect( () => this.actions$.pipe(
    ofType(PlanningActions.PlanningActionsType.ACCOMPLISH_PLANNING),
    exhaustMap((action: any) => {
      return this.pieceRechangeService.accomplishPlanning(action.data).pipe(
        map((resp: any) => {
          console.log('accomplish Planning');
          console.log(resp);
          if(resp.success) {
            return PlanningActions.accomplishPlanningSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return PlanningActions.accomplishPlanningFailure(
              {
                action: 'accomplish Planning',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(PlanningActions.accomplishPlanningFailure(
          {
            action: 'accomplish Planning',
            error: err
          }
        )))
      )
    })
  ));

  updatePlanning$ = createEffect( () => this.actions$.pipe(
    ofType(PlanningActions.PlanningActionsType.UPDATE_PLANNING),
    exhaustMap((action: any) => {
      return this.pieceRechangeService.updatePlanning(action.data).pipe(
        map((resp: any) => {
          console.log('Planning');
          console.log(resp);
          if(resp.success) {
            return PlanningActions.updatePlanningSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return PlanningActions.updatePlanningFailure(
              {
                action: 'update Plannings',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(PlanningActions.updatePlanningFailure(
          {
            action: 'update Plannings',
            error: err
          }
        )))
      )
    })
  ));

  deletePlanning$ = createEffect( () => this.actions$.pipe(
    ofType(PlanningActions.PlanningActionsType.DELETE_PLANNING),
    exhaustMap((action: any) => {
      return this.pieceRechangeService.deletePlanning(action.data).pipe(
        map((resp: any) => {
          console.log('Planning');
          console.log(resp);
          if(resp.success) {
            return PlanningActions.deletePlanningSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return PlanningActions.deletePlanningFailure(
              {
                action: 'Delete Planning',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(PlanningActions.deletePlanningFailure(
          {
            action: 'Delete Planning',
            error: err
          }
        )))
      )
    })
  ));

}
