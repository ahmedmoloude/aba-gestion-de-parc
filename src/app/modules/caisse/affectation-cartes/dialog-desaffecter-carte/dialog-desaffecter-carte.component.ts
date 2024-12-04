import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Carte } from 'app/core/models/caisse/carte.model';
import { AgenceState } from 'app/core/store/agence/agence.reducer';
import { AppState } from 'app/core/store/app.states';
import { affectCaisseCarte, disaffectCaisseCarte } from 'app/core/store/caisse/carte/carte.actions';
import { CaisseCarteState, StateEnum } from 'app/core/store/caisse/carte/carte.reducer';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-dialog-desaffecter-carte',
  templateUrl: './dialog-desaffecter-carte.component.html',
  styleUrls: ['./dialog-desaffecter-carte.component.css']
})
export class DialogDesaffecterCarteComponent implements OnInit, OnDestroy {

  spinner: boolean = false;

  carte$: Observable<CaisseCarteState> = this.store.select(state=>state.caisseCarte);
  carteSubscription: Subscription;
  uuid: string = this.data;
  constructor(private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) private data: string,
    private dialogRef: MatDialogRef<DialogDesaffecterCarteComponent>) { }

  ngOnInit(): void {
  }


  disaffectCard() {
    this.spinner = true;
    this.store.dispatch(disaffectCaisseCarte({data: this.uuid}));
    this.carteSubscription = this.carte$.subscribe(
      (resp) => {
        if (resp.caisseCarte && resp.carteState == StateEnum.SUCCESS) {
          this.dialogRef.close();
        }
        if (resp.carteState == StateEnum.SUCCESS || resp.carteState == StateEnum.ERROR){
          this.spinner = false;
        }
      },
      (error) => {
        this.spinner = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.carteSubscription?.unsubscribe();
  }

}
