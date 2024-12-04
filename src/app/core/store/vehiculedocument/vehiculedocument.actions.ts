import { createAction, props } from '@ngrx/store';

export const VehiculeDocumentsActionFailure = createAction(
  '[VehiculeDocuments] VehiculeDocuments Action Failure',
  props<{ action: string; error: any }>()
);

export const fetchVehiculeDocuments = createAction(
  '[VehiculeDocuments] Fetch List VehiculeDocuments'
);
export const fetchVehiculeDocumentsSuccess = createAction(
  '[VehiculeDocuments] Fetch List VehiculeDocuments Success',
  props<{ payload: any[] }>()
);

export const addVehiculeDocuments = createAction(
  '[VehiculeDocuments] Add VehiculeDocuments',
  props<{ data: any }>()
);
export const addVehiculeDocumentsuccess = createAction(
  '[VehiculeDocuments] Add VehiculeDocuments Success',
  props<{ payload: any }>()
);

export const updateVehiculeDocuments = createAction(
  '[VehiculeDocuments] Update VehiculeDocuments',
  props<{ data: any,  uuid: number  }>()
);
export const updateVehiculeDocumentsuccess = createAction(
  '[VehiculeDocuments] Update VehiculeDocuments Success',
  props<{ payload: any }>()
);

export const deleteVehiculeDocuments = createAction(
  '[VehiculeDocuments] Delete VehiculeDocuments',
  props<{ uuid: string }>()
);
export const deleteVehiculeDocumentsuccess = createAction(
  '[VehiculeDocuments] Delete VehiculeDocuments Success',
  props<{ uuid: string }>()
);
