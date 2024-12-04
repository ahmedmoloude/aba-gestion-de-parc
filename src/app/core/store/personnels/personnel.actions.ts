import { createAction, props } from '@ngrx/store';

export const PersonnelActionFailure = createAction(
  '[Personnels] Personnels Action Failure',
  props<{ action: string; error: any }>()
);

export const fetchPersonnels = createAction(
  '[Personnels] Fetch List Personnels'
);
export const fetchPersonnelsSuccess = createAction(
  '[Personnels] Fetch List Personnels Success',
  props<{ payload: any[] }>()
);

export const addPersonnel = createAction(
  '[Personnels] Add Personnel',
  props<{ data: any }>()
);
export const addPersonnelsuccess = createAction(
  '[Personnels] Add Personnel Success',
  props<{ payload: any }>()
);

export const updatePersonnel = createAction(
  '[Personnel] Update Personnel',
  props<{ data: any; }>()
);
export const updatePersonneluccess = createAction(
  '[Personnels] Update Personnel Success',
  props<{ payload: any }>()
);

export const deletePersonnel = createAction(
  '[Personnel] Delete Personnels',
  props<{ uuid: string }>()
);
export const deletePersonnelsuccess = createAction(
  '[Personnels] Delete Personnels Success',
  props<{ uuid: string }>()
);
