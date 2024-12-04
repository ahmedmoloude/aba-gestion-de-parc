import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormGroup , FormControl , Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { BoOfferService } from 'app/core/services/admin-bo/bo-offers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AffretementService } from 'app/core/services/affretement.service';
import { SharedAutcompleteComponent } from 'app/shared/components/shared-autcomplete/shared-autcomplete.component';

@Component({
  selector: 'app-edit-sepcial-commercial-offers',
  templateUrl: './edit-sepcial-commercial-offers.component.html',
  styleUrls: ['./edit-sepcial-commercial-offers.component.css']
})
export class EditSepcialCommercialOffersComponent implements OnInit {





  submitloader = false;




  loading = true;
  @ViewChildren(SharedAutcompleteComponent) searchComponents: QueryList<SharedAutcompleteComponent>;


  trucks = []

  offerDetails : any = {}

  offerUuid = null;
  searchStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'};


  offerFormGroup = new FormGroup({
    offerUuid : new FormControl(''),
    details: new FormArray([])
  });

  constructor( private router : Router , private affretmentService : AffretementService , private offerService : BoOfferService ,     private route: ActivatedRoute,
    ) { }




    ngOnInit(): void {
      this.offerFormGroup = new FormGroup({
        offerUuid: new FormControl(''),
        details: new FormArray([])
      });


      // TODO: to be imroved 
  
      this.affretmentService.getListVehicules().subscribe((v: any) => {
        this.trucks = v.response;






        this.route.params.subscribe(params => {
          this.offerUuid = params['uuid'];
          this.offerFormGroup.get('offerUuid').patchValue(this.offerUuid);
    
          this.offerService.getSpecialOfferDetails(this.offerUuid).subscribe(
            (response: any) => {
  
  
              console.log('response ' , response)
              this.offerDetails = response?.response?.details;
    



              console.log('insidpaonible trucks ' , this.trucks.filter(truck =>   truck.disponible?.status === false))
              this.trucks = this.trucks.filter(truck => {
                const isAvailable = truck.disponible?.status === true; // Check for availability
                const isNotInDetails = !this.offerDetails?.some(detail => detail.truck_id === truck.id); // Check exclusion from offer details
          
                return isAvailable && isNotInDetails;
              });
          
              this.loading = false;
              // Check if the details are empty
              if (Object.keys(this.offerDetails).length === 0) {
                // If details are empty, add a new line to the form
                this.addNewLine();
              } else {
                // If details exist, populate the form with the fetched details
                this.populateFormWithDetails();
              }
            },
            error => {
              console.error('Failed to fetch special offer details:', error);
            }
          );
        });
      });
  
     
    }
  
    // Method to populate the form with the fetched details
    populateFormWithDetails() {
      const detailsArray = this.offerFormGroup.get('details') as FormArray;
      this.offerDetails.forEach((detail, index) => {
        const newLine = new FormGroup({
          id : new FormControl(detail.id ),
          pricePerKM: new FormControl(detail.calcul_val, [Validators.required]),
          minPerMonth: new FormControl(detail.min_in_month, [Validators.required]),
          truck: new FormControl(detail.truck_id, [Validators.required]),
          truckType: new FormControl({ value: detail.truck?.truck_type?.name, disabled: true }),
          truckTonnage: new FormControl({ value: detail.truck?.tonnage?.name, disabled: true }),
          maxKM: new FormControl(detail.max_km_in_month),
          pricePerExtraKM: new FormControl(detail.val_sup_km),
          to_delete : new FormControl(false)
        });
    
        
        detailsArray.push(newLine);


        console.log('search comopnents ' , this.searchComponents.toArray())

        setTimeout(() => {
          this.searchComponents.toArray()[index].selectObject(detail.truck);
        } ,  300)
      });
    }
    


  



