import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { ToastService } from 'app/core';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { addmodele, updatemodele } from 'app/core/store/modele/modele.actions';
import { MatDialogRef } from '@angular/material/dialog';
import { selectEnvmodeleStatus, selectEnvmodeleIsLoading } from 'app/core/store/modele/modele.selectors';
import { selectEnvbrandPayload, selectEnvbrandIsLoading } from 'app/core/store/brand/brand.selectors';

@Component({
  selector: 'app-dialog-modele',
  templateUrl: './dialog-modele.component.html',
  styleUrls: ['./dialog-modele.component.css']
})
export class DialogModeleComponent implements OnInit {
  spinnerAdd :boolean = false;
  createModele : FormGroup;
  brands :any;
  mode : any;
  item : any;
  form_btn : any;
  
  constructor(
    private store: Store<AppState>,
    private boGridService: BoGridService,
    private _toast: ToastService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogModeleComponent>,
  ) { }

  ngOnInit(): void {
    this.mode = this.data["mode"]
    this.item = this.data["item"]
    console.log("MODE", this.mode)
    console.log("ITEM", this.item)

    this.store.select(selectEnvbrandPayload).subscribe((res) => {  
      console.log(" brand========>", res)
      this.brands = res
    });
    this.setForm();
  }

  
  setForm(){
    if(this.mode == "add"){
      this.form_btn = "Ajouter"
      this.createModele = new FormGroup({
        name: new FormControl("", Validators.required),
        brand_id: new FormControl("", Validators.required),
      })
    }else{
      this.form_btn = "Modifier"
      this.createModele = new FormGroup({
        name: new FormControl(this.item?.name, Validators.required),
        brand_id: new FormControl(this.item?.brand_id, Validators.required),
      })
    }
  }

  addModele(){
    if(this.mode == "add"){
      this.store.dispatch(addmodele({ data: this.createModele.value }));
      this.store.select(selectEnvmodeleIsLoading).subscribe((res) => {
        // console.log("spinner", res);
        this.spinnerAdd = res
      });
      this.store.select(selectEnvmodeleStatus).subscribe((res) => {
        // console.log("status", res);
        if(res == 'SUCCESS'){
          this.dialogRef.close();
        }
      });
    }else{
      this.store.dispatch(updatemodele({ data: this.createModele.value, uuid: this.item.uuid }));
      this.store.select(selectEnvmodeleIsLoading).subscribe((res) => {
        // console.log("spinner", res);
        this.spinnerAdd = res
      });
      this.store.select(selectEnvmodeleStatus).subscribe((res) => {
        // console.log("status", res);
        if(res == 'SUCCESS'){
          this.dialogRef.close();
        }
      });
    }
  }

}
