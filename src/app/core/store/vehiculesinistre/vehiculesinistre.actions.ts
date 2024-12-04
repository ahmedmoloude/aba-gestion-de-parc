import { createAction, props } from '@ngrx/store';

export const VehiculeSinistresActionFailure = createAction(
  '[VehiculeSinistres] VehiculeSinistres Action Failure',
  props<{ action: string; error: any }>()
);

export const fetchVehiculeSinistres = createAction(
  '[VehiculeSinistres] Fetch List VehiculeSinistres'
);
export const fetchVehiculeSinistresSuccess = createAction(
  '[VehiculeSinistres] Fetch List VehiculeSinistres Success',
  props<{ payload: any[] }>()
);

export const addVehiculeSinistres = createAction(
  '[VehiculeSinistres] Add VehiculeSinistres',
  props<{ data: any }>()
);
export const addVehiculeSinistresuccess = createAction(
  '[VehiculeSinistres] Add VehiculeSinistres Success',
  props<{ payload: any }>()
);

export const updateVehiculeSinistres = createAction(
  '[VehiculeSinistres] Update VehiculeSinistres',
  props<{ data: any,  uuid: number  }>()
);
export const updateVehiculeSinistresuccess = createAction(
  '[VehiculeSinistres] Update VehiculeSinistres Success',
  props<{ payload: any }>()
);

export const deleteVehiculeSinistres = createAction(
  '[VehiculeSinistres] Delete VehiculeSinistres',
  props<{ uuid: string }>()
);
export const deleteVehiculeSinistresuccess = createAction(
  '[VehiculeSinistres] Delete VehiculeSinistres Success',
  props<{ uuid: string }>()
);
