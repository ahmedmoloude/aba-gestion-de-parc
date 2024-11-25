import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { MotPortureState } from './motporture.reducer';

export const appSelectMotPort = (state: AppState) => state.motporture;

export const selectMotPorture = createSelector(
    appSelectMotPort,
  (state: MotPortureState) => state.data
);

// export const selectHorsnormTransport = createSelector(
//   appSelectGrid,
//   (state: MotPortureState) => {
//     if (state.MotPorture) return state.MotPorture;
//     return [];
//   }
// );
