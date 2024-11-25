import { createAction, props } from '@ngrx/store';

export const truckTypeActionFailure = createAction(
  '[truckTypes] truckTypes Action Failure',
  props<{ action: string; error: any }>()
);

export const fetchtruckTypes = createAction(
  '[truckTypes] Fetch List truckTypes'
);
export const fetchtruckTypesSuccess = createAction(
  '[truckTypes] Fetch List truckTypes Success',
  props<{ payload: any[] }>()
);

export const addtruckType = createAction(
  '[truckTypes] Add truckType',
  props<{ data: any }>()
);
export const addtruckTypesuccess = createAction(
  '[truckTypes] Add truckType Success',
  props<{ payload: any }>()
);

export const updatetruckType = createAction(
  '[truckTypes] Update truckType',
  props<{ data: any,  uuid: string  }>()
);
export const updatetruckTypesuccess = createAction(
  '[truckTypes] Update truckType Success',
  props<{ payload: any }>()
);

export const deletetruckType = createAction(
  '[truckTypes] Delete truckType',
  props<{ uuid: string }>()
);
export const deletetruckTypesuccess = createAction(
  '[truckTypes] Delete truckType Success',
  props<{ uuid: string }>()
);
