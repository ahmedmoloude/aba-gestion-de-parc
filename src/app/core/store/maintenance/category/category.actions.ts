import { createAction, props } from '@ngrx/store';

export enum CategoryActionsType {
  /* Load Categories */
  LOAD_CATEGORIES = '[Category] Load Categories',
  LOAD_CATEGORIES_SUCCESS = '[Category] Load Categories Success',
  LOAD_CATEGORIES_FAILURE = '[Category] Load Categories Failure',

  /* Add Category */
  ADD_CATEGORY = '[Category] Add Category',
  ADD_CATEGORY_SUCCESS = '[Category] Add Category Success',
  ADD_CATEGORY_FAILURE = '[Category] Add Category Failure',

  /* Update Category */
  UPDATE_CATEGORY = '[Category] Update Category',
  UPDATE_CATEGORY_SUCCESS = '[Category] Update Category Success',
  UPDATE_CATEGORY_FAILURE = '[Category] Update Category Failure',

  /* Delete Category */
  DELETE_CATEGORY = '[Category] Delete Category',
  DELETE_CATEGORY_SUCCESS = '[Category] Delete Category Success',
  DELETE_CATEGORY_FAILURE = '[Category] Delete Category Failure',
}

/* Load Categories  Actions*/
export const loadCategories = createAction(
  CategoryActionsType.LOAD_CATEGORIES,
);

export const loadCategoriesSuccess = createAction(
  CategoryActionsType.LOAD_CATEGORIES_SUCCESS,
  props<{ data: any }>()
);

export const loadCategoriesFailure = createAction(
  CategoryActionsType.LOAD_CATEGORIES_FAILURE,
  props<{action: string, error: any} >()
);


/* Add Category Actions*/
export const addCategory = createAction(
  CategoryActionsType.ADD_CATEGORY,
  props<{ data: any }>()
);

export const addCategorySuccess = createAction(
  CategoryActionsType.ADD_CATEGORY_SUCCESS,
  props<{ data: any }>()
);

export const addCategoryFailure = createAction(
  CategoryActionsType.ADD_CATEGORY_FAILURE,
  props<{action: string, error: any} >()
);


/* Update Category  Actions*/
export const updateCategory = createAction(
  CategoryActionsType.UPDATE_CATEGORY,
  props<{ data: any }>()
);

export const updateCategorySuccess = createAction(
  CategoryActionsType.UPDATE_CATEGORY_SUCCESS,
  props<{ data: any }>()
);

export const updateCategoryFailure = createAction(
  CategoryActionsType.UPDATE_CATEGORY_FAILURE,
  props<{action: string, error: any} >()
);


/* Delete Category  Actions*/
export const deleteCategory = createAction(
  CategoryActionsType.DELETE_CATEGORY,
  props<{ data: any }>()
);

export const deleteCategorySuccess = createAction(
  CategoryActionsType.DELETE_CATEGORY_SUCCESS,
  props<{ data: any }>()
);

export const deleteCategoryFailure = createAction(
  CategoryActionsType.DELETE_CATEGORY_FAILURE,
  props<{action: string, error: any} >()
);

