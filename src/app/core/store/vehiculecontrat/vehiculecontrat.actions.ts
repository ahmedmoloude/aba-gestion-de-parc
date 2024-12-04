import { createAction, props } from '@ngrx/store';

export const VehiculeContratActionFailure = createAction(
  '[VehiculeContrats] VehiculeContrats Action Failure',
  props<{ action: string; error: any }>()
);

export const fetchVehiculeContrats = createAction(
  '[VehiculeContrats] Fetch List VehiculeContrats'
);
export const fetchVehiculeContratsSuccess = createAction(
  '[VehiculeContrats] Fetch List VehiculeContrats Success',
  props<{ payload: any[] }>()
);

export const addVehiculeContrat = createAction(
  '[VehiculeContrats] Add VehiculeContrat',
  props<{ data: any }>()
);
export const addVehiculeContratsuccess = createAction(
  '[VehiculeContrats] Add VehiculeContrat Success',
  props<{ payload: any }>()
);

export const updateVehiculeContrat = createAction(
  '[VehiculeContrats] Update VehiculeContrat',
  props<{ data: any,  uuid: number  }>()
);
export const updateVehiculeContratsuccess = createAction(
  '[VehiculeContrats] Update VehiculeContrat Success',
  props<{ payload: any }>()
);

export const deleteVehiculeContrat = createAction(
  '[VehiculeContrats] Delete VehiculeContrat',
  props<{ uuid: string }>()
);
export const deleteVehiculeContratsuccess = createAction(
  '[VehiculeContrats] Delete VehiculeContrat Success',
  props<{ uuid: string }>()
);
