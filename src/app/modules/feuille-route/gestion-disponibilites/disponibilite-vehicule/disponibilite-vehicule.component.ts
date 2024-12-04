import { Component, OnInit } from '@angular/core';
import {TruckDisponibilteesService} from '../../../../core/services/truck-disponibiltees.service'
import { AppState } from 'app/core/store/app.states';
import { Store } from '@ngrx/store';
import { VehiculeService } from 'app/core/services/vehicule.service';
import { selectEnvbrandPayload } from 'app/core/store/brand/brand.selectors';
import { selectEnvmodelePayload } from 'app/core/store/modele/modele.selectors';
import { selectEnvparcPayload } from 'app/core/store/parc/parc.selectors';
import { selectEnvtonnagePayload } from 'app/core/store/tonnage/tonnage.selectors';
import { fetchVehicules } from 'app/core/store/vehicule/vehicule.actions';
import { selectEnvVehiculePayload } from 'app/core/store/vehicule/vehicule.selectors';
import { Paginator } from 'app/core/models/paginator.model';
import { selectPagination } from 'app/core/store/pagination/pagination.selectors';
@Component({
  selector: 'app-disponibilite-vehicule',
  templateUrl: './disponibilite-vehicule.component.html',
  styleUrls: ['./disponibilite-vehicule.component.css'],
})
export class DisponibiliteVehiculeComponent implements OnInit {
  pagination!: Paginator;
  per_page = 10;
  p: number = 1;
  filterData: any;

  headerColumuns = [
    'N°',
    'Sous parc',
    'Code Véhicule / Immatriculation',
    'Marque',
    'Modèle',
    'Tonnage',
    'NB mission effectuée (mois)',
    'Km parcouru',
    'Statut',
    'Motif',
  ];
  trucks : any = [];
  links : any = [];
  spinner :boolean = true;
  loader : boolean ;
  datafilter : any;
  parcs : any;
  brands : any;
  modeles : any;
  tonnages : any;

  inputsFiler = [
    {
      name: 'parc_id',
      placeholder: 'Sous parc',
      type: 'select',
      options: [],
    },
    {
      name: 'code_interne',
      placeholder: 'Code',
      type: 'text'
    },
    {
      name: 'matricule',
      placeholder: 'Immatriculation',
      type: 'text',
    },
    {
      name: 'brand_id',
      placeholder: 'Marque',
      type: 'select',
      options: []
    },
    {
      name: 'modele_id',
      placeholder: 'Modéle',
      type: 'select',
      options: []
    },
    {
      name: 'tonnage_id',
      placeholder: 'Tonnage',
      type: 'select',
      options: []
    },
  ];

  extraInputsFiler = [
    {
      name: 'status',
      placeholder: 'Statut',
      type: 'select',
      options: [
        {
          text: 'REFORME',
          value: 'REFORME',
        },
        {
          text: 'En circulation',
          value: 'En circulation',
        },
        {
          text: 'En panne',
          value: 'En panne',
        },
        {
          text: 'Vendue',
          value: 'Vendue',
        },
      ],
    },
  ]

  constructor(
              private store: Store<AppState>,
              private vehiculeService : VehiculeService
            ) {}

  ngOnInit(): void {
    this.store.select(selectPagination).subscribe(pagination => {
      this.pagination = pagination
    })

    // this.store.dispatch(fetchVehicules());
    this.store.dispatch(fetchVehicules({data: null, per_page : this.per_page , page : 1}));


    this.store.select(selectEnvVehiculePayload).subscribe((res:any) => {
      console.log("TRUCKS", res)
      this.trucks = res.data;
      this.links = res.links;
      this.spinner= false;
    });

      this.store.select(selectEnvbrandPayload).subscribe((res) => {
        // console.log(" brand========>", res)
        this.brands = res
        for(var i=0; i<this.brands.length; i++){
          this.inputsFiler["3"].options.push({
            'text' : this.brands[i].name,
            'value' : this.brands[i].id,
          })
        }
      });

      this.store.select(selectEnvmodelePayload).subscribe((res) => {
        // console.log(" modele========>", res)
        this.modeles = res
        for(var i=0; i<this.modeles.length; i++){
          this.inputsFiler["4"].options.push({
            'text' : this.modeles[i].name,
            'value' : this.modeles[i].id,
          })
        }
      });

      this.store.select(selectEnvparcPayload).subscribe((res) => {
        // console.log(" parc========>", res)
        this.parcs = res
        for(var i=0; i<this.parcs.length; i++){
          this.inputsFiler["0"].options.push({
            'text' : this.parcs[i].name,
            'value' : this.parcs[i].id,
          })
        }
      });

      this.store.select(selectEnvtonnagePayload).subscribe((res) => {
        // console.log(" tonnage========>", res)
        this.tonnages = res
        for(var i=0; i<this.tonnages.length; i++){
          this.inputsFiler["5"].options.push({
            'text' : this.tonnages[i].name + 'T',
            'value' : this.tonnages[i].id,
          })
        }
      });
  }

  // getTruckDiponible(){
  //   this.spinner = true
  //   this.truckDisponibilteesService.getTruckDispo().subscribe((res:any)=>{
  //       this.trucks = res.response.data;
  //       this.links = res.response.links
  //       this.spinner = false
  //     })
  // }

  filtrer($event){
    this.spinner = true;
    console.log("FILTER RDV", $event)
    this.datafilter = $event;
    this.filterData = $event
    this.store.dispatch(fetchVehicules({data: $event, per_page : this.per_page, page : this.p}));
    // this.vehiculeService.getTruck($event).subscribe((data) => {
    //   this.spinner = false;
    //     console.log('data retourné ', data);
    //     this.trucks = data["response"].data;
    //     this.links = data["response"].links;
    // })
  }
  paginate($event: any){
    console.log( 'page size ' , $event)

    this.per_page = $event.rows;

    const paginator = {
      currentPage: $event.page,
      nextPage: $event.page + 1,
      pageSize: $event.pageCount,
      totalItems: this.pagination.totalItems,
    }
    this.p = paginator.nextPage
    this.store.dispatch(fetchVehicules({data: this.filterData, per_page : this.per_page , page : paginator.nextPage}));
  }

  getKmParcouru(froute_closed: any[]) {
    let distance_totale = 0;

    // Calcul de la distance totale parcourue
    for (const trajet of froute_closed) {
        const distance_parcourue = trajet.km_fin - trajet.km_depart;
        distance_totale += distance_parcourue;
    }
    return distance_totale;
  }

  // getTheNext(event) {
  //   this.spinner = true
  //   this.vehiculeService.getTruck(this.datafilter, event).subscribe((res:any)=>{
  //     this.trucks = res.response.data;
  //     this.links = res.response.links
  //     this.spinner = false
  //   })
  // }
  // getParcks(){
  //   this.truckDisponibilteesService.getParcs().subscribe((res)=>{
  //     this.parcs = res
  //   })
  // }
  // getVehicule(){
  // this.spinner = true
  //  this.truckDisponibilteesService.getParcsFiltre({filtre : this.filtre}).subscribe((res:any)=>{
  //   this.trucks = res.response.data;
  //   this.links = res.response.links
  //   this.spinner = false
  // })

  // }
  // getParc(event){
  //    this.filtre.parc = event.value
  // }
  // getCodevehicule(event){
  //   this.filtre.code_vehicule = event.target.value
  // }
  // getMarque(event){
  //   this.filtre.Marque = event.target.value
  // }
  // getkmParcouru(event){
  //   this.filtre.km_parcouru = event.target.value
  // }
  // getStatut(event){
  //   this.filtre.Statut = event.value
  // }


}
