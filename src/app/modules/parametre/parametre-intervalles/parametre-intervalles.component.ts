import { IntervallesDialogComponent } from './intervalles-dialog/intervalles-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import {
  selectEnvPayloadLimitation,
  selectEnvIsLoadingLimitation,
} from 'app/core/store/limitation/limitation.selectors';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { deleteLimitation, fetchLimitation } from 'app/core/store/limitation/limitation.actions';
import { PermissionService } from 'app/core/services/permission.service';
@Component({
  selector: 'app-parametre-intervalles',
  templateUrl: './parametre-intervalles.component.html',
  styleUrls: ['./parametre-intervalles.component.css'],
})
export class ParametreIntervallesComponent implements OnInit {
  headerColumuns = ['Limitation sur', 'Valeur' , 'Type'];
  page: number = 1;
  limitations: any;
  limitationsFilter: any;
  spinner: boolean;
  filter: FormGroup;
  types = [
    { name: '_NB_BL', libelle: 'BL' },
    { name: '_NB_FA', libelle: 'Facture' },
    { name: '_REGL_M', libelle: 'Reglement' },
    { name: '_NB_COLIS', libelle: 'Colis' },
    { name: '_NB_POIDS', libelle: 'Poids' },
    { name: '_VOLUME', libelle: 'Volume' },
    { name: '_PS_TVA', libelle: 'PS TVA' },
    { name: '_ENC_TVA', libelle: 'Encombrement TVA' },
    { name : "STATEMENT", libelle : "Déclaration"},
    { name : "PHONE", libelle : "Téléphone"},
    { name : "AGENCY_CODE", libelle : "Code agence"},
    { name : "DECLARED_VALUE", libelle : "Val.Déc"},
    { name : "PS", libelle : "PS"},
    { name : "ENC", libelle : "Encombrement"}
  ];
  constructor(public dialog: MatDialog, private store: Store<AppState>,
    public permissionService: PermissionService) {}

  ngOnInit(): void {
    this.store.dispatch(fetchLimitation());
    this.setForm();
    this.store.select(selectEnvPayloadLimitation).subscribe((res) => {
      this.limitations = res;
      this.limitationsFilter = res;
      console.log(' limitations ========>', this.limitations);
    });

    this.store.select(selectEnvIsLoadingLimitation).subscribe((res) => {
      this.spinner = res;
    });
  }

  setForm() {
    this.filter = new FormGroup({
      type: new FormControl('', Validators.required),
    });
  }

  filterLimitation() {
    console.log('type', this.filter.get('type').value);
    this.limitations = this.limitationsFilter;
    if (!this.filter.get('type').value) {
      console.log('null value');
      return this.limitations;
    } else {
      console.log('existe value');
      this.limitations = this.limitationsFilter.filter(
        (limitation) => limitation.type == this.filter.get('type').value
      );
      return this.limitations;
    }
    // this.limitationsFilter = this.limitationsFilter.filter(limitation => limitation.type == this.filter.get("type").value);
    // return this.limitationsFilter;
  }

  convertStringToJson(objet: string) {
    var jsonObject: any = JSON.parse(objet);
    return jsonObject;
  }

  type(name: string) {
    var type = this.types.find((type) => type.name == name) ?? '';
    // console.log(type);
    return type;
  }

  openDialogAdd(limitation, type): void {
    const dialogRef = this.dialog.open(IntervallesDialogComponent, {
      disableClose: true,
      width: '538px',
      data: { limitation, type },
    });
    dialogRef.afterClosed().subscribe((v) =>{
      this.store.dispatch(fetchLimitation());
    })
  }

  deletLimitation(uuid) {
    console.log(uuid);
    Swal.fire({
      title: "Êtes-vous sûr(e) de vouloir supprimer L'intervalle de valeur ?",
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.store.dispatch(deleteLimitation({ uuid }));
      }
    });
  }

  filterArrayByKeyName(array1, array2, keyName) {
    return array1.filter(item1 => array2.some(item2 => item2[keyName] === item1[keyName]));
  }
}
