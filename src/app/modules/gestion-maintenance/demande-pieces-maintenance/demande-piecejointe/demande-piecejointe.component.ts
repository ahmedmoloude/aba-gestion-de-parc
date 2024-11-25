import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { demandesPiecesState } from 'app/core/store/maintenance/demande-piece/demande-piece.reducer';
import { MaintenanceStateEnum } from 'app/core/store/maintenance/maintenance-intervention/maintenance-intervention.reducer';
import { addDemandePiecesAttachment } from 'app/core/store/maintenance/demande-piece/demande-piece.actions';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-demande-piecejointe',
  templateUrl: './demande-piecejointe.component.html',
  styleUrls: ['./demande-piecejointe.component.css']
})
export class DemandePiecejointeComponent implements OnInit, OnDestroy {
  searchStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'};
  contentStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'};

  types = [{name:'Bon de sortie', value:'SORTIE'}, {name:"Bon d'achat", value:'ACHAT'}];
  type = 'Bon de sortie';

  spinner: boolean = false;
  formData:FormData = new FormData();

  demandePiece$: Observable<demandesPiecesState> = this.store.select(state => state.demandePieces);
  demandePieceSubscription: Subscription;

  constructor(private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: number,
              public dialogRef: MatDialogRef<DemandePiecejointeComponent>,) { }

  ngOnInit(): void {
    const self = this;

    const fileUpload = document.getElementById('file-upload') as HTMLInputElement;
    const fileNameSpan: HTMLElement | null = document.querySelector('.file-name');

    fileUpload.addEventListener('change', function() {
      const file: File | null = fileUpload.files?.[0];
      if (file) {
        fileNameSpan.textContent = file.name;
        self.formData = new FormData();
        self.formData.append('attachement', file);
      } else {
        fileNameSpan.textContent = 'Choisir un fichier';
        self.formData.append('attachement', null);
      }
    });
  }

  selectType(event){
    console.log('event')
    console.log(event);
    this.type = event.value;
  }

  onAddAttachment(){
    this.spinner = true;
    this.formData.append('demande_intervention_id', `${this.data}`);
    this,this.formData.append('type', `${this.type}`)
    this.store.dispatch(addDemandePiecesAttachment({data:this.formData}));
    this.demandePiece$.subscribe(
      (resp) => {
        if (resp.attachmentState==MaintenanceStateEnum.SUCCESS) {
          this.dialogRef.close();
        }
        if (resp.attachmentState == MaintenanceStateEnum.SUCCESS || resp.attachmentState == MaintenanceStateEnum.ERROR){
          this.spinner = false;
        }
      },
      (error) => {
        this.spinner = false;
      }
    );

  }

  ngOnDestroy(): void {
    this.demandePieceSubscription?.unsubscribe();
  }

}
