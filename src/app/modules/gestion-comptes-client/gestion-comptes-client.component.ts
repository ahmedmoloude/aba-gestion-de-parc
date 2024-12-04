import { selectEnvPayloadAgence } from './../../core/store/agence/agence.selectors';
import { PersonelService } from 'app/core/services/personel.service';
import { selectAllCityAgence } from 'app/core/store/resources/resources.selectors';
import { selectSectorActivity } from './../../core/store/resources/resources.selectors';
import { ClientComponent } from './client-dialog/client-dialog.component';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { Customer } from 'app/core/services/customer.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'environments/environment';
import { updatePagination } from 'app/core/store/pagination/pagination.actions';
import { Paginator } from 'app/core/models/paginator.model';
import { selectPagination } from 'app/core/store/pagination/pagination.selectors';
import { PermissionService } from 'app/core/services/permission.service';

@Component({
  selector: 'app-gestion-comptes-client',
  templateUrl: './gestion-comptes-client.component.html',
  styleUrls: ['./gestion-comptes-client.component.css'],
})
export class GestionComptesClientComponent implements OnInit {

  is_loading: false;
  @Input() merchant_uuid?: string;
  data: any[];

  pagination!: Paginator;
  per_page = 10;
  inputsFiler = [
    {
      name: 'city_id',
      placeholder: 'Ville',
      type: 'select',
      options: []
    },
    {
      name: 'commercial_id',
      placeholder: 'Commercial',
      type: 'select',
      options: []
    },
    {
      name: 'type',
      placeholder: 'Type',
      type: 'select',
      options: [
        {
          text: 'Entreprise',
          value: 'entity',
        },
        {
          text: 'Particulier',
          value: 'individual',
        }
      ]
    },
    {
      name: 'name',
      placeholder: 'Raison sociale/Nom client',
      type: 'text'
    },
    {
      name: 'phone',
      placeholder: 'Téléphone',
      type: 'text'
    },
  ];

  extraInputsFilter = [
    {
      name: 'secteur_activite',
      placeholder: 'Secteur d\'activité',
      type: 'select',
      options: []
    },
    {
      name: 'identity_number',
      placeholder: 'ICE/CIN',
      type: 'text'
    },
    {
      name: 'reference',
      placeholder: 'Référence',
      type: 'text'
    },

    {
      name: 'nature_transport',
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
      name: 'agency_id',
      placeholder: 'Agence',
      type: 'select',
      options: [],
    },
    {
      name: 'return_fund_management',
      placeholder: 'Gestion CRBT',
      type: 'select',
      options: [
        {
          text: 'Chèque',
          value: 'Check',
        },
        {
          text: 'Virement',
          value: 'bank_transfer',
        },
      ],
    },
    {
      name: 'is_active',
      placeholder: 'Actif',
      type: 'select',
      options: [
        {
          text: 'Activer',
          value: 'true',
        },
        {
          text: 'Désactiver',
          value: 'false',
        },
      ],
    },
    {
      name: 'GMS',
      placeholder: 'GMS',
      type: 'select',
      options: [
        {
          text: 'Oui',
          value: 'true',
        },
        {
          text: 'Non',
          value: 'false',
        },
      ],
    },
  ];
  headerColumuns = [
    'Code',
    'Nom/Raison Social',
    'Type',
    'Type de contrat',
    "Secteur d'activité",
    "Secteur commercial",
    "Zone",
    "Agence de rattachement",
    'Ville',
    'Téléphone',
    'E-mail',
    'ICE/CIN',
    'Actif',
    'Visible',
    'GMS',
    'Retour CRBT',
  ];
  page: number = 1;
  filtres = {
    code: '',
    name: '',
    type: '',
  };
  links: any = [];
  cities : any = [];
  commercials : any = [];
  activities : any = [];
  agences : any = [];
  spinner: boolean = false;
  datafilter : any;


  pageParamItems =[10 , 15 , 20 , 25 , 30]

  constructor(
    private domSanitizer : DomSanitizer,
    private _router: Router,
    public dialog: MatDialog,
    private http: HttpClient,
    private customerservice: Customer,
    private store: Store<AppState>,
    private personelService : PersonelService,
    public permissionService: PermissionService
  ) {}

