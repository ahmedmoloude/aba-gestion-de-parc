import { DialogReservationComponent } from './dialog-reservation/dialog-reservation.component';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import {
  // addAllDetailsMarchandiseSuccess,
  addDetailsMarchandiseSuccess,
  getCurrentStepSuccess,
  getDemandes,
  getPointChargementSuccess,
  getVehicules,
  reservationInit,
} from 'app/core/store/reservation/reservation.actions';
import {
  SelectLoaderReservation,
  selectDemandesReservation,
} from 'app/core/store/reservation/reservation.selectors';
import { Observable } from 'rxjs';
import { AffretementService } from 'app/core/services/affretement.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ToastService } from 'app/services';
import { TimeLineComponent } from './time-line/time-line.component';
import { DiscountDialogComponent } from './discount-dialog/discount-dialog.component';
import { CustomerService } from 'app/core/services/facturation/customer.service';
import { Customer } from 'app/core/services/customer.service';
import { Paginator } from 'app/core/models/paginator.model';
import { updatePagination } from 'app/core/store/pagination/pagination.actions';
import { selectPagination } from 'app/core/store/pagination/pagination.selectors';
import { PermissionService } from 'app/core/services/permission.service';
import { selectAllCity } from 'app/core/store/resources/resources.selectors';
export interface Demande {
  client: {};
  created_at: string;
  customer_id: number;
  date_debut: string;
  date_fin: string;
  demande_destinataires: [];
  id: number;
  relances: {};
  statut: string;
  updated_at: string;
  uuid: string;
}
@Component({
  selector: 'app-liste-clients',
  templateUrl: './liste-clients.component.html',
  styleUrls: ['./liste-clients.component.css'],
})
export class ListeClientsComponent implements OnInit {
  pagination!: Paginator;
  per_page = 10;

  count = 0;
  spinnerRelance: any = [];

  headerColumuns = [
    'N° déclaration',
    'Expéditeur',
    'Destinataire',
    'Ville destination',
    'Adresse',
    'Nbr de palettes',
    'Type de palette',
    'Retour documents',
    'Fonds',
  ];
  p: number = 1;

  cities = [];
  filters = {};

  validate;

  inputsFiler = [
    {
      name: 'reference',
      placeholder: 'N° demande',
      type: 'text',
    },
    {
      name: 'n_expedition',
      placeholder: 'N° Déclaration / N° Expédition',
      type: 'text',
    },

    {
      name: 'sender_id',
      placeholder: 'Expéditeur',
      type: 'select',
      options: [],
    },

    {
      name: 'destinataire_id',
      placeholder: 'Destinataire',
      type: 'select',
      options: [],
    },
    {
      name: 'statut',
      placeholder: 'Statut',
      type: 'select',
      options:  [
        { text: 'En cours', value: 'EN_ATTENTE_AFFECTATION' },
        { text: 'En attente d\'affectation', value: 'IN_PROGRESS' },
        { text: 'Refusé', value: 'REFUSED' },
        { text: 'Accepté', value: 'ACCEPTED' },
        { text: 'Annulé', value: 'CANCELED' },
        { text: 'Terminé', value: 'ENDED' }
      ],
    },
    {
      name: 'origin_id',
      placeholder: 'Origine',
      type: 'select',
      options: [],
    },
    {
      name: 'destination_id',
      placeholder: 'Destination',
      type: 'select',
      options: [],
    },

    {
      name: 'start_date_du',
      placeholder: 'Date début',
      type: 'date',
    },
    {
      name: 'end_date_du',
      placeholder: 'Date fin',
      type: 'date',
    },
  ];

  //demandesClients is an objectList
  demandeList: any = [];
  demandeSpinner: boolean = true;
  spinner: boolean = false;

  constructor(
    public toast: ToastService,
    public dialog: MatDialog,
    private store: Store<AppState>,
    private affretementService: AffretementService,
    private _router: Router,
    private customerService: Customer,
    private veichulService: AffretementService,
    public permissionService: PermissionService
  ) {}

