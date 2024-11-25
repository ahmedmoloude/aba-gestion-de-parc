import { MatDialogRef } from '@angular/material/dialog';
import { ToastService } from 'app/core';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { AppState } from 'app/core/store/app.states';
import { Store } from '@ngrx/store';
import { PHONE_REGEX, phoneValidator } from 'app/shared/validators/validators';
import { selectExpenseNatureState, selectExpenseSuppliers } from 'app/core/store/caisse/expense/expense.selectors';
import { StateEnum } from 'app/core/store/caisse/expense/expense.reducer';
import { addExpenseNature, updateExpenseNature } from 'app/core/store/caisse/expense/expense.actions';

@Component({
  selector: 'app-add-nature-depense',
  templateUrl: './add-nature-depense.component.html',
  styleUrls: ['./add-nature-depense.component.css']
})
export class AddNatureDepenseComponent implements OnInit {

  createNature = new FormGroup({});
  form_btn : any;
  mode : any;
  item : any;
  file : any;
  spinnerAdd : boolean;
  picture_name: string;
  image_src: string;
  display_img: boolean = false;
  fournisseurs :any = [];
  constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private store: Store<AppState>,
        public dialogRef: MatDialogRef<AddNatureDepenseComponent>,
        private _toast: ToastService,) {}

  ngOnInit(): void {
    this.mode = this.data["mode"]
    this.item = this.data["item"]
    console.log("MODE", this.mode)
    console.log("ITEM", this.item)
    this.store.select(selectExpenseSuppliers).subscribe((res) => {
      this.fournisseurs = res;
      console.log('fournisseurs', this.fournisseurs);
    });
    this.setForm();
  }

  setForm(){
    if(this.mode == "add"){
      this.form_btn = "Ajouter"
      this.createNature = new FormGroup({
        name: new FormControl("", Validators.required),
        fournisseur_depence_id: new FormControl("", Validators.required),
        // date: new FormControl("", Validators.required),
        // gsm_socite: new FormControl("", [Validators.required, Validators.pattern(PHONE_REGEX), phoneValidator()]),
        // mail_societe: new FormControl("", [Validators.required, Validators.email]),
        // contact: new FormControl("", Validators.required),
        // adresse: new FormControl("", Validators.required),
        // gsm_contact: new FormControl("", [Validators.required, Validators.pattern(PHONE_REGEX), phoneValidator()]),
        // fix: new FormControl("", [Validators.required, Validators.pattern(PHONE_REGEX), phoneValidator()]),
        // mail_contact: new FormControl("", [Validators.required, Validators.email]),
      })
    }else{
      this.form_btn = "Modifier"
      this.createNature = new FormGroup({
        name: new FormControl(this.item.name, Validators.required),
        fournisseur_depence_id: new FormControl(this.item.fournisseur_depence_id, Validators.required),
        // date: new FormControl(this.item.date, Validators.required),
        // gsm_socite: new FormControl(this.item.gsm_socite, [Validators.required, Validators.pattern(PHONE_REGEX), phoneValidator()]),
        // mail_societe: new FormControl(this.item.mail_societe, [Validators.required, Validators.email]),
        // contact: new FormControl(this.item.contact, Validators.required),
        // adresse: new FormControl(this.item.adresse, Validators.required),
        // gsm_contact: new FormControl(this.item.gsm_contact, [Validators.required, Validators.pattern(PHONE_REGEX), phoneValidator()]),
        // fix: new FormControl(this.item.fix, [Validators.required, Validators.pattern(PHONE_REGEX), phoneValidator()]),
        // mail_contact: new FormControl(this.item.mail_contact, [Validators.required, Validators.email]),
      })
    }
  }

  onSelectImageNature(fileInputEvent: any) {
    this.file = fileInputEvent.target.files[0];
    this.picture_name = this.file.name;
    var reader = new FileReader();
    reader.readAsDataURL(fileInputEvent.target.files[0]);
    reader.onload = (event: any) => {
      this.image_src = event.target.result;
      this.display_img = true;
    };
  }

  addNature(){
    console.log("nature", this.createNature.value)

    const formData = new FormData();
    for (const key in this.createNature.value) {
      if (this.createNature.value.hasOwnProperty(key)) {
        const value = this.createNature.value[key];
        formData.append(key, value.toString());
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
      this.store.dispatch(addExpenseNature({ data: formData }));
      this.store.select(selectExpenseNatureState).subscribe((res) => {
        this.spinnerAdd = res == StateEnum.LOADING;
        if (res == StateEnum.SUCCESS) this.dialogRef.close();
      });

    } else {
      console.log("MODE EDIT")
      this.store.dispatch(updateExpenseNature({ data: formData, uuid:this.item.uuid }));

      this.store.select(selectExpenseNatureState).subscribe((res) => {
        this.spinnerAdd = res == StateEnum.LOADING;
        if (res == StateEnum.SUCCESS) this.dialogRef.close();
      });
    }
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
