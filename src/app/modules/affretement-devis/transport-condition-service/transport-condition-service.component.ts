import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppState } from 'app/core/store/app.states';
import { selectAllCity } from 'app/core/store/resources/resources.selectors';
import { Store } from '@ngrx/store';
import { SharedAutcompleteComponent } from 'app/shared/components/shared-autcomplete/shared-autcomplete.component';
import { LeaderLine } from 'leader-line';
import { RubricUnite } from 'app/core/models/rubricUnite.model';

@Component({
  selector: 'app-transport-condition-service',
  templateUrl: './transport-condition-service.component.html',
  styleUrls: ['./transport-condition-service.component.css']
})
export class TransportConditionServiceComponent implements OnInit {

  @ViewChild('searchComponentOrigin', { static: false }) searchOriginComponent: SharedAutcompleteComponent;

  @ViewChild('searchComponentDest', { static: false }) searchComponentDest: SharedAutcompleteComponent;

  // transportFormsArray: FormGroup[] = [];
  hasRetour = false;
  cities = []
  conditionFormGroup = new FormGroup(
    {
      origin : new FormControl('' , Validators.required ),
      destination : new FormControl('' ,  Validators.required),
      baseCalcul : new FormControl('' ,  Validators.required),
      avecRetour: new FormControl(''),
      typeRetour: new FormControl(false),
      valeurRetour: new FormControl(1),
      transportFormsArray  : new FormArray([])
    }
  )

  rubricUnites : RubricUnite;

  constructor(
    public store : Store<AppState>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<TransportConditionServiceComponent>
  ) { }

  // @ViewChild('min', { read: ElementRef }) startingElement: ElementRef;
  // @ViewChild('max', { read: ElementRef }) endingElement: ElementRef;

  // ngAfterViewInit() {
  //   const line = new LeaderLine(this.startingElement.nativeElement, this.endingElement.nativeElement);
  // }
  ngOnInit(): void {

    this.store.select(selectAllCity).subscribe((res) => {
      this.cities = res;
      console.log('all cities==============>', this.cities);
    });
    this.conditionFormGroup.get('avecRetour').valueChanges.subscribe(type => {
      this.hasRetour = type
    })
    
    this.conditionFormGroup.get('baseCalcul').valueChanges.subscribe(data => {
      console.log('DATA0', data)
      
      if(data == 'DESTINATION'){
        this.transportFormsArray.controls.forEach(element => {
          element.get('trancheMin').disable();
          element.get('trancheMax').disable();
          element.get('prixKm').disable();
          element.get('prixKmSupp').disable();
          element.get('prixMin').disable();
          element.get('prixMax').disable();
        });
      }else{
        this.transportFormsArray.controls.forEach(element => {
          element.get('trancheMin').enable();
          element.get('trancheMax').enable();
          element.get('prixKm').enable();
          element.get('prixKmSupp').enable();
          element.get('prixMin').enable();
          element.get('prixMax').enable();
        });
      }
    })
    
    console.log('DAAAATA', this.data)
    if(this.data.form){
      console.log('TEST', this.data.form)
      this.conditionFormGroup = this.data.form


      console.log('ciities  ' , this.cities)

      console.log('form group ' ,  this.conditionFormGroup.value )
      let origin = this.cities.find((c) => c.id == this.conditionFormGroup.get('origin').value)
      let dest = this.cities.find((c) => c.id == this.conditionFormGroup.get('destination').value)


      console.log('origin ' , origin)
      console.log('dest ' , dest)

      setTimeout(() => {
        this.searchOriginComponent.selectObject(origin)
        this.searchComponentDest.selectObject(dest)
      });
      this.conditionFormGroup.get('avecRetour').valueChanges.subscribe(type => {
        console.log('HAS RETOUR', type, this.hasRetour)
        this.hasRetour = type
      })
      this.data.form.get('baseCalcul').valueChanges.subscribe(data => {
        console.log('DATA0', data)
        
        if(data == 'DESTINATION'){
          this.transportFormsArray.controls.forEach(element => {
            element.get('trancheMin').disable();
            element.get('trancheMax').disable();
            element.get('prixKm').disable();
            element.get('prixKmSupp').disable();
            element.get('prixMin').disable();
            element.get('prixMax').disable();
          });
        }else{
          this.transportFormsArray.controls.forEach(element => {
            element.get('trancheMin').enable();
            element.get('trancheMax').enable();
            element.get('prixKm').enable();
            element.get('prixKmSupp').enable();
            element.get('prixMin').enable();
            element.get('prixMax').enable();
          });
        }
      })
      console.log('CONDITION', this.conditionFormGroup.get('baseCalcul').value)
      this.conditionFormGroup.get('baseCalcul').setValue(this.data.form.get('baseCalcul').value)
      this.conditionFormGroup.get('avecRetour').setValue(this.data.form.get('avecRetour').value)
      this.conditionFormGroup.get('avecRetour').updateValueAndValidity();

    }else{

      const newForm = this.formBuilder.group({
        // Define your form controls here
        offer_id: [''],
        truck_type_id: [this.data.camion.type],
        tonnage_id: [this.data.camion.tonnage],
        origin: [this.conditionFormGroup.get('origin').value],
        destination: [this.conditionFormGroup.get('destination').value],
        trancheMin: [''],
        trancheMax: [''],
        prixFixe: [''],
        prixKm: [''],
        prixKmSupp: [''],
        prixMin: [''],
        prix_min: [this.data.camion.prix_min],
        prixMax: [''],
        baseCalcul: [''],
        avecRetour: [this.conditionFormGroup.get('avecRetour').value],
        typeRetour: [this.conditionFormGroup.get('typeRetour').value],
        valeurRetour: [this.conditionFormGroup.get('valeurRetour').value],
        service: [false],
        // ... add more form controls as needed
      });
  
  
      this.transportFormsArray.push(newForm)
      
    }


    this.conditionFormGroup.get('baseCalcul').valueChanges.subscribe(data => {


      console.log('data in value change ' , data)
      if (data === 'KM') {
        this.conditionFormGroup.get('transportFormsArray').setValidators(this.transportArrayValidator());
      } else {
        this.conditionFormGroup.get('transportFormsArray').clearValidators();
      }
      this.conditionFormGroup.get('transportFormsArray').updateValueAndValidity();
    });


    this.conditionFormGroup.get('avecRetour').valueChanges.subscribe(type => {
      this.hasRetour = type;
      if (type) {
        this.conditionFormGroup.get('typeRetour').setValidators(Validators.required);
        this.conditionFormGroup.get('valeurRetour').setValidators(Validators.required);
      } else {
        this.conditionFormGroup.get('typeRetour').clearValidators();
        this.conditionFormGroup.get('valeurRetour').clearValidators();
      }
      this.conditionFormGroup.get('typeRetour').updateValueAndValidity();
      this.conditionFormGroup.get('valeurRetour').updateValueAndValidity();
    });
    this.conditionFormGroup.get('avecRetour').updateValueAndValidity();



  }