  visibles: any = [];
  ReadMore: boolean = true;
  visible: boolean = false;
  loader$: Observable<any> = this.store.select(SelectLoaderReservation);

  ngOnInit(): void {

    this.store.select(selectAllCity).subscribe((res) => {
      this.cities = JSON.parse(JSON.stringify(res));
      for (var i = 0; i < this.cities.length; i++) {
        this.inputsFiler['5'].options.push({
          text: this.cities[i].name,
          value: this.cities[i].id,
        });
        this.inputsFiler['6'].options.push({
          text: this.cities[i].name,
          value: this.cities[i].id,
        });
      }
    });

    
    this.store.select(selectPagination).subscribe((pagination) => {
      this.pagination = pagination;
    });

    this.customerService.getCustomers().subscribe((customers) => {
      for (var i = 0; i < customers['response'].length; i++) {
        this.inputsFiler['2'].options.push({
          text: customers['response'][i].name,
          value: customers['response'][i].id,
        });
        this.inputsFiler['3'].options.push({
          text: customers['response'][i].name,
          value: customers['response'][i].id,
        });
      }
    });

    // this.veichulService.getListVehiculesType().subscribe((veichules) => {
    //   for (var i = 0; i < veichules['response'].length; i++) {
    //     this.extraInputsFilter['0'].options.push({
    //       text: veichules['response'][i].name,
    //       value: veichules['response'][i].id,
    //     });
    //   }
    // });

    // this.veichulService.getAllTonnages().subscribe((tonnages) => {
    //   for (var i = 0; i < tonnages['response'].length; i++) {
    //     this.extraInputsFilter['1'].options.push({
    //       text: tonnages['response'][i].name,
    //       value: tonnages['response'][i].id,
    //     });
    //   }
    // });
    this.spinner = true;
    this.affretementService
      .getDemandeAffretement({ page: this.p, per_page: this.per_page })
      .subscribe(
        (data) => {
          this.spinner = false;
          this.demandeList = data['response'].data;

          this.count = data['response'].totalItems;

          console.log('demande list', this.demandeList);

          this.store.dispatch(
            updatePagination({
              currentPage: data['response'].currentPage,
              pageSize: data['response'].pageSize,
              totalItems: data['response'].totalItems,
            })
          );
        },
        (error) => {
          console.log('error', error);
        }
      );
  }

  isVisible(index) {
    let founded = this.visibles.find((i) => i.index == index);
    return founded ? founded.visible : false;
  }

  onclick(index) {
    if (!this.visibles.find((i) => i.index == index)) {
      this.visibles.push({
        index,
        visible: true,
      });
    } else {
      this.visibles.find((i) => i.index == index).visible = !this.visibles.find(
        (i) => i.index == index
      ).visible;
    }
  }

  transform(objects: any = []) {
    return Object.values(objects);
  }

  openDialogreservation(): void {
    //reset the reservation store
    this.store.dispatch(reservationInit());
    this.dialog.open(DialogReservationComponent, {
      width: '406px',
      data: {},
    });
  }

  // decision(){
  //   console.log("POPUP PRENDRE DECISION")
  // }

