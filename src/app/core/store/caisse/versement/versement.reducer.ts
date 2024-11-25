import { Action, createReducer,on } from '@ngrx/store';
import { Versement } from 'app/core/models/caisse/versement.model';
import * as VersementActions from 'app/core/store/caisse/versement/versement.actions';
import { StateEnum } from '../carte/carte.reducer';


export const versementFeatureKey = 'versement';

export interface VersementState {
  versementsVirement: Versement[],
  versementsCheck: Versement[],
  virementDataState: StateEnum,
  checkDataState: StateEnum,
  errorMessage: { action: string; error: any } | null;
}

export const initialState: VersementState = {
  versementsVirement: null,
  versementsCheck: null,
  virementDataState: StateEnum.INIT,
  checkDataState: StateEnum.INIT,
  errorMessage: null,
};


export const versementReducer = createReducer(
  initialState,
  on(VersementActions.loadVersementsVirement, state => ({...state, virementDataState: StateEnum.LOADING})),
  on(VersementActions.loadVersementsVirementSuccess, (state, {data}) => ({...state, virementDataState: StateEnum.SUCCESS, versementsVirement: data})),
  on(VersementActions.loadVersementsVirementFailure, (state, {error}) => ({...state, virementDataState: StateEnum.ERROR, errorMessage: error})),
  on(VersementActions.loadVersementsCheck, state => ({...state, checkDataState: StateEnum.LOADING})),
  on(VersementActions.loadVersementsCheckSuccess, (state, {data}) => ({...state, checkDataState: StateEnum.SUCCESS, versementsCheck: data})),
  on(VersementActions.loadVersementsCheckFailure, (state, {error}) => ({...state, checkDataState: StateEnum.ERROR, errorMessage: error})),
  on(VersementActions.validateVersementVirement, state => ({...state, virementDataState: StateEnum.LOADING})),
  on(VersementActions.validateVersementVirementSuccess, (state, {data}) => ({...state, virementDataState: StateEnum.SUCCESS, versementVirementValidated: data, versementsVirement:state.versementsVirement.map(v => {
    if (data.some(update => update.document_id === v.document_id)) {
      const matchingUpdate = data.find(update => update.document_id === v.document_id);
      if (matchingUpdate) {
        return {
          ...v,
          remis: matchingUpdate.remis
        };
      }
    }
    return v;

  }) })),
  on(VersementActions.validateVersementVirementFailure, (state, {error}) => ({...state, virementDataState: StateEnum.ERROR, errorMessage: error})),
  on(VersementActions.validateVersementCheck, state => ({...state, checkDataState: StateEnum.LOADING})),
  on(VersementActions.validateVersementCheckSuccess, (state, {data}) => ({...state, checkDataState: StateEnum.SUCCESS, versementCheckValidated: data,versementsCheck:state.versementsCheck.map(v => {
    if (data.some(update => update.document_id === v.document_id)) {
      const matchingUpdate = data.find(update => update.document_id === v.document_id);
      if (matchingUpdate) {
        return {
          ...v,
          remis: matchingUpdate.remis
        };
      }
    }
    return v;

  }) })),
  on(VersementActions.validateVersementCheckFailure, (state, {error}) => ({...state, checkDataState: StateEnum.ERROR, errorMessage: error})),

);
