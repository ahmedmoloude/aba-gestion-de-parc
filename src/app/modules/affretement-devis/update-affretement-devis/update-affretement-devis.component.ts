import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogTransportComponent } from '../dialog-transport/dialog-transport.component';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AffretementServiceService } from 'app/core/services/affretement-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceConditionDialogComponent } from '../service-condition-dialog/service-condition-dialog.component';
import { TransportConditionServiceComponent } from '../transport-condition-service/transport-condition-service.component';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { selectAllCity } from 'app/core/store/resources/resources.selectors';
import { SharedAutcompleteComponent } from 'app/shared/components/shared-autcomplete/shared-autcomplete.component';
import { TransportConditionServiceDialogComponent } from '../transport-condition-service-dialog/transport-condition-service-dialog.component';
import { ToastService } from 'app/services';
import { RubricUnite, getUnitsByrubric } from 'app/core/models/rubricUnite.model';
import { BoQuoteService } from 'app/core/services/admin-bo/bo-quotes.service';

@Component({
  selector: 'app-update-affretement-devis',
  templateUrl: './update-affretement-devis.component.html',
  styleUrls: ['./update-affretement-devis.component.css']
})
export class UpdateAffretementDevisComponent implements OnInit {

  @ViewChildren(SharedAutcompleteComponent) searchComponents: QueryList<SharedAutcompleteComponent>;
  offer: any;
  filter = {origin: null, destination: null, type: null, tonnage:null}
  tempResult = [];
  cities = [];
  tabs = [];
  selected = new FormControl(0);
  offer_id = null;
  hasMinimumPrice = false;

  rubrics: any[];
  rubricsCamion: any[];

  transportFormsArray: FormArray[] = [];

  servicesFormsArray: FormGroup[] = [];

  serviceConditions = [];
  serviceCamionConditions = [];
  transportConditions = [];

  conditionByCities = [];
  conditionByRubric = [];

  isServicesLoaing = true;
  isServicesCamionLoaing = true;

  isLoading = false
  isPageLoading = false
  


  isAnOffer = true;

  async generateTabs(tabs) : Promise<void>{
    return new Promise((resolve, reject) => {
        this.tabs = tabs;
        this.selected.setValue(1);
      resolve();
    })
  }

