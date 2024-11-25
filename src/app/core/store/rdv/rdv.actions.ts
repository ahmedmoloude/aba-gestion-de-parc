import { createAction, props } from '@ngrx/store';


export const rdvActionFailure = createAction(
  '[rdv] rdv Action Failure',
  props<{ action: string; error: any }>()
);

export const fetchrdv = createAction(
  '[rdv] rdv List rdv'
  
);
export const fetchrdvSuccess = createAction(
  '[rdv] rdv List rdv Success',
  props<{ payload: any[] }>()
);

export const addrdv = createAction(
  '[rdv] Add rdv',
  props<{ data: any }>()
);
export const addrdvsuccess = createAction(
  '[rdv] Add rdv Success',
  props<{ payload: any }>()
);

// export const addTask = createAction(
//     '[rdv] Add rdv',
//     props<{ data: any }>()
//   );
//   export const addTasksuccess = createAction(
//     '[rdv] Add rdv Success',
//     props<{ payload: RDV }>()
//   );

export const updaterdv = createAction(
  '[rdv] Update rdv',
  props<{ data: any,  uuid: number  }>()
);
export const updaterdvsuccess = createAction(
  '[rdv] Update rdv Success',
  props<{ payload: any }>()
);

export const deleterdv = createAction(
  '[rdv] Delete rdv',
  props<{ uuid: string }>()
);
export const deleterdvsuccess = createAction(
  '[rdv] Delete rdv Success',
  props<{ uuid: string }>()
);
