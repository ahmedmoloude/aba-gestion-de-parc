import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import {
  selectEnvVehiculeContratPayload,
  selectEnvVehiculeContratIsLoading,
} from 'app/core/store/vehiculecontrat/vehiculecontrat.selectors';
import { environment } from 'environments/environment';
import { DialogContratComponent } from './dialog-contrat/dialog-contrat.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { deleteVehiculeContrat, fetchVehiculeContrats } from 'app/core/store/vehiculecontrat/vehiculecontrat.actions';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-type-contrat',
  templateUrl: './type-contrat.component.html',
  styleUrls: ['./type-contrat.component.css'],
})
export class TypeContratComponent implements OnInit {
  spinner: boolean = false;
  vehicule: any;
  contrats: any;
  @Input()
  item: string;
  url = environment.STORAGE + '/contrat_vehicule/';
  constructor(private store: Store<AppState>, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(fetchVehiculeContrats());
    console.log(this.item, "item get ")
    console.log(this.item["id"], "item id get ")

    this.store.select(selectEnvVehiculeContratPayload).subscribe((res) => {
      // console.log("res", res)
      this.contrats = res.filter((contrat) => contrat.truck_id == this.item["id"]);
      // console.log(" contarts ========>", this.contrats)
    });

    this.store.select(selectEnvVehiculeContratIsLoading).subscribe((res) => {
      this.spinner = res;
      // console.log("selectEnvContratVehiculeIsLoading", res)
    });
  }

  ajoutercontrat(vehicule, item, type): void {
    const dialogRef = this.dialog.open(DialogContratComponent, {
      disableClose: true,
      width: '831px',
      data: { vehicule, item, type },
    });
  }

  delet(uuid){
    console.log('delete');
    console.log(uuid);
    Swal.fire({
      title: 'Êtes-vous sûr(e) de vouloir supprimer le contrat ?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.store.dispatch(deleteVehiculeContrat({ uuid }));
      }
    });
  }
}
