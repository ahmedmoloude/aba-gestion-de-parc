import { createAction, props } from '@ngrx/store';
import {
  GlobalConfig,
} from 'app/core/models/globalConfig.model';


export const TaxeActionFailure = createAction(
  '[Taxe] Taxe Action Failure',
  props<{ action: string; error: any }>()
);

export const fetchTaxe = createAction(
  '[Taxe] Fetch List Taxe'
);
export const fetchTaxeSuccess = createAction(
  '[Taxe] Fetch List Taxe Success',
  props<{ payload: GlobalConfig[] }>()
);