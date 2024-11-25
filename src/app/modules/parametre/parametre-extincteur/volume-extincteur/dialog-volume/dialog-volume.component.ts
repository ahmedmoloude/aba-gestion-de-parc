import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { ToastService } from 'app/core';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { addvolume, updatevolume } from 'app/core/store/volume/volume.actions';
import { MatDialogRef } from '@angular/material/dialog';
import { selectEnvIsLoadingvolume, selectEnvStatusvolume } from 'app/core/store/volume/volume.selectors';
@Component({
  selector: 'app-dialog-volume',
  templateUrl: './dialog-volume.component.html',
  styleUrls: ['./dialog-volume.component.css']
})
export class DialogVolumeComponent implements OnInit {
  spinnerAdd :boolean = false;
  createVolume : FormGroup;
  mode : any;
  item : any;
  form_btn : any;
  
  constructor(
    private store: Store<AppState>,
    private boGridService: BoGridService,
    private _toast: ToastService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogVolumeComponent>,
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
      this.createVolume = new FormGroup({
        name: new FormControl("", Validators.required),
      })
    }else{
      this.form_btn = "Modifier"
      this.createVolume = new FormGroup({
        name: new FormControl(this.item.name, Validators.required),
      })
    }
    
  }

  addVolume(){
    // console.log(this.createBrand.value)
    if(this.mode == "add"){
      console.log("MODE AJOUt")
      this.store.dispatch(addvolume({ data: this.createVolume.value }));
      this.store.select(selectEnvIsLoadingvolume).subscribe((res) => {
        // console.log("spinner", res);
        this.spinnerAdd = res
      });
      this.store.select(selectEnvStatusvolume).subscribe((res) => {
        // console.log("status", res);
        if(res == 'SUCCESS'){
          this.dialogRef.close();
        }
      });
    }else{
      console.log("MODE EDIT")
      this.store.dispatch(updatevolume({ data: this.createVolume.value , uuid: this.item.uuid}));
      this.store.select(selectEnvIsLoadingvolume).subscribe((res) => {
        // console.log("spinner", res);
        this.spinnerAdd = res
      });
      this.store.select(selectEnvStatusvolume).subscribe((res) => {
        // console.log("status", res);
        if(res == 'SUCCESS'){
          this.dialogRef.close();
        }
      });
    }
  }

}
