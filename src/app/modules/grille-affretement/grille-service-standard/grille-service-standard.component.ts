import { Component, OnInit } from '@angular/core';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-grille-service-standard',
  templateUrl: './grille-service-standard.component.html',
  styleUrls: ['./grille-service-standard.component.css']
})
export class GrilleServiceStandardComponent implements OnInit {
  gridGlobal = [];
  p: number = 1;
  isActiveLoading =  false;
  headerColumuns = [
    'Service',
    'min',
    'max',
    'tarif',
    'Tarif Sup',
    'Prix min',
    'Prix max'
  ];
  inputsFiler = [
    {
      name: 'rubrique',
      placeholder: 'Rubrique',
      type: 'text'
    },
    {
      name: 'tranche_prix',
      placeholder: 'Valeur',
      type: 'text'
    }
  ];

  // extraInputsFilter = [
  //   {
  //     name: 'max',
  //     placeholder: 'Max',
  //     type: 'text',
  //   },
  //   {
  //     name: 'unite_supplementaire',
  //     placeholder: 'Unité supplémentaire',
  //     type: 'text',
  //   },
  //   {
  //     name: 'valeur_supplementaire',
  //     placeholder: 'Valeur supplémentaire',
  //     type: 'text',
  //   }
  // ];


  
  data = []

  loading = true

  constructor(private gridService: BoGridService) { }

  ngOnInit(): void {
    this.gridService.getAffretmentDetailsServiesGlobal().subscribe(res => {
      this.data = res.response;
      this.loading =  false;
    })
    this.gridService.getAffretementGridsGlobal().subscribe((data) => {
      this.gridGlobal = data
    })
  }

  
  filtrer($event){
    console.log("FILTER RDV", $event)

    this.loading = true;
    this.gridService.getAffretmentDetailsServiesGlobal($event).subscribe(res => {
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
      this.gridService.activeAffretementGrid({type: 'SERVICE_GLOBAL', title: title}).subscribe(() => {
        this.gridService.getAffretementGridsGlobal().subscribe((data) => {
          this.gridGlobal = data
          this.loading = true;
          this.isActiveLoading =  false;
          this.gridService.getAffretmentDetailsServiesGlobal().subscribe(res => {
            this.data = res.response;
            this.loading =  false;
          })
        })
      })
    }}
    )
  }
  
}
