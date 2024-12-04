import { MapDialogComponent } from './../../gestion-comptes-client/map-dialog/map-dialog.component';
import { ActivityService } from 'app/core/services/activity.service';
import { environment } from 'environments/environment';
import { ParametreService } from 'app/core/services/parametre.service';
import { PersonelService } from './../../../core/services/personel.service';
import { SharedAutcompleteComponent } from 'app/shared/components/shared-autcomplete/shared-autcomplete.component';
import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { ToastService } from './../../../core';
import { ThrowStmt } from '@angular/compiler';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { selectEnvPayload } from 'app/core/store/customer/customer.selectors';
import { selectUserCommercial, } from 'app/core/store/resources/resources.selectors';
import { updateTask } from 'app/core/store/task/task.actions';
import {
  AuthService,
  TokenService,
} from './../../../core';
import { selectEnvtaskIsLoading,selectEnvtaskStatus } from 'app/core/store/task/task.selectors';
import { Config } from 'app/config';


@Component({
  selector: 'app-tasks-edit-dialog',
  templateUrl: './tasks-edit-dialog.component.html',
  styleUrls: ['./tasks-edit-dialog.component.css']
})
export class TasksEditDialogComponent implements OnInit {
  @ViewChildren(SharedAutcompleteComponent) searchComponents: QueryList<SharedAutcompleteComponent>;
  task:any;
  createTask : FormGroup;
  spinner:boolean=false;
  userAuth:any;
  userAuthName:any;
  user:any;
  types:any;
  client :any;
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

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog,
              private store: Store<AppState>,
              public dialogRef: MatDialogRef<TasksEditDialogComponent>,
              private boGridService: BoGridService,
              private _toast: ToastService,
              public authService: AuthService,
              private token: TokenService,
              private activityService: ActivityService,
              private parameterService: ParametreService,
              private personelService : PersonelService,) { }

    ngAfterViewInit(){
      console.log("AFTER VIEW", this.task.client)
      this.searchComponents.toArray()[0].selectObject(this.task.client)
    }

  ngOnInit(): void {
    // this.spinnerGetData = true;
    this.userAuth = this.token.getUser();
    //console.log("id user auth", this.userAuth)
    this.userAuthName = this.token.getUser().name;

    // this.personelService.personnelbyFunction('Commerciale').subscribe(
    //   (data:any) => {
    //     console.log("data Commerciale", data)
    //     this.user = data.response;
    //   },
    //   (error) => {
    //     console.log('error', error);
    //   }
    // );

    // this.boGridService.getCustomer().subscribe((data) => {
    //   this.client = data["response"];
    //   console.log("allClient", this.client);
    //   this.spinnerGetData = false
    //   setTimeout(() => {
    //     this.searchComponents.toArray()[0].selectObject(this.task.client)
    //   })
    // },
    // (error) => {
    //   console.log('error', error);
    // });

    this.task = this.data["task"];
    this.client = this.data["client"];
    this.user = this.data["user"];
    console.log("task", this.task);
    console.log("client", this.client);
    console.log("user", this.user);

    this.createTask = new FormGroup({
      subject: new FormControl(this.task.subject, Validators.required),
      startTime: new FormControl(this.task.startTime, Validators.required),
      endTime: new FormControl(this.task.endTime, Validators.required),
      description: new FormControl(this.task.description, Validators.required),
      type: new FormControl("Task"),
      customer_id: new FormControl(this.task.customer_id),
      user_id: new FormControl(this.task.user_id, Validators.required),
      location: new FormControl(this.task.location, Validators.required),
      priority: new FormControl(this.task.priority, Validators.required),
      status: new FormControl(this.task.status, Validators.required),
      typeActivity: new FormControl("App\\Modules\\ComercialActivity\\Models\\ComercialActivity", Validators.required),
      rdvOrTache: new FormControl("Task", Validators.required),
    });

    this.start_time = this.task.startTime;
    this.end_time = this.task.endTime;
    this.maxSize = 500 - this.task.description.length;
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

  setDateDebut(value){
    console.log("DATE DEBUT", value)
    this.start_time= value;
  }

  setDateFin(value){
    console.log("DATE FIN", value)
    this.end_time= value;
  }

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
    console.log(this.createTask.value)
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

    // this.spinner = true;
    // this.store.dispatch(updateTask({data: this.createTask.value,uuid: this.task.uuid}));
    // this.store.select(selectEnvtaskIsLoading).subscribe((res) => {
    //   this.spinner = res;
    // });
    // this.store.select(selectEnvtaskStatus).subscribe((res) => {
    //   console.log("status", res);
    //   if(res == 'SUCCESS'){
    //     this.dialogRef.close();
    //   }
    // });
  //   this.boGridService.editTask(this.createTask.value, this.task.uuid).subscribe((data) => {
  //     console.log("data edit ",data)
  //    this.dialogRef.close();
  //     this.spinner = false;
  //     this._toast.success("Task modifier avec succés");
  //   },
  //   (error) => {
  //     //console.log('error', error);
  //     this._toast.error("Une erreur est survenue lors de la de Task !");
  //   }
  // );
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