  getOffer(){
    this.isPageLoading = true
    this.affretementService.getOffer(this.offer_id , this.isAnOffer).subscribe((data:any) => {
      this.offer = data;
      this.generateTabs(this.offer.trucks['tabs']).then(() => {
        setTimeout(() => {
          for(let rubric in this.offer.services){
            const servicesArray = this.offer.services[rubric];
            let servicesFormsArray = []
            let rubricTitle = '';
            servicesArray.forEach(condition => {
              rubricTitle = condition.rubric.title;
              const newForm = this.formBuilder.group({
                truck_type_id: [null],
                tonnage_id: [null],
                rubric: [condition.rubric_id],
                trancheMin: [condition.tranche_min],
                category_product_id: [condition.category_product_id],
                trancheMax: [condition.tranche_max],
                typeValeur: [condition.type_val],
                valeur: [condition.tranche_prix],
                prixU: [condition.prix_supp],
                prixMin: [condition.min_prix],
                prixMax: [condition.max_prix],
                service: [true],
                // ... add more form controls as needed
              });
              servicesFormsArray.push(newForm)
              
            });
            this.serviceConditions.push({
              type: rubricTitle,
              forms: servicesFormsArray
            })
            console.log('RRRRRRRRr', rubric)
          }
    
          
          this.tabs.forEach(tab => {
            
            for(let element in this.offer.trucks[tab.tonnage][tab.type]){
              let conditionFormGroup = new FormGroup(
                {
                  origin : new FormControl(''),
                  destination : new FormControl(''),
                  baseCalcul : new FormControl(''),
                  avecRetour : new FormControl(''),
                  typeRetour : new FormControl(''),
                  valeurRetour : new FormControl(''),
                  transportFormsArray  : new FormArray([])
                }
              )
              conditionFormGroup.get('origin').setValue(this.offer.trucks[tab.tonnage][tab.type][element].details[0].ville_origin_id)
              conditionFormGroup.get('destination').setValue(this.offer.trucks[tab.tonnage][tab.type][element].details[0].ville_destination_id)
              conditionFormGroup.get('baseCalcul').setValue(this.offer.trucks[tab.tonnage][tab.type][element].details[0].base_calcul);
              conditionFormGroup.get('avecRetour').setValue(this.offer.trucks[tab.tonnage][tab.type][element].details[0].has_retour);
              conditionFormGroup.get('typeRetour').setValue(this.offer.trucks[tab.tonnage][tab.type][element].details[0].type_retour);
              conditionFormGroup.get('valeurRetour').setValue(this.offer.trucks[tab.tonnage][tab.type][element].details[0].valeur_retour);
              this.offer.trucks[tab.tonnage][tab.type][element].details.forEach(condition => {
              

              const newForm = this.formBuilder.group({
                // Define your form controls here
                offer_id: [''],
                truck_type_id: [tab.type],
                tonnage_id: [tab.tonnage],
                origin: [conditionFormGroup.get('origin').value],
                destination: [conditionFormGroup.get('destination').value],
                trancheMin: [condition.tranche_min],
                trancheMax: [condition.tranche_max],
                prixFixe: [condition.prix_fixe],
                prixKm: [condition.tranche_prix],
                prixKmSupp: [condition.prix_supp],
                prixMin: [condition.min_prix],
                prix_min: [condition.min_prix],
                prixMax: [condition.max_prix],
                baseCalcul: [conditionFormGroup.get('baseCalcul').value],
                avecRetour: [conditionFormGroup.get('avecRetour').value],
                typeRetour: [conditionFormGroup.get('typeRetour').value],
                valeurRetour: [conditionFormGroup.get('valeurRetour').value],
                service: [false],
                // ... add more form controls as needed
              });
          
              let forms = conditionFormGroup.get('transportFormsArray') as FormArray
              forms.push(newForm)



              if(this.transportConditions.find(e => e.type == tab.type && e.tonnage == tab.tonnage && e.origin == condition.ville_origin_id && e.destination == condition.ville_destination_id)){
                this.transportConditions.find(e => e.type == tab.type && e.tonnage == tab.tonnage && e.origin == condition.ville_origin_id && e.destination == condition.ville_destination_id).form = conditionFormGroup
            
              }else{
                this.transportConditions.push({type: tab.type, tonnage: tab.tonnage, origin: condition.ville_origin_id, destination: condition.ville_destination_id, form: conditionFormGroup})
                
              }

              console.log("elemet", element)
              if(element != "services"){

                
                              if(this.conditionByCities.find(c => c.type === tab.type && c.tonnage === tab.tonnage && c.origin === condition.ville_origin_id && c.destination === condition.ville_destination_id)){
                                this.conditionByCities.filter(c => c.type === tab.type && c.tonnage === tab.tonnage && c.origin === condition.ville_origin_id && c.destination === condition.ville_destination_id)[0].count = this.offer.trucks[tab.tonnage][tab.type][element]['details'].filter(e => e.ville_origin_id == condition.ville_origin_id && e.ville_destination_id == condition.ville_destination_id).length
                              }else{
                                console.log('CIIIIIIIIIIIIIIIITY', condition)
                                console.log('NOTEXIST.................')
                                this.conditionByCities.push({
                                  origin: condition.ville_origin_id,
                                  destination: condition.ville_destination_id,
                                  type: tab.type,
                                  tonnage: tab.tonnage,
                                  origin_name: this.cities.find(c => c.id == condition.ville_origin_id).name,
                                  destination_name: this.cities.find(c => c.id == condition.ville_destination_id).name,
                                  // count: data.form.value.transportFormsArray.length,
                                  count: this.offer.trucks[tab.tonnage][tab.type][element]['details'].filter(e => e.ville_origin_id == condition.ville_origin_id && e.ville_destination_id == condition.ville_destination_id).length,
                                })
                              }
              }else{
                const newForm = this.formBuilder.group({
  
                  truck_type_id: [tab.type],
                  tonnage_id: [tab.tonnage],
                  rubric: [condition.rubric.id],
                  trancheMin: [condition.tranche_min],
                  trancheMax: [condition.tranche_max],
                  typeValeur: [condition.type_val],
                  valeur: [condition.tranche_prix],
                  prixU: [condition.prix_supp],
                  prixMin: [condition.min_prix],
                  prixMax: [condition.max_prix],
                  service: [true],
                  // ... add more form controls as needed
                });
                let foundedService = this.serviceCamionConditions.find(e => e.type == tab.type && e.tonnage == tab.tonnage && e.rubric_id == condition.rubric_id);
                  console.log('AWDIII', foundedService) 
                if(foundedService){
                    console.log('YES')
                    foundedService.forms.push(newForm);
                  }else{
                    let frms = [];
                    frms.push(newForm)
                    this.serviceCamionConditions.push({
                      type: tab.type,
                      tonnage: tab.tonnage,
                      rubric_id: condition.rubric_id,
                      forms:frms
                    })
                  }
              }
              });

            };
          })
    
          this.isPageLoading = false;
          console.log('FFFFFFFFFFFFf', this.serviceCamionConditions)
          console.log('LLLLLLLLLLLLLl', this.conditionByCities, this.tabs)
        }, 100)
      })
      // this.tabs = this.offer.trucks['tabs'];
     


    })
  }

