import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { ToastService } from 'app/core';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { addparc, updateparc } from 'app/core/store/parc/parc.actions';
import { MatDialogRef } from '@angular/material/dialog';
import { selectEnvparcIsLoading, selectEnvparcStatus } from 'app/core/store/parc/parc.selectors';

@Component({
  selector: 'app-dialog-parc',
  templateUrl: './dialog-parc.component.html',
  styleUrls: ['./dialog-parc.component.css']
})
export class DialogParcComponent implements OnInit {

  spinnerAdd :boolean = false;
  createParc : FormGroup;
  mode : any;
  item : any;
  form_btn : any;

  constructor(
    private store: Store<AppState>,
    private boGridService: BoGridService,
    private _toast: ToastService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogParcComponent>,
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
      this.createParc = new FormGroup({
        name: new FormControl("", Validators.required),
      })
    }else{
      this.form_btn = "Modifier"
      this.createParc = new FormGroup({
        name: new FormControl(this.item?.name, Validators.required),
      })
    }
  }

  addParc(){
    if(this.mode == "add"){
      this.store.dispatch(addparc({ data: this.createParc.value }));
    this.store.select(selectEnvparcIsLoading).subscribe((res) => {
      // console.log("spinner", res);
      this.spinnerAdd = res
    });
    this.store.select(selectEnvparcStatus).subscribe((res) => {
      // console.log("status", res);
      if(res == 'SUCCESS'){
        this.dialogRef.close();
      }
    });
    }else{
      this.store.dispatch(updateparc({ data: this.createParc.value, uuid: this.item.uuid }));
    this.store.select(selectEnvparcIsLoading).subscribe((res) => {
      // console.log("spinner", res);
      this.spinnerAdd = res
    });
    this.store.select(selectEnvparcStatus).subscribe((res) => {
      // console.log("status", res);
      if(res == 'SUCCESS'){
        this.dialogRef.close();
      }
    });
    }
  }
}
