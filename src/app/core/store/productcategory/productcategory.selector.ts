import { createSelector } from "@ngrx/store";
import { AppState } from "../app.states";

import { ProductCategoryState } from "./productcategory.reducer";


export const appSelectProduct = (state: AppState) => state.ProductCategory;

export const selectTypeIsLoading = createSelector(
    appSelectProduct,
    (state: ProductCategoryState) => state.loading
);
export const selectallproductcategory = createSelector(
    appSelectProduct,
    (state: ProductCategoryState) => state.payload
);
export const selectNatureProduct = createSelector(
    appSelectProduct,
    (state: ProductCategoryState) => state.natures_product.product_category
);
// export const selectproductcategory = createSelector(
//     appSelectProduct,
//     (state: ProductCategoryState) => state.natures_product.product_category
// );


