import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../../core';
import { VehiculeService } from 'app/core/services/vehicule.service';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';

@Component({
  selector: 'app-details-vehicule',
  templateUrl: './details-vehicule.component.html',
  styleUrls: ['./details-vehicule.component.css']
})
export class DetailsVehiculeComponent implements OnInit {
  spinner : boolean = true;
  result : any;
  constructor(private _router: Router,
              private store: Store<AppState>,
              private vehiculeService: VehiculeService,
              private _toast: ToastService) {}

  ngOnInit(): void {
    this.spinner = true;

    this.vehiculeService.getDetailsVehicule().subscribe(
      (data) => {
        this.result = data;
        console.log('result', this.result);
        this.spinner = false;
      },
      (error) => {
        console.log('error', error);
      });
  }

  detailsDoc(type) {
    this._router.navigate([`listdetailsvehicule/${type}`]);
  }

  formatNumber(value) {
    return value?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, " ") || '';
  }


}
