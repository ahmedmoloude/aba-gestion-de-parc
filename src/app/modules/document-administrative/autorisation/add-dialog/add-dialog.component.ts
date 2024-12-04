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
  createAutorisation : FormGroup;
  vehicule :any;
  file_autorisation :any;
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
      this.createAutorisation.controls['truck_id'].setValue(event.id);
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
      this.createAutorisation.controls['truck_id'].setValue(this.vehicule.id);
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
      console.log("MODE EDIT")
      this.createAutorisation = new FormGroup({
        truck_id: new FormControl(this.item.truck_id, Validators.required),
        type: new FormControl('AUTORISATION', Validators.required),
        objet: new FormControl(this.item.objet, Validators.required),
        start_date: new FormControl(this.item.start_date, Validators.required),
        end_date: new FormControl(this.item.end_date, Validators.required),
        n_autorisation: new FormControl(this.item.n_autorisation, Validators.required),
        rappel: new FormControl(this.item.rappel, Validators.required),
      })
    }else{
      console.log("MODE ADD")
      this.createAutorisation = new FormGroup({
        truck_id: new FormControl("", Validators.required),
        type: new FormControl('AUTORISATION', Validators.required),
        objet: new FormControl('', Validators.required),
        start_date: new FormControl('', Validators.required),
        end_date: new FormControl('', Validators.required),
        n_autorisation: new FormControl('', Validators.required),
        rappel: new FormControl('', Validators.required),
      })
    }

  }

  onSelectImageAutorisation(event)
  {
    this.file_autorisation  = (event.target as HTMLInputElement).files[0];
    console.log(this.file_autorisation, "file")
  }

  addAutorisation(){
    console.log(this.createAutorisation.value);

    const formData = new FormData();
    for (var key in this.createAutorisation.value) {
      if (this.createAutorisation.value[key]) {
        formData.append(key, this.createAutorisation.value[key]);
      }
    }
    if(this.mode == 'edit'){
      if (this.file_autorisation) {
        formData.append('file', this.file_autorisation);
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
      if (this.file_autorisation) {
        formData.append('file', this.file_autorisation);
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
