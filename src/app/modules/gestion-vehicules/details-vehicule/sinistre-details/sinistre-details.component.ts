import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import {
  selectEnvVehiculeSinistresPayload,
  selectEnvVehiculeSinistresIsLoading,
} from 'app/core/store/vehiculesinistre/vehiculesinistre.selectors';
import { environment } from 'environments/environment';
import { threadId } from 'worker_threads';
import { fetchVehiculeSinistres } from 'app/core/store/vehiculesinistre/vehiculesinistre.actions';
@Component({
  selector: 'app-sinistre-details',
  templateUrl: './sinistre-details.component.html',
  styleUrls: ['./sinistre-details.component.css']
})
export class SinistreDetailsComponent implements OnInit {
  url = environment.STORAGE + '/sinistre_vehicule/';
  urlName = 'sinistre_vehicule';
  type : any;
  id : any;
  sinistres: any;
  accidents: any;
  infractions: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialog: MatDialog,
  private store: Store<AppState>,
  public dialogRef: MatDialogRef<SinistreDetailsComponent>,
) { }

  ngOnInit(): void {
    this.type = this.data["type"];
    console.log("type", this.type)
    this.id = this.data["id"];
    console.log("id", this.id);

    this.store.select(selectEnvVehiculeSinistresPayload).subscribe((res) => {
      this.sinistres = res.filter((sinistre) => sinistre.truck_id == this.id);
      if(this.type == 'INFRACTION'){
        this.infractions = this.sinistres.filter( (infraction) => infraction.type == 'INFRACTION' );
        console.log("infraction", this.infractions)
      }else{
        this.accidents = this.sinistres.filter( (acccident) => acccident.type == 'ACCIDENT' );
        console.log("accident", this.accidents)
      }

    });
  }

  formatNumber(value) {
    // console.log("value", value)
    // console.log("123456789".toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "))
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

}
