import { RessouresService } from 'app/core/services/ressoures.service';
import { Store } from '@ngrx/store';

import { AppState } from 'app/core/store/app.states';
import { selectEnvPayloadAgence } from 'app/core/store/agence/agence.selectors';
import { PersonelService } from 'app/core/services/personel.service';
import { Component, Input, OnInit } from '@angular/core';
import { DialogCreerObjectifComponent } from '../dialog-creer-objectif/dialog-creer-objectif.component';
import { MatDialog } from '@angular/material/dialog';
import { ParametreService } from 'app/core/services/parametre.service';
import { PermissionService } from 'app/core/services/permission.service';
@Component({
  selector: 'app-list-affectation',
  templateUrl: './list-affectation.component.html',
  styleUrls: ['./list-affectation.component.css']
})
export class ListAffectationComponent implements OnInit {

  constructor(
        public dialog: MatDialog,
        private paramService : ParametreService,
        private personelService: PersonelService,
        private store: Store<AppState>,
        private ressourceService : RessouresService,
        public permissionService: PermissionService
        ) { }

  inputsFiler = [
    {
      name: 'name',
      placeholder: 'Objectif',
      type: 'select',
      options: [],
    },
    {
      name: 'commercial_id',
      placeholder: 'Commercial',
      type: 'select',
      options: [],
    },
    {
      name: 'agence_id',
      placeholder: 'Agence',
      type: 'select',
      options: [],
    },
    {
      name: 'sector_id',
      placeholder: 'Secteur',
      type: 'select',
      options: [],
    },
    {
      name: 'type',
      placeholder: 'Type de client',
      type: 'select',
      options: [
        {
          text: 'Cash',
          value: 'Cash',
        },
        {
          text: 'En compte',
          value: 'En compte',
        },
      ]
    },
  ];

  spinner = true
  objectifs = []
  commercials = []
  agences = []
  sectors = []

  filter($event){
    // console.log("FILTER RDV", $event)
    this.paramService.getAsscoiatedObjectifes($event).subscribe((data) => {
        // console.log('data retourné ', data);
        this.objectifs = data["response"];
    })
  }

  ngOnInit(): void {
    this.paramService.getAsscoiatedObjectifes().subscribe(res => {
      this.objectifs = res.response
      console.log("OBJECTIFS", this.objectifs)
      this.spinner = false
    })

    this.paramService.getObjectif().subscribe(
      (data) => {
        for(var i=0; i<data["response"].length; i++){
          this.inputsFiler["0"].options.push({
            'text' : data["response"][i].name,
            'value' : data["response"][i].name,
          })
        }
      });

      this.personelService.personnelbyFunction(null, 'COMMERCIAL').subscribe(
        (data: any) => {
          // console.log('data Commerciale', data);
          this.commercials = data.response;
          for(var i=0; i<this.commercials.length; i++){
            this.inputsFiler["1"].options.push({
              'text' : this.commercials[i].first_name + ' ' + this.commercials[i].last_name,
              'value' : this.commercials[i].id,
            })
          }
        });

        this.store.select(selectEnvPayloadAgence).subscribe((res) => {
          this.agences = res;
          // console.log(' agence========>', this.agences);
          for(var i=0; i<this.agences.length; i++){
            this.inputsFiler["2"].options.push({
              'text' : this.agences[i].name,
              'value' : this.agences[i].id,
            })
          }
        });

        this.ressourceService.getSectors().subscribe((res)=>{
          this.sectors = res
          for(var i=0; i<this.sectors.length; i++){
            this.inputsFiler["3"].options.push({
              'text' : this.sectors[i].name,
              'value' : this.sectors[i].id,
            })
          }
        })

  }
  affectation(): void {
    const dialogRef = this.dialog.open(DialogCreerObjectifComponent, {
      disableClose: true,
      width: '562px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.paramService.getAsscoiatedObjectifes().subscribe((data) => {
          // console.log('data retourné ', data);
          this.objectifs = data["response"];
      })
      }
    });
  }


  isSubmitted(event){
    this.spinner = true;
    this.paramService.getAsscoiatedObjectifes().subscribe(res => {
      this.objectifs = res.response
      this.spinner = false
    })
  }

}
