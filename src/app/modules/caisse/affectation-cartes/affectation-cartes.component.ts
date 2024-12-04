import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAffectationCarteComponent } from './dialog-affectation-carte/dialog-affectation-carte.component';
import { DialogAlimentationCarteComponent } from './dialog-alimentation-carte/dialog-alimentation-carte.component';
import { DialogDesaffecterCarteComponent } from './dialog-desaffecter-carte/dialog-desaffecter-carte.component';
import { HistoriqueCarteComponent } from './historique-carte/historique-carte.component';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { deleteCaisseCarte, loadCaisseCartes, loadMouvementCaisseCarte } from 'app/core/store/caisse/carte/carte.actions';
import { CaisseCarteState } from 'app/core/store/caisse/carte/carte.reducer';
import { Observable } from 'rxjs';
import { CarteFilter } from 'app/core/models/caisse/filter/carte-filter.model';
import { DialogAffectationAgenceComponent } from './dialog-affectation-agence/dialog-affectation-agence.component';
import { Carte } from 'app/core/models/caisse/carte.model';
import Swal from 'sweetalert2';
import { Paginator } from 'app/core/models/paginator.model';
import { selectPagination } from 'app/core/store/pagination/pagination.selectors';
import { PermissionService } from 'app/core/services/permission.service';
@Component({
  selector: 'app-affectation-cartes',
  templateUrl: './affectation-cartes.component.html',
  styleUrls: ['./affectation-cartes.component.css']
})
export class AffectationCartesComponent implements OnInit {

  pagination!: Paginator;
  per_page = 10;
  p: number = 1;
  filterData: CarteFilter;

  headerColumuns = [
    'N° carte',
    'Libellé',
    'Agence',
    'Banque',
    'Affectée le',
    'Date d’expiration',
    'Plafond (Dhs)',
    'Solde consommé',
    'Statut',
  ];
  inputsFiler = [
    {
      name: 'n_carte',
      placeholder: 'N° carte / Libellé',
      type: 'text'
    },
    {
      name: 'banque',
      placeholder: 'Banque',
      type: 'text',
    },
    {
      name: 'date_affectation',
      placeholder: 'Affectée le',
      type: 'date'
    },
    {
      name: 'date_expiration',
      placeholder: 'Date fin',
      type: 'date'
    },
    {
      name: 'plafond',
      placeholder: 'Plafond (Dhs)',
      type: 'text',
    },
    {
      name: 'status',
      placeholder: 'Statut',
      type: 'select',
      options: [
        {text: 'Affectée', value: 'affected'},
        {text: 'Désaffectée', value: 'not_affected'},
      ],
    },
  ];

  carte$: Observable<CaisseCarteState> = this.store.select(state=>state.caisseCarte);

  constructor(public dialog: MatDialog,
    private store: Store<AppState>,
    public permissionService: PermissionService) { }

  ngOnInit(): void {
    this.store.select(selectPagination).subscribe(pagination => {
      this.pagination = pagination
    })
    this.store.dispatch(loadCaisseCartes({data: null, per_page : this.per_page , page : 1}));
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


    this.store.dispatch(loadCaisseCartes({ data: this.filterData , per_page : this.per_page , page : paginator.nextPage}));


  }

  filtrer($event){
    console.log("FILTER RDV", $event);
    let value = $event;
    let carteFilter: CarteFilter = new CarteFilter();
    carteFilter.n_carte = value.n_carte;
    carteFilter.banque = value.banque;
    carteFilter.date_affectation = value.date_affectation;
    carteFilter.plafond = value.plafond;
    carteFilter.status = value.status;
    this.filterData  = carteFilter;

    this.store.dispatch(loadCaisseCartes({data: carteFilter, per_page : this.per_page, page : this.p}));
  }

  addCarte(): void {
    const dialogRef = this.dialog.open(DialogAffectationCarteComponent, {
      disableClose: true,
      width: '811px',
      data: { },
    });
  }

  alimenterCarte(carte): void {
    const dialogRef = this.dialog.open(DialogAlimentationCarteComponent, {
      disableClose: true,
      width: '940px',
      data: carte,
    });
  }

  affecterCarte(carte: Carte): void {
    const dialogRef = this.dialog.open(DialogAffectationAgenceComponent, {
      disableClose: true,
      width: '650px',
      data: carte,
    });
  }

  desaffecterCarte(uuid: string): void {
    const dialogRef = this.dialog.open(DialogDesaffecterCarteComponent, {
      disableClose: true,
      width: '400px',
      data: uuid,
    });
  }

  historiqueCarte(id: number, n_carte: number): void {
    this.store.dispatch(loadMouvementCaisseCarte({data: id}));
    this.dialog.open(HistoriqueCarteComponent, {
      disableClose: true,
      width: '741px',
      height: '100vh',
      data: n_carte ,
      position: { right: '0px' },
    });
  }

  deleteCaisseCarte(uuid: string) {
    Swal.fire({
      title: 'Êtes-vous sûr(e) de vouloir supprimer cette carte ?',
      icon: 'error',
      iconColor: 'red',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.store.dispatch(deleteCaisseCarte({data:uuid}));
      }
    });
  }

}
