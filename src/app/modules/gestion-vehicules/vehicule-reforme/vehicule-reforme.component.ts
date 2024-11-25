import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { selectEnvVehiculePayload, selectEnvVehiculeIsLoading } from 'app/core/store/vehicule/vehicule.selectors';
import { selectTrucks } from 'app/core/store/resources/resources.selectors';

@Component({
  selector: 'app-vehicule-reforme',
  templateUrl: './vehicule-reforme.component.html',
  styleUrls: ['./vehicule-reforme.component.css'],
})
export class VehiculeReformeComponent implements OnInit {
  p: number = 1;
  spinner : boolean = false;
  vehicules: any;
  
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select(selectTrucks).subscribe((res) => {  
      this.vehicules = res.filter(vehicule => vehicule.status == "REFORME");
      console.log(" vehicules ========>", this.vehicules)
    });

    // this.store.select(selectEnvVehiculeIsLoading).subscribe((res) => {  
    //   this.spinner = res;
    //   console.log(res)
    // });
  }
}
