import { createAction, props } from '@ngrx/store';


export const limitationActionFailure = createAction(
  '[Limitation] Limitation Action Failure',
  props<{ action: string; error: any }>()
);

export const fetchLimitation = createAction(
  '[Limitation] Fetch List Limitation'
);
export const fetchLimitationSuccess = createAction(
  '[Limitation] Fetch List Limitation Success',
  props<{ payload: any[] }>()
);

export const addLimitation = createAction(
  '[Limitation] Add Limitation',
  props<{ data: any }>()
);
export const addLimitationuccess = createAction(
  '[Limitation] Add Limitation Success',
  props<{ payload: any }>()
);

export const updateLimitation = createAction(
  '[Limitation] Update Limitation',
  props<{ data: any,  uuid: number  }>()
);
export const updateLimitationuccess = createAction(
  '[Limitation] Update Limitation Success',
  props<{ payload: any }>()
);

export const deleteLimitation = createAction(
  '[Limitation] Delete Limitation',
  props<{ uuid: string }>()
);
export const deleteLimitationuccess = createAction(
  '[Limitation] Delete Limitation Success',
  props<{ uuid: string }>()
);
