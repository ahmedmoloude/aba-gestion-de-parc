import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { volumeState } from './volume.reducer';

export const appSelectvolume = (state: AppState) => state.volume;
export const selectEnvPayloadvolume = createSelector(
    appSelectvolume,
  (state: volumeState) => state.payload
);
export const selectEnvIsLoadingvolume = createSelector(
    appSelectvolume,
  (state: volumeState) => state.loading
);
export const selectEnvErrorvolume = createSelector(
    appSelectvolume,
  (state: volumeState) => state.error
);
export const selectEnvStatusvolume = createSelector(
    appSelectvolume,
  (state: volumeState) => state.status
);

