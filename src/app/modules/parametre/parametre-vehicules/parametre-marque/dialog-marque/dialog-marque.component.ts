import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { ToastService } from 'app/core';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { addbrand, updatebrand } from 'app/core/store/brand/brand.actions';
import { MatDialogRef } from '@angular/material/dialog';
import { selectEnvbrandStatus, selectEnvbrandIsLoading } from 'app/core/store/brand/brand.selectors';

@Component({
  selector: 'app-dialog-marque',
  templateUrl: './dialog-marque.component.html',
  styleUrls: ['./dialog-marque.component.css']
})
export class DialogMarqueComponent implements OnInit {
  spinnerAdd :boolean = false;
  createBrand : FormGroup;
  mode : any;
  item : any;
  file : any;
  form_btn : any;
  picture_name: string;
  image_src: string;
  display_img: boolean = false;

  constructor(
    private store: Store<AppState>,
    private boGridService: BoGridService,
    private _toast: ToastService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogMarqueComponent>,
  ) { }

  ngOnInit(): void {
    this.mode = this.data["mode"]
    this.item = this.data["item"]
    console.log("MODE", this.mode)
    console.log("ITEM", this.item)

    this.setForm();
  }

  onSelectImageBrand(fileInputEvent: any) {
    // this.file = (event.target as HTMLInputElement).files[0];
    this.file = fileInputEvent.target.files[0];
    this.picture_name = this.file.name;
    var reader = new FileReader();
    reader.readAsDataURL(fileInputEvent.target.files[0]);
    reader.onload = (event: any) => {
      this.image_src = event.target.result;
      this.display_img = true;
    };
  }

  setForm(){
    if(this.mode == "add"){
      this.form_btn = "Ajouter"
      this.createBrand = new FormGroup({
        name: new FormControl("", Validators.required),
      })
    }else{
      this.form_btn = "Modifier"
      this.createBrand = new FormGroup({
        name: new FormControl(this.item.name, Validators.required),
      })
    }
  }

  addBrand(){
    console.log("prestataire", this.createBrand.value)
    const formData = new FormData();
    for (var key in this.createBrand.value) {
      if (this.createBrand.value[key]) {
        formData.append(key, this.createBrand.value[key]);
      }
    }
    if (this.file) {
      formData.append('file', this.file);
    }
    if(this.mode == "add"){
      this.store.dispatch(addbrand({ data: formData }));
      this.store.select(selectEnvbrandIsLoading).subscribe((res) => {
        // console.log("spinner", res);
        this.spinnerAdd = res
      });
      this.store.select(selectEnvbrandStatus).subscribe((res) => {
        // console.log("status", res);
        if(res == 'SUCCESS'){
          this.dialogRef.close();
        }
      });
    }else{
      this.store.dispatch(updatebrand({ data: formData, uuid: this.item.uuid }));
      this.store.select(selectEnvbrandIsLoading).subscribe((res) => {
        // console.log("spinner", res);
        this.spinnerAdd = res
      });
      this.store.select(selectEnvbrandStatus).subscribe((res) => {
        // console.log("status", res);
        if(res == 'SUCCESS'){
          this.dialogRef.close();
        }
      });
    }
  }

}
