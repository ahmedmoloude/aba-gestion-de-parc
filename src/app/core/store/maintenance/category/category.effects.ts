import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import { AnyResponse} from 'app/core/models/facturation/response-data.model';
import * as CategoryActions from 'app/core/store/maintenance/category/category.actions';
import { CategoryService } from 'app/core/services/maintenance/category.service';





@Injectable()
export class CategoryEffects {

  constructor(private actions$: Actions,
    private categoryService: CategoryService,
    private _toast: ToastService) {}

  loadCategories$ = createEffect( () => this.actions$.pipe(
    ofType(CategoryActions.CategoryActionsType.LOAD_CATEGORIES),
    exhaustMap((action: any) => {
      return this.categoryService.getCategories().pipe(
        map((resp: any) => {
          console.log('Categories');
          console.log(resp);
          if(resp.success) {
            return CategoryActions.loadCategoriesSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return CategoryActions.loadCategoriesFailure(
              {
                action: 'Load Categories',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(CategoryActions.loadCategoriesFailure(
          {
            action: 'Load Categories',
            error: err
          }
        )))
      )
    })
  ));

  addCategory$ = createEffect( () => this.actions$.pipe(
    ofType(CategoryActions.CategoryActionsType.ADD_CATEGORY),
    exhaustMap((action: any) => {
      return this.categoryService.addCategory(action.data).pipe(
        map((resp: any) => {
          console.log('Category');
          console.log(resp);
          if(resp.success) {
            return CategoryActions.addCategorySuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return CategoryActions.addCategoryFailure(
              {
                action: 'Add Category',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(CategoryActions.addCategoryFailure(
          {
            action: 'Add Category',
            error: err
          }
        )))
      )
    })
  ));

  updateCategory$ = createEffect( () => this.actions$.pipe(
    ofType(CategoryActions.CategoryActionsType.UPDATE_CATEGORY),
    exhaustMap((action: any) => {
      return this.categoryService.updateCategory(action.data).pipe(
        map((resp: any) => {
          console.log('Category');
          console.log(resp);
          if(resp.success) {
            return CategoryActions.updateCategorySuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return CategoryActions.updateCategoryFailure(
              {
                action: 'update Categories',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(CategoryActions.updateCategoryFailure(
          {
            action: 'update Categories',
            error: err
          }
        )))
      )
    })
  ));

  deleteCategory$ = createEffect( () => this.actions$.pipe(
    ofType(CategoryActions.CategoryActionsType.DELETE_CATEGORY),
    exhaustMap((action: any) => {
      return this.categoryService.deleteCategory(action.data).pipe(
        map((resp: any) => {
          console.log('Category');
          console.log(resp);
          if(resp.success) {
            return CategoryActions.deleteCategorySuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return CategoryActions.deleteCategoryFailure(
              {
                action: 'Delete Category',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(CategoryActions.deleteCategoryFailure(
          {
            action: 'Delete Category',
            error: err
          }
        )))
      )
    })
  ));

}
