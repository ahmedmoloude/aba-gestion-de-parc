import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { SelectEnvoiDataReservation } from 'app/core/store/reservation/reservation.selectors';
import { ToastService } from 'app/services';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-visualiser-envoi',
  templateUrl: './visualiser-envoi.component.html',
  styleUrls: ['./visualiser-envoi.component.css'],
})
export class VisualiserEnvoiComponent implements OnInit {
  headerEnvoi = ['Nombre', 'N° de support'];
  supports: string[];
  constructor(
    public dialogRef: MatDialogRef<VisualiserEnvoiComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private fb: FormBuilder,
    private store: Store,
    private _toast: ToastService
  ) {}

  EnvoiDataReservation$: Observable<any> = this.store.select(
    SelectEnvoiDataReservation
  );

  envoiData: any;
  ngOnInit(): void {
    this.EnvoiDataReservation$.subscribe((data) => {
      console.log(data);
      this.envoiData = data.envoiData;
    });

    if (
      this.dialogData.i === undefined ||
      this.dialogData.j === undefined ||
      this.dialogData.k === undefined
    ) {
      this.supports = this.dialogData?.visualiserSupports;
    } else {
      if (
        typeof this.envoiData[this.dialogData.i][this.dialogData.j][
          this.dialogData.k
        ] !== 'undefined' &&
        this.envoiData[this.dialogData.i][this.dialogData.j][
          this.dialogData.k
        ] !== null
      ) {
        const references =
          this.envoiData[this.dialogData.i][this.dialogData.j][
            this.dialogData.k
          ].references;
        this.supports = Object.values(references);
      } else {
      }
    }
  }
}
