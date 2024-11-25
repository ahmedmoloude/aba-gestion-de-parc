import { createAction, props } from '@ngrx/store';
import { City } from 'app/core/models/location.model';

export const locationActionFailure = createAction(
  '[locations] Action Failure',
  props<{ action: string; error: any }>()
);

export const fetchCities = createAction('[locations] Fetch List Cities');
export const fetchZones = createAction('[locations] Fetch List Zones');
export const fetchCitiesSuccess = createAction(
  '[locations] Fetch List Cities Success',
  props<{ payload: City[] }>()
);
export const fetchZonesSuccess = createAction(
  '[locations] Fetch List Zones Success',
  props<{ payload: City[] }>()
);
