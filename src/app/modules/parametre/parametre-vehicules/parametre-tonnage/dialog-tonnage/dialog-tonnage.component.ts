import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { ToastService } from 'app/core';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { addtonnage, updatetonnage } from 'app/core/store/tonnage/tonnage.actions';
import { MatDialogRef } from '@angular/material/dialog';
import { selectEnvtonnageStatus, selectEnvtonnageIsLoading } from 'app/core/store/tonnage/tonnage.selectors';

@Component({
  selector: 'app-dialog-tonnage',
  templateUrl: './dialog-tonnage.component.html',
  styleUrls: ['./dialog-tonnage.component.css']
})
export class DialogTonnageComponent implements OnInit {
  spinnerAdd :boolean = false;
  createTonnage : FormGroup;
  mode : any;
  item : any;
  form_btn : any;

  constructor(
    private store: Store<AppState>,
    private boGridService: BoGridService,
    private _toast: ToastService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogTonnageComponent>,
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
      this.createTonnage = new FormGroup({
        name: new FormControl("", Validators.required),
      })
    }else{
      this.form_btn = "Modifier"
      this.createTonnage = new FormGroup({
        name: new FormControl(this.item?.name, Validators.required),
      })
    }
  }

  addTonnage(){
    if(this.mode == "add"){
      this.store.dispatch(addtonnage({ data: this.createTonnage.value }));
      this.store.select(selectEnvtonnageIsLoading).subscribe((res) => {
        // console.log("spinner", res);
        this.spinnerAdd = res
      });
      this.store.select(selectEnvtonnageStatus).subscribe((res) => {
        // console.log("status", res);
        if(res == 'SUCCESS'){
          this.dialogRef.close();
        }
      });
    }
    else{
      this.store.dispatch(updatetonnage({ data: this.createTonnage.value, uuid: this.item.uuid }));
      this.store.select(selectEnvtonnageIsLoading).subscribe((res) => {
        // console.log("spinner", res);
        this.spinnerAdd = res
      });
      this.store.select(selectEnvtonnageStatus).subscribe((res) => {
        // console.log("status", res);
        if(res == 'SUCCESS'){
          this.dialogRef.close();
        }
      });
    }
  }

}
