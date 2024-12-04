import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FeuilleDeRouteService} from '../../../core/services/feuille-de-route.service'
import {FormGroup, FormControl} from '@angular/forms';
import {VehiculeService} from '../../../core/services/vehicule.service'
import { selectEnvparcPayload } from 'app/core/store/parc/parc.selectors';
import { AppState } from 'app/core/store/app.states';
import { Store } from '@ngrx/store';
import { PersonelService } from 'app/core/services/personel.service';
import { selectPagination } from 'app/core/store/pagination/pagination.selectors';
import { Paginator } from 'app/core/models/paginator.model';
import { updatePagination } from 'app/core/store/pagination/pagination.actions';

@Component({
  selector: 'app-liste-feuille',
  templateUrl: './liste-feuille.component.html',
  styleUrls: ['./liste-feuille.component.css'],
})
export class ListeFeuilleComponent implements OnInit {
  pagination!: Paginator;
  per_page = 10;
  p: number = 1;
  filterData: any;
  filters = {}

  roadMapds: any = [];
  links : any = [];
  spinner : boolean ;
  citerns : any = [];
  parcs : any = [];
  drivers : any = [];
  inputsFiler = [
    {
      name: 'start_date',
      placeholder: 'Date début',
      type: 'date'
    },
    {
      name: 'end_date',
      placeholder: 'Date fin',
      type: 'date'
    },
    // {
    //   name: 'city_id',
    //   placeholder: 'N° feuille de route',
    //   type: 'input',
    // },
    {
      name: 'code_interne',
      placeholder: 'Code véhicule',
      type: 'text'
    },
    {
      name: 'matricule',
      placeholder: 'Immatriculation',
      type: 'text',
    },
    {
      name: 'driver_id',
      placeholder: 'Conducteur',
      type: 'select',
      options: []
    },
    {
      name: 'status',
      placeholder: 'Status',
      type: 'select',
      options: [
        {
          text: 'OPENED',
          value: 'OPENED',
        },
        {
          text: 'CLOSED',
          value: 'CLOSED',
        }
      ]
    },

  ];

  extraInputsFilter = [
    {
      name: 'parc_id',
      placeholder: 'Lieu d\'approvisionnement',
      type: 'select',
      options: []
    },
    {
      name: 'de_created_at',
      placeholder: 'Date de céation : Du',
      type: 'date'
    },
    {
      name: 'a_created_at',
      placeholder: 'Date de céation : Au',
      type: 'date'
    }
  ];

  constructor(public route: Router,
              private feuilleDeRouteService : FeuilleDeRouteService ,
              private vehiculeService : VehiculeService,
              private store: Store<AppState>,
              private personelService : PersonelService, ) {}

  RangePicker = new  FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  ngOnInit(): void {
    this.store.select(selectPagination).subscribe(pagination => {
      this.pagination = pagination
    })
    this.getAllRoadMap();
    this.vehiculeService.getCiterne().subscribe((res:any)=>{
      this.citerns = res.response.data
    })

    this.store.select(selectEnvparcPayload).subscribe((res) => {
      this.parcs = res
      for(var i=0; i<this.parcs.length; i++){
        this.extraInputsFilter["0"]?.options.push({
          'text' : this.parcs[i].name,
          'value' : this.parcs[i].id,
        })
      }
    });

    this.personelService.personnelbyFunction(null,'DRIVER').subscribe(
      (data:any) => {
        // console.log("CONDUCTEURS ", data)
        this.drivers = data.response;
        for(var i=0; i<this.drivers.length; i++){
          this.inputsFiler["4"]?.options.push({
            'text' : this.drivers[i].first_name + ' ' + this.drivers[i].last_name,
            'value' : this.drivers[i].id,
          })
        }
      });
  }

  detailfeuille(uuid:any) {
    this.route.navigate([`detailfeuille`, uuid]);

  }
  getAllRoadMap(){
    this.spinner = true
    this.feuilleDeRouteService.getAllRoadmap(null, this.p, this.per_page).subscribe((res:any)=>{
      this.links = res.response.links
      this.roadMapds = res.response.data
      this.spinner = false;

      this.store.dispatch(updatePagination({
        currentPage: res.response.currentPage,
        pageSize: res.response.per_page,
        totalItems: res.response.total
       }));
    })
  }

  filtrer($event) {
    console.log('FILTER RDV', $event);
    this.spinner = true;
    this.filters = $event;
    this.feuilleDeRouteService.getAllRoadmap( $event, this.p, this.per_page).subscribe(
      (res:any)=>{
        this.roadMapds = res.response.data
        this.spinner = false;

        this.store.dispatch(updatePagination({
          currentPage: res.response.currentPage,
          pageSize: res.response.per_page,
          totalItems: res.response.total
        }));
      },
      (error) => {
        console.log('error', error);
      }
    )
  }

  paginate($event: any){
    console.log( 'page size ' , $event)
    this.spinner = true;

    this.per_page = $event.rows;
    const paginator = {
      currentPage: $event.page,
      nextPage: $event.page + 1,
      pageSize: $event.pageCount,
      totalItems: this.pagination.totalItems,
    }
    this.feuilleDeRouteService.getAllRoadmap(this.filters, paginator.nextPage, this.per_page ).subscribe(
      (res:any)=>{
        this.roadMapds = res.response.data
        this.spinner = false;

        this.store.dispatch(updatePagination({
          currentPage: res.response.currentPage,
          pageSize: res.response.per_page,
          totalItems: res.response.total
        }));
      },
      (error) => {
        console.log('error', error);
      }
    )
  }

  getTheNext(event){
      this.spinner = true
      this.feuilleDeRouteService.getAllRoadmap(event).subscribe((res:any)=>{
      this.links = res.response.links
      this.roadMapds = res.response.data
      this.spinner = false
    })
  }
  getRoadMaps(){
       this.spinner = true;
       const date = {
       start_date : this.RangePicker.controls.start.value,
       end_date : this.RangePicker.controls.end.value
       }
       this.feuilleDeRouteService.filtreRoadMap(date).subscribe((res:any)=>{
        this.links = res.response.links
        this.roadMapds = res.response.data
        this.spinner = false
       })
  }
  getParck(id:number){
    var name = ''
    this.citerns.forEach(element=>{
      if(element.parc.id === id)
      {
       name = element.name
      }
    })

    let citerne = this.citerns?.find(e => e.parc?.id == id)
    return citerne? citerne.name + ' - ' + citerne.parc?.name : '---' ;
  }

}
