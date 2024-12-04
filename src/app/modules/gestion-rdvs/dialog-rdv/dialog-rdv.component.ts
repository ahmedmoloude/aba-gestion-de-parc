import { MapDialogComponent } from './../../gestion-comptes-client/map-dialog/map-dialog.component';
import { environment } from './../../../../environments/environment';
import { PersonelService } from './../../../core/services/personel.service';
import { ParametreService } from 'app/core/services/parametre.service';
import { TokenService } from './../../../core/services/token.service';
import { AuthService } from './../../../core/services/auth.service';
import { ToastService } from 'app/services';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { selectUserCommercial } from 'app/core/store/resources/resources.selectors';
import { SharedAutcompleteComponent } from 'app/shared/components/shared-autcomplete/shared-autcomplete.component';
import { IFieldComponent } from 'app/shared/components/i-field/i-field.component';
import * as moment from 'moment';
import { ActivityService } from 'app/core/services/activity.service';
import { Config } from 'app/config';

@Component({
  selector: 'app-dialog-rdv',
  templateUrl: './dialog-rdv.component.html',
  styleUrls: ['./dialog-rdv.component.css'],
})
export class DialogRdvComponent implements OnInit {
  @ViewChildren(SharedAutcompleteComponent)
  searchComponents: QueryList<SharedAutcompleteComponent>;
  // @ViewChildren(IFieldComponent)

  createTask: FormGroup;
  activity: any;
  client: any;
  user: any;
  types: any;
  userAuth: any;
  start_time: any;
  end_time: any;
  typeForm: any;
  button: any;
  maxSize = 500;
  typeActivity = 'RDV';
  searchStyle = {
    border: '1px solid #ccc',
    'border-radius': '3px',
    padding: '0.5rem',
  };
  contentStyle = {
    border: '1px solid #ccc',
    'border-radius': '3px',
    padding: '0.5rem',
  };
  spinner: boolean = false;
  motif: boolean = false;
  spinnerGetData: boolean = false;
  file : any;
  url = environment.STORAGE + '/comercial_activity/';
  motifs :any = [];

