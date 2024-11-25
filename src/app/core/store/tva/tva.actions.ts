import { createAction, props } from '@ngrx/store';
import {
  GlobalConfig,
} from 'app/core/models/globalConfig.model';

export const TvaActionFailure = createAction(
  '[Tva] Tva Action Failure',
  props<{ action: string; error: any }>()
);

export const fetchTva = createAction(
  '[Tva] Fetch List Tva'
);
export const fetchTvaSuccess = createAction(
  '[Tva] Fetch List Tva Success',
  props<{ payload: GlobalConfig[] }>()
);
