import { createAction, props } from '@ngrx/store';
import {
  Task,
  TaskAddForm,
  TaskUpdateForm,
} from 'app/core/models/task.model';

export const taskActionFailure = createAction(
  '[tasks] Tasks Action Failure',
  props<{ action: string; error: any }>()
);

export const fetchTasks = createAction(
  '[tasks] Fetch List Tasks'
);
export const fetchTasksSuccess = createAction(
  '[tasks] Fetch List Tasks Success',
  props<{ payload: Task[] }>()
);

export const addTask = createAction(
  '[tasks] Add Task',
  props<{ data: TaskAddForm }>()
);

export const addTaskSuccess = createAction(
  '[tasks] Add Task Success',
  props<{ payload: Task }>()
);

export const updateTask = createAction(
  '[tasks] Update Task',
  props<{ uuid: string; data: TaskUpdateForm }>()
);
export const updateTaskSuccess = createAction(
  '[tasks] Update Task Success',
  props<{ payload: Task }>()
);

export const deleteTask = createAction(
  '[tasks] Delete Task',
  props<{ uuid: string }>()
);
export const deleteTaskSuccess = createAction(
  '[tasks] Delete Task Success',
  props<{ uuid: string }>()
);

// export const getTask = createAction(
//   '[tasks] get Task',
//   props<{ uuid: string }>()
// );

// export const getTaskSuccess = createAction(
//   '[tasks] get Task Success',
//   props<{ payload: Task }>()
// );

export const selectedTask = createAction(
  '[Task] set selectedTask',
  props<{ task: Task }>()
);

export const taskActionTypes = {
  taskActionFailure,
  fetchTasks,
  fetchTasksSuccess,
  addTask,
  addTaskSuccess,
  updateTask,
  updateTaskSuccess,
  deleteTask,
  deleteTaskSuccess,
  selectedTask
};


