import { Component, OnInit,Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl,FormGroup, Validators } from '@angular/forms';
import { selectallproductcategory, selectNatureProduct, selectTypeIsLoading } from 'app/core/store/productcategory/productcategory.selector';
import { ToastService } from 'app/services';
import { createProductCategory, createProductCategorySuccess, fetchallProductCategoryType, updateNatureProduct } from 'app/core/store/productcategory/productcategory.actions';
import { findReadVarNames } from '@angular/compiler/src/output/output_ast';
interface Categorie {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-produit-dialog',
  templateUrl: './produit-dialog.component.html',
  styleUrls: ['./produit-dialog.component.css'],
})
export class ProduitDialogComponent implements OnInit {
  categories: Categorie[] = [
    { value: 'categorie-0', viewValue: 'categorie 1' },
    { value: 'categorie-1', viewValue: 'categorie 2' },
    { value: 'categorie-2', viewValue: 'categorie 3' },
  ];
  all_productcategory: any = [];
  natures:FormGroup;
  isLoading$ = this.store.select(selectTypeIsLoading);
  __form_btn: string = null;
  __form_text: string = null;
  __PALETTE : string = null;
  __COLIS: string = null;
  constructor(public dialogRef:MatDialogRef<ProduitDialogComponent>,public formBuilder: FormBuilder,private store: Store<AppState>,@Inject(MAT_DIALOG_DATA) public data: any,private _toaster: ToastService)
  {
    
  }

  ngOnInit(): void {

    this.initial();
    this.setForm();

  }

  setForm(){
    if (Object.keys(this.data).length > 0) {
      this.__form_btn = "Modifier";
      this.__form_text = "Modifier une nature de produit";
      this.natures = new FormGroup({
        type: new FormControl(this.data.type,Validators.required),
        title: new FormControl(this.data.title,Validators.required)
      });
    }else {
      this.__form_btn = "Ajouter";
      this.__form_text = "Ajouter une nature de produit";
      this.natures = new FormGroup({
        type: new FormControl('',Validators.required),
        title: new FormControl('',Validators.required)
      });
    }
  }

  initial()
  {
    this.__COLIS = "Colis";
    this.__PALETTE = "Palette";
    this.store
    .select(selectallproductcategory)
    .subscribe((res) => { this.all_productcategory = res,console.log(res,"pallete")});
  }

  onSubmit()
  {
    console.log("data", this.natures.value)
    // if (this.natures.invalid) {
    //   this._toaster.warn('Certains champs ne sont pas definies !')
    //   return;
    // }
    if (this.data.uuid) {
      const uuId = this.data.uuid;
      this.store.dispatch(updateNatureProduct({data: this.natures.value,uuid: uuId}));
      this.dialogRef.close();
      this.store.select(selectNatureProduct).subscribe((res) => { console.log(res) });
    }
    else {
      this.store.dispatch(createProductCategory({ data: this.natures.value }));
      this.dialogRef.close();
    }
  }


}
