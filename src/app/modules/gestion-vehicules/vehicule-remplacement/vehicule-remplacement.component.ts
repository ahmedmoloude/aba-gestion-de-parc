import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { selectEnvRemplacementPayload, selectEnvRemplacementIsLoading, selectEnvRemplacementStatus } from 'app/core/store/remplacement/remplacement.selectors';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { ToastService } from 'app/core';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { VehiculeService } from 'app/core/services/vehicule.service';
import { fetchremplacements } from 'app/core/store/remplacement/remplacement.actions';

@Component({
  selector: 'app-vehicule-remplacement',
  templateUrl: './vehicule-remplacement.component.html',
  styleUrls: ['./vehicule-remplacement.component.css'],
})
export class VehiculeRemplacementComponent implements OnInit {
  p: number = 1;
  remplacements : any;
  links : any;
  spinner : boolean;
  constructor(
    private _router: Router,
    private store: Store<AppState>,
    private boGridService: BoGridService,
    private vehiculeService: VehiculeService,
    private _toast: ToastService,) {}

  ngOnInit(): void {
    this.store.dispatch(fetchremplacements());

    this.store.select(selectEnvRemplacementPayload).subscribe((res) => {
      this.remplacements = res.data;
      this.links = res.links;
      console.log(' remplacements ========>', this.remplacements);
    });

    this.store.select(selectEnvRemplacementIsLoading).subscribe((res) => {
      this.spinner = res;
      console.log(res);
    });
  }

  getTheNext(event){
    this.spinner = true 
    this.vehiculeService.getRemplacement(event).subscribe((res:any)=>{
     this.remplacements = res.response.data
     this.links = res.response.links
     this.spinner = false 
    })
  }

  detailremplacement(uuid) {
    this._router.navigate([`detailremplacement/${uuid}`]);
  }


}
