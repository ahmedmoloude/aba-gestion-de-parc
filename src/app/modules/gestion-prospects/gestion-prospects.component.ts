import { selectSectorActivity } from './../../core/store/resources/resources.selectors';
import { PersonelService } from 'app/core/services/personel.service';
import { selectAllCityAgence } from 'app/core/store/resources/resources.selectors';
import { ProspectsDialogComponent } from './prospects-dialog/prospects-dialog.component';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppState } from 'app/core/store/app.states';
import { Store } from '@ngrx/store';
import {
  selectProspectIsLoading,
  selectProspects,
} from 'app/core/store/prospects/prospects.selectors';
import { fetchProspects } from 'app/core/store/prospects/prospects.actions';
import { ProspectService } from 'app/core/services/prospects.service';
import { FicheDialogComponent } from './fiche-dialog/fiche-dialog.component';
import { environment } from 'environments/environment';
import { ToastService } from 'app/services';
import { PermissionService } from 'app/core/services/permission.service';
@Component({
  selector: 'app-gestion-prospects',
  templateUrl: './gestion-prospects.component.html',
  styleUrls: ['./gestion-prospects.component.css'],
})
export class GestionProspectsComponent implements OnInit {
  ficheUrl = environment.STORAGE + '/fiche_prospect/';
  @Input() merchant_uuid?: string

  inputsFiler = [
    {
      name: 'start_date',
      placeholder: 'Du',
      type: 'date'
    },
    {
      name: 'end_date',
      placeholder: 'Au',
      type: 'date'
    },
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

  ];

  extraInputsFilter = [
    {
      name: 'name',
      placeholder: 'Raison social/Nom du client',
      type: 'text'
    },
    {
      name: 'identity_number',
      placeholder: 'ICE/CIN',
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
      name: 'secteur_activite',
      placeholder: 'Secteur d\'activité',
      type: 'select',
      options: []
    },
    {
      name: 'reference',
      placeholder: 'Référence Prospect',
      type: 'text'
    },
  ];

  headerColumuns = [
    'Ville',
    'Code',
    'Type',
    'Crée le',
    'Prospecté le',
    'Commercial',
    'Raison Social/Nom du prospect',
    'Secteur d\'activité',
    'ICE / CIN',
    // 'Nom',
    'Activité',

    'P.J',
  ];
  ProstpectsAfterFiltre : Array<[]> = []
  lengthOfPropectArray:number = 0
  prospects$ = this.store.select(selectProspects);
  prospects  = [];
  page: number = 1;
  links : any = [];
  cities : any = [];
  commercials : any = [];
  activities : any = [];
  filtres = {
    code : '',
    nom : '',
    type : '',
    ville : '',
    agence : '',
    commercial : ''
  }
  constructor(
    private toast : ToastService,
    public dialog: MatDialog,
    private store: Store<AppState>,
    private prospectService: ProspectService,
    private personelService : PersonelService,
    public permissionService: PermissionService
  ) {}

  prospectLoading = true;
  ngOnInit(): void {
     this.prospectLoading = true;
     this.prospectService.getProspects('', 1 ,this.merchant_uuid).subscribe((response:any)=>{
     this.prospects = response.response.data
     console.log("PROSPECT", this.prospects)
     this.links = response.response.links
     this.prospectLoading = false;
  })

  this.store.select(selectAllCityAgence).subscribe((res) => {
    this.cities = res;
    for(var i=0; i<this.cities.length; i++){
      this.inputsFiler["2"].options.push({
        'text' : this.cities[i].name,
        'value' : this.cities[i].id,
      })
    }
  });

  this.personelService.personnelbyFunction(null, 'COMMERCIAL').subscribe( (data: any) => {
      console.log('data Commerciale', data);
      this.commercials =  data.response;
      for(var i=0; i<this.commercials.length; i++){
        this.inputsFiler["3"].options.push({
          'text' : this.commercials[i].first_name + ' ' + this.commercials[i].last_name,
          'value' : this.commercials[i].id,
        })
      }
  });

  this.store.select(selectSectorActivity).subscribe((res) => {
    this.activities = res;
    console.log("SECTOR ACTIVITY", res)
    for(var i=0; i<this.activities.length; i++){
      this.extraInputsFilter["3"].options.push({
        'text' : this.activities[i].title,
        'value' : this.activities[i].id,
      })
    }
    console.log("SECTEUR ACTIVITY", this.activities)
  });

  }

  filter($event){
    this.prospectLoading = true;
    // console.log("FILTER CONTACT", $event)
    this.prospectService.getProspects($event).subscribe((data) => {
      this.prospectLoading = false;
        console.log('data retourné ', data);
        this.prospects = data["response"].data;
        this.links = data["response"].links;
    })
  }

  joinedData(data){
   return data.map(item => item.name ? item.name : item.title).join(', ');
  }

