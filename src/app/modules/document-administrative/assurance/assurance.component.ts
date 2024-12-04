import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { VehiculeService } from 'app/core/services/vehicule.service';
import { AppState } from 'app/core/store/app.states';
import { deleteVehiculeDocuments } from 'app/core/store/vehiculedocument/vehiculedocument.actions';
import { selectEnvVehiculeDocumentPayload, selectEnvVehiculeDocumentIsLoading } from 'app/core/store/vehiculedocument/vehiculedocument.selectors';
import { environment } from 'environments/environment';
import Swal from 'sweetalert2';
import { AddDialogComponent } from 'app/modules/document-administrative/assurance/add-dialog/add-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-assurance',
  templateUrl: './assurance.component.html',
  styleUrls: ['./assurance.component.css']
})
export class AssuranceComponent implements OnInit {
  spinner : boolean = false;
  vehicule: any;
  documents: any;
  asurances: any;
  url = environment.STORAGE + '/document_vehicule/';
  @Input() item : string;
  headerColumuns = [
    'Ste d\'assurance',
    'Date de début',
    'Date de fin',
    'N° de police',
    'Montant ',
    'Rappel (j)',
    'Document',
  ];

  constructor(
    private store: Store<AppState>,
    private vehiculeService: VehiculeService,
    public dialog: MatDialog,) { }

  ngOnInit(): void {
    console.log("vehicule get", this.item)
    this.store.select(selectEnvVehiculeDocumentPayload).subscribe((res) => {
      // console.log("documents", res)
      this.documents = res.filter(document => document.truck_id == this.item['id']);
      // console.log(" documents ========>", this.documents)

      this.asurances = this.documents.filter(assurance => assurance.type == "ASSURANCE");
      console.log(" asurances ========>", this.asurances)

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

  formatNumber(value) {
    // console.log("value", value)
    // console.log("123456789".toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "))
    return value?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, " ") || '';
  }

}
