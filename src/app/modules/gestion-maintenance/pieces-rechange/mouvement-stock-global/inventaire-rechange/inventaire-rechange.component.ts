import { HostoriqueInventaireComponent } from './hostorique-inventaire/hostorique-inventaire.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Config } from 'app/config';
import { Paginator } from 'app/core/models/paginator.model';
import { PieceRechangeService } from 'app/core/services/maintenance/piece-rechange.service';
import { AppState } from 'app/core/store/app.states';
import { addInventory, loadInventoryHistoric, loadInventoryList } from 'app/core/store/maintenance/piece-rechange/piece-rechange.actions';
import { PieceRechangeState } from 'app/core/store/maintenance/piece-rechange/piece-rechange.reducer';
import { selectPagination } from 'app/core/store/pagination/pagination.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-inventaire-rechange',
  templateUrl: './inventaire-rechange.component.html',
  styleUrls: ['./inventaire-rechange.component.css']
})
export class InventaireRechangeComponent implements OnInit {
  pagination!: Paginator;
  per_page = 10;
  p: number = 1;
  filterData: any;
  headerColumuns = [
    'Nom de pièce',
    'Référence',
    'Famille',
    'Total entrée',
    'Total sortie',
    'Stock théorique',
    'Stock réel',
    'Écart',
    'Inventorié par',
  ];
  searchStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'};
  contentStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'};

  inputsFiler = [
    {
      name: 'reference',
      placeholder: 'Réference',
      type: 'text'
    },
    {
      name: 'name',
      placeholder: 'Nom de piéce',
      type: 'select',
      options: [],
    }
  ]
  inventory$ : Observable<PieceRechangeState> = this.store.select(state => state.pieceRechange);
  piecesNames = [];
  constructor(public dialog: MatDialog,
              private store: Store<AppState>,
              private pieceService: PieceRechangeService) { }

  ngOnInit(): void {
    this.store.select(selectPagination).subscribe(pagination => {
      this.pagination = pagination
    })
    this.store.dispatch(loadInventoryList({reference: null, name: null, per_page : this.per_page , page : 1}));

    // get piecesNames
    this.pieceService.searchPieceName().subscribe(
      (resp) => {
        if( resp.success) {
          this.piecesNames = resp.response;
          for(var i=0; i<this.piecesNames.length; i++){
            this.inputsFiler["1"].options.push({
              'text' : this.piecesNames[i].name,
              'value' : this.piecesNames[i].id,
            })
          }
        }

      }
    );
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

    this.store.dispatch(loadInventoryList({ reference: this.filterData?.reference, name: this.filterData?.name, per_page : this.per_page , page : paginator.nextPage}));
  }

  filtrer($event){
    console.log("FILTER inventory", $event);
    let formValue = $event;
    let piece: any = new Object();
    piece.reference = formValue.reference;
    piece.name = formValue.name;
    this.filterData = piece;
    this.store.dispatch(loadInventoryList({reference: piece?.reference, name: piece?.name, per_page : this.per_page, page : this.p}));
  }

  historiqueinventaire(id: number, piece: any): void {
    this.store.dispatch(loadInventoryHistoric({data: id}))
    this.dialog.open(HostoriqueInventaireComponent, {
      disableClose: true,
      width: '466px',
      height: '100vh',
      data: piece,
      position: { right: '0px' },
    });
  }

}