  openDialog(edit_mode = false, customer?): void {
    const dialogRef = this.dialog.open(ProspectsDialogComponent, {
      disableClose: true,
      width: '1224px',
      data: {
        edit_mode: edit_mode,
        customer: customer,
        from_prospect : true,
      },
    });


    dialogRef.afterClosed().subscribe((data) => {
      console.warn('input data', data);
      if (data) {
        this.prospectLoading = true;
        this.prospectService.getProspects('', 1 ,this.merchant_uuid).subscribe((response : any) => {
          this.prospects = response.response.data
          console.log("PROSPECT", this.prospects)
          this.links = response.response.links
          this.prospectLoading = false;
        });
      }
    });
  }
  getProspect(){
  this.prospectLoading = true;
  this.prospectService.filtre(this.filtres).subscribe(response=>{
    this.prospects = response.response.data
    console.log("PROSPECT", this.prospects)
    this.links = response.response.links
    this.prospectLoading = false;
  })
  }
  openEditDialog(prospect): void {
    this.dialog.open(ProspectsDialogComponent, {
      disableClose: true,
      width: '1224px',
      data: {
        id: prospect.id,
        editMode: true,
        name: prospect.name,
        phone: prospect.phone,
        email: prospect.email,
        Social_reason: prospect.Social_reason,
        Adress_1: prospect.Adress_1,
        Adress_2: prospect.Adress_2,
        ICE: prospect.ICE,
        potentiel: prospect.potentiel,
        activity_id: prospect.activity_id,
        city_id: prospect.city_id,
        type: prospect.type,
      },
    });
  }

  convertProspct(id) {
    this.prospectLoading = true;
    this.prospectService.convertProspect({ id }).subscribe((res) => {
      // this.store.dispatch(fetchProspects());
      //TODO: to be fixed
      this.prospectService.getProspects('', 1 ,this.merchant_uuid).subscribe((response : any) => {
        this.prospects = response.response.data
        console.log("PROSPECT", this.prospects)
        this.links = response.response.links
        this.prospectLoading = false;
        this.toast.success('Le prospect a été converter avec succès')
      });
    }, (err) => {
      console.log('error', err)
      this.prospectLoading = false
      this.toast.error(err?.error.message || 'Une erreur est survenue lors du conversion du prospect')
    });
  }
  getTheNext(link){
    if(link.url.length > 40){
      var page = link.url.substr(41)
      this.prospectLoading = true ;
      this.prospectService.getProspects('', page , this.merchant_uuid).subscribe(
        (response:any) => {
          this.prospects = Object.values(response.response.data)
          this.prospectLoading = false
          this.links = response.response.links
        },
        (error) => {
          console.log('error', error);
        }
      );
    }
    else {
      var page = link.url.substr(6)
      this.prospectLoading = true ;
      this.prospectService.filtre(this.filtres,page).subscribe(
        (response:any) => {
          this.prospects = Object.values(response.response.data)
          this.prospectLoading = false
          this.links = response.response.links
        },
        (error) => {
          console.log('error', error);
        }
      );
    }


  }

  viewPdf(item){
    window.open(this.ficheUrl+item.last_fiche.uuid+'.pdf', '_blank');
    // this.dialog.open(FicheDialogComponent, {
    //   disableClose: true,
    //   width: '1224px',
    //   data: {},
    // });
  }

  onFileSelected(event, uuid) {
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      return;
    }

    console.log('here....');

    let formData = new FormData();

    // add image to form data
    formData.append('attached_piece', event.target.files[0]);
    formData.append('uuid', uuid);

    // this.l = true;
    this.prospectLoading = true;
    this.prospectService.uploadProspectFiche(formData).subscribe(
      (res) => {
        this.prospectService.getProspects('', 1 ,this.merchant_uuid).subscribe((response:any)=>{
          this.prospects = response.response.data
          console.log("PROSPECT", this.prospects)
          this.links = response.response.links
          this.prospectLoading = false;
       })
      },
      (err) => {
        this.prospectLoading = false;

        // this.spinner = false;
        // this._toast.error('Erreur lors de uploa');
      }
    );
  }


  download(doc, id) {
    let doc_path =
      environment.STORAGE + '/fiche_prospection/' + id + '/' + doc;
    window.open(doc_path, '_blank');
  }

  deleteProspectFiche(id){
    this.prospectLoading = true;
    this.prospectService.deleteProspectFiche(id).subscribe((res) =>{
      this.prospectService.getProspects('', 1 ,this.merchant_uuid).subscribe((response:any)=>{
        this.prospects = response.response.data
        console.log("PROSPECT", this.prospects)
        this.links = response.response.links
        this.prospectLoading = false;
     })
    } , (err) =>{
      this.prospectLoading = false;
    })
  }
}
