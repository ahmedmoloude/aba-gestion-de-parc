import { Action, createReducer, on } from '@ngrx/store';
import * as ValidationVersementActions from 'app/core/store/caisse/validation-versement/validation-versement.actions';
import { StateEnum } from '../carte/carte.reducer';

export const validationVersementFeatureKey = 'validationVersement';

export interface validationVersementState {
  validationVersements:any[];
  versementValidated: any;
  dataState: StateEnum;
  errorMessage: { action: string; error: any } | null;
}

export const initialState: validationVersementState = {
  validationVersements: null,
  versementValidated: null,
  dataState: StateEnum.INIT,
  errorMessage: null,
};

export const validationVersementReducer = createReducer(
  initialState,
  on(ValidationVersementActions.loadValidationVersements, state => ({...state, dataState: StateEnum.LOADING})),
  on(ValidationVersementActions.loadValidationVersementsSuccess, (state, {data}) => ({...state, dataState: StateEnum.SUCCESS, validationVersements: data})),
  on(ValidationVersementActions.loadValidationVersementsFailure, (state, {error}) => ({...state, dataState: StateEnum.ERROR, errorMessage: error})),
  on(ValidationVersementActions.validateVersement, state => ({...state, dataState: StateEnum.LOADING})),
  on(ValidationVersementActions.validateVersementSuccess, (state, {data}) => ({...state, dataState: StateEnum.SUCCESS, versementValidated: data,validationVersements:state.validationVersements.map(item=> item.id === data.id ? data : item) })),
  on(ValidationVersementActions.validateVersementFailure, (state, {error}) => ({...state, dataState: StateEnum.ERROR, errorMessage: error})),
);