  filter($event){
    this.spinner = true;
    console.log("FILTER CONTACT", $event)
    this.datafilter = $event
    this.customerservice.getCustomer($event, 1, '' , this.per_page).subscribe((res) => {
        this.spinner = false;
        console.log('data retourné ', res);
        this.data = res.response.data;
        this.links = res.response.links;

        this.store.dispatch(updatePagination({
          currentPage: res.response.current_page,
          pageSize: res.response.per_page,
          totalItems: res.response.total
         }));
        // this.links = data["response"].links;
    })
  }

  ngOnInit(): void {

    this.store.select(selectPagination).subscribe(pagination => {
      this.pagination = pagination

    })


    this.spinner = true;
    this.customerservice.getCustomer(null, 1, this.merchant_uuid).subscribe((res) => {

      this.store.dispatch(updatePagination({
        currentPage: res.response.current_page,
        pageSize: res.response.per_page,
        totalItems: res.response.total
       }));
      this.data = res.response.data;
      this.links = res.response.links;
      this.spinner = false;
    });


    this.store.select(selectAllCityAgence).subscribe((res) => {
      this.cities = res;
      for(var i=0; i<this.cities.length; i++){
        this.inputsFiler["0"].options.push({
          'text' : this.cities[i].name,
          'value' : this.cities[i].id,
        })
      }
    });

    this.personelService.personnelbyFunction(null, 'COMMERCIAL').subscribe( (data: any) => {
        console.log('data Commerciale', data);
        this.commercials =  data.response;
        for(var i=0; i<this.commercials.length; i++){
          this.inputsFiler["1"].options.push({
            'text' : this.commercials[i].first_name + ' ' + this.commercials[i].last_name,
            'value' : this.commercials[i].id,
          })
        }
    });

    this.store.select(selectSectorActivity).subscribe((res) => {
      this.activities = res;
      for(var i=0; i<this.activities.length; i++){
        this.extraInputsFilter["0"].options.push({
          'text' : this.activities[i].title,
          'value' : this.activities[i].id,
        })
      }
      console.log("SECTEUR ACTIVITY", this.activities)
    });

    this.store.select(selectEnvPayloadAgence).subscribe((res) => {
      this.agences = res;
      for(var i=0; i<this.agences.length; i++){
        this.extraInputsFilter["4"].options.push({
          'text' : this.agences[i].name,
          'value' : this.agences[i].id,
        })
      }
      console.log("SECTEUR ACTIVITY", this.activities)
    });

  }
  getClients() {
    // this.spinner = true;
    // this.customerservice.getCustomerByFiltre(this.filtres).subscribe((res) => {
    //   console.log('customers', res);
    //   this.data = res.response;
    //   this.spinner = false;
    // });
  }

  goToEditPage(uuid) {
    this._router.navigate(['edit_customer', uuid]);
  }

  goToDetailPage(uuid) {
    this._router.navigate(['edit_customer', uuid , {  detailMode : true }]);
  }

  openDialog(edit_mode = false): void {
    this._router.navigate(['fiche_customer']);
  }

  getTheNext(event) {
    console.log('go to the next page')
    this.spinner = true;
    this.customerservice.getCustomer(this.datafilter, event, this.merchant_uuid).subscribe(
      (response: any) => {
        this.data = Object.values(response.response.data);
        // this.links = response.response.links
        this.spinner = false;
      },
      (error) => {
        console.log('error', error);
      }
    );
  }


  logoSrc(client){
    if(client.logo_path){
      return  environment.STORAGE + '/logo/' + client.id + '/' + client.logo_path
    }
    else{
      return '../../../assets/img/user.png'
    }
  }

  transform(url) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
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

    this.customerservice.getCustomer(this.datafilter, paginator.nextPage, this.merchant_uuid , $event.rows).subscribe((res) => {

      this.store.dispatch(updatePagination({
        currentPage: res.response.current_page,
        pageSize: res.response.per_page,
        totalItems: res.response.total
       }));
      this.data = res.response.data;
      this.links = res.response.links;
      this.spinner = false;
    });
  }
}
