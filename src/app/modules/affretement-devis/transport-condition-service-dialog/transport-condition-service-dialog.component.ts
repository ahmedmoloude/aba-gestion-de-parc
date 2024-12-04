import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-transport-condition-service-dialog',
  templateUrl: './transport-condition-service-dialog.component.html',
  styleUrls: ['./transport-condition-service-dialog.component.css']
})
export class TransportConditionServiceDialogComponent implements OnInit {
  servicesFormsArray: FormGroup[] = [];
  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<TransportConditionServiceDialogComponent>
  ) { }

  ngOnInit(): void {
    if(this.data.forms){
      console.log(this.data.forms, 'loool')
      this.servicesFormsArray = this.data.forms
    }else{

      const newForm = this.formBuilder.group({
  
        truck_type_id: [this.data.camion.type],
        tonnage_id: [this.data.camion.tonnage],
        rubric: [this.data.rubric.id],
        trancheMin: ['' , Validators.required],
        trancheMax: ['' , Validators.required],
        typeValeur: ['PRICE' , Validators.required],
        valeur: [''  , Validators.required],
        prixU: [''],
        prixMin: [''],
        prixMax: [''],
        service: [true],
        // ... add more form controls as needed
      });
      this.servicesFormsArray.push(newForm)
    }
  }

  addServiceCondition(index){
    const newForm = this.formBuilder.group({
      // Define your form controls here
      truck_type_id: [this.data.camion.type],
      tonnage_id: [this.data.camion.tonnage],
      rubric: [this.data.rubric.id],
      trancheMin: ['' , Validators.required],
      trancheMax: ['' , Validators.required],
      typeValeur: ['PRICE' , Validators.required],
      valeur: [''  , Validators.required],
      prixU: [''],
      prixMin: [''],
      prixMax: [''],
      service: [true],
      // ... add more form controls as needed
    });

  this.servicesFormsArray.push(newForm)
  }
  
  removeServiceCondition(i){
    this.servicesFormsArray.splice(i, 1);
  }

  saveConditions(){

    this.servicesFormsArray.forEach(formGroup => {
      Object.keys(formGroup.controls).forEach(controlName => {
        formGroup.get(controlName).markAsTouched();
      });
    });


    
    
    const allFormsValid = this.servicesFormsArray.every(formGroup => formGroup.valid);
    
    console.log('all form are valid' , allFormsValid)
    if (allFormsValid) {
      let object = new Object;
      this.dialogRef.close({
        rubric_id: this.data.rubric.id,
        type: this.data.camion.type,
        tonnage: this.data.camion.tonnage,
        forms: this.servicesFormsArray 
      });
    }
  
  }

}

