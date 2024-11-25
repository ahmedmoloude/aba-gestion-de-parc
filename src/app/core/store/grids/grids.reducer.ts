import { createReducer, on } from '@ngrx/store';
import {
  gridActionFailure,
  fetchGrids,
  fetchGridsSuccess,
  fetchActivateGrid,
  fetchActivateGridSuccess,
  importGridDetails,
  importGridDetailsSuccess,
  updateGridSuccess,
  selectedGrid,
  addGridDetails,
  addGridDetailsSuccess,
  updateGridHorsnorm,
  updateGridhorsnormSuccess,
  deleteGridhorsnormSuccess,
  deleteGridhorsnorm,
} from './grids.actions';

export interface GridState {
  public_grids: any[];
  active_grid: {
    grid_active: any,
    grids_details: { services: any[], transport: any[] },
    grids_details_hors_norme: { transport: any[] }
  };
  loading: boolean;
  selected_grid: any;
  error: {
    action: string;
    error: any;
  } | null;
  status: 'INIT' | 'LOADING' | 'SUCCESS' | 'ERROR';
}

export const initialState: GridState = {
  public_grids: [],
  selected_grid: null,
  active_grid: {
    grid_active: null,
    grids_details: { services: [], transport: [] },
    grids_details_hors_norme: { transport: [] }
  },
  loading: false,
  error: null,
  status: 'INIT',
};

export const gridReducer = createReducer(
  initialState,
  on(fetchGrids, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  
  on(fetchGridsSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    public_grids: payload,
    status: 'SUCCESS',
    error: null,
  })),

  on(fetchActivateGrid, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),

  on(fetchActivateGridSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    active_grid: payload,
    selected_grid: null,
    status: 'SUCCESS',
    error: null,
  })),

  on(importGridDetails, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),

  on(importGridDetailsSuccess, (state,) => ({ ...state, })),
  on(addGridDetails, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),

  on(addGridDetailsSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    active_grid: {
      ...state.active_grid,
      grids_details_hors_norme: { transport: [payload, ...state.active_grid.grids_details_hors_norme.transport] }
    },
    status: 'SUCCESS',
    error: null,
  })),

  on(updateGridHorsnorm, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),

  on(updateGridhorsnormSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    active_grid: {
      ...state.active_grid,
      grids_details_hors_norme: { transport: updateItemFromList(payload, state.active_grid.grids_details_hors_norme.transport) }
    },
    status: 'SUCCESS',
    error: null,
  })),

  on(deleteGridhorsnorm, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),

  on(deleteGridhorsnormSuccess, (state, { uuid }) => ({
    ...state,
    loading: false,
    active_grid: {
      ...state.active_grid,
      grids_details_hors_norme: { transport: [...state.active_grid.grids_details_hors_norme.transport.filter(g => g.uuid != uuid)] }
    },
    status: 'SUCCESS',
    error: null,
  })),



  on(updateGridSuccess, (state, { payload }) => {
    return {
      ...state,
      public_grids: state.public_grids.map((item) =>
        item.uuid != payload.uuid
          ? payload.is_activated
            ? { ...item, is_activated: false }
            : item
          : payload
      ),
    }
  }),

  on(selectedGrid, (state, { grid }) => {
    return {
      ...state,
      selected_grid: grid,
    };
  }),

  on(gridActionFailure, (state, { action, error }) => ({
    ...state,
    loading: false,
    status: 'ERROR',
    error: { action, error },
  }))

);

// #TODO move to helpers
const updateItemFromList = (updateItem: any, listItems: any[]) => {
  return listItems.map((item) => {
    if (item.id == updateItem.id) {
      return updateItem;
    }
    return item;
  });
};
