import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { PermissionService } from 'app/core/services/permission.service';
import { VehiculeService } from 'app/core/services/vehicule.service';
import { AppState } from 'app/core/store/app.states';
import { environment } from 'environments/environment';
import { SinistreDetailsComponent } from '../sinistre-details/sinistre-details.component';
import { fetchVehiculeSinistres } from 'app/core/store/vehiculesinistre/vehiculesinistre.actions';
import { DialogSinistresDetailsComponent } from '../dialog-sinistres-details/dialog-sinistres-details.component';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.css']
})
export class ListDetailsComponent implements OnInit {
  p: number = 1;
  type : any;
  trucks : any;
  spinner:boolean;
  url = environment.STORAGE + '/document_vehicule/';

  constructor(  private route: ActivatedRoute,
                private store: Store<AppState>,
                private vehiculeService : VehiculeService,
                private dialog: MatDialog,
                public permissionService: PermissionService) {}

  ngOnInit(): void {
    this.type = this.route.snapshot.params.type;
    console.log('type', this.type);
    if(this.type != 'Intervention')
    this.store.dispatch(fetchVehiculeSinistres());

    this.spinner = true;
    this.vehiculeService.getDetailsVehiculeList(this.type).subscribe((res:any)=>{
      // console.log("data", res)
      this.trucks = res.response
      this.spinner = false
      console.log("trucks", this.trucks)
    })
    }

    getInputsFiler(type){

    }

    getExtraInputsFilter(type) {

    }

    filtrer($event){

    }

    manageSinistre(mode){
      let dialog = this.dialog.open(DialogSinistresDetailsComponent, {
        disableClose: true,
        width: '960px',
        data: { mode, type: this.type },
      });

      dialog.afterClosed().subscribe(
        () => {
          this.spinner = true;
          this.vehiculeService.getDetailsVehiculeList(this.type).subscribe((res:any)=>{
            // console.log("data", res)
            this.trucks = res.response
            this.spinner = false
            console.log("trucks", this.trucks)
          })
        }
      )
    }

    Voirplus(type, id): void {
      this.dialog.open(SinistreDetailsComponent, {
        disableClose: true,
        width: '782px',
        height: '100vh',
        data: { type, id },
        position: { right: '0px' },
      });
    }
}
