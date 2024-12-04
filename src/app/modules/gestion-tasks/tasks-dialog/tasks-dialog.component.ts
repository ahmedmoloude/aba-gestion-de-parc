import { MapDialogComponent } from './../../gestion-comptes-client/map-dialog/map-dialog.component';
import { ActivityService } from 'app/core/services/activity.service';
import { ParametreService } from 'app/core/services/parametre.service';
import { PersonelService } from './../../../core/services/personel.service';
import { SharedAutcompleteComponent } from 'app/shared/components/shared-autcomplete/shared-autcomplete.component';
import { Component, OnInit, QueryList, ViewChildren, Inject } from '@angular/core';
import { ToastService } from './../../../core';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { addTask } from 'app/core/store/task/task.actions';
import { selectEnvPayload } from 'app/core/store/customer/customer.selectors';
import { selectUserCommercial, } from 'app/core/store/resources/resources.selectors';
import {
  AuthService,
  TokenService,
  AuthStateService,
  localStorageHelper,
  NavigationHelper,
} from './../../../core';
import { selectEnvtaskIsLoading,selectEnvtaskStatus } from 'app/core/store/task/task.selectors';
import { Config } from 'app/config';


@Component({
  selector: 'app-tasks-dialog',
  templateUrl: './tasks-dialog.component.html',
  styleUrls: ['./tasks-dialog.component.css'],
})
export class TasksDialogComponent implements OnInit {
  @ViewChildren(SharedAutcompleteComponent) searchComponents: QueryList<SharedAutcompleteComponent>;
  createTask : FormGroup;
  subject: string;
  startDate: Date;
  endDate: Date;
  description: string;
  commercialTasksable_id: number;
  commercialTasksable_type: string;
  commercialTasksable:any;
  user_id:any;
  // data:any;
  spinner:boolean = false;
  spinnerId:boolean = false;
  cpmt:number;
  user:any;
  nbUser:any;
  filteredOptions: Observable<string[]>;
  client:any;
  nbr:any;
  types:any;
  duration;
  filterDateFromStart: Date;
  filterDateFromEnd : Date;
  userAuth:any;
  searchStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}
  contentStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}
  start_time : any
  end_time : any;
  spinnerGetData : boolean = false;
  maxSize = 500;
  file : any;


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
            private store: Store<AppState>,
            public dialog: MatDialog,
            public dialogRef: MatDialogRef<TasksDialogComponent>,
            private boGridService: BoGridService,
            private _toast: ToastService,
            public authService: AuthService,
            private token: TokenService,
            private parameterService: ParametreService,
            private activityService: ActivityService,
            private personelService : PersonelService,) {}

  ngOnInit(): void {
    // this.spinnerGetData = true;
    //console.log('get token', this.token.getUser());
    this.userAuth = this.token.getUser();
    console.log("id user auth", this.userAuth)

    this.client = this.data["client"];
    this.user = this.data["user"];
    console.log("client", this.client);
    console.log("user", this.user);


    // this.parameterService.getTypeRdv().subscribe((res) => {
    //   this.types = res['response'];
    //   console.log('types', this.types);
    //   this.spinnerGetData = false
    // });
    // this.boGridService.getCustomer().subscribe((data) => {
    //   this.client = data["response"];
    //   console.log("allClient", data);
    //   this.nbr =  this.client.length;
    //   this.spinnerGetData = false
    // },
    // (error) => {
    //   console.log('error', error);
    // });

    // this.store.select(selectEnvPayload).subscribe((res:any) => {
    //   console.log(" client========>", res)
    //   this.client = res
    //   this.nbr = this.client.length;
    // });

    this.createTask = new FormGroup({
      subject: new FormControl("", Validators.required),
      startTime: new FormControl("", Validators.required),
      endTime: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      customer_id: new FormControl(""),
      user_id: new FormControl("", Validators.required),
      location: new FormControl("", Validators.required),
      priority: new FormControl("", Validators.required),
      typeActivity: new FormControl("App\\Modules\\ComercialActivity\\Models\\ComercialActivity", Validators.required),
      rdvOrTache: new FormControl("Task", Validators.required),
      type: new FormControl("Task"),
    })
    // this.boGridService.UserCommercial().subscribe((data) => {
    //   console.log("users",data)
    //   this.user = data["response"];
    //   this.nbUser = this.user.length;
    // },
    // (error) => {
    //   //console.log('error', error);
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
    //     // this.nbUser = this.user.length;
    //   },
    //   (error) => {
    //     console.log('error', error);
    //   }
    // );
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

  addTask(){
    console.log(this.createTask.value)
    if(this.createTask.invalid){
      this.getFormValidationErrors();
      return ;
    }if(this.start_time > this.end_time){
      this._toast.error("Date fin doit être supérieure à la date de début");
    }else{
      this.spinner = true;
      const formData = new FormData();
      for (var key in this.createTask.value) {
        formData.append(key , this.createTask.value[key])
      }
      if(this.file){
        formData.append('file', this.file)
      }
      this.activityService.addComercialActivity(formData).subscribe(
        (data) => {
          this.spinner = false;
          this.dialogRef.close(data['response']);
          this._toast.success('Tâche vous ajouter avec succés !');
        },
        (error) => {
          console.log('error', error);
          this.spinner = false;
          this._toast.error(
            "Une erreur est survenue lors de l'ajout de Tâche !"
          );
        }
      );
    }
    // this.store.dispatch(addTask({ data: this.createTask.value }));
    // this.store.select(selectEnvtaskIsLoading).subscribe((res) => {
    //   this.spinner = res;
    // });
    // this.store.select(selectEnvtaskStatus).subscribe((res) => {
    //   console.log("status", res);
    //   if(res == 'SUCCESS'){
    //     this.dialogRef.close();
    //   }
    // });

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
