import { createSelector } from "@ngrx/store";
import { AppState } from "../app.states";

import { HorsNormState } from "./horsnormproduct.reducer";


export const appSelectProduct = (state: AppState) => state.HorsNormProduct;

export const selectTypeIsLoading = createSelector(
    appSelectProduct,
    (state: HorsNormState) => state.loading
);

export const selectallproductcategory = createSelector(
    appSelectProduct,
    (state: HorsNormState) => state.HorsNormnatures
);
// export const selectNatureProduct = createSelector(
//     appSelectProduct,
//     (state: HorsNormState) => state.natures_product.product_category
// );
// export const selectproductcategory = createSelector(
//     appSelectProduct,
//     (state: HorsNormState) => state.hornormes_nature
// );


