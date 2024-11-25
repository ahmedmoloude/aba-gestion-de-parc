import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as DiscountActions from 'app/core/store/facturation/discount/discount.actions'
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import { RemiseService } from 'app/core/services/facturation/remise.service';
import { DiscountTypesResponse } from 'app/core/models/facturation/response-data.model';


@Injectable()
export class DiscountEffects {

  constructor(private actions$: Actions,
    private discountService: RemiseService,
    private _toast: ToastService ) {}

  loadDiscountTypes$ = createEffect( () => this.actions$.pipe(
    ofType(DiscountActions.DiscountActionstypes.LOAD_DISCOUNT_TYPES),
    exhaustMap(() => {
      return this.discountService.getDiscountTypes().pipe(
        map((resp: DiscountTypesResponse) => {
          console.log('discount');
          console.log(resp);
          if(resp.success) {
            return DiscountActions.loadDiscountTypesSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return DiscountActions.loadDiscountTypesFailure(
              {
                action: 'Load Discount Types',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(DiscountActions.loadDiscountTypesFailure(
          {
            action: 'Load Discount Types',
            error: err
          }
        )))
      )
    })
  ));

  createDiscount$ = createEffect( () => this.actions$.pipe(
    ofType(DiscountActions.DiscountActionstypes.CREATE_DISCOUNT),
    exhaustMap((action: any) => {
      return this.discountService.createDiscount(action.data).pipe(
        map((resp) => {
          console.log('createDiscount');
          console.log(resp);
          if(resp.success) {
            return DiscountActions.createDiscountSuccess({data: resp.response.factures})
          } else {
            this._toast.error('une erreur est survenue!');
            return DiscountActions.createDiscountFailure(
              {
                action: 'Create Discount',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => {
          this._toast.error('une erreur est survenue!');
          return of(DiscountActions.createDiscountFailure(
            {
              action: 'Create Discount',
              error: err
            }
          ))
        })
      )
    })
  ));
}
