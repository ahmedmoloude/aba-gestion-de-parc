import { Component, OnInit, Inject } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  SelectEnvoiDataReservation,
  SelectRetourDataReservation,
} from 'app/core/store/reservation/reservation.selectors';
import { addRetourData } from 'app/core/store/reservation/reservation.actions';
import { ToastService } from 'app/core/services/toast.service';
export interface Facteur {
  name: string;
}

@Component({
  selector: 'app-dialog-nmbsupport',
  templateUrl: './dialog-nmbsupport.component.html',
  styleUrls: ['./dialog-nmbsupport.component.css'],
})
export class DialogNmbsupportComponent implements OnInit {
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  facteurs: string[] = [];
  supports: any[] = [];
  checkedSupports: any[] = [];
  checkedSupportSdtm: boolean = false;
  checkSupport: boolean;
  sdtm: boolean = false;
  objEnvoiSelected: any;
  objRetour: any;
  palettes_retour: any[];
  palettes_additionel: any[];
  modeSupport: string;
  nbrPalettes: any;
  formGroup: FormGroup;
  isSdtm: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<DialogNmbsupportComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private fb: FormBuilder,
    private store: Store,
    private _toast: ToastService
  ) {}

  add(event: MatChipInputEvent): void {
    // const value = (event.value || '').trim();
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      if (this.facteurs.length === 0 && this.supports.length === 0) {
        this.facteurs.push(value.trim());
      } else {
        if (
          this.facteurs.findIndex((x) => x === value) === -1 &&
          this.supports?.findIndex((x) => x == value) === -1
        ) {
          this.facteurs.push(value.trim());
        } else {
          this._toast.warn('La référence ne peut pas être dupliquée !');
        }
      }
    }

    if (input) {
      input.value = '';
    }

    // Clear the input value
    // event.chipInput!.clear();
  }

  remove(facteur: string): void {
    const index = this.facteurs.indexOf(facteur);

    if (index >= 0) {
      this.facteurs.splice(index, 1);
    }
  }

  selectEnvoiDataReservation$: Observable<any> = this.store.select(
    SelectEnvoiDataReservation
  );

  envoiData: any;
  retourData: any;

  ngOnInit(): void {
    console.log('this.dialogData ==>', this.dialogData);

    this.store.select(SelectEnvoiDataReservation).subscribe((data) => {
      this.envoiData = data.envoiData;
    });

    this.store.select(SelectRetourDataReservation).subscribe((data) => {
      this.retourData = data.retourData;
    });

    const retourDataArray: any[][][] = Object.values(this.retourData).map(
      (outerObj) =>
        Object.values(outerObj).map((innerObj) => Object.values(innerObj))
    );



      console.log('array envoi' , retourDataArray)
      console.log('array indexDest' , this.dialogData.indexDest)
      console.log('array indexDecharge' , this.dialogData.indexDecharge)


    if (
      retourDataArray &&
      retourDataArray[this.dialogData?.indexDest] &&
      retourDataArray[this.dialogData?.indexDest][
        this.dialogData?.indexDecharge
      ] &&
      retourDataArray[this.dialogData?.indexDest][
        this.dialogData?.indexDecharge
      ][this.dialogData?.indexRetour]
    ) {
      this.retourFormEdit();
    } else {
      this.retourFormInit();
    }

    const type_palettes_dechargement = this.dialogData
      ?.type_palettes_dechargement as any;
    console.log('type_palettes_dechargement', type_palettes_dechargement);

    this.checkedSupportSdtm =
      type_palettes_dechargement === 'sdtm' ? true : false;



      this.formGroup.get('number_of_refrences')?.valueChanges.subscribe(value => {
        const currentTypePalette_Retour = this.dialogData?.type_palette as any;
    
        // Generate new references without prefixes
        let refrences = Array.from(
          { length: this.formGroup.get('number_of_refrences').value },
          (_, i) =>
            'palette-sans-ref-' +
            currentTypePalette_Retour +
            '-' +
            Math.floor(Math.random() * (1000 - 1 + 1)) +
            1
        );
    
        // Filter out references with the prefix "palette-sans-ref-"
        this.facteurs = this.facteurs.filter(reference => !reference.startsWith('palette-sans-ref-'));
    
        // Add new references to facteurs array
        this.facteurs = [...this.facteurs, ...refrences];
    
        console.log('Refrences', refrences);
    

    });
    
    
  }

  mode: any;
  array: any[];

  retourFormInit() {
    this.mode = 'ajout';

    const envoiDataArray = Object.values(this.envoiData).map((obj) =>
      Object.values(obj).map((obj) => Object.values(obj))
    );

    console.log('envoiDataArray', envoiDataArray);
    if (
      envoiDataArray &&
      envoiDataArray[this.dialogData?.indexDest] &&
      envoiDataArray[this.dialogData?.indexDest][
        this.dialogData?.indexDecharge
      ] &&
      envoiDataArray[this.dialogData?.indexDest][
        this.dialogData?.indexDecharge
      ][this.dialogData?.indexRetour]
    ) {
      const currentTypePalette_Retour = this.dialogData?.type_palette as any;

      this.objEnvoiSelected = envoiDataArray[this.dialogData.indexDest][
        this.dialogData.indexDecharge
      ].find((e: any) => e.type_palette === currentTypePalette_Retour);
      console.log('objEnvoiSelected2', this.objEnvoiSelected);

      const objReferences: any = this.objEnvoiSelected?.references;

      console.log('objReferences', objReferences);
      this.supports = Object.values(objReferences || {});
      // with support
      console.log(this.supports);

      if (this.supports.length > 0) {
        console.log('Ajout with support');
        this.formGroup = this.fb.group({});
        this.formGroup.addControl('number_of_refrences', new FormControl(0));
        this.modeSupport = 'modeSupport';
        this.createFormControls(this.supports);
      } else {
        console.log('Ajout No support');
        this.formGroup = this.fb.group({});
        this.formGroup.addControl('number_of_refrences', new FormControl(0));

        this.modeSupport = '';
        this.ajoutNoSupport();
      }
    } else {
      console.log('Ajout No support');
      this.modeSupport = '';
      this.formGroup = this.fb.group({});
      this.formGroup.addControl('number_of_refrences', new FormControl(0));

      this.ajoutNoSupport();
    }

    /* if (
      envoiDataArray &&
      envoiDataArray[this.dialogData?.indexDest] &&
      envoiDataArray[this.dialogData?.indexDest][
        this.dialogData?.indexDecharge
      ] &&
      envoiDataArray[this.dialogData?.indexDest][
        this.dialogData?.indexDecharge
      ][this.dialogData?.indexRetour]
    ) {
      console.log('Ajout with support');
    } else {
      console.log('Ajout No support');
    }*/
  }

  retourFormEdit() {

    console.log('modeedit .')
    this.mode = 'edit';

    const arrayOfEnvoi = Object.values(this.envoiData).map((obj) =>
      Object.values(obj).map((obj) => Object.values(obj))
    );

    // mode support  ==> get supports envoi
    if (
      arrayOfEnvoi &&
      arrayOfEnvoi[this.dialogData.indexDest] &&
      arrayOfEnvoi[this.dialogData.indexDest][this.dialogData.indexDecharge]
    ) {
      const currentTypePalette_Retour = this.dialogData?.type_palette;

      this.objEnvoiSelected = arrayOfEnvoi[this.dialogData.indexDest][
        this.dialogData.indexDecharge
      ]?.find((e: any) => e.type_palette === currentTypePalette_Retour);

      const objReferences = this.objEnvoiSelected
        ? this.objEnvoiSelected?.references
        : undefined;

      if (typeof objReferences !== 'undefined' && objReferences !== null) {
        //with mode support
        this.modeSupport = 'modeSupport';
        console.log('MODE SUPPORT');
        this.supports = Object.values(objReferences);
        const arrayOfRetour = Object.values(this.retourData).map((obj) =>
          Object.values(obj).map((obj) => Object.values(obj))
        );

        // mode support  ==> get supports retour

        if (arrayOfRetour.length > 0) {
          this.objRetour = arrayOfRetour[this.dialogData?.indexDest];
          if (
            typeof this.retourData[this.dialogData?.indexDest][
              this.dialogData.indexDecharge
            ][this.dialogData?.indexRetour] !== 'undefined' &&
            this.retourData[this.dialogData?.indexDest][
              this.dialogData.indexDecharge
            ][this.dialogData?.indexRetour] !== null
          ) {
            this.palettes_retour = this.transform(
              this.retourData[this.dialogData.indexDest][
                this.dialogData.indexDecharge
              ][this.dialogData.indexRetour].palettes_retour
            ) as Array<any>;

            console.log('this.palettes_envoi=====>', this.supports);
            console.log('this.palettes_retour=====>', this.palettes_retour);

            this.formGroup = this.fb.group({});
            this.formGroup.addControl(
              'number_of_refrences',
              new FormControl(0)
            );

            this.editFormControls(this.supports, this.palettes_retour);

            this.palettes_additionel = this.transform(
              this.retourData[this.dialogData.indexDest][
                this.dialogData.indexDecharge
              ][this.dialogData.indexRetour].palettes_additionel
            );
            console.log('ADDI', this.palettes_additionel);
            if (this.palettes_additionel?.length > 0) {
              this.palettes_additionel.forEach((p: any) => {
                console.log('FACTEUR', p);
                this.facteurs.push(p);
              });
            }
          } else {
            console.log(this.palettes_retour);
            console.log(this.palettes_additionel);
          }
        }
      } else {
        // mode No support
        this.editNoSupport();
      }
    }

    // mode No support
    else {
      this.editNoSupport();
    }
  }

  ajoutNoSupport() {
    this.nbrPalettes = this.dialogData.nbr_palettes_parType as number;
    console.log('no palettes referneces case :', this.nbrPalettes);
    const supportName = 'support';
    this.array = Array.from(
      { length: this.nbrPalettes },
      (_, i) => supportName + i
    );
    //without support
    console.log(this.array);

    this.createFormControls(this.array);
  }
  editNoSupport() {
    console.log('MODE no SUPPORT');
    this.modeSupport = '';

    const arrayOfRetour = Object.values(this.retourData).map((obj) =>
      Object.values(obj).map((obj) => Object.values(obj))
    );

    // mode support  ==> get supports retour

    if (arrayOfRetour.length > 0) {
      this.objRetour = arrayOfRetour[this.dialogData?.indexDest];
      if (
        typeof this.retourData[this.dialogData?.indexDest][
          this.dialogData.indexDecharge
        ][this.dialogData?.indexRetour] !== 'undefined' &&
        this.retourData[this.dialogData?.indexDest][
          this.dialogData.indexDecharge
        ][this.dialogData?.indexRetour] !== null
      ) {
        this.palettes_retour = this.transform(
          this.retourData[this.dialogData.indexDest][
            this.dialogData.indexDecharge
          ][this.dialogData.indexRetour].palettes_retour
        ) as Array<any>;

        console.log('this.palettes_envoi=====>', this.supports);
        console.log('this.palettes_retour=====>', this.palettes_retour);

        this.formGroup = this.fb.group({});
        this.formGroup.addControl('number_of_refrences', new FormControl(0));

        this.nbrPalettes = this.dialogData.nbr_palettes_parType as number;
        console.log('no palettes referneces case :', this.nbrPalettes);
        const supportName = 'support';
        this.array = Array.from(
          { length: this.nbrPalettes },
          (_, i) => supportName + i
        );

        console.log(this.array);
        console.log(this.palettes_retour);

        this.editFormControls(this.array, this.palettes_retour);

        /*    if (this.palettes_retour?.length > 0) {
      this.palettes_retour.forEach((p: any) =>
        this.checkedSupports.push(p)
      );
    } else {
      if (this.supports?.length > 0) {
        this.supports.forEach((p: any) => this.checkedSupports.push(p));
      }
    }*/

        this.palettes_additionel = this.transform(
          this.retourData[this.dialogData.indexDest][
            this.dialogData.indexDecharge
          ][this.dialogData.indexRetour].palettes_additionel
        );
        console.log('ADDI', this.palettes_additionel);
        if (this.palettes_additionel?.length > 0) {
          this.palettes_additionel.forEach((p: any) => {
            console.log('FACTEUR', p);
            this.facteurs.push(p);
          });
        }
      } else {
      }
    }
  }

  transform(objects: any = []) {
    return Object.values(objects);
  }

  createFormControls(array) {
    array.forEach((support, i) => {
      const controlName = support;

      console.log('createFormControls', controlName);
      //const controlName = 'support' + array.indexOf(support);
      this.formGroup.addControl(
        controlName,
        new FormControl(false, Validators.required)
      );
    });
  }

  editFormControls(palettes_envoi: any[], palettes_retour: any[]) {
    if (palettes_envoi.length > 0 && palettes_retour.length > 0) {
      palettes_envoi.forEach((support, i) => {
        const isChecked = palettes_retour.includes(support);
        console.log(support);
        this.formGroup.addControl(
          support,
          new FormControl(isChecked, Validators.required)
        );
      });
    }
    if (palettes_envoi.length > 0 && palettes_retour.length <= 0) {
      palettes_envoi.forEach((support, i) => {
        console.log(support);
        this.formGroup.addControl(
          support,
          new FormControl(false, Validators.required)
        );
      });
    }
  }

  onCheckboxChange(event: any, support: string) {
    const control = this.formGroup.get(support) as FormControl;
    if (event.checked) {
      control.setValue(support);
    } else {
      control.setValue(null);
    }
  }
  onCheckboxChange2(event: any, support: string) {
    console.log(event);
    const controlName = support;
    const control = this.formGroup?.get(controlName) as FormControl;

    if (control) {
      if (event.checked) {
        control.setValue(true);
      } else {
        control.setValue(false);
      }
    }
  }

  hasDuplicates(array1: string[], array2: string[]): boolean {
    if (array1?.length > 0 && array2?.length > 0) {
      const combinedArray = [...array1, ...array2];
      const uniqueValues = new Set(combinedArray);
      return combinedArray.length !== uniqueValues.size;
    }
  }

  valider() {
    console.log(this.modeSupport);
    console.log(this.checkedSupportSdtm);

    if (
      this.mode === 'ajout' &&
      this.modeSupport === 'modeSupport' &&
      !this.checkedSupportSdtm
    ) {
      console.log('ajout support expediteur');
      console.log(this.formGroup.value);
      const selectedSupports = Object.values(this.formGroup.value).filter(
        (value) => value !== '' && value !== null && value !== false
      );
      this.checkedSupports = selectedSupports;
    }
    if (
      this.mode === 'edit' &&
      this.modeSupport === 'modeSupport' &&
      !this.checkedSupportSdtm
    ) {
      console.log(this.formGroup.value);
      const obj = this.formGroup.value;
      const selectedSupports = Object.keys(obj).filter(
        (key) => obj[key] === true
      );

      this.checkedSupports = selectedSupports;
    }
    if (
      this.mode === 'ajout' &&
      this.modeSupport === 'modeSupport' &&
      this.checkedSupportSdtm
    ) {
      console.log(this.supports);
      this.supports.forEach((e) => {
        this.checkedSupports.push(e);
      });
    }
    if (
      this.mode === 'edit' &&
      this.modeSupport === 'modeSupport' &&
      this.checkedSupportSdtm
    ) {
      this.supports.forEach((e) => {
        this.checkedSupports.push(e);
      });
    }
    if (
      this.mode === 'ajout' &&
      this.modeSupport !== 'modeSupport' &&
      !this.checkedSupportSdtm
    ) {
      console.log(this.formGroup.value);
      const obj = this.formGroup.value;
      const selectedSupports = Object.keys(obj).filter(
        (key) => obj[key] === true
      );

      this.checkedSupports = selectedSupports;
    }
    if (
      this.mode === 'ajout' &&
      this.modeSupport !== 'modeSupport' &&
      this.checkedSupportSdtm
    ) {
      this.array.forEach((e) => {
        this.checkedSupports.push(e);
      });
    }
    if (
      this.mode === 'edit' &&
      this.modeSupport !== 'modeSupport' &&
      !this.checkedSupportSdtm
    ) {
      console.log(this.formGroup.value);
      const obj = this.formGroup.value;
      const selectedSupports = Object.keys(obj).filter(
        (key) => obj[key] === true
      );

      this.checkedSupports = selectedSupports;
    }

    if (
      this.mode === 'edit' &&
      this.modeSupport !== 'modeSupport' &&
      this.checkedSupportSdtm
    ) {
      this.array.forEach((e) => {
        this.checkedSupports.push(e);
      });
    }

    console.log(this.checkedSupports);
    console.log(this.facteurs);
    //  if (!this.hasDuplicates(this.checkedSupports, this.facteurs)) {

    // const currentTypePalette_Retour = this.dialogData?.type_palette as any;

    // let palettes_additionels = this.withoutRefrence
    //   ? Array.from(
    //       { length: this.formGroup.get('number_of_refrences').value },
    //       (_, i) => 'SR-' + currentTypePalette_Retour + '-' + i
    //     )
    //   : this.facteurs;
    const validSupportsRetour = {
      palettes_retour: { ...this.checkedSupports },
      palettes_additionel: { ...this.facteurs },
    };
    this.store.dispatch(
      addRetourData({
        retour: validSupportsRetour,
        indexDestinataire: this.dialogData.indexDest,
        indexDechargement: this.dialogData.indexDecharge,
        indexRetour: this.dialogData.indexRetour,
      })
    );
    this.dialogRef.close(validSupportsRetour);
    // } else {
    //  this._toast.error('Références retour sont dupliquées !');
    //}
  }

  // generateRefrences() {

  // }
}
