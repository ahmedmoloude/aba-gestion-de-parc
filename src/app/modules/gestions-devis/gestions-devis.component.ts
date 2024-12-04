import { PersonelService } from 'app/core/services/personel.service';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { DevisDialogComponent } from './devis-dialog/devis-dialog.component';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BoQuoteService } from 'app/core/services/admin-bo/bo-quotes.service';
import { ToastService } from 'app/services';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NewDevisVersionDialogComponent } from './new-devis-version-dialog/new-devis-version-dialog.component';
import { HistoriqueVersionsComponent } from './historique-versions/historique-versions.component';
import { Config } from 'app/config';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { selectAuthUser } from 'app/core/store/profil/profil.selectors';
import { DevisToOfferDialogComponent } from './devis-to-offer-dialog/devis-to-offer-dialog.component';
import { PermissionService } from 'app/core/services/permission.service';
import { selectPagination } from 'app/core/store/pagination/pagination.selectors';
import { Paginator } from 'app/core/models/paginator.model';
import { updatePagination } from 'app/core/store/pagination/pagination.actions';
import { data } from 'vis-network';

/*
- save type service offers and quotes
- add type service in offers commercial

- [ x ] Step of devis validation 1 / x …
- [ x ] Timeline actions + flows
- [ x ] list quotes by roles et filtres
- [ x ] Add Motif decline  ( change sweet alert to modal )
- [ x ] Date offer , limitations marché ( change sweet alert to modal)
- [  ] Quote limitations
- [  ] Offre limitations

- paramétrer la date d’expiration de devis en 2 mois.
- En haut de devis choisir l'activité (messagerie/affrètement)
- Référence de devis doit contenir une séquence numérique 'P’ Pour prospect ou C pour client
- Pour l’impression du devis on ajoute la date de création de devis et la référence de devis

- offre commerciales workflows , Timeline , step validation ??
- offre by roles et filtres ??

- Insérer un texte 'draft 'en arrière plan estompé ??
- Notification pour le commercial 2 semaines avant la fin de validité d’un devis ??
- [ ] Devis Version commentaire between users ??
- [ ] Refuse validation step ??
- [ ] Archive devis ??

------------------------------------------------------------------------------------
*/

// todo rollback quote add motif dialog
@Component({
  selector: 'app-gestions-devis',
  templateUrl: './gestions-devis.component.html',
  styleUrls: ['./gestions-devis.component.css'],
})
export class GestionsDevisComponent implements OnInit {

  pagination!: Paginator;

  per_page = 10;


  @Input() merchant_uuid?: string;
  headerColumuns = [
    'Référence devis',
    'Type de service',
    'Client',
    'Commercial assigné',
    'Statut',
    'Date de création',
    'Date d’expiration',
    'Type de client ',
    'Validation',
    'Workflow',
    'Historique',
  ];
  page: number = 1;
  isLoading = true;
  quotes: any[];
  user: any;
  links: any = [];
  commercials  = [];

  // filters quotes params
  selectedStatus = '';
  // statusFilters = [
  //   { id: '1', name: 'Devis', quote_status: 'DRAFT', workflow_step: -1 },
  //   {
  //     id: '2',
  //     name: "En attente de validation par l'adv",
  //     quote_status: 'DRAFT',
  //     workflow_step: 0,
  //   },
  //   {
  //     id: '3',
  //     name: 'En attente de validation par le directeur commercial',
  //     quote_status: 'DRAFT',
  //     workflow_step: 1,
  //   },
  //   {
  //     id: '4',
  //     name: 'En attente de validation par le DG',
  //     quote_status: 'DRAFT',
  //     workflow_step: 2,
  //   },
  //   { id: '5', name: 'Confirmé', quote_status: 'CREATED', workflow_step: -1 },
  //   { id: '6', name: 'Accepté', quote_status: 'ACCEPTED', workflow_step: -1 },
  //   {
  //     id: '7',
  //     name: 'Non Accepté',
  //     quote_status: 'REJECTED',
  //     workflow_step: -1,
  //   },
  // ];

