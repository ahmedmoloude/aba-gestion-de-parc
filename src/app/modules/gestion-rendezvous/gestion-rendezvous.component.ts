import { ParametreService } from 'app/core/services/parametre.service';
import { environment } from './../../../environments/environment';
import { PersonelService } from './../../core/services/personel.service';
import { VoirhistoriqueComponent } from './../gestion-rdvs/voirhistorique/voirhistorique.component';
import { Component, Input, OnInit } from '@angular/core';
import { RendezvousAddComponent } from './rendezvous-add/rendezvous-add.component';
import { RendezvousEditComponent } from './rendezvous-edit/rendezvous-edit.component';
import { ToastService } from './../../core';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
// import {
//   selectEnvPayload,
//   selectEnvIsLoading,
// } from 'app/core/store/comercialActivity/comercialActivity.selectors';
// import { deleteActivity } from 'app/core/store/comercialActivity/comercialActivity.actions';
import { deleterdv } from 'app/core/store/rdv/rdv.actions';
import {
  selectEnvRDVIsLoading,
  selectEnvRDVPayload,
} from 'app/core/store/rdv/rdv.selectors';
import { ActivityService } from 'app/core/services/activity.service';
import { Config } from 'app/config';
import { PermissionService } from 'app/core/services/permission.service';

@Component({
  selector: 'app-gestion-rendezvous',
  templateUrl: './gestion-rendezvous.component.html',
  styleUrls: ['./gestion-rendezvous.component.css'],
})
export class GestionRendezvousComponent implements OnInit {
  inputsFiler = [
    {
      name: 'subject',
      placeholder: 'Titre',
      type: 'text'
    },
    {
      name: 'startTime',
      placeholder: 'Date début',
      type: 'date'
    },
    {
      name: 'endTime',
      placeholder: 'Date fin',
      type: 'date'
    },
    {
      name: 'status',
      placeholder: 'Statut',
      type: 'select',
      options: [
        {
          text: 'Planifié',
          value: 'Planifié',
        },
        {
          text: 'Honoré',
          value: 'Honoré',
        },
        {
          text: 'Non honoré',
          value: 'Non Honoré',
        },
        {
          text: 'Reporté',
          value: 'Reporte',
        },
        {
          text: 'Annulé',
          value: 'Annulé',
        },
      ],
    },
    {
      name: 'customer_id',
      placeholder: 'Client/Prospect',
      type: 'select',
      keys: ['code', 'name'],
      apiUrl: `${Config.api.customers.searchList}?type=prospect&search=`,
      options: []
    },

  ];

  extraInputsFilter = [
    {
      name: 'user_id',
      placeholder: 'Commercial',
      type: 'select',
      options: []
    },
    {
      name: 'is_prospect',
      placeholder: 'Type client',
      type: 'select',
      options: [
        {
          text: 'Tout',
          value: '-1',
        },
        {
          text: 'Client',
          value: '0',
        },
        {
          text: 'Prospect',
          value: '1',
        },
      ],
    },
    {
      name: 'type',
      placeholder: 'Type',
      type: 'select',
      options: []
    },
    {
      name: 'priority',
      placeholder: 'Importance',
      type: 'select',
      options: [
        {
          text: 'Urgent',
          value: 'Urgent',
        },
        {
          text: 'Normal',
          value: 'Normal',
        },
        {
          text: 'Faible',
          value: 'Faible',
        },
      ]
    },
    {
      name: 'motif',
      placeholder: 'Motif',
      type: 'select',
      options: []
    },
    {
      name: 'location',
      placeholder: 'Lieu',
      type: 'text'
    },
  ]

  @Input() merchant_uuid?: string;
  headerColumuns = [
    'Titre',
    'Date début',
    'Date fin',
    'Client/Prospect',
    'Type',
    'Importance',
    'Statut',
    'Assigné à',
    'Description',
    'Motif',
    'P.J'
  ];
  page: number = 1;
  rendezVous: any;
  spinner: boolean = false;
  links : any = [];
  client : any = [];
  user : any = [];
  url = environment.STORAGE + '/comercial_activity/';
  motifs :any = [];
  types :any = [];
  // colors = [
  //   {'Plannifié': '#1a73e7',
  //   'Honoré': '#ffa500',
  //   'Non Honoré': '#1a73e7',
  //   'Annulé': '#ff0000',
  //   'Tâche': '#905ce0'
  // }
  // ]

