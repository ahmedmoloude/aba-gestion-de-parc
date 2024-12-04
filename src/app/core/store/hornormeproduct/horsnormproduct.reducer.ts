import { createReducer, on } from '@ngrx/store';
import {
  ProductCategoryActionFailure,
} from './horsnormproduct.actions';

export interface HorsNormState {
  HorsNormnatures:any[];
  loading: boolean;
  error: {
    action: string;
    error: any;
  } | null;
  status: 'INIT' | 'LOADING' | 'SUCCESS' | 'ERROR';
}


export const initialState: HorsNormState = {
  HorsNormnatures: [],
  loading: false,
  error: null,
  status: 'INIT',
};

export const HorsNormProductReducer = createReducer(
  initialState,
  // on(fetchhornormProduct, (state) => ({
  //   ...state,
  //   loading: true,
  //   status: 'LOADING',
  //   error: null,
  // })),
  // on(fetchhornormProductSuccess, (state, { payload }) => ({
  //   ...state,
  //   loading: false,
  //   HorsNormnatures: payload,
  //   status: 'SUCCESS',
  //   error: null,
  // })),
  // on(fetchallProductCategoryType, (state) => ({
  //   ...state,
  //   loading: true,
  //   status: 'LOADING',
  //   error: null,
  // })),
  // on(fetchProductNature, (state) => ({
  //   ...state,
  //   loading: true,
  //   status: 'LOADING',
  //   error: null,
  // })),

  // on(fetchallProductNatureSuccess, (state, { payload }) => ({
  //   ...state,
  //   loading: false,
  //   natures_product:{
  //     product_category:RemoveDuplicatedValue(payload),
  //   },
  //   status: 'SUCCESS',
  //   error: null,
  // })),

  // on(fetchallProductCategoryTypeSuccess,(state, { payload }) => ({
  //   ...state,
  //   loading: false,
  //   payload: payload,
  //   status: 'SUCCESS',
  //   error: null,
  // })),

  // on(createProductCategory, (state) => ({
  //   ...state,
  //   loading: true,
  //   status: 'SUCCESS',
  //   error: null,
  // })),


  // on(createProductCategorySuccess, (state, { payload }) => ({
  //   ...state,
  //   loading: false,
  //   natures_product:{
  //     product_category:RemoveDuplicatedValue([payload,...state.natures_product.product_category]),
  //   },
  //   status: 'SUCCESS',
  //   error: null,
  // })),

  // on(updateNatureProduct, (state) => ({
  //   ...state,
  //   loading: true,
  //   status: 'LOADING',
  //   error: null,
  // })),

  // on(updateNatureProductSuccess, (state, { payload }) => ({
  //   ...state,
  //   loading: false,
  //   natures_product:{
  //     product_category:RemoveDuplicatedValue(updateItemFromList(payload,state.natures_product.product_category)),
  //   },
  //   status: 'SUCCESS',
  //   error: null,
  // })),

  // on(deleteNatureProduct, (state) => ({
  //   ...state,
  //   loading: true,
  //   status: 'LOADING',
  //   error: null,
  // })),

  // on(deleteNatureProductSuccess, (state, { uuid }) => ({
  //   ...state,
  //   loading: false,
  //   natures_product:{
  //     product_category:[...state.natures_product.product_category.filter(g => g.uuid != uuid)],
  //   },
  //   status: 'SUCCESS',
  //   error: null,
  // })),
);

// #TODO move to helpers
const updateItemFromList = (updateItem: any, listItems: any[]) => {
  return listItems.map((item) => {
    if (item.id == updateItem.id) {
      return updateItem;
    }
    return item;
  });
};

const RemoveDuplicatedValue = (listItem:any[])=> {

  listItem = listItem.filter((value, index, self) =>
  index === self.findIndex((t) => (
    t.title === value.title && t.type === value.type
  ))
)
return listItem;
}


