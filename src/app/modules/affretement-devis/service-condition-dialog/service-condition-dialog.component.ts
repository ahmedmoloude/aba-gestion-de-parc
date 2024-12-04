import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RubricUnite } from 'app/core/models/rubricUnite.model';
import { AffretementServiceService } from 'app/core/services/affretement-service.service';

@Component({
  selector: 'app-service-condition-dialog',
  templateUrl: './service-condition-dialog.component.html',
  styleUrls: ['./service-condition-dialog.component.css']
})
export class ServiceConditionDialogComponent implements OnInit {
  servicesFormsArray: FormGroup[] = [];
  productCategories = [];
  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ServiceConditionDialogComponent>,
              private affretementService: AffretementServiceService
  ) { }



  rubricUnites : RubricUnite;
  ngOnInit(): void {
    this.affretementService.getAffretementProductCategories().subscribe((data: any) => {
      this.productCategories = data;
    })

    this.rubricUnites = this.data.rubricUnites
    if(this.data.forms){
      console.log(this.data.forms, 'loool')
      this.servicesFormsArray = this.data.forms
    }else{

      const newForm = this.formBuilder.group({
  
        truck_type_id: [null],
        tonnage_id: [null],
        rubric: [this.data.rubric.id],
        trancheMin: ['' ,  Validators.required],
        category_product_id: [''],
        trancheMax: ['' , Validators.required],
        typeValeur: ['PRICE' ,  Validators.required],
        valeur: ['' ,  Validators.required],
        prixU: [''],
        prixMin: [''],
        prixMax: [''],
        service: [true],
      });
      this.servicesFormsArray.push(newForm)
    }
  }

  addServiceCondition(index){
    const newForm = this.formBuilder.group({
      // Define your form controls here
      truck_type_id: [null],
      tonnage_id: [null],
      rubric: [this.data.rubric.id],
      trancheMin: ['' ,  Validators.required],
      trancheMax: ['' ,  Validators.required],
      typeValeur: ['PRICE' ,  Validators.required],
      valeur: ['' ,  Validators.required],
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
      type: this.data.rubric.title,
      forms: this.servicesFormsArray 
    });
  }
  }

}
