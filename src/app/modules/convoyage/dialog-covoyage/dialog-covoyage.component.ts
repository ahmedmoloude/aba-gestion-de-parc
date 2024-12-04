import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BoCovoyageService } from 'app/core/services/admin-bo/bo-covoyage.service';
import { AppState } from 'app/core/store/app.states';
import { selectAxes, selectCitiesAndCategories, selectDrivers, selectTrucks } from 'app/core/store/resources/resources.selectors';
import { ToastService } from 'app/services';

@Component({
  selector: 'app-dialog-covoyage',
  templateUrl: './dialog-covoyage.component.html',
  styleUrls: ['./dialog-covoyage.component.css']
})
export class DialogCovoyageComponent implements OnInit {


  minDate: string;


  axes: any[] = [];
  drivers: any[] = [];
  trucks: any[] = [];
  cities: any[] = [];
  intineraries: any[] = [];
  isLoading: boolean = false;
  covoyageForm: {
    start_date: string,
    city_from_id: string,
    city_dest_id: string,
    axe_id: string,
    axe: any,
    // itineraries_ids: { city_id: string, agency_id: string }[], // unsed !!
    // driver_id: string,
    // truck_id: string,
  };
  covoyageKpis: any = null;

  constructor(private store: Store<AppState>, private _toast: ToastService,
    private boCovoyageService: BoCovoyageService, private _router: Router,
    private _dialogRef: MatDialogRef<DialogCovoyageComponent>) {


      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, '0');
      const day = today.getDate().toString().padStart(2, '0');
      const hours = today.getHours().toString().padStart(2, '0');
      const minutes = today.getMinutes().toString().padStart(2, '0');

      this.minDate = `${year}-${month}-${day}T${hours}:${minutes}`;
     }

  ngOnInit(): void {
    this.covoyageForm = {
      start_date: "", city_from_id: "", city_dest_id: "", axe_id: "", axe: null, // driver_id: "", truck_id: "",
      // itineraries_ids: [], 
    }
    this.store.select(selectCitiesAndCategories).subscribe(res => this.cities = res.filter(c => c.model === "CITY"))
    this.store.select(selectAxes).subscribe(res =>{

      this.axes = res


      console.log('axes', this.axes)
    } )
    this.store.select(selectDrivers).subscribe(res => this.drivers = res)
    this.store.select(selectTrucks).subscribe(res => this.trucks = res)
  }

  filterCities(excluded_city: any) { return this.cities.filter(c => c.id != excluded_city) }

  onChangeAxe() {
    let from: string; let dest: string;
    if (this.covoyageForm.axe_id) {
      this.covoyageForm.axe = this.axes.find(c => c.id == this.covoyageForm.axe_id);
      // todo comment
      if (!this.covoyageForm.axe || this.covoyageForm.axe.passage.length < 2) {
        this._toast.warn("Villes de transits non définis !");
        from = ""; dest = ""; this.covoyageForm.axe = null; this.covoyageKpis = null;
      } else {
        from = this.covoyageForm.axe.passage[0].id.toString();
        dest = this.covoyageForm.axe.passage[this.covoyageForm.axe.passage.length - 1].id.toString();
        // todo comment
        if (from === dest) {
          this._toast.warn("Ville départ et destination sont identiques !");
          from = ""; dest = ""; this.covoyageForm.axe = null; this.covoyageKpis = null;
        }
      }
    } else {
      from = ""; dest = ""; this.covoyageForm.axe = null; this.covoyageKpis = null;
    }

    // todo comment
    this.covoyageForm.city_from_id = from; this.covoyageForm.city_dest_id = dest;

    if (from !== "" && dest !== "") {
      this.getCovoyageKpis();
    }

    // if (from !== "" && dest !== "") {
    //   this.covoyageForm.itineraries_ids = this.covoyageForm.axe.passage.map((item: any) => ({ city_id: item.id, agency_id: "", }))
    // } else {
    //   this.covoyageForm.itineraries_ids = [];
    // }
  }

  onSubmit() {
    if (this.covoyageForm.start_date == "" || this.covoyageForm.city_from_id == "" || this.covoyageForm.city_dest_id == ""
      || this.covoyageForm.axe_id == "") {
      this._toast.warn("Certains informations ne sonts pas renseigner !"); return;
    }

    // payload.itineraries_ids = payload.itineraries_ids.filter(item => item.agency_id !== "")
    // console.log(payload)
    // if (!payload.itineraries_ids.length) {
    //   this._toast.warn(" Agence de destination non renseigner !"); return;
    // }

    const payload = { ... this.covoyageForm }; this.isLoading = true;
    this.boCovoyageService.initCovoyage(payload).subscribe(
      (data: any) => {
        this.isLoading = false;
        this._dialogRef.close(true)
        //this._router.navigate([`/generationcovoyage/${data.response.uuid}`]);
      },
      (error) => { this.isLoading = false; this._toast.error("Une erreur est survenue !") }
    );
  }


  getCovoyageKpis() {
    if (this.covoyageForm.city_from_id == "" || this.covoyageForm.city_dest_id == "" || this.covoyageForm.axe_id == "") {
      this.covoyageKpis = null; return;
    }

    const payload = { ... this.covoyageForm }; this.isLoading = true;
    this.boCovoyageService.getCovoyageKpis(payload).subscribe(
      (data: any) => {
        this.isLoading = false;
        this.covoyageKpis = data.response
      },
      (error) => {
        this.isLoading = false; this.covoyageKpis = null;
        this._toast.error("Une erreur est survenue !")
      }
    );
  }

}
