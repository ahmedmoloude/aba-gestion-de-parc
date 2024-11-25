import { createAction, props } from '@ngrx/store';

export const resourcesActionFailure = createAction(
  '[resources] resources Action Failure',
  props<{ action: string; error: any }>()
);

export const fetchCitiesAndCategories = createAction('[CitiesAndCategories] Fetch CitiesAndCategories');
export const fetchCitiesAndCategoriesSuccess = createAction(
  '[CitiesAndCategories] Fetch list CitiesAndCategories Success',
  props<{ payload: any[] }>()
);

export const fetchAxes = createAction('[Axes] Fetch Axes');
export const fetchAxesSuccess = createAction(
  '[Axes] Fetch list Axes Success',
  props<{ payload: any[] }>()
);

export const fetchZones = createAction('[Zones] Fetch Zones');
export const fetchZonesSuccess = createAction('[Zones] Fetch list Zones Success',
  props<{ payload: any[] }>()
);

export const fetchSectorActivity = createAction('[SectorActivity] Fetch SectorActivity');
export const fetchSectorActivitySuccess = createAction('[SectorActivity] Fetch list SectorActivity Success',
  props<{ payload: any[] }>()
);

export const fetchRubricsAndCalculBasis = createAction('[RubricsAndCalculBasis] Fetch RubricsAndCalculBasis');
export const fetchRubricsAndCalculBasisSuccess = createAction(
  '[RubricsAndCalculBasis] Fetch list RubricsAndCalculBasis Success',
  props<{ payload: any[] }>()
);

export const fetchCategoriesProducts = createAction('[CategoriesProducts] Fetch CategoriesProducts');
export const fetchCategoriesProductsSuccess = createAction(
  '[CategoriesProducts] Fetch list CategoriesProducts Success',
  props<{ payload: any[] }>()
);

export const fetchDrivers = createAction('[Drivers] Fetch Drivers');
export const fetchDriversSuccess = createAction(
  '[Drivers] Fetch list Drivers Success',
  props<{ payload: any[] }>()
);

export const fetchTrucks = createAction('[Trucks] Fetch Trucks');
export const fetchTrucksSuccess = createAction(
  '[Trucks] Fetch list Trucks Success',
  props<{ payload: any[] }>()
);

export const fetchUserCommercial = createAction('[UserCommercial] Fetch UserCommercial');
export const fetchUserCommercialSuccess = createAction(
  '[UserCommercial] Fetch list UserCommercial Success',
  props<{ payload: any[] }>()
);

export const fetchAllCity = createAction('[AllCity] Fetch AllCity');
export const fetchAllCitylSuccess = createAction(
  '[AllCity] Fetch list AllCity Success',
  props<{ payload: any[] }>()
);

export const fetchCityAgence = createAction('[CityAgence] Fetch CityAgence');
export const fetchCityAgenceSuccess = createAction(
  '[CityAgence] Fetch list CityAgence Success',
  props<{ payload: any[] }>()
);

export const fetchBasisCalcul = createAction('[BasisCalcul] Fetch BasisCalcul');
export const fetchBasisCalculSuccess = createAction(
  '[BasisCalcul] Fetch list BasisCalcul Success',
  props<{ payload: any[] }>()
);

// export const fetchBrand = createAction('[Brand] Fetch Brand');
// export const fetchBrandSuccess = createAction(
//   '[Brand] Fetch list Brand Success',
//   props<{ payload: any[] }>()
// );

// export const fetchTruckCategory = createAction('[TruckCategory] Fetch TruckCategory');
// export const fetchTruckCategorySuccess = createAction(
//   '[TruckCategory] Fetch list TruckCategory Success',
//   props<{ payload: any[] }>()
// );

// export const fetchTruckType = createAction('[TruckType] Fetch TruckType');
// export const fetchTruckTypeSuccess = createAction(
//   '[TruckType] Fetch list TruckType Success',
//   props<{ payload: any[] }>()
// );

export const fetchTruckService = createAction('[Service] Fetch Service');
export const fetchTruckServiceSuccess = createAction(
  '[Service] Fetch list Service Success',
  props<{ payload: any[] }>()
);

// export const fetchParc = createAction('[Parc] Fetch Parc');
// export const fetchParcSuccess = createAction(
//   '[Parc] Fetch list Parc Success',
//   props<{ payload: any[] }>()
// );

// export const fetchCiterneRessource = createAction('[Citerne] Fetch Citerne');
// export const fetchCiterneRessourceSuccess = createAction(
//   '[Citerne] Fetch list Citerne Success',
//   props<{ payload: any[] }>()
// );