  colors = [
    {
      'status': 'Planifié',
      'color': '#1a73e7',
    },
    {
      'status': 'Honoré',
      'color': '#0c8040',
    },
    {
      'status': 'Non Honoré',
      'color': '#ffa500',
    },
    {
      'status': 'Annulé',
      'color': '#ff0000',
    },
  ]
  datafilter : any;

  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog,
    private boGridService: BoGridService,
    private activityService: ActivityService,
    private _toast: ToastService,
    private personelService : PersonelService,
    private parameterService: ParametreService,
    public permissionService: PermissionService
  ) {}


  getColorByStatus(status){
    return this.colors.find(i => i.status == status).color;
  }
  ngOnInit(): void {

    this.spinner = true;

    // this.boGridService.getCustomersProspects().subscribe((data) => {
    //   console.log("data client ",data)
    //   this.client = data["response"];
    //   for(var i=0; i<this.client.length; i++){
    //     this.inputsFiler["4"].options.push({
    //       'text' : this.client[i].name,
    //       'value' : this.client[i].id,
    //     })
    //   }
    // });

    this.personelService.personnelbyFunction(null, 'COMMERCIAL').subscribe(
      (data:any) => {
        this.user = data.response;
        console.log("this.user", this.user)
        for(var j=0; j<this.user.length; j++){
          this.extraInputsFilter["0"].options.push({
            'text' : this.user[j].first_name + ' ' + this.user[j].last_name,
            'value' : this.user[j].id,
          })
        }
      });

    this.activityService.getRdvv().subscribe((data) => {
      this.spinner = false;
      console.log('data retourné ', data);
      this.rendezVous = data["response"].data;
      this.links = data["response"].links;
    })

    this.parameterService.getTypeRdv().subscribe((res) => {
      this.types = res['response'];
      console.log('types', this.types);
      for(var i=0; i<this.types.length; i++){
        this.extraInputsFilter["2"].options.push({
          'text' : this.types[i].libelle,
          'value' : this.types[i].libelle,
        })
      }
    });

    this.parameterService.getMotif().subscribe((data) => {
      this.spinner = false;
      this.motifs = data["response"];
      console.log("MOTIFS", this.motifs)
      for(var i=0; i<this.motifs.length; i++){
        this.extraInputsFilter["4"].options.push({
          'text' : this.motifs[i].name,
          'value' : this.motifs[i].name,
        })
      }
    });

    // this.store.select(selectEnvRDVPayload).subscribe((res: any) => {
    //   this.rendezVous = res.data;
    //   //TODO temporary

    //   if (this.merchant_uuid) {
    //     this.rendezVous = this.rendezVous?.filter(
    //       (x) => x.user.uuid === this.merchant_uuid
    //     );
    //   }
    //   // this.rendezVous = this.rendezVous.filter(rdv => rdv.typeActivity == 'RDV');
    //   console.log('rendezVous', this.rendezVous);
    //   this.links = res.links;
    // });

    // this.store.select(selectEnvRDVIsLoading).subscribe((res) => {
    //   this.spinner = res;
    // });
  }

  getTheNext(event) {
    this.spinner = true;
    console.log("EVENT", event)
    this.activityService.getRdvv(this.datafilter,event).subscribe((res: any) => {
      this.spinner = false;
      console.log(res.response.data);
      this.rendezVous = res.response.data;
      this.links = res.response.links;
      this.spinner = false;
    });
  }

  deletTask(uuid) {
    Swal.fire({
      title: 'Êtes-vous sur(e) de vouloir supprimer ce rendez-vous?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        // this.store.dispatch(deleterdv({ uuid }));
        this.activityService.deleteActivity(uuid).subscribe(
          (data) => {
            console.log('delet', data),
            this._toast.success('GPS supprimé avec succès!');
            this.rendezVous = this.rendezVous.filter(function(obj) {
              return obj.uuid !== uuid;
            });
          },
          (error) => {
            console.log('error', error);
            this._toast.error('Une erreur est survenue lors de la suppression de Carte !');
          });
      } else {
      }
    });
  }

  filter($event){
    this.spinner = true;
    console.log("FILTER RDV", $event)
    this.datafilter = $event;
    this.activityService.getRdvv($event).subscribe((data) => {
      this.spinner = false;
        console.log('data retourné ', data);
        this.rendezVous = data["response"].data;
        this.links = data["response"].links;
    })
  }

  openDialog(client, user): void {
    const dialogRef = this.dialog.open(RendezvousAddComponent, {
      disableClose: true,
      width: '831px',
      data: {client, user},
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        console.log("data", data)
        this.rendezVous.unshift(data);
      }
    });
  }

  openDialogEdit(task, client, user): void {
    const dialogRef = this.dialog.open(RendezvousEditComponent, {
      disableClose: true,
      width: '831px',
      data: { task, client, user },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        console.log("data", data)
        this.rendezVous = this.rendezVous.filter(function(obj) {
          return obj.uuid !== task.uuid;
        });
        this.rendezVous.unshift(data);
      }
    });
  }

  Voirhistorique(item) {
    this.dialog.open(VoirhistoriqueComponent, {
      disableClose: true,
      width: '890px',
      height: '100vh',
      data: { item },
      position: { right: '0px' },
    });
  }


}
