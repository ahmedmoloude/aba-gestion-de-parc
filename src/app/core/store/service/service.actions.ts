import { createAction, props } from '@ngrx/store';
import {
  Service,
  ServiceAddForm,
} from 'app/core/models/service.model';

export const ServiceActionFailure = createAction(
  '[Service] Service Action Failure',
  props<{ action: string; error: any }>()
);

export const fetchService = createAction(
  '[Service] Fetch List Service'
);
export const fetchServiceSuccess = createAction(
  '[Service] Fetch List Service Success',
  props<{ payload: Service[] }>()
);

export const addService = createAction(
  '[Service] Add Service',
  props<{ data: any }>()
);
export const addServiceuccess = createAction(
  '[Service] Add Service Success',
  props<{ payload: any }>()
);