  addTab(data) {
    this.tabs.push(data);
  }

  removeTab(index: number , camion) {
    this.tabs.splice(index, 1);
    this.transportFormsArray.splice(index, 1);

    let data = {
      offer_id : this.offer_id,
      truck_type_id : camion.type, 
      tonnage_id : camion.tonnage,
      delete_block : true
    }

    this.affretementService.deleteTransportConditions(data).subscribe((res) => {

      this.isLoading = false;
      this._toast.success('Opération effectuée avec succés')
    })
  }

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private affretementService: AffretementServiceService,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private _toast: ToastService,
    private _router: Router,
    private quoteService : BoQuoteService

    ) { }
  

  ngOnInit(): void {


    this.isAnOffer =  this._router.url.split('/')[1] == 'affretement-devis' ? false : true;

    this.store.select(selectAllCity).subscribe((res) => {
      this.cities = JSON.parse(JSON.stringify(res));
    });

    this.offer_id = this.activatedRoute.snapshot.params['uuid'].split('_')[0];
    this.hasMinimumPrice = this.activatedRoute.snapshot.params['uuid'].split('_')[1] === 'true';

    this.getOffer();
    console.log('OFFER', this.offer)

    this.affretementService.getServices().subscribe((data: any) => {
      this.rubrics = data
      this.isServicesLoaing = false;
    })
    this.affretementService.getServices().subscribe((data: any) => {
      this.rubrics = data
      this.isServicesLoaing = false;
    })
    this.affretementService.getServicesCamion().subscribe((data: any) => {
      this.rubricsCamion = data
      this.isServicesCamionLoaing = false;
    })


    const newForm = this.formBuilder.group({
      // Define your form controls here
      offer_id: [this.offer_id],
      truck_type_id: [null],
      tonnage_id: [null],
      rubric: [''],
      trancheMin: [''],
      trancheMax: [''],
      typeValeur: [''],
      valeur: [''],
      prixU: [''],
      prixMin: [''],
      prixMax: [''],
      service: [true],
      // ... add more form controls as needed
    });
    this.servicesFormsArray.push(newForm)
  }

  openTransportDialog(){
    const dialog = this.dialog.open(DialogTransportComponent, {
      data: {
        hasMinimumPrice: this.hasMinimumPrice
      },
      disableClose: true,
      width: '400px',
    })

  dialog.afterClosed().subscribe(data => {
    if(data == '') return
    const newForm = this.formBuilder.group({
      // Define your form controls here
      offer_id: [this.offer_id],
      truck_type_id: [data.type],
      prix_min: [data.prix_min],
      tonnage_id: [data.tonnage],
      origin: [''],
      destination: [''],
      trancheMin: [''],
      trancheMax: [''],
      prixFixe: [''],
      prixKm: [''],
      prixKmSupp: [''],
      prixMin: [''],
      prixMax: [''],
      baseCalcul: [''],
      avecRetour: [''],
      typeRetour: [''],
      valeurRetour: [''],
      service: [false],
      // ... add more form controls as needed
    });
    let formsArray = new FormArray([])
    formsArray.push(newForm)
    this.transportFormsArray.push(formsArray);
    this.addTab(data);

  })
  }
  openServiceDialog(rubric){
    

    let rubricUnites : RubricUnite = getUnitsByrubric(rubric?.title);

    const dialog = this.dialog.open(ServiceConditionDialogComponent, {
      data: {
        rubricUnites,
        rubric,
        forms: this.serviceConditions.find(e => e.type == rubric.title) ? this.serviceConditions.find(e => e.type == rubric.title).forms : null
      },
      disableClose: true,
      width: '70vw',
    })

    dialog.afterClosed().subscribe(data => {
      let foundedService = this.serviceConditions.find(e => e.type == data.type);
      if(foundedService){
        foundedService.forms = data.forms
      }else{
        this.serviceConditions.push(data)
      }

      if (data) {
        this.submitServices()
      }
    })


  }
  openTransportConditionDialog(camion, city = null){
    console.log('hhhh', city, this.transportConditions)
    const dialog = this.dialog.open(TransportConditionServiceComponent, {
      data: {camion, form: (city) ? this.transportConditions.find(e =>  e.origin == city.origin && e.destination == city.destination && camion.type == e.type && camion.tonnage == e.tonnage).form : null},
      disableClose: true,
      width: '80vw',
    })

    dialog.afterClosed().subscribe(data => {
      if(this.transportConditions.find(e => e.type == data.type && e.tonnage == data.tonnage && e.origin == data.form.value.origin && e.destination == data.form.value.destination)){
        this.transportConditions.find(e => e.type == data.type && e.tonnage == data.tonnage && e.origin == data.form.value.origin && e.destination == data.form.value.destination).form = data.form
    
      }else{
        this.transportConditions.push({type: data.type, tonnage: data.tonnage, origin: data.form.value.origin, destination: data.form.value.destination, form: data.form})
        
      }
      if(this.conditionByCities.find(c => c.type == data.type && c.tonnage == data.tonnage &&c.origin == data.form.value.origin && c.destination == data.form.value.destination)){
        this.conditionByCities.filter(c => c.type == data.type && c.tonnage == data.tonnage && c.origin == data.form.value.origin && c.destination == data.form.value.destination)[0].count = data.form.value.transportFormsArray.length
      }else{
        this.conditionByCities.push({
          origin: data.form.value.origin,
          destination: data.form.value.destination,
          type: data.type,
          tonnage: data.tonnage,
          origin_name: this.cities.find(c => c.id == data.form.value.origin).name,
          destination_name: this.cities.find(c => c.id == data.form.value.destination).name,
          count: data.form.value.transportFormsArray.length,
        })
      }


      if (data) {
        this.submit(camion); 
      }
    })
  }
  openServiceTransportConditionDialog(camion, rubric = null){
    const dialog = this.dialog.open(TransportConditionServiceDialogComponent, {
      data: {rubric,camion, forms: this.serviceCamionConditions.find(e => e.type == camion.type && e.tonnage == camion.tonnage && e.rubric_id == rubric.id) ? this.serviceCamionConditions.find(e => e.type == camion.type && e.tonnage == camion.tonnage && e.rubric_id == rubric.id).forms : null},
      disableClose: true,
      width: '90vw',
      maxWidth : '100%'
    })

  dialog.afterClosed().subscribe(data => {
    let foundedService = this.serviceCamionConditions.find(e => e.type == data.type && e.tonnage == data.tonnage && e.rubric_id == data.rubric_id);
    if(foundedService){
      console.log('YES')
      foundedService.forms = data.forms
    }else{
      this.serviceCamionConditions.push(data)
    }
    console.log('TEST', this.serviceCamionConditions)


    if (data) {
      this.submit(camion);     
    }

  })
  }

  addCondition(index){
    const newForm = this.formBuilder.group({
      // Define your form controls here
      offer_id: [this.offer_id],
      truck_type_id: [this.tabs[index].type],
      tonnage_id: [this.tabs[index].tonnage],
      prix_min: [this.tabs[index].prix_min],
      origin: [''],
      destination: [''],
      trancheMin: [''],
      trancheMax: [''],
      prixFixe: [''],
      prixKm: [''],
      prixKmSupp: [''],
      prixMin: [''],
      prixMax: [''],
      baseCalcul: [''],
      avecRetour: [''],
      typeRetour: [''],
      valeurRetour: [''],
      service: [false],
      // ... add more form controls as needed
    });
  this.transportFormsArray[index].push(newForm)
  }

  removeCondition(index, i){
    this.transportFormsArray[index].removeAt(i);
    if(this.transportFormsArray[index].controls.length <= 0){
      this.transportFormsArray.splice(index, 1) 
      this.tabs.splice(index, 1) 
    }
  }

  addServiceCondition(index){
    const newForm = this.formBuilder.group({
      // Define your form controls here
      offer_id: [this.offer_id],
      truck_type_id: [null],
      tonnage_id: [null],
      rubric: [''],
      trancheMin: [''],
      trancheMax: [''],
      typeValeur: [''],
      valeur: [''],
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

  submitServices(){
    this.isLoading = true;
    let offer = {
      offer_id: this.offer_id,
      data:[]
    };
    console.log('CONDITIONS', this.serviceConditions)
    this.serviceConditions.forEach(e => {
      e?.forms?.forEach(f => {
        offer['data'].push(f.value)
      });
    })


    if (this.isAnOffer) {
      this.affretementService.addAffretementDevis(offer).subscribe(
        (data) => {
          this.isLoading = false;
          this._toast.success('Opération effectuée avec succés')
        },
  
        (error) => {
          
        }
      );
    }

    else{
      this.quoteService.updateQuoteDetails(this.offer_id, offer).subscribe((res) => {
        console.log('v response' , res)
        this.isLoading = false;
        this._toast.success('Opération effectuée avec succés')
      })
    }

  
  }

  submit(camion){
    this.isLoading = true;
    let data = {
      offer_id: this.offer_id,
      data: [],
    };
    this.transportConditions.filter(c => c.type == camion.type && c.tonnage == camion.tonnage).forEach(e => {
      e.form.value.transportFormsArray.forEach(c => {
        data['data'].push(c)
      })
    })
    this.serviceCamionConditions.filter(c => c.type == camion.type && c.tonnage == camion.tonnage).forEach(e => {
      console.log('E', e)
      e.forms.forEach(elm => {
          data['data'].push(elm.value)
      })
    })

    if(this.isAnOffer){
      this.affretementService.addAffretementDevis(data).subscribe(
        (data) => {
          this.isLoading = false;
          this._toast.success('Opération effectuée avec succés')
        },
        (error) => {
          
        }
      );
    }
    else{
      this.quoteService.updateQuoteDetails(this.offer_id, data).subscribe((res) => {
        this.isLoading = false;
        this._toast.success('Opération effectuée avec succés')
        console.log('v response' , res)
      })
    }
    
  }

  countCondition(title){
    return this.serviceConditions.find(e => e.type == title) ? this.serviceConditions.find(e => e.type == title).forms?.length : 0
  }
  countCamionCondition(camion, id){
    return this.serviceCamionConditions.find(e => e.type == camion.type && e.tonnage == camion.tonnage && e.rubric_id == id) ? this.serviceCamionConditions.find(e => e.type == camion.type && e.tonnage == camion.tonnage && e.rubric_id == id).forms?.length : 0
  }

  getConditionByTypeAndTonnage(camion){
    let result = [];
    this.conditionByCities.forEach(c => {
      if(c => c.type = camion.type && c.tonnage == camion.tonnage){
        result.push(c)
      }
    })
    return result
  }

  filterDestination(destination, tab){
    if(destination){

      this.filter.destination = destination.id
      this.filter.type = tab.type
      this.filter.tonnage = tab.tonnage
    }
  }

  filterOrigin(origin, tab){
    if(origin){
      this.filter.origin = origin.id
      this.filter.type = tab.type
      this.filter.tonnage = tab.tonnage
    }
  }

  getFilterResult(){
    if(this.tempResult.length){

      this.conditionByCities = this.tempResult
    }
    console.log('khkh', this.filter, this.conditionByCities)
    
    this.tempResult = this.conditionByCities
    this.conditionByCities = this.conditionByCities.filter(c => c.origin == this.filter.origin && c.destination == this.filter.destination && c.tonnage == this.filter.tonnage && c.type == this.filter.type)
  }

  refreshFilter(){
    this.filter = {origin: null, destination: null, type: null, tonnage:null,}
    this.searchComponents.toArray()[0].value = '';
    this.searchComponents.toArray()[1].value = '';
    this.conditionByCities = this.tempResult
  }




  deleteConditionTransport(index: number, camion: any) {
    
    const deletedCondition = this.conditionByCities.splice(index, 1)[0];
    
    const indexToDelete = this.transportConditions.findIndex(condition => 
      condition.type === deletedCondition.type &&
      condition.tonnage === deletedCondition.tonnage &&
      condition.origin === deletedCondition.origin &&
      condition.destination === deletedCondition.destination
    );
  
    if (indexToDelete !== -1) {
      this.transportConditions.splice(indexToDelete, 1);




      console.log('camion ...' , camion)

      let data = {
        offer_id : this.offer_id,
        truck_type_id : camion.type, 
        tonnage_id : camion.tonnage,
        origin : deletedCondition.origin,
        destination : deletedCondition.destination,
        delete_block : false
      }

      this.affretementService.deleteTransportConditions(data).subscribe((res) => {

        this.isLoading = false;
        this._toast.success('Opération effectuée avec succés')
      })

    }
  
  }
}
