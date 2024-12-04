import { status } from './../../../core/helpers/consts/status';
import { AffretementService } from './../../../core/services/affretement.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ToastService } from 'app/services';
import { Router } from '@angular/router';
registerLocaleData(localeFr, 'fr');
import * as moment from 'moment';
import { IfNullPipe } from 'app/pipes';
import { PersonelService } from 'app/core/services/personel.service';
import { RessouresService } from 'app/core/services/ressoures.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { DialogAffectationComponent } from './dialog-affectation/dialog-affectation.component';
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////// CHECK EVENT START DATE AND END DATE GRATGER THAN CALENDAR /////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
@Component({
  selector: 'app-affectation',
  templateUrl: './affectation.component.html',
  styleUrls: ['./affectation.component.css'],
})
export class AffectationComponent implements OnInit {
  currentWeekStart: Date;
  currentWeekEnd: Date;
  spinner : boolean = false;
  drawnElements = [];
  data: any = [
  //  [
  //   {
  //     'numero': '07547',
  //     'date_debut': '2023-05-26',
  //     'date_fin': '2023-05-26',
  // },
  //   {
  //     'numero': 'Anas',
  //     'date_debut': '2023-03-09',
  //     'date_fin': '2023-03-09',
  // },
  //   {
  //     'numero': '098320',
  //     'date_debut': '2023-03-04',
  //     'date_fin': '2023-03-14',
  // },
  //   {
  //     'numero': '07545',
  //     'date_debut': '2023-03-06',
  //     'date_fin': '2023-03-06',
  // },
  //   {
  //     'numero': '07546',
  //     'date_debut': '2023-03-06',
  //     'date_fin': '2023-03-06',
  // },
  // {
  //     'numero': '098321',
  //     'date_debut': '2023-03-05',
  //     'date_fin': '2023-03-06',
  // },
  // {
  //     'numero': '098322',
  //     'date_debut': '2023-03-06',
  //     'date_fin': '2023-03-07',
  // },
  // {
  //     'numero': '098323',
  //     'date_debut': '2023-03-07',
  //     'date_fin': '2023-03-07',
  // },
  // {
  //     'numero': '098324',
  //     'date_debut': '2023-03-04',
  //     'date_fin': '2023-03-07',
  // },
  // {
  //     'numero': '098325',
  //     'date_debut': '2023-03-08',
  //     'date_fin': '2023-03-09',
  // },
  // {
  //     'numero': '098326',
  //     'date_debut': '2023-03-08',
  //     'date_fin': '2023-03-09',
  // },
  // {
  //     'numero': '098327',
  //     'date_debut': '2023-03-09',
  //     'date_fin': '2023-03-09',
  // },
  // {
  //     'numero': '098328',
  //     'date_debut': '2023-03-09',
  //     'date_fin': '2023-03-12',
  // },
  //  ],
  //  [
  //   {
  //     'numero': '0001',
  //     'date_debut': '2023-02-27',
  //     'date_fin': '2023-02-27',
  // },
  // {
  //     'numero': '0002',
  //     'date_debut': '2023-02-27',
  //     'date_fin': '2023-02-27',
  // },
  // {
  //     'numero': '0003',
  //     'date_debut': '2023-02-27',
  //     'date_fin': '2023-02-27',
  // },
  // {
  //     'numero': '0004',
  //     'date_debut': '2023-02-28',
  //     'date_fin': '2023-03-01',
  // },
  // {
  //     'numero': '098324',
  //     'date_debut': '2023-03-04',
  //     'date_fin': '2023-03-07',
  // },
  //  ]
  ];
  demandes = [];
  filteredData = [];
  isAllChecked :any;
  isAttenteChecked :any;
  isValideChecked :any;
  affectation_pop_up : boolean = false
  affectation_pop_up_col : boolean = false
  spinner_vehicule : boolean = false
  spinner_driver : boolean = false
  data_affectation = [];
  date_affectation : any;
  div_cols: number = 12;
  drivers : any;
  trucks : any;
  vehicules : any;
  myForm = new FormGroup({});

