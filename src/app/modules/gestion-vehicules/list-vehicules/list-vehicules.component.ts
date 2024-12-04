import { DialogRemplacerComponent } from './dialog-remplacer/dialog-remplacer.component';
import { DialogVehiculesComponent } from './dialog-vehicules/dialog-vehicules.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import {
  selectEnvVehiculePayload,
  selectEnvVehiculeIsLoading,
} from 'app/core/store/vehicule/vehicule.selectors';
import Swal from 'sweetalert2';
import { deleteVehicule, fetchVehicules } from 'app/core/store/vehicule/vehicule.actions';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { VehiculeService } from 'app/core/services/vehicule.service';
import { selectAllCityAgence, selectTruckService } from 'app/core/store/resources/resources.selectors';
import { selectEnvbrandPayload } from 'app/core/store/brand/brand.selectors';
import { selectEnvparcPayload } from 'app/core/store/parc/parc.selectors';
import { selectEnvtonnagePayload } from 'app/core/store/tonnage/tonnage.selectors';
import { selectEnvtruckCategoryPayload } from 'app/core/store/truckCategory/truckCategory.selectors';
import { selectEnvtruckTypePayload } from 'app/core/store/truckType/truckType.selectors';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { RessouresService } from 'app/core/services/ressoures.service';
import { DatePipe } from '@angular/common';
import { selectEnvmodelePayload } from 'app/core/store/modele/modele.selectors';
import { selectEnvgammePayload } from 'app/core/store/gamme/gamme.selectors';
import * as moment from 'moment';
import { PermissionService } from 'app/core/services/permission.service';
import { Paginator } from 'app/core/models/paginator.model';
import { selectPagination } from 'app/core/store/pagination/pagination.selectors';

@Component({
  selector: 'app-list-vehicules',
  templateUrl: './list-vehicules.component.html',
  styleUrls: ['./list-vehicules.component.css'],
})
export class ListVehiculesComponent implements OnInit {
  pagination!: Paginator;
  per_page = 10;
  p: number = 1;
  filterData: any;

  spinner: boolean = false;
  vehicules: any;
  vehiculesFilter: any;
  status = ['REFORME', 'En circulation', 'En panne', 'Vendue'];
  links : any = [];
  filter : FormGroup;
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

