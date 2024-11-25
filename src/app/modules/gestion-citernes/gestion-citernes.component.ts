import { RechargeCiterneComponent } from './recharge-citerne/recharge-citerne.component';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastService } from 'app/core';
import { selectEnvciterneIsLoading, selectEnvciterneStatus, selectEnvciternePayload } from 'app/core/store/citerne/citerne.selectors';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { VehiculeService } from 'app/core/services/vehicule.service';
import Swal from 'sweetalert2';
import { selectEnvparcPayload } from 'app/core/store/parc/parc.selectors';
import { PermissionService } from 'app/core/services/permission.service';

@Component({
  selector: 'app-gestion-citernes',
  templateUrl: './gestion-citernes.component.html',
  styleUrls: ['./gestion-citernes.component.css'],
})
export class GestionCiternesComponent implements OnInit {
  p: number = 1;
  citernes :any;
  spinner : boolean;
  links : any = [];
  parcs : any = [];
  filtre = {
    sous_parc : '',
    citernne_num : '',
    date : ''
  }

  inputsFiler = [
    {
      name: 'n_citerne',
      placeholder: 'N° citerne',
      type: 'text'
    },
    {
      name: 'parc_id',
      placeholder: 'Parc',
      type: 'select',
      options: [],
    },
    {
      name: 'name',
      placeholder: 'Nom',
      type: 'text'
    },
    {
      name: 'de_created_at',
      placeholder: 'De',
      type: 'date',
    },
    {
      name: 'a_created_at',
      placeholder: 'A',
      type: 'date',
    },

  ];

  constructor(public dialog: MatDialog,
              private store: Store<AppState>,
              private boGridService : BoGridService,
              private vehiculeService : VehiculeService,
              public route : Router,
              private _toast: ToastService,
              public permissionService: PermissionService
              ) {}

  ngOnInit(): void {
    // this.store.select(selectEnvciternePayload).subscribe((res) => {
    //   console.log(" citernes========>", res.data)
    //   this.citernes = res.data;
    //   this.links = res.links
    // });

    // this.store.select(selectEnvciterneIsLoading).subscribe((res) => {
    //   this.spinner = res
    // });
    this.getCiternes();

    this.store.select(selectEnvparcPayload).subscribe((res) => {
      this.parcs = res
      for(var i=0; i<this.parcs.length; i++){
        this.inputsFiler["1"].options.push({
          'text' : this.parcs[i].name,
          'value' : this.parcs[i].id,
        })
      }
    });
  }

  getCiternes(filter?: any, p?: number) {
    this.spinner = true;
    console.log("FILTER", filter)
    this.vehiculeService.getCiterne(filter, p).subscribe((res:any)=>{
      console.log("data", res.response.data)
      this.citernes = res.response.data
      this.links = res.response.links
      this.spinner = false;
    })
  }

  filter($event){
    console.log("FILTER CONTACT", $event)
    // this.datafilter = $event
    this.getCiternes($event)
  }

  progress(solde, plafond) {
    // console.log(solde, plafond)
    // console.log((solde / plafond) * 100)
    return (solde / plafond) * 100;
  }

  delet(uuid){
    console.log("uuid", uuid)
    Swal.fire({
      title: 'Êtes-vous sûr(e) de vouloir supprimer Citerne ?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.vehiculeService.deletCiterne(uuid).subscribe(
          (data) => {
            console.log('delet', data),
              this._toast.success('Citerne supprimé avec succès!');
              this.vehiculeService.getCiterne().subscribe((res:any)=>{
                console.log("data", res.response.data)
              this.citernes = res.response.data
              this.links = res.response.links
              this.spinner = false
            })
          },
          (error) => {
            console.log('error', error);
            this._toast.error('Une erreur est survenue lors de la suppression de citerne !');
          });
      }
    });
  }

  recharge(item) : void{
    const dialogRef = this.dialog.open(RechargeCiterneComponent, {
      width : "831px",
      data : { item },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        console.log('get after recharge', data);
        this.getCiternes()
      }
    });
  }

  mouvementstock(uuid) : void{
    this.route.navigate([`mouvementstocks/${uuid}`])
  }

  addTank(type): void {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '831px',
      data: { type },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        console.log('get after create', data);
        this.citernes.unshift(data);
     }
    });
  }

  updateTank( item): void {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '831px',
      data: { type: 'edit' , item},
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        console.log('get after update', data);
        this.getCiternes();
      }
    });
  }

  getTheNext(event){
    this.getCiternes(null, event);
  }

  getCiternne(){
    this.spinner = true
    this.vehiculeService.getCiterneFiltre(this.filtre).subscribe((res:any)=>{
      console.log("data", res.response.data)
      this.citernes = res.response.data
      this.links = res.response.links
      this.spinner = false
    })
  }

}
