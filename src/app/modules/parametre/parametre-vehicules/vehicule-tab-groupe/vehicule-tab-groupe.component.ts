import { DialogParcComponent } from './../dialog-parc/dialog-parc.component';
import { selectEnvparcPayload } from 'app/core/store/parc/parc.selectors';
import { DialogTonnageComponent } from './../parametre-tonnage/dialog-tonnage/dialog-tonnage.component';
import { DialogTypeComponent } from './../parametre-type/dialog-type/dialog-type.component';
import { DialogCategorieComponent } from './../parametre-categorie/dialog-categorie/dialog-categorie.component';
import { DialogModeleComponent } from './../parametre-modele/dialog-modele/dialog-modele.component';
import { DialogMarqueComponent } from './../parametre-marque/dialog-marque/dialog-marque.component';
import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { selectEnvmodelePayload, selectEnvmodeleIsLoading } from 'app/core/store/modele/modele.selectors';
import { selectEnvbrandPayload, selectEnvbrandIsLoading } from 'app/core/store/brand/brand.selectors';
import { selectEnvtruckCategoryPayload, selectEnvtruckCategoryIsLoading } from 'app/core/store/truckCategory/truckCategory.selectors';
import { selectEnvtonnagePayload, selectEnvtonnageIsLoading } from 'app/core/store/tonnage/tonnage.selectors';
import { selectEnvtruckTypeIsLoading, selectEnvtruckTypePayload } from 'app/core/store/truckType/truckType.selectors';
import { DialogGammeComponent } from '../dialog-gamme/dialog-gamme.component';
import { selectEnvgammePayload } from 'app/core/store/gamme/gamme.selectors';
import Swal from 'sweetalert2';
import { deletetonnage } from 'app/core/store/tonnage/tonnage.actions';
import { deletebrand } from 'app/core/store/brand/brand.actions';
import { deletemodele } from 'app/core/store/modele/modele.actions';
import { deletetruckCategory } from 'app/core/store/truckCategory/truckCategory.actions';
import { deletetruckType } from 'app/core/store/truckType/truckType.actions';
import { deleteparc } from 'app/core/store/parc/parc.actions';
import { deletegamme } from 'app/core/store/gamme/gamme.actions';
import { environment } from 'environments/environment';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { DatePipe } from '@angular/common';
import { PermissionService } from 'app/core/services/permission.service';
@Component({
  selector: 'app-vehicule-tab-groupe',
  templateUrl: './vehicule-tab-groupe.component.html',
  styleUrls: ['./vehicule-tab-groupe.component.css'],
})
export class VehiculeTabGroupeComponent implements OnInit {
  selectedTabIndex = 0;
  brands : any;
  modeles : any;
  categories : any;
  tonnages :any;
  types : any;
  parcs : any;
  gammes : any;
  spinner : boolean;
  url = environment.STORAGE + '/brand/';
  constructor(public dialog: MatDialog,
              private store: Store<AppState>,
              public datepipe: DatePipe,
              public permissionService: PermissionService) {}

