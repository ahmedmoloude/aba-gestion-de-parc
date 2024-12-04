import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { selectEnvPayloadtypeExtincteur, selectEnvIsLoadingtypeExtincteur } from 'app/core/store/typeExtincteur/typeExtincteur.selectors';
import { DialogTypeComponent } from './dialog-type/dialog-type.component';
import Swal from 'sweetalert2';
import { deletevolume } from 'app/core/store/volume/volume.actions';
import { deletetypeExtincteur } from 'app/core/store/typeExtincteur/typeExtincteur.actions';

@Component({
  selector: 'app-type-extincteur',
  templateUrl: './type-extincteur.component.html',
  styleUrls: ['./type-extincteur.component.css'],
})
export class TypeExtincteurComponent implements OnInit {
  headerColumuns = ['Type'];
  p: number = 1;
  types : any;
  spinner : boolean;

  constructor(private store: Store<AppState>,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.select(selectEnvPayloadtypeExtincteur).subscribe((res) => {
      // console.log(" brand========>", res)
      this.types = res
    });

    this.store.select(selectEnvIsLoadingtypeExtincteur).subscribe((res) => {
      // console.log(" spinner========>", res)
      this.spinner = res
    });
  }

  openDialogAjoutertype(item, mode = "add"): void {
    this.dialog.open(DialogTypeComponent, {
      disableClose: true,
      width: '682px',
      data: { item, mode },
    });
  }

  delet(uuid){
    console.log("UUID", uuid)
    Swal.fire({
      title: "Êtes-vous sûr(e) de vouloir supprimer le type ?",
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.store.dispatch(deletetypeExtincteur({ uuid }));
      } else {
      }
    });
  }
}