  inputsFiler = [
    {
      name: 'reference',
      placeholder: 'Référence',
      type: 'text'
    },
    {
      name: 'customer_id',
      placeholder: 'Client',
      keys: ['code', 'name'],
      type: 'select',
      apiUrl: `${Config.api.customers.searchList}?type=prospect&search=`,
      options: []
    },
    {
      name: 'commercial_id',
      placeholder: 'Commercial',
      type: 'select',
      options: []
    },
    {
      name: 'statut',
      placeholder: 'Statut',
      type: 'select',
      options:   [
          { id: '1', text: 'Devis',
           value : {
            quote_status: 'DRAFT', workflow_step: -1
           }
          },
          {
            id: '2',
            text: "En attente de validation par l'adv",
            value : {
              quote_status: 'DRAFT',
              workflow_step: 0,
            }
          },
          {
            id: '3',
            text: 'En attente de validation par le directeur commercial',
            value : {
              quote_status: 'DRAFT',
              workflow_step: 1,
            }
          },
          {
            id: '4',
            text: 'En attente de validation par le DG',
            value : {
              quote_status: 'DRAFT',
              workflow_step: 2,
            }
          },
          {
            id: '5',
            text: 'Confirmé',
            value : {
              quote_status: 'CREATED',
              workflow_step: -1
            }
           },
          { id: '6', text: 'Accepté',

          value : {
            quote_status: 'ACCEPTED', workflow_step: -1
          }
          },
          {
            id: '7',
            text: 'Non Accepté',
            value : {
              quote_status: 'REJECTED',
              workflow_step: -1,
            }
          },
        ]

    },
    {
      name: 'customer_type',
      placeholder: 'type',
      type: 'select',
      options: [
        {
          text: 'Cash',
          value: 'guichet',
        },
        {
          text: 'En compte',
          value: 'en_compte',
        }
      ]
    },
    {
      name: 'service_id',
      placeholder: 'Type de service',
      type: 'select',
      options: [
        {
          text: 'Messagerie',
          value: 1,
        },
        {
          text: 'Affrèttement',
          value: 2,
        }
      ]
    },

  ];

  extraInputsFilter = [
    {
      name: 'created_at',
      placeholder: 'Date de création',
      type: 'date',
    },
    {
      name: 'date_expiration',
      placeholder: 'Date d\'expiration',
      type: 'date'
    },
    {
      name: 'type',
      placeholder: 'Entreprise/Particulier',
      type: 'select',
      options: [
        {
          text: 'Entreprise',
          value: 'entity',
        },
        {
          text: 'Particulier',
          value: 'individual',
        }
      ]
    },

    {
      name: 'limitation_max_volume',
      placeholder: 'Limitation Volume Max',
      type: 'text'
    },
    {
      name: 'limitation_max_weight',
      placeholder: 'Limitation Poids Max',
      type: 'text'
    },
    {
      name: 'limitation_max_revenues',
      placeholder: 'Limitation CA',
      type: 'text'
    },
    {
      name: 'limitation_max_qty',
      placeholder: 'Limitation Colisage',
      type: 'text'
    },

    {
      name: 'negotiated_max_volume',
      placeholder: 'Potentiel Volume Max',
      type: 'text'
    },

    {
      name: 'negotiated_max_weight',
      placeholder: 'Potentiel Poids Max',
      type: 'text'
    },
    {
      name: 'negotiated_revenues',
      placeholder: 'Potentiel CA',
      type: 'text'
    },

    {
      name: 'negotiated_max_qty',
      placeholder: 'Potentiel Colisage',
      type: 'text'
    },
  ];
  client : any;

  constructor(
    public dialog: MatDialog,
    private boQuoteService: BoQuoteService,
    private _toast: ToastService,
    private router: Router,
    private store: Store<AppState>,
    private personelService : PersonelService,
    private boGridService: BoGridService,
    public permissionService: PermissionService
  ) {}

  ngOnInit(): void {

    this.store.select(selectPagination).subscribe((pagination) => {
      this.pagination = pagination;
    });
    this.store.select(selectAuthUser).subscribe((res) => (this.user = res));
    console.log('AUTH', this.user)
    this.getQuotes();
    this.personelService.personnelbyFunction(null, 'COMMERCIAL').subscribe( (data: any) => {
      console.log('data Commerciale', data);
      this.inputsFiler['2'].options =data.response.map(elem => (
        {
          'text': elem.first_name,
          'value': elem.id
        }
      ));
    });

    // this.boGridService.getCustomersProspects().subscribe((data) => {
    //   console.log("data client ",data)
    //   this.inputsFiler['1'].options = data["response"].map(elem => (
    //     {
    //       'text': elem.name,
    //       'code' : elem.code,
    //       'value': elem.id
    //     }
    //   ));
    // });

  }

