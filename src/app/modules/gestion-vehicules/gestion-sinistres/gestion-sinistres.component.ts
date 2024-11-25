import { VoirPlusComponent } from './voir-plus/voir-plus.component';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { fetchVehiculeSinistres } from 'app/core/store/vehiculesinistre/vehiculesinistre.actions';
import {
  selectEnvVehiculeSinistresPayload,
  selectEnvVehiculeSinistresIsLoading,
} from 'app/core/store/vehiculesinistre/vehiculesinistre.selectors';
import { environment } from 'environments/environment';
@Component({
  selector: 'app-gestion-sinistres',
  templateUrl: './gestion-sinistres.component.html',
  styleUrls: ['./gestion-sinistres.component.css'],
})
export class GestionSinistresComponent implements OnInit {
  spinner: boolean = false;
  vehicule: any;
  sinistres: any;
  accidents: any;
  infractions: any;
  @Input()
  item: string;
  url = environment.STORAGE + '/sinistre_vehicule/';
  constructor(private store: Store<AppState>, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(fetchVehiculeSinistres());
    console.log(this.item, "truck get ")

    this.store.select(selectEnvVehiculeSinistresPayload).subscribe((res) => {
      this.sinistres = res.filter((sinistre) => sinistre.truck_id == this.item["id"]);
      this.accidents = this.sinistres.filter(
        (acccident) => acccident.type == 'ACCIDENT'
      );
      this.infractions = this.sinistres.filter(
        (infraction) => infraction.type == 'INFRACTION'
      );
    });

    this.store.select(selectEnvVehiculeSinistresIsLoading).subscribe((res) => {
      this.spinner = res;
    });
  }
  Voirplus(type, id): void {
    this.dialog.open(VoirPlusComponent, {
      disableClose: true,
      width: '782px',
      height: '100vh',
      data: { type, id },
      position: { right: '0px' },
    });
  }

  formatNumber(value) {
    // console.log("value", value)
    // console.log("123456789".toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "))
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
}
