import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ToastService } from './../../../core';
import { MatDialog } from '@angular/material/dialog';
import { AgenceDialogComponent } from './agence-dialog/agence-dialog.component';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import {
  selectEnvPayloadAgence,
  selectEnvIsLoadingAgence,
} from 'app/core/store/agence/agence.selectors';
import { deleteAgence } from 'app/core/store/agence/agence.actions';
import { selectAllCity } from 'app/core/store/resources/resources.selectors';
import { PermissionService } from 'app/core/services/permission.service';
@Component({
  selector: 'app-parametre-agence',
  templateUrl: './parametre-agence.component.html',
  styleUrls: ['./parametre-agence.component.css'],
})
export class ParametreAgenceComponent implements OnInit {
  headerColumuns = ['Ville', 'Nom', 'Adresse'];
  page: number = 1;
  agences: any;
  agencesFilter: any;
  spinnergetAgence: boolean = false;
  filter: FormGroup;
  cities: any;
  spinnerCity: boolean = false;
  constructor(
    private store: Store<AppState>,
    private _toast: ToastService,
    public dialog: MatDialog,
    public permissionService: PermissionService
  ) {}

  ngOnInit(): void {
    this.setForm();
    this.store.select(selectAllCity).subscribe((res) => {
      this.cities = res;
      console.log(' cities========>', this.cities);
    });

    this.store.select(selectEnvPayloadAgence).subscribe((res) => {
      this.agences = res;
      this.agencesFilter = res;
      console.log(' agence========>', this.agences);
    });

    this.store.select(selectEnvIsLoadingAgence).subscribe((res) => {
      this.spinnergetAgence = res;
    });
  }

  setForm() {
    this.filter = new FormGroup({
      ville: new FormControl('', Validators.required),
      nom: new FormControl('', Validators.required),
    });
  }

  filterAgence() {
    this.agences = this.agencesFilter;
    console.log('ville', this.filter.get('ville').value);
    console.log('nom', this.filter.get('nom').value);
    console.log('axe', this.agences);
    if (this.filter.get('ville').value) {
      this.agences = this.agences.filter(
        (agence) => agence.city_id == this.filter.get('ville').value
      );
    }
    if (this.filter.get('nom').value) {
      this.agences = this.agences.filter(
        (agence) =>
          agence.name.toLowerCase() ==
          this.filter.get('nom').value.toLowerCase()
      );
    }
    if (!this.filter.get('ville').value && !this.filter.get('nom').value) {
      return this.agencesFilter;
    }
    return this.agences;
  }

  openDialogDetails(type): void {
    const dialogRef = this.dialog.open(AgenceDialogComponent, {
      disableClose: true,
      width: '863px',
      data: { type },
    });
  }

  openDialogEdit(agence, type): void {
    const dialogRef = this.dialog.open(AgenceDialogComponent, {
      disableClose: true,
      width: '863px',
      data: { agence, type },
    });
  }

  deletAgence(uuid) {
    console.log(uuid);
    Swal.fire({
      title: "Êtes-vous sûr(e) de vouloir supprimer L'agence ?",
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.store.dispatch(deleteAgence({ uuid }));
      } else {
      }
    });
  }
}
