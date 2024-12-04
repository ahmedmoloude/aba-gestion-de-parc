import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { GridState } from './grids.reducer';

export const appSelectGrid = (state: AppState) => state.grids;
export const selectPublicGrids = createSelector(
  appSelectGrid,
  (state: GridState) => state.public_grids
);
export const selectActiveGrid = createSelector(
  appSelectGrid,
  (state: GridState) => state.active_grid
);
export const selectActiveGridGroupByNature = createSelector(
  appSelectGrid,
  (state: GridState) => {
    const grids = {
      'Palette': { label: "Palettes", icon: "group", data: [] }, 'Colis': { label: "Colis", icon: "beenhere", data: [] }
    };
    const nature_products = Object.keys(grids);
    let selectedGrig = state.selected_grid
      ? state.selected_grid
      : state.active_grid
    if (selectedGrig) {
      selectedGrig.grids_details.transport.forEach((item: any) => {
        if (nature_products.includes(item.type_product_category))
          grids[item.type_product_category].data.push(item)
      })
    }
    return grids;
  }
);
export const selectActiveGridServices = createSelector(
  appSelectGrid,
  (state: GridState) => {
    let selectedGrig = state.selected_grid
      ? state.selected_grid
      : state.active_grid
    if (selectedGrig) return selectedGrig.grids_details.services;
    return [];
  }
);

export const selectHorsnormTransport = createSelector(

  appSelectGrid,
  (state: GridState) => {
    if (state.active_grid) return state.active_grid.grids_details_hors_norme.transport;
    return [];
  }


);
export const selectGridIsLoading = createSelector(
  appSelectGrid,
  (state: GridState) => state.loading
);
export const selectGridError = createSelector(
  appSelectGrid,
  (state: GridState) => state.error
);
export const selectGridStatus = createSelector(
  appSelectGrid,
  (state: GridState) => state.status
);

export const selectGrid = createSelector(
  appSelectGrid,
  (state: GridState) => state.selected_grid
);
