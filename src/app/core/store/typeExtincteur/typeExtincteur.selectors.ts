import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { typeExtincteurState } from './typeExtincteur.reducer';

export const appSelecttypeExtincteur = (state: AppState) => state.typeExtincteur;
export const selectEnvPayloadtypeExtincteur = createSelector(
    appSelecttypeExtincteur,
  (state: typeExtincteurState) => state.payload
);
export const selectEnvIsLoadingtypeExtincteur = createSelector(
    appSelecttypeExtincteur,
  (state: typeExtincteurState) => state.loading
);
export const selectEnvErrortypeExtincteur = createSelector(
    appSelecttypeExtincteur,
  (state: typeExtincteurState) => state.error
);
export const selectEnvStatustypeExtincteur = createSelector(
    appSelecttypeExtincteur,
  (state: typeExtincteurState) => state.status
);

