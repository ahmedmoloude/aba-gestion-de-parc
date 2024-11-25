import { createAction, props } from '@ngrx/store';
import {
  VoyageAutomatique,
  VoyageAutomatiqueAddForm,
  VoyageAutomatiqueUpdateForm,
} from 'app/core/models/voyageAutomatique.model';

export const VoyageAutomatiqueActionFailure = createAction(
  '[VoyageAutomatique] VoyageAutomatique Action Failure',
  props<{ action: string; error: any }>()
);

export const fetchVoyageAutomatique = createAction(
  '[VoyageAutomatique] Fetch List VoyageAutomatique'
);
export const fetchVoyageAutomatiqueSuccess = createAction(
  '[VoyageAutomatique] Fetch List VoyageAutomatique Success',
  props<{ payload: VoyageAutomatique[] }>()
);

export const addVoyageAutomatique = createAction(
  '[VoyageAutomatique] Add VoyageAutomatique',
  props<{ data: VoyageAutomatiqueAddForm }>()
);
export const addVoyageAutomatiqueuccess = createAction(
  '[VoyageAutomatique] Add VoyageAutomatique Success',
  props<{ payload: VoyageAutomatique }>()
);

export const updateVoyageAutomatique = createAction(
  '[VoyageAutomatique] Update VoyageAutomatique',
  props<{ data: VoyageAutomatiqueUpdateForm,  uuid: number  }>()
);
export const updateVoyageAutomatiqueuccess = createAction(
  '[VoyageAutomatique] Update VoyageAutomatique Success',
  props<{ payload: VoyageAutomatique }>()
);

export const deleteVoyageAutomatique = createAction(
  '[VoyageAutomatique] Delete VoyageAutomatique',
  props<{ uuid: string }>()
);
export const deleteVoyageAutomatiqueuccess = createAction(
  '[VoyageAutomatique] Delete VoyageAutomatique Success',
  props<{ uuid: string }>()
);
