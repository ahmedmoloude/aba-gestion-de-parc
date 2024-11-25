import { createAction, props } from '@ngrx/store';

export const ProductCategoryActionFailure = createAction(
  '[grids] Grids Action Failure',
  props<{ action: string; error: any }>()
);

export const fetchProductCategory = createAction('[productcategory] Fetch List productcategory');

export const fetchProductCategorySuccess = createAction(
  '[productcategory] Fetch List productcategory Success',
  props<{ payload: any[] }>()
);

// export const fetchhornormProduct = createAction('[typeHorsNorm] Fetch List nature type Horsnorm');

// export const fetchhornormProductSuccess = createAction(
//   '[typeHorsNorm] Fetch List nature type Horsnorm Success',
//   props<{ payload: any[] }>()
// );

export const fetchallProductCategoryType = createAction('[productcategory] Fetch all Type productcategory');

export const fetchallProductCategoryTypeSuccess = createAction(
  '[productcategory] Fetch all Type productcategory Success',
  props<{ payload: any[] }>()
);

export const fetchProductNature = createAction('[productnature] Fetch all ProductNature');

export const fetchallProductNatureSuccess = createAction(
   '[productnature] Fetch all productnature Success',
    props<{payload:any[]}>()
);

export const createProductCategory = createAction(
  '[productcategory] create all Type productcategory',
     props<{ data: any }>()
);

export const createProductCategorySuccess = createAction(
  '[productcategory] create all Type productcategory Success',
  props<{ payload: any[] }>()
);

export const updateNatureProduct = createAction(
  '[grids] update product details',
  props<{ uuid: any, data: any }>()
);



export const updateNatureProductSuccess = createAction(
  '[grids] update product details Success',
  props<{ payload: any }>()
);



export const deleteNatureProduct = createAction(
  '[productcategory] Delete Nature Product',
  props<{ uuid: string }>()
);



export const deleteNatureProductSuccess = createAction(
  '[productcategory] Delete Nature Product Success',
  props<{ uuid: any }>()
);




