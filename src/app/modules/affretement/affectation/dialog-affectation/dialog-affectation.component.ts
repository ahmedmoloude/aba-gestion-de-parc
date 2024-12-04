import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AffretementService } from 'app/core/services/affretement.service';
import { PersonelService } from 'app/core/services/personel.service';
import { ToastService } from 'app/services';

@Component({
  selector: 'app-dialog-affectation',
  templateUrl: './dialog-affectation.component.html',
  styleUrls: ['./dialog-affectation.component.css']
})
export class DialogAffectationComponent implements OnInit {

  demande :any;
  affecterDemande: FormGroup;
  affectationFormGroup: FormGroup;
  spinner : boolean = false;
  spinner_vehicule : boolean = false
  spinner_driver : boolean = false
  mission_vehicule  = [false]
  mission_driver  = [false]
  drivers : any = [];

  accompagnateures_only : any = [];
  accompagnateurs : any = [];
  conducteurs : any;
  trucks : any = [];
  vehicules : any;
  vehicules_missions : any = [];
  drivers_missions : any = [];
  searchStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}
  contentStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}
  selectedDrivers = []
  selectedTrucks = []
  selectedAccompagnateur = []

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<DialogAffectationComponent>,
              private affretementService: AffretementService,
              private _toast: ToastService,
              private formBuilder: FormBuilder , private personelService : PersonelService) { }

  ngOnInit(): void {
    // console.log("MISSION VEHICULE ", this.mission_vehicule[0])
    this.demande = this.data["demande"];
    console.log("data get edit", this.demande)
    console.log("DEMANDE VEHICULE LENGTH ", this.demande.vehicules?.length)
    
    this.affecterDemande = this.formBuilder.group({
      demande_id: [this.demande.id, Validators.required],
      affectations: this.formBuilder.array([])
    });

    this.get_data();

    this.demande.vehicules.forEach(element => {
      console.log("ADD ROW AFFECTATION")
      this.addAffectation();
    });
  }

  affecter(){
    console.log("AFFECTATION ", this.affecterDemande.value)
  }

  get_data(){
            // this.vehicules = item.vehicules
        console.log("VEHICULES DEMANDES ", this.demande.vehicules)
        let vehicules = [];
        let conducteurs = [];
        this.demande.vehicules.forEach(element => {
          let v = {
            tonnage : element.tonnage?.id,
            type : element.truck_type?.id,
            }
          vehicules.push(v);

          let c = {
            tonnage : element.tonnage?.id,
          }
          conducteurs.push(c);
        });

        let data_vehicules = { 
          vehicules : vehicules,
          date_debut : this.demande.date_debut,
          date_fin : this.demande.date_fin
        }
        let data_conducteurs = { 
          tonnages : conducteurs,
          date_debut : this.demande.date_debut,
          date_fin : this.demande.date_fin
        }
        
        this.spinner_vehicule = true;      
        this.affretementService.getVehiculeAffectation(data_vehicules).subscribe(
          (data) => {
            // console.log("TRUCKS ", data['response'])
            this.vehicules = data['response'];
            this.trucks[0] = data['response'];
            this.spinner_vehicule = false;
          },
          (error) => {
            console.log('error', error);
          })

          this.spinner_driver = true;
          this.affretementService.getConducteurAffectation(data_conducteurs).subscribe(
            (data) => {
              this.conducteurs = data['response'];
              this.spinner_driver = false;
            },
            (error) => {
              console.log('error', error);
            })


          
    this.personelService.personnelbyFunction(null, 'ACCOMPAGNATEUR').subscribe(
      (data:any) => {
        console.log("Accompagnetures data.... ", data)



        this.accompagnateures_only = data?.response;


      },
      (error) => {
        console.log('error', error);
      });
  }

  filterTruck(event: any, index: number){
    if(event){
      this.selectedTrucks.push(event)
      const affectation = this.affectations.at(index);
      affectation.get('truck_id').setValue(event.id);
      let driversTemp = []
      this.conducteurs.forEach(element => {
        if (element['tonnages'].some(obj => obj.id === event.tonnage_id)) {
          if(index == 0){
            driversTemp.push(element)
          }else if(index > 0 && (this.selectedDrivers.some(elem => elem.id == element.id)) == false && (this.selectedAccompagnateur.some(elem => elem.id == element.id)) == false){
            // console.log('HERE', this.drivers[index - 1], element, 'INDEX', index, this.drivers[index - 1].some(elem => {elem.id === element.id}))
            driversTemp.push(element)
          }
        } 
      });
      this.drivers.push(driversTemp);
      this.mission_vehicule[index] = true
      this.vehicules_missions[index] = event;
      // console.log('DRIVERS', this.drivers)
    }
  }

  filterDriver(event: any, index: number){
    if(event){
      this.selectedDrivers.push(event)
      const affectation = this.affectations.at(index);
      affectation.get('driver_id').setValue(event.id);
      let accompagnateurTemp = this.drivers[index].filter(d => d.id != event.id)



      let allAccomp = [ ...accompagnateurTemp , ...this.accompagnateures_only]
      this.accompagnateurs.push(allAccomp);
      console.log("allAccomp .... ", allAccomp)

      this.mission_driver[index] = true
      this.drivers_missions[index] = event
    }
  }

  filterAccompagnateur(event: any, index: number){
    // this.accompagnateurs = [];
    if(event){
      this.selectedAccompagnateur.push(event)
      const affectation = this.affectations.at(index);
      affectation.get('accompagnateur_id').setValue(event.id);
    }
  }

  get affectations() {
    return this.affecterDemande.get("affectations") as FormArray;
  }

  addAffectation() {
    console.log("ADD ROW AFFECTATION ", this.affectations.value);
    var data = this.affectations.value;
    this.affectationFormGroup = this.formBuilder.group({
      driver_id: ['', Validators.required],
      truck_id: ['', Validators.required],
      accompagnateur_id: ['']
    });
    let index = this.affectations.length
    if(this.affectations.length == 0 ){
      this.affectations.push(this.affectationFormGroup);
      // this.trucks.push(this.vehicules);
    }else{
      if(data[index-1]["truck_id"] && data[index-1]["driver_id"]){
        this.affectations.push(this.affectationFormGroup);
        let vehiculesTemp = []
        this.vehicules.forEach(element => {
          if((this.selectedTrucks.some(elem => elem.id == element.id)) == false){
            vehiculesTemp.push(element)
          }
        });
        this.trucks.push(vehiculesTemp);
      }
    }   
  }

  removeAffectation(index: number) {
    this.affectations.removeAt(index);
  }

  onSubmit() {
    console.log("DEMANDE VEHICULE LENGTH ", this.demande.vehicules?.length)
    console.log("LENGTH ARRAY TO SEND ", this.affectations.length)
    if(this.demande.vehicules?.length == this.affectations.length){
      if (this.affecterDemande.valid) {
        this.spinner = true;
        console.log(this.affecterDemande.value);
        this.affretementService.affectationDemande(this.affecterDemande.value).subscribe(
          (data) => {
            console.log("AFFECTER ", data)
            this.spinner= false;
            this._toast.success('Demande affecté avec succées')
            this.dialogRef.close(data['response'])
          },
          (error) => {
            this._toast.error('Une erreur est survenue lors de l\'affectation de la demande ')
            console.log('error', error);
          })
      }
    }else{
      this._toast.error('Pour affecter cette demande vous devez au moins choisir '+ this.demande.vehicules?.length + ' véhicules et conducteurs')
    }

  }

}
