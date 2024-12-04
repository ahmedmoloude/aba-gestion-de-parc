import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { TaskState } from './task.reducer';

export const appSelectTask = (state: AppState) => state.task;
export const selectEnvtaskPayload = createSelector(
  appSelectTask,
  (state: TaskState) => state.payload
);
export const selectEnvtaskIsLoading = createSelector(
  appSelectTask,
  (state: TaskState) => state.loading
);
export const selectEnvtaskError = createSelector(
  appSelectTask,
  (state: TaskState) => state.error
);
export const selectEnvtaskStatus = createSelector(
  appSelectTask,
  (state: TaskState) => state.status
);

