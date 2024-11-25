import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VehiculeService } from 'app/core/services/vehicule.service';
import { ToastService } from 'app/core';

@Component({
  selector: 'app-jaugeage-dialog',
  templateUrl: './jaugeage-dialog.component.html',
  styleUrls: ['./jaugeage-dialog.component.css']
})
export class JaugeageDialogComponent implements OnInit {

  id : any;
  createJaugeage : FormGroup;
  spinner : boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private store: Store<AppState>,
  public dialog: MatDialog,
  public vehiculeService : VehiculeService,
  public dialogRef: MatDialogRef<JaugeageDialogComponent>,
  private _toast: ToastService,) { }

  ngOnInit(): void {
    this.id = this.data["id"];
    console.log("data get recharge", this.id);
    this.setForm()
  }

  setForm(){
    this.createJaugeage = new FormGroup({
      citerne_id: new FormControl(this.id),
      date: new FormControl("", Validators.required),
      quantite: new FormControl("", Validators.required),
    })
  }

  add(){
    if(this.createJaugeage.invalid){
      console.log("invalid")
    }else{
      console.log(this.createJaugeage.value)
      this.spinner = true;
      this.vehiculeService.addJaugeage(this.createJaugeage.value).subscribe(
        (data) => {
          console.log('data', data);
          this.spinner = false
          this._toast.success("Jaugeage ajouté avec succés");
          this.dialogRef.close(data['response']);
        },
        (error) => {
          console.log('error', error);
          this.spinner = false
          this._toast.error("Une erreur est survenue");
      });
    }
  }

}
