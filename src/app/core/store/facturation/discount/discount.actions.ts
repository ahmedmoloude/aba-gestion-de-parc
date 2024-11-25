import { createAction, props } from '@ngrx/store';
import { DiscountType } from 'app/core/models/facturation/discount-type.model';
import { Discount } from 'app/core/models/facturation/discount.model';

export enum DiscountActionstypes {
  /* Load Discount Types */
  LOAD_DISCOUNT_TYPES = '[Discount] Load Discount Types',
  LOAD_DISCOUNT_TYPES_SUCCESS = '[Discount] Load Discount Types Success',
  LOAD_DISCOUNT_TYPES_FAILURE = '[Discount] Load Discount Types Failure',

  /* Create Discount */
  CREATE_DISCOUNT = '[Discount] Create Discount',
  CREATE_DISCOUNT_SUCCESS = '[Discount] Create Discount Success',
  CREATE_DISCOUNT_FAILURE = '[Discount] Create Discount Failure',

  /* Load Discount */
  LOAD_DISCOUNT = '[Discount] Load Discount',
  LOAD_DISCOUNT_SUCCESS = '[Discount] Load Discount Success',
  LOAD_DISCOUNT_FAILURE = '[Discount] Load Discount Failure',
}

/* Load Discount Types Actions*/
export const loadDiscountTypes = createAction(
  DiscountActionstypes.LOAD_DISCOUNT_TYPES
);

export const loadDiscountTypesSuccess = createAction(
  DiscountActionstypes.LOAD_DISCOUNT_TYPES_SUCCESS,
  props<{ data: DiscountType[] }>()
);

export const loadDiscountTypesFailure = createAction(
  DiscountActionstypes.LOAD_DISCOUNT_TYPES_FAILURE,
  props<{ action: string; error: any }>()
);
/* END Load Discount Types Actions*/

/* Create Discount Actions*/
export const createDiscount = createAction(
  DiscountActionstypes.CREATE_DISCOUNT,
  props<{ data: Discount }>()
);

export const createDiscountSuccess = createAction(
  DiscountActionstypes.CREATE_DISCOUNT_SUCCESS,
  props<{ data: any }>()
);

export const createDiscountFailure = createAction(
  DiscountActionstypes.CREATE_DISCOUNT_FAILURE,
  props<{ action: string; error: any }>()
);
/* END Create Discount Actions*/
