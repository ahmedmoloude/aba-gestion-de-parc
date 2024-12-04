import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AffretementService } from 'app/core/services/affretement.service';
import {
  addDetailsMarchandiseSuccess,
  resetNbrPalettesG,
} from 'app/core/store/reservation/reservation.actions';
import {
  SelectNbrPalttesGReservation,
  SelectdetailsMarchandiseReservation,
} from 'app/core/store/reservation/reservation.selectors';
import { IFieldComponent } from 'app/shared/components/i-field/i-field.component';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detail-marchandise',
  templateUrl: './detail-marchandise.component.html',
  styleUrls: ['./detail-marchandise.component.css'],
})
export class DetailMarchandiseComponent implements OnInit {
  files: any;
  detailsMarchandise: any[];
  mode: string;
  visual: boolean = false;
  long: number = 0;
  larg: number = 0;
  haut: number = 0;
  images: any[] = [];
  path: string =
    'E:\\AbaTechnologies\\SDTM\\sdtm-client\\src\\assets\\detailMarchandise\\';

  naturePalettes = ['Palettisées', 'Vrac'];
  currentAddress: string;
  nbrPalttesGlobal: number;
  numberPointChargement: number;
  detailVisual: any;

  @ViewChild('form') form: ElementRef;
  @ViewChild('nbrPalette') nbrPalette: IFieldComponent;
  @ViewChild('resetButton') resetButton: ElementRef;
  formDetail: FormGroup;

  nbrPalttesGlobalInitial: number;
  poidsGlobalInitial: number;
  volumeGlobalInitial: number;
  palettes = []


  constructor(
    public dialogRef: MatDialogRef<DetailMarchandiseComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private fb: FormBuilder,
    private store: Store,
    private affretmentService : AffretementService
  ) {}

  detailsMarchandise$: Observable<any> = this.store.select(
    SelectdetailsMarchandiseReservation
  );

  ngOnInit(): void {

    this.affretmentService.getPaletteTypes().subscribe((res) => {
      this.palettes = res;
    });

    console.log('this.dialogData', this.dialogData);
    this.currentAddress = this.dialogData.addressChargement;
    this.visual = this.dialogData.visual;

    this.numberPointChargement = this.dialogData?.detailsmarchandiseIndex + 1;

    this.detailsMarchandise$.subscribe((data) => {
      this.detailsMarchandise = data.detailsMarchandise;

      console.log('details marchandise ' , this.detailsMarchandise)
      if (
        this.detailsMarchandise?.length > 0 &&
        this.detailsMarchandise[this.dialogData?.detailsmarchandiseIndex]
      ) {
        this.detailVisual =
          this.detailsMarchandise[this.dialogData?.detailsmarchandiseIndex];
        this.formDetailStep();
      } else if (this.dialogData?.detailsmarchandise !== undefined) {
        this.detailVisual = this.dialogData?.detailsmarchandise;
      } else {
        this.formDetailInit();

      }


    });

    this.store.select(SelectNbrPalttesGReservation).subscribe((data) => {
      this.nbrPalttesGlobal = data.nbrPalettesG;
      this.nbrPalttesGlobalInitial = data.nbrPalettesGInitial;
    });


   
  }

  formDetailInit() {
    this.mode = 'ajout';

    this.formDetail = this.fb.group({
      nature_palette: this.fb.control('', [Validators.required]),
      nbr_palettes: this.fb.control(0, [
        Validators.required,
        Validators.min(1),
        Validators.max(this.nbrPalttesGlobal),
      ]),
      poids: this.fb.control(0, [Validators.required, Validators.min(0)]),
      volume: this.fb.control(0 , [Validators.min(0)]),
      hauteur: this.fb.control(0, [Validators.required]),
      longueur: this.fb.control(0, [Validators.required]),
      largeur: this.fb.control(0, [Validators.required]),
      valeur_declaree: this.fb.control(null, [
        Validators.required,
        Validators.min(0),
      ]),
      images: this.fb.control(null), // add a new FormControl to hold the selected image
      type_palette_chargement :  this.fb.control('', [Validators.required]),
    });

    // this.images = [
    //   {
    //     name: 'images.jpg',
    //     file: {},
    //     url: 'data:image/jpeg;base64,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',
    //   },
    // ];

    // this.formDetail.controls['nbr_palettes'].valueChanges.subscribe((e) => {
    //   this.poidsCalculed = e * (this.poidsGlobal / this.nbrPalttesGlobal);
    // });
  }