  showValidateDevisBtn(quoteVersion){
    let workflowValidation = quoteVersion.last_version[0].workflow
    let quoteVersionStep = quoteVersion.last_version[0].workflow_step
    let currentStep = workflowValidation.find(item => item.niveau == quoteVersionStep)
    let checkerDone = workflowValidation.filter(item => item.status == 'DONE').length
    let checkerPending = workflowValidation.filter(item => item.status == 'PENDING').length
    let checkerReject = workflowValidation.filter(item => item.status == 'REJECT').length
      if(checkerDone === workflowValidation.length
      ){
        return false
      }else if(this.user.temp_role?.name.includes('admin') || this.user.role?.name.includes('admin')){
          return true
        
      }
    if(currentStep){
      return this.user.temp_role?.id == currentStep.role_id && currentStep.status == 'PENDING'
    }
    return false
  }
  showRejectDevisBtn(quoteVersion){
    let result = false
    let workflowValidation = quoteVersion.last_version[0].workflow
    let quoteVersionStep = quoteVersion.last_version[0].workflow_step
    let checkerDone = workflowValidation.filter(item => item.status == 'DONE')
    let checkerPending = workflowValidation.filter(item => item.status == 'PENDING')
    let checkerReject = workflowValidation.filter(item => item.status == 'REJECT')
      if((checkerDone.length == workflowValidation.length || checkerReject.length == workflowValidation.length) && 
      this.user.temp_role?.name.includes('admin') || this.user.role?.name.includes('admin')
      ){
        return false
      }else{
        if(this.user.temp_role?.name.includes('admin') || this.user.role?.name.includes('admin')){
          return true
        }
      }
    
    let previousStep = workflowValidation.find(item => item.niveau == quoteVersionStep - 1)
    let currentStep = workflowValidation.find(item => item.niveau == quoteVersionStep)
    if(workflowValidation.length == quoteVersionStep){
      result = currentStep.role_id == this.user.temp_role?.id
    }
      if(previousStep){
        result =  previousStep.role_id == this.user.temp_role?.id && previousStep.status == 'DONE'
      }
    
    return result;
  }
  showValidateClientBtn(quoteVersion){
    let workflowValidation = quoteVersion.last_version[0].workflow
    let result = false;
    workflowValidation.forEach(element => {
      if(element.status == 'PENDING'){
        result = false
      }
    });
    if(quoteVersion.last_version[0].status == 'REJECTED'){
      result = false
    }
    let checkerDone = workflowValidation.filter(item => item.status == 'DONE').length
    // console.log('QUOTE_ID ', quoteVersion.id)
    // console.log('CHECKERDONE ', checkerDone)
    // let firstStep = workflowValidation.find(w => w.niveau == 1);
    // console.log('FIRST STEP', firstStep)
    if(checkerDone == workflowValidation.length && parseInt(workflowValidation.find(w => w.niveau == 1)?.role_id) ==  this.user.temp_role?.id){
      result = true
    }
    return result
  }
  validateQuote(quote, status){
    this.isLoading = true;
    this.boQuoteService.validateQuote(quote, {status: status}).subscribe(
      (res: any) => {
        this.quotes = this.quotes.map((q) => {
          console.log('LASTVERSION', q.last_version[0])
          console.log(quote.last_version[0].uuid)
          // update status , workflow_step of last version , next_workflow_items , timeline
          if (q.last_version[0].uuid === quote.last_version[0].uuid) {
            q.last_version[0].status = res.response.status;
            q.last_version[0].workflow_step = res.response.workflow_step;
            q.last_version[0].workflow = res.response.last_version[0].workflow;
          }
          return q;
        });
        this.isLoading = false;
        this._toast.success('Opération effectué avec succés !');
      },
      (err) => {
        this.isLoading = false;
        this._toast.error('Une erreur est survenue !');
      }
    );
  }

