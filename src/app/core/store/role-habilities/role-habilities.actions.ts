import { createAction, props } from '@ngrx/store';


export enum RoleHabilitiesActionstypes {
  /* Load Role Habilities */
  LOAD_ROLE_HABILITIES = '[RoleHabilities] Load Role Habilities',
  LOAD_ROLE_HABILITIES_SUCCESS = '[RoleHabilities] Load Role Habilities Success',
  LOAD_ROLE_HABILITIES_FAILURE = '[RoleHabilities] Load Role Habilities Failure',

  /* Add Role Habilities */
  ADD_ROLE_HABILITIES = '[RoleHabilities] Add Role Habilities',
  ADD_ROLE_HABILITIES_SUCCESS = '[RoleHabilities] Add Role Habilities Success',
  ADD_ROLE_HABILITIES_FAILURE = '[RoleHabilities] Add Role Habilities Failure',
}

/* Load Role Actions */
export const loadRoleHabilities = createAction(
  RoleHabilitiesActionstypes.LOAD_ROLE_HABILITIES,
  props<{data: number}>()
);

export const loadRoleHabilitiesSuccess = createAction(
  RoleHabilitiesActionstypes.LOAD_ROLE_HABILITIES_SUCCESS,
  props<{ data: any[] }>()
);

export const loadRoleHabilitiesFailure = createAction(
  RoleHabilitiesActionstypes.LOAD_ROLE_HABILITIES_FAILURE,
  props<{ action: string; error: any }>()
);

/* Add Role Habilities Actions */
export const addRoleHabilities = createAction(
  RoleHabilitiesActionstypes.ADD_ROLE_HABILITIES,
  props<{ data: any }>()
);

export const addRoleHabilitiesSuccess = createAction(
  RoleHabilitiesActionstypes.ADD_ROLE_HABILITIES_SUCCESS,
  props<{ data: any }>()
);

export const addRoleHabilitiesFailure = createAction(
  RoleHabilitiesActionstypes.ADD_ROLE_HABILITIES_FAILURE,
  props<{ action: string; error: any }>()
);

