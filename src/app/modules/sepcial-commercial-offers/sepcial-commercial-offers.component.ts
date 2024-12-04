import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BoOfferService } from 'app/core/services/admin-bo/bo-offers.service';
import { AffretementServiceService } from 'app/core/services/affretement-service.service';
import { PermissionService } from 'app/core/services/permission.service';
import { ToastService } from 'app/services';
import { SearchService } from 'app/services/search.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-sepcial-commercial-offers',
  templateUrl: './sepcial-commercial-offers.component.html',
  styleUrls: ['./sepcial-commercial-offers.component.css']
})
export class SepcialCommercialOffersComponent implements OnInit {


  options = [];
 
  isSubmitLoading = false;


  isCreationModalVisible = false;


  constructor( private router : Router ,  private toastService : ToastService , private offerService :  BoOfferService, private affretementService : AffretementServiceService  , private serachServcie : SearchService, public permissionService: PermissionService) { }





  handleCancel(): void {
    this.isCreationModalVisible = false;
  }



  newOffer = new FormGroup({
    client : new FormControl('' ,[ Validators.required ]),
    customer_id : new FormControl('' ,[ Validators.required ]),
    type_offer_id : new FormControl('' ,[ Validators.required ]),
    start_date: new FormControl('', Validators.required),
    end_date_check_box: new FormControl(false),
    end_date: new FormControl(''),
  })

  get f(): { [key: string]: AbstractControl } {
    return this.newOffer.controls;
  }

  loading = false;
  offers : any = []
  offerTypes : any = [];

  headerColumuns = [
    'Client',
    'Type d\'offre',
    'Date d\'activation',
    'Date d\’expiration',
    'Date de création',
  ];

  ngOnInit(): void {


    this.loading = true;

    // Combine both observables using forkJoin
    forkJoin([
      this.affretementService.getTypeAffretement(),
      this.offerService.getSpecialOffers()
    ]).subscribe(([affretementData, specialOffersData]) => {
      console.log('TPES', affretementData);
      this.offerTypes = affretementData;
      this.offers = specialOffersData;
      // Set loading to false when both requests are completed
      this.loading = false;
    });


    
  
  }


  openCreationDialog(){

    this.isCreationModalVisible = true;



  }


  // get tabName(){

  //   return 'de type ' +  this.offerTypes.find((o) => o.id == this.tabID)?.title
  // }


  to_fill(val: any, name: string) {
    this.newOffer.patchValue({
      customer_id: val,
      client: name
    });
  }


  modelChangeFn(query: string) {
    if (query !== '') {
      this.serachServcie.getClient(query).subscribe(res => {
        this.options = res.response;
      })
    } else {
      this.options = [];
    }
  }



  submitDialog(): void {


    if (this.newOffer.valid) {
     


      this.offerService.createSpecialOffer(this.newOffer.value?.customer_id ,    this.newOffer.value?.type_offer_id ,     
        

        this.newOffer.value?.start_date , this.newOffer.value?.end_date

        ).subscribe(
        
        
        (v) => {
          this.toastService.success('Offre créé avec succès')

          


          this.loading = true

          this.offerService.getSpecialOffers().subscribe((v) => {

            

            this.loading = false
            this.offers = v
          })
        },
      

        (err) => {


          let e = err.error;



          if (e?.code == '_400_USER_HAS_AN_OFFER') {
            this.toastService.error('Le client a déjà une offre dans cette catégorie, pour ajouter une nouvel élément, modifiez-le s\'il vous plaît')
            
          }
          else{
            this.toastService.error('Une erreur est survenue réessayer plus tard')
          }
 
          
        }
      )

      .add(()=> {

       this.isCreationModalVisible = false;

      })
      


    }
    else{


      this.newOffer.markAllAsTouched()
    }
}


    edit(uuid){

      this.router.navigate(['/edit-special-offers' ,  uuid])

    }
}
