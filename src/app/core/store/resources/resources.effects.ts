import { fetchAccountsSuccess } from './../accounts/accounts.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastService } from 'app/services';
import { fetchCitiesAndCategories, fetchCitiesAndCategoriesSuccess, resourcesActionFailure, fetchRubricsAndCalculBasis, fetchRubricsAndCalculBasisSuccess, fetchCategoriesProducts, fetchCategoriesProductsSuccess, fetchZones, fetchZonesSuccess, fetchAxes, fetchAxesSuccess, fetchDrivers, fetchDriversSuccess, fetchTrucks, fetchTrucksSuccess, fetchUserCommercial, fetchUserCommercialSuccess, fetchAllCity, fetchAllCitylSuccess, fetchCityAgence, fetchCityAgenceSuccess, fetchBasisCalcul, fetchBasisCalculSuccess, fetchTruckService, fetchTruckServiceSuccess, fetchSectorActivity, fetchSectorActivitySuccess } from "./resources.actions";
import { RessouresService } from 'app/core/services/ressoures.service';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { ActivityService } from 'app/core/services/activity.service';
import { ParametreService } from 'app/core/services/parametre.service';
import { VehiculeService } from 'app/core/services/vehicule.service';

@Injectable()
export class RessourcesEffects {
  constructor(
    private boGridService: BoGridService,
    private activityService: ActivityService,
    private parametreService: ParametreService,
    private vehiculeService: VehiculeService,
    private actions$: Actions,
    private ressourcesService: RessouresService,
    private _toast: ToastService
  ) { }

  getListCitiesAndCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchCitiesAndCategories),
      switchMap(() => {
        return this.ressourcesService.getCitiesAndCategroies().pipe(
          map((res: any) => {
            if (res.success) {
              const payload = res.response;
              // console.log("getCitiesAndCategroies", payload)
              return fetchCitiesAndCategoriesSuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return res({
                action: 'Fetching CitiesAndCategories',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              resourcesActionFailure({ action: 'Fetching CitiesAndCategories', error })
            );
          })
        );
      })
    );
  });

  getListAxes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchAxes),
      switchMap(() => {
        return this.ressourcesService.getAxes().pipe(
          map((res: any) => {
            if (res.success) {
              const payload = res.response;
              return fetchAxesSuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return res({
                action: 'Fetching Axes',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              resourcesActionFailure({ action: 'Fetching Axes', error })
            );
          })
        );
      })
    );
  });

  getListZones$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchZones),
      switchMap(() => {
        return this.ressourcesService.getZones().pipe(
          map((res: any) => {
            const payload = res;
            return fetchZonesSuccess({ payload });
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(resourcesActionFailure({ action: 'Fetching Zones', error }));
          })
        );
      })
    );
  });

  getListRubricsAndCalculBasis$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchRubricsAndCalculBasis),
      switchMap(() => {
        return this.ressourcesService.getRubrics().pipe(
          map((res: any) => {
            if (res.success) {
              const payload = res.response;
              return fetchRubricsAndCalculBasisSuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return res({
                action: 'Fetching RubricsAndCalculBasis',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              resourcesActionFailure({ action: 'Fetching RubricsAndCalculBasis', error })
            );
          })
        );
      })
    );
  });

  getListCategoriesProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchCategoriesProducts),
      switchMap(() => {
        return this.ressourcesService.getCategroiesProducts().pipe(
          map((res: any) => {
            if (res.success) {
              const payload = res.response;
              return fetchCategoriesProductsSuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return res({
                action: 'Fetching CategoriesProducts',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              resourcesActionFailure({ action: 'Fetching CategoriesProducts', error })
            );
          })
        );
      })
    );
  });

  getListDrivers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchDrivers),
      switchMap(() => {
        return this.ressourcesService.getDrivers().pipe(
          map((res: any) => {
            if (res.success) {
              const payload = res.response;
              return fetchDriversSuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return res({
                action: 'Fetching Drivers',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              resourcesActionFailure({ action: 'Fetching Drivers', error })
            );
          })
        );
      })
    );
  });

  getListTrucks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchTrucks),
      switchMap(() => {
        return this.ressourcesService.getTrucks().pipe(
          map((res: any) => {
            if (res.success) {
              const payload = res.response;
              return fetchTrucksSuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return res({
                action: 'Fetching Trucks',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              resourcesActionFailure({ action: 'Fetching Trucks', error })
            );
          })
        );
      })
    );
  });

  getListUserCommercial$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchUserCommercial),
      switchMap(() => {
        return this.activityService.UserCommercial().pipe(
          map((res: any) => {
            if (res.success) {
              const payload = res.response;
              return fetchUserCommercialSuccess({ payload });
            } else {
              this._toast.error('Une Erreur est survenu !');
              return res({
                action: 'Fetching user',
                error: res.message,
              });
            }
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              resourcesActionFailure({ action: 'Fetching user', error })
            );
          })
        );
      })
    );
  });

  getAllCity$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchAllCity),
      switchMap(() => {
        return this.boGridService.getAllCities().pipe(
          map((res: any) => {
            // console.log("city22", res)
            const payload = res;
            return fetchAllCitylSuccess({ payload });
          }),
          catchError((error) => {
            // console.log("city", error)
            this._toast.error('Une Erreur est survenu !');
            return of(
              resourcesActionFailure({
                action: 'Fetching contacts',
                error,
              })
            );
          })
        );
      })
    );
  });

  getCityAgence$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchCityAgence),
      switchMap(() => {
        return this.boGridService.CitiesAgence().pipe(
          map((res: any) => {
            const payload = res;
            return fetchCityAgenceSuccess({ payload });
          }),
          catchError((error) => {
            // console.log("city", error)
            this._toast.error('Une Erreur est survenu !');
            return of(
              resourcesActionFailure({
                action: 'Fetching contacts',
                error,
              })
            );
          })
        );
      })
    );
  });

  getBasisCalcul$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchBasisCalcul),
      switchMap(() => {
        return this.parametreService.allBasisCalcul().pipe(
          map((res: any) => {
            const payload = res;
            return fetchBasisCalculSuccess({ payload });
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              resourcesActionFailure({
                action: 'Fetching contacts',
                error,
              })
            );
          })
        );
      })
    );
  });

  // getParc$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(fetchParc),
  //     switchMap(() => {
  //       return this.vehiculeService.getParc().pipe(
  //         map((res: any) => {
  //           const payload = res;
  //           // console.log("parc", res)
  //           return fetchParcSuccess({ payload });
  //         }),
  //         catchError((error) => {
  //           this._toast.error('Une Erreur est survenu !');
  //           return of(
  //             resourcesActionFailure({
  //               action: 'Fetching parc',
  //               error,
  //             })
  //           );
  //         })
  //       );
  //     })
  //   );
  // });

  // getCiterne$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(fetchCiterneRessource),
  //     switchMap(() => {
  //       return this.vehiculeService.allCiterne().pipe(
  //         map((res: any) => {
  //           const payload = res.response;
  //           console.log("citerne store", payload)
  //           return fetchCiterneRessourceSuccess({ payload });
  //         }),
  //         catchError((error) => {
  //           this._toast.error('Une Erreur est survenu !');
  //           return of(
  //             resourcesActionFailure({
  //               action: 'Fetching parc',
  //               error,
  //             })
  //           );
  //         })
  //       );
  //     })
  //   );
  // });

  // getTruckCategory$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(fetchTruckCategory),
  //     switchMap(() => {
  //       return this.boGridService.getTruckCategory().pipe(
  //         map((res: any) => {
  //           const payload = res.response;
  //           // console.log("TruckCategory", res)
  //           return fetchTruckCategorySuccess({ payload });
  //         }),
  //         catchError((error) => {
  //           this._toast.error('Une Erreur est survenu !');
  //           return of(
  //             resourcesActionFailure({
  //               action: 'Fetching parc',
  //               error,
  //             })
  //           );
  //         })
  //       );
  //     })
  //   );
  // });

  // getTruckType$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(fetchTruckType),
  //     switchMap(() => {
  //       return this.boGridService.getTruckType().pipe(
  //         map((res: any) => {
  //           const payload = res;
  //           // console.log("TruckType", res)
  //           return fetchTruckTypeSuccess({ payload });
  //         }),
  //         catchError((error) => {
  //           this._toast.error('Une Erreur est survenu !');
  //           return of(
  //             resourcesActionFailure({
  //               action: 'Fetching parc',
  //               error,
  //             })
  //           );
  //         })
  //       );
  //     })
  //   );
  // });

  getTruckService$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchTruckService),
      switchMap(() => {
        return this.vehiculeService.getTruckService().pipe(
          map((res: any) => {
            const payload = res;
            // console.log("TruckService", res)
            return fetchTruckServiceSuccess({ payload });
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              resourcesActionFailure({
                action: 'Fetching parc',
                error,
              })
            );
          })
        );
      })
    );
  });

  getSectorActivity$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchSectorActivity),
      switchMap(() => {
        return this.boGridService.fetchListActivity().pipe(
          map((res: any) => {
            const payload = res;
            // console.log("SECTOR ACTIVITY", res)
            return fetchSectorActivitySuccess({ payload });
          }),
          catchError((error) => {
            this._toast.error('Une Erreur est survenu !');
            return of(
              resourcesActionFailure({
                action: 'Fetching parc',
                error,
              })
            );
          })
        );
      })
    );
  });

  // getTonnage$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(fetchTonnage),
  //     switchMap(() => {
  //       return this.boGridService.getTonnage().pipe(
  //         map((res: any) => {
  //           const payload = res;
  //           // console.log("tonnage", res)
  //           return fetchTonnageSuccess({ payload });
  //         }),
  //         catchError((error) => {
  //           this._toast.error('Une Erreur est survenu !');
  //           return of(
  //             resourcesActionFailure({
  //               action: 'Fetching parc',
  //               error,
  //             })
  //           );
  //         })
  //       );
  //     })
  //   );
  // });




}