import { Action, createReducer, on } from '@ngrx/store';
import { MaintenanceStateEnum } from '../maintenance-intervention/maintenance-intervention.reducer';
import * as CategoryActions from'app/core/store/maintenance/category/category.actions';


export const categoryFeatureKey = 'category';

export interface CategoryState {
  categories: any[];
  category: any;
  dataState: MaintenanceStateEnum;
  categoryState: MaintenanceStateEnum;
  errorMessage: { action: string; error: any } | null;
}

export const initialState: CategoryState = {
  categories: null,
  category: null,
  dataState: MaintenanceStateEnum.INIT,
  categoryState: MaintenanceStateEnum.INIT,
  errorMessage: null,
};


export const CategoryReducer = createReducer(
  initialState,
  on(CategoryActions.loadCategories,(state, ) => ({...state, dataState: MaintenanceStateEnum.LOADING})),
  on(CategoryActions.loadCategoriesSuccess,(state, {data}) => ({...state, dataState: MaintenanceStateEnum.SUCCESS, categories:data})),
  on(CategoryActions.loadCategoriesFailure,(state, {error}) => ({...state, dataState: MaintenanceStateEnum.ERROR, errorMessage: error})),
  on(CategoryActions.addCategory,(state, ) => ({...state, categoryState: MaintenanceStateEnum.LOADING})),
  on(CategoryActions.addCategorySuccess,(state, {data}) => ({...state, categoryState: MaintenanceStateEnum.SUCCESS, category:data, categories:[data, ...state.categories] })),
  on(CategoryActions.addCategoryFailure,(state, {error}) => ({...state, categoryState: MaintenanceStateEnum.ERROR, errorMessage: error})),
  on(CategoryActions.updateCategory,(state, ) => ({...state, categoryState: MaintenanceStateEnum.LOADING})),
  on(CategoryActions.updateCategorySuccess,(state, {data}) => ({...state, categoryState: MaintenanceStateEnum.SUCCESS, category:data, categories: state.categories?.map(item => item.id === data.id ? data : item)})),
  on(CategoryActions.updateCategoryFailure,(state, {error}) => ({...state, categoryState: MaintenanceStateEnum.ERROR, errorMessage: error})),
  on(CategoryActions.deleteCategory,(state, ) => ({...state, dataState: MaintenanceStateEnum.LOADING})),
  on(CategoryActions.deleteCategorySuccess,(state, {data}) => ({...state, dataState: MaintenanceStateEnum.SUCCESS, categories:state.categories?.filter(element => element.id != data)})),
  on(CategoryActions.deleteCategoryFailure,(state, {error}) => ({...state, dataState: MaintenanceStateEnum.ERROR, errorMessage: error})),

);



