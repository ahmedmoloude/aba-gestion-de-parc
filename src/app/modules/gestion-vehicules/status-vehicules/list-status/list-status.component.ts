import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { VehiculeService } from 'app/core/services/vehicule.service';
import { AppState } from 'app/core/store/app.states';
import { fetchVehicules } from 'app/core/store/vehicule/vehicule.actions';
import { environment } from 'environments/environment';
import {
  selectEnvVehiculePayload,
  selectEnvVehiculeIsLoading,
} from 'app/core/store/vehicule/vehicule.selectors';
import { selectAllCityAgence, selectTruckService } from 'app/core/store/resources/resources.selectors';
import { selectEnvbrandPayload } from 'app/core/store/brand/brand.selectors';
import { selectEnvparcPayload } from 'app/core/store/parc/parc.selectors';
import { selectEnvtonnagePayload } from 'app/core/store/tonnage/tonnage.selectors';
import { selectEnvtruckTypePayload } from 'app/core/store/truckType/truckType.selectors';
import { selectEnvmodelePayload } from 'app/core/store/modele/modele.selectors';
import { selectEnvgammePayload } from 'app/core/store/gamme/gamme.selectors';
import { PermissionService } from 'app/core/services/permission.service';
import { Paginator } from 'app/core/models/paginator.model';
import { selectPagination } from 'app/core/store/pagination/pagination.selectors';

@Component({
  selector: 'app-list-status',
  templateUrl: './list-status.component.html',
  styleUrls: ['./list-status.component.css']
})
export class ListStatusComponent implements OnInit {
  pagination!: Paginator;
  per_page = 10;
  p: number = 1;
  filterData: any;

  vehicules: any;
  vehiculesFilter: any;

  headerColumuns = [
    'Ville',
    'Sous parc',
    'Activité',
    'Service',
    'Code interne',
    'Immatriculation',
    'Marque',
    'Gamme',
    'Type',
    'Tonnage',
    'Modèle',
    'DMC',
    'Date d\'entrée',
    'Index kilométrique',
    'Carburant',
  ];

