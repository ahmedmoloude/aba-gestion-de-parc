import { addExpenseNature, deleteExpenseNature, deleteExpenseSupplier } from './../../../core/store/caisse/expense/expense.actions';
import { selectEnvprestatairePayload, selectEnvprestataireIsLoading } from '../../../core/store/prestataire/prestataire.selectors';
import { AppState } from 'app/core/store/app.states';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { ToastService } from 'app/core';
import { Router } from '@angular/router';
import { VehiculeService } from '../../../core/services/vehicule.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { deleteprestataire } from 'app/core/store/prestataire/prestataire.actions';
import { DatePipe } from '@angular/common';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { PermissionService } from 'app/core/services/permission.service';
import { AddPrestataireDepenseComponent } from './add-prestataire-depense/add-prestataire-depense.component';
import { selectExpenseNatures, selectExpenseNaturesState, selectExpenseSuppliers, selectExpenseSuppliersState } from 'app/core/store/caisse/expense/expense.selectors';
import { StateEnum } from 'app/core/store/caisse/expense/expense.reducer';
import { loadExpenseNatures, loadExpenseSuppliers } from 'app/core/store/caisse/expense/expense.actions';
import { AddNatureDepenseComponent } from './add-nature-depense/add-nature-depense.component';

@Component({
  selector: 'app-parametre-prestataire-nature-depense',
  templateUrl: './parametre-prestataire-nature-depense.component.html',
  styleUrls: ['./parametre-prestataire-nature-depense.component.css']
})
export class ParametrePrestataireNatureDepenseComponent implements OnInit {

  data :any = [];
  fournisseurs :any = [];
  natures :any = [];

  naturesSpinner: boolean;
  suppliersSpinner: boolean;

  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog,
    private _router: Router,
    public datepipe: DatePipe,
    private _toast: ToastService,
    public permissionService: PermissionService ) {}

  ngOnInit(): void {
    this.store.dispatch(loadExpenseNatures());
    this.store.dispatch(loadExpenseSuppliers());

    this.store.select(selectExpenseNatures).subscribe((res) => {
      this.natures = res;
      console.log('Natures', this.natures);
    });

    this.store.select(selectExpenseSuppliers).subscribe((res) => {
      this.fournisseurs = res;
      console.log('fournisseurs', this.fournisseurs);
    });

    this.store.select(selectExpenseNaturesState).subscribe((res) => {
      console.log('spinner ========>', res);
      this.naturesSpinner = (res == StateEnum.LOADING );
    });
    this.store.select(selectExpenseSuppliersState).subscribe((res) => {
      console.log('spinner ========>', res);
      this.suppliersSpinner = (res == StateEnum.LOADING );
    });
  }

  addExpenseNature(mode="add", item): void {
    const dialogRef = this.dialog.open(AddNatureDepenseComponent, {
      disableClose: true,
      width: '500',
      data: {mode, item },
    });
  }

  addSupplier( mode="add", item) {
    const dialogRef = this.dialog.open(AddPrestataireDepenseComponent, {
      disableClose: true,
      width: '500',
      data: { mode, item },
    });
  }

  exportExcel( type = null ){
    const data = [];
    var prestataires = []

    this.store.select(selectEnvprestatairePayload).subscribe((res) => {
      console.log(' prestataires ========>', res);
      if(type){
        prestataires = res.filter(d => d.type == type)
        console.log('prestataires', prestataires);
      }else{
        prestataires = res;
        console.log('prestataires', prestataires);
      }

      for (var i = 0; i < prestataires.length; i++) {
        let prestataire = prestataires[i];
        // console.log("DATE FORMAT ", this.datepipe.transform(vehicule.created_at, 'yyyy-MM-dd'))
        let object = {
          Date_création: this.datepipe.transform(prestataire.created_at, 'dd/MM/yyy'),
          Nom: prestataire.name,
          Type: prestataire.type,
        };
        data.push(object);
      }
      console.log('data', data);
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
      const wb: XLSX.WorkBook = {
        Sheets: { data: ws },
        SheetNames: ['data'],
      };
      const excelBuffer: any = XLSX.write(wb, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveExcelFile(excelBuffer, 'prestataires');
    });
  }

  saveExcelFile(buffer: any, fileName: string): void {
    const EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';

    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    saveAs.saveAs(data, fileName + EXCEL_EXTENSION);
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

  deleteSupplier(uuid){
    console.log("UUID", uuid)
    Swal.fire({
      title: "Êtes-vous sûr(e) de vouloir supprimer ce fournisseur ?",
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.store.dispatch(deleteExpenseSupplier({ data: uuid }));
      }
    });
  }


  deleteExpenseNature(uuid){
    console.log("UUID", uuid)
    Swal.fire({
      title: "Êtes-vous sûr(e) de vouloir supprimer cette nature de dépense?",
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.store.dispatch(deleteExpenseNature({ data:uuid }));
      } else {
      }
    });
  }

  detailsDoc(type) {
    this._router.navigate([`listprestataire/${type}`]);
  }
}
