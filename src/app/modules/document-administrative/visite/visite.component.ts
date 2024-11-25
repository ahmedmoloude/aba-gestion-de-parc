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
  selector: 'app-visite',
  templateUrl: './visite.component.html',
  styleUrls: ['./visite.component.css']
})
export class VisiteComponent implements OnInit {
  headerColumuns = [
    'Dernière visite',
    'Prochaine visite technique',
    'Ville',
    'Prestataire',
    'Montant ',
    'Rappel (j)',
    'Document',
  ];
  spinner : boolean = false;
  vehicule: any;
  documents: any;
  visites: any;
  url = environment.STORAGE + '/document_vehicule/';
  @Input() item : string;

  constructor(private store: Store<AppState>,
    public dialog: MatDialog,
    private vehiculeService: VehiculeService,) { }

  ngOnInit(): void {
    this.store.select(selectEnvVehiculeDocumentPayload).subscribe((res) => {
      // console.log("documents", res)
      this.documents = res.filter(document => document.truck_id == this.item['id']);
      // console.log(" documents ========>", this.documents)

      this.visites = this.documents.filter(v => v.type == "VISITE_TECHNIQUE");
      console.log(" visites ========>", this.visites)

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

  formatNumber(value) {
    return value?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, " ") || '';
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