  inputsFiler = [
    {
      name: 'city_id',
      placeholder: 'Ville',
      type: 'select',
      options: [],
    },
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
      name: 'de_dmc',
      placeholder: 'DMC : DU',
      type: 'date'
    },
    {
      name: 'a_dmc',
      placeholder: 'DMC : Au',
      type: 'date'
    },
  ];

  extraInputsFilter = [
    {
      name: 'activity',
      placeholder: 'Activité',
      type: 'select',
      options: [
        {
          text: 'Messagerie',
          value: 'Messagerie',
        },
        {
          text: 'Affrèttement',
          value: 'Afferetement',
        }
      ]
    },
    {
      name: 'service_id',
      placeholder: 'Service',
      type: 'select',
      options: []
    },
    {
      name: 'brand_id',
      placeholder: 'Marque',
      type: 'select',
      options: []
    },
    {
      name: 'gamme_id',
      placeholder: 'Gamme',
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
      name: 'truck_type_id',
      placeholder: 'Type',
      type: 'select',
      options: [],
    },
    {
      name: 'tonnage_id',
      placeholder: 'Tonnage',
      type: 'select',
      options: []
    },
    {
      name: 'carburant',
      placeholder: 'Carburant',
      type: 'select',
      options: [
        {
          text: 'DIESEL',
          value: 'DIESEL',
        },
        {
          text: 'ESSENCE',
          value: 'ESSENCE',
        },
        {
          text: 'HYBRIDE',
          value: 'HYBRIDE',
        },
        {
          text: 'ELECTRIQUE',
          value: 'ELECTRIQUE',
        },
      ],
    },
    {
      name: 'type',
      placeholder: 'Type contrat',
      type: 'select',
      options: [
        {
          text: 'LOCATION',
          value: 'LOCATION',
        },
        {
          text: 'ACHAT',
          value: 'ACHAT',
        },
        {
          text: 'LEASING',
          value: 'LEASING',
        },
      ],
    },
    {
      name: 'de_date_entree',
      placeholder: 'Date entrée : DU',
      type: 'date'
    },
    {
      name: 'a_date_entree',
      placeholder: 'Date entrée : Au',
      type: 'date'
    },
    {
      name: 'de_created_at',
      placeholder: 'Date de céation : Du',
      type: 'date'
    },
    {
      name: 'a_created_at',
      placeholder: 'Date de céation : Au',
      type: 'date'
    }
  ];

  colors = [
    {
      'status': 'En circulation',
      'color': '#0c8040',
    },
    {
      'status': 'REFORME',
      'color': 'red',
    },
    {
      'status': 'En panne',
      'color': '#ee8014',
    },
    {
      'status': 'Vendue',
      'color': '#1a73e7',
    },
  ]

  datafilter : any;
  cities : any;
  parcs : any;
  brands : any;
  modeles : any;
  tonnages : any;
  categories : any;
  services : any;
  types : any;
  gammes : any;
  total : any;

  status : any;
  trucks : any;
  spinner:boolean;
  url = environment.STORAGE + '/document_vehicule/';


  constructor(private route: ActivatedRoute,
              private store: Store<AppState>,
              private vehiculeService : VehiculeService,
              private _router: Router,
              public permissionService: PermissionService
            ) {}

  ngOnInit(): void {
    this.status = this.route.snapshot.params.type;
    console.log('status', this.status);

    this.spinner = true;
    this.vehiculeService.truckBystatus(this.status).subscribe((res:any)=>{
      this.trucks = res.response
      this.spinner = false
      console.log("trucks", this.trucks)
    })

    this.store.select(selectPagination).subscribe(pagination => {
      this.pagination = pagination
    })

    this.store.dispatch(fetchVehicules({data: {status: this.status}, per_page : this.per_page , page : 1}));

    this.store.select(selectEnvVehiculePayload).subscribe((res:any) => {
      console.log('res.data'),
      console.log(res);
      console.log(res.data)
      this.vehicules = res.data;
      console.log("vehicules========>", this.vehicules)
      this.vehiculesFilter = res.data;

    });

    this.store.select(selectEnvVehiculeIsLoading).subscribe((res) => {
      this.spinner = res;
    });

    this.store.select(selectAllCityAgence).subscribe((res) => {
      this.cities = res
      for(var i=0; i<this.cities.length; i++){
        this.inputsFiler["0"].options.push({
          'text' : this.cities[i].name,
          'value' : this.cities[i].id,
        })
      }
    });

    this.store.select(selectEnvbrandPayload).subscribe((res) => {
      console.log(" brand========>", res)
      this.brands = res
      for(var i=0; i<this.brands.length; i++){
        this.extraInputsFilter["2"].options.push({
          'text' : this.brands[i].name,
          'value' : this.brands[i].id,
        })
      }
    });

    this.store.select(selectEnvgammePayload).subscribe((res) => {
      console.log(" gammes========>", res)
      this.gammes = res
      for(var i=0; i<this.gammes.length; i++){
        this.extraInputsFilter["3"].options.push({
          'text' : this.gammes[i].name,
          'value' : this.gammes[i].id,
        })
      }
    });

    this.store.select(selectEnvmodelePayload).subscribe((res) => {
      console.log(" modele========>", res)
      this.modeles = res
      for(var i=0; i<this.modeles.length; i++){
        this.extraInputsFilter["4"].options.push({
          'text' : this.modeles[i].name,
          'value' : this.modeles[i].id,
        })
      }
    });

    this.store.select(selectEnvparcPayload).subscribe((res) => {
      this.parcs = res
      for(var i=0; i<this.parcs.length; i++){
        this.inputsFiler["1"].options.push({
          'text' : this.parcs[i].name,
          'value' : this.parcs[i].id,
        })
      }
    });

    this.store.select(selectEnvtonnagePayload).subscribe((res) => {
      this.tonnages = res
      for(var i=0; i<this.tonnages.length; i++){
        this.extraInputsFilter["7"].options.push({
          'text' : this.tonnages[i].name + 'T',
          'value' : this.tonnages[i].id,
        })
      }
    });

    this.store.select(selectTruckService).subscribe((res) => {
      this.services = res
      for(var i=0; i<this.services.length; i++){
        this.extraInputsFilter["1"].options.push({
          'text' : this.services[i].name,
          'value' : this.services[i].id,
        })
      }
    });

    this.store.select(selectEnvtruckTypePayload).subscribe((res) => {
      this.types = res
      for(var i=0; i<this.types.length; i++){
        this.extraInputsFilter["6"].options.push({
          'text' : this.types[i].name,
          'value' : this.types[i].id,
        })
      }
    });
  }

  filtrer($event){
    console.log("FILTER RDV", $event)
    this.datafilter = $event;
    this.datafilter.status = this.status;
    this.filterData = $event;
    this.filterData.status = this.status;
    this.store.dispatch(fetchVehicules({data: $event, per_page : this.per_page, page : this.p}));
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

  joinService(array){
    return array.map(function(obj) {
      return obj["name"];
    }).join(', ');
  }

  getColorByStatus(status){
    return this.colors.find(i => i.status == status)?.color;
  }

  detailsVehi(uuid) {
    this._router.navigate([`detailsvehicules/${uuid}`]);
  }
}