  addNewLine() {
    // Create a new FormGroup for each line
    const newLine = new FormGroup({
      id : new FormControl(null ),
      pricePerKM: new FormControl('', [Validators.required]),
      minPerMonth: new FormControl('', [Validators.required]),
      truck: new FormControl('', [Validators.required]),
      truckType: new FormControl({ value: '', disabled: true }), // Set disabled to true
      truckTonnage: new FormControl({ value: '', disabled: true }), // Set disabled to true
      maxKM: new FormControl(''),
      pricePerExtraKM: new FormControl(''),
      to_delete : new FormControl(false)
    });
  
    // Flag to track whether validation is currently being triggered
    let isUpdatingValidation = false;
  
    // Subscribe to value changes in pricePerExtraKM and maxKM
    newLine.get('pricePerExtraKM').valueChanges.subscribe(() => {
      if (!isUpdatingValidation) {
        isUpdatingValidation = true;
        newLine.get('maxKM').updateValueAndValidity();
        isUpdatingValidation = false;
      }
    });
  
    newLine.get('maxKM').valueChanges.subscribe(() => {
      if (!isUpdatingValidation) {
        isUpdatingValidation = true;
        newLine.get('pricePerExtraKM').updateValueAndValidity();
        isUpdatingValidation = false;
      }
    });
  
    // Add custom validators to pricePerExtraKM and maxKM
    newLine.get('pricePerExtraKM').setValidators(this.pricePerExtraKMValidator());
    newLine.get('maxKM').setValidators(this.maxKMValidator());
  
    (this.offerFormGroup.get('details') as FormArray).push(newLine);
  }
  
  // Custom validator for pricePerExtraKM
  pricePerExtraKMValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const pricePerExtraKM = control.value;
      const maxKM = control.parent?.get('maxKM').value;
      if (!pricePerExtraKM && maxKM) {
        return { required: true };
      }
      return null;
    };
  }
  
  // Custom validator for maxKM
  maxKMValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const maxKM = control.value;
      const pricePerExtraKM = control.parent?.get('pricePerExtraKM').value;
      if (!maxKM && pricePerExtraKM) {
        return { required: true };
      }
      return null;
    };
  }


  submit() {
    // Check if the offer form group is valid
    if (this.offerFormGroup.valid) {



       this.submitloader = true;
  

        const details = this.offerFormGroup.value.details.map(detail => {
          return {
            id : detail?.id,
            calcul_val: detail.pricePerKM, 
            min_in_month: detail.minPerMonth,
            max_km_in_month: detail.maxKM, // 
            val_sup_km: detail.pricePerExtraKM, 
            truck_id: detail.truck ,
            to_delete : detail.to_delete
          };
        });
      
        const offerUuid = this.offerFormGroup.get('offerUuid').value;
        
        this.offerService.createSpecialOfferDetails(offerUuid, details).subscribe(
          response => {


            this.submitloader = false;
            console.log('Special offer details created successfully:', response);
            this.router.navigate(['/special-offers'])
          },
          error => {

            this.submitloader = false;

            console.error('Failed to create special offer details:', error);
          }
        );
    
    } else {
      // If the form is not valid, mark all controls as touched to display validation errors
      this.offerFormGroup.markAllAsTouched();
    }
  }
  



  selectTruck(truck: any, index: number) {




    console.log('truck ,,, ' , truck)

      const detailsArray = this.offerFormGroup.get('details') as FormArray;
      const truckGroup = detailsArray.at(index);
    
      truckGroup.patchValue({
        truck: truck?.id,
        truckType: truck?.truck_type?.name,
        truckTonnage: truck?.tonnage?.name
      });

 
  }



  deleteRow(i){
    let items = this.offerFormGroup.controls['details'] as FormArray




    let detailItem = items.at(i)
    if (detailItem.get('id').value) {

      console.log('havbe an id ' , detailItem)
      items.at(i).get('to_delete').setValue(true)
      items.at(i).updateValueAndValidity()
    }
    else{
      items.removeAt(i)
    }
  }


  get availableTrucks(): any[] {
    const selectedTruckIds = this.offerFormGroup.value.details
      .map(detail => detail.truck);

    return this.trucks.filter(truck => !selectedTruckIds.includes(truck.id));
  }



}
