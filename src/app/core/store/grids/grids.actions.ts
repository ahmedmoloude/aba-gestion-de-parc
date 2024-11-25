import { createAction, props } from '@ngrx/store';

export const gridActionFailure = createAction(
  '[grids] Grids Action Failure',
  props<{ action: string; error: any }>()
);

export const fetchGrids = createAction('[grids] Fetch List Grids');

export const fetchGridsSuccess = createAction(
  '[grids] Fetch List Grids Success',
  props<{ payload: any[] }>()
);

export const fetchActivateGrid = createAction('[grids] Fetch Active Grid');

export const fetchActivateGridSuccess = createAction(
  '[grids] Fetch Active Grid Success',
  props<{ payload: any }>()
);

export const importGridDetails = createAction(
  '[grids] Import Grid details',
  props<{ data: any }>()
);

export const importGridDetailsSuccess = createAction(
  '[grids] Import Grid details Success'
);

export const updateGrid = createAction(
  '[grids] Update Grid',
  props<{ uuid: string, data: any }>()
);
export const updateGridSuccess = createAction(
  '[grids] Update Grid Success',
  props<{ payload: any }>()
);

export const selectedGrid = createAction(
  '[grids] set selectedGrid',
  props<{ grid }>()
);

/* hors normes */
export const addGridDetails = createAction(
  '[grids] Add Grid details',
  props<{ data: any }>()
);
export const addGridDetailsSuccess = createAction(
  '[grids] Add Grid details Success',
  props<{ payload: any }>()
);
export const updateGridHorsnorm = createAction(
  '[grids] update Grid details',
  props<{ uuid: any, data: any }>()
);
export const updateGridhorsnormSuccess = createAction(
  '[grids] update Grid details Success',
  props<{ payload: any }>()
);
export const deleteGridhorsnorm = createAction(
  '[grids] Delete Grid',
  props<{ uuid: string }>()
);
export const deleteGridhorsnormSuccess = createAction(
  '[grids] Delete Grid Success',
  props<{ uuid: any }>()
);
