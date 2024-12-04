import { RecapitulatifDialogComponent } from './recapitulatif-dialog/recapitulatif-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { ToastService } from './../../../core';
import { AddAxeComponent } from './add-axe/add-axe.component';
import { EditAxeComponent } from './edit-axe/edit-axe.component';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import {
  selectEnvPayloadAxe,
  selectEnvIsLoadingAxe,
} from 'app/core/store/axe/axe.selectors';
import { selectAllCity } from 'app/core/store/resources/resources.selectors';
import { PermissionService } from 'app/core/services/permission.service';
@Component({
  selector: 'app-parametre-axe',
  templateUrl: './parametre-axe.component.html',
  styleUrls: ['./parametre-axe.component.css'],
})
export class ParametreAxeComponent implements OnInit {
  axe = [0, 1];
  axes = [];
  axesFilter = [];
  cities: any;
  spinner: boolean = false;
  spinnerCity: boolean = false;
  page: number = 1;
  filter: FormGroup;
  constructor(
    private store: Store<AppState>,
    private boGridService: BoGridService,
    private _toast: ToastService,
    public dialog: MatDialog,
    public permissionService: PermissionService
  ) {}

  ngOnInit(): void {
    this.spinner = true;
    this.setForm();
    this.store.select(selectAllCity).subscribe((res) => {
      this.cities = res;
      // console.log(' cities========>', this.cities);
    });

    this.store.select(selectEnvPayloadAxe).subscribe((res) => {
      this.axes = res;
      this.axesFilter = res;
      // console.log(' axe ========>', this.axes);
    });

    this.store.select(selectEnvIsLoadingAxe).subscribe((res) => {
      this.spinner = res;
    });

    // this.boGridService.getAllAxe().subscribe((data) => {
    //     this.axes = data['response'];
    //     this.axesFilter = data['response'];
    //     console.log(this.axes);
    //     this.spinner = false;
    //   },(error) => {
    //     this._toast.error(
    //       'Une erreur est survenue lors de la récupération des axes !'
    //     );
    //     console.log('error', error);
    //   });
  }

  setForm() {
    this.filter = new FormGroup({
      depart_id: new FormControl('', Validators.required),
      destination_id: new FormControl('', Validators.required),
    });
  }

  filterAxe() {
    this.axes = this.axesFilter;
    console.log('depart_id', this.filter.get('depart_id').value);
    console.log('destination_id', this.filter.get('destination_id').value);
    console.log('axe', this.axes);
    if (this.filter.get('depart_id').value) {
      this.axes = this.axes.filter(
        (axe) =>
          axe.passage['0'].pivot.city_id == this.filter.get('depart_id').value
      );
    }
    if (this.filter.get('destination_id').value) {
      this.axes = this.axes.filter(
        (axe) =>
          axe.passage[axe.passage.length - 1].pivot.city_id ==
          this.filter.get('destination_id').value
      );
    }
    if (
      !this.filter.get('depart_id').value &&
      !this.filter.get('destination_id').value
    ) {
      return this.axesFilter;
    }
    return this.axes;
  }

  openDialogAdd(): void {
    const dialogRef = this.dialog.open(AddAxeComponent, {
      disableClose: true,
      width: '800px',
      data: {},
    });
  }

  openDialogrecapitulatif(item, type): void {
    const dialogRef = this.dialog.open(RecapitulatifDialogComponent, {
      disableClose: true,
      width: '830px',
      data: { item, type: 'details' },
    });
  }

  openDialogEdit(item) {
    const dialogRef = this.dialog.open(EditAxeComponent, {
      disableClose: true,
      width: '830px',
      data: { item },
    });
  }
}
