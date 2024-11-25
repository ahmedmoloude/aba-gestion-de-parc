import { createAction, props } from '@ngrx/store';

export const prospectActionFailure = createAction(
  '[Prospects] Prospects Action Failure',
  props<{ action: string; error: any }>()
);



export const addProspect = createAction(
  '[Prospects] Add Prospect',
  props<{ data: any }>()
);
export const addProspectSuccess = createAction(
  '[Prospects] Add Prospect Success',
  props<{ payload: any }>()
);

export const fetchProspectSuccess = createAction(
  '[Prospects] Add Prospect Success',
  props<{ payload: any }>()
);


export const fetchProspects = createAction(
  '[Prospects] fetch peospects',
);

