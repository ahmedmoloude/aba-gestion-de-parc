import { createReducer, on } from '@ngrx/store';
import { Task } from 'app/core/models/task.model';
import {
  addTask,
  addTaskSuccess,
  deleteTask,
  deleteTaskSuccess,
  taskActionFailure,
  fetchTasks,
  fetchTasksSuccess,
  updateTask,
  updateTaskSuccess,
  // getTask,
  // getTaskSuccess,
  selectedTask,
} from './tasks.actions';

export interface TaskState {
  payload: Task[];
  loading: boolean;
  selectedTask: any;
  error: {
    action: string;
    error: any;
  } | null;
  status: 'INIT' | 'LOADING' | 'SUCCESS' | 'ERROR';
}

export const initialState: TaskState = {
  payload: [],
  selectedTask: null,
  loading: false,
  error: null,
  status: 'INIT',
};

export const taskReducer = createReducer(
  initialState,
  on(fetchTasks, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(fetchTasksSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload,
    status: 'SUCCESS',
    error: null,
  })),
  on(addTask, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(addTaskSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload: [payload, ...state.payload],
    status: 'SUCCESS',
    error: null,
  })),
  on(updateTask, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(updateTaskSuccess, (state, { payload }) => {
    console.log('------- 8888888888888888888888888888test', payload)
    return {
      ...state,
      loading: false,
      selectedTask: payload,
      payload: updateList(payload, state.payload),
      status: 'SUCCESS',
      error: null,
  }}),

  on(deleteTask, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(deleteTaskSuccess, (state, { uuid }) => ({
    ...state,
    loading: false,
    payload: state.payload.filter((item) => item.uuid != uuid),
    status: 'SUCCESS',
    error: null,
  })),

  on(taskActionFailure, (state, { action, error }) => ({
    ...state,
    loading: false,
    status: 'ERROR',
    error: { action, error },
  })),
  on(selectedTask, (state, { task }) => {
    console.log('----- new selected task in reduer', task)
    return {
      ...state,
      selectedTask: task,
    };
  }),
);

const updateList = (obj: any, list: any[]) => {
  return list.map((item) => {
    if (item.id == obj.id) {
      return obj;
    }
    return item;
  });
};