  apiUri= `${Config.api.customers.searchList}?search=`;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogRdvComponent>,
    private _toast: ToastService,
    public authService: AuthService,
    private token: TokenService,
    private parameterService: ParametreService,
    private activityService: ActivityService,
    private personelService: PersonelService
  ) {}

  // ngAfterViewInit(){
  //   if(this.typeForm == 'EDIT'){
  //     console.log("AFTER VIEW", this.activity.client)
  //     if(this.client.length)
  //       this.searchComponents.toArray()[0].selectObject(this.activity.client)
  //   }

  // }


  deletPJ(){
    console.log("DELET PJ");
    this.activityService.deletePJ(this.activity.uuid).subscribe(
      (data) => {
        console.log('delet', data),
          this._toast.success('Pièce Jointe supprimé avec succès!');
          // this.createTask.controls['file'].setValue(null);
          this.activity.file = null;
          console.log("mnm", this.activity)
          // this.dialogRef.close(data['response']);
          // this.gps = this.gps.filter(function(obj) {
          //   return obj.uuid !== uuid;
          // });
      },
      (error) => {
        console.log('error', error);
        this._toast.error('Une erreur est survenue lors de la suppression de Carte !');
      });
  }

  ngOnInit(): void {
    // this.spinnerGetData = true;

    // this.boGridService.getCustomersProspects().subscribe((data) => {
    //   console.log("data client ", data['response'])
    //   this.client = data['response'];
    //   this.spinnerGetData = false;
    //   setTimeout(() => {
    //     this.searchComponents.toArray()[0].selectObject(this.activity.client);
    //   });
    // });

    this.parameterService.getMotif().subscribe((data) => {
      this.spinner = false;
      this.motifs = data["response"];
      console.log("MOTIFS", this.motifs)
    });

    // this.store.select(selectUserCommercial).subscribe((res) => {
    //   // console.log(" user commercial========>", res)
    //   this.user = res
    // });

    this.personelService.personnelbyFunction(null, 'COMMERCIAL').subscribe(
      (data: any) => {
        console.log('data Commerciale', data);
        this.user = data.response;
      },
      (error) => {
        console.log('error', error);
      }
    );

    this.parameterService.getTypeRdv().subscribe((res) => {
      this.types = res['response'];
      // console.log('types', this.types);
    });

    this.activity = this.data['data'];
    this.userAuth = this.token.getUser();
    console.log("id user auth", this.userAuth)

    console.log('activity', this.activity);
    if (!this.activity.typeActivity) {
      this.button = 'Ajouter';
      this.typeForm = 'ADD';
      this.start_time = moment(this.activity.StartTime).format(
        'yyyy-MM-DD HH:mm'
      );
      this.end_time = moment(this.activity.EndTime).format('yyyy-MM-DD HH:mm');
      this.createTask = new FormGroup({
        subject: new FormControl('', Validators.required),
        startTime: new FormControl(
          moment(this.activity.StartTime).format('yyyy-MM-DD HH:mm'),
          Validators.required
        ),
        endTime: new FormControl(
          moment(this.activity.EndTime).format('yyyy-MM-DD HH:mm'),
          Validators.required
        ),
        description: new FormControl('', Validators.required),
        customer_id: new FormControl(''),
        user_id: new FormControl('', Validators.required),
        location: new FormControl('', Validators.required),
        priority: new FormControl('', Validators.required),
        type: new FormControl(this.typeActivity),
        typeActivity: new FormControl(
          'App\\Modules\\ComercialActivity\\Models\\ComercialActivity',
          Validators.required
        ),
        rdvOrTache: new FormControl(this.typeActivity, Validators.required),
      });
    } else {
      // console.log("EDIT=====>")
      this.typeForm = 'EDIT';
      this.typeActivity = this.activity.typeActivity;
      console.log('this.typeActivity', this.typeActivity);
      this.button = 'Modifier';
      this.createTask = new FormGroup({
        subject: new FormControl(this.activity.subject, Validators.required),
        startTime: new FormControl(
          this.activity.startTime,
          Validators.required
        ),
        endTime: new FormControl(this.activity.endTime, Validators.required),
        description: new FormControl(
          this.activity.description,
          Validators.required
        ),
        customer_id: new FormControl(this.activity.customer_id),
        user_id: new FormControl(this.activity.user_id, Validators.required),
        location: new FormControl(this.activity.location, Validators.required),
        priority: new FormControl(this.activity.priority, Validators.required),
        type: new FormControl(this.activity.type),
        typeActivity: new FormControl(
          'App\\Modules\\ComercialActivity\\Models\\ComercialActivity',
          Validators.required
        ),
        rdvOrTache: new FormControl(this.typeActivity, Validators.required),
        status: new FormControl(this.activity.status, Validators.required),
        motif: new FormControl(this.activity.motif),
        // file: new FormControl(),
      });

      this.start_time = this.activity.startTime;
      this.end_time = this.activity.endTime;
      this.maxSize = 500 - this.activity.description.length;

      if(this.activity.status == 'Non Honoré' || this.activity.status == 'Annulé'){
        this.createTask.controls['motif'].setValidators([Validators.required]);
        this.motif = true;
      }
    }


    if(this.button.toLowerCase() != 'ajouter'){
      setTimeout(() => {
        this.searchComponents.toArray()[0].selectObject(this.activity.client || null);
      });
    }

  }

  onChange(event) {
    console.log(event.value);
    this.createTask.get('customer_id').clearValidators();
    this.createTask.get('customer_id').updateValueAndValidity();
    this.typeActivity = event.value;
    this.createTask.controls['rdvOrTache'].setValue(this.typeActivity);
    console.log('type Activity', this.typeActivity);
    if (this.typeActivity == 'RDV') {
      this.createTask.get('customer_id').setValidators(Validators.required);
    } else {
      this.createTask.get('type').setValue(this.typeActivity);
      this.createTask.get('customer_id').clearValidators();
      this.createTask.get('customer_id').updateValueAndValidity();
    }
  }

  onSelectFile(event)
  {
    this.file  = (event.target as HTMLInputElement).files[0];
    console.log(this.file, "file")
  }

  setMaxSize(event){
    console.log(event.target.value)
    this.maxSize = 500 - event.target.value.length
  }


  onClientChange(event) {
    console.log('EMITED', event);
    if (event) {
      var id = event.id;
      // console.log("ID CLIENT", id)
      this.createTask.controls['customer_id'].setValue(id);
    }else{
      this.createTask.controls['customer_id'].setValue('');
    }
  }

  setDateDebut(value) {
    console.log("DATE DEBUT", value)
    this.start_time = value;
  }

  setDateFin(value) {
    console.log("DATE FIN", value)
    this.end_time = value;
  }

  statutRdv($event) {
    this.createTask.controls['motif'].clearValidators();
    this.createTask.get('motif').updateValueAndValidity();
    this.motif = false;
    console.log('STATUT', $event.value);
    if ($event.value == 'Non Honoré' || $event.value == 'Annulé') {
      this.motif = true;
      this.createTask.controls['motif'].setValidators([Validators.required]);
    }
  }

  getFormValidationErrors() {
    Object.keys(this.createTask.controls).forEach((key) => {
      const controlErrors: ValidationErrors = this.createTask.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError) => {
          console.log(
            'Key control: ' + key + ', keyError: ' + keyError + ', err value: ',
            controlErrors[keyError]
          );
        });
      }
    });
  }

  addActivity() {
    if (this.createTask.invalid) {
      this.getFormValidationErrors();
      this._toast.error("vous n'avez pas rempli tous les champs");
      return;
    }
    console.log("start", new Date(this.start_time))
    console.log("end", new Date(this.end_time))
    if(new Date(this.start_time)  > new Date(this.end_time)){
      this._toast.error("Date fin doit être supérieure à la date de début");
    }else{
      this.spinner = true;
      const formData = new FormData();
      for (var key in this.createTask.value) {
        if(this.createTask.value[key] && this.createTask.value[key] != null && this.createTask.value[key] != '' && this.createTask.value[key] != 'null'){
          formData.append(key , this.createTask.value[key])
        }
      }
      if(this.file){
        formData.append('file', this.file)
      }
      if (this.typeForm == 'ADD') {
        console.log('DATA TO ADD', this.createTask.value);
        this.activityService.addComercialActivity(formData).subscribe(
            (data) => {
              this.spinner = false;
              data['response'].mode = this.typeForm;
              this.dialogRef.close(data['response']);
              this._toast.success(this.typeActivity + ' ajouter avec succés !');
            },
            (error) => {
              console.log('error', error);
              this.spinner = false;
              this._toast.error(
                "Une erreur est survenue lors de l'ajout de "+this.typeActivity + " !"
              );
            }
          );
      } else {


        console.log('DATA TO Edit', this.createTask.value);
        this.activityService.updateActivity(formData, this.activity.uuid).subscribe(
            (data) => {
              this.spinner = false;
              data['response'].mode = this.typeForm;
              this.dialogRef.close(data['response']);
              this._toast.success(this.typeActivity + ' modifier avec succés !');
            },
            (error) => {
              console.log('error', error);
              this.spinner = false;
              this._toast.error(
                "Une erreur est survenue lors de la modification de  "+this.typeActivity + "!"
              );
            }
          );
      }
    }
  }

  openDialogMaps(){
    const dialogRef = this.dialog.open(MapDialogComponent, {
      width: '1000px',
      data: {'from': 'ACTIVITY'},
    });

    dialogRef.afterClosed().subscribe((output) => {
      console.log("OUTPUT ADRESSE", output)
      console.log("OUTPUT ADRESSE", output.address)
      this.createTask.get('location').setValue(output.address);
    });
  }
}
