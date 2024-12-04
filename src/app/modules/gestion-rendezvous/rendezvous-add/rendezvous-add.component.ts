import { MapDialogComponent } from './../../gestion-comptes-client/map-dialog/map-dialog.component';
import { ActivityService } from 'app/core/services/activity.service';
import { ParametreService } from 'app/core/services/parametre.service';
import { PersonelService } from './../../../core/services/personel.service';
import { Component, ComponentFactoryResolver, OnInit, QueryList, ViewChildren, Inject } from '@angular/core';
import { ToastService } from './../../../core';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import {Observable} from 'rxjs';
import { AuthService, TokenService } from './../../../core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { addrdv } from 'app/core/store/rdv/rdv.actions';
import { selectEnvRDVIsLoading,selectEnvRDVStatus } from 'app/core/store/rdv/rdv.selectors';
import { selectEnvPayload } from 'app/core/store/customer/customer.selectors';
import { selectUserCommercial, } from 'app/core/store/resources/resources.selectors';
import { SharedAutcompleteComponent } from 'app/shared/components/shared-autcomplete/shared-autcomplete.component';
import { Config } from 'app/config';

@Component({
  selector: 'app-rendezvous-add',
  templateUrl: './rendezvous-add.component.html',
  styleUrls: ['./rendezvous-add.component.css']
})
export class RendezvousAddComponent implements OnInit {
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
  nbUser:any;
  filteredOptions: Observable<string[]>;
  client:any;
  user:any;
  nbr:any
  userAuth:any;
  types:any;
  searchStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}
  contentStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}
  start_time : any
  end_time : any;
  spinnerGetData : boolean = false;
  maxSize = 500;
  file : any;
  motifs :any = [];

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
    public dialogRef: MatDialogRef<RendezvousAddComponent>,
    private boGridService: BoGridService,
    public dialog: MatDialog,
    private _toast: ToastService,
    public authService: AuthService,
    private token: TokenService,
    private personelService : PersonelService,
    private activityService: ActivityService,
    private parameterService: ParametreService,) {}

  ngOnInit(): void {
    this.spinnerGetData = true;
    this.userAuth = this.token.getUser();
    console.log("id user auth", this.userAuth)

    this.user = this.data["user"];
    this.client = this.data["client"];
    console.log("user get", this.user);
    console.log("client get", this.client);

    this.parameterService.getTypeRdv().subscribe((res) => {
      this.types = res['response'];
      console.log('types', this.types);
      this.spinnerGetData = false
    });

    // this.parameterService.getMotif().subscribe((data) => {
    //   this.spinner = false;
    //   this.motifs = data["response"];
    //   console.log("MOTIFS", this.motifs)
    // });
    // this.store.select(selectEnvPayload).subscribe((res) => {
    //   console.log(" client========>", res)
    //   this.client = res;
    //   this.nbr = this.client.length;
    // });

    // this.boGridService.getCustomer().subscribe((data) => {
    //   console.log("data client ",data)
    //   this.client = data["response"];
    //   this.spinnerGetData = false
    // },
    // (error) => {
    //   //console.log('error', error);
    //   this._toast.error("Une erreur est survenue lors de l'ajout de Rendez vous !");
    // });


    // this.store.select(selectUserCommercial).subscribe((res) => {
    //   console.log(" user commercial========>", res)
    //   this.user = res
    //   this.nbUser = this.user.length;
    // });

    // this.personelService.personnelbyFunction('Commerciale').subscribe(
    //   (data:any) => {
    //     this.user = data.response;
    //     console.log("this.user", this.user)
    //     // this.nbUser = this.user.length;
    //   },
    //   (error) => {
    //     console.log('error', error);
    //   }
    // );

    this.createTask = new FormGroup({
      subject: new FormControl("", Validators.required),
      startTime: new FormControl("", Validators.required),
      endTime: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      customer_id: new FormControl("", Validators.required),
      user_id: new FormControl("", Validators.required),
      location: new FormControl("", Validators.required),
      priority: new FormControl("", Validators.required),
      type: new FormControl("", Validators.required),
      typeActivity: new FormControl("App\\Modules\\ComercialActivity\\Models\\ComercialActivity", Validators.required),
      rdvOrTache: new FormControl("RDV", Validators.required),
    })
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
    this.start_time = value;
  }

  setDateFin(value){
    console.log("DATE FIN", value)
    this.end_time = value;
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
    if(this.createTask.invalid){
      this.getFormValidationErrors();
      return;
      //   this._toast.error("vous n'avez pas rempli tous les champs");
    }
    console.log("start", this.start_time)
    console.log("end", this.end_time)
    if(this.start_time > this.end_time){
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
          this._toast.success('Rendez-vous a été créé avec succès');
        },
        (error) => {
          console.log('error', error);
          this.spinner = false;
          this._toast.error(
            "Une erreur est survenue lors de l'ajout de rendez-vous !"
          );
        });
    }



    // console.log(this.createTask.value)
    // this.store.dispatch(addrdv({ data: this.createTask.value }));
    // this.store.select(selectEnvRDVIsLoading).subscribe((res) => {

    // });
    // this.store.select(selectEnvRDVStatus).subscribe((res) => {
    //   console.log("status", res);
    //   if(res == 'SUCCESS'){
    //     this.spinner = false;
    //   this.dialogRef.close();
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

