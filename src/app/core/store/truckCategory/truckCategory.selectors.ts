import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { truckCategoryState } from './truckCategory.reducer';

export const appSelecttruckCategory = (state: AppState) => state.truckCategory;
export const selectEnvtruckCategoryPayload = createSelector(
  appSelecttruckCategory,
  (state: truckCategoryState) => state.payload
);
export const selectEnvtruckCategoryIsLoading = createSelector(
  appSelecttruckCategory,
  (state: truckCategoryState) => state.loading
);
export const selectEnvtruckCategoryError = createSelector(
  appSelecttruckCategory,
  (state: truckCategoryState) => state.error
);
export const selectEnvtruckCategoryStatus = createSelector(
  appSelecttruckCategory,
  (state: truckCategoryState) => state.status
);

