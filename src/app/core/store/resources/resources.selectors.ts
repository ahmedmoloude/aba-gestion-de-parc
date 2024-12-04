import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { RessourceState } from './resources.reducer';

export const appSelectRessources = (state: AppState) => state.ressources;
export const selectCitiesAndCategories = createSelector(
  appSelectRessources,
  (state: RessourceState) => state.citiesAndCategories
);
export const selectAxes = createSelector(
  appSelectRessources,
  (state: RessourceState) => state.axes
);
export const selectZones = createSelector(
  appSelectRessources,
  (state: RessourceState) => state.zones
);
export const selectZonesByCity = (city_id: number) => createSelector(
  appSelectRessources,
  (state: RessourceState) => state.zones.filter(zone => zone.city.id == city_id)
);
export const selectRubricAndCalculBasis = createSelector(
  appSelectRessources,
  (state: RessourceState) => state.rubricsAndCalculBasis
);
export const selectCategoriesProducts = createSelector(
  appSelectRessources,
  (state: RessourceState) => state.categoriesProducts
);

export const selectDrivers = createSelector(
  appSelectRessources,
  (state: RessourceState) => state.drivers
);
export const selectTrucks = createSelector(
  appSelectRessources,
  (state: RessourceState) => state.trucks
);

export const selectUserCommercial = createSelector(
  appSelectRessources,
  (state: RessourceState) => state.userCommercial
);

export const selectAllCity = createSelector(
  appSelectRessources,
  (state: RessourceState) => state.allCity 
);

export const selectAllCityAgence = createSelector(
  appSelectRessources,
  (state: RessourceState) => state.cityAgence 
);

export const selectBasisCalcul = createSelector(
  appSelectRessources,
  (state: RessourceState) => state.basisCalcul 
);

export const selectSectorActivity = createSelector(
  appSelectRessources,
  (state: RessourceState) => state.sector_activities,
 
);

// export const selectParc = createSelector(
//   appSelectRessources,
//   (state: RessourceState) => state.parc 
// );

export const selectCiterne = createSelector(
  appSelectRessources,
  (state: RessourceState) => state.citerne 
);

// export const selectTruckCategory = createSelector(
//   appSelectRessources,
//   (state: RessourceState) => state.category 
// );

// export const selectTruckType = createSelector(
//   appSelectRessources,
//   (state: RessourceState) => state.type 
// );

// export const selectTonnage = createSelector(
//   appSelectRessources,
//   (state: RessourceState) => state.tonnage 
// );

export const selectTruckService = createSelector(
  appSelectRessources,
  (state: RessourceState) => state.service 
);