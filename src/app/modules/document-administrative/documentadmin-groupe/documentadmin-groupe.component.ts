import { Component, OnInit, Input } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import {
  selectEnvVehiculePayload,
  selectEnvVehiculeIsLoading,
  selectEnvVehiculeStatus,
} from 'app/core/store/vehicule/vehicule.selectors';
import { environment } from 'environments/environment';
import { selectEnvVehiculeContratPayload } from 'app/core/store/vehiculecontrat/vehiculecontrat.selectors';
import { selectEnvVehiculeDocumentPayload } from 'app/core/store/vehiculedocument/vehiculedocument.selectors';
import { VehiculeService } from 'app/core/services/vehicule.service';
import { AddDialogComponent } from 'app/modules/document-administrative/assurance/add-dialog/add-dialog.component';
import { AddDialogComponent as vignette } from 'app/modules/document-administrative/vignette/add-dialog/add-dialog.component';
import { AddDialogComponent as autorisation } from 'app/modules/document-administrative/autorisation/add-dialog/add-dialog.component';
import { AddDialogComponent as carte } from 'app/modules/document-administrative/carte-grise/add-dialog/add-dialog.component';
import { AddDialogComponent as taxe } from 'app/modules/document-administrative/taxe/add-dialog/add-dialog.component';
import { AddDialogComponent as tachygraphe } from 'app/modules/document-administrative/tachygraphe/add-dialog/add-dialog.component';
import { AddDialogComponent as visite } from 'app/modules/document-administrative/visite/add-dialog/add-dialog.component';
import { fetchVehiculeDocuments } from 'app/core/store/vehiculedocument/vehiculedocument.actions';
@Component({
  selector: 'app-documentadmin-groupe',
  templateUrl: './documentadmin-groupe.component.html',
  styleUrls: ['./documentadmin-groupe.component.css'],
})
export class DocumentadminGroupeComponent implements OnInit {
  selectedTabIndex = 0;
  @Input() item: string;
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private vehiculeService: VehiculeService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(fetchVehiculeDocuments());

    console.log(' vehicule tab document admin', this.item);
    // console.log('selectedTabIndex tab document admin', this.selectedTabIndex);
  }
  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.selectedTabIndex = this.selectedTabIndex + 1;
    this.selectedTabIndex = tabChangeEvent.index;
  }

  ajouterAssurance(vehicule) {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      disableClose: true,
      width: '831px',
      data: { vehicule },
    });
  }

  ajouterVignette(vehicule) {
    const dialogRef = this.dialog.open(vignette, {
      disableClose: true,
      width: '831px',
      data: { vehicule },
    });
  }

  ajouterCarte(vehicule) {
    const dialogRef = this.dialog.open(carte, {
      disableClose: true,
      width: '831px',
      data: { vehicule },
    });
  }

  ajouterVisite(vehicule) {
    const dialogRef = this.dialog.open(visite, {
      disableClose: true,
      width: '831px',
      data: { vehicule },
    });
  }

  ajouterAutorisation(vehicule) {
    const dialogRef = this.dialog.open(autorisation, {
      disableClose: true,
      width: '831px',
      data: { vehicule },
    });
  }

  ajouterCarnet(vehicule) {
    const dialogRef = this.dialog.open(tachygraphe, {
      disableClose: true,
      width: '831px',
      data: { vehicule },
    });
  }

  ajouterTaxe(vehicule) {
    const dialogRef = this.dialog.open(taxe, {
      disableClose: true,
      width: '831px',
      data: { vehicule },
    });
  }
}
