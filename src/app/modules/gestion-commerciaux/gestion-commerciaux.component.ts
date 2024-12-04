import { selectZones } from 'app/core/store/resources/resources.selectors';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { PersonelService } from './../../core/services/personel.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityService } from 'app/core/services/activity.service';
import { PermissionService } from 'app/core/services/permission.service';
@Component({
  selector: 'app-gestion-commerciaux',
  templateUrl: './gestion-commerciaux.component.html',
  styleUrls: ['./gestion-commerciaux.component.css'],
})
export class GestionCommerciauxComponent implements OnInit {
  headerColumuns = ['Code', 'Nom', 'Prénom', 'Téléphone', 'Email', 'Zone'];
  page: number = 1;
  spinner: boolean = false;
  zones : any = [];
  inputsFiler = [
    {
      name: 'code',
      placeholder: 'Code',
      type: 'text'
    },
    {
      name: 'last_name',
      placeholder: 'Nom',
      type: 'text',
    },
    {
      name: 'zone_id',
      placeholder: 'Zone',
      type: 'select',
      options: []
    },
  ];

  constructor(
    private router: Router,
    private activityService: ActivityService,
    private personelService : PersonelService,
    private store: Store<AppState>,
    public permissionService: PermissionService
  ) {}

  redirect(uuid) {
    this.router.navigate([`detailcommerciaux`, uuid]);
  }

  details_objectif(uuid){
    this.router.navigate([`detailobjectif`, uuid]);
  }

  merchants = [];
  contact = [];

  ngOnInit(): void {
    // this.activityService.UserCommercial().subscribe((res) => {
    //   this.merchants = res['response'];
    // });

    this.store.select(selectZones).subscribe((res) => {
      this.zones = res;
      for(var i=0; i<this.zones.length; i++){
        this.inputsFiler["2"].options.push({
          'text' : this.zones[i].name,
          'value' : this.zones[i].id,
        })
      }
    });

    this.spinner = true
    this.personelService.personnelbyFunction(null,'COMMERCIAL').subscribe(
      (data:any) => {
        this.merchants = data.response;
        this.spinner = false;
        console.log("data Commerciale", this.merchants)
      },
      (error) => {
        this.spinner = false;
        console.log('error', error);
      }
    );
  }

  filter($event){
    this.spinner = true;
    console.log("FILTER PERSONNEL", $event)
    this.personelService.personnelbyFunction($event, 'COMMERCIAL').subscribe(
      (data:any) => {
        this.merchants = data.response;
        this.spinner = false;
        console.log("data Commerciale", this.merchants)
      },
      (error) => {
        this.spinner = false;
        console.log('error', error);
      }
    );
  }

  decode(data){
    return JSON.parse(data);
  }

  joinZone(array){
    // console.log("array en enter details", array)
    return array.map(function(obj) {
      return obj["name"];
    }).join(', ');
  }
}
