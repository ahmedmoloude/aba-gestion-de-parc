import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { ProfilState } from './profil.reducer';

export const appSelectProfil = (state: AppState) => state.profil;
export const selectAuthAndProfil = createSelector(
  appSelectProfil,
  (state: ProfilState) => ({ profile: state.profil, auth: state.auth })
);
export const selectAuthUser = createSelector(
  appSelectProfil,
  (state: ProfilState) => state.auth
);
export const selectProfil = createSelector(
  appSelectProfil,
  (state: ProfilState) => state.profil
);

export const selectProfilIsLoading = createSelector(
  appSelectProfil,
  (state: ProfilState) => state.loading
);

