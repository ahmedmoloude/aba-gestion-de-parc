import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { PermissionService } from 'app/core/services/permission.service';
import { selectCities } from 'app/core/store/location/location.selectors';
import { getVehicules } from 'app/core/store/reservation/reservation.actions';
import { selectReservationVehicules } from 'app/core/store/reservation/reservation.selectors';
import { selectAllCity } from 'app/core/store/resources/resources.selectors';
import { selectEnvtonnagePayload } from 'app/core/store/tonnage/tonnage.selectors';
import { selectEnvtruckTypePayload } from 'app/core/store/truckType/truckType.selectors';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-grille-transport',
  templateUrl: './grille-transport.component.html',
  styleUrls: ['./grille-transport.component.css']
})
export class GrilleTransportComponent implements OnInit {
  isActiveLoading = false;
  gridTransport = [];
  gridSpecific = [];
  gridGlobal = [];
  p: number = 1;
  searchStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}
  contentStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}
  headerColumuns = [
    'Type de camion',
    'Tonnage',
    'Origine',
    'Destination',
    'Tarif fixe',
    'Km (min)',
    'Km (max)',
    'Tarif par km',
    'Tarif par km Sup',
    'Prix min',
    'Prix max',
  ];


  loading = true;


  data = []
  inputsFiler = [
    {
      name: 'truck_type_id',
      placeholder: 'Type de camion',
      type: 'select',
      options: []
    },
    {
      name: 'tonnage_id',
      placeholder: 'Tonnage de camion',
      type: 'select',
      options: []
    },
    {
      name: 'villeOriginId',
      placeholder: 'Origine',
      type: 'select',
      options: []
    },
    {
      name: 'villeDestinationId',
      placeholder: 'Destination',
      type: 'select',
      options: []
    },
    {
      name: 'prixFixe',
      placeholder: 'Tarif',
      type: 'text'
    }
  ];
  constructor(public store : Store , private gridService: BoGridService , public permissionService : PermissionService) { }

  ngOnInit(): void {
    this.gridService.getTransportrConditions().subscribe(res => {
      this.data = res.response;

      this.loading =  false;
    })
    this.gridService.getAffretementGridsTransport().subscribe((data) => {
      this.gridTransport = data
    })


    this.store.dispatch(getVehicules());

    this.store.select(selectEnvtonnagePayload).subscribe((res) => {  
      // console.log(" tonnage========>", res)
      for(var i=0; i<res.length; i++){
        this.inputsFiler["1"].options.push({
          'text' : res[i].name + 'T',
          'value' : res[i].id,
        })
      }
    });

    
    this.store.select(selectEnvtruckTypePayload).subscribe((res) => {  
      // console.log(" type========>", res)
      for(var i=0; i<res.length; i++){
        this.inputsFiler["0"].options.push({
          'text' : res[i].name,
          'value' : res[i].id,
        })
      }
    });

    this.store.select(selectAllCity).subscribe((res) => {

      for(var i=0; i<res.length; i++){
        this.inputsFiler["2"].options.push({
          'text' : res[i].name,
          'value' : res[i].id,
        })

        this.inputsFiler["3"].options.push({
          'text' : res[i].name,
          'value' : res[i].id,
        })
      }
    });


  }

  filtrer($event){
    this.loading = true;
   

    this.gridService.getTransportrConditions($event).subscribe(res => {
      this.data = res.response;

      this.loading =  false;
    })
  }


  activeGrid(title, baseCalcul){

    Swal.fire({
      text: 'Etes-vous sûr(e) de vouloir activer cette Grille ?',
      icon: 'warning',
      iconColor: 'yellow',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'green',
      cancelButtonColor: 'black',
    }).then((result) => {

      if (result.value) {
        this.isActiveLoading =  true;
        this.gridService.activeAffretementGrid({type: 'TRANSPORT', title: title, baseCalcul: baseCalcul}).subscribe(() => {
          this.gridService.getAffretementGridsTransport().subscribe((data) => {
            this.gridTransport = data
            this.loading =  true;
            this.isActiveLoading =  false;
            this.gridService.getTransportrConditions().subscribe(res => {
              this.data = res.response;
              this.loading =  false;
            })
          })
        })
      }
    })
   
  }
}