  filter($event){
    this.isLoading = true;
    console.log("Filter Quote", $event)
    this.boQuoteService.getListQuotes($event, 1, this.merchant_uuid , this.per_page).subscribe((data : any) => {
      this.isLoading = false;
        console.log('data retourné ', data);
        this.quotes = data.response.data;
        this.links = data.response.links;

        this.store.dispatch(
          updatePagination({
            currentPage:  data.response.current_page,
            pageSize:  data.response.per_page,
            totalItems:  data.response.total,
          })
        );
    })
  }

  /*  ----- Dialogs  ----- */
  // new devis dialog
  openDialog(): void {
    this.dialog.open(DevisDialogComponent, {
      disableClose: true,
      width: '80vw',
      data: {},
    });
  }
  // history versions or timeline dialog
  openQuoteExtraDataDialog(quote: any, display_timeline: boolean): void {
    this.dialog.open(HistoriqueVersionsComponent, {
      disableClose: true,
      width: !display_timeline ? '80vw' : '850px',
      data: { quote, display_timeline },
    });
  }

  /* ----- Api actions ----- */
  // fetch quotes
  getQuotes() {
    this.boQuoteService.getListQuotes(null, 1, this.merchant_uuid , this.per_page).subscribe(
      (res: any) => {
        this.quotes = res.response.data;
        this.links = res.response.links;


        this.store.dispatch(
          updatePagination({
            currentPage:  res.response.current_page,
            pageSize:  res.response.per_page,
            totalItems:  res.response.total,
          })
        );
        this.isLoading = false;
      },
      (err) => {
        this.isLoading = false;
        this._toast.error('Une erreur est survenue !');
      }
    );
  }
  // validate devis
  confirmQuoteVersion(params: { uuid: string | null; data: any }) {
    this.isLoading = true;
    this.boQuoteService.confirmQuoteVersion(params.uuid, params.data).subscribe(
      (res: any) => {
        this.quotes = this.quotes.map((q) => {
          // update status , workflow_step of last version , next_workflow_items , timeline
          if (q.last_version[0].uuid === params.uuid) {
            q.last_version[0].status = res.response.status;
            q.last_version[0].workflow_step = res.response.workflow_step;
            q.last_version[0].next_workflow_items =
              res.response.next_workflow_items;
            q.last_version[0].timeline = res.response.timeline;
          }
          return q;
        });
        this.isLoading = false;
        this._toast.success('Opération effectué avec succés !');
      },
      (err) => {
        this.isLoading = false;
        this._toast.error('Une erreur est survenue !');
      }
    );
  }
  // decline devis or accept devis dialog
  openQuoteActionsDialog(
    quote: any,
    confirmed: 'accept-quote' | 'decline-quote' | 'rollback-quote'
  ): void {
    const dialogRef = this.dialog.open(DevisToOfferDialogComponent, {
      disableClose: true,
      width: '831px',
      data: { quote, confirmed },
    });
    dialogRef.afterClosed().subscribe((output) => {
      if (output) {
        // accept or decline offer
        this.quotes = this.quotes.map((q) => {
          // update status , workflow_step of last version , next_workflow_items ,timeline
          if (q.last_version[0].uuid === quote.last_version[0].uuid) {
            q.last_version[0].status = output.status;
            q.last_version[0].workflow_step = output.workflow_step;
            q.last_version[0].next_workflow_items = output.next_workflow_items;
            q.last_version[0].timeline = output.timeline;
          }
          return q;
        });
        if (confirmed === 'accept-quote') {
          setTimeout(() => {
            this.router.navigate(['offercommerciales']);
          }, 1000);
        }
      }
    });
  }
  // new quote version
  openNewQuoteVersionDialog(uuid: string): void {
    const dialogRef = this.dialog.open(NewDevisVersionDialogComponent, {
      disableClose: true,
      width: '831px',
      data: { uuid },
    });
    dialogRef.afterClosed().subscribe((output) => {
      if (output) {
        console.log(output);
        this.quotes = this.quotes.map((q) => {
          // update last version and versions history
          if (q.last_version[0].uuid === uuid) {
            q.last_version = output.quote_parent.last_version;
            q.versions = output.quote_parent.versions;
          }
          return q;
        });
      }
    });
  }

