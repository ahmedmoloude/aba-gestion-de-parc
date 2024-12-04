import { Component, OnInit } from '@angular/core';
import { FactureService } from 'app/core/services/facturation/facture.service';
import { DatePipe } from '@angular/common';
import { ToastService } from 'app/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-facturation-special-offers',
  templateUrl: './facturation-special-offers.component.html',
  styleUrls: ['./facturation-special-offers.component.css']
})
export class FacturationSpecialOffersComponent implements OnInit {


  loading = true;

  offers = []

  headerColumuns = [
    'Client',
    'Type d\'offre',
    'Mois',
    'Taxer',
    'Montant HT',
    'Montant TVA',
    'Montant TTC',
  ];


  constructor(private router : Router , private factureServcie : FactureService ,  private datePipe: DatePipe ,



     private toastServcie : ToastService
  ) { }

  ngOnInit(): void {



    this.factureServcie.getSpecialeOffersPreFactures().subscribe((res) => {


      this.offers = res


      this.loading = false ;
    })
  }



  getFrenchMonthName(created_at) {
    const frenchMonth = this.datePipe.transform(created_at, 'MMMM', 'fr');
    return frenchMonth;
  }



  simulateCRON(){




    this.loading = true;
    this.factureServcie.simulateCRONJob().subscribe((d) => {




      if (d?.offers_processed == 0) {
        this.toastServcie.success(`Non pré facture a générer tout est à jour`)

        this.loading = false;


      }
      else {        
          this.toastServcie.success(`${d.offers_processed} Pré factures générées` )
          this.factureServcie.getSpecialeOffersPreFactures().subscribe((res) => {

            this.offers = res
      
      
            this.loading = false ;
          })
      }

      


    })
  }



  redirectToTaxation(uuid){


    this.router.navigate(['tax-special-offers' , uuid ])
  }
}
