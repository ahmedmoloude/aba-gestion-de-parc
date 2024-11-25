import { createAction, props } from '@ngrx/store';

export const truckCategoryActionFailure = createAction(
  '[truckCategorys] truckCategorys Action Failure',
  props<{ action: string; error: any }>()
);

export const fetchtruckCategorys = createAction(
  '[truckCategorys] Fetch List truckCategorys'
);
export const fetchtruckCategorysSuccess = createAction(
  '[truckCategorys] Fetch List truckCategorys Success',
  props<{ payload: any[] }>()
);

export const addtruckCategory = createAction(
  '[truckCategorys] Add truckCategory',
  props<{ data: any }>()
);
export const addtruckCategorysuccess = createAction(
  '[truckCategorys] Add truckCategory Success',
  props<{ payload: any }>()
);

export const updatetruckCategory = createAction(
  '[truckCategorys] Update truckCategory',
  props<{ data: any,  uuid: string  }>()
);
export const updatetruckCategorysuccess = createAction(
  '[truckCategorys] Update truckCategory Success',
  props<{ payload: any }>()
);

export const deletetruckCategory = createAction(
  '[truckCategorys] Delete truckCategory',
  props<{ uuid: string }>()
);
export const deletetruckCategorysuccess = createAction(
  '[truckCategorys] Delete truckCategory Success',
  props<{ uuid: string }>()
);
