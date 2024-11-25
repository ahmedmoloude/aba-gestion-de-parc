import { createReducer, on } from '@ngrx/store';

import { fetshMotPorture, fetshMotPortureSuccess } from './motporture.action';

export interface MotPortureState {
  data: any[];
  loading: boolean;
  error: {
    action: string;
    error: any;
  } | null;
  status: 'INIT' | 'LOADING' | 'SUCCESS' | 'ERROR';
}

export const initialState: MotPortureState = {
  data:[],
  loading: false,
  error: null,
  status: 'INIT',
};

export const MotPortureReducer = createReducer(

  initialState,

  on(fetshMotPorture, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),

  on(fetshMotPortureSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    data: payload,
    status: 'SUCCESS',
    error: null,
  })),

);

// #TODO move to helpers
// const updateItemFromList = (updateItem: any, listItems: any[]) => {
//   return listItems.map((item) => {
//     if (item.id == updateItem.id) {
//       return updateItem;
//     }
//     return item;
//   });
// };