  /* ----- Helpers ----- */
  // Display next authorized workflows actions
  displayWorkflowAction(quoteVersion: any, nextStatus: string) {
    const workflowAction = quoteVersion.next_workflow_items.find(
      (item: any) =>
        item.status_now === quoteVersion.status &&
        item.status_next === nextStatus
    );
    if (!workflowAction || !workflowAction?.next_validators)
      return { display_action: false };

    if (
      workflowAction.next_validators.users.includes(this.user.id) ||
      workflowAction.next_validators.roles.includes(this.user?.role?.name)
    )
      return { display_action: true, action: workflowAction };

    return { display_action: false };
  }
  // Get workflow progress
  getWorkflowProgress(quoteVersion: any) {
    let workflowAction = quoteVersion.next_workflow_items.filter(
      (item: any) =>
        item.status_now === quoteVersion.status && item.next_validators
    );
    if (workflowAction.length !== 1) return null; // we have multiples or no choices

    workflowAction = workflowAction[0];
    return {
      workflow_step: quoteVersion.workflow_step + 1,
      steps: workflowAction.validators.length,
    };
  }
  getWorkflowValidation(item){
    return item.last_version[0].workflow.filter(item => item.status == 'DONE').length
  }
  // sweet alert helper
  sweetAlertConfirmation(
    actions: {
      type: 'confirm-quote'; // | 'accept-quote' | 'decline-quote' | 'rollback-quote',
      params: { uuid: string | null; data: any };
    },
    alert_config: {
      title: string;
      icon: 'warning' | 'success' | 'error';
      confirmBtn: string;
      cancelButton: string;
    }
  ) {
    Swal.fire({
      title: alert_config.title,
      icon: alert_config.icon,
      showCancelButton: true,
      confirmButtonText: alert_config.confirmBtn,
      cancelButtonText: alert_config.cancelButton,
      confirmButtonColor: alert_config.icon == 'error' ? 'red': 'green',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        if (actions.type === 'confirm-quote')
          this.confirmQuoteVersion(actions.params);
        // if (actions.type === 'rollback-quote') this.rollbackConfirmQuoteVersion(actions.params);
        // if (actions.type === 'accept-quote') this.acceptQuoteVersion(actions.params)
        // if (actions.type === 'decline-quote') this.declineQuoteVersion(actions.params)
      }
    });
  }

  /*  */
  showQuoteGridDetails(quoteUuid: any): void {
    this.router.navigate(['tree-quote/details/' + quoteUuid]);
  }
  updateQuoteGridDetails(quoteUuid: any , service_type  = ''): void {


    console.log('servcie ' , service_type)
    if (service_type == 'Affretement') {
      this.router.navigate([`/affretement-devis/update/${quoteUuid}`]);
    }
    else{
      this.router.navigate(['tree-quote/update/' + quoteUuid]);
    }
  }
  downloadOffer(id: number): void {
    window.open(Config.api.quotes.download_quote + '/' + id, '_blank');
  }
  getTheNext(event) {
    this.boQuoteService
      .getListQuotes(null, event, this.merchant_uuid , this.per_page)
      .subscribe(
        (res: any) => {
          this.quotes = Object.values(res.response.data);
          this.links = res.response.links;
          this.isLoading = false;

          this.store.dispatch(
            updatePagination({
              currentPage:  res.response.current_page,
              pageSize:  res.response.per_page,
              totalItems:  res.response.total,
            })
          );
        },
        (err) => {
          this.isLoading = false;
          this._toast.error('Une erreur est survenue !');
        }
      );
  }

  paginate($event: any) {

    
    console.log('page size ', $event);

    this.per_page = $event.rows;
    const paginator = {
      currentPage: $event.page,
      nextPage: $event.page + 1,
      pageSize: $event.pageCount,
      totalItems: this.pagination.totalItems,
    };

    this.boQuoteService.getListQuotes($event, 1, this.merchant_uuid , this.per_page).subscribe((data : any) => {
      this.isLoading = false;
        console.log('data retourné ', data);
        this.quotes = data.response.data;
        this.links = data.response.links;

        this.store.dispatch(
          updatePagination({
            currentPage:  data.response.current_page,
            pageSize:  data.response.per_page,
            totalItems:  data.response.total,
          })
        );
    })

  }
}
