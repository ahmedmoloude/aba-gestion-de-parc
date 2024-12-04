import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AffretementService } from 'app/core/services/affretement.service';
import { Customer } from 'app/core/services/customer.service';
import { CustomerService } from 'app/core/services/facturation/customer.service';
import { VehiculeService } from 'app/core/services/vehicule.service';
import { saveAs } from 'file-saver';
import { DetailDemandeDialogComponent } from './detail-demande-dialog/detail-demande-dialog.component';

@Component({
  selector: 'app-demandes-light',
  templateUrl: './demandes-light.component.html',
  styleUrls: ['./demandes-light.component.css']
})
export class DemandesLightComponent implements OnInit {









  customer_id = null;

  onCustomerChange(e){



    this.customer_id = e?.id;


    console.log('customer id' , e)
  }
  isExportDialogVisible = false;




  openExportDialog(){
    this.isExportDialogVisible = true;
  }


  handleCancelExport(){

    this.isExportDialogVisible = false;

    this.customer_id  = null;
  }
  

  exportGeneralLoading = false;

  exportDetailLoading = false;





  exportGlobal(){

    this.exportGeneralLoading = true

    this.affretmentService.exportLightDemande('').subscribe(
      (res: any) => {
        const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        this.exportGeneralLoading = false

        saveAs(blob, 'light_demandes_global.xlsx');
        
      },
      (error) => {
        this.exportGeneralLoading = false

        console.error('Error downloading file:', error);
      }
    );
  }


  exportDetailed(){


    this.exportDetailLoading = true;
    this.affretmentService.exportLightDemande(this.customer_id).subscribe(
      (res: any) => {
        const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        this.exportDetailLoading = false


        this.handleCancelExport();
        saveAs(blob, 'light demandes detailed.xlsx');
        
      },
      (error) => {
        this.exportDetailLoading = false

        console.error('Error downloading file:', error);
      }
    );

  }

  filter($event){
    this.spinner = true;

    this.affretmentService.getDemandesLight($event).subscribe((res : any) => {
      this.demandes = res?.response
  
      this.count = this.demandes.length;

      this.spinner = false
    })
  }

  inputsFiler = [
    {
      name: 'reference',
      placeholder: 'N° demande',
      type: 'text',
    },
    {
      name: 'start_date_du',
      placeholder: 'Date de creation',
      type: 'date',
    },
   
    
    {
      name: 'start_date_du',
      placeholder: 'Date de début reservation',
      type: 'date',
    },
    {
      name: 'end_date_du',
      placeholder: 'Date fin de reservation',
      type: 'date',
    },
    {
      name: 'sender_id',
      placeholder: 'Expéditeur',
      type: 'select',
      options: [],
    },
    {
      name: 'type_vehicule',
      placeholder: 'Type de camion',
      type: 'select',
      options: [],
    },
    {
      name: 'tonnage',
      placeholder: 'Tonnage',
      type: 'select',
      options: [],
    },
    {
      name: 'status',
      placeholder: 'Statut',
      type: 'select',
      options: [
        {
          text: 'Supprimée',
          value: 'DELETED',
        },
        {
          text: 'Facturée',
          value: 'INVOICED',
        },
        {
          text: 'En cours',
          value: 'IN_PROGRESS',
        }
      ],
    },
  ];



  isDeleteModalVisible = false

  isSubmitLoading = false;


  motif = ''
  uuid = null



  getDeamndeLightStatus(s){

    let status_to_frensh = {
      DELETED  : 'Annulée',
      INVOICED : 'Facturée',
      IN_PROGRESS : 'En cours'
    }

    return status_to_frensh[s]
  }


  openDialog(uuid ){


    this.isDeleteModalVisible = true ; 

    this.uuid = uuid
  }
  handleCancel(){

  }
  demandes = [];


  submitDialog(){




    this.isSubmitLoading = true;

    let body = {
      motif : this.motif,
      uuid : this.uuid 
    }
    this.affretmentService.deleteDemandeLight(body).subscribe((res) => {

      this.isDeleteModalVisible = false;
      this.motif = '';
      this.uuid = null
      this.isSubmitLoading = false;



      this.spinner = true;


    this.affretmentService.getDemandesLight().subscribe((res : any) => {
      this.demandes = res?.response


      this.count = this.demandes.length;


      this.spinner = false
    })
    } , (err) => {

      this.isDeleteModalVisible = false;
      this.motif = '';
      this.uuid = null

      this.isSubmitLoading = false;

    }) 

  }





  customers = []
  count = 0;

  spinner = true;
  constructor ( private truckService : VehiculeService , private customerService : Customer  ,   private affretmentService : AffretementService , private router : Router,
    public dialog: MatDialog,) { }

  ngOnInit(): void {


    this.truckService.getTruckType().subscribe((res) => {




      for (let i = 0; i < res['response'].length ; i++) {
        this.inputsFiler['5'].options.push({
          text: res['response'][i].name,
          value: res['response'][i].id,
        });
        


      }
    })


    this.truckService.getTonnage().subscribe((res) => {



      for (let i = 0; i < res['response'].length ; i++) {
        this.inputsFiler['6'].options.push({
          text: res['response'][i].name,
          value: res['response'][i].id,
        });
        

      }
    })

    this.affretmentService.getDemandesLight().subscribe((res : any) => {
      this.demandes = res?.response


      this.count = this.demandes.length;


      this.spinner = false
    })

    this.customerService.getCustomers().subscribe((res) => {


      this.customers = res?.response;



      for (let i = 0; i < this.customers.length ; i++) {
        this.inputsFiler['4'].options.push({
          text: this.customers[i].name,
          value: this.customers[i].id,
        });
        
      }
    
    })

  }


  NavigateToTaxation(uuid){
    this.router.navigate(['demandeLightEditTaxation' , uuid])
  }

  openDetailDialog(demande){
    this.dialog.open(DetailDemandeDialogComponent, {
      width: '800px',
      data: demande,
    });
  }




  declaredValue(demande) {
    const declaredValues = demande.unloading_points_lights.map(point => point.declared_value);
    
    const numericDeclaredValues = declaredValues.filter(value => !isNaN(parseFloat(value)));

    const numericValues = numericDeclaredValues.map(value => parseFloat(value));
    
    const reducedCount = numericValues.reduce((acc, curr) => acc + curr, 0);

    return reducedCount;
}



  get taxed_amount(){
    return this.demandes?.filter((d) => d.light_demande_deleted == false).reduce((acc , dem) => acc + dem.taxed_price_ht , 0).toFixed(2);
  }
}
