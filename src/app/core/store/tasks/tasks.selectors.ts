import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { TaskState } from './tasks.reducer';

export const appSelectTask = (state: AppState) => state.tasks;
export const selectTaskPayload = createSelector(
  appSelectTask,
  (state: TaskState) => state.payload
);
export const selectTaskIsLoading = createSelector(
  appSelectTask,
  (state: TaskState) => state.loading
);
export const selectTaskError = createSelector(
  appSelectTask,
  (state: TaskState) => state.error
);
export const selectTaskStatus = createSelector(
  appSelectTask,
  (state: TaskState) => state.error
);
export const selectTask = createSelector(
  appSelectTask,
  (state) => {
    console.log('---------------->>> state in selector', state)
    return state.selectedTask}
);
