import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import {
  AnyResponse,
  InterventionResponse,
  InterventionsResponse,
} from 'app/core/models/facturation/response-data.model';
import { InterventionMaintenanceService } from 'app/core/services/maintenance/intervention-maintenance.service';
import * as MaintenanceInterventionsActions from 'app/core/store/maintenance/maintenance-intervention/maintenance-intervention.actions';
import { AppState } from '../../app.states';
import { Store } from '@ngrx/store';
import { updatePagination } from '../../pagination/pagination.actions';

@Injectable()
export class MaintenanceInterventionEffects {
  constructor(
    private actions$: Actions,
    private interventionMaintenanceService: InterventionMaintenanceService,
    private _toast: ToastService,
    private store : Store<AppState>
  ) { }

  loadMaintenanceInterventions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        MaintenanceInterventionsActions.MaintenanceInterventionsActionsType
          .LOAD_MAINTENANCE_INTERVENTIONS
      ),
      exhaustMap((action: any) => {
        return this.interventionMaintenanceService
          .getMaintenanceInterventions(action.data, action.per_page , action.page)
          .pipe(
            map((resp: InterventionsResponse) => {
              console.log('interventions Maintenance');
              console.log(resp);
              if (resp.success) {
                this.store.dispatch(updatePagination({
                  currentPage: resp.response.current_page,
                  pageSize: resp.response.per_page,
                  totalItems: resp.response.total
                 }));
                return MaintenanceInterventionsActions.loadMaintenanceInterventionsSuccess(
                  { data: resp.response.data }
                );
              } else {
                this._toast.error('une erreur est survenue!');
                return MaintenanceInterventionsActions.loadMaintenanceInterventionsFailure(
                  {
                    action: 'Load Interventions',
                    error: resp.message,
                  }
                );
              }
            }),
            catchError((err) =>
              of(
                MaintenanceInterventionsActions.loadMaintenanceInterventionsFailure(
                  {
                    action: 'Load Interventions',
                    error: err,
                  }
                )
              )
            )
          );
      })
    )
  );

  closeIntervention$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        MaintenanceInterventionsActions.MaintenanceInterventionsActionsType
          .CLOSE_INTERVENTION
      ),
      exhaustMap((action: any) => {
        return this.interventionMaintenanceService
          .closeIntervention(action.data)
          .pipe(
            map((resp: InterventionResponse) => {
              console.log('Close Intervention');
              console.log(resp);
              if (resp.success) {
                return MaintenanceInterventionsActions.closeInterventionSuccess(
                  {
                    data: resp.response,
                  }
                );
              } else {
                this._toast.error('une erreur est survenue!');
                return MaintenanceInterventionsActions.closeInterventionFailure(
                  {
                    action: 'Close Intervention',
                    error: resp.message,
                  }
                );
              }
            }),
            catchError((err) =>
              of(
                MaintenanceInterventionsActions.closeInterventionFailure({
                  action: 'Close Intervention',
                  error: err,
                })
              )
            )
          );
      })
    )
  );
}