  formDetailStep() {
    this.mode = 'edit';

    const detailMarchandise: any =
      this.detailsMarchandise[this.dialogData?.detailsmarchandiseIndex];
    const imgArray = detailMarchandise.images as Array<any>;

    console.log('img array' , imgArray)


    if (imgArray?.length > 0) {
      imgArray.forEach((img) => {
        this.images.push(img);
      });
    }

    console.log('edit mode ...', detailMarchandise);

    this.long = detailMarchandise?.longueur;
    this.larg = detailMarchandise?.largeur;
    this.haut = detailMarchandise?.hauteur;
    this.formDetail = this.fb.group({
      nature_palette: this.fb.control(detailMarchandise?.nature_palette, [
        Validators.required,
      ]),
      nbr_palettes: this.fb.control(detailMarchandise?.nbr_palettes, [
        Validators.required,
        Validators.min(1),
      ]),
      poids: this.fb.control(Number(detailMarchandise?.poids), [
        Validators.required,
        Validators.min(1),
      ]),

      volume: this.fb.control(detailMarchandise?.volume , [Validators.min(0)]),
      hauteur: this.fb.control(detailMarchandise?.hauteur, [
        Validators.required,
      ]),
      longueur: this.fb.control(detailMarchandise?.longueur, [
        Validators.required,
      ]),
      largeur: this.fb.control(detailMarchandise?.largeur, [
        Validators.required,
      ]),
      valeur_declaree: this.fb.control(detailMarchandise?.valeur_declaree, [
        Validators.required,
      ]),
      type_palette_chargement: this.fb.control(detailMarchandise?.type_palette_chargement, [
        Validators.required,
      ]),
      images: this.fb.control([]),
    });
    // if (detailMarchandise.images > 0) {
    //   this.formDetail.get('images').setValue(detailMarchandise.images);
    // }

    //++++++++++++++++++++++++
    //  const imagesControl = this.formDetail.controls['images'] as FormControl;
    // const imagesArray = imagesControl.value as Array<any>;
    // const currentImages: any[] = detailMarchandise.images;
    // currentImages.forEach((img) => {
    //   imagesArray.push(img);
    // });

    // this.poidsCalculed =
    //   detailMarchandise?.nbr_palettes *
    //   (this.poidsGlobalInitial / this.nbrPalttesGlobalInitial);

    // this.currentNbrPalettesG = Number(detailMarchandise?.nbr_palettes);
    // this.currentPoids = Number(detailMarchandise?.poids);
    // this.currentVolume = Number(detailMarchandise?.volume);
  }


