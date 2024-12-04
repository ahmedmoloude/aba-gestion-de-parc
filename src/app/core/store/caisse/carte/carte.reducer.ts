import { Action, createReducer, on } from '@ngrx/store';
import { Carte } from 'app/core/models/caisse/carte.model';
import * as CaisseCarteActions from 'app/core/store/caisse/carte/carte.actions';



export const carteFeatureKey = 'caisseCarte';

export enum StateEnum {
  INIT ='INIT',
  LOADING ='LOADING',
  SUCCESS ='SUCCESS',
  ERROR ='ERROR',
}
export interface CaisseCarteState {
  caisseCartes: Carte[],
  caisseCarte: Carte,
  feedCaisseCarte: any,
  disaffectCaisseCarte: any,
  mouvementCaisseCarte: any,
  cartesState: StateEnum,
  carteState: StateEnum,
  feedState: StateEnum,
  disaffectState: StateEnum,
  mouvementState: StateEnum,
  errorMessage: { action: string; error: any } | null;
}

export const initialState: CaisseCarteState = {
  caisseCartes: null,
  caisseCarte: null,
  feedCaisseCarte: null,
  disaffectCaisseCarte: null,
  mouvementCaisseCarte: null,
  cartesState: StateEnum.INIT,
  carteState: StateEnum.INIT,
  feedState: StateEnum.INIT,
  disaffectState: StateEnum.INIT,
  mouvementState: StateEnum.INIT,
  errorMessage: null,
};



export const caisseCarteReducer = createReducer(
  initialState,
  on(CaisseCarteActions.loadCaisseCartes, state => ({...state, cartesState: StateEnum.LOADING})),
  on(CaisseCarteActions.loadCaisseCartesSuccess, (state, {data}) => ({...state, cartesState: StateEnum.SUCCESS, caisseCartes: data})),
  on(CaisseCarteActions.loadCaisseCartesFailure, (state, {error}) => ({...state, cartesState: StateEnum.ERROR, errorMessage: error})),
  // on(CaisseCarteActions.loadCaisseCarte, state => ({...state, carteState: StateEnum.LOADING})),
  // on(CaisseCarteActions.loadCaisseCarteSuccess, (state, {data}) => ({...state, carteState: StateEnum.SUCCESS, caisseCarte: data})),
  // on(CaisseCarteActions.loadCaisseCarteFailure, (state, {error}) => ({...state, carteState: StateEnum.ERROR, errorMessage: error})),
  on(CaisseCarteActions.addCaisseCarte, state => ({...state, carteState: StateEnum.LOADING})),
  on(CaisseCarteActions.addCaisseCarteSuccess, (state, {data}) => ({...state, carteState: StateEnum.SUCCESS, caisseCarte: data, caisseCartes: [data, ...state.caisseCartes]})),
  on(CaisseCarteActions.addCaisseCarteFailure, (state, {error}) => ({...state, carteState: StateEnum.ERROR, errorMessage: error})),
  on(CaisseCarteActions.feedCaisseCarte, state => ({...state, feedState: StateEnum.LOADING})),
  on(CaisseCarteActions.feedCaisseCarteSuccess, (state, {data}) => ({...state, feedState: StateEnum.SUCCESS, feedCaisseCarte: data})),
  on(CaisseCarteActions.feedCaisseCarteFailure, (state, {error}) => ({...state, feedState: StateEnum.ERROR, errorMessage: error})),
  on(CaisseCarteActions.affectCaisseCarte, state => ({...state, carteState: StateEnum.LOADING})),
  on(CaisseCarteActions.affectCaisseCarteSuccess, (state, {data}) => ({...state, carteState: StateEnum.SUCCESS, caisseCarte: data, caisseCartes: state.caisseCartes?.map(item => item.id === data.id ? data : item)})),
  on(CaisseCarteActions.affectCaisseCarteFailure, (state, {error}) => ({...state, carteState: StateEnum.ERROR, errorMessage: error})),
  on(CaisseCarteActions.disaffectCaisseCarte, state => ({...state, carteState: StateEnum.LOADING})),
  on(CaisseCarteActions.disaffectCaisseCarteSuccess, (state, {data}) => ({...state, carteState: StateEnum.SUCCESS, caisseCarte: data, caisseCartes: state.caisseCartes?.map(item => item.id === data.id ? data : item)})),
  on(CaisseCarteActions.disaffectCaisseCarteFailure, (state, {error}) => ({...state, carteState: StateEnum.ERROR, errorMessage: error})),
  on(CaisseCarteActions.loadMouvementCaisseCarte, state => ({...state, mouvementState: StateEnum.LOADING})),
  on(CaisseCarteActions.loadMouvementCaisseCarteSuccess, (state, {data}) => ({...state, mouvementState: StateEnum.SUCCESS, mouvementCaisseCarte: data})),
  on(CaisseCarteActions.loadMouvementCaisseCarteFailure, (state, {error}) => ({...state, mouvementState: StateEnum.ERROR, errorMessage: error})),
  on(CaisseCarteActions.deleteCaisseCarte, state => ({...state, cartesState: StateEnum.LOADING})),
  on(CaisseCarteActions.deleteCaisseCarteSuccess, (state, {data}) => ({...state, cartesState: StateEnum.SUCCESS, caisseCartes: state.caisseCartes?.filter(element => element.uuid !== data)})),
  on(CaisseCarteActions.deleteCaisseCarteFailure, (state, {error}) => ({...state, cartesState: StateEnum.ERROR, errorMessage: error})),
);

