// import { addintervention } from './../../../core/store/intervention/intervention.actions';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastService } from 'app/core';
import { selectEnvinterventionIsLoading, selectEnvinterventionStatus } from 'app/core/store/intervention/intervention.selectors';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
// import { addintervention, updateintervention } from 'app/core/store/intervention/intervention.actions';
import { PersonelService } from 'app/core/services/personel.service';
import { RessouresService } from 'app/core/services/ressoures.service';
import { VehiculeService } from 'app/core/services/vehicule.service';
import { SharedAutcompleteComponent } from 'app/shared/components/shared-autcomplete/shared-autcomplete.component';

@Component({
  selector: 'app-add-intervention',
  templateUrl: './add-intervention.component.html',
  styleUrls: ['./add-intervention.component.css'],
})
export class AddInterventionComponent implements OnInit {
  searchStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}
  contentStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}
  @ViewChildren(SharedAutcompleteComponent) searchComponents: QueryList<SharedAutcompleteComponent>;
  filteredOptions: Observable<string[]>;
  createIntervention = new FormGroup({});
  typesFormGroup: FormGroup;
  form_btn : any;
  spinnerAdd : boolean;
  vehicules :any;
  vehicule :any;
  drivers :any;
  pannes :any;
  intervention :any;
  // typesDemandes = [ 'CORRECTIF', 'PREVENTIF', 'CONDITIONNEL']

  constructor(private store: Store<AppState>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<AddInterventionComponent>,
              private personelService : PersonelService,
              private ressourceService: RessouresService,
              private vehiculeService: VehiculeService,
              private _toast: ToastService,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    // this.store.select(selectEnvVehiculePayload).subscribe((res:any) => {
    //   this.vehicules = res.data;
    //   console.log(' vehicules ========>', this.vehicules);
    // });

    this.setForm();
    this.ressourceService.getTrucks().subscribe(
      (data:any) => {
        console.log("data conducteur", data)
        this.vehicules = data.response;
        if(!this.data["type"]){
          this.vehicule = this.vehicules.find(v => v.id == this.intervention?.truck_id)
          setTimeout(() => {
            this.searchComponents?.toArray()[0]?.selectObject(this.vehicule)
          });
        }
      }
    );


    this.personelService.personnelbyFunction(null, 'DRIVER').subscribe(
      (data:any) => {
        console.log("DRIVER ", data)
        this.drivers = data.response;
        setTimeout(() => {
          this.searchComponents.toArray()[1]?.selectObject(this.intervention?.driver)
        });
    });

    this.vehiculeService.getPanne().subscribe(
      (data:any) => {
        console.log("PANNE ", data)
        this.pannes = data?.response;
    });


  }

  filterVehicule(event){
    if(event){
      console.log("EVENT TRUCK ", event)
      this.vehicule = event;
      this.createIntervention?.get('truck_id')?.setValue(event.id);
    }
  }

  filterDriver(event){
    if(event){
      console.log("DRIVER ", event)
      this.createIntervention?.get('driver_id')?.setValue(event.id);
    }
  }

  setForm(){
    if(this.data["type"]){
      console.log("FORM ADD")
      this.form_btn = "Créer"
      this.createIntervention = this.formBuilder.group({
        commentaire: new FormControl(""),
        date_demande: new FormControl("", Validators.required),
        driver_id: new FormControl("", Validators.required),
        truck_id: new FormControl("", Validators.required),
        types: this.formBuilder.array([
          this.formBuilder.group({
            type: ['', Validators.required],
            panne_id: ['', Validators.required],
          })
        ])
      });
    }else{
      this.form_btn = "Modifier"
      console.log("FORM EDIT")
      this.intervention = this.data["item"]
      console.log(this.intervention)
      const typesArray = this.formBuilder.array([]);
      this.intervention?.details?.forEach(detail => {
        typesArray.push(this.formBuilder.group({
          type: [detail?.type , Validators.required],
          panne_id: [detail?.panne_id , Validators.required],
        }));
      });
      this.createIntervention = this.formBuilder.group({
        commentaire: new FormControl(this.intervention?.commentaire),
        date_demande: new FormControl(this.intervention?.date_demande, Validators.required),
        driver_id: new FormControl(this.intervention?.driver_id, Validators.required),
        truck_id: new FormControl(this.intervention?.truck_id, Validators.required),
        types: typesArray
      });
    }
  }

  get types() {
    return this.createIntervention.get("types") as FormArray;
  }

  addType() {
    console.log("ADD ROW TYPES ", this.types.value);
    var data = this.types.value;
    this.typesFormGroup = this.formBuilder.group({
      type: ['', Validators.required],
      panne_id: ['', Validators.required],
    });
    // this.types.push(this.typesFormGroup);
    let index = this.types.length
    if(this.types.length == 0 ){
      this.types.push(this.typesFormGroup);
    }else{
      if(data[index-1]["type"] && data[index-1]["panne_id"]){
        this.types.push(this.typesFormGroup);
      }
    }
  }

  removeType(index: number) {
    this.types.removeAt(index);
  }

  addIntervention(){
    console.log("form", this.createIntervention.value)
    if(this.data["type"]){
      console.log("ADD");
      this.spinnerAdd = true
      this.vehiculeService.addIntervention(this.createIntervention.value).subscribe(
        (data:any) => {
          console.log("INTERVENTION ", data['response'])
          this.spinnerAdd = false;
          this._toast.success("Demande intervention crée avec succées")
          this.dialogRef.close(data['response']);
      },
      (error) => {
        console.log('error', error);
        this.spinnerAdd = false;
        this._toast.error("Une erreur est survenue");
    });
    }else{
      console.log("EDIT");
      this.spinnerAdd = true
      this.vehiculeService.updateIntervention(this.createIntervention.value, this.intervention.uuid).subscribe(
        (data:any) => {
          console.log("INTERVENTION ", data['response'])
          this.spinnerAdd = false;
          this._toast.success("Demande intervention crée avec succées")
          this.dialogRef.close(data['response']);
      },
      (error) => {
        console.log('error', error);
        this.spinnerAdd = false;
        this._toast.error("Une erreur est survenue");
    });
    }

  }


      // this.store.dispatch(addintervention({ data: this.createIntervention.value}));
    //   this.store.select(selectEnvinterventionIsLoading).subscribe((res) => {
    //     // console.log("spinner", res);
    //     this.spinnerAdd = res
    //   });
    //   this.store.select(selectEnvinterventionStatus).subscribe((res) => {
    //     // console.log("status", res);
    //     if(res == 'SUCCESS'){
    //       this.dialogRef.close();
    //     }
    //   });
}
