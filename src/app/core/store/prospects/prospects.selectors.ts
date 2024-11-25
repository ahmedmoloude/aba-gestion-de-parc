import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { ProspectState } from './prospects.reducer';

export const appSelectProspect = (state: AppState) => state.prospects;


export const selectProspects = createSelector(
  appSelectProspect,
  (state: ProspectState) => state.payload
);


export const selectProspectIsLoading = createSelector(
  appSelectProspect,
  (state: ProspectState) => state.loading
);
