import { Action, createReducer, on } from '@ngrx/store';
import * as RoleActions from 'app/core/store/role/role.actions';



export const roleFeatureKey = 'role';

export enum StateEnum {
  INIT ='INIT',
  LOADING ='LOADING',
  SUCCESS ='SUCCESS',
  ERROR ='ERROR',
}
export interface RoleState {
  roles: any[],
  role: any,
  rolesState: StateEnum,
  roleState: StateEnum,
  errorMessage: { action: string; error: any } | null;
}

export const initialState: RoleState = {
  roles: null,
  role: null,
  rolesState: StateEnum.INIT,
  roleState: StateEnum.INIT,
  errorMessage: null,
};



export const roleReducer = createReducer(
  initialState,
  on(RoleActions.loadRoles, state => ({...state, rolesState: StateEnum.LOADING})),
  on(RoleActions.loadRolesSuccess, (state, {data}) => ({...state, rolesState: StateEnum.SUCCESS, roles: data})),
  on(RoleActions.loadRolesFailure, (state, {error}) => ({...state, rolesState: StateEnum.ERROR, errorMessage: error})),
  on(RoleActions.addRole, state => ({...state, roleState: StateEnum.LOADING})),
  on(RoleActions.addRoleSuccess, (state, {data}) => ({...state, roleState: StateEnum.SUCCESS, role: data, roles: [data, ...state.roles]})),
  on(RoleActions.addRoleFailure, (state, {error}) => ({...state, roleState: StateEnum.ERROR, errorMessage: error})),
);