  ngOnInit(): void {
    this.store.select(selectEnvbrandPayload).subscribe((res) => {
      // console.log(" brand========>", res)
      this.brands = res
    });

    this.store.select(selectEnvmodelePayload).subscribe((res) => {
      // console.log(" brand========>", res)
      this.modeles = res
    });

    this.store.select(selectEnvtruckCategoryPayload).subscribe((res) => {
      // console.log(" brand========>", res)
      this.categories = res
    });

    this.store.select(selectEnvtonnagePayload).subscribe((res) => {
      // console.log(" brand========>", res)
      this.tonnages = res
    });

    this.store.select(selectEnvtonnageIsLoading).subscribe((res) => {
      // console.log(" spinner========>", res)
      this.spinner = res
    });

    this.store.select(selectEnvtruckTypePayload).subscribe((res) => {
      // console.log(" brand========>", res)
      this.types = res
    });

    this.store.select(selectEnvparcPayload).subscribe((res) => {
      console.log(" parc========>", res)
      this.parcs = res
    });

    this.store.select(selectEnvgammePayload).subscribe((res) => {
      console.log(" gammes========>", res)
      this.gammes = res
    });
  }


  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.selectedTabIndex = this.selectedTabIndex + 1;
    this.selectedTabIndex = tabChangeEvent.index;
  }
  openDialogAjoutermarque(item, mode="add"): void {
    this.dialog.open(DialogMarqueComponent, {
      disableClose: true,
      width: '682px',
      data: { item, mode },
    });
  }
  openDialogAjoutermodele(item, mode="add"): void {
    this.dialog.open(DialogModeleComponent, {
      disableClose: true,
      width: '682px',
      data: { item, mode },
    });
  }
  openDialogAjoutercategorie(item, mode="add"): void {
    this.dialog.open(DialogCategorieComponent, {
      disableClose: true,
      width: '682px',
      data: { item, mode },
    });
  }
  openDialogAjoutertype(item, mode="add"): void {
    this.dialog.open(DialogTypeComponent, {
      disableClose: true,
      width: '682px',
      data: { item, mode },
    });
  }
  openDialogAjoutertonnage(item, mode="add"): void {
    this.dialog.open(DialogTonnageComponent, {
      disableClose: true,
      width: '682px',
      data: { item, mode },
    });
  }

  openDialogAjouterparc(item, mode="add"): void {
    this.dialog.open(DialogParcComponent, {
      disableClose: true,
      width: '682px',
      data: { item, mode },
    });
  }

  openDialogAjoutergamme(item, mode="add"): void {
    this.dialog.open(DialogGammeComponent, {
      disableClose: true,
      width: '682px',
      data: { item, mode },
    });
  }

  deletTonnage(uuid){
    console.log("UUID", uuid)
    Swal.fire({
      title: "Êtes-vous sûr(e) de vouloir supprimer le tonnage ?",
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.store.dispatch(deletetonnage({ uuid }));
      } else {
      }
    });
  }

  deletMarque(uuid){
    console.log("UUID", uuid)
    Swal.fire({
      title: "Êtes-vous sûr(e) de vouloir supprimer la marque ?",
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.store.dispatch(deletebrand({ uuid }));
      } else {
      }
    });
  }

  deletModele(uuid){
    console.log("UUID", uuid)
    Swal.fire({
      title: "Êtes-vous sûr(e) de vouloir supprimer le modéle ?",
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.store.dispatch(deletemodele({ uuid }));
      } else {
      }
    });
  }

  deletCategorie(uuid){
    console.log("UUID", uuid)
    Swal.fire({
      title: "Êtes-vous sûr(e) de vouloir supprimer la catégorie ?",
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.store.dispatch(deletetruckCategory({ uuid }));
      } else {
      }
    });
  }

  deletType(uuid){
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
        this.store.dispatch(deletetruckType({ uuid }));
      } else {
      }
    });
  }

  deletParc(uuid){
    console.log("UUID", uuid)
    Swal.fire({
      title: "Êtes-vous sûr(e) de vouloir supprimer le parc ?",
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.store.dispatch(deleteparc({ uuid }));
      } else {
      }
    });
  }

  deletGamme(uuid){
    console.log("UUID", uuid)
    Swal.fire({
      title: "Êtes-vous sûr(e) de vouloir supprimer la gamme ?",
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.store.dispatch(deletegamme({ uuid }));
      } else {
      }
    });
  }

  exportExcelMarque(){
    const data = [];
    for (var i = 0; i < this.brands.length; i++) {
      let brand = this.brands[i];
      let object = {
        Date_création: this.datepipe.transform(brand.created_at, 'dd/MM/yyy'),
        Nom: brand.name,
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
    this.saveExcelFile(excelBuffer, 'Marques');
  }

  exportExcelModele(){
    const data = [];
    for (var i = 0; i < this.modeles.length; i++) {
      let modele = this.modeles[i];
      let object = {
        Date_création: this.datepipe.transform(modele.created_at, 'dd/MM/yyy'),
        Nom: modele.name,
        Marque: modele.brand?.name
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
    this.saveExcelFile(excelBuffer, 'Modeles');
  }

  exportExcelCategorie(){
    const data = [];
    for (var i = 0; i < this.categories.length; i++) {
      let categorie = this.categories[i];
      let object = {
        Date_création: this.datepipe.transform(categorie.created_at, 'dd/MM/yyy'),
        Nom: categorie.name,
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
    this.saveExcelFile(excelBuffer, 'Categories');
  }

  exportExcelType(){
    const data = [];
    for (var i = 0; i < this.types.length; i++) {
      let type = this.types[i];
      let object = {
        Date_création: this.datepipe.transform(type.created_at, 'dd/MM/yyy'),
        Nom: type.name,
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
    this.saveExcelFile(excelBuffer, 'Types');
  }

  exportExcelTonnage(){
    const data = [];
    for (var i = 0; i < this.tonnages.length; i++) {
      let tonnage = this.tonnages[i];
      let object = {
        Date_création: this.datepipe.transform(tonnage.created_at, 'dd/MM/yyy'),
        Nom: tonnage.name + 'T',
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
    this.saveExcelFile(excelBuffer, 'Tonnage');
  }

  exportExcelParc(){
    const data = [];
    for (var i = 0; i < this.parcs.length; i++) {
      let parc = this.parcs[i];
      let object = {
        Date_création: this.datepipe.transform(parc.created_at, 'dd/MM/yyy'),
        Nom: parc.name,
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
    this.saveExcelFile(excelBuffer, 'Parcs');
  }

  exportExcelGamme(){
    const data = [];
    for (var i = 0; i < this.gammes.length; i++) {
      let gamme = this.gammes[i];
      let object = {
        Date_création: this.datepipe.transform(gamme.created_at, 'dd/MM/yyy'),
        Nom: gamme.name,
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
    this.saveExcelFile(excelBuffer, 'Gammes');
  }

  saveExcelFile(buffer: any, fileName: string): void {
    const EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';

    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    saveAs.saveAs(data, fileName + EXCEL_EXTENSION);
  }
}
