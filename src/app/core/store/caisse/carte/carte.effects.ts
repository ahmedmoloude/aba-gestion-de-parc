import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CarteService } from 'app/core/services/caisse/carte.service';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import { AnyResponse, CarteResponse, CartesResponse} from 'app/core/models/facturation/response-data.model';
import * as CaisseCarteActions from 'app/core/store/caisse/carte/carte.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.states';
import { updatePagination } from '../../pagination/pagination.actions';


@Injectable()
export class CarteEffects {



  constructor(private actions$: Actions,
    private carteService: CarteService,
    private _toast: ToastService,
    private store : Store<AppState>) {}

  loadCaisseCartes$ = createEffect( () => this.actions$.pipe(
    ofType(CaisseCarteActions.CaisseCarteActionstypes.LOAD_CAISSE_CARTES),
    exhaustMap((action: any) => {
      return this.carteService.getCaisseCartes(action.data, action.per_page , action.page).pipe(
        map((resp: CartesResponse) => {
          console.log('CaisseCarte');
          console.log(resp);
          if(resp.success) {
            this.store.dispatch(updatePagination({
              currentPage: resp.response.current_page,
              pageSize: resp.response.per_page,
              totalItems: resp.response.total
             }));
            return CaisseCarteActions.loadCaisseCartesSuccess({data: resp.response.data})
          } else {
            this._toast.error('une erreur est survenue!');
            return CaisseCarteActions.loadCaisseCartesFailure(
              {
                action: 'Load CaisseCartes',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(CaisseCarteActions.loadCaisseCartesFailure(
          {
            action: 'Load CaisseCartes',
            error: err
          }
        )))
      )
    })
  ));

  addCaisseCarte$ = createEffect( () => this.actions$.pipe(
    ofType(CaisseCarteActions.CaisseCarteActionstypes.ADD_CAISSE_CARTE),
    exhaustMap((action: any) => {
      return this.carteService.addCaisseCarte(action.data).pipe(
        map((resp: CarteResponse) => {
          console.log('CaisseCarte');
          console.log(resp);
          if(resp.success) {
            return CaisseCarteActions.addCaisseCarteSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return CaisseCarteActions.addCaisseCarteFailure(
              {
                action: 'add CaisseCarte',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(CaisseCarteActions.addCaisseCarteFailure(
          {
            action: 'add CaisseCarte',
            error: err
          }
        )))
      )
    })
  ));

  feedCaisseCarte$ = createEffect( () => this.actions$.pipe(
    ofType(CaisseCarteActions.CaisseCarteActionstypes.FEED_CAISSE_CARTE),
    exhaustMap((action: any) => {
      return this.carteService.alimenterCaisseCarte(action.data).pipe(
        map((resp: CarteResponse) => {
          console.log('alimenter CaisseCarte');
          console.log(resp);
          if(resp.success) {
            return CaisseCarteActions.feedCaisseCarteSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return CaisseCarteActions.feedCaisseCarteFailure(
              {
                action: 'alimenter CaisseCarte',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(CaisseCarteActions.feedCaisseCarteFailure(
          {
            action: 'alimenter CaisseCarte',
            error: err
          }
        )))
      )
    })
  ));

  affectCaisseCarte$ = createEffect( () => this.actions$.pipe(
    ofType(CaisseCarteActions.CaisseCarteActionstypes.AFFECT_CAISSE_CARTE),
    exhaustMap((action: any) => {
      return this.carteService.affecterCaisseCarte(action.data).pipe(
        map((resp: CarteResponse) => {
          console.log('Affect CaisseCarte');
          console.log(resp);
          if(resp.success) {
            return CaisseCarteActions.affectCaisseCarteSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return CaisseCarteActions.affectCaisseCarteFailure(
              {
                action: 'Affect CaisseCarte',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(CaisseCarteActions.affectCaisseCarteFailure(
          {
            action: 'Affect CaisseCarte',
            error: err
          }
        )))
      )
    })
  ));


  disaffectCaisseCarte$ = createEffect( () => this.actions$.pipe(
    ofType(CaisseCarteActions.CaisseCarteActionstypes.DISAFFECT_CAISSE_CARTE),
    exhaustMap((action: any) => {
      return this.carteService.desaffecterCaisseCarte(action.data).pipe(
        map((resp: CarteResponse) => {
          console.log('Disaffect CaisseCarte');
          console.log(resp);
          if(resp.success) {
            return CaisseCarteActions.disaffectCaisseCarteSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return CaisseCarteActions.disaffectCaisseCarteFailure(
              {
                action: 'Disaffect CaisseCarte',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(CaisseCarteActions.disaffectCaisseCarteFailure(
          {
            action: 'Disaffect CaisseCarte',
            error: err
          }
        )))
      )
    })
  ));


  deleteCaisseCarte$ = createEffect( () => this.actions$.pipe(
    ofType(CaisseCarteActions.CaisseCarteActionstypes.DELETE_CAISSE_CARTE),
    exhaustMap((action: any) => {
      return this.carteService.deleteCaisseCarte(action.data).pipe(
        map((resp: CarteResponse) => {
          console.log('Delete CaisseCarte');
          console.log(resp);
          if(resp.success) {
            return CaisseCarteActions.deleteCaisseCarteSuccess({data: action.data})
          } else {
            this._toast.error('une erreur est survenue!');
            return CaisseCarteActions.deleteCaisseCarteFailure(
              {
                action: 'Delete CaisseCarte',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(CaisseCarteActions.deleteCaisseCarteFailure(
          {
            action: 'Delete CaisseCarte',
            error: err
          }
        )))
      )
    })
  ));

  loadMouvementCaisseCarte$ = createEffect( () => this.actions$.pipe(
    ofType(CaisseCarteActions.CaisseCarteActionstypes.LOAD_MOUVEMENT_CAISSE_CARTE),
    exhaustMap((action: any) => {
      return this.carteService.getMouvementCaisseCarte(action.data).pipe(
        map((resp: AnyResponse) => {
          console.log('Mouvement CaisseCarte');
          console.log(resp);
          if(resp.success) {
            return CaisseCarteActions.loadMouvementCaisseCarteSuccess({data: resp.response})
          } else {
            this._toast.error('une erreur est survenue!');
            return CaisseCarteActions.loadMouvementCaisseCarteFailure(
              {
                action: 'Load Mouvement CaisseCarte',
                error: resp.message
              }
            )
          }
        }),
        catchError((err) => of(CaisseCarteActions.loadMouvementCaisseCarteFailure(
          {
            action: 'Load Mouvement CaisseCarte',
            error: err
          }
        )))
      )
    })
  ));
}
