import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { PermissionService } from 'app/core/services/permission.service';
import { selectCities } from 'app/core/store/location/location.selectors';
import { getVehicules } from 'app/core/store/reservation/reservation.actions';
import { selectAllCity } from 'app/core/store/resources/resources.selectors';
import { selectEnvtonnagePayload } from 'app/core/store/tonnage/tonnage.selectors';
import { selectEnvtruckTypePayload } from 'app/core/store/truckType/truckType.selectors';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-grille-service-specifique',
  templateUrl: './grille-service-specifique.component.html',
  styleUrls: ['./grille-service-specifique.component.css']
})
export class GrilleServiceSpecifiqueComponent implements OnInit {
  gridSpecific = [];
  p: number = 1;
  isActiveLoading =  false;
 

  data = []

  loading = true
  headerColumuns = [
    'Type de camion',
    'Tonnage',
    'Service',
    'min',
    'max',
    'tarif',
    'Tarif Sup',
    'Prix min',
    'Prix max',
  ];
  

  
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
      name: 'tranche_prix',
      placeholder: 'Tarif',
      type: 'text'
    }
  ];
  constructor(private store : Store , private gridService: BoGridService , public  permissionService : PermissionService) { }

  ngOnInit(): void {

    this.gridService.getSpecefiqueServices().subscribe(res => {
      this.data = res.response;
      this.loading =  false;
    })
    this.gridService.getAffretementGridsSpecific().subscribe((data) => {
      this.gridSpecific = data
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
    
  }



  filtrer($event){
    console.log("FILTER RDV", $event)
    this.loading = true;
    
    this.gridService.getSpecefiqueServices($event).subscribe(res => {
      this.data = res.response;
      this.loading =  false;
    })

  }

  activeGrid(title){
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
      this.gridService.activeAffretementGrid({type: 'SERVICE_BY_TRUCK', title: title}).subscribe(() => {
        this.gridService.getAffretementGridsSpecific().subscribe((data) => {
          this.gridSpecific = data
          this.loading =  true;
          this.isActiveLoading =  false;
          this.gridService.getSpecefiqueServices().subscribe(res => {
            this.data = res.response;
            this.loading =  false;
          })
        })
      })}})
  }
  

}
