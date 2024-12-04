import { createAction, props } from '@ngrx/store';


export enum RoleActionstypes {
  /* Load Roles */
  LOAD_ROLES = '[Role] Load Roles',
  LOAD_ROLES_SUCCESS = '[Role] Load Roles Success',
  LOAD_ROLES_FAILURE = '[Role] Load Roles Failure',

  /* Add Role */
  ADD_ROLE = '[Role] Add Role',
  ADD_ROLE_SUCCESS = '[Role] Add Role Success',
  ADD_ROLE_FAILURE = '[Role] Add Role Failure',
}

/* Load Role Actions */
export const loadRoles = createAction(
  RoleActionstypes.LOAD_ROLES,
);

export const loadRolesSuccess = createAction(
  RoleActionstypes.LOAD_ROLES_SUCCESS,
  props<{ data: any[] }>()
);

export const loadRolesFailure = createAction(
  RoleActionstypes.LOAD_ROLES_FAILURE,
  props<{ action: string; error: any }>()
);

/* Add Role Actions */
export const addRole = createAction(
  RoleActionstypes.ADD_ROLE,
  props<{ data: any }>()
);

export const addRoleSuccess = createAction(
  RoleActionstypes.ADD_ROLE_SUCCESS,
  props<{ data: any }>()
);

export const addRoleFailure = createAction(
  RoleActionstypes.ADD_ROLE_FAILURE,
  props<{ action: string; error: any }>()
);

