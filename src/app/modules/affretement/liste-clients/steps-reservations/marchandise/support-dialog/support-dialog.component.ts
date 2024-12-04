import { Component, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ToastService } from 'app/core/services/toast.service';
import {
  addEnvoiData,
  deleteRetourSuccess,
  restoreTotalPalettesEnvoi,
  updateTotalPalettesEnvoi,
} from 'app/core/store/reservation/reservation.actions';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  SelectEnvoiDataReservation,
  SelectRetourDataReservation,
} from 'app/core/store/reservation/reservation.selectors';

@Component({
  selector: 'app-support-dialog',
  templateUrl: './support-dialog.component.html',
  styleUrls: ['./support-dialog.component.css'],
})
export class SupportDialogComponent implements OnInit {
  nbrPalettes: any;
  array: number[];
  referenceForm: FormGroup;
  envoiData: any;
  retourData: any;
  constructor(
    public dialogRef: MatDialogRef<SupportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private fb: FormBuilder,
    private store: Store,
    private _toast: ToastService
  ) {}

  ngOnInit(): void {
    console.log('dialogData : open', this.dialogData);

    this.store.select(SelectEnvoiDataReservation).subscribe((data) => {
      this.envoiData = data.envoiData;
    });

    if (Object.keys(this.envoiData).length > 0) {
      if (
        typeof this.envoiData[this.dialogData?.indexDest] !== 'undefined' &&
        this.envoiData[this.dialogData?.indexDest] !== null
      ) {
        if (
          typeof this.envoiData[this.dialogData?.indexDest][
            this.dialogData?.indexDecharge
          ] !== 'undefined' &&
          this.envoiData[this.dialogData?.indexDest][
            this.dialogData?.indexDecharge
          ] !== null
        ) {
          if (
            typeof this.envoiData[this.dialogData?.indexDest][
              this.dialogData?.indexDecharge
            ][this.dialogData?.indexEnvoi] !== 'undefined' &&
            this.envoiData[this.dialogData?.indexDest][
              this.dialogData?.indexDecharge
            ][this.dialogData?.indexEnvoi] !== null
          ) {
            this.envoiFormEdit();
          } else {
            this.envoiFormInit();
          }
        } else {
          this.envoiFormInit();
        }
      } else {
        this.envoiFormInit();
      }
    } else {
      this.envoiFormInit();
    }

    // this.dialogData?.mode === 'ajout'
    //   ? this.envoiFormInit()
    //   : this.envoiFormEdit();
  }

  mode: any;
  envoiFormInit() {
    // this.mode = this.dialogData?.mode;
    this.mode = 'ajout';
    this.nbrPalettes = this.dialogData.nbrPalettes;
    this.array = Array.from({ length: this.nbrPalettes }, (_, i) => i);
    console.log(this.array);
    const formControlValues = [];
    const formControls = {};

    // for (let i = 0; i < this.array.length; i++) {
    //   const controlName = `reference_${i}`;
    //   formControls[controlName] = new FormControl('', [Validators.required]);
    // }

    for (let i = 0; i < this.array.length; i++) {
      const controlName = `reference_${i}`;
      formControls[controlName] = new FormControl('');
      // console.log(formControls[controlName].error);
    }
    this.referenceForm = new FormGroup(formControls);

    this.initRetourForm();
    // this.referenceForm = this.fb.group(formControls, {
    //   validator: this.checkForDuplicates,
    // });

    console.log('this.referenceForm.value', this.referenceForm.value);
  }
  supports: any[];
  nbrPaletteEdit: any;
  envoiFormEdit() {


    console.log('envoi form edit');
    // this.mode = this.dialogData?.mode;
    this.mode = 'edit';

    console.log(this.envoiData);

    if (
      this.dialogData.indexDest === undefined ||
      this.dialogData.indexDecharge === undefined ||
      this.dialogData.indexEnvoi === undefined
    ) {
      this.supports = this.dialogData?.visualiserSupports;
    } else {
      if (
        typeof this.envoiData[this.dialogData?.indexDest][
          this.dialogData?.indexDecharge
        ][this.dialogData?.indexEnvoi] !== 'undefined' &&
        this.envoiData[this.dialogData?.indexDest][
          this.dialogData?.indexDecharge
        ][this.dialogData?.indexEnvoi] !== null
      ) {
        this.nbrPaletteEdit =
          this.envoiData[this.dialogData.indexDest][
            this.dialogData.indexDecharge
          ][this.dialogData.indexEnvoi].nbrPalettes;
        const references =
          this.envoiData[this.dialogData.indexDest][
            this.dialogData.indexDecharge
          ][this.dialogData.indexEnvoi].references;
        this.supports = Object.values(references);
      } else {
      }
    }

    this.nbrPalettes = this.dialogData.nbrPalettes;
    this.array = Array.from({ length: this.nbrPalettes }, (_, i) => i);
    console.log(this.array);
    const formControlValues = [];
    const formControls = {};

    // for (let i = 0; i < this.array.length; i++) {
    //   const controlName = `reference_${i}`;
    //   formControls[controlName] = new FormControl('', [Validators.required]);
    // }

    for (let i = 0; i < this.array.length; i++) {
      const controlName = `reference_${i}`;
      formControls[controlName] = new FormControl(this.supports[i] || '');

      // [
      // Validators.required,
      // ]
      console.log(formControls[controlName].error);
    }
    //this.referenceForm = this.fb.group(formControls);
    // this.referenceForm = this.fb.group(formControls, {
    //   validator: this.checkForDuplicates,
    // });
    this.referenceForm = new FormGroup(formControls);

    this.initRetourForm();
    // this.referenceForm = this.fb.group(formControls, {
    //   validator: this.checkForDuplicates,
    // });
    // console.log(this.referenceForm.errors);

    console.log('this.referenceForm.value', this.referenceForm.value);
  }

