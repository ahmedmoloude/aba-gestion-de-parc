import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import { AnyResponse} from 'app/core/models/facturation/response-data.model';
import * as RoleActions from 'app/core/store/role/role.actions';
import { RoleService } from 'app/core/services/role.service';


@Injectable()
export class RoleEffects {

  constructor(private actions$: Actions,
    private roleService: RoleService,
    private _toast: ToastService) {}

  loadRoles$ = createEffect( () => this.actions$.pipe(
    ofType(RoleActions.RoleActionstypes.LOAD_ROLES),
    exhaustMap((action: any) => {
      return this.roleService.getRoles().pipe(
        map((resp: AnyResponse) => {
          console.log('Role');
          console.log(resp);
          if(resp.success) {
            return RoleActions.loadRolesSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return RoleActions.loadRolesFailure(
              {
                action: 'Load Roles',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(RoleActions.loadRolesFailure(
          {
            action: 'Load Roles',
            error: err
          }
        )))
      )
    })
  ));

  addRole$ = createEffect( () => this.actions$.pipe(
    ofType(RoleActions.RoleActionstypes.ADD_ROLE),
    exhaustMap((action: any) => {
      return this.roleService.addRole(action.data).pipe(
        map((resp: AnyResponse) => {
          console.log('Role');
          console.log(resp);
          if(resp.success) {
            return RoleActions.addRoleSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return RoleActions.addRoleFailure(
              {
                action: 'Add Role',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(RoleActions.addRoleFailure(
          {
            action: 'Add Role',
            error: err
          }
        )))
      )
    })
  ));
}
