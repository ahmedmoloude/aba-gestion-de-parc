import { createAction, props } from '@ngrx/store';

export const brandActionFailure = createAction(
  '[brands] brands Action Failure',
  props<{ action: string; error: any }>()
);

export const fetchbrands = createAction(
  '[brands] Fetch List brands'
);
export const fetchbrandsSuccess = createAction(
  '[brands] Fetch List brands Success',
  props<{ payload: any[] }>()
);

export const addbrand = createAction(
  '[brands] Add brand',
  props<{ data: any }>()
);
export const addbrandsuccess = createAction(
  '[brands] Add brand Success',
  props<{ payload: any }>()
);

export const updatebrand = createAction(
  '[brands] Update brand',
  props<{ data: any,  uuid: string  }>()
);
export const updatebrandsuccess = createAction(
  '[brands] Update brand Success',
  props<{ payload: any }>()
);

export const deletebrand = createAction(
  '[brands] Delete brand',
  props<{ uuid: string }>()
);
export const deletebrandsuccess = createAction(
  '[brands] Delete brand Success',
  props<{ uuid: string }>()
);
