import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { SelectRetourDataReservation } from 'app/core/store/reservation/reservation.selectors';
import { ToastService } from 'app/services';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-visualiser-retour',
  templateUrl: './visualiser-retour.component.html',
  styleUrls: ['./visualiser-retour.component.css'],
})
export class VisualiserRetourComponent implements OnInit {
  headerRetour = ['Nombre', 'N° de support'];
  headerAdditionel = ['Nombre', 'N° de support'];
  palettes_retour: any[];
  palettes_additionel: any[];

  constructor(
    public dialogRef: MatDialogRef<VisualiserRetourComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private fb: FormBuilder,
    private store: Store,
    private _toast: ToastService
  ) {}

  retourDataReservation$: Observable<any> = this.store.select(
    SelectRetourDataReservation
  );

  retourData: any;
  ngOnInit(): void {
    this.retourDataReservation$.subscribe((data) => {
      this.retourData = data.retourData;
    });

    console.log('this.dialogData', this.dialogData);

    if (
      this.dialogData.i === undefined ||
      this.dialogData.j === undefined ||
      this.dialogData.k === undefined
    ) {
      console.log('case1');
      if (this.dialogData.visualiserDetails === true) {
        this.palettes_retour = this.dialogData?.visualiserSupports;
        // this.palettes_additionel = this.dialogData?.visualiserSupports;
      } else {
        let palettes_retour: any =
          this.dialogData?.visualiserSupports[0][0]?.palettes_retour;

        let palettes_additionel: any =
          this.dialogData?.visualiserSupports[0][0]?.palettes_additionel ??
          null;
        if (palettes_retour) {
          this.palettes_retour = this.transform(palettes_retour);
        } else {
          palettes_retour = this.dialogData?.visualiserSupports ?? null;
        }

        this.palettes_additionel = this.transform(palettes_additionel);
      }

      console.log(this.palettes_retour);
      console.log(this.palettes_additionel);
    } else if (
      typeof this.retourData[this.dialogData.i][this.dialogData.j][
        this.dialogData.k
      ] !== 'undefined' &&
      this.retourData[this.dialogData.i][this.dialogData.j][
        this.dialogData.k
      ] !== null &&
      this.dialogData.visualiserDetails === undefined
    ) {
      console.log('case2');

      const getSelectedSupports = this.transform(
        this.retourData[this.dialogData.i][this.dialogData.j][this.dialogData.k]
          .palettes_retour
      );

      const selectedSupports: any[] = Object.values(getSelectedSupports).filter(
        (value) => value !== '' && value !== null && value !== false
      );
      this.palettes_retour = selectedSupports;
      this.palettes_additionel = this.transform(
        this.retourData[this.dialogData.i][this.dialogData.j][this.dialogData.k]
          .palettes_additionel
      );
    } else {
      console.log('case3');

      console.log(this.palettes_retour);
      console.log(this.palettes_additionel);
    }
  }

  transform(objects: any = []) {
    return Object.values(objects);
  }
}
