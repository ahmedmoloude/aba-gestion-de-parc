import { createReducer, on } from '@ngrx/store';
import { fetchAxes, fetchAxesSuccess, fetchCategoriesProducts, fetchCategoriesProductsSuccess, fetchCitiesAndCategories, fetchCitiesAndCategoriesSuccess, fetchDrivers, fetchDriversSuccess, fetchRubricsAndCalculBasis, fetchRubricsAndCalculBasisSuccess, fetchTrucks, fetchTrucksSuccess, fetchUserCommercial, fetchUserCommercialSuccess, fetchZones, fetchZonesSuccess, fetchAllCity, fetchAllCitylSuccess, resourcesActionFailure, fetchCityAgence, fetchCityAgenceSuccess, fetchBasisCalcul, fetchBasisCalculSuccess, fetchTruckService, fetchTruckServiceSuccess, fetchSectorActivity, fetchSectorActivitySuccess } from './resources.actions';


export interface RessourceState {
  citiesAndCategories: any[];
  axes: any[],
  rubricsAndCalculBasis: any[];
  categoriesProducts: any[];
  zones: any[];
  drivers: any[];
  trucks: any[];
  userCommercial: any[],
  allCity: any[],
  cityAgence: any[],
  basisCalcul: any[],
  parc: any[],
  brand: any[],
  category: any[],
  service: any[],
  type: any[],
  tonnage: any[],
  sector_activities: any[],
  citerne: any[],
  loading: boolean;
  error: {
    action: string;
    error: any;
  } | null;
  status: 'INIT' | 'LOADING' | 'SUCCESS' | 'ERROR';
}

export const initialState: RessourceState = {
  citiesAndCategories: [],
  axes: [],
  rubricsAndCalculBasis: [],
  categoriesProducts: [],
  zones: [],
  drivers: [],
  trucks: [],
  userCommercial: [],
  allCity: [],
  cityAgence : [],
  basisCalcul : [],
  parc: [],
  brand: [],
  category: [],
  service: [],
  type: [],
  tonnage: [],
  sector_activities: [],
  citerne : [],
  loading: false,
  error: null,
  status: 'INIT',
};

export const ressourcesReducer = createReducer(
  initialState,
  // cities and categories
  on(fetchCitiesAndCategories, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),

  on(fetchCitiesAndCategoriesSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    citiesAndCategories: payload,
    status: 'SUCCESS',
    error: null,
  })),

  // axes
  on(fetchAxes, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),

  on(fetchAxesSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    axes: payload,
    status: 'SUCCESS',
    error: null,
  })),

  // zones
  on(fetchZones, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(fetchZonesSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    zones: payload,
    status: 'SUCCESS',
    error: null,
  })),

  //parc
  // on(fetchParc, (state) => ({
  //   ...state,
  //   loading: true,
  //   status: 'LOADING',
  //   error: null,
  // })),
  // on(fetchParcSuccess, (state, { payload }) => ({
  //   ...state,
  //   loading: false,
  //   parc: payload,
  //   status: 'SUCCESS',
  //   error: null,
  // })),

   //citerne
  //  on(fetchCiterneRessource, (state) => ({
  //   ...state,
  //   loading: true,
  //   status: 'LOADING',
  //   error: null,
  // })),
  // on(fetchCiterneRessourceSuccess, (state, { payload }) => ({
  //   ...state,
  //   loading: false,
  //   citerne: payload,
  //   status: 'SUCCESS',
  //   error: null,
  // })),

  //category
  // on(fetchTruckCategory, (state) => ({
  //   ...state,
  //   loading: true,
  //   status: 'LOADING',
  //   error: null,
  // })),
  // on(fetchTruckCategorySuccess, (state, { payload }) => ({
  //   ...state,
  //   loading: false,
  //   category: payload,
  //   status: 'SUCCESS',
  //   error: null,
  // })),

  //service
  on(fetchTruckService, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(fetchTruckServiceSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    service: payload,
    status: 'SUCCESS',
    error: null,
  })),

  //type
  // on(fetchTruckType, (state) => ({
  //   ...state,
  //   loading: true,
  //   status: 'LOADING',
  //   error: null,
  // })),
  // on(fetchTruckTypeSuccess, (state, { payload }) => ({
  //   ...state,
  //   loading: false,
  //   type: payload,
  //   status: 'SUCCESS',
  //   error: null,
  // })),

  //tonnage
  // on(fetchTonnage, (state) => ({
  //   ...state,
  //   loading: true,
  //   status: 'LOADING',
  //   error: null,
  // })),
  // on(fetchTonnageSuccess, (state, { payload }) => ({
  //   ...state,
  //   loading: false,
  //   tonnage: payload,
  //   status: 'SUCCESS',
  //   error: null,
  // })),

  // rubrics
  on(fetchRubricsAndCalculBasis, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),

  on(fetchRubricsAndCalculBasisSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    rubricsAndCalculBasis: payload,
    status: 'SUCCESS',
    error: null,
  })),

  // categories products
  on(fetchCategoriesProducts, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),

  on(fetchCategoriesProductsSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    categoriesProducts: payload,
    status: 'SUCCESS',
    error: null,
  })),

  // drivers 
  on(fetchDrivers, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(fetchDriversSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    drivers: payload,
    status: 'SUCCESS',
    error: null,
  })),

  // trucks 
  on(fetchTrucks, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(fetchTrucksSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    trucks: payload,
    status: 'SUCCESS',
    error: null,
  })),

  on(fetchUserCommercial, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(fetchUserCommercialSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    userCommercial: payload,
    status: 'SUCCESS',
    error: null,
  })),

  on(fetchAllCity, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(fetchAllCitylSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    allCity: payload,
    status: 'SUCCESS',
    error: null,
  })),

  on(fetchCityAgence, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(fetchCityAgenceSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    cityAgence: payload,
    status: 'SUCCESS',
    error: null,
  })),

  on(fetchBasisCalcul, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(fetchBasisCalculSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    basisCalcul: payload,
    status: 'SUCCESS',
    error: null,
  })),

  on(fetchSectorActivity, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(fetchSectorActivitySuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    sector_activities: payload,
    status: 'SUCCESS',
    error: null,
  })),

  on(resourcesActionFailure, (state, { action, error }) => ({
    ...state,
    loading: false,
    status: 'ERROR',
    error: { action, error },
  }))
);