  transportArrayValidator() {
    return (control: FormArray) => {
      let valid = false;
      control.controls.forEach(formGroup => {
        const prixKm = formGroup.get('prixKm').value;
        const prixFixe = formGroup.get('prixFixe').value;
        if (prixKm !== null || prixFixe !== null) {
          valid = true;
        }
        
      });


      return valid ? null : { kmPriceRequired: true };
    };
  }
  addCondition(index){
    const newForm = this.formBuilder.group({
      // Define your form controls here
      offer_id: [''],
      truck_type_id: [this.data.camion.type],
      tonnage_id: [this.data.camion.tonnage],
      origin: [this.conditionFormGroup.get('origin').value],
      destination: [this.conditionFormGroup.get('destination').value],
      trancheMin: [''],
      trancheMax: [''],
      prixFixe: [''],
      prixKm: [''],
      prixKmSupp: [''],
      prixMin: [''],
      prix_min: [this.data.camion.prix_min],
      prixMax: [''],
      baseCalcul: [''],
      avecRetour: [this.conditionFormGroup.get('avecRetour').value],
      typeRetour: [this.conditionFormGroup.get('typeRetour').value],
      valeurRetour: [this.conditionFormGroup.get('valeurRetour').value],
      service: [false],
      // ... add more form controls as needed
    });

  this.transportFormsArray.push(newForm)
  }
  
  removeCondition(i){
    this.transportFormsArray.removeAt(i);
  }


  saveConditions(){


    console.log('condition form group ', this.conditionFormGroup.valid , this.conditionFormGroup)
    if (this.conditionFormGroup.valid) {
      console.log('EVENT', this.conditionFormGroup )

      this.transportFormsArray.controls.forEach(e => {
        e.get('origin').setValue(this.conditionFormGroup.get('origin').value);
        e.get('destination').setValue(this.conditionFormGroup.get('destination').value);
        e.get('baseCalcul').setValue(this.conditionFormGroup.get('baseCalcul').value);
        e.get('avecRetour').setValue(this.conditionFormGroup.get('avecRetour').value);
        e.get('typeRetour').setValue(this.conditionFormGroup.get('typeRetour').value);
        e.get('valeurRetour').setValue(this.conditionFormGroup.get('valeurRetour').value);
      })
  
      let object = new Object;
      this.dialogRef.close({
        type: this.data.camion.type,
        tonnage: this.data.camion.tonnage,
        form: this.conditionFormGroup 
      });
    }   
  }


  get transportFormsArray(){
   return this.conditionFormGroup.get('transportFormsArray') as FormArray;
  }


  onOriginChange(orginCity){
    if (orginCity) {
      this.conditionFormGroup.controls.origin.setValue(orginCity?.id);
    }
  }

  onDestChange(destCity){
    if (destCity) {
      this.conditionFormGroup.controls.destination.setValue(destCity?.id);
    }
  }
}
