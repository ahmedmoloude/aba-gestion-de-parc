import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';

import { BoOfferService } from 'app/core/services/admin-bo/bo-offers.service';

@Injectable()
export class TreeOfferEffects {
  constructor(
    private actions$: Actions,
    private boOfferService: BoOfferService,
    private _toast: ToastService,

  ) { }


}
