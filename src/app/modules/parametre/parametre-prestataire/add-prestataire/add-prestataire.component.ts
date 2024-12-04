import { selectEnvprestataireStatus } from './../../../../core/store/prestataire/prestataire.selectors';
import { MatDialogRef } from '@angular/material/dialog';
import { VehiculeService } from 'app/core/services/vehicule.service';
import { ToastService } from 'app/core';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { selectEnvprestatairePayload, selectEnvprestataireIsLoading } from '../../../../core/store/prestataire/prestataire.selectors';
import { addprestataire, updateprestataire } from '../../../../core/store/prestataire/prestataire.actions';
import { AppState } from 'app/core/store/app.states';
import { Store } from '@ngrx/store';
import { PHONE_REGEX, phoneValidator } from 'app/shared/validators/validators';

@Component({
  selector: 'app-add-prestataire',
  templateUrl: './add-prestataire.component.html',
  styleUrls: ['./add-prestataire.component.css']
})
export class AddPrestataireComponent implements OnInit {

  createPrestataire = new FormGroup({});
  form_btn : any;
  type : any;
  mode : any;
  item : any;
  file : any;
  spinnerAdd : boolean;
  picture_name: string;
  image_src: string;
  display_img: boolean = false;
  constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private store: Store<AppState>,
        public dialogRef: MatDialogRef<AddPrestataireComponent>,
        private vehiculeService : VehiculeService,
        private _toast: ToastService,) {}

  ngOnInit(): void {
    this.type = this.data["type"]
    this.mode = this.data["mode"]
    this.item = this.data["item"]
    console.log("MODE", this.mode)
    console.log("ITEM", this.item)

    console.log("Type ", this.type)


    this.setForm()


    if (this.type == "CARTE") {
      this.addNewCarte()
    }
  }


  addNewCarte(type  = '', image = ''){

    // let cartes = this.createPrestataire.get('cartes') as FormArray;
    // cartes.push(
    //   new FormGroup({
    //     type: new FormControl(type),
    //     image: new FormControl(image),
    //   })
    // );
  }

  setForm(){
    if(this.mode == "add"){
      this.form_btn = "Ajouter"
      this.createPrestataire = new FormGroup({
        name: new FormControl("", Validators.required),
        date: new FormControl("", Validators.required),
        gsm_socite: new FormControl("", [Validators.required, Validators.pattern(PHONE_REGEX), phoneValidator()]),
        mail_societe: new FormControl("", [Validators.required, Validators.email]),
        contact: new FormControl("", Validators.required),
        adresse: new FormControl("", Validators.required),
        gsm_contact: new FormControl("", [Validators.required, Validators.pattern(PHONE_REGEX), phoneValidator()]),
        fix: new FormControl("", [Validators.required, Validators.pattern(PHONE_REGEX), phoneValidator()]),
        mail_contact: new FormControl("", [Validators.required, Validators.email]),
        type: new FormControl(this.data["type"], Validators.required),
        // cartes : new FormArray([

        // ])
      })
    }else{
      this.form_btn = "Modifier"
      this.createPrestataire = new FormGroup({
        name: new FormControl(this.item.name, Validators.required),
        date: new FormControl(this.item.date, Validators.required),
        gsm_socite: new FormControl(this.item.gsm_socite, [Validators.required, Validators.pattern(PHONE_REGEX), phoneValidator()]),
        mail_societe: new FormControl(this.item.mail_societe, [Validators.required, Validators.email]),
        contact: new FormControl(this.item.contact, Validators.required),
        adresse: new FormControl(this.item.adresse, Validators.required),
        gsm_contact: new FormControl(this.item.gsm_contact, [Validators.required, Validators.pattern(PHONE_REGEX), phoneValidator()]),
        fix: new FormControl(this.item.fix, [Validators.required, Validators.pattern(PHONE_REGEX), phoneValidator()]),
        mail_contact: new FormControl(this.item.mail_contact, [Validators.required, Validators.email]),
        type: new FormControl(this.data["type"], Validators.required),
      })
    }
  }

  onSelectImagePrestataire(fileInputEvent: any) {
    this.file = fileInputEvent.target.files[0];
    this.picture_name = this.file.name;
    var reader = new FileReader();
    reader.readAsDataURL(fileInputEvent.target.files[0]);
    reader.onload = (event: any) => {
      this.image_src = event.target.result;
      this.display_img = true;
    };
  }

  addPrestataire(){
    console.log("prestataire", this.createPrestataire.value)

    // const flattenedGroup = this.flattenFormGroup(this.createPrestataire)

    // console.log('fflattenedGroup ' , flattenedGroup);

    // let formData = new FormData();
    // for (var key in flattenedGroup) {
    //   formData.append(key, flattenedGroup[key] );
    // }
    const formData = new FormData();
    for (const key in this.createPrestataire.value) {
      if (this.createPrestataire.value.hasOwnProperty(key)) {
        const value = this.createPrestataire.value[key];

        if (key === 'cartes' && Array.isArray(value)) {
          // for (const cartValue of value) {
          //   formData.append('cartes[]', JSON.stringify({ type : cartValue.type, image : cartValue.image as File })); // Serialize the parsed object
          // }
        } else {
          formData.append(key, value.toString()); // Convert value to string before appending
        }
      }
    }

    if (this.file) {
      formData.append('file', this.file);
    }


    // @ts-ignore
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]);
     }
    if(this.mode == "add"){
      console.log("MODE AJOUT")
      this.store.dispatch(addprestataire({ data: formData }));
      this.store.select(selectEnvprestataireIsLoading).subscribe((res) => {
        // console.log("spinner", res);
        this.spinnerAdd = res
      });
      this.store.select(selectEnvprestataireStatus).subscribe((res) => {
        // console.log("status", res);
        if(res == 'SUCCESS'){
          this.dialogRef.close();
        }
      });
    }else{
      console.log("MODE EDIT")
      this.store.dispatch(updateprestataire({ data: formData, uuid:this.item.uuid }));
      this.store.select(selectEnvprestataireIsLoading).subscribe((res) => {
        // console.log("spinner", res);
        this.spinnerAdd = res
      });
      this.store.select(selectEnvprestataireStatus).subscribe((res) => {
        console.log("status", res);
        if(res == 'SUCCESS'){
          this.dialogRef.close();
        }
      });
    }


    // this.spinnerAdd = true
    // this.vehiculeService.addPrestataire(this.createPrestataire.value).subscribe(
    //   (data) => {
    //     console.log('data', data);
    //     this._toast.success("Prestataire ajouté avec succés");
    //     this.spinnerAdd = false;
    //     this.dialogRef.close(data["response"]);
    //   },
    //   (error) => {
    //     console.log('error', error);
    //     this.spinnerAdd = false;
    //     this._toast.error("Une erreur est survenue");
    // });
  }

  onSelectImageCart(fileInputEvent: any, index) {
    let file = fileInputEvent.target.files[0];

    let cartes = this.createPrestataire.get('cartes') as FormArray;

    const reader = new FileReader();

    cartes.at(index).get('image').setValue(file);

    // reader.onloadend = () => {
    //   const base64String = reader.result as string;
    // };

    // reader.readAsDataURL(file);
  }

  flattenFormGroup(formGroup: FormGroup, controlNamePrefix = '') {
    const flattenedGroup = {};

    const flattenControl = (control: AbstractControl, controlName: string) => {
      const flattenedControlName = controlNamePrefix ? `${controlNamePrefix}.${controlName}` : controlName;

      if (control instanceof FormControl) {
        if (control.value instanceof File) {
          flattenedGroup[flattenedControlName] = control.value;
        } else if (typeof control.value === 'boolean') {
          flattenedGroup[flattenedControlName] = control.value ? '1' : '0';
        } else {
          flattenedGroup[flattenedControlName] = control.value != null ? control.value.toString() : '';
        }
      } else if (control instanceof FormArray) {
        const formArray = control as FormArray;
        const values = [];
        for (let i = 0; i < formArray.length; i++) {
          const formArrayControl = formArray.at(i);
          values.push(flattenControl(formArrayControl, i.toString()));
        }
        flattenedGroup[flattenedControlName] = values;
      } else if (control instanceof FormGroup) {
        const nestedFormGroup = control as FormGroup;
        const nestedFlattenedGroup = this.flattenFormGroup(nestedFormGroup, flattenedControlName);
        Object.assign(flattenedGroup, nestedFlattenedGroup);
      }
    };

    for (const controlName in formGroup.controls) {
      const control = formGroup.controls[controlName];
      flattenControl(control, controlName);
    }

    return flattenedGroup;
  }




}
