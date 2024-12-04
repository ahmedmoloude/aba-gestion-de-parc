import { Component, Inject, OnInit } from '@angular/core';
import { Carte } from 'app/core/models/caisse/carte.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { feedCaisseCarte } from 'app/core/store/caisse/carte/carte.actions';
import { CaisseCarteState, StateEnum } from 'app/core/store/caisse/carte/carte.reducer';
import { Observable, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-dialog-alimentation-carte',
  templateUrl: './dialog-alimentation-carte.component.html',
  styleUrls: ['./dialog-alimentation-carte.component.css']
})
export class DialogAlimentationCarteComponent implements OnInit {

  spinner: boolean = false;

  searchStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'};
  contentStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'};

  carte$: Observable<CaisseCarteState> = this.store.select(state=>state.caisseCarte);
  carteSubscription: Subscription;
  carte: Carte = this.data;

  alimentCardForm: FormGroup;

  formData:FormData = new FormData();

  constructor(private formBuilder: FormBuilder,
              private store: Store<AppState>,
              @Inject(MAT_DIALOG_DATA) private data: Carte,
              private dialogRef: MatDialogRef<DialogAlimentationCarteComponent>) { }

  ngOnInit(): void {
    this.initForm();
    this.getFile();
  }

  initForm() {
    this.alimentCardForm = this.formBuilder.group({
      carte_id:[this.carte.id,[Validators.required]],
      montant:[null,[Validators.required]],
      motif:[null,[Validators.required]],
      date_alimentation:[null,[Validators.required]],
      attachement: [],
    })

  }
  getFile() {
    // get file
    const self = this;
    const fileUpload = document.getElementById('file-upload') as HTMLInputElement;
    const fileNameSpan: HTMLElement | null = document.querySelector('.file-name');

    fileUpload?.addEventListener('change', function() {
      const file: File | null = fileUpload.files?.[0];
      if (file) {
        fileNameSpan.textContent = file.name;
        self.formData = new FormData();
        self.formData.append('attachement', file);

      } else {
        fileNameSpan.textContent = 'Choisir un fichier';
      }
    });
  }

  confirmCreation(){
    if(this.alimentCardForm.invalid) return;

    this.spinner = true;
    let formValue = this.alimentCardForm.value;
    console.log('formValue');
    console.log(formValue);
    this.formData.append('carte_id', formValue.carte_id);
    this.formData.append('montant', formValue.montant);
    this.formData.append('motif', formValue.motif);
    this.formData.append('date_alimentation', formValue.date_alimentation);


    this.store.dispatch(feedCaisseCarte({data:this.formData}));
    this.carte$.subscribe(
      (resp) => {

        console.log(resp);
        if (resp.feedState==StateEnum.SUCCESS) {
          this.spinner = false;

          this.dialogRef.close();
        }
      }, (error) => {
        this.spinner = false
      }
    );
    // this.formData.forEach((key,value)=> console.log(key +":" + value))
  }

}
