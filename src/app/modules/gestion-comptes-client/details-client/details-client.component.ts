import { Component, OnInit } from '@angular/core';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { ToastService } from '../../../core';
import { ActivatedRoute, Router } from '@angular/router';
import { COMPLAINT_STATUS, DETAILS_COMPLAINT, RETURN_DOCUMENT_STATUS } from '../../../config';

@Component({
  selector: 'app-details-client',
  templateUrl: './details-client.component.html',
  styleUrls: ['./details-client.component.css'],
})
export class DetailsClientComponent implements OnInit {
  statusValues = COMPLAINT_STATUS;
  detailsComplaint = DETAILS_COMPLAINT;
  statusValuesDocument = RETURN_DOCUMENT_STATUS;
  headerColumuns = [
    'Prénom',
    'Nom',
    'Client',
    'Téléphone',
    'Email',
    'Fax',
    'Departement',
  ];

  headerColumunsRdvTask = [
    'Objet',
    'Date de début',
    'Date de fin',
    'Client',
    'Commercial',
    'Importance',
    'Statut',
    'Type',
  ];

  headerColumunsOffer = [
    'Référence',
    'Client',
    'Date de création',
    'Date d’expiration',
   // 'Statut',
    'Service',
  ];

  headerColumunsDevis = [
    'Référence',
    'Client',
    'Statut',
    'Date début',
    'Date fin',
    'Historique',
  ];

  headerColumunsExpeditions = [
      'N°Exp',
      'Type',
      'N°Dec',
      'Date',
      'Expediteur',
      'Destinataire',
      'Sens',
      'Colis',
      'Poids',
      'Val.Déc',
      'Vol',
      'Liv',
      'BL',
      'Fact',
      'HT',
      'TTC',
      'Fond',
      'Nature',
      'Port',
    ];

  headerColumunsReclamations = [
    'Id',
    'Type',
    "N° d'envoi",
    'Motif',
    'Statut',
    'Crée le',
    'Dernière mise a jour',
  ];

  headerColumunsDocuments = [
    'N° Expédition',
    'Date',
    'Déstinataire', // exp
    'DEstination', // exp
    'Nature', // exp
    'Fond', // exp
    'Port', // exp
    'HT',
    'Type',
    //'Référence',
    'Statut',
    //'Action',
  ];
  page: number = 1;

  client:any;
  detailsRelation:any;
  spinner : boolean = false;
  spinnerTableau : boolean = false;
  relation : any;
  uuid :any;
  constructor(private boGridService: BoGridService,
    private _toast: ToastService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit(): void {
  this.uuid = this.route.snapshot.params.uuid;

    this.spinner = true;
    this.boGridService.getCustomerCount(this.uuid).subscribe((data) => {
      //console.log(data)
      this.client = data['response']['0'];
      console.log(this.client);
      this.spinner = false;
    },
    (error) => {
      console.log('error', error);
    });
  }

  countRetourDocByType(exp: any, type: string) {
    return exp.return_documents.filter((item: any) => item.type === type)
      .length;
  }
  
  relations(relation){
    console.log("relation choisi", relation)
    this.relation = relation;
    this.spinnerTableau = true;
    this.boGridService.getCustomerDetails(this.uuid, relation).subscribe((data) => {
      console.log(data)
      if(relation == 'expedition'){
        this.detailsRelation = data["response"];
      }else{
        this.detailsRelation = data["response"]['0'][relation];
      }
      
      console.log(this.detailsRelation);
      this.spinnerTableau = false;
    },
    (error) => {
      console.log('error', error);
    });
  }

  showQuoteGridDetails(quoteUuid: any): void {
    this.router.navigate(['tree-quote/details/' + quoteUuid]);
  }

  detailsOffer(uuid: string) {
    this.router.navigate([`/tree-offer/details/${uuid}`]);
  }

}