  annuler(item) {
    console.log('DEMANDE', item);
    let data = {
      uuid: item.uuid,
      statut: 'CANCELED',
    };
    Swal.fire({
      title: 'Êtes-vous sûr(e) de vouloir désaffecter cette demande ?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.affretementService.changerStatutDemande(data).subscribe(
          (data) => {
            this.demandeList = this.demandeList.filter(
              (d) => d.uuid != item.uuid
            );
          },
          (error) => {
            console.log('error', error);
          }
        );
      }
    });
  }

  detailsAffretement(uuid, decision) {

    if (decision) {
      
      this._router.navigate([`decisionAffretment/${uuid}`]);

    }

    else{
      this._router.navigate([`detailsAffretement/${uuid}`]);
    }


  }

  filter($event) {
    // this.spinner = true;
    console.log('FILTER RDV', $event);

    this.spinner = true;

    this.filters = $event;
    this.affretementService
      .getDemandeAffretement({
        filters: $event,
        page: this.p,
        per_page: this.per_page,
      })
      .subscribe(
        (data) => {
          this.spinner = false;
          this.demandeList = data['response'].data;

          console.log('demande list', this.demandeList);


          this.count = data['response'].totalItems;

          this.store.dispatch(
            updatePagination({
              currentPage: data['response'].currentPage,
              pageSize: data['response'].pageSize,
              totalItems: data['response'].totalItems,
            })
          );
        },
        (error) => {
          console.log('error', error);
        }
      );
  }

  NavigateToTaxation(item) {
    // console.log('item in taxation', item)

    let uuid = item.uuid;

    if (item.trajectories.length == 0) {
      return this.toast.warn(
        'vous devez modifier la demande avant la taxation'
      );
    }

    if (item.discounts.length > 0) {
      return this.toast.warn('Cette demande a déjà une remise appliquer');
    }
    this._router.navigate([`taxation-affretement/${uuid}`]);
    // navigate to taxartion screen
  }

  editDemande(uuid) {
    // this.store.dispatch(getCustomers());
    this._router.navigate([`stepsreservations-edit/${uuid}`]);
  }

  openTimeLine(demande: any, display_timeline: boolean): void {
    this.dialog.open(TimeLineComponent, {
      disableClose: true,
      width: !display_timeline ? '80vw' : '850px',
      data: { demande, display_timeline },
    });
  }

  confirmDiscount(next_status, uuid) {
    let body = {
      next_status,
    };
    this.spinner = true;

    this.affretementService.confirmDiscount(body, uuid).subscribe((data) => {
      this.affretementService
        .getDemandeAffretement({ page: this.p, per_page: this.per_page })
        .subscribe(
          (data) => {
            this.spinner = false;
            this.demandeList = data['response'].data;

            console.log('demande list', this.demandeList);

            this.store.dispatch(
              updatePagination({
                currentPage: data['response'].currentPage,
                pageSize: data['response'].pageSize,
                totalItems: data['response'].totalItems,
              })
            );
          },
          (error) => {
            this.spinner = false;
            console.log('error', error);
          }
        );
    });
  }

  refuseDicount(next_status, uuid) {
    let body = {
      next_status,
    };
    this.spinner = true;
    this.affretementService.refuseDiscount(body, uuid).subscribe((data) => {
      this.affretementService
        .getDemandeAffretement({ page: this.p, per_page: this.per_page })
        .subscribe(
          (data) => {
            this.spinner = false;
            this.demandeList = data['response'].data;

            console.log('demande list', this.demandeList);

            this.store.dispatch(
              updatePagination({
                currentPage: data['response'].currentPage,
                pageSize: data['response'].pageSize,
                totalItems: data['response'].totalItems,
              })
            );
          },
          (error) => {
            this.spinner = false;
            console.log('error', error);
          }
        );
    });
  }
  sweetAlertConfirmation(
    actions: {
      type: 'confirm-discount' | 'decline-discount';
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
      confirmButtonColor: alert_config.icon == 'error' ? 'red' : 'green',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        console.log('actions ... ', actions.params);
        if (actions.type === 'confirm-discount') {
          this.confirmDiscount(
            actions.params.data.next_status,
            actions.params.uuid
          );
        }
        if (actions.type === 'decline-discount') {
          this.refuseDicount(
            actions.params.data.next_status,
            actions.params.uuid
          );
        }
        // this.confirmQuoteVersion(actions.params);
        // if (actions.type === 'rollback-quote') this.rollbackConfirmQuoteVersion(actions.params);
        // if (actions.type === 'accept-quote') this.acceptQuoteVersion(actions.params)
        // if (actions.type === 'decline-quote') this.declineQuoteVersion(actions.params)
      }
    });
  }

  discountPreviewMode(demande) {
    let dialogref = this.dialog.open(DiscountDialogComponent, {
      panelClass: 'full-screen-dialog',
      maxWidth: '100vw',
      maxHeight: '100vh',
      width: '90vw',
      data: {
        preview_mode: true,
        demande_id: demande.id,
        calcul_details: demande.discounts[0]?.details,
        transport_rate: demande.discounts[0]?.transport_rate,
        global_service_rate: demande.discounts[0]?.global_service_rate,
        particular_service_rate: demande.discounts[0]?.particular_service_rate,
        transport_forfait: demande.discounts[0]?.transport_forfait,
        global_service_forfait: demande.discounts[0]?.global_service_forfait,
        particular_service_forfait:
          demande.discounts[0]?.particular_service_forfait,
        is_forfait: demande.discounts[0]?.is_forfait,
      },
    });
  }

  openConfirmDiscountPopUp(demande) {
    let title = 'Etes-vous sur(e) de valider ce remise ?';

    if (demande.discounts[0].is_forfait) {
      title = 'Etes-vous sur(e) de valider ce forfait ?';
    }

    this.sweetAlertConfirmation(
      {
        type: 'confirm-discount',
        params: {
          uuid: demande.discounts[0].uuid,
          data: {
            next_status: 'CREATED',
            demande: demande,
          },
        },
      },
      {
        title: title,
        icon: 'warning',
        confirmBtn: 'Je confirme',
        cancelButton: 'Annuler',
      }
    );
  }

  openDeclinePopUP(demande) {
    let title = 'Etes-vous sur(e) de refuser ce remise ?';

    if (demande.discounts[0].is_forfait) {
      title = 'Etes-vous sur(e) de refuser ce forfait ?';
    }

    this.sweetAlertConfirmation(
      {
        type: 'decline-discount',
        params: {
          uuid: demande.discounts[0].uuid,
          data: {
            next_status: 'CANCELED',
            demande: demande,
          },
        },
      },
      {
        title,
        icon: 'warning',
        confirmBtn: 'Je confirme',
        cancelButton: 'Annuler',
      }
    );
  }

  downloadDecleartion(id) {
    this.affretementService.downloadDecleration(id).subscribe((res) => {
      var blob = new Blob([res], { type: 'application/pdf' });
      var url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.click();
    });
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

    this.affretementService
      .getDemandeAffretement({
        filters: this.filters,
        per_page: this.per_page,
        page: paginator.nextPage,
      })
      .subscribe(
        (data) => {
          this.spinner = false;
          this.demandeList = data['response'].data;

          console.log('demande list', this.demandeList);

          this.store.dispatch(
            updatePagination({
              currentPage: data['response'].currentPage,
              pageSize: data['response'].pageSize,
              totalItems: data['response'].totalItems,
            })
          );
        },
        (error) => {
          console.log('error', error);
        }
      );
  }


  getRetourDocuments(point_dechargement) {
    let docs = [];

    point_dechargement.retour_documents.map((retour_doc) => {
      docs = [...docs, retour_doc.references_documents];
    });
    return docs;
  }

  getRetourFonds(points_dechargement) {
    let fonds = [];
    fonds = [...fonds, ...points_dechargement.retour_fonds];

    return fonds;
  }

  returnFonds = {
    CHECK: 'chèque',
    TRAIT: 'traite',
    ESPECE: 'espèce',
    CachOnDelivery: 'espèce',
  };
  
  getNumberPalettes(point_dechargement) {
    let somme = point_dechargement.item_envois?.reduce(function (acc, obj) {
      return acc + Number(obj?.nbr_palette);
    }, 0);
    
    console.log('somme  ....', somme);
    
    return somme;
  }
  
}
