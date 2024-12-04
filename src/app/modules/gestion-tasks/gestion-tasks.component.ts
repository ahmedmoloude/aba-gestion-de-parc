import { environment } from './../../../environments/environment';
import { PersonelService } from 'app/core/services/personel.service';
import { VoirhistoriqueComponent } from './../gestion-rdvs/voirhistorique/voirhistorique.component';
import { TasksDialogComponent } from './tasks-dialog/tasks-dialog.component';
import { Component, Input, OnInit } from '@angular/core';

import { ToastService } from './../../core';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { ActivityService } from 'app/core/services/activity.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { TasksEditDialogComponent } from './tasks-edit-dialog/tasks-edit-dialog.component';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import {
  selectEnvPayload,
  selectEnvIsLoading,
} from 'app/core/store/comercialActivity/comercialActivity.selectors';
import {
  selectEnvtaskPayload,
  selectEnvtaskIsLoading,
} from 'app/core/store/task/task.selectors';
import { deleteActivity } from 'app/core/store/comercialActivity/comercialActivity.actions';
import { deleteTask } from 'app/core/store/task/task.actions';
import { fetchTask } from 'app/core/store/task/task.actions';
import { Config } from 'app/config';
import { PermissionService } from 'app/core/services/permission.service';
@Component({
  selector: 'app-gestion-tasks',
  templateUrl: './gestion-tasks.component.html',
  styleUrls: ['./gestion-tasks.component.css'],
})
export class GestionTasksComponent implements OnInit {
  @Input() merchant_uuid?: string;
  headerColumuns = [
    'Titre',
    'Date début',
    'Date fin',
    'Client/Prospect',
    'Importance',
    'Statut',
    'Assigné à',
    'Description',
    'P.J'
  ];
  links: any = [];
  page: number = 1;
  tasks: any;
  spinner: boolean = false;
  client : any = [];
  user : any = [];
  url = environment.STORAGE + '/comercial_activity/';

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
          text: 'A faire',
          value: 'A faire',
        },
        {
          text: 'En cours',
          value: 'En cours',
        },
        {
          text: 'Termine',
          value: 'Termine',
        },
      ]
    },
    {
      name: 'customer_id',
      placeholder: 'Client/Prospect',
      type: 'select',
      keys: ['code', 'name'],
      apiUrl: `${Config.api.customers.searchList}?type=prospect&search=`,
      options: []
    },
  ]

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
      name: 'location',
      placeholder: 'Lieu',
      type: 'text'
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
    public permissionService: PermissionService
  ) {}

  filter($event){
    this.spinner = true;
    // console.log("FILTER RDV", $event)
    $event.type = "Task";
    // console.log("FILTER RDV", $event)
    this.datafilter = $event
    this.activityService.getTask($event).subscribe((data) => {
      this.spinner = false;
        // console.log('data retourné ', data);
        this.tasks = data["response"].data;
        this.links = data["response"].links;
    })
    // this.activityService.filterComercialActivity($event).subscribe((data) => {
    //   console.log('data retourné ', data);
    // })
  }

  ngOnInit(): void {

    this.spinner = true
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

      this.activityService.getTask().subscribe((res:any)=>{
        this.spinner = false;
        console.log(res.response.data)
        this.tasks = res.response.data;
        this.links = res.response.links;
        this.spinner = false;
      });

    // this.store.select(selectEnvtaskPayload).subscribe((res:any) => {
    //   console.log("res", res.data)
    //   console.log("links", res.links)
    //   this.tasks = res.data
    //   if (this.merchant_uuid) {
    //     this.tasks = this.tasks.filter((t) => t.user.id === this.merchant_uuid);
    //   }
    //   // this.tasks = res.data || [];
    //   // this.tasks = this.tasks.filter(rdv => rdv.typeActivity == 'Task');
    //   console.log('task', this.tasks);
    //   this.links = res.links;
    // });

    // this.store.select(selectEnvtaskIsLoading).subscribe((res) => {
    //   this.spinner = res;
    // });
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

  getTheNext(event){
    console.log("EVENT", event)
    this.spinner = true
    this.activityService.getTask(this.datafilter, event).subscribe((res:any)=>{
      this.spinner = false;
      console.log(res.response.data)
      this.tasks = res.response.data;
      this.links = res.response.links;
      this.spinner = false;
    });
  }

  deletTask(uuid) {
    //console.log(uuid)
    Swal.fire({
      title: 'Êtes-vous sur(e) de vouloir supprimer tâche ?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        // this.store.dispatch(deleteTask({ uuid }));
        this.activityService.deleteActivity(uuid).subscribe(
          (data) => {
            console.log('delet', data),
              this._toast.success('GPS supprimé avec succès!');
              this.tasks = this.tasks.filter(function(obj) {
                return obj.uuid !== uuid;
              });
          },
          (error) => {
            console.log('error', error);
            this._toast.error('Une erreur est survenue lors de la suppression de Carte !');
          });
      }
    });
  }

  openDialog(client, user): void {
    const dialogRef = this.dialog.open(TasksDialogComponent, {
      disableClose: true,
      width: '831px',
      data: {client, user},
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        console.log("data", data)
        this.tasks.unshift(data);
      }
    });
  }

  openDialogEdit(task, client, user): void {
    const dialogRef = this.dialog.open(TasksEditDialogComponent, {
      disableClose: true,
      width: '831px',
      data: { task, client, user},
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        console.log("data", data)
        this.tasks = this.tasks.filter(function(obj) {
          return obj.uuid !== task.uuid;
        });
        this.tasks.unshift(data);
      }
    });
  }
}