  headerColumuns = [
    // 'Date de création',
    // 'Crée par',
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
    'Statut',

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
  datafilter : any

  constructor(
    public dialog: MatDialog,
    private _router: Router,
    private store: Store<AppState>,
    private boGridService : BoGridService,
    private vehiculeService : VehiculeService,
    private ressourceService: RessouresService,
    public datepipe: DatePipe,
    public permissionService: PermissionService
  ) {}

  ngOnInit(): void {
    this.store.select(selectPagination).subscribe(pagination => {
      this.pagination = pagination
    })

    this.store.dispatch(fetchVehicules({data: null, per_page : this.per_page , page : 1}));

    this.store.select(selectEnvVehiculePayload).subscribe((res:any) => {
      console.log('res.data'),
      console.log(res);
      console.log(res.data)
      this.vehicules = res.data;
      console.log("vehicules========>", this.vehicules)
      this.vehiculesFilter = res.data;
      this.links = res.links
      this.total = res.total;
      // console.log("links", this.links)
      // console.log(' vehicules ========>', this.vehicules);
    });

    this.store.select(selectEnvVehiculeIsLoading).subscribe((res) => {
      this.spinner = res;
      // console.log(res);
    });

    // this.setForm();

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
        this.extraInputsFilter["3"].options.push({
          'text' : this.brands[i].name,
          'value' : this.brands[i].id,
        })
      }
    });

    this.store.select(selectEnvgammePayload).subscribe((res) => {
      console.log(" gammes========>", res)
      this.gammes = res
      for(var i=0; i<this.gammes.length; i++){
        this.extraInputsFilter["4"].options.push({
          'text' : this.gammes[i].name,
          'value' : this.gammes[i].id,
        })
      }
    });

    this.store.select(selectEnvmodelePayload).subscribe((res) => {
      console.log(" modele========>", res)
      this.modeles = res
      for(var i=0; i<this.modeles.length; i++){
        this.extraInputsFilter["5"].options.push({
          'text' : this.modeles[i].name,
          'value' : this.modeles[i].id,
        })
      }
    });

    this.store.select(selectEnvparcPayload).subscribe((res) => {
      // console.log(" parc========>", res)
      this.parcs = res
      for(var i=0; i<this.parcs.length; i++){
        this.inputsFiler["1"].options.push({
          'text' : this.parcs[i].name,
          'value' : this.parcs[i].id,
        })
      }
    });

    this.store.select(selectEnvtonnagePayload).subscribe((res) => {
      // console.log(" tonnage========>", res)
      this.tonnages = res
      for(var i=0; i<this.tonnages.length; i++){
        this.extraInputsFilter["7"].options.push({
          'text' : this.tonnages[i].name + 'T',
          'value' : this.tonnages[i].id,
        })
      }
    });

    // this.store.select(selectEnvtruckCategoryPayload).subscribe((res) => {
    //   // console.log(" categories========>", res)
    //   this.categories = res
    //   for(var i=0; i<this.categories.length; i++){
    //     this.inputsFiler["4"].options.push({
    //       'text' : this.categories[i].name,
    //       'value' : this.categories[i].id,
    //     })
    //   }
    // });

    this.store.select(selectTruckService).subscribe((res) => {
      // console.log(" services========>", res)
      this.services = res
      for(var i=0; i<this.services.length; i++){
        this.extraInputsFilter["1"].options.push({
          'text' : this.services[i].name,
          'value' : this.services[i].id,
        })
      }
    });

    this.store.select(selectEnvtruckTypePayload).subscribe((res) => {
      // console.log(" type========>", res)
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
    // this.spinner = true;
    console.log("FILTER RDV", $event)
    this.datafilter = $event;
    this.filterData = $event;
    this.store.dispatch(fetchVehicules({data: $event, per_page : this.per_page, page : this.p}));
    // this.vehiculeService.getTruck($event).subscribe((data) => {
    //   this.spinner = false;
    //     console.log('data retourné ', data);
    //     this.vehicules = data["response"].data;
    //     this.links = data["response"].links;
    //     this.total = data["response"].total;
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

  joinService(array){
    // console.log("array en enter", array)
    return array.map(function(obj) {
      return obj["name"];
    }).join(', ');
  }

  getColorByStatus(status){
    return this.colors.find(i => i.status == status)?.color;
  }

  openDialog(type, item): void {
    this.dialog.open(DialogVehiculesComponent, {
      disableClose: true,
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'full-screen-modal',
      data: { type, item },
    });
  }

  // setForm(){
  //   this.filter = new FormGroup({
  //     type: new FormControl("", Validators.required),
  //   })
  // }

  filterLimitation(){
    console.log("type", this.filter.get("type").value)
    this.vehicules = this.vehiculesFilter
    if(!this.filter.get("type").value ){
      console.log("null value")
      return this.vehiculesFilter;
    }else{
      console.log("existe value")
      this.vehicules = this.vehiculesFilter.filter(v => v.status == this.filter.get("type").value);
      return this.vehicules
    }
  }

  RemplacerDialog(item): void {
    this.dialog.open(DialogRemplacerComponent, {
      disableClose: true,
      width: '831px',
      data: { item },
    });
  }

  detailsVehi(uuid) {
    this._router.navigate([`detailsvehicules/${uuid}`]);
  }

  deletTruck(uuid) {
    console.log('delete');
    console.log(uuid);
    Swal.fire({
      title: 'Êtes-vous sûr(e) de vouloir supprimer Vehicule ?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.store.dispatch(deleteVehicule({ uuid }));
      }
    });
  }
  // getTheNext(event){
  //   console.log("EVENT", event)
  //   this.spinner = true
  //   this.vehiculeService.getTruck(this.datafilter, event).subscribe((res:any)=>{
  //    this.vehicules = res.response.data
  //    this.links = res.response.links
  //    this.total = res.response.total;
  //    this.spinner = false
  //   })
  // }

  exportExcel() {
    const data = [];
    var vehicules = []
    this.ressourceService.getTrucks(this.datafilter).subscribe(
      (res:any) => {
        console.log("data conducteur", res)
        vehicules = res.response;
        for (var i = 0; i < vehicules.length; i++) {
          let vehicule = vehicules[i];
          console.log("DATE FORMAT ", this.datepipe.transform(vehicule.created_at, 'yyyy-MM-dd'))
          let object = {
            Date_création: this.datepipe.transform(vehicule.created_at, 'dd/MM/yyy'),
            Crée_par: vehicule.user?.name,
            Ville: vehicule.city?.name,
            Sous_Parc: vehicule.parc?.name,
            Activité: vehicule.activity,
            Service: this.joinService(vehicule.services),
            Code_interne: vehicule.code_interne,
            Immatriculation: vehicule.matricule,
            Marque: vehicule.brand?.name,
            Gamme: vehicule.gamme?.name,
            Type: vehicule.truck_type.name,
            Tonnage: vehicule.tonnage.name + 'T',
            Modèle: vehicule.modele?.name,
            DMC: this.datepipe.transform(vehicule.date_circulation, 'dd/MM/yyy'),
            Index_kilométrique : vehicule.km_reel + 'KM',
            Carburant: vehicule.carburant,
            Status: vehicule.last_status?.status,
            Date_vente: vehicule.last_status?.date_vente,
            kKilometrage: vehicule.last_status?.kilometrage,
            Type_reforme: vehicule.last_status?.type_reforme,
            Date_entree: vehicule.last_status?.date_entree,
            Date_reforme: vehicule.last_status?.date_reforme,
          };
          data.push(object);
        }
        console.log('data', data);
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
        const wb: XLSX.WorkBook = {
          Sheets: { data: ws },
          SheetNames: ['data'],
        };
        const excelBuffer: any = XLSX.write(wb, {
          bookType: 'xlsx',
          type: 'array',
        });
        this.saveExcelFile(excelBuffer, 'vehicules');
      }
    );
  }

  exportExcelDetails() {
    const data = [];
    var vehicules = []
    this.ressourceService.getTrucks(this.datafilter).subscribe(
      (res:any) => {
        console.log("data conducteur", res)
        vehicules = res.response;
        for (var i = 0; i < vehicules.length; i++) {
          let vehicule = vehicules[i];
          // console.log("DATE FORMAT ", this.datepipe.transform(vehicule.created_at, 'yyyy-MM-dd'))
          let object = {
            Date_création: this.datepipe.transform(vehicule.created_at, 'dd/MM/yyy'),
            Crée_par: vehicule.user?.name,
            Ville: vehicule.city?.name,
            Sous_Parc: vehicule.parc?.name,
            Activité: vehicule.activity,
            Service: this.joinService(vehicule.services),
            Zone: vehicule.zone.name,
            Code_interne: vehicule.code_interne,
            Immatriculation: vehicule.matricule,
            Marque: vehicule.brand?.name,
            Gamme: vehicule.gamme?.name,
            Type: vehicule.truck_type.name,
            Tonnage: vehicule.tonnage.name + 'T',
            Modèle: vehicule.modele?.name,
            // Catégorie: ,
            N_chassis: vehicule.n_chassis,
            Date_sortie: this.datepipe.transform(vehicule.date_sortie, 'dd/MM/yyy'),
            DMC: this.datepipe.transform(vehicule.date_circulation, 'dd/MM/yyy'),
            Couleur: vehicule.color?.name ,
            Nombre_scellé: vehicule.nbr_scelle,
            Index_kilométrique : vehicule.km_reel + 'KM',
            Kilométrage_initial: vehicule.km_initial,
            Carburant: vehicule.carburant,
            consommation_carburant: vehicule.consomation_carburant,
            consommation_reel: vehicule.consomation_carburant_reel,
            CV: vehicule.puissance_fiscale + 'CV',
            Adblue: vehicule.adblue == false ? "Non" : "Oui",
            capacité_consommation: vehicule.capacite_consommation,
            taux_consommation_théorique: vehicule.taux_consommation_theorique,
            taux_consommation_réelle: vehicule.taux_consommation_reel,
            Status: vehicule.last_status?.status,
            Date_vente: vehicule.last_status?.date_vente,
            kKilometrage: vehicule.last_status?.kilometrage,
            Type_reforme: vehicule.last_status?.type_reforme,
            Date_entree: vehicule.last_status?.date_entree,
            Date_reforme: vehicule.last_status?.date_reforme,
          };
          data.push(object);
        }
        console.log('data', data);
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
        const wb: XLSX.WorkBook = {
          Sheets: { data: ws },
          SheetNames: ['data'],
        };
        const excelBuffer: any = XLSX.write(wb, {
          bookType: 'xlsx',
          type: 'array',
        });
        this.saveExcelFile(excelBuffer, 'vehicules');
      }
    );
  }


  saveExcelFile(buffer: any, fileName: string): void {
    const EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';

    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    saveAs.saveAs(data, fileName + EXCEL_EXTENSION);
  }
}
