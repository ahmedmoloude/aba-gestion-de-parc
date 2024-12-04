import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ToastService } from '../../../../core';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { RecapitulatifDialogComponent } from '../recapitulatif-dialog/recapitulatif-dialog.component';
import * as moment from 'moment';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import {
  selectTrucks,
  selectAllCityAgence,
} from 'app/core/store/resources/resources.selectors';
import { selectEnvPayloadAgence } from 'app/core/store/agence/agence.selectors';
import { SharedAutcompleteComponent } from 'app/shared/components/shared-autcomplete/shared-autcomplete.component';
import { RessouresService } from 'app/core/services/ressoures.service';
import { fetchAxes } from 'app/core/store/resources/resources.actions';



@Component({
  selector: 'app-add-axe',
  templateUrl: './add-axe.component.html',
  styleUrls: ['./add-axe.component.css'],
})
export class AddAxeComponent implements OnInit {
  @ViewChildren(SharedAutcompleteComponent) searchComponents: QueryList<SharedAutcompleteComponent>;
  searchStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}
  contentStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}
  createAxe: FormGroup;
  spinner: boolean = false;
  spinnergetCities: boolean = false;
  aff: boolean = false;
  agenceSpinner: boolean = false;
  cities: any;
  depart: string;
  itineraries: any;
  destination: string;
  axe = [];
  agences = [];
  allAgences = [];
  passage_id = [];
  citiesFilterDepart: any;
  citiesFilterDestination: any;
  citiesFilterAxe: any;
  endpassage: any;
  startPassage: any;
  ordre = 2;
  id_depart = 0;
  id_arrivee = 0;
  id_passage = 0;
  trucks: any[] = [];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.axe, event.previousIndex, event.currentIndex);
    this.axe = this.axe.filter((axe) => axe.deptere == 'transit');
    var ordre = 2;
    for (var i = 0; i < this.axe.length; i++) {
      this.axe[i].ordre = ordre;
      ordre = ordre + 1;
    }
  }

  constructor(
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<AddAxeComponent>,
    private boGridService: BoGridService,
    private _toast: ToastService,
    public dialog: MatDialog,
    private ressourceService: RessouresService,

  ) {}

  deletePassage(item) {
    this.axe = this.axe.filter((axe) => axe.city_id != item.city_id);
    this.axe = this.axe.filter((axe) => axe.deptere == 'transit');
    var ordre = 2;
    for (var i = 0; i < this.axe.length; i++) {
      this.axe[i].ordre = ordre;
      ordre = ordre + 1;
    }
  }

  setForm() {
    this.createAxe = new FormGroup({
      title: new FormControl('', Validators.required),
      // code: new FormControl("", Validators.required),
      depart_id: new FormControl('', Validators.required),
      destination_id: new FormControl('', Validators.required),
      heure_depart: new FormControl('', Validators.required),
      heure_arrivee: new FormControl('', Validators.required),
      truck_id: new FormControl(''),
      passages: new FormArray([]),
    });
  }



  onCityChange(event){
    console.log("event", event.id)
    // this.selectedCity = this.cities.find(city => city.id == event.id)
    console.log('CITY', this.cities.find(city => city.id == event.id))
  }

  initeraryForm = new FormGroup({
    city_id: new FormControl(''),
    hour_depart: new FormControl(''),
    hour_arrivee: new FormControl(''),
    ordre: new FormControl(''),
    deptere: new FormControl('transit'),
    temps_arret: new FormControl(''),
    agence_id: new FormControl(''),
  });

  get passages() {
    return this.createAxe.controls['passages'] as FormArray;
  }

  cityName(id) {
    return this.cities.find((city) => city.id == id);
  }

  AgenceName(id) {
    return this.allAgences.find((agence) => agence.id == id);
  }

  addNewPointAxe() {
    while (this.passages.length !== 0) {
      this.passages.removeAt(0);
    }
    this.initeraryForm.controls['ordre'].setValue(this.ordre);
    this.initeraryForm.controls['deptere'].setValue('transit');
    this.passages.push(this.initeraryForm);
    if (
      this.initeraryForm.get('city_id').value &&
      this.initeraryForm.get('hour_depart').value &&
      this.initeraryForm.get('hour_arrivee').value
    ) {
      this.agenceSpinner = false;
      var startTime = moment(
        this.initeraryForm.get('hour_arrivee').value,
        'HH:mm '
      );
      var endTime = moment(
        this.initeraryForm.get('hour_depart').value,
        'HH:mm '
      );
      var mins = moment
        .utc(moment(endTime, 'HH:mm:ss').diff(moment(startTime, 'HH:mm:ss')))
        .format('HH:mm');
      console.log('min', mins);
      this.initeraryForm.controls['temps_arret'].setValue(mins);
      this.id_passage = this.initeraryForm.get('city_id').value;
      this.passage_id.push(this.initeraryForm.get('city_id').value);
      console.log(this.initeraryForm.value);
      this.axe.push(this.initeraryForm.value);
      this.initeraryForm.reset();
      this.ordre = this.ordre + 1;
    } else {
      console.log('invalid itinerary 2');
    }
  }

  ngOnInit(): void {
    this.setForm();
    // this.store.select(selectTrucks).subscribe((res) => (this.trucks = res));
    this.ressourceService.getTrucks().subscribe(
      (data:any) => {
        console.log("data conducteur", data)
        this.trucks = data.response;
      }
    );

    this.store.select(selectAllCityAgence).subscribe((res) => (this.cities = res));
    this.store.select(selectEnvPayloadAgence).subscribe((res) => {
      this.allAgences = res;
    });
  }

  filterCityDepart(event: any) {
    this.citiesFilterDepart = [];
    if (event.target.value.length > 2) {
      this.boGridService
        .citiesFilter(event.target.value.toUpperCase())
        .subscribe(
          (data) => {
            this.citiesFilterDepart = data;
            console.log('filter citiesFilterDepart', this.citiesFilterDepart);
          },
          (error) => {
            console.log('error', error);
          }
        );
    } else {
    }
  }

  filterCityDestination(event: any) {
    this.citiesFilterDestination = [];
    if (event.target.value.length > 2) {
      this.boGridService
        .citiesFilter(event.target.value.toUpperCase())
        .subscribe(
          (data) => {
            this.citiesFilterDestination = data;
            console.log(
              'filter citiesFilterDestination',
              this.citiesFilterDestination
            );
          },
          (error) => {
            console.log('error', error);
          }
        );
    } else {
    }
  }

  filterCityAxe(event: any) {
    this.citiesFilterAxe = [];
    if (event.target.value.length > 2) {
      this.boGridService
        .citiesFilter(event.target.value.toUpperCase())
        .subscribe(
          (data) => {
            this.citiesFilterAxe = data;
          },
          (error) => {
            console.log('error', error);
          }
        );
    } else {
    }
  }

  passageConfirmation() {
    return this.axe.filter((axe) => axe.deptere == 'transit');
  }

  changeTextToUppercase(field) {
    const obj = {};
    obj[field] = this.createAxe.controls[field].value.toUpperCase();
    this.createAxe.patchValue(obj);
  }

  addAxe() {
    if (this.createAxe.invalid) {
      console.log('invalide', this.createAxe.value);
      return;
    }
    this.axe = this.axe.filter((axe) => axe.deptere == 'transit');
    this.startPassage['hour_depart'] = this.createAxe.get('heure_depart').value;
    this.endpassage['hour_arrivee'] = this.createAxe.get('heure_arrivee').value;
    this.axe.push(this.endpassage);
    this.axe.unshift(this.startPassage);

    let axe = {
      title: this.createAxe.get('title').value.toUpperCase(),
      truck_id: this.createAxe.get('truck_id').value,
      passage: this.axe,
      cities: this.cities,
    };
    console.log('data a envoyser apres mofif', axe);
    if (!axe.title || !axe.passage) {
      this._toast.warn('Remplir tous les champs !');
      this.spinner = false;
    } else {
      this.openDialogrecapitulatif(axe, 'confirmation');
    }
  }

  truckChange(event){
    if(event){
      this.createAxe.controls['truck_id'].setValue(event.id);
    }
  }

  departChange(event) {
    if(event){
      this.id_depart = event.id;
      this.createAxe.controls['depart_id'].setValue(event.id);
      this.startPassage = {};
      this.depart = event.name;
      console.log('ville depart', this.depart);
      this.startPassage = {
        city_id: this.id_depart,
        hour_depart: '',
        hour_arrivee: 'null',
        ordre: 1,
        deptere: 'depart',
      };
      if (this.depart && this.destination) {
        this.aff = true;
      }
    }
  }

  destinationChange(event) {
    if(event){
      console.log("event==============>", event, event.name)
      this.id_arrivee = event.id
      this.createAxe.controls['destination_id'].setValue(event.id);
      console.log('id depart', event.id);
      this.endpassage = {};
      this.endpassage = {
        city_id: this.id_arrivee,
        hour_depart: 'null',
        hour_arrivee: '',
        ordre: '1000',
        deptere: 'terminus',
      };
      this.destination = event.name;
      if (this.depart && this.destination) {
        this.aff = true;
      }
    }
  }

  cityAgence(event) {
    if(event){
      console.log("cityAgence===>", event)
      this.initeraryForm.controls['city_id'].setValue(event.id);
      var cities = this.cities;
      console.log("cities=====>", this.cities)
      console.log("cities=====>", cities.find( (city) => city.id == event.id ).agencies)
      this.agences = cities.find( (city) => city.id == event.id ).agencies;
      this.agenceSpinner = true;
      console.log(this.agences);
    }

  }

  filteredCityPassage() {
    var filter1 = this.cities.filter((city) => city.id != this.id_depart);
    var filter2 = filter1.filter((city) => city.id != this.id_arrivee);
    var filter3 = [];
    if (this.passage_id.length != 0) {
      for (var i = 0; i < this.passage_id.length; i++) {
        filter3 = filter2.filter((city) => city.id != this.passage_id[i]);
        filter2 = filter3;
      }
      return filter3;
    } else {
      return filter2;
    }
  }

  openDialogrecapitulatif(item, type): void {
    const dialogRef = this.dialog.open(RecapitulatifDialogComponent, {
      disableClose: true,
      width: '830px',
      data: { item, type },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.store.dispatch(fetchAxes())
        this.dialogRef.close();
      }
    });
  }
}
