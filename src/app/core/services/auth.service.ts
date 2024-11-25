import { fetchAxes, fetchDrivers, fetchSectorActivity } from './../store/resources/resources.actions';
import { fetchparc } from './../store/parc/parc.actions';
import { fetchprestataire } from './../store/prestataire/prestataire.actions';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models';
import { NavigationEnd, Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { Config } from '../../config';
import { TokenService } from './token.service';
import { AppState } from '../store/app.states';
import { Store } from '@ngrx/store';
import { SetLoggedUser } from '../store/profil/profil.actions';
import { fetchAccounts } from '../store/accounts/accounts.actions';
import { fetchGrids } from '../store/grids/grids.actions';
import { fetchCategoriesProducts, fetchCitiesAndCategories, fetchRubricsAndCalculBasis, fetchZones, fetchAllCity, fetchCityAgence, fetchBasisCalcul, fetchTruckService } from '../store/resources/resources.actions';
import { fetchallProductCategoryType, fetchProductCategory } from '../store/productcategory/productcategory.actions';
import { fetshMotPorture } from '../store/mot_porture/motporture.action';
import { fetchAgence } from '../store/agence/agence.actions';
import { fetchService } from '../store/service/service.actions';
import { fetchAxe } from '../store/axe/axe.action';
import { fetchbrands } from '../store/brand/brand.actions';
import { fetchmodeles } from '../store/modele/modele.actions';
import { fetchtruckCategorys } from '../store/truckCategory/truckCategory.actions';
import { fetchtruckTypes } from '../store/truckType/truckType.actions';
import { fetchtonnages } from '../store/tonnage/tonnage.actions';
import { fetchvolume } from '../store/volume/volume.actions';
import { fetchtypeExtincteur } from '../store/typeExtincteur/typeExtincteur.actions';
import { fetchgammes } from '../store/gamme/gamme.actions';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  clearTimeout: any;

  cureentRoute =''
  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService,
    private store: Store<AppState>,
  ) {
    this.userSubject = new BehaviorSubject<User>(null);
    this.user = this.userSubject.asObservable();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = event.url;



        console.log('cure route: ' , currentRoute)
        // Check if the current route is "X" and skip logout if needed
        // if (currentRoute === '/') {
        //   // Do something (e.g., show a message or redirect to another page)
        //   console.log('Cannot logout from route X');
        //   return;
        // }
      }
    });
  }

  login(params: any): Observable<any> {
    return this.http.post<any>(Config.api.auth.login, params).pipe(
      map((resp) => {
        this.autoLogout(resp.response.expires_in * 1000);
        console.log("RESP", resp)
        return resp;
      })
    );
  }

  autoLogout(expirationDate: number) {
    this.clearTimeout = setTimeout(() => {
      this.logout();
    }, expirationDate);
  }

  logout() {
    this.tokenService.removeToken();
    this.userSubject.next(null);
    this.router.navigate(['/login']);
    if (this.clearTimeout) {
      clearTimeout(this.clearTimeout);
    }
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  public setUser(user) {
    this.userSubject.next(new User(user));
  }

  me(): Observable<any> {
    return this.http.get(Config.api.auth.me).pipe(
      map((user) => {
        console.log('user me():',user)
        this.userSubject.next(new User(user['response'].user));
        const { userable, ...auth } = user['response'].user;

console.log('user logged : ==>',user['response']);

        //userable['global_config'] = user['response'].user.global_config;



        this.store.dispatch(SetLoggedUser({ payload: userable, auth }));
        this.loadRessources();
        return user['response'].user;
      }),
      catchError((err) => {
        this.logout();
        return 'err';
      })
    );
  }

  private loadRessources() {
    this.store.dispatch(fetshMotPorture());
    this.store.dispatch(fetchGrids());
    this.store.dispatch(fetchAccounts());
    this.store.dispatch(fetchvolume());
    this.store.dispatch(fetchRubricsAndCalculBasis());
    this.store.dispatch(fetchCategoriesProducts());
    this.store.dispatch(fetchallProductCategoryType());
    this.store.dispatch(fetchProductCategory());
    this.store.dispatch(fetchSectorActivity());
    this.store.dispatch(fetchBasisCalcul());
    this.store.dispatch(fetchAxe());
    this.store.dispatch(fetchAxes());
    this.store.dispatch(fetchAgence());
    // this.store.dispatch(fetchTrucks());
    // this.store.dispatch(fetchTaxe());
    this.store.dispatch(fetchCitiesAndCategories());
    this.store.dispatch(fetchZones());
    this.store.dispatch(fetchtypeExtincteur());
    this.store.dispatch(fetchprestataire());
    this.store.dispatch(fetchAllCity());
    this.store.dispatch(fetchCityAgence());
    this.store.dispatch(fetchDrivers());
    this.store.dispatch(fetchbrands());
    this.store.dispatch(fetchmodeles());
    this.store.dispatch(fetchgammes());
    this.store.dispatch(fetchparc());
    this.store.dispatch(fetchTruckService());
    this.store.dispatch(fetchtruckCategorys());
    this.store.dispatch(fetchtruckTypes());
    this.store.dispatch(fetchtonnages());
    this.store.dispatch(fetchService());
    this.store.dispatch(fetchAxe())
  }

  getUserByConfirmationToken(confirmation_token: string): Observable<any> {
    return this.http.get(
      Config.api.auth.user_by_confirmation_token + '/' + confirmation_token
    );
  }

  setPassword(new_password: string, confirmation_token): Observable<any> {
    return this.http.post(Config.api.auth.set_password, {
      new_password,
      confirmation_token,
    });

  }
}