  initRetourForm() {
    this.store.select(SelectRetourDataReservation).subscribe((data) => {
      this.retourData = data.retourData;
    });

    const retourDataArray: any[][][] = Object.values(this.retourData).map(
      (outerObj) =>
        Object.values(outerObj).map((innerObj) => Object.values(innerObj))
    );
    this.referenceForm.valueChanges.subscribe(() => {
      console.log('valueChanges referenceForm');
      if (
        retourDataArray &&
        retourDataArray[this.dialogData.indexDest] &&
        retourDataArray[this.dialogData.indexDest][
          this.dialogData.indexDecharge
        ] &&
        retourDataArray[this.dialogData.indexDest][
          this.dialogData.indexDecharge
        ][this.dialogData.indexEnvoi]
      ) {
        this.store.dispatch(
          deleteRetourSuccess({
            indexDestinataire: this.dialogData.indexDest,
            indexDechargement: this.dialogData.indexDecharge,
            indexRetour: this.dialogData.indexEnvoi,
          })
        );
        console.log('retour palettes store deleted !');
      }
    });
  }

  get referencesValue() {
    return this.referenceForm.value;
  }

  onSubmitReferences() {
    const newEnvoiArray = Object.values(this.referenceForm.value);
    console.log('new envoi support=======>', newEnvoiArray);
    // if (this.dialogData.nbrPalettes) {

    const references: any[] = Object.values(this.referenceForm.value);

    const envoi: any = {
      idPalette: this.dialogData.idPalette,
      type_palette: this.dialogData.type_palette,
      nbrPalettes: this.dialogData.nbrPalettes,
      references: references.map((objReference, i) => {
        console.log('index', i, objReference);
        let index = i + 1;
        return objReference.length > 0
          ? objReference
          : 'S-' + this.dialogData.type_palette + '-' + index;
      }),
    };
    console.log(
      envoi,
      this.dialogData.indexDest,
      this.dialogData.indexDecharge,
      this.dialogData.indexEnvoi
    );
    this.store.dispatch(
      addEnvoiData({
        envoi: envoi,
        indexDestinataire: this.dialogData.indexDest,
        indexDechargement: this.dialogData.indexDecharge,
        indexEnvoi: this.dialogData.indexEnvoi,
      })
    );

    if (this.mode === 'ajout') {
      this.store.dispatch(
        updateTotalPalettesEnvoi({
          nbrPalettes: this.dialogData.nbrPalettes,
        })
      );
      this.dialogRef.close(this.referenceForm.value);
    } else if (
      this.mode === 'edit' &&
      this.nbrPaletteEdit !== this.dialogData.nbrPalettes
    ) {
      if (this.nbrPaletteEdit < this.dialogData.nbrPalettes) {
        //update
        const updateNbrPalettes =
          this.dialogData.nbrPalettes - this.nbrPaletteEdit;
        console.log('update');
        this.store.dispatch(
          updateTotalPalettesEnvoi({
            nbrPalettes: updateNbrPalettes,
          })
        );
      }
      if (this.nbrPaletteEdit > this.dialogData.nbrPalettes) {
        //restore
        console.log('restore');

        const restoreNbrPalettes =
          this.nbrPaletteEdit - this.dialogData.nbrPalettes;
        console.log(restoreNbrPalettes);

        this.store.dispatch(
          restoreTotalPalettesEnvoi({ nbrPalettes: restoreNbrPalettes })
        );
      }

      this.dialogRef.close(this.referenceForm.value);
    } else {
      this.dialogRef.close(this.referenceForm.value);
    }
  }

  checkForDuplicatesValue(value: string, index: number): void {
    const duplicates: string[] = [];
    if (value !== '') {
      for (let i = 0; i < this.array.length; i++) {
        if (i !== index) {
          const controlName = `reference_${i}`;
          const control = this.referenceForm.get(controlName);
          if (control?.value === value) {
            duplicates.push(controlName);
          }
        }
      }

      const controlName = `reference_${index}`;
      const control = this.referenceForm.get(controlName);

      if (control && duplicates.length > 0) {
        control.setErrors({ duplicate: duplicates });
      } else {
        control.setErrors(null);
      }
    }
  }

  isDuplicate(index: number): boolean {
    const controlName = `reference_${index}`;
    const control = this.referenceForm.get(controlName);
    return control?.hasError('duplicate') && control?.dirty;
  }

  getDuplicateFields(index: number): string[] {
    const controlName = `reference_${index}`;
    const control = this.referenceForm.get(controlName);
    return control?.getError('duplicate') || [];
  }
}