  disableAllControls(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      control.disable();
    });
  }
  onDisableForm() {
    this.disableAllControls(this.formDetail);
  }

  validateNbrPalettes(control: any) {
    const value = Number(control.value);
    const max = this.nbrPalttesGlobal;

    const min = 0;

    if (isNaN(value) || value < min || value > max) {
      return { nbr_palettes: true };
    }

    return null;
  }

  nbrPaletteChange(event) {
    const nbrPalettesG = Number(event.target.value);
    // const poidsGlobal: number = this.dialogData.poidsGlobal;

  }

  ngAfterViewInit(): void {}

  file: any;
  imgInputChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        const newImageItem: any = {
          name: file.name,
          file: file,
          url: reader.result as string,
        };
        this.images.push(newImageItem);
      };
    }
    console.log(this.images);
  }

  removeImage(index: number): void {
    this.images.splice(index, 1);
    //this.images.filter((img, i) => i !== index);
  }

  onSubmitDetails() {
    // if (this.images.length > 0) {
    //   const imagesControl = this.formDetail.get('images') as FormControl;
    //   const imagesArray = imagesControl.value as Array<any>;
    //   this.images.forEach((img) => {
    //     imagesArray.push(img);
    //   });
    // }
    if (this.images?.length > 0) {
      this.formDetail.get('images').setValue(this.images);
    }
    console.log('==============================>', this.formDetail);
    const nbr_palettes_selected: number =
      this.formDetail.get('nbr_palettes').value;
    const poids_selected: number = this.formDetail.get('poids').value;
    const volume_selected: number = this.formDetail.get('volume').value;

    // if (
    //   nbr_palettes_selected !== this.nbrPalttesGlobal &&
    //   this.currentNbrPalettesG !== undefined
    // ) {
    //   console.log('DEFINED =========>');

    //   if (
    //     nbr_palettes_selected > this.nbrPalttesGlobal &&
    //     nbr_palettes_selected < this.currentNbrPalettesG
    //   ) {
    //     // Restore the mines value
    //     console.log('restore nbr ');
    //     const restoreNbrPalettes =
    //       this.currentNbrPalettesG - nbr_palettes_selected;
    //     this.store.dispatch(
    //       restoreNbrPalettesG({ nbrPalettesG: restoreNbrPalettes })
    //     );
    //     const restorePoids = this.currentPoids - poids_selected;
    //     this.store.dispatch(restorePoidsG({ poidsG: restorePoids }));
    //   } else if (
    //     nbr_palettes_selected < this.nbrPalttesGlobal &&
    //     nbr_palettes_selected > this.currentNbrPalettesG
    //   ) {
    //     const updateNbrPalettes =
    //       nbr_palettes_selected - this.currentNbrPalettesG;
    //     this.store.dispatch(
    //       updateNbrPalettesG({ newNbrPalettesG: updateNbrPalettes })
    //     );
    //     const updatePoids = poids_selected - this.currentPoids;
    //     this.store.dispatch(updatePoidsG({ newPoidsG: updatePoids }));
    //   } else if (
    //     nbr_palettes_selected > this.nbrPalttesGlobal &&
    //     nbr_palettes_selected > this.currentNbrPalettesG
    //   ) {
    //     const updateNbrPalettes =
    //       nbr_palettes_selected - this.currentNbrPalettesG;
    //     this.store.dispatch(
    //       updateNbrPalettesG({ newNbrPalettesG: updateNbrPalettes })
    //     );
    //     const updatePoids = poids_selected - this.currentPoids;
    //     this.store.dispatch(updatePoidsG({ newPoidsG: updatePoids }));
    //   } else if (
    //     nbr_palettes_selected < this.nbrPalttesGlobal &&
    //     nbr_palettes_selected < this.currentNbrPalettesG
    //   ) {
    //     const restoreNbrPalettes =
    //       this.currentNbrPalettesG - nbr_palettes_selected;
    //     this.store.dispatch(
    //       restoreNbrPalettesG({ nbrPalettesG: restoreNbrPalettes })
    //     );
    //     const restorePoids = this.currentPoids - poids_selected;
    //     this.store.dispatch(restorePoidsG({ poidsG: restorePoids }));
    //   } else {
    //     console.log('case if ');
    //     if (nbr_palettes_selected < this.currentNbrPalettesG) {
    //       this.store.dispatch(
    //         restoreNbrPalettesG({
    //           nbrPalettesG: this.currentNbrPalettesG - nbr_palettes_selected,
    //         })
    //       );
    //       this.store.dispatch(
    //         restorePoidsG({ poidsG: this.currentPoids - poids_selected })
    //       );
    //     } else if (nbr_palettes_selected > this.currentNbrPalettesG) {
    //       this.store.dispatch(
    //         updateNbrPalettesG({
    //           newNbrPalettesG: nbr_palettes_selected - this.currentNbrPalettesG,
    //         })
    //       );
    //       this.store.dispatch(
    //         updatePoidsG({ newPoidsG: poids_selected - this.currentPoids })
    //       );
    //     }
    //   }
    // } else if (this.currentNbrPalettesG === undefined) {
    //   console.log('UNDEFINED =========>');
    //   this.store.dispatch(
    //     updateNbrPalettesG({ newNbrPalettesG: nbr_palettes_selected })
    //   );
    //   this.store.dispatch(updatePoidsG({ newPoidsG: poids_selected }));
    // } else {
    //   console.log('Else ========>');
    // }

    // this.store.dispatch(updateVolumeG({ newVolumeG: volume_selected }));

    // this.store.dispatch(updatePoidsG({ newPoidsG: poids_selected }));

    this.formDetail.addControl('edit_mode', new FormControl(true));
    console.log('this.formDetail.value', this.formDetail.value);
    this.store.dispatch(
      addDetailsMarchandiseSuccess({
        detail: this.formDetail.value,
        position: this.dialogData.detailsmarchandiseIndex,
      })
    );
    this.dialogRef.close(this.formDetail.value);
  }

  resetFormDetail() {
    this.store.dispatch(resetNbrPalettesG());
    this.images.length = 0;

    this.formDetail.reset();
    //this.nbrPalette.maxValue = this.nbrPalttesGlobal;
    this.resetButton.nativeElement.disabled = true;
  }

  getChargementPointsImages(id_point_chargement, img) {
    let link =  environment.STORAGE +
      '/points_chargement_marchandise/' +
      id_point_chargement +
      '/' +
      img

    console.log('link ' , link)

    
    return link;
  }

  async getFileFromUrl(url, name, defaultType = 'image/jpeg') {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], name, {
      type: data.type || defaultType,
    });
  }
}
