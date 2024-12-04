import { selectAllCity } from 'app/core/store/resources/resources.selectors';
import { AppState } from 'app/core/store/app.states';
import { Store } from '@ngrx/store';
import { selectEnvPayloadAgence } from 'app/core/store/agence/agence.selectors';
import { ToastService } from 'app/services';
import { ParametreService } from 'app/core/services/parametre.service';
import { Component, EventEmitter, Input, OnInit,Output,ViewChild } from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import { DialogClientComponent } from './dialog-client/dialog-client.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { DialogCommercialComponent } from '../affectation-commercial/dialog-commercial/dialog-commercial.component';
import { PermissionService } from 'app/core/services/permission.service';
@Component({
  selector: 'app-affectation-clients',
  templateUrl: './affectation-clients.component.html',
  styleUrls: ['./affectation-clients.component.css']
})
export class AffectationClientsComponent implements OnInit {

  city_id : any;
  agence_id : any;
  inputsFiler = [
    {
      name: 'city_id',
      placeholder: 'Ville',
      type: 'select',
      options: []
    },
    {
      name: 'agence_id',
      placeholder: 'Agence',
      type: 'select',
      options: []
    },

  ];
  @Output() submited = new EventEmitter<any>();

  spinner = false;
  agences = [];
  cities = [];
  objectifFilter = [];
  agenceFilter = [];
  affectations = [];
  headerColumuns = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre'
  ];
  @ViewChild(MatAccordion) accordion: MatAccordion;

    constructor(
      private store: Store<AppState>,
    public dialog: MatDialog,
    private parametreService: ParametreService,
    private _toast: ToastService,
    public permissionService: PermissionService

  ) {}

  @Input() objectif = [];

  onVilleChange(event){
    if(event){
      this.agences = this.agenceFilter;this.agence_id = undefined
      console.log("Ville", event)
      this.city_id = event.id
      this.agences = this.agences.filter(agence => agence.city_id == event.id)
      console.log("AGENCE", this.agences)
    }
  }

  onAgenceChange(event){
    if(event){
      console.log("Agence", event)
      this.agence_id = event.id;
    }
  }

  ngOnInit(): void {
    console.log("AFFECTATION CLIENT", this.objectif)
    this.objectifFilter = this.objectif;
    this.affectations = this.objectifFilter["affectation"];
    console.log("OBJECTIF Filter", this.objectif)

    this.getAgence();
    this.getCity();
  }

  // getData(){
  //   this.spinner = true;
  //   this.parametreService.getObjectifAgence().subscribe(
  //     (data) => {
  //       this.spinner = false
  //       console.log('GET AFFECTATION OBJECTIF AGENCE', data["response"]);
  //       this.objectif_agences = data["response"]
  //   });
  // }

  delet(uuid){
    console.log("uuid details", uuid)
    Swal.fire({
      title: 'Êtes-vous sûr(e) de vouloir supprimer Objectif ?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.parametreService.DeleteAffectationObjectif(uuid).subscribe(
          (data) => {
            console.log('delet', data),
              this._toast.success('Affectation objectif supprimer avec succés!');
              // this.getData();
          },
          (error) => {
            console.log('error', error);
            this._toast.error('Une erreur est survenue lors de la suppression de l\'Objectif !');
          });
      }
    });
  }

  getAgence(){
    this.store.select(selectEnvPayloadAgence).subscribe((res) => {
      this.agences = res;
      this.agenceFilter = res;
      console.log(' agence========>', this.agences);
      // for(var i=0; i<this.agences.length; i++){
      //   this.inputsFiler["1"].options.push({
      //     'text' : this.agences[i].name,
      //     'value' : this.agences[i].id,
      //   })
      // }
    });
  }

  getCity(){
    this.store.select(selectAllCity).subscribe((res) => {
      this.cities = res;
      console.log(' cities========>', this.cities);
      for(var i=0; i<this.cities.length; i++){
        this.inputsFiler["0"].options.push({
          'text' : this.cities[i].name,
          'value' : this.cities[i].id,
        })
      }
    });
  }

  filter(){
    console.log("AFFECTATIONS", this.affectations)
    this.objectif["affectation"] = this.affectations

    console.log("OBJECTIF", this.objectif)
    console.log("OBJECTIF FILTER", this.objectifFilter)

    console.log("CITY", this.city_id)
    console.log("AGENCE", this.agence_id)
    if(this.city_id){
      this.objectif["affectation"] = this.objectif["affectation"].filter(obj => obj.city_id == this.city_id )
    }
    if(this.agence_id){
      this.objectif["affectation"] = this.objectif["affectation"].filter(obj => obj.agence_id == this.agence_id )
    }
  }

  refreshFilter(){
    this.city_id = undefined
    this.agence_id = undefined
    this.objectif["affectation"] = this.affectations
  }

  visibles: any = [];
  ReadMore: boolean = true;

  visible: boolean = false;

  isVisible(index) {
    let founded = this.visibles.find((i) => i.index == index);
    return founded ? founded.visible : false;
  }

  onclick(index) {
    if (!this.visibles.find((i) => i.index == index)) {
      this.visibles.push({
        index,
        visible: true,
      });
    } else {
      this.visibles.find((i) => i.index == index).visible = !this.visibles.find(
        (i) => i.index == index
      ).visible;
    }
    console.log('VISIBLES', this.visibles)
  }

  addclient(objectif , edit_mode = false , sectors? : [] , commercial_id? , customer_type? , agence?  , dialog_type? , item?): void {

    console.log('item....' , item);
    const dialogRef = this.dialog.open(DialogClientComponent, {
      disableClose: true,
      width: '1100px',
      data: {
        mode : edit_mode ? 'Modifier' : 'add',
        sectors : sectors,
        objectif : objectif,
        commercial_id,
        customer_type,
        dialog_type,
        agence,
        item
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      // if (data) {
        console.log("DATA", data)
        // this.getData();
        this.submited.emit()

      // }
    });
  }

  addAffectationAgence(mode, type, agence, objectif, item): void {
    const dialogRef = this.dialog.open(DialogClientComponent, {
      disableClose: true,
      width: '1041px',
      data: { mode, type, agence, objectif, item , dialog_type : 'agence-simple'},
    });

    dialogRef.afterClosed().subscribe((data) => {
      // if (data) {
        console.log("DATA", data)
        // this.getData();
        this.submited.emit()

      // }
    });
  }


  typeAllReadyExist(type: string  , objectif){
     return objectif?.affectation?.filter((i) =>  i?.type == type ).length > 0
  }


  // monthsAreBigerthenZero(item){

  //   let sum = item.janvier + item.fevrier + item.mars

  //   console.log("sum", sum)
  //   return sum > 0
  // }


  addcommercial(objectif, mode, item , agence_id?): void {
    const dialogRef = this.dialog.open(DialogCommercialComponent, {
      disableClose: true,
      width: '1041px',
      data: { objectif, mode, item , agence_id },
    });

    dialogRef.afterClosed().subscribe((data) => {
      // if (data) {
        // console.log("AFTER CLOSE AFFECTATION COMMERCIAL", data)
        // console.log("OBJECTIF", this.objectifs)
        // this.getData();
        this.submited.emit()
      // }
    });

  }
}
