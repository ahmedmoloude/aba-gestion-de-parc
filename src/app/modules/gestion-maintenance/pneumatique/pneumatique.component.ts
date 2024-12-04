import { Component, OnDestroy, OnInit } from '@angular/core';
import { DetailPneumatiqueComponent } from './detail-pneumatique/detail-pneumatique.component';
import { MatDialog } from '@angular/material/dialog';
import { AddPneumatiqueComponent } from './add-pneumatique/add-pneumatique.component';
import { AffecterVehiculeComponent } from './affecter-vehicule/affecter-vehicule.component';
import { Observable, Subscription } from 'rxjs';
import { PneumatiqueState } from 'app/core/store/maintenance/pneumatique/pneumatique.reducer';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { deletePneu, desaffectPneu, getPneu, loadPneus } from 'app/core/store/maintenance/pneumatique/pneumatique.actions';
import Swal from 'sweetalert2';
import { Pneu } from 'app/core/models/maintenance/pneu.model';
import { UpdatePneumatiqueComponent } from './update-pneumatique/update-pneumatique.component';
import { Paginator } from 'app/core/models/paginator.model';
import { selectPagination } from 'app/core/store/pagination/pagination.selectors';
import { PermissionService } from 'app/core/services/permission.service';


@Component({
  selector: 'app-pneumatique',
  templateUrl: './pneumatique.component.html',
  styleUrls: ['./pneumatique.component.css']
})
export class PneumatiqueComponent implements OnInit, OnDestroy {

  pagination!: Paginator;
  per_page = 10;
  p: number = 1;
  filterData: any;

  headerColumuns = [
    'Code pneu',
    'Type pneu',
    'Date d’acquisition',
    'Km d’acquisition',
    'DMC',
    'Date début d’affectation',
    'Date fin d’affectation',
    '% d’usure',
    'Pression',
    'Profondeur',
    'Km parcouru',
    'Statut',
  ];
  inputsFiler = [
    {
      name: 'code_pneu',
      placeholder: 'Code pneu',
      type: 'text'
    },
    {
      name: 'marque',
      placeholder: 'Marque',
      type: 'text',
    },
    {
      name: 'modele',
      placeholder: 'modèle',
      type: 'text',
    },
    {
      name: 'type_pneu',
      placeholder: 'type pneu',
      type: 'text',
    },
    {
      name: 'indice_vitesse',
      placeholder: 'Indice de vitesse',
      type: 'text'
    },
    {
      name: 'etat',
      placeholder: 'Etat',
      type: 'text'
    },
  ];
    extraInputsFilter = [
      {
        name: 'date_acquisition',
        placeholder: 'date d’acquisition',
        type: 'date'
      },
      {
        name: 'dmc',
        placeholder: 'DMC',
        type: 'date',
      },
      {
        name: 'position',
        placeholder: 'Position',
        type: 'text',
      },
      {
        name: 'immatricule',
        placeholder: 'Immatriculation',
        type: 'text',
      },
      {
        name: 'code_vehicule',
        placeholder: 'Code Véhicule',
        type: 'text',
      },
      {
        name: 'statut',
        placeholder: 'Statut',
        type: 'select',
        options: [
          {
            text: 'En attend',
            value: 'en_attend',
          },
          {
            text: 'En Cours',
            value: 'en_cours',
          }
        ]
      },
  ];

  pneu$: Observable<PneumatiqueState> = this.store.select(state => state.pneumatique);
  pneuSubscription: Subscription;

  constructor(public dialog: MatDialog,
              private store: Store<AppState>,
              public permissionService: PermissionService) { }

  ngOnInit(): void {
    this.store.select(selectPagination).subscribe(pagination => {
      this.pagination = pagination
    })
    this.store.dispatch(loadPneus({data: null, per_page : this.per_page , page : 1}));
  }

  paginate($event: any){
    console.log( 'page size ' , $event)

    this.per_page = $event.rows;

    const paginator = {
      currentPage: $event.page,
      nextPage: $event.page + 1,
      pageSize: $event.pageCount,
      totalItems: this.pagination.totalItems,
    }
    this.p = paginator.nextPage

    this.store.dispatch(loadPneus({ data: this.filterData , per_page : this.per_page , page : paginator.nextPage}));
  }

  filtrer($event){
    console.log("FILTER RDV", $event);
    let formValue = $event;
    let pneu: any = new Object();
    pneu.code_pneu = formValue.code_pneu;
    pneu.marque = formValue.marque;
    pneu.modele = formValue.modele;
    pneu.type_pneu = formValue.type_pneu;
    pneu.indice_vitesse = formValue.indice_vitesse;
    pneu.etat = formValue.etat;
    pneu.date_acquisition = formValue.date_acquisition;
    pneu.dmc = formValue.dmc;
    pneu.position = formValue.position;
    pneu.immatricule = formValue.immatricule;
    pneu.code_vehicule = formValue.code_vehicule;
    pneu.statut = formValue.statut;
    this.filterData = pneu;
    this.store.dispatch(loadPneus({data: pneu, per_page : this.per_page, page : this.p}));
  }
  getDetailPneumatique(id: number): void {
    this.store.dispatch(getPneu({data: id}))
    this.dialog.open(DetailPneumatiqueComponent, {
      disableClose: true,
      width: '1000px',
      height: '100vh',
      data: { },
      position: { right: '0px' },
    });
  }

  addPneumatique(): void {
    const dialogRef = this.dialog.open(AddPneumatiqueComponent, {
      disableClose: false,
      width: '882px',
      data: { },
    });
  }

  updatePneumatique(pneu: Pneu): void {
    const dialogRef = this.dialog.open(UpdatePneumatiqueComponent, {
      disableClose: false,
      width: '882px',
      data: pneu,
    });
  }

  affectevehicule(item: Pneu): void {
    const dialogRef = this.dialog.open(AffecterVehiculeComponent, {
      disableClose: false,
      width: '882px',
      data: item,
    });
  }

  desaffectVehicule(id: number) {
    Swal.fire({
      title: 'Êtes-vous sûr(e) de vouloir desaffecter ce pneu ?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value)
      this.store.dispatch(desaffectPneu({data: {pneu_id: id}}))
    }
    )
  }

  deletePneumatique(id: number) {
    Swal.fire({
      title: 'Êtes-vous sûr(e) de vouloir supprimer ce pneu ?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value)
      this.store.dispatch(deletePneu({data:id}));
    }
    )
  }

  ngOnDestroy(): void {
    this.pneuSubscription?.unsubscribe();
  }
}
