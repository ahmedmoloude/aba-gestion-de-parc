import { createAction, props } from '@ngrx/store';

export enum PlanningActionsType {
  /* Load Plannings */
  LOAD_PLANNINGS = '[Planning] Load Plannings',
  LOAD_PLANNINGS_SUCCESS = '[Planning] Load Plannings Success',
  LOAD_PLANNINGS_FAILURE = '[Planning] Load Plannings Failure',

  /* Add Planning */
  ADD_PLANNING = '[Planning] Add Planning',
  ADD_PLANNING_SUCCESS = '[Planning] Add Planning Success',
  ADD_PLANNING_FAILURE = '[Planning] Add Planning Failure',

  /* Accomplish Planning */
  ACCOMPLISH_PLANNING = '[Planning] Accomplish Planning',
  ACCOMPLISH_PLANNING_SUCCESS = '[Planning] Accomplish Planning Success',
  ACCOMPLISH_PLANNING_FAILURE = '[Planning] Accomplish Planning Failure',

  /* Update Planning */
  UPDATE_PLANNING = '[Planning] Update Planning',
  UPDATE_PLANNING_SUCCESS = '[Planning] Update Planning Success',
  UPDATE_PLANNING_FAILURE = '[Planning] Update Planning Failure',

  /* Delete Planning */
  DELETE_PLANNING = '[Planning] Delete Planning',
  DELETE_PLANNING_SUCCESS = '[Planning] Delete Planning Success',
  DELETE_PLANNING_FAILURE = '[Planning] Delete Planning Failure',
}

/* Load Plannings  Actions*/
export const loadPlannings = createAction(
  PlanningActionsType.LOAD_PLANNINGS,
  props<{ data: any }>()
);

export const loadPlanningsSuccess = createAction(
  PlanningActionsType.LOAD_PLANNINGS_SUCCESS,
  props<{ data: any }>()
);

export const loadPlanningsFailure = createAction(
  PlanningActionsType.LOAD_PLANNINGS_FAILURE,
  props<{action: string, error: any} >()
);


/* Add Planning Actions*/
export const addPlanning = createAction(
  PlanningActionsType.ADD_PLANNING,
  props<{ data: any }>()
);

export const addPlanningSuccess = createAction(
  PlanningActionsType.ADD_PLANNING_SUCCESS,
  props<{ data: any }>()
);

export const addPlanningFailure = createAction(
  PlanningActionsType.ADD_PLANNING_FAILURE,
  props<{action: string, error: any} >()
);

/* Accomplish Planning Actions*/
export const accomplishPlanning = createAction(
  PlanningActionsType.ACCOMPLISH_PLANNING,
  props<{ data: {uuid: string} }>()
);

export const accomplishPlanningSuccess = createAction(
  PlanningActionsType.ACCOMPLISH_PLANNING_SUCCESS,
  props<{ data: any }>()
);

export const accomplishPlanningFailure = createAction(
  PlanningActionsType.ACCOMPLISH_PLANNING_FAILURE,
  props<{action: string, error: any} >()
);


/* Update Planning  Actions*/
export const updatePlanning = createAction(
  PlanningActionsType.UPDATE_PLANNING,
  props<{ data: any }>()
);

export const updatePlanningSuccess = createAction(
  PlanningActionsType.UPDATE_PLANNING_SUCCESS,
  props<{ data: any }>()
);

export const updatePlanningFailure = createAction(
  PlanningActionsType.UPDATE_PLANNING_FAILURE,
  props<{action: string, error: any} >()
);


/* Delete Planning  Actions*/
export const deletePlanning = createAction(
  PlanningActionsType.DELETE_PLANNING,
  props<{ data: string }>()
);

export const deletePlanningSuccess = createAction(
  PlanningActionsType.DELETE_PLANNING_SUCCESS,
  props<{ data: any }>()
);

export const deletePlanningFailure = createAction(
  PlanningActionsType.DELETE_PLANNING_FAILURE,
  props<{action: string, error: any} >()
);

