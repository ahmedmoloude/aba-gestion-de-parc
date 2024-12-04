import { Component, OnInit,Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { FormBuilder, FormControl,FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'app/services';
import { createProductCategory, updateNatureProduct } from 'app/core/store/productcategory/productcategory.actions';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProduitDialogComponent } from '../../parametre-produit/produit-dialog/produit-dialog.component';
import { ExecOptions } from 'child_process';
import { selectNatureProduct } from 'app/core/store/productcategory/productcategory.selector';


@Component({
  selector: 'app-horsnormes-dialog',
  templateUrl: './horsnormes-dialog.component.html',
  styleUrls: ['./horsnormes-dialog.component.css']
})
export class HorsnormesDialogComponent implements OnInit {

   __Hors_norm : string = null;
   HorsNorm_Nature:FormGroup;
   image:string = null;
   file: any;
   __form_btn: string = null;
   __form_text: string = null;
 
  constructor(public dialogRef:MatDialogRef<ProduitDialogComponent>,private _toaster: ToastService,private store: Store<AppState>,@Inject(MAT_DIALOG_DATA) public data: any,public formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.__Hors_norm = "Hors Norme";
    this.__form_btn = "Ajouter";
    this.__form_text = "Ajouter un colis hors norms";
    this.file = null;
    this.setForm();
  }

  onSelectImage(event)
  {
    this.file  = (event.target as HTMLInputElement).files[0];
  }

  setForm(){

    if (Object.keys(this.data).length > 0) {
      this.__form_btn = "Modifier";
      this.__form_text = "Modifier un hors norme";
      this.HorsNorm_Nature = new FormGroup({
        type: new FormControl(this.data.type,Validators.required),
        title: new FormControl(this.data.title,Validators.required),
        image:new FormControl(this.data.image)
      });
      console.log(this.HorsNorm_Nature.value);
    }else {
      this.__form_btn = "Ajouter";
      this.__form_text = "Ajouter un hors norme";
      this.HorsNorm_Nature = new FormGroup({
        type: new FormControl('',Validators.required),
        title: new FormControl('',Validators.required),
        image: new FormControl('',Validators.required)
      });
    }

  }

  onSubmit(){
    if (this.HorsNorm_Nature.invalid) {
      this._toaster.warn('Certains champs ne sont pas definies !');
      return;
    }
    if (this.data.uuid) {
      const uuId = this.data.uuid;
      if(this.file == null){
        this.HorsNorm_Nature.removeControl('image');
        this.store.dispatch(updateNatureProduct({data: this.HorsNorm_Nature.value,uuid:uuId}));
        this.dialogRef.close();
      }else{
        let formData: any = new FormData()
        formData.append('type', this.HorsNorm_Nature.controls['type'].value)
        formData.append('title', this.HorsNorm_Nature.controls['title'].value)
        formData.append('image', this.file)
        this.store.dispatch(updateNatureProduct({data: formData,uuid:uuId}));
        this.dialogRef.close();
      }
    }
    else {
      let formData: any = new FormData();
      formData.append('type', this.HorsNorm_Nature.controls['type'].value)
      formData.append('title', this.HorsNorm_Nature.controls['title'].value)
      formData.append('image', this.file)
      this.store.dispatch(createProductCategory({ data: formData }));
      this.dialogRef.close();
    }

  }

}
