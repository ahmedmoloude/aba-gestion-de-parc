import { PersonelService } from './../../core/services/personel.service';
import { DialogRdvComponent } from './dialog-rdv/dialog-rdv.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VoirhistoriqueComponent } from './voirhistorique/voirhistorique.component';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { AppState } from 'app/core/store/app.states';
import {
  EventSettingsModel,
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  PopupOpenEventArgs,
  PopupCloseEventArgs,
  DragAndDropService,
  DragEventArgs ,
  AgendaService,
  ResizeService,

  ActionEventArgs
} from '@syncfusion/ej2-angular-schedule';
import { L10n } from '@syncfusion/ej2-base';
import {
  ScheduleComponent,
  EventRenderedArgs,
} from '@syncfusion/ej2-angular-schedule';
import { ViewEncapsulation, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivityService } from 'app/core/services/activity.service';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { ToastService } from './../../core';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { DateTimePicker } from '@syncfusion/ej2-calendars';
import { combineLatest } from 'rxjs';
import { AuthService, TokenService } from './../../core';
import { loadCldr } from '@syncfusion/ej2-base';
// import * as GC from '@grapecity/spread-sheets';
// import * as Excel from '@grapecity/spread-excelio';
import { saveAs } from 'file-saver';
// import { act } from '@ngrx/effects';
import * as moment from 'moment';
// import { Console } from 'console';
import { SharedAutcompleteComponent } from 'app/shared/components/shared-autcomplete/shared-autcomplete.component';
// import { createViewChildren } from '@angular/compiler/src/core';
import { ParametreService } from 'app/core/services/parametre.service';
import * as XLSX from 'xlsx';
import { PermissionService } from 'app/core/services/permission.service';

// loadCldr(
//   require('cldr-data/supplemental/numberingSystems.json'),
//   require('cldr-data/main/fr/ca-gregorian.json'),
//   require('cldr-data/main/fr/numbers.json'),
//   require('cldr-data/main/fr/timeZoneNames.json')
// );

L10n.load({
  fr: {
    schedule: {
      saveButton: 'Enregistrer',
      editButton: 'Modifier',
      cancelButton: 'Fermer',
      deleteButton: 'Supprimer',
      newEvent: 'Créer un événement',
      moreDetails: 'Plus de détails',
      today: "Aujourd'hui",
      week: 'Semaine',
      workWeek: 'Semaine Ouvrable',
      month: 'Mois',
      editEvent: "Modifier l'événement",
      deleteEvent: "Supprimer l'événement",
      deleteContent: 'Voulez-vous vraiment supprimer cet événement ?',
      cancel: 'Annuler',
      delete: 'Supprimer',
      edit: 'Modifier',
    },
  },
});

