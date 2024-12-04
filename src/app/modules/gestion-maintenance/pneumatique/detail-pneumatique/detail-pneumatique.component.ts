import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AffecterVehiculeComponent } from '../affecter-vehicule/affecter-vehicule.component';
import { Pneu } from 'app/core/models/maintenance/pneu.model';
import { Observable, Subscription } from 'rxjs';
import { PneumatiqueState } from 'app/core/store/maintenance/pneumatique/pneumatique.reducer';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
@Component({
  selector: 'app-detail-pneumatique',
  templateUrl: './detail-pneumatique.component.html',
  styleUrls: ['./detail-pneumatique.component.css']
})
export class DetailPneumatiqueComponent implements OnInit, OnDestroy {
  headerColumuns = [
    'N° de série',
    'Immatriculation',
    'Code véhicule',
    'Position',
    'Date d’affectation',
    'Date de désaffectation',
    'Km parcouru',
  ];

  pneu$: Observable<PneumatiqueState> = this.store.select(state => state.pneumatique);
  pneuSubscription: Subscription;

  constructor(public dialog: MatDialog,
    private store: Store<AppState>,) { }

  ngOnInit(): void {
  }
  affectevehicule(item: Pneu): void {
    const dialogRef = this.dialog.open(AffecterVehiculeComponent, {
      disableClose: false,
      width: '882px',
      data: item,
    });
  }

  ngOnDestroy(): void {
    this.pneuSubscription?.unsubscribe();
  }
}
