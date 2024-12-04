import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BoTourService } from 'app/core/services/admin-bo/bo-tours.service';
import { AppState } from 'app/core/store/app.states';
import { selectCitiesAndCategories, selectZones } from 'app/core/store/resources/resources.selectors';
import { ToastService } from 'app/services';

@Component({
  selector: 'app-creation-tournee',
  templateUrl: './creation-tournee.component.html',
  styleUrls: ['./creation-tournee.component.css']
})
export class CreationTourneeComponent implements OnInit {
  isLoading = false;
  cities: any[] = [];
  zones: any[] = [];
  cityZones: any[] = [];
  //
  selectedCity = "";
  selectedZone = "";
  isRenfort = false;
  isHoliday = false;
  selectedDate = "";

  constructor(private store: Store<AppState>, private boTourService: BoTourService,
    private _toast: ToastService, private _router: Router, public dialogRef: MatDialogRef<CreationTourneeComponent>,) { }

  ngOnInit(): void {
    this.store.select(selectCitiesAndCategories).subscribe(res => {
      this.cities = res.filter(item => item.model === "CITY")
    })
    this.store.select(selectZones).subscribe(res => this.zones = res)
  }

  onChangeCity($event) {


    console.log('devent ... ' , $event)
    this.selectedCity = $event.id
    this.selectedZone = "";
    this.cityZones = this.zones.filter(item => item.city_id == this.selectedCity)
  }

  // initialize tour 
  initializeTour() {
    if (!this.selectedCity || !this.selectedZone || !this.selectedDate) {
      this._toast.warn("Certains informations ne sont pas renseignés !"); return;
    }

    this.isLoading = true;
    const payload = { is_renfort_tour: this.isRenfort, start_time: this.selectedDate, zone_id: this.selectedZone }
    this.boTourService.initTour(payload).subscribe((res: any) => {
      this.isLoading = false; this.dialogRef.close();
      this._toast.success("Tournée initialisé avec succés !");
      this._router.navigate([`/planification-tour/${res.response.uuid}`]);
    }, err => { this.isLoading = false; this._toast.error("Une erreur est survenue !") })
  }
}
