import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { ToastService } from 'app/core';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { addtypeExtincteur, updatetypeExtincteur } from 'app/core/store/typeExtincteur/typeExtincteur.actions';
import { MatDialogRef } from '@angular/material/dialog';
import { selectEnvIsLoadingtypeExtincteur, selectEnvStatustypeExtincteur } from 'app/core/store/typeExtincteur/typeExtincteur.selectors';
@Component({
  selector: 'app-dialog-type',
  templateUrl: './dialog-type.component.html',
  styleUrls: ['./dialog-type.component.css']
})
export class DialogTypeComponent implements OnInit {
  spinnerAdd :boolean = false;
  createType : FormGroup;
  mode : any;
  item : any;
  form_btn : any;

  constructor(
    private store: Store<AppState>,
    private boGridService: BoGridService,
    private _toast: ToastService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogTypeComponent>,
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
      this.createType = new FormGroup({
        name: new FormControl("", Validators.required),
      })
    }else{
      this.form_btn = "Modifier"
      this.createType = new FormGroup({
        name: new FormControl(this.item.name, Validators.required),
      })
    }
  }

  addType(){
    // console.log(this.createBrand.value)
    if(this.mode == "add"){
      console.log("MODE AJOUt")
      this.store.dispatch(addtypeExtincteur({ data: this.createType.value }));
      this.store.select(selectEnvIsLoadingtypeExtincteur).subscribe((res) => {
        // console.log("spinner", res);
        this.spinnerAdd = res
      });
      this.store.select(selectEnvStatustypeExtincteur).subscribe((res) => {
        // console.log("status", res);
        if(res == 'SUCCESS'){
          this.dialogRef.close();
        }
      });
    }else{
      console.log("MODE EDIT")
      this.store.dispatch(updatetypeExtincteur({ data: this.createType.value, uuid: this.item.uuid }));
      this.store.select(selectEnvIsLoadingtypeExtincteur).subscribe((res) => {
        // console.log("spinner", res);
        this.spinnerAdd = res
      });
      this.store.select(selectEnvStatustypeExtincteur).subscribe((res) => {
        // console.log("status", res);
        if(res == 'SUCCESS'){
          this.dialogRef.close();
        }
      });
    }
    
  }

}
