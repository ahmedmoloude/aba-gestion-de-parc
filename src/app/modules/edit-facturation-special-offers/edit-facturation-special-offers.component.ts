import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FactureService } from 'app/core/services/facturation/facture.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-edit-facturation-special-offers',
  templateUrl: './edit-facturation-special-offers.component.html',
  styleUrls: ['./edit-facturation-special-offers.component.css']
})
export class EditFacturationSpecialOffersComponent implements OnInit {


  offerUuid = ''
  loading = false;
  submitloader = false;
  taxationFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private factureService: FactureService,
    private route: ActivatedRoute,
    private router : Router,
  ) { }

  ngOnInit(): void {
    this.taxationFormGroup = this.fb.group({
      details: this.fb.array([])
    });

    this.loadDetailsFromAPI();
  }

  loadDetailsFromAPI() {

    this.loading = true;


    this.route.params.subscribe(params => {
      let offerUuid = params['uuid'];
    
      this.offerUuid = offerUuid;
    
      this.factureService.getSpecialeOffersPreFactureDetails(offerUuid).subscribe(
        (response: any) => {
          this.loading = false;
          // Clear existing form array
          this.clearDetailsFormArray();
          // Populate form array with API response data
          response?.response.details.forEach((detail: any) => {
            this.addDetailFormGroup(detail);
          });
        },
        (error: any) => {
          this.loading = false;
          // Handle error
        }
      );
    })
   
  }

  clearDetailsFormArray() {
    const detailsArray = this.taxationFormGroup.get('details') as FormArray;
    while (detailsArray.length !== 0) {
      detailsArray.removeAt(0);
    }
  }

  addDetailFormGroup(detail: any) {
    const detailsArray = this.taxationFormGroup.get('details') as FormArray;
    detailsArray.push(this.createDetailFormGroup(detail));
  }



  createDetailFormGroup(detail: any): FormGroup {

    const group = this.fb.group({

      detail_id : [detail?.detail_id],
      matricule: [{ value: detail?.offer_detail.truck?.matricule, disabled: true }],
      truckType: [{ value:  detail?.offer_detail.truck?.truck_type?.name , disabled: true }],
      truckTonnage: [{ value: detail?.offer_detail.truck?.tonnage?.name, disabled: true }],
      KM: [detail.KM, [Validators.required]], 
      KM_GPS: [detail.KM_GPS], 
      montant_sup: [detail?.montant_sup],
      montant_ht: [{ value: detail?.montant_ht, disabled: true }],
      montant_tva: [{ value: detail?.montant_tva, disabled: true }],
      montant_ttc: [{ value: detail?.montant_ttc, disabled: true }],
    });


    console.log('group ' , group)

    return group;
  }

  submit(final_sumbit = false) {




    this.loading = true;

    if (this.taxationFormGroup.valid) {


      this.factureService.calculateSepecialFacture(


        this.offerUuid , final_sumbit , this.taxationFormGroup.get('details').value
      ).subscribe((d) => {



        if(final_sumbit){

          this.router.navigate(['/special-offers-facturation'])
        }
        else{

          this.factureService.getSpecialeOffersPreFactureDetails(this.offerUuid).subscribe(
            (response: any) => {
              this.loading = false;
              // Clear existing form array
              this.clearDetailsFormArray();
              // Populate form array with API response data
              response?.response.details.forEach((detail: any) => {
                this.addDetailFormGroup(detail);
              });
            },
            (error: any) => {
              this.loading = false;
              // Handle error
            }
          );
        }
            
    






      },
    (err) => {

      this.loading = false;
    })
    }

    else{
      this.taxationFormGroup.markAllAsTouched()
    }


    
  }

}
