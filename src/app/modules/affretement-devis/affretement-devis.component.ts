import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogTransportComponent } from './dialog-transport/dialog-transport.component';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AffretementServiceService } from 'app/core/services/affretement-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceConditionDialogComponent } from './service-condition-dialog/service-condition-dialog.component';
import { TransportConditionServiceComponent } from './transport-condition-service/transport-condition-service.component';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { selectAllCity } from 'app/core/store/resources/resources.selectors';
import { SharedAutcompleteComponent } from 'app/shared/components/shared-autcomplete/shared-autcomplete.component';
import { TransportConditionServiceDialogComponent } from './transport-condition-service-dialog/transport-condition-service-dialog.component';
import { ToastService } from 'app/services';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { PermissionService } from 'app/core/services/permission.service';
import * as XLSX from 'xlsx';

import { RubricUnite, getUnitsByrubric } from 'app/core/models/rubricUnite.model';
import { BoQuoteService } from 'app/core/services/admin-bo/bo-quotes.service';




// export enum Modes {
//   CREATE,
//   UPDATE
// }
@Component({
  selector: 'app-affretement-devis',
  templateUrl: './affretement-devis.component.html',
  styleUrls: ['./affretement-devis.component.css']
})
export class AffretementDevisComponent implements OnInit {

  @ViewChildren(SharedAutcompleteComponent) searchComponents: QueryList<SharedAutcompleteComponent>;
  filter = {origin: null, destination: null, type: null, tonnage:null}
  tempResult = [];
  cities = [];
  tabs = [];
  selected = new FormControl(0);
  offer_id = null;
  hasMinimumPrice = false;
  remiseServices = 0;
  remiseTransport = 0;

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

  file = null;
  gridName = null;

  spinner = false;


  isAnOffer = true;


  

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private affretementService: AffretementServiceService,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private _toast: ToastService,
    private gridService: BoGridService,
    private _router: Router,
    public permissionService: PermissionService,
    public quoteService : BoQuoteService
    ) { }


  ngOnInit(): void {




    
    this.store.select(selectAllCity).subscribe((res) => {
      this.cities = JSON.parse(JSON.stringify(res));
    });

    this.offer_id = this.activatedRoute.snapshot.params['uuid'].split('_')[0];
    this.hasMinimumPrice = this.activatedRoute.snapshot.params['uuid'].split('_')[1] === 'true';




    // this.type_tree = this.router.url.split('/')[1]; const mode_tree = 



    console.log('url params ' , this._router.url.split('/')[1])

    this.isAnOffer =  this._router.url.split('/')[1] == 'affretement-devis' ? false : true;



    console.log('this is an offer' , this.isAnOffer)

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
    });
    this.servicesFormsArray.push(newForm)
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



    let rubricUnites : RubricUnite = getUnitsByrubric(rubric?.title) ;


    console.log('rubric unite ' , rubricUnites); 
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


      if(data) {          
        this.submitServices();
      }

    })
  }
  openTransportConditionDialog(camion, city = null){

    console.log('camion ' ,camion)
    console.log('hhhh', city, this.transportConditions)


    let transportUnite : RubricUnite = getUnitsByrubric('TRANSPORT') ;


    const dialog = this.dialog.open(TransportConditionServiceComponent, {
      data: { transportUnite ,camion, form: (city) ? this.transportConditions.find(e =>  e.origin == city.origin && e.destination == city.destination && camion.type == e.type && camion.tonnage == e.tonnage).form : null},
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


    if(data){
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
      typeREtour: [''],
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
  


      if(this.isAnOffer){
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
        console.log('v response' , res)
        this.isLoading = false;
        this._toast.success('Opération effectuée avec succés')
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

  uploadFile(event) {
    this.file = (event.target as HTMLInputElement).files[0];
  }

  onSubmitForm(){

    if (this.file) {

      this.spinner = true;
      let formData: any = new FormData()
      formData.append('file', this.file)
      formData.append('uuid', this.offer_id)
      formData.append('remiseTransport', this.remiseTransport)
      formData.append('remiseServices', this.remiseServices)
      formData.append('is_offer', this.isAnOffer)

      this.gridService.importAffretementOffre(formData).subscribe((d) => {
        this.spinner = false;


        if (this.isAnOffer) {
          this._router.navigate([`/affretement-offer/update/${this.offer_id}`]);
        }
        else{
          this._router.navigate([`/affretement-devis/update/${this.offer_id}`]);

        }
        // this.toaster.success('Grille importée avec succès')
        // const currentRoute = this.router.url;
        // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        //   // this.router.navigate([currentRoute]);
        // });
      })
    }

}




exporter(){


  let fileName = 'offre_affretment_canvas.xlsx'

  const filePath = `assets/canvas/${fileName}`;
  this.readExcelFile(filePath , fileName);

  
}

private readExcelFile(filePath: string , fileName : string ): void {
  fetch(filePath)
    .then((res) => res.arrayBuffer())
    .then((data) => {
      const workbook = XLSX.read(new Uint8Array(data), { type: 'array' });
      // Process the workbook as needed, or simply trigger download
      this.triggerDownload(workbook, fileName);
    });
}

private triggerDownload(workbook: XLSX.WorkBook, fileName: string): void {

  const excelBuffer: any = XLSX.write(workbook, {
    bookType: 'xlsx',
    type: 'array',
  });

  const blob: Blob = new Blob([excelBuffer], { type: '.xlsx' })
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.click();

  // Release the object URL to free up resources
  window.URL.revokeObjectURL(url);
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



  // submitConditionsQuote(){


  //   const params = { services : [], trucks : {}}

  //   this.serviceConditions.forEach(e => {
  //     e?.forms?.forEach(f => {
  //       params['services'].push(f.value)
  //     });
  //   })

  //   // this.transportConditions.push({type: data.type, tonnage: data.tonnage, origin: data.form.value.origin, destination: data.form.value.destination, form: data.form})

  //   this.transportConditions.forEach(e => {
  //     params.trucks[e.tonnage.id] = {};
  //     e.form.value.transportFormsArray.forEach(c => {
  //       params.trucks[e.tonnage.id].push(c)
  //     });
  //   });


  //   // this.serviceCamionConditions.forEach(e => {
  //   //   console.log('E', e)
  //   //   e.forms.forEach(elm => {
  //   //       data['data'].push(elm.value)
  //   //   })
  //   // })

  //   console.log('params ' , params)
  // }
}
