import { Action, createReducer, on } from '@ngrx/store';
import * as RoleHabilitiesActions from 'app/core/store/role-habilities/role-habilities.actions';



export const roleHabilitiesFeatureKey = 'roleHabilities';

export enum StateEnum {
  INIT ='INIT',
  LOADING ='LOADING',
  SUCCESS ='SUCCESS',
  ERROR ='ERROR',
}
export interface RoleHabilitiesState {
  loadRoleHabilities: any,
  loadRoleHabilitiesState: StateEnum,
  roleHabilities: any,
  roleHabilitiesState: StateEnum,
  errorMessage: { action: string; error: any } | null;
}

export const initialState: RoleHabilitiesState = {
  loadRoleHabilities: null,
  loadRoleHabilitiesState: StateEnum.INIT,
  roleHabilities: null,
  roleHabilitiesState: StateEnum.INIT,
  errorMessage: null,

};



export const roleHabilitiesReducer = createReducer(
  initialState,
  on(RoleHabilitiesActions.loadRoleHabilities, state => ({...state, loadRoleHabilitiesState: StateEnum.LOADING})),
  on(RoleHabilitiesActions.loadRoleHabilitiesSuccess, (state, {data}) => ({...state, loadRoleHabilitiesState: StateEnum.SUCCESS, loadRoleHabilities: data, roleHabilitiesState: StateEnum.INIT})),
  on(RoleHabilitiesActions.loadRoleHabilitiesFailure, (state, {error}) => ({...state, loadRoleHabilitiesState: StateEnum.ERROR, errorMessage: error})),
  on(RoleHabilitiesActions.addRoleHabilities, state => ({...state, roleHabilitiesState: StateEnum.LOADING})),
  on(RoleHabilitiesActions.addRoleHabilitiesSuccess, (state, {data}) => ({...state, roleHabilitiesState: StateEnum.SUCCESS, role: data, roleHabilities: data})),
  on(RoleHabilitiesActions.addRoleHabilitiesFailure, (state, {error}) => ({...state, roleHabilitiesState: StateEnum.ERROR, errorMessage: error})),
);

