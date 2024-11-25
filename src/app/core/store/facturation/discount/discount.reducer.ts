import { state } from '@angular/animations';
import { M } from '@angular/cdk/keycodes';
import { Action, createReducer, on } from '@ngrx/store';
import { DiscountType } from 'app/core/models/facturation/discount-type.model';
import { Discount } from 'app/core/models/facturation/discount.model';
import * as DiscountActions from 'app/core/store/facturation/discount/discount.actions'


export const discountFeatureKey = 'discount';

export enum DiscountStateEnum {
  INIT ='INIT',
  LOADING ='LOADING',
  SUCCESS ='SUCCESS',
  ERROR ='ERROR',
}

export interface DiscountState {
  discountTypes: DiscountType[],
  discount: any,
  dataState: DiscountStateEnum;
  errorMessage: { action: string; error: any } | null;
}

export const initialState: DiscountState = {
  discountTypes: null,
  discount: null,
  dataState: DiscountStateEnum.INIT,
  errorMessage: null
};


export const discountReducer = createReducer(
  initialState,
  on(DiscountActions.loadDiscountTypes, state => ({...state, dataState: DiscountStateEnum.LOADING})),
  on(DiscountActions.loadDiscountTypesSuccess, (state, {data}) => ({...state, dataState: DiscountStateEnum.SUCCESS, discountTypes: data})),
  on(DiscountActions.loadDiscountTypesFailure, (state, {error}) => ({...state, dataState: DiscountStateEnum.ERROR, errorMessage: error})),
  on(DiscountActions.createDiscount, state => ({...state, dataState: DiscountStateEnum.LOADING})),
  on(DiscountActions.createDiscountSuccess, (state, {data}) => ({...state, dataState: DiscountStateEnum.SUCCESS, discount: data})),
  on(DiscountActions.createDiscountFailure, (state, {error}) => ({...state, dataState: DiscountStateEnum.ERROR, errorMessage: error})),


);

