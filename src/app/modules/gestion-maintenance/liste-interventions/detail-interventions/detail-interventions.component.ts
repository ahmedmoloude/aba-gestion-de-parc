import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailVehiculeComponent } from '../detail-vehicule/detail-vehicule.component';
import { Bon, Truck } from 'app/core/models/maintenance/intervention-maintenance.model';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { Observable, Subscription } from 'rxjs';
import { MaintenanceStateEnum } from 'app/core/store/maintenance/maintenance-intervention/maintenance-intervention.reducer';
import { ActivatedRoute } from '@angular/router';
import { DiagnostiqueState } from 'app/core/store/maintenance/diagnostique/diagnostique.reducer';
import { loadDiagnostique } from 'app/core/store/maintenance/diagnostique/diagnostique.actions';
import { Config } from 'app/config';
@Component({
  selector: 'app-detail-interventions',
  templateUrl: './detail-interventions.component.html',
  styleUrls: ['./detail-interventions.component.css']
})
export class DetailInterventionsComponent implements OnInit, OnDestroy{
  p: number = 1;
  headerColumuns = [
    'Nom',
    'ID',
    'Date'
  ];

  categories: any[] = [];


  diagnostique$: Observable<DiagnostiqueState> = this.store.select(state => state.diagnostique);
  diagnostiqueSubscription: Subscription;
  intervention;

  url: string = Config.api.bill.printBill;

  categoryList: any[] = [];


  constructor(public dialog: MatDialog,
              private store: Store<AppState>,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    let uuid: string = this.route.snapshot.params['uuid'];
    let status = true;
    if(uuid) {
      this.diagnostiqueSubscription = this.diagnostique$.subscribe(
        (resp) => {
          if (resp?.dataState != MaintenanceStateEnum.SUCCESS || !resp?.maintenanceIntervention) {
            status = false;
          }
          else if(resp?.maintenanceIntervention){
            this.intervention = resp.maintenanceIntervention;
            this.groupPiecesByCategories();

          }
        }
      )
      if(!status) {
        this.store.dispatch(loadDiagnostique({data: uuid}));
      }
    }


  }

  // groupPiecesByCategories() {
  //   this.categories = this.intervention?.diagnostiques?.reduce((acc, item) => {
  //     const { categorie } = item;
  //     if (!acc[categorie]) {
  //       acc[categorie] = [];
  //     }
  //     acc[categorie].push(item);
  //     return acc;
  //   }, [] );
  // }

  groupPiecesByCategories() {
    this.categoryList = this.intervention?.diagnostiques?.reduce((acc, item) => {
      const { category } = item;
      const { name } = category;
      if (!acc[name]) {
        acc[name] = [];
      }
      // if(item.piece_rechange)
      acc[name].push(item);
      return acc;
    }, []);
    const sortedCategoryList = Object.keys(this.categoryList).sort().reduce((acc, key) => {
      const category = this.categoryList[key]
      if (category.length>1) {
        acc[key] = this.filterNonNullPieceRechange(category);
      } else {
        acc[key] = category;
      }
      return acc;
    }, []);
    this.categoryList = sortedCategoryList

   console.log('categoryList sorted', sortedCategoryList)

    console.log('categories');
    console.log(this.categoryList);
  }

  filterNonNullPieceRechange(array) {
    return array.filter(item => item.piece_rechange);
  }

  getPiecesPrices(quantity, prixUnitaire) {
    const prixHT: number = prixUnitaire * quantity;
    const prixTTC: number = prixHT * 1.2;
    const tva: number = prixTTC - prixHT;
    const prixMoyenTTC = (prixTTC/quantity);
    return {prixMoyenTTC:prixMoyenTTC.toFixed(2), prixHT: prixHT.toFixed(2), prixTTC: prixTTC.toFixed(2), tva: tva.toFixed(2)}
  }

  getQuantiteARecuperer(quantityDemandee: number, quantityStock: number): number{
    return Math.min(quantityDemandee, quantityStock);
  }

  getQuantiteAAcheter(quantityDemandee: number, quantityStock: number): number{
    return Math.max(0, quantityDemandee - quantityStock);
  }

  historiquevehicule( data: Truck): void {
    this.dialog.open(DetailVehiculeComponent, {
      disableClose: true,
      width: '741px',
      height: '100vh',
      data: data,
      position: { right: '0px' },
    });
  }

  printBonCommande(bon: Bon ) {
    const link = document.createElement('a');
    link.href = this.url + bon?.path;
    link.target = '_blank';
    link.download = 'Bon de '+ bon?.type.toLowerCase() + 'N° ' + bon?.reference+ '.pdf';
    link.click();
  }

  ngOnDestroy() : void {
    this.diagnostiqueSubscription?.unsubscribe();
  }
}