@Component({
  selector: 'app-gestion-rdvs',
  templateUrl: './gestion-rdvs.component.html',
  styleUrls: ['./gestion-rdvs.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [DayService, WeekService, WorkWeekService, MonthService, DragAndDropService],
})
export class GestionRdvsComponent implements OnInit {
  @ViewChildren(SharedAutcompleteComponent)
  searchComponents: QueryList<SharedAutcompleteComponent>;
  export: FormGroup;
  dataClients: any = [];
  showPopup = false;
  showMotif = false;
  selectedClient = null;
  dropDownStyle = {
    'border-radius': 0,
    border: 'none',
    'border-bottom': '1px solid rgba(0, 0, 0, 0.42)',
  };
  rdv: any;
  duration: any;
  rendezVous: any;
  tasks: any;
  client: any;
  user: any;
  rdvType: boolean = true;
  tacheType: boolean = false;
  urgent: boolean = false;
  typeAdd = 'Rendez-vous';
  aff = new Array();
  allRDVTask = new Array();
  spinnerGetAllData: boolean = false;
  spinnerNavigate: boolean = false;
  spinnerForm: boolean = true;
  userAuth: any;
  userAuyhentifie: any;
  edit: boolean = false;
  users: any;
  spreadBackColor = 'aliceblue';
  types: any = [];
  hostStyle = { width: '10vw', height: '5vh' };
  userFilter: any;
  excel: boolean = false;
  start_date: any;
  end_date: any;
  start_time: any;
  end_time: any;
  start_time_6: any;
  end_time_6: any;
  private spread;
  private excelIO;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private store: Store<AppState>,
    private datePipe: DatePipe,
    private activityService: ActivityService,
    private boGrid: BoGridService,
    private _toast: ToastService,
    public authService: AuthService,
    private token: TokenService,
    private parameterService: ParametreService,
    public dialog: MatDialog,
    private personelService: PersonelService,
    public permissionService: PermissionService
  ) {
    // this.spread = new GC.Spread.Sheets.Workbook();
    // this.excelIO = new Excel.IO();
  }

  setDateDebut(e) {
    // console.log("DATE DEBUT", e.target.value)
    this.start_time = e.target.value;
    this.start_time_6 = moment(this.start_time)
      .add(6, 'months')
      .format('yyyy-MM-DD');
    // console.log(moment(this.start_time).add(6, 'months').format('yyyy-MM-DD'));
  }

  onDragStart(args: DragEventArgs): void {
    // console.log('Drag Start Triggered', args);

  }
  onDragStop(args: DragEventArgs): void {
    // console.log('Drag Stop Triggered', args);
    console.log('DATA', args.data);
    // console.log('Drag Stop Triggered', args.data.uuid);
    console.log('TYPE ACTIVITY', args.data.typeActivity);
    this.spinnerGetAllData = true;
      const today = moment();
      console.log(
        today.startOf('week').format('yyyy-MM-DD'),
        today.endOf('week').format('yyyy-MM-DD')
      );
      // console.log(args.data['typeActivity']);
        // console.log("ARGS CHANGE ", args.data)
        // this.searchComponents.toArray()[0].selectObject(this.dataClients.filter(c => c.id == args.data['customer_id']))
        this.rdv = {
          description: args.data['Description'],
          endTime: this.datePipe.transform(
            args.data['EndTime'],
            'yyyy-MM-dd HH:mm:ss'
          ),
          startTime: this.datePipe.transform(
            args.data['StartTime'],
            'yyyy-MM-dd HH:mm:ss'
          ),
          motif: args.data['motif'],
          status: args.data['Status'],
          subject: args.data['Subject'],
          location: args.data['Location'],
          type: args.data['type'],
          // customer_id: args.data['customer_id'],
          customer_id: args.data['customer_id'],
          user_id: args.data['user_id'],
          priority: args.data['priority'],
          typeActivity:
            'App\\Modules\\ComercialActivity\\Models\\ComercialActivity',
          rdvOrTache: args.data['typeActivity'],
        };
        console.log('edit rdv 2222', this.rdv);
        this.activityService.updateActivity(this.rdv, args.data['uuid']).subscribe(
            (data) => {
              this.spinnerGetAllData = true;
              this.aff = [];
              this.activityService.getActivityByUser(this.userFilter).subscribe(
                (data) => {
                  console.log('task rdv retourné ', data['response']);
                  this.rendezVous = data['response'];
                  for (var i = 0; i < this.rendezVous.length; i++) {
                    let activity = this.rendezVous[i];
                    activity.Description = activity.description;
                    activity.EndTime = activity.endTime;
                    activity.Location = activity.location;
                    activity.StartTime = activity.startTime;
                    activity.Status = activity.status;
                    activity.Subject = activity.subject;
                    activity.client = activity.client;
                    activity.user = activity.user;
                    activity.customer_id = activity.customer_id;
                    activity.historiques = activity.historiques;
                    activity.priority = activity.priority;
                    activity.type = activity.type;
                    activity.typeForm =
                    activity.typeActivity == activity.typeActivity;
                    this.aff.push(activity);
                  }
                  this.spinnerGetAllData = false;
                  console.log('affTask+rdv by user', this.aff);
                  this.eventSettings = {
                    dataSource: this.aff,
                  };
                },
                (error) => {
                  this._toast.error(
                    'Une erreur est survenue lors de récupération des activités !'
                  );
                }
              );
              this._toast.success('Rendez-vous a été modifié avec succès');
            },
            (error) => {
              console.log('error', error);
              this._toast.error(
                'Une erreur est survenue lors de la modification de l\'activité !'
              );
            });
  }

  setDateFin(e) {
    // console.log("DATE FIN", e.target.value)
    this.end_time = e.target.value;
    this.end_time_6 = moment(this.end_time)
      .subtract(6, 'months')
      .format('yyyy-MM-DD');
    // console.log(moment(this.end_time).subtract(6, 'months').format('yyyy-MM-DD'));
  }

  ngOnInit(): void {
    this.export = new FormGroup({
      start_date: new FormControl('', Validators.required),
      end_date: new FormControl('', Validators.required),
    });


    this.getAllRdv(moment().subtract(1, 'months').format('yyyy-MM-DD'),moment().add(1, 'months').format('yyyy-MM-DD'));

    this.userAuyhentifie = this.token.getUser();
    this.userAuth = this.token.getUser().id;
    this.userFilter = this.token.getUser().id;
    console.log('user auth', this.userAuyhentifie);

    this.personelService.personnelbyFunction(null,'COMMERCIAL').subscribe(
      (data: any) => {
        console.log('data Commerciale', data);
        this.users = data.response;
      },
      (error) => {
        console.log('error', error);
      }
    );

    this.parameterService.getTypeRdv().subscribe((res) => {
      this.types = res['response'];
    });
  }

  saveExcelFile(buffer: any, fileName: string): void {
    const EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';

    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    saveAs.saveAs(data, fileName + EXCEL_EXTENSION);
  }

  exportExcel(args: any) {
    const data = [];
    this.activityService.getAllActivityByDate(this.export.get('start_date').value,this.export.get('end_date').value).subscribe(
        (res) => {
          this.rendezVous = res['response'];
          for (var i = 0; i < this.rendezVous.length; i++) {
            let activity = this.rendezVous[i];
            let object = {
              Activité: activity.typeActivity == 'RDV' ? "RDV" : "Tâche",
              Jour: moment(activity.created_at).locale('Fr').format('DD') ,
              Mois: moment(activity.created_at).locale('Fr').format('MMMM'),
              Année: moment(activity.created_at).locale('Fr').format('yyyy'),
              Objet: activity.subject,
              Type: activity.type,
              Client: activity.client?.name,
              Date_debut: this.datePipe.transform(
                activity.startTime,
                'dd/MM/yyyy HH:mm:ss'
              ),
              Date_fin: this.datePipe.transform(
                activity.endTime,
                'dd/MM/yyyy HH:mm:ss'
              ),
              Description: activity.description,
              Lieu: activity.location,
              Commercial: activity.user?.first_name + ' ' + activity.user?.last_name,
              Statut: activity.status,
              Priorité: activity.priority,
              Motif: activity.motif,
            };
            data.push(object);

            // +
            // ' ' +
            // moment(activity.created_at).locale('Fr').format('dddd'),
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
          this.saveExcelFile(excelBuffer, 'activities');
        },
        (error) => {
          this._toast.error('Une erreur est survenue lors de récupération des activités !');
        }
      );
  }

  userChange($event) {
    this.userFilter = $event.value;
    this.spinnerGetAllData = true;
    this.aff = [];
    this.activityService.getActivityByUser($event.value).subscribe(
      (data) => {
        // console.log('task rdv retourné ', data['response']);
        this.rendezVous = data['response'];
        for (var i = 0; i < this.rendezVous.length; i++) {
          let activity = this.rendezVous[i];
          activity.Description = activity.description;
          activity.EndTime = activity.endTime;
          activity.Location = activity.location;
          activity.StartTime = activity.startTime;
          activity.Status = activity.status;
          activity.Subject = activity.subject;
          activity.client = activity.client;
          activity.user = activity.user;
          activity.customer_id = activity.customer_id;
          activity.historiques = activity.historiques;
          activity.priority = activity.priority;
          activity.type = activity.type;
          // activity.typeForm =
          //   activity.typeActivity == activity.typeActivity;
          this.aff.push(activity);
        }
        this.spinnerGetAllData = false;
        console.log('affTask+rdv by user', this.aff);
        this.eventSettings = {
          dataSource: this.aff,
        };
      },
      (error) => {
        this._toast.error(
          'Une erreur est survenue lors de récupération des activités !'
        );
      }
    );
  }

  @ViewChild('scheduleObj', { static: false })
  private scheduleObj: ScheduleComponent;

  public selectedDate: Date = new Date();
  public views: Array<string> = ['Week', 'WorkWeek', 'Month'];
  public showQuickInfo: Boolean = false;
  public eventSettings: EventSettingsModel = {};

  onClientChange(e) {
    this.selectedClient = e;
  }

  onPopupClosed(args: PopupCloseEventArgs): void {
    this.showPopup = false;
  }

  onPopupOpen(args: PopupOpenEventArgs): void {
    const data = args.data;
    if (args.type === 'Editor') {
      args.cancel = true;
      const dialogRef = this.dialog.open(DialogRdvComponent, {
        disableClose: true,
        width: '831px',
        data: { data },
      });

      dialogRef.afterClosed().subscribe((data) => {
        if (data) {
          this.spinnerGetAllData = true;
          this.aff = [];
          this.activityService.getActivityByUser(this.userFilter).subscribe(
            (data) => {
              // console.log('task rdv retourné ', data['response']);
              this.rendezVous = data['response'];
              for (var i = 0; i < this.rendezVous.length; i++) {
                let activity = this.rendezVous[i];
                activity.Description = activity.description;
                activity.EndTime = activity.endTime;
                activity.Location = activity.location;
                activity.StartTime = activity.startTime;
                activity.Status = activity.status;
                activity.Subject = activity.subject;
                activity.client = activity.client;
                activity.user = activity.user;
                activity.customer_id = activity.customer_id;
                activity.historiques = activity.historiques;
                activity.priority = activity.priority;
                activity.type = activity.type;
                this.aff.push(activity);
              }
              this.spinnerGetAllData = false;
              this.eventSettings = {
                dataSource: this.aff,
              };
            },
            (error) => {
              this._toast.error(
                'Une erreur est survenue lors de récupération des activités !'
              );
            }
          );
        }
      });
    }
  }

  navigating(args) {
    const today = moment(args.currentDate);
    if (!args.currentView) {
      this.selectedDate = args.currentDate;
      this.getAllRdv(moment().subtract(1, 'months').format('yyyy-MM-DD'),moment().add(1, 'months').format('yyyy-MM-DD'));
    }
  }

  getAllRdv(start: any, end: any) {
    this.excel = false;
    console.log(start, end);
    this.spinnerGetAllData = true;
    this.aff = [];
    this.activityService.getAllActivityByDate(start, end).subscribe(
      (data) => {
        this.rendezVous = data['response'];
        for (var i = 0; i < this.rendezVous.length; i++) {
          let activity = this.rendezVous[i];
          activity.Description = activity.description;
          activity.EndTime = activity.endTime;
          activity.Location = activity.location;
          activity.StartTime = activity.startTime;
          activity.Status = activity.status;
          activity.Subject = activity.subject;
          activity.client = activity.client;
          activity.user = activity.user;
          activity.customer_id = activity.customer_id;
          activity.historiques = activity.historiques;
          activity.priority = activity.priority;
          activity.type = activity.type;
          this.aff.push(activity);
        }
        this.spinnerGetAllData = false;
        this.allRDVTask = this.aff;
        this.eventSettings = {
          dataSource: this.aff,
        };
      },
      (error) => {
        this._toast.error(
          'Une erreur est survenue lors de récupération des activités !'
        );
      }
    );
  }

  oneventRendered(args: EventRenderedArgs): void {
    args.element.style.width = '100%';
    const divCommercial = document.createElement('div');
    divCommercial.style.cssText =
      'width:5px;height:100%; position:absolute; top:0px; background:' +
      args.data.user?.color;
    args.element.appendChild(divCommercial);
    if (args.data.priority == 'Urgent') {
      var flag = document.createElement('div');
      flag.style.cssText =
        'width:10px;height:10px;border-radius:50%;background:red;margin-right:5px;margin-top:-56px;float:right';
      args.element.appendChild(flag);
    }
    // console.log("ARGS ", args.data)
    if (args.data.typeActivity == 'Task') {
      const div = document.createElement('div');
      div.classList.add('div');
      div.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="15.3" height="17" viewBox="0 0 15.3 17"><path id="Task" d="M16.6,2.7H13.044a2.535,2.535,0,0,0-4.787,0H4.7A1.7,1.7,0,0,0,3,4.4V16.3A1.7,1.7,0,0,0,4.7,18H16.6a1.7,1.7,0,0,0,1.7-1.7V4.4A1.7,1.7,0,0,0,16.6,2.7Zm-5.95,0a.85.85,0,1,1-.85.85A.85.85,0,0,1,10.65,2.7ZM8.1,14.6H6.4V12.9l5.224-5.224,1.7,1.7Zm6.676-6.676-.85.85-1.7-1.7.85-.85a.425.425,0,0,1,.6,0l1.1,1.1A.425.425,0,0,1,14.776,7.924Z" transform="translate(-3 -1)" fill="#fff"/></svg>';
      div.style.cssText = 'margin-right:26px;margin-top:-59px;float:right';
      // 'margin-right:26px;margin-top:-59px;float:right';
      args.element.appendChild(div);
      args.element.style.backgroundColor = '#905ce0';
    } else {
      const div = document.createElement('div');
      div.classList.add('div');
      div.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17"><path id="rendez-vous" d="M8.762,6A2.766,2.766,0,0,0,6,8.762V9.4H21.3V8.762A2.766,2.766,0,0,0,18.537,6ZM6,10.675v7.862A2.766,2.766,0,0,0,8.762,21.3h4.912a5.494,5.494,0,0,1-.874-2.975c0-.112.01-.22.017-.33l-.54.4a.546.546,0,0,1-.849-.6l.493-1.576-1.455-1.1a.547.547,0,0,1,.33-.982h1.8l.541-1.574a.546.546,0,0,1,1.033,0l.541,1.574h.021a5.506,5.506,0,0,1,6.572-.462v-3ZM18.325,13.65A4.675,4.675,0,1,0,23,18.325,4.675,4.675,0,0,0,18.325,13.65Zm-.425,1.7a.425.425,0,0,1,.425.425v2.55H20.45a.425.425,0,1,1,0,.85H17.9a.425.425,0,0,1-.425-.425V15.775A.425.425,0,0,1,17.9,15.35Z" transform="translate(-6 -6)" fill="#fff"/></svg>';
      // div.innerHTML +='<span style="position:absolute; left:76px; top:2px">'+args.data.type+'</span>'
      // let clientName = (args.data.client.last_name) ? args.data?.client?.first_name+' '+args.data?.client?.last_name : args.data?.client?.first_name
      // div.innerHTML +='<span title="'+clientName+'" style="position:absolute; left:88px; top:20px">'+clientName+'</span>'
      div.style.cssText = 'margin-right:26px;margin-top:-58px;float:right';
      args.element.appendChild(div);
      switch (args.data.Status) {
        case 'Annulé': {
          args.element.style.backgroundColor = 'red';
          break;
        }
        case 'Planifié': {
          args.element.style.backgroundColor = '#1A73E7';
          break;
        }
        case 'Honoré': {
          args.element.style.backgroundColor = '#0C8040';
          break;
        }
        case 'Non Honoré': {
          args.element.style.backgroundColor = '#FFA500';
          break;
        }
        default: {
          break;
        }
      }
    }
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
