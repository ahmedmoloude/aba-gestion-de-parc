import { createAction, props } from '@ngrx/store';

export const VehiculeActionFailure = createAction(
  '[Vehicules] Vehicules Action Failure',
  props<{ action: string; error: any }>()
);

export const fetchVehicules = createAction(
  '[Vehicules] Fetch List Vehicules',
  props<{ data: any, per_page :number, page : number  }>()
);
export const fetchVehiculesSuccess = createAction(
  '[Vehicules] Fetch List Vehicules Success',
  props<{ payload: any[] }>()
);

export const addVehicule = createAction(
  '[Vehicules] Add Vehicule',
  props<{ data: any }>()
);
export const addVehiculesuccess = createAction(
  '[Vehicules] Add Vehicule Success',
  props<{ payload: any }>()
);

export const updateVehicule = createAction(
  '[Vehicules] Update Vehicule',
  props<{ data: any,  uuid: string  }>()
);
export const updateVehiculesuccess = createAction(
  '[Vehicules] Update Vehicule Success',
  props<{ payload: any }>()
);

export const deleteVehicule = createAction(
  '[Vehicules] Delete Vehicule',
  props<{ uuid: string }>()
);
export const deleteVehiculesuccess = createAction(
  '[Vehicules] Delete Vehicule Success',
  props<{ uuid: string }>()
);
