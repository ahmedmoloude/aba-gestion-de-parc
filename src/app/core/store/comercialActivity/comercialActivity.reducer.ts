import { createReducer, on } from '@ngrx/store';
import { RDV } from 'app/core/models/rdv.model';
import {
  addActivity,
  addActivitysuccess,
  updateActivity,
  updateActivitysuccess,
  deleteActivity,
  deleteActivitysuccess,
  fetchActivity,
  fetchActivitySuccess,
  ActivityActionFailure,
  // fetchAtaskSuccess,
  // fetchtask,
  // fetchrdv,
  // fetchrdvSuccess,
  // addTask,
  // addTasksuccess
} from './comercialActivity.actions';

export interface ActivityState {
  rdv: any[],
  task: any[],
  payload: any;
  loading: boolean;
  error: {
    action: string;
    error: any;
  } | null;
  status: 'INIT' | 'LOADING' | 'SUCCESS' | 'ERROR';
}

export const initialState: ActivityState = {
  rdv: [],
  task: [],
  payload: [],
  loading: false,
  error: null,
  status: 'INIT',
};

export const ActivityReducer = createReducer(
  initialState,

    //rdv
    // on(fetchrdv, (state) => ({
    //   ...state,
    //   loading: true,
    //   status: 'LOADING',
    //   error: null,
    // })),
    // on(fetchrdvSuccess, (state, { payload }) => ({
    //   ...state,
    //   loading: false,
    //   task: payload,
    //   status: 'SUCCESS',
    //   error: null,
    // })),

      //task
  // on(fetchAtaskSuccess, (state) => ({
  //   ...state,
  //   loading: true,
  //   status: 'LOADING',
  //   error: null,
  // })),
  // on(fetchAtaskSuccess, (state, { payload }) => ({
  //   ...state,
  //   loading: false,
  //   service: payload,
  //   status: 'SUCCESS',
  //   error: null,
  // })),
  on(fetchActivity, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(fetchActivitySuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload,
    status: 'SUCCESS',
    error: null,
  })),

  on(addActivity, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(addActivitysuccess, (state, { payload }) => ({
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

  on(updateActivity, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(updateActivitysuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload: updateItemFromList(payload, state.payload.data),
    status: 'SUCCESS',
    error: null,
  })),

  on(deleteActivity, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(deleteActivitysuccess, (state, { uuid }) => ({
    ...state,
    loading: false,
    payload: state.payload.filter((item) => item.uuid != uuid),
    status: 'SUCCESS',
    error: null,
  })),

  on(ActivityActionFailure, (state, { action, error }) => ({
    ...state,
    loading: false,
    status: 'ERROR',
    error: { action, error },
  }))
  //
);

// #TODO move to helpers
const updateItemFromList = (updateItem: any, listItems: any) => {
  console.log("list", listItems)
  console.log("updateItem", updateItem)
  return listItems.map((item) => {
    console.log("item", item)
    if (item.uuid == updateItem.uuid) {
      console.log("return111", updateItem)
      return updateItem;
    }
    console.log("return222", item)
    return item;
  });
};
