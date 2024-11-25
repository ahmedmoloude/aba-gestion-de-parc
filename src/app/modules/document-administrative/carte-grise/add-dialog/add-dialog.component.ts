import { Component, OnInit, Input, QueryList, ViewChildren } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { ToastService } from 'app/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { addtonnage, updatetonnage } from 'app/core/store/tonnage/tonnage.actions';
import { MatDialogRef } from '@angular/material/dialog';
import { selectEnvtonnageStatus, selectEnvtonnageIsLoading } from 'app/core/store/tonnage/tonnage.selectors';
import { addVehiculeDocuments, updateVehiculeDocuments } from 'app/core/store/vehiculedocument/vehiculedocument.actions';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { selectEnvVehiculeDocumentStatus, selectEnvVehiculeDocumentIsLoading } from 'app/core/store/vehiculedocument/vehiculedocument.selectors';
import { RessouresService } from 'app/core/services/ressoures.service';
import { SharedAutcompleteComponent } from 'app/shared/components/shared-autcomplete/shared-autcomplete.component';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})

export class AddDialogComponent implements OnInit {
  @ViewChildren(SharedAutcompleteComponent) searchComponents: QueryList<SharedAutcompleteComponent>;
  spinnerAdd :boolean = false;
  createCarte : FormGroup;
  vehicule :any;
  file_carte_grise :any;
  start_time : any
  end_time : any;
  trucks : any = [];
  is_truck : boolean = false
  mode : any;
  item : any;
  searchStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}
  contentStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}

  setDateDebut(e){
    console.log("DATE DEBUT", e.target.value)
    this.start_time= e.target.value;
  }

  setDateFin(e){
    console.log("DATE FIN", e.target.value)
    this.end_time= e.target.value;
  }

  onTruckChange(event){
    if(event){
      console.log("EVENT", event)
      this.vehicule = event
      this.createCarte.controls['truck_id'].setValue(event.id);
      this.createCarte.controls['n_chassis'].setValue(event.n_chassis);

    }
  }

  constructor(
    private store: Store<AppState>,
    private boGridService: BoGridService,
    private ressourceService: RessouresService,
    private _toast: ToastService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddDialogComponent>,
  ) { }

  // ngAfterViewInit(){
  //   if(this.data["mode"] == "edit"){
  //     this.searchComponents.toArray()[0]?.selectObject(this.item?.truck)
  //   }
  // }

  ngOnInit(): void {
    this.mode = this.data['mode'];
    this.item = this.data['item'];
    this.setForm();
    this.vehicule = this.data['vehicule'];

    console.log(' truck ', this.vehicule);
    console.log(' item ', this.item);
    console.log(' mode ', this.mode);
    if(this.vehicule){
      this.is_truck = true
      this.createCarte.controls['truck_id'].setValue(this.vehicule.id);
      this.createCarte.controls['n_chassis'].setValue(this.vehicule.n_chassis);
    }

    this.ressourceService.getTrucks().subscribe(
      (data:any) => {
        console.log("data conducteur", data)
        this.trucks = data.response;
        setTimeout(() => {
          this.searchComponents.toArray()[0]?.selectObject(this.item?.truck)
        });
      }
    );
  }


  setForm(){
    if(this.mode == 'edit'){
      this.createCarte = new FormGroup({
        truck_id: new FormControl(this.item.truck_id, Validators.required),
        type: new FormControl('CARTE_GRISE', Validators.required),
        n_carte_grise: new FormControl(this.item.n_carte_grise, Validators.required),
        start_date: new FormControl(this.item.start_date, Validators.required),
        end_date: new FormControl(this.item.end_date, Validators.required),
        n_chassis: new FormControl({value:this.item.n_chassis, disabled: true}, Validators.required),
        rappel: new FormControl(this.item.rappel, Validators.required),
      })
    }else{
      this.createCarte = new FormGroup({
        truck_id: new FormControl("", Validators.required),
        type: new FormControl('CARTE_GRISE', Validators.required),
        n_carte_grise: new FormControl('', Validators.required),
        start_date: new FormControl('', Validators.required),
        end_date: new FormControl('', Validators.required),
        n_chassis: new FormControl({value:'', disabled: true}, Validators.required),
        rappel: new FormControl('', Validators.required),
      })
    }

  }

  onSelectImageGrise(event)
  {
    this.file_carte_grise  = (event.target as HTMLInputElement).files[0];
    console.log(this.file_carte_grise, "file")
  }

  addCarte(){
    if(this.createCarte.invalid) return;
    console.log(this.createCarte.value)

    const formData = new FormData();
    const formValue = this.createCarte.getRawValue();

    for (var key in formValue) {
      if(formValue[key]){
        formData.append(key , formValue[key])
      }
    }
    if(this.mode == 'edit'){
      if (this.file_carte_grise) {
        formData.append('file', this.file_carte_grise);
      }
      this.store.dispatch(updateVehiculeDocuments({ data: formData, uuid: this.item.uuid }));
      this.store.select(selectEnvVehiculeDocumentIsLoading).subscribe((res) => {
        console.log('spinnerAdd', res);
        this.spinnerAdd = res;
      });
      this.store.select(selectEnvVehiculeDocumentStatus).subscribe((res) => {
        console.log('res', res);
        if (res == 'SUCCESS') {
          this.dialogRef.close('data');
        }
      });
    }else{
      if (this.file_carte_grise) {
        formData.append('file', this.file_carte_grise);
        this.store.dispatch(addVehiculeDocuments({ data: formData }));
        this.store.select(selectEnvVehiculeDocumentIsLoading).subscribe((res) => {
          console.log('spinnerAdd', res);
          this.spinnerAdd = res;
        });
        this.store.select(selectEnvVehiculeDocumentStatus).subscribe((res) => {
          console.log('res', res);
          if (res == 'SUCCESS') {
            this.dialogRef.close('data');
          }
        });
      } else {
        this._toast.error('Remplir le document !');
      }
    }
  }

}
