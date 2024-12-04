import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { addAttachmentToFacture } from 'app/core/store/facturation/facture/facture.actions';
import { FactureState, FactureStateEnum } from 'app/core/store/facturation/facture/facture.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-piecejointe',
  templateUrl: './piecejointe.component.html',
  styleUrls: ['./piecejointe.component.css']
})
export class PiecejointeComponent implements OnInit {

  formData:FormData = new FormData();
  facture$: Observable<FactureState> = this.store.select(state => state.facture);
  spinner: boolean = false;


  constructor(@Inject(MAT_DIALOG_DATA) public data: string,
              public dialogRef: MatDialogRef<PiecejointeComponent>,
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

  onAddAttachment(){
    this.spinner = true;
    this.formData.append('facture', this.data);
    this.store.dispatch(addAttachmentToFacture({data:this.formData}));
    this.facture$.subscribe(
      (resp) => {
        this.spinner = false;
        if (resp.dataState==FactureStateEnum.SUCCESS) {
          this.dialogRef.close();
        }
      },
      (error) => {
        this.spinner = false;
      }
    );

  }
}
