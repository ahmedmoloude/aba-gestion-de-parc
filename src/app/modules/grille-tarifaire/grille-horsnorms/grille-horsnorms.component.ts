import { Component, OnInit, Input } from '@angular/core';
import { HorsnomsDialogComponent } from './horsnoms-dialog/horsnoms-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { deleteGridhorsnorm } from 'app/core/store/grids/grids.actions';
import { selectGridIsLoading } from 'app/core/store/grids/grids.selectors';

@Component({
  selector: 'app-grille-horsnorms',
  templateUrl: './grille-horsnorms.component.html',
  styleUrls: ['./grille-horsnorms.component.css'],
})
export class GrilleHorsnormsComponent implements OnInit {
  @Input() grill_horsnorms: any[];
  headerColumuns = ['Label', 'Valeur'];
  __show: boolean = false;
  filter: any[];
  page: number = 1;
  isLoading$ = this.store.select(selectGridIsLoading);
  constructor(private store: Store<AppState>, public dialog: MatDialog) {}

  ngOnInit() {}

  openDialog(): void {
    this.dialog.open(HorsnomsDialogComponent, {
      disableClose: true,
      width: '831px',
      data: {},
    });
  }

  openHorsnormsupdate(item: any) {
    this.dialog.open(HorsnomsDialogComponent, {
      disableClose: true,
      width: '831px',
      data: {
        product_id: item.categorie_produit.id,
        price: item.calcul_val,
        uuid: item.uuid,
      },
    });
  }

  delete(uuid: string) {
    this.store.dispatch(deleteGridhorsnorm({ uuid }));
  }
}
