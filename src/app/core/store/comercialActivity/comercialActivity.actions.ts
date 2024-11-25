import { createAction, props } from '@ngrx/store';
import {
  RDV,
  RDVAddForm,
  RDVUpdateForm,
} from 'app/core/models/rdv.model';

export const ActivityActionFailure = createAction(
  '[Activity] Activity Action Failure',
  props<{ action: string; error: any }>()
);

export const fetchActivity = createAction(
  '[Activity] Activity List Activity'
  
);
export const fetchActivitySuccess = createAction(
  '[Activity] Activity List Activity Success',
  props<{ payload: RDV[] }>()
);

export const fetchrdv = createAction(
  '[Activity] Activity List Activity'
  
);
export const fetchrdvSuccess = createAction(
  '[Activity] Activity List Activity Success',
  props<{ payload: RDV[] }>()
);

export const fetchtask = createAction(
  '[Activity] Activity List Activity'
  
);
export const fetchAtaskSuccess = createAction(
  '[Activity] Activity List Activity Success',
  props<{ payload: RDV[] }>()
);

export const addActivity = createAction(
  '[Activity] Add Activity',
  props<{ data: any }>()
);
export const addActivitysuccess = createAction(
  '[Activity] Add Activity Success',
  props<{ payload: RDV }>()
);

// export const addTask = createAction(
//     '[Activity] Add Activity',
//     props<{ data: any }>()
//   );
//   export const addTasksuccess = createAction(
//     '[Activity] Add Activity Success',
//     props<{ payload: RDV }>()
//   );

export const updateActivity = createAction(
  '[Activity] Update Activity',
  props<{ data: RDVUpdateForm,  uuid: number  }>()
);
export const updateActivitysuccess = createAction(
  '[Activity] Update Activity Success',
  props<{ payload: RDV }>()
);

export const deleteActivity = createAction(
  '[Activity] Delete Activity',
  props<{ uuid: string }>()
);
export const deleteActivitysuccess = createAction(
  '[Activity] Delete Activity Success',
  props<{ uuid: string }>()
);