  constructor(private datePipe: DatePipe,
              private affretementService: AffretementService,
              public route: Router,
              private _toast: ToastService,
              private personelService : PersonelService,
              private ressourceService: RessouresService,
              public dialog: MatDialog)
              {
                this.initWeek()
              }

  ngOnInit() {
    this.getEventsCalendar();
  }

  desaffecter(uuid){
    console.log("UUID ", uuid)
    Swal.fire({
      title: 'Êtes-vous sûr(e) de vouloir annuler cette demande ?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.affretementService.desaffectationDemande(uuid).subscribe(
          (data) => {
            console.log("DEMANDES CONFIRMEE ",  data['response'])
            this._toast.success("Demande désaffecter avec succées")
            this.data = this.demandes.filter(function(obj) {
              return obj.uuid !== uuid;
            });
            this.data.unshift(data['response']);
            this.filterDataByDays();
            this.affectation_pop_up = false;
          },
          (error) => {
            console.log('error', error);
          })
      }
    });

  }

  slide(col, item = null){
    this.affectation_pop_up_col = !this.affectation_pop_up_col
    this.div_cols = col;
  }

  affecter(demande){
    const dialogRef = this.dialog.open(DialogAffectationComponent, {
      width: '750px',
      data: { demande },
    });

    dialogRef.afterClosed().subscribe((data) => {
      console.log("DATA AFTER AFFECTATION ", data)
      if (data) {
        // console.log("DATA AFTER CLOSE ", data)
        // this.data = this.demandes.filter(function(obj) {
        //   return obj.uuid !== demande.uuid;
        // });
        // this.data.unshift(data);
        // this.filterDataByDays();
        this.getEventsCalendar();
        this.affectation_pop_up = false;
      }
    });
  }

  joinTonnage(array){
    // console.log("array en enter", array)
    return array.map(function(obj) {
      return obj["name"];
    }).join(', ');
  }

  affectation(data = null, date = null){
    this.data_affectation = [];

    const weekStartMs = this.currentWeekStart.getTime();
    const currentDateMs = moment(weekStartMs + date * 24 * 60 * 60 * 1000).format('YYYY-MM-DD')
    this.data.forEach(element => {

      var start = moment(element.date_debut).format('YYYY-MM-DD')
      var end = moment(element.date_fin).format('YYYY-MM-DD')
      if(currentDateMs >= start && currentDateMs <= end){
        // element.drivers = [{'name': 'anas'}, {'name': 'kawthar'}]
        // element.trucks = [{'name': 'L8585'}, {'name': 'M2020'}]
        this.data_affectation.push(element)
      }
    });
    // console.log("data_affectation ", this.data_affectation)
    this.affectation_pop_up = true
    this.affectation_pop_up_col = false;
    this.div_cols = 12;
    this.date_affectation = date
  }

  countEnAttente(data){
    return data.filter( d => d.statut == 'EN_ATTENTE_AFFECTATION').length
  }

  countValide(data){
    return data.filter( d => d.statut == 'ACCEPTED').length
  }

  getEventsCalendar(){
    let calendarDates = {
      date_debut : moment(this.currentWeekStart).format('YYYY-MM-DD'),
      date_fin : moment(this.currentWeekEnd).format('YYYY-MM-DD'),
    }
    this.spinner = true;
    this.affretementService.getCalendar(null, calendarDates).subscribe(
      (data) => {
        console.log("DEMANDES ", data['response'])
        this.data = data['response'];
        this.demandes = data['response'];
        this.filterDataByDays()
        this.spinner = false;
      },
      (error) => {
        console.log('error', error);
      })
  }

  initWeek(){
    const today = new Date();
    const dayOfWeek = today.getDay() === 0 ? 7 : today.getDay();
    this.currentWeekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - dayOfWeek + 1);
    this.currentWeekEnd = new Date(this.currentWeekStart.getFullYear(), this.currentWeekStart.getMonth(), this.currentWeekStart.getDate() + 6);
  }

  filterDataByDays() {
    const weekStartMs = this.currentWeekStart.getTime();

    const filteredData = [];
    this.filteredData = [];
    let exists = []
    for (let i = 0; i < 7; i++) {
      const currentDateMs = weekStartMs + i * 24 * 60 * 60 * 1000;
      const filteredDayData = this.data
        .filter(e => {
          let date_debut = new Date(e.date_debut)
          date_debut = new Date(date_debut.getFullYear(), date_debut.getMonth(), date_debut.getDate())
          let date_fin = new Date(e.date_fin)
          date_fin = new Date(date_fin.getFullYear(), date_fin.getMonth(), date_fin.getDate())
          let checker = new Date(currentDateMs)
          // console.log('CHECKER', checker)
          checker = new Date(checker.getFullYear(), checker.getMonth(), checker.getDate())
          return new Date(date_debut) <= new Date(checker) &&
          new Date(date_fin) >= new Date(checker) &&
          !exists.find(l => l.id == e.id)
        }

          )
        .map(e => ({ ...e, style: this.getStyleByDates(e.date_debut, e.date_fin)[0], icon:this.getStyleByDates(e.date_debut, e.date_fin)[1].icon }));
        exists.push(...filteredDayData)
        filteredData.push(filteredDayData);
    }
    this.addIgnore(filteredData);

      this.filteredData = filteredData;
      console.log('FIILTERED', this.filteredData)
  }

  addIgnore(filteredData){
    for (let i = 1; i < 7; i++) {
      filteredData[i].forEach((el, j) => {
        filteredData.slice(0, i).forEach((prevData) => {
          prevData.forEach((prev, m) => {
            if (m === j && this.isDateBetween(prev.date_debut, prev.date_fin, el.date_debut)) {
              const newElement = { ignore: true };
              filteredData[i].splice(j, 0, newElement);
              this.addIgnore(filteredData)
            }
          });
        });
      });
    }
  }

  nextWeek() {
    const nextWeekStart = new Date(this.currentWeekStart);
    nextWeekStart.setDate(nextWeekStart.getDate() + 7);
    this.currentWeekStart = nextWeekStart;
    this.currentWeekEnd = new Date(this.currentWeekStart.getFullYear(), this.currentWeekStart.getMonth(), this.currentWeekStart.getDate() + 6);
    // this.filterDataByDays()
    this.getEventsCalendar();
  }

  previousWeek() {
    const previousWeekStart = new Date(this.currentWeekStart);
    previousWeekStart.setDate(previousWeekStart.getDate() - 7);
    this.currentWeekStart = previousWeekStart;
    this.currentWeekEnd = new Date(this.currentWeekStart.getFullYear(), this.currentWeekStart.getMonth(), this.currentWeekStart.getDate() + 6);
    // this.filterDataByDays();
    this.getEventsCalendar();
  }

  isDateBetween(start: any, end: any, date: any): boolean {
    return new Date(date) > new Date(start) && new Date(date) <= new Date(end);
  }

  formatDate(date: any): string {
    return this.datePipe.transform(date, 'fullDate', 'fr');
  }

  formatToDay(day: any): string {
    let date = this.currentWeekStart.getTime() + day*24*60*60*1000
    return this.datePipe.transform(date, 'dd');
  }

  getStyleByDates(date_debut, date_fin){
    date_debut = new Date(date_debut)
    date_fin = new Date(date_fin)
    let start_date = new Date(date_debut.getFullYear(), date_debut.getMonth(), date_debut.getDate())
    let end_date = new Date(date_fin.getFullYear(), date_fin.getMonth(), date_fin.getDate())
    let diff_ms = end_date.getTime() - start_date.getTime();
    let diff_days = (diff_ms / (1000 * 60 * 60 * 24)) + 1;
    let precent = diff_days * 100
    let style = `width: calc(${precent}% - 20px)`
    let icon = null
    // console.log(end_date, this.currentWeekEnd)
    if(end_date > this.currentWeekEnd){
      const differenceInMilliseconds = this.currentWeekEnd.getTime() - start_date.getTime() ;
      const _diff_days = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24)) + 1;
      precent = _diff_days > 7 ? 7 *  100 : _diff_days * 100
      style = `width: calc(${precent}% - 8px); border-right:0; border-radius:11px 0 0 11px; position:relative`
      icon = 'right'

    }
    if(start_date < this.currentWeekStart){
      date_debut = new Date(this.currentWeekStart)
      date_fin = new Date(date_fin)
      let start_date = new Date(date_debut.getFullYear(), date_debut.getMonth(), date_debut.getDate())
      let end_date = new Date(date_fin.getFullYear(), date_fin.getMonth(), date_fin.getDate())
      let diff_ms = end_date.getTime() - start_date.getTime();
      let diff_days = (diff_ms / (1000 * 60 * 60 * 24)) + 1;
      precent = diff_days > 7 ? 7 * 100 : diff_days * 100
      style = `width: calc(${precent}% - 10px); margin-left:0px; border-left:0; border-radius:0 11px 11px 0; position:relative`
      icon = 'left'

    }

    return [this.getStyleObject(style), {icon:icon}];
  }

  getStyleObject(styleString: string): {[key: string]: string} {
    return styleString.split(';')
      .map(styleRule => styleRule.split(':').map(s => s.trim()))
      .filter(styleRule => styleRule.length === 2)
      .reduce((styleObject, styleRule) => {
        styleObject[styleRule[0]] = styleRule[1];
        return styleObject;
      }, {});
  }

  eventEdited($event){
    console.log('FROM PARENT', $event)
    this.data.find(e => e.id == $event.id).date_debut = $event.date_debut;
    this.data.find(e => e.id == $event.id).date_fin = $event.date_fin;
    this.filterDataByDays();
  }

  cocherTous() {
    console.log("CHECKED", this.isAllChecked)
    if (this.isAllChecked) {
      console.log("CHECKED ALL")
      this.isAttenteChecked = true;
      this.isValideChecked = true;
      this.data = this.demandes
      this.filterDataByDays();
    } else {
      console.log("CHECKED NONE")
      this.isAttenteChecked = false;
      this.isValideChecked = false;
    }
  }

  enAttente(){
    if (this.isAttenteChecked && this.isValideChecked) {
      this.isAllChecked = true;
      this.data = this.demandes
      this.filterDataByDays();
    } else {
      this.isAllChecked = false;
    }

    if(!this.isValideChecked && this.isAttenteChecked){
      console.log("EN_ATTENTE_AFFECTATION");
      console.log("DEMANDES", this.demandes)
      console.log("DEMANDES", this.demandes.filter( d => d.statut == 'EN_ATTENTE_AFFECTATION'))
      this.data = this.demandes.filter( d => d.statut == 'EN_ATTENTE_AFFECTATION')
      this.filterDataByDays();
    }
    if(this.isValideChecked && !this.isAttenteChecked){
      console.log("ACCEPTED");
      this.data = this.demandes.filter( d => d.statut == 'ACCEPTED')
      this.filterDataByDays();
    }
  }

  valide(){
    if (this.isAttenteChecked && this.isValideChecked) {
      this.isAllChecked = true;
      this.data = this.demandes
      this.filterDataByDays();
    } else {
      this.isAllChecked = false;
    }

    if(this.isValideChecked && !this.isAttenteChecked){
      console.log("ACCEPTED");
      this.data = this.demandes.filter( d => d.statut == 'ACCEPTED')
      this.filterDataByDays();
    }
    if(!this.isValideChecked && this.isAttenteChecked){
      console.log("EN_ATTENTE_AFFECTATION");
      this.data = this.demandes.filter( d => d.statut == 'EN_ATTENTE_AFFECTATION')
      this.filterDataByDays();
    }
  }

}
