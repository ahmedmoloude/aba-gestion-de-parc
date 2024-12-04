import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { VehiculeService } from 'app/core/services/vehicule.service';
import { AppState } from 'app/core/store/app.states';
import { selectEnvprestatairePayload } from 'app/core/store/prestataire/prestataire.selectors';
import { AddPrestataireComponent } from '../add-prestataire/add-prestataire.component';
import Swal from 'sweetalert2';
import { deleteprestataire } from 'app/core/store/prestataire/prestataire.actions';
import { environment } from 'environments/environment';
@Component({
  selector: 'app-list-prestataire',
  templateUrl: './list-prestataire.component.html',
  styleUrls: ['./list-prestataire.component.css']
})
export class ListPrestataireComponent implements OnInit {
  p: number = 1;
  type : any;
  prestatires: any;
  spinner :boolean = false;
  url = environment.STORAGE + '/prestataire/';

  constructor(
            private route: ActivatedRoute,
            private store: Store<AppState>,
            private vehiculeService : VehiculeService,
            public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.type = this.route.snapshot.params.type;
    console.log('type', this.type);

    this.store.select(selectEnvprestatairePayload).subscribe((res) => {
      console.log(' prestatires ========>', res);
      // this.data = res;
      this.prestatires = res.filter(d => d.type == this.type)
      console.log('prestatires', this.prestatires);
    });
  }

  addDialog(type, mode="add", item): void {
    const dialogRef = this.dialog.open(AddPrestataireComponent, {
      disableClose: true,
      width: '500',
      data: { type, mode, item },
    });
  }

  delet(uuid){
    console.log("UUID", uuid)
    Swal.fire({
      title: "Êtes-vous sûr(e) de vouloir supprimer le prestataire ?",
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.store.dispatch(deleteprestataire({ uuid }));
      } else {
      }
    });
  }

}
