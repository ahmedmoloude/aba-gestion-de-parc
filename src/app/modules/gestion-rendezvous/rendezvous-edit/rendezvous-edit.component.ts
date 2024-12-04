import { MapDialogComponent } from './../../gestion-comptes-client/map-dialog/map-dialog.component';
import { ActivityService } from 'app/core/services/activity.service';
import { environment } from 'environments/environment';
import { PersonelService } from './../../../core/services/personel.service';
import { SharedAutcompleteComponent } from 'app/shared/components/shared-autcomplete/shared-autcomplete.component';
import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ToastService } from './../../../core';
import {Observable} from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
// import { updateRDV } from 'app/core/store/rdv/rdv.actions';
import { updaterdv } from 'app/core/store/rdv/rdv.actions';
import { selectEnvPayload } from 'app/core/store/customer/customer.selectors';
import {
  AuthService,
  TokenService,
  AuthStateService,
  localStorageHelper,
  NavigationHelper,
} from './../../../core';
import { selectUserCommercial, } from 'app/core/store/resources/resources.selectors';
import { selectEnvRDVIsLoading,selectEnvRDVStatus } from 'app/core/store/rdv/rdv.selectors';
import { ParametreService } from 'app/core/services/parametre.service';
import { Config } from 'app/config';

@Component({
  selector: 'app-rendezvous-edit',
  templateUrl: './rendezvous-edit.component.html',
  styleUrls: ['./rendezvous-edit.component.css']
})
export class RendezvousEditComponent implements OnInit {
  @ViewChildren(SharedAutcompleteComponent) searchComponents: QueryList<SharedAutcompleteComponent>;
  task:any;
  createTask : FormGroup;
  subject: string;
  startDate: Date;
  endDate: Date;
  description: string;
  commercialTasksable_id: number;
  commercialTasksable_type: string;
  spinner:boolean=false;
  test:boolean = false;
  status: any;
  spinnerId:boolean = false;
  motif:boolean = false;
  cpmt:number;
  commercialTasksable:any;
  searchStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}
  contentStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}
  start_time : any
  end_time : any;
  spinnerGetData : boolean = false;
  maxSize = 500;
  file : any;
  url = environment.STORAGE + '/comercial_activity/';

  apiUri= `${Config.api.customers.searchList}?search=`;



  onSelectFile(event)
  {
    this.file  = (event.target as HTMLInputElement).files[0];
    console.log(this.file, "file")
  }

  setMaxSize(event){
    console.log(event.target.value)
    this.maxSize = 500 - event.target.value.length
  }

  deletPJ(){
    console.log("DELET PJ");
    this.activityService.deletePJ(this.task.uuid).subscribe(
      (data) => {
        console.log('delet', data),
          this._toast.success('Pièce Jointe supprimé avec succès!');
          // this.createTask.controls['file'].setValue(null);
          this.task.file = null;
          console.log("", this.task)
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

  onClientChange(event){
    if(event){
      var id = event.id;
      console.log("ID CLIENT", id)
      this.createTask.controls['customer_id'].setValue(id);
    }else{
      this.createTask.controls['customer_id'].setValue('');
    }
  }

  ngAfterViewInit(){
    console.log("AFTER VIEW", this.task.client)
    this.searchComponents.toArray()[0].selectObject(this.task.client)
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog,
              private store: Store<AppState>,
              public dialogRef: MatDialogRef<RendezvousEditComponent>,
              private boGridService: BoGridService,
              private _toast: ToastService,
              public authService: AuthService,
              private token: TokenService,
              private activityService: ActivityService,
              private parameterService: ParametreService,
              private personelService : PersonelService,) { }

    user:any;
    nbUser:any;
    client :any;
    types :any;
    userAuth : any;
    filteredOptions: Observable<string[]>;
    motifs :any = [];

  personnelID(user){
    console.log("USER", user);
    console.log("USER EMAIL", user.email);
    console.log("PERSONNEL", this.user);
    if(this.user){
      console.log("PERSONNEL PARSE", JSON.parse(this.user.contact));
      var contact = JSON.parse(this.user.contact);
      console.log("PERSONNEL PARSE", contact.email);
      var personnel = this.user.find(p => p.email == contact.email).id
    }
    // var personnel = this.user.find(p => p.)
    return user.id
  }

  ngOnInit(): void {
    this.spinnerGetData = true;
    this.userAuth = this.token.getUser();
    console.log("id user auth", this.userAuth)

    this.parameterService.getMotif().subscribe((data) => {
      this.spinner = false;
      this.motifs = data["response"];
      console.log("MOTIFS", this.motifs)
    });

    // this.boGridService.getCustomer().subscribe((data) => {
    //   console.log("data client ",data)
    //   this.client = data["response"];
    //   this.spinnerGetData = false
    //   setTimeout(() => {
    //     this.searchComponents.toArray()[0].selectObject(this.task.client)
    //   })
    // },
    // (error) => {
    //   //console.log('error', error);
    //   this._toast.error("Une erreur est survenue lors de l'ajout de Rendez vous !");
    // });

    this.parameterService.getTypeRdv().subscribe((res) => {
      this.types = res['response'];
      console.log('types', this.types);
      this.spinnerGetData = false
    });

    // this.store.select(selectEnvPayload).subscribe((res) => {
    //   console.log(" client========>", res)
    //   this.client = res
    // });
    // this.store.select(selectUserCommercial).subscribe((res) => {
    //   console.log(" user commercial========>", res)
    //   this.user = res
    //   this.nbUser = this.user.length;
    // });

    // this.personelService.personnelbyFunction('Commerciale').subscribe(
    //   (data:any) => {
    //     console.log("data Commerciale", data)
    //     this.user = data.response;
    //     this.nbUser = this.user.length;
    //   },
    //   (error) => {
    //     console.log('error', error);
    //   }
    // );

    // this.boGridService.UserCommercial().subscribe((data) => {
    //   console.log("users",data)
    //   this.user = data["response"];
    //   this.nbUser = this.user.length;
    // },
    // (error) => {
    //   //console.log('error', error);
    // });

    this.task = this.data["task"];
    this.user = this.data["user"];
    this.client = this.data["client"];
    console.log("item get", this.task);
    console.log("user get", this.user);
    console.log("client get", this.client);
    this.createTask = new FormGroup({
      subject: new FormControl(this.task.subject, Validators.required),
      startTime: new FormControl(this.task.startTime, Validators.required),
      endTime: new FormControl(this.task.endTime, Validators.required),
      description: new FormControl(this.task.description, Validators.required),
      type: new FormControl(this.task.type, Validators.required),
      customer_id: new FormControl(this.task.customer_id),
      motif: new FormControl(this.task.motif),
      user_id: new FormControl(this.task.user_id, Validators.required),
      location: new FormControl(this.task.location, Validators.required),
      priority: new FormControl(this.task.priority, Validators.required),
      status: new FormControl(this.task.status, Validators.required),
      typeActivity: new FormControl("App\\Modules\\ComercialActivity\\Models\\ComercialActivity", Validators.required),
      rdvOrTache: new FormControl("RDV", Validators.required),
    });

    this.start_time = this.task.startTime;
    this.end_time = this.task.endTime;

    this.maxSize = 500 - this.task.description.length;

    if(this.task.status == 'Non Honoré' || this.task.status == 'Annulé'){
      this.createTask.controls['motif'].setValidators([Validators.required]);
      this.motif = true;
    }
  }

  setDateDebut(value){
    console.log("DATE DEBUT", value)
    this.start_time= value;
  }

  setDateFin(value){
    console.log("DATE FIN", value)
    this.end_time= value;
  }

  statutRdv($event){
    this.createTask.controls['motif'].clearValidators();
    this.createTask.get('motif').updateValueAndValidity();
    this.motif = false;
    console.log("STATUT", $event.value)
    if($event.value == 'Non Honoré' || $event.value == 'Annulé'){
      this.motif = true;
      this.createTask.controls['motif'].setValidators([Validators.required]);
    }
  }

  // get username() {
  //   return this.createTask.get('subject');
  // }

  getFormValidationErrors() {
    Object.keys(this.createTask.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.createTask.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
         console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }

  editTask(){
    // // this.spinner = true;
    // if(this.createTask.invalid){
    //   this.getFormValidationErrors();
    //   this._toast.error("vous n'avez pas rempli tous les champs");
    //   this.spinner = false;
    // }else{
    //   // this.store.dispatch(updaterdv({data: this.createTask.value,uuid: this.task.uuid}));
    //   // this.store.select(selectEnvRDVIsLoading).subscribe((res) => {
    //   //   this.spinner = res;
    //   // });
    //   // this.store.select(selectEnvRDVStatus).subscribe((res) => {
    //   //   console.log("status", res);
    //   //   if(res == 'SUCCESS'){
    //   //     this.dialogRef.close();
    //   //   }
    //   // });
    // }

    if(this.createTask.invalid){
      this.getFormValidationErrors();
      return ;
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

      this.activityService.updateActivity(formData, this.task.uuid).subscribe(
        (data) => {
          this.spinner = false;
          this.dialogRef.close(data['response']);
          this._toast.success( 'Tâche a été modifiée avec succès' );
        },
        (error) => {
          console.log('error', error);
          this.spinner = false;
          this._toast.error(
            "Une erreur est survenue lors de l'ajout de rendez-vous !"
          );
        }
      );
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
