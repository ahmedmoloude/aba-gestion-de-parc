import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AffretementService } from 'app/core/services/affretement.service';
import { ToastService } from 'app/services';
import { NzMarks } from 'ng-zorro-antd/slider';

@Component({
  selector: 'app-discount-dialog',
  templateUrl: './discount-dialog.component.html',
  styleUrls: ['./discount-dialog.component.css'],
})

export class DiscountDialogComponent implements OnInit {
  marks: NzMarks = {
    0: {
      label : '0 %',
      style : {
        color : '#0C8040'
      },
    },
    10: {
      label : '10 %',
      style : {
        color : '#0C8040'
      },
    },
    20: {
      label : '20 %',
      style : {
        color : '#0C8040'
      },
    },
    30: {
      label : '30 %',
      style : {
        color : '#0C8040'
      },
    },
    40: {
      label : '40 %',
      style : {
        color : '#0C8040'
      },
    },
    50: {
      label : '50 %',
      style : {
        color : '#0C8040'
      },
    },
    60: {
      label : '60 %',
      style : {
        color : '#0C8040'
      },
    },
    70:{
      label : '70 %',
      style : {
        color : '#0C8040'
      },
    },
    80: {
      label : '80 %',
      style : {
        color : '#0C8040'
      },
    },
    90: {
      label : '90 %',
      style : {
        color : '#0C8040'
      },
    },
    100: {
      label : '100%',
      style : {
        color : '#0C8040'
      }
    }
  };



  isForfait : boolean = false;
  title = 'Remise';
  calcul_details = {} as any;
  spinner =  false;
  transport_forfait = 0;
  global_service_forfait = 0;
  particular_service_forfait = 0;
  transport_rate = 0;
  global_service_rate = 0;
  particular_service_rate = 0;
  preview_mode = false;
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any , private affretmentServcie : AffretementService 
  
  ,     private _dialogRef: MatDialogRef<DiscountDialogComponent>,

  private toastService : ToastService

  ) {}

  ngOnInit(): void {
    if (this.dialogData.preview_mode) {
      this.transport_rate =  this.dialogData.transport_rate
      this.global_service_rate =  this.dialogData.global_service_rate
      this.particular_service_rate =  this.dialogData.particular_service_rate
      this.transport_forfait =  this.dialogData.transport_forfait ?? 0
      this.global_service_forfait =  this.dialogData.global_service_forfait ?? 0
      this.particular_service_forfait =  this.dialogData.particular_service_forfait ?? 0
      this.preview_mode = true;
    }
    console.log('dialog data ' , this.dialogData)
    this.calcul_details = this.dialogData.calcul_details;
    this.isForfait = this.dialogData.is_forfait
    if (this.isForfait) {
      this.title = 'Forfait'
    }
  }



  get total_transport(){
    return this.calcul_details?.transport?.total_ht
  }



  get total_service() {
    const services = this.calcul_details?.services || [];

    let totalValue = 0;

    for (const key in services) {
      // if (typeof services[key] === 'number') {
        totalValue += services[key]?.ht;
      // }
    }

    return totalValue;
  }


  get total_service_global() {
    const services = this.calcul_details?.services_global || [];

    let totalValue = 0;

    for (const key in services) {
      // if (typeof services[key] === 'number') {
        totalValue += services[key]?.ht;
      // }
    }

    return totalValue;
  }


  calculateRemise(originalAmount, discountRate) {
    // Convert discount rate to a decimal
    const discountDecimal = discountRate / 100;
  
    // Calculate remise amount
    const remiseAmount = originalAmount * discountDecimal;
  
    const finalAmount = originalAmount - remiseAmount;

    const roundedFinalAmount = Math.round(finalAmount * Math.pow(10, 2)) / Math.pow(10, 2);

    return roundedFinalAmount;
  }




  submit(){


    let total = {
      transport : this.total_transport,
      particular_service : this.total_service,
      service : this.total_service_global,

    }

    if (this.isForfait) {





      if (this.transport_forfait == 0 && this.global_service_forfait == 0 && this.particular_service_forfait ==0 ) {

       return  this.toastService.warn('Le montant doit forfait doit être supérieur à zéro');     
      }


      // if (this.transport_forfait > this.total_transport || 
      //   this.global_service_forfait > this.total_service_global ||
      //   this.particular_service_forfait > this.total_service) {
      //   this.toastService.error('Le montant du forfait est supérieur au total. Veuillez ajuster les montants des forfaits');
      //   return; // Exit the function without submitting



      console.log('calcul details ' , this.calcul_details )

      console.log('details service length' , this.calcul_details?.services?.length )
      console.log('total service ' , this.total_service )

      // }
      this.transport_rate = ((this.total_transport - this.transport_forfait) / ( this.total_transport == 0 ? Object.keys(this.calcul_details?.transport).length : this.total_transport  ));
  
      this.global_service_rate = ((this.total_service_global - this.global_service_forfait) / (this.total_service_global == 0 ? Object.keys(this.calcul_details?.services_global).length   : this.total_service_global));
  
      this.particular_service_rate = ((this.total_service - this.particular_service_forfait) / (this.total_service == 0 ? Object.keys(this.calcul_details?.services).length : this.total_service));
    }



    let body = {
      demande_id : this.dialogData.demande_id, 
      transport_rate : this.transport_rate,
      global_service_rate : this.global_service_rate,
      particular_service_rate : this.particular_service_rate,
      transport_forfait : this.transport_forfait,
      global_service_forfait : this.global_service_forfait,
      particular_service_forfait : this.particular_service_forfait,
      is_forfait : this.isForfait,
      total
    }

    console.log('body ' , body )


    this.spinner = true;
    this.affretmentServcie.createDiscount(body).subscribe((response) => {
      console.log('discount response ...' ,  response);

      this.spinner = false;
      this._dialogRef.close(response);

      if (this.isForfait) {
        this.toastService.success('Forfait créée avec succès')

      }
      else{
        this.toastService.success('Remise créée avec succès')

      }
    } , (err) => {
      this.spinner = false;
    })
  }

  multiply(a , b) {
    return (a * b).toFixed(2)
 }
}
