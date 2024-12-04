import { createAction, props } from '@ngrx/store';

export const interventionActionFailure = createAction(
  '[interventions] interventions Action Failure',
  props<{ action: string; error: any }>()
);

export const fetchinterventions = createAction(
  '[interventions] Fetch List interventions'
);
export const fetchinterventionsSuccess = createAction(
  '[interventions] Fetch List interventions Success',
  props<{ payload: any[] }>()
);

export const addintervention = createAction(
  '[interventions] Add intervention',
  props<{ data: any }>()
);
export const addinterventionsuccess = createAction(
  '[interventions] Add intervention Success',
  props<{ payload: any }>()
);

export const updateintervention = createAction(
  '[interventions] Update intervention',
  props<{ data: any,  uuid: number  }>()
);
export const updateinterventionsuccess = createAction(
  '[interventions] Update intervention Success',
  props<{ payload: any }>()
);

export const deleteintervention = createAction(
  '[interventions] Delete intervention',
  props<{ uuid: string }>()
);
export const deleteinterventionsuccess = createAction(
  '[interventions] Delete intervention Success',
  props<{ uuid: string }>()
);
