import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { ToastService } from '../../../../core';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { RecapitulatifDialogComponent } from '../recapitulatif-dialog/recapitulatif-dialog.component';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { selectTrucks, selectAllCityAgence } from 'app/core/store/resources/resources.selectors';
import { selectEnvPayloadAgence, selectEnvIsLoadingAgence } from 'app/core/store/agence/agence.selectors';
import * as moment from 'moment';
import { RessouresService } from 'app/core/services/ressoures.service';
import { SharedAutcompleteComponent } from 'app/shared/components/shared-autcomplete/shared-autcomplete.component';

@Component({
  selector: 'app-edit-axe',
  templateUrl: './edit-axe.component.html',
  styleUrls: ['./edit-axe.component.css'],
})
export class EditAxeComponent implements OnInit {
  @ViewChildren(SharedAutcompleteComponent) searchComponents: QueryList<SharedAutcompleteComponent>;
  axe: any;
  editAxe: FormGroup;
  endpassage: any;
  startPassage: any;
  ordre = 2;
  id_depart = 0;
  id_arrivee = 0;
  cities: any;
  aff: boolean = false;
  depart: string;
  itineraries: any;
  destination: string;
  spinnergetCities: boolean = false;
  spinnerAgence: boolean = false;
  spinner: boolean = false;
  allPassage: any;
  passage_id = [];
  trucks: any[] = [];
  agenceSpinner: boolean = false;
  agences = [];
  allAgences = [];
  citiesFilterDepart: any;
  citiesFilterDestination: any;
  citiesFilterAxe: any;
  searchStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}
  contentStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private boGridService: BoGridService,
    private _toast: ToastService,
    public dialogRef: MatDialogRef<EditAxeComponent>,
    public dialog: MatDialog,
    private store: Store<AppState>,
    private ressourceService: RessouresService,
  ) {}

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.allPassage, event.previousIndex, event.currentIndex);
    this.allPassage = this.allPassage.filter((axe) => axe.deptere == 'transit');
    var ordre = 2;
    for (var i = 0; i < this.allPassage.length; i++) {
      this.allPassage[i].ordre = ordre;
      ordre = ordre + 1;
    }
  }

  truckChange(event){
    if(event){
      this.editAxe.controls['truck_id'].setValue(event.id);
    }
  }

  ngOnInit(): void {
    // this.store.select(selectTrucks).subscribe((res) => (this.trucks = res));
    this.ressourceService.getTrucks().subscribe(
      (data:any) => {
        console.log("data conducteur", data)
        this.trucks = data.response;
        setTimeout(() => {
          this.searchComponents.toArray()[0].selectObject(this.axe?.truck)
          // this.searchComponents.toArray()[1].selectObject(this.item?.societe)
          // this.searchComponents.toArray()[0].selectObject(this.item?.prestataire)
        });
      }
    );
    this.axe = this.data['item'];
    console.log('axe recuperer', this.axe);
    this.store.select(selectEnvPayloadAgence).subscribe((res) => {
      this.allAgences = res;
    });
    this.store.select(selectEnvIsLoadingAgence).subscribe((res) => {
      console.log("spinnerAgence", res)
      this.spinnerAgence = !res;
    });

    const arr = [];
    for (var i = 1; i < this.axe['passage'].length - 1; i++) {
      arr.push({
        city_id: this.axe.passage[i].pivot.city_id,
        hour_depart: this.axe.passage[i].pivot.hour_depart,
        hour_arrivee: this.axe.passage[i].pivot.hour_arrivee,
        ordre: this.axe.passage[i].pivot.ordre,
        deptere: this.axe.passage[i].pivot.deptere,
        temps_arret: this.axe.passage[i].pivot.temps_arret,
        agence_id: this.axe.passage[i].pivot.agence_id,
      });
    }

    console.log(arr, 'array1');
    this.allPassage = arr;
    if (this.allPassage.length > 0) {
      this.ordre = this.allPassage[this.allPassage.length - 1].ordre + 1;
    }
    console.log("allPAsage", this.allPassage)
    this.startPassage = {
      city_id: this.axe.passage['0'].pivot.city_id,
      hour_depart: this.axe.passage['0'].pivot.hour_depart,
      hour_arrivee: 'null',
      ordre: 1,
      deptere: 'depart',
    };
    this.endpassage = {
      city_id: this.axe.passage[this.axe.passage.length - 1].pivot.city_id,
      hour_depart: 'null',
      hour_arrivee:
        this.axe.passage[this.axe.passage.length - 1].pivot.hour_arrivee,
      ordre: 1000,
      deptere: 'terminus',
    };
    this.store .select(selectAllCityAgence) .subscribe((res) =>
    {
      (this.cities = res),
      setTimeout(() => {
        this.searchComponents.toArray()[1].selectObject(this.axe?.passage['0'])
        this.searchComponents.toArray()[2].selectObject(this.axe?.passage[this.axe?.passage.length - 1])
        // this.searchComponents.toArray()[0].selectObject(this.item?.prestataire)
      });
    });

    this.depart = this.axe.passage['0'].name;
    this.destination = this.axe.passage[this.axe.passage.length - 1].name;
    this.id_depart = this.axe.passage['0'].id;
    this.id_arrivee = this.axe.passage[this.axe.passage.length - 1].id;
    console.log(this.depart, this.destination, this.id_depart, this.id_arrivee);
    if (this.axe.passage.length > 0) {
      this.aff = true;
      for (var i = 1; i < this.axe.passage.length - 1; i++) {
        // console.log("asdqsdqsd", this.axe.passage[i].pivot.city_id)
        this.passage_id[i] = this.axe.passage[i].pivot.city_id;
      }
    }

    this.editAxe = new FormGroup({
      code: new FormControl(this.axe.code, Validators.required),
      title: new FormControl(this.axe.title, Validators.required),
      depart_id: new FormControl(
        this.axe.passage['0'].pivot.city_id,
        Validators.required
      ),
      destination_id: new FormControl(
        this.axe.passage[this.axe.passage.length - 1].pivot.city_id,
        Validators.required
      ),
      heure_depart: new FormControl(
        this.axe.passage['0'].pivot.hour_depart,
        Validators.required
      ),
      heure_arrivee: new FormControl(
        this.axe.passage[this.axe.passage.length - 1].pivot.hour_arrivee,
        Validators.required
      ),
      truck_id: new FormControl(this.axe.truck_id),
      passages: new FormArray([]),
    });
  }

  cityAgence(event) {
    if(event){
      this.initeraryForm.controls['city_id'].setValue(event.id);
      // this.citiesFilterAxe.find((city) => city.name == $event.option.value).id
      console.log("ID VILLE", event.id);
      var cities = this.cities;
      console.log("cities", cities);
      this.agences = cities.find((city) => city.id == event.id).agencies;
      this.agenceSpinner = true;
      console.log("AGENCE", this.agences);
      // return agences;
    }
  }

  addNewPointAxe() {
    this.agenceSpinner = false;
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
      this.allPassage.push(this.initeraryForm.value);
      this.passage_id.push(this.initeraryForm.get('city_id').value);
      this.initeraryForm.reset();
      this.ordre = this.ordre + 1;
    } else {
      console.log('invalid itinerary 2');
    }
  }

  initeraryForm = new FormGroup({
    city_id: new FormControl(''),
    hour_depart: new FormControl(''),
    hour_arrivee: new FormControl(''),
    ordre: new FormControl(''),
    temps_arret: new FormControl(''),
    agence_id: new FormControl(''),
    deptere: new FormControl('transit'),
  });

  get passages() {
    return this.editAxe.controls['passages'] as FormArray;
  }

  editAxeSubmit() {
    if (this.editAxe.invalid) {
      console.log('invalide');
      return;
    }
    if (this.endpassage && this.startPassage) {
      console.log('existe');
      this.startPassage['hour_depart'] = this.editAxe.get('heure_depart').value;
      this.endpassage['hour_arrivee'] = this.editAxe.get('heure_arrivee').value;
      this.allPassage = this.allPassage.filter(
        (axe) => axe.deptere == 'transit'
      );
      this.allPassage.push(this.endpassage);
      this.allPassage.unshift(this.startPassage);
    } else {
      console.log('nn');
    }

    let axe = {
      title: this.editAxe.get('title').value.toUpperCase(),
      code: this.editAxe.get('code').value,
      truck_id: this.editAxe.get('truck_id').value,
      passage: this.allPassage,
      cities: this.cities,
      axe_id: this.axe.passage['0'].pivot.axe_id,
    };
    console.log('data a envoyser apres mofif', axe);

    if (!axe.code || !axe.title || !axe.passage) {
      this._toast.warn('Remplir tous les champs !');
      this.spinner = false;
    } else {
      this.openDialogrecapitulatif(axe, 'confirmation');
    }
  }

  changeTextToUppercase(field) {
    const obj = {};
    obj[field] = this.editAxe.controls[field].value.toUpperCase();
    this.editAxe.patchValue(obj);
  }

  filterCityDepart(event: any) {
    // console.log(event)
    this.citiesFilterDepart = [];
    console.log(event.target.value);
    if (event.target.value.length > 2) {
      this.boGridService
        .citiesFilter(event.target.value.toUpperCase())
        .subscribe(
          (data) => {
            console.log(data);
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
    // console.log(event)
    this.citiesFilterDestination = [];
    console.log(event.target.value);
    if (event.target.value.length > 2) {
      this.boGridService
        .citiesFilter(event.target.value.toUpperCase())
        .subscribe(
          (data) => {
            // console.log(data);
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
    // console.log(event)
    this.citiesFilterAxe = [];
    // console.log(event.target.value);
    if (event.target.value.length > 2) {
      this.boGridService
        .citiesFilter(event.target.value.toUpperCase())
        .subscribe(
          (data) => {
            // console.log(data);
            this.citiesFilterAxe = data;
            console.log('filter citiesFilterAxe', this.citiesFilterAxe);
          },
          (error) => {
            console.log('error', error);
          }
        );
    } else {
    }
  }

  openDialogrecapitulatif(item, type): void {
    const dialogRef = this.dialog.open(RecapitulatifDialogComponent, {
      disableClose: true,
      width: '830px',
      data: { item, type },
    });

    dialogRef.afterClosed().subscribe((data) => {
      // console.log('close recap edit');
      if (data) {
        // console.log('get apres create', data);
        this.dialogRef.close();
      }
    });
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

  // departChange($event) {
  //   console.log($event.option.value);
  //   this.id_depart = this.citiesFilterDepart.find(
  //     (city) => city.name == $event.option.value
  //   ).id;
  //   console.log('id depart', this.id_depart);
  //   this.editAxe.controls['depart_id'].setValue(this.id_depart);
  //   this.startPassage = {};
  //   this.depart = $event.option.value;
  //   console.log('ville depart', this.depart);
  //   this.startPassage = {
  //     city_id: this.id_depart,
  //     hour_depart: '',
  //     hour_arrivee: 'null',
  //     ordre: 1,
  //     deptere: 'depart',
  //   };
  //   if (this.depart && this.destination) {
  //     this.aff = true;
  //   }
  // }

  departChange(event) {
    if(event){
      this.id_depart = event.id;
      this.editAxe.controls['depart_id'].setValue(event.id);
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

  // destinationChange($event) {
  //   console.log($event.option.value);
  //   this.id_arrivee = this.citiesFilterDestination.find(
  //     (city) => city.name == $event.option.value
  //   ).id;
  //   this.editAxe.controls['destination_id'].setValue(this.id_arrivee);
  //   console.log('id depart', this.id_arrivee);
  //   this.endpassage = {};
  //   this.endpassage = {
  //     city_id: this.id_arrivee,
  //     hour_depart: 'null',
  //     hour_arrivee: '',
  //     ordre: '1000',
  //     deptere: 'terminus',
  //   };
  //   this.destination = $event.option.value;
  //   if (this.depart && this.destination) {
  //     this.aff = true;
  //   }
  // }

  destinationChange(event) {
    if(event){
      console.log("event==============>", event, event.name)
      this.id_arrivee = event.id
      this.editAxe.controls['destination_id'].setValue(event.id);
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

  passageConfirmation() {
    return this.allPassage.filter((axe) => axe.deptere == 'transit');
  }

  cityName(id) {
    return this.cities.find((city) => city.id == id);
  }

  AgenceName(id) {
    return this.allAgences.find((agence) => agence.id == id);
  }

  deletePassage(item) {
    this.allPassage = this.allPassage.filter(
      (axe) => axe.city_id != item.city_id
    );
    this.allPassage = this.allPassage.filter((axe) => axe.deptere == 'transit');
    var ordre = 2;
    for (var i = 0; i < this.allPassage.length; i++) {
      this.allPassage[i].ordre = ordre;
      ordre = ordre + 1;
    }
  }
}
