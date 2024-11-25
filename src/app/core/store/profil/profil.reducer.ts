import { createReducer, on } from '@ngrx/store';
import {
  SetLoggedUser,
} from './profil.actions';

export interface ProfilState {
  profil: any; //Customer | {};
  auth: any;
  loading: boolean;
  error: any;
  status: 'INIT' | 'LOADING' | 'SUCCESS' | 'ERROR';
}

export const initialState: ProfilState = {
  profil: {},
  auth: {},
  loading: false,
  error: null,
  status: 'INIT',
};

export const profilReducer = createReducer(
  initialState,

  on(SetLoggedUser, (state, { auth, payload }) => ({
    ...state,
    loading: false,
    profil: { ...payload },
    auth,
    status: 'SUCCESS',
    error: null,
  }))
);
