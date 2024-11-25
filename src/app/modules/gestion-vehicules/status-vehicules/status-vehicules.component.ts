import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../../core';
import { VehiculeService } from 'app/core/services/vehicule.service';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';

@Component({
  selector: 'app-status-vehicules',
  templateUrl: './status-vehicules.component.html',
  styleUrls: ['./status-vehicules.component.css']
})
export class StatusVehiculesComponent implements OnInit {
  spinner : boolean = true;
  result : any;
  constructor(private _router: Router,
              private store: Store<AppState>,
              private vehiculeService: VehiculeService,
              private _toast: ToastService) {}

  ngOnInit(): void {
    this.spinner = true;
    this.vehiculeService.getStatusVehicule().subscribe(
      (data) => {
        this.result = data;
        console.log('result', this.result);
        this.spinner = false;
      },
      (error) => {
        console.log('error', error);
      });
  }
  
  formatNumber(value) {
    // console.log("value", value)
    // console.log("123456789".toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "))
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
  
  detailsDoc(type) {
    this._router.navigate([`liststatusvehicule/${type}`]);
  }


}
