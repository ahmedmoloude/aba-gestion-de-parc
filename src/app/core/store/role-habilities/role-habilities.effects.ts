import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import { AnyResponse} from 'app/core/models/facturation/response-data.model';
import * as RoleHabilitiesActions from 'app/core/store/role-habilities/role-habilities.actions';
import { RoleService } from 'app/core/services/role.service';


@Injectable()
export class RoleHabilitiesEffects {

  constructor(private actions$: Actions,
    private roleService: RoleService,
    private _toast: ToastService) {}

  loadRoleHabilities$ = createEffect( () => this.actions$.pipe(
    ofType(RoleHabilitiesActions.RoleHabilitiesActionstypes.LOAD_ROLE_HABILITIES),
    exhaustMap((action: any) => {
      return this.roleService.getRoleHabilities(action.data).pipe(
        map((resp: AnyResponse) => {
          console.log('Role Habilities');
          console.log(resp);
          if(resp.success) {
            return RoleHabilitiesActions.loadRoleHabilitiesSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return RoleHabilitiesActions.loadRoleHabilitiesFailure(
              {
                action: 'Load Role Habilities',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(RoleHabilitiesActions.loadRoleHabilitiesFailure(
          {
            action: 'Load Role Habilities',
            error: err
          }
        )))
      )
    })
  ));

  addRoleHabilities$ = createEffect( () => this.actions$.pipe(
    ofType(RoleHabilitiesActions.RoleHabilitiesActionstypes.ADD_ROLE_HABILITIES),
    exhaustMap((action: any) => {
      return this.roleService.addRoleHabilities(action.data).pipe(
        map((resp: AnyResponse) => {
          console.log('Role Habilities');
          console.log(resp);
          if(resp.success) {
            return RoleHabilitiesActions.addRoleHabilitiesSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return RoleHabilitiesActions.addRoleHabilitiesFailure(
              {
                action: 'Add Role Habilities',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(RoleHabilitiesActions.addRoleHabilitiesFailure(
          {
            action: 'Add Role Habilities',
            error: err
          }
        )))
      )
    })
  ));
}
