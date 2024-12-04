import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../../../core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { addService } from 'app/core/store/service/service.actions';
import { selectEnvStatusService, selectEnvIsLoadingService } from 'app/core/store/service/service.selectors';
import { selectBasisCalcul } from 'app/core/store/resources/resources.selectors';
@Component({
  selector: 'app-service-dialog',
  templateUrl: './service-dialog.component.html',
  styleUrls: ['./service-dialog.component.css']
})
export class ServiceDialogComponent implements OnInit {
  BasisCalculs : any;
  BasisCalculsId :  any[] = [];
  createRubric : FormGroup;
  spinner: boolean = false;
  spinnerBasisCalcul: boolean = false;
  constructor(
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<ServiceDialogComponent>,
    private _toast: ToastService,) { }

  ngOnInit(): void {
    this.store.select(selectBasisCalcul).subscribe((res) => {  
      this.BasisCalculs = res;
      console.log(" BasisCalculs========>", this.BasisCalculs)
    });
    this.createRubric = new FormGroup({
      title: new FormControl("", Validators.required),
      taxe: new FormControl("", Validators.required),
    })
  }

  changeTextToUppercase(field) {
    const obj = {};
    obj[field] = this.createRubric.controls[field].value.toUpperCase();
    this.createRubric.patchValue(obj);
  }

  onChange(event) {
    this.BasisCalculsId = new Array(); 
    this.BasisCalculsId.push(event.value);
  }

  addRubric(){
    const formData = new FormData();
    for(var i=0; i<this.BasisCalculsId.length; i++)
    {
      for(var j=0; j<this.BasisCalculsId[i].length; j++)
      {
        formData.append('calcul_basis_ids[]', this.BasisCalculsId[i][j]);
      }
    }
    formData.append('title', this.createRubric.get('title').value );
    formData.append('taxe', this.createRubric.get('taxe').value );
    // this.spinner = true;
    this.store.dispatch(addService({ data: formData }));
    this.store.select(selectEnvIsLoadingService).subscribe((res) => {
      console.log("loading", res);
      this.spinner=res
    });
    this.store.select(selectEnvStatusService).subscribe((res) => {
      console.log("status", res);
      if(res == 'SUCCESS'){
        this.dialogRef.close();
      }
    });
  }

}
