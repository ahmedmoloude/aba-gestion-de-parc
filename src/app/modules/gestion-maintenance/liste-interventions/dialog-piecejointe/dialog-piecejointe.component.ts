import { Component,Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { DiagnostiqueState } from 'app/core/store/maintenance/diagnostique/diagnostique.reducer';
import { MaintenanceStateEnum } from 'app/core/store/maintenance/maintenance-intervention/maintenance-intervention.reducer';import { addAttachmentToFacture } from 'app/core/store/facturation/facture/facture.actions';
import { Observable, Subscription } from 'rxjs';
import { addPieceToIntervention } from 'app/core/store/maintenance/diagnostique/diagnostique.actions';
@Component({
  selector: 'app-dialog-piecejointe',
  templateUrl: './dialog-piecejointe.component.html',
  styleUrls: ['./dialog-piecejointe.component.css']
})
export class DialogPiecejointeComponent implements OnInit, OnDestroy {
  searchStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'};
  contentStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'};

  types = [{name:'Bon de sortie', value:'SORTIE'}, {name:'Bon de commande', value:'COMAMNDE'}, {name:"Bon d'achat", value:'ACHAT'}];
  type = 'Bon de sortie';

  spinner: boolean = false;
  formData:FormData = new FormData();

  diagnostique$: Observable<DiagnostiqueState> = this.store.select(state => state.diagnostique);
  diagnostiqueSubscription: Subscription;

  constructor(@Inject(MAT_DIALOG_DATA) public data: number,
              public dialogRef: MatDialogRef<DialogPiecejointeComponent>,
              private store: Store<AppState>) { }

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
    this.store.dispatch(addPieceToIntervention({data:this.formData}));
    this.diagnostique$.subscribe(
      (resp) => {
        if (resp.addPieceState==MaintenanceStateEnum.SUCCESS) {
          this.dialogRef.close();
        }
        if (resp.addPieceState == MaintenanceStateEnum.SUCCESS || resp.addPieceState == MaintenanceStateEnum.ERROR){
          this.spinner = false;
        }
      },
      (error) => {
        this.spinner = false;
      }
    );

  }

  ngOnDestroy(): void {
    this.diagnostiqueSubscription?.unsubscribe();
  }
}
