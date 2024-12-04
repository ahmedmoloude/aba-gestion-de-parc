import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { ToastService } from 'app/core';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { addtruckCategory, updatetruckCategory } from 'app/core/store/truckCategory/truckCategory.actions';
import { MatDialogRef } from '@angular/material/dialog';
import { selectEnvtruckCategoryIsLoading, selectEnvtruckCategoryStatus } from 'app/core/store/truckCategory/truckCategory.selectors';

@Component({
  selector: 'app-dialog-categorie',
  templateUrl: './dialog-categorie.component.html',
  styleUrls: ['./dialog-categorie.component.css']
})
export class DialogCategorieComponent implements OnInit {
  spinnerAdd :boolean = false;
  createCategory : FormGroup;
  mode : any;
  item : any;
  form_btn : any;

  constructor(
    private store: Store<AppState>,
    private boGridService: BoGridService,
    private _toast: ToastService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogCategorieComponent>,
  ) { }

  ngOnInit(): void {
    this.mode = this.data["mode"]
    this.item = this.data["item"]
    console.log("MODE", this.mode)
    console.log("ITEM", this.item)

    this.setForm();
  }

  setForm(){
    if(this.mode == "add"){
      this.form_btn = "Ajouter"
      this.createCategory = new FormGroup({
        name: new FormControl("", Validators.required),
      })
    }else{
      this.form_btn = "Modifier"
      this.createCategory = new FormGroup({
        name: new FormControl(this.item?.name, Validators.required),
      })
    }
    
  }

  addCategory(){
    if(this.mode == "add"){
      this.store.dispatch(addtruckCategory({ data: this.createCategory.value }));
      this.store.select(selectEnvtruckCategoryIsLoading).subscribe((res) => {
        // console.log("spinner", res);
        this.spinnerAdd = res
      });
      this.store.select(selectEnvtruckCategoryStatus).subscribe((res) => {
        // console.log("status", res);
        if(res == 'SUCCESS'){
          this.dialogRef.close();
        }
      });
    }else{
      this.store.dispatch(updatetruckCategory({ data: this.createCategory.value, uuid: this.item.uuid }));
      this.store.select(selectEnvtruckCategoryIsLoading).subscribe((res) => {
        // console.log("spinner", res);
        this.spinnerAdd = res
      });
      this.store.select(selectEnvtruckCategoryStatus).subscribe((res) => {
        // console.log("status", res);
        if(res == 'SUCCESS'){
          this.dialogRef.close();
        }
      });
    }
  }
}
