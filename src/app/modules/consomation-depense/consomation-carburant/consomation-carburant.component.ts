import { DialogPleinComponent } from './dialog-plein/dialog-plein.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VehiculeService } from 'app/core/services/vehicule.service';
import { ToastService } from '../../../core';
import { PermissionService } from 'app/core/services/permission.service';
import { PersonelService } from 'app/core/services/personel.service';
import { forkJoin } from 'rxjs';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-consomation-carburant',
  templateUrl: './consomation-carburant.component.html',
  styleUrls: ['./consomation-carburant.component.css'],
})
export class ConsomationCarburantComponent implements OnInit {
  p: number = 1;
  datafilter;
  inputsFiler = [
    {
      name: 'date',
      placeholder: 'Date',
      type: 'date'
    },
    {
      name: 'citerne',
      placeholder: 'Citerne',
      type: 'select',
      options: [],
    },
    {
      name: 'pompiste',
      placeholder: 'Pompiste',
      type: 'select',
      options: [],
    },
    {
      name: 'matricule',
      placeholder: 'Immatriculation',
      type: 'text'
    },
    {
      name: 'code',
      placeholder: 'Code',
      type: 'text'
    },    {
      name: 'conducteur',
      placeholder: 'Conducteur',
      type: 'select',
      options: [],
    },
  ];
  consommations:any;
  linksConso:any;
  spinnerConso : boolean =false;
  allCiterne$ = this.vehiculeService.allCiterne();
  driver$ = this.personelService.personnelbyFunction(null, 'DRIVER');
  pompiste$ = this.personelService.personnelbyFunction(null, 'POMPISTE');
  citernes = [];
  drivers = [];
  pompistes = [];
  url = environment.STORAGE + '/mouvement/CONSOMMATION/';

  constructor(public dialog: MatDialog,
    private vehiculeService : VehiculeService,
    private toast : ToastService,
    public permissionService: PermissionService,
    private personelService : PersonelService,
    ) {}

  ngOnInit(): void {
    this.spinnerConso = true;
    this.vehiculeService.getallMouvement('CONSOMMATION').subscribe(
      (data) => {
        this.consommations = data['response'].data;
        this.linksConso = data['response'].links;
        console.log('consommations', this.consommations, this.linksConso);
        this.spinnerConso = false
      },
      (error) => {
        console.log('error', error);
    });
    forkJoin([this.allCiterne$, this.driver$, this.pompiste$]).subscribe(
      ([citerneData, driverData, pompisteData]) => {
        console.log('Citerne data:', citerneData);
        console.log('Personnel data:', driverData);
        console.log('popiste data:', pompisteData);

        this.citernes = citerneData['response'];
        this.drivers = driverData['response'];
        this.pompistes = pompisteData['response'];
        for (const item of this.citernes) {
            this.inputsFiler["1"].options.push({
            'text' : item.name,
            'value' : `${item.id}`,
          })
        }

        for (const item of this.drivers) {
          this.inputsFiler["5"].options.push({
            'text' : `${item.first_name} ${item.last_name}`,
            'value' : `${item.id}`,
          })
        }

        for (const item of this.pompistes) {
          this.inputsFiler["2"].options.push({
            'text' : `${item.first_name} ${item.last_name}`,
            'value' : `${item.id}`,
          })
        }
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }

  getTheNextCons(event){
    this.vehiculeService.getallMouvement('CONSOMMATION', null, event).subscribe((res:any)=>{
      console.log("data", res.response.data)
    this.consommations = res.response.data
    this.linksConso = res.response.links
    this.spinnerConso = false
  })
  }

  pleinadd(editmode = false , consomation?): void {
    console.log('consommtion: ', consomation);

    const dialogRef = this.dialog.open(DialogPleinComponent, {
      width: '811px',
      data: {
        editMode :  editmode,
        ...consomation
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {

        if (editmode) {
          let index = this.consommations.findIndex((c) => c.id === data.id)
          this.consommations[index] = data
        }
        else{
          this.consommations.unshift(data);
        }
        console.log('get apres create', data);
        // console.log(this.tasks)
      }
    });
  }


  delete(uuid){
    this.vehiculeService.deleteMouvment(uuid).subscribe((data) => {

      let index = this.consommations.findIndex((c) => c.uuid === uuid)
      this.consommations.splice(index, 1);
    })
  }

  filtrer($event){
    console.log("FILTER RDV", $event)

    this.datafilter = $event;
    this.spinnerConso = true;
    this.vehiculeService.getallMouvement('CONSOMMATION', $event ).subscribe(
      (data) => {
        this.consommations = data['response'].data;
        this.linksConso = data['response'].links;
        console.log('consommations', this.consommations, this.linksConso);
        this.spinnerConso = false
      },
      (error) => {
        console.log('error', error);
    });
  }
}
