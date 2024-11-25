import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { demandesPiecesState } from 'app/core/store/maintenance/demande-piece/demande-piece.reducer';
@Component({
  selector: 'app-validation-documents',
  templateUrl: './validation-documents.component.html',
  styleUrls: ['./validation-documents.component.css']
})
export class ValidationDocumentsComponent implements OnInit, OnDestroy {
  headerColumuns = [
    'Nom de pièce',
    'Quantité demandée',
    'Prix unitaire',
    'Prix HT',
    'TVA',
    'Total TTC',
  ];

  demandePiece$: Observable<demandesPiecesState> = this.store.select(state => state.demandePieces);
  demandePieceSubscription: Subscription;

  constructor(private store: Store<AppState>,) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.demandePieceSubscription?.unsubscribe();
  }
}
