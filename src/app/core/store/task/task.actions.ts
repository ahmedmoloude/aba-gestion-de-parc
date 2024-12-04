import { createAction, props } from '@ngrx/store';
// import {
//   RDV,
//   RDVAddForm,
//   RDVUpdateForm,
// } from 'app/core/models/rdv.model';

export const TaskActionFailure = createAction(
  '[Task] Task Action Failure',
  props<{ action: string; error: any }>()
);

export const fetchTask = createAction(
  '[Task] Task List Task'
  
);
export const fetchTaskSuccess = createAction(
  '[Task] Task List Task Success',
  props<{ payload: any[] }>()
);

export const addTask = createAction(
  '[Task] Add Task',
  props<{ data: any }>()
);
export const addTasksuccess = createAction(
  '[Task] Add Task Success',
  props<{ payload: any }>()
);

// export const addTask = createAction(
//     '[Task] Add Task',
//     props<{ data: any }>()
//   );
//   export const addTasksuccess = createAction(
//     '[Task] Add Task Success',
//     props<{ payload: RDV }>()
//   );

export const updateTask = createAction(
  '[Task] Update Task',
  props<{ data: any,  uuid: number  }>()
);
export const updateTasksuccess = createAction(
  '[Task] Update Task Success',
  props<{ payload: any }>()
);

export const deleteTask = createAction(
  '[Task] Delete Task',
  props<{ uuid: string }>()
);
export const deleteTasksuccess = createAction(
  '[Task] Delete Task Success',
  props<{ uuid: string }>()
);
