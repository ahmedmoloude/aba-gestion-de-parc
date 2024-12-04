import { createReducer, on } from '@ngrx/store';
import { RDV } from 'app/core/models/rdv.model';
import {
  addTask,
  addTasksuccess,
  updateTask,
  updateTasksuccess,
  deleteTask,
  deleteTasksuccess,
  fetchTask,
  fetchTaskSuccess,
  TaskActionFailure,
  // addTask,
  // addTasksuccess
} from './task.actions';

export interface TaskState {
  payload: any;
  loading: boolean;
  error: {
    action: string;
    error: any;
  } | null;
  status: 'INIT' | 'LOADING' | 'SUCCESS' | 'ERROR';
}

export const initialState: TaskState = {
  payload: [],
  loading: false,
  error: null,
  status: 'INIT',
};

export const TaskReducer = createReducer(
  initialState,
  on(fetchTask, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(fetchTaskSuccess, (state, { payload }) => ({
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
  on(addTasksuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload: { ...state.payload , data : [payload , ...state.payload.data] },
    status: 'SUCCESS',
    error: null,
  })),

  // on(addTask, (state) => ({
  //   ...state,
  //   loading: true,
  //   status: 'LOADING',
  //   error: null,
  // })),
  // on(addTasksuccess, (state, { payload }) => ({
  //   ...state,
  //   loading: false,
  //   payload: [payload, ...state.payload],
  //   status: 'SUCCESS',
  //   error: null,
  // })),

  on(updateTask, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(updateTasksuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload: { ...state.payload , data : updateItemFromList(payload, state.payload.data) },
    status: 'SUCCESS',
    error: null,
  })),

  on(deleteTask, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(deleteTasksuccess, (state, { uuid }) => ({
    ...state,
    loading: false,
    payload: { ...state.payload , data : state.payload.data.filter((item) => item.uuid != uuid) },
    status: 'SUCCESS',
    error: null,
  })),

  on(TaskActionFailure, (state, { action, error }) => ({
    ...state,
    loading: false,
    status: 'ERROR',
    error: { action, error },
  }))
  //
);

// #TODO move to helpers
const updateItemFromList = (updateItem: any, listItems: any[]) => {
  return listItems.map((item) => {
    if (item.uuid == updateItem.uuid) {
      return updateItem;
    }
    return item;
  });
};
