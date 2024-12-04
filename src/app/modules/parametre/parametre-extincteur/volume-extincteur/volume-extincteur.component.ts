import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { selectEnvIsLoadingvolume, selectEnvPayloadvolume } from 'app/core/store/volume/volume.selectors';
import { DialogVolumeComponent } from './dialog-volume/dialog-volume.component';
import Swal from 'sweetalert2';
import { deletetypeExtincteur } from 'app/core/store/typeExtincteur/typeExtincteur.actions';
import { deletevolume } from 'app/core/store/volume/volume.actions';

@Component({
  selector: 'app-volume-extincteur',
  templateUrl: './volume-extincteur.component.html',
  styleUrls: ['./volume-extincteur.component.css'],
})
export class VolumeExtincteurComponent implements OnInit {
  headerColumuns = ['Volume (L)'];
  p: number = 1;
  volumes : any;
  spinner : boolean;

  constructor(private store: Store<AppState>,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.select(selectEnvPayloadvolume).subscribe((res) => {
      // console.log(" brand========>", res)
      this.volumes = res
    });

    this.store.select(selectEnvIsLoadingvolume).subscribe((res) => {
      // console.log(" spinner========>", res)
      this.spinner = res
    });
  }

  openDialogAjoutervolume(item, mode="add"): void {
    this.dialog.open(DialogVolumeComponent, {
      disableClose: true,
      width: '682px',
      data: { item, mode },
    });
  }

  delet(uuid){
    console.log("UUID", uuid)
    Swal.fire({
      title: "Êtes-vous sûr(e) de vouloir supprimer le volume ?",
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.store.dispatch(deletevolume({ uuid }));
      } else {
      }
    });
  }
}
