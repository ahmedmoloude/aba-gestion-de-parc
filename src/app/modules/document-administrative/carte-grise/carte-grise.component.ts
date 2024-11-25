import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { VehiculeService } from 'app/core/services/vehicule.service';
import { AppState } from 'app/core/store/app.states';
import { deleteVehiculeDocuments } from 'app/core/store/vehiculedocument/vehiculedocument.actions';
import { selectEnvVehiculeDocumentPayload, selectEnvVehiculeDocumentIsLoading } from 'app/core/store/vehiculedocument/vehiculedocument.selectors';
import { environment } from 'environments/environment';
import Swal from 'sweetalert2';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-carte-grise',
  templateUrl: './carte-grise.component.html',
  styleUrls: ['./carte-grise.component.css']
})
export class CarteGriseComponent implements OnInit {
  headerColumuns = [
    'N° carte grise',
    'Date de début',
    'Date de fin',
    'N° de châssis',
    'Rappel (j)',
    'Document',
  ];
  spinner : boolean = false;
  vehicule: any;
  documents: any;
  carteGrises: any;
  url = environment.STORAGE + '/document_vehicule/';
  @Input() item : string;

  constructor(
    private store: Store<AppState>,
    private vehiculeService: VehiculeService,
    public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.store.select(selectEnvVehiculeDocumentPayload).subscribe((res) => {
      // console.log("documents", res)
      this.documents = res.filter(document => document.truck_id == this.item['id']);
      // console.log(" documents ========>", this.documents)

      this.carteGrises = this.documents.filter(c => c.type == "CARTE_GRISE");
      console.log(" carteGrises ========>", this.carteGrises)

    });

    this.store.select(selectEnvVehiculeDocumentIsLoading).subscribe((res) => {
      this.spinner = res;
    });
  }

  editTruckDocument(mode, item){
    const dialogRef = this.dialog.open(AddDialogComponent, {
      disableClose: true,
      width: '831px',
      data: { mode, item },
    });
  }

  deletTruckDocument(uuid) {
    console.log('delete');
    console.log(uuid);
    Swal.fire({
      title: 'Êtes-vous sûr(e) de vouloir supprimer Vehicule ?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.store.dispatch(deleteVehiculeDocuments({ uuid }));
      }
    });
  }


}
