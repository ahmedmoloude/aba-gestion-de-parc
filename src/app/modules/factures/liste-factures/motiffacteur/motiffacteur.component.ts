import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { addMotifToFacture } from 'app/core/store/facturation/facture/facture.actions';
import { FactureState, FactureStateEnum } from 'app/core/store/facturation/facture/facture.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-motiffacteur',
  templateUrl: './motiffacteur.component.html',
  styleUrls: ['./motiffacteur.component.css']
})
export class MotiffacteurComponent implements OnInit {

  facture$: Observable<FactureState> = this.store.select(state => state.facture);
  spinner: boolean = false;
  motif: FormControl;

  constructor(@Inject(MAT_DIALOG_DATA) public data: string,
              public dialogRef: MatDialogRef<MotiffacteurComponent>,
              private store: Store<AppState>) { }

  ngOnInit(): void {
    this.motif= new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(5000)]);
  }


  onAddMotif(){
    if (this.motif.invalid) return;
    this.spinner = true;
    let formValue : {motif: string, facture: string} = {motif: this.motif.value, facture: this.data};
    this.store.dispatch(addMotifToFacture({data:formValue}));
    this.facture$.subscribe(
      (resp) => {
        this.spinner = false;
        if (resp.dataState == FactureStateEnum.SUCCESS) {
          this.dialogRef.close();
        }
      },
      (error) => {
        this.spinner = false;
      }
    );

  }

}
