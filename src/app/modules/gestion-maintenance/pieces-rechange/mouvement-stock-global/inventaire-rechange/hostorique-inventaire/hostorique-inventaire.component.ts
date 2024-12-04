import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { PieceRechangeState } from 'app/core/store/maintenance/piece-rechange/piece-rechange.reducer';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-hostorique-inventaire',
  templateUrl: './hostorique-inventaire.component.html',
  styleUrls: ['./hostorique-inventaire.component.css']
})
export class HostoriqueInventaireComponent implements OnInit {
  p: number = 1;

  headerColumuns = [
    'Inventorié par',
    'Date',
    'Stock réel',
  ];

  inventory$ : Observable<PieceRechangeState> = this.store.select(state => state.pieceRechange);

  piece = this.data;

  constructor(private store: Store<AppState>,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private dialogRef: MatDialogRef<HostoriqueInventaireComponent>) { }

  ngOnInit(): void {
  }

}
