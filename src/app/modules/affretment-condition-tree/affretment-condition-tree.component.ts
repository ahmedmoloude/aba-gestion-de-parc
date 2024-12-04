import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ROUTES } from 'app/config';
import { NavigationHelper } from 'app/core';
import { TreeOfferHelper } from 'app/core/helpers/treeOffer.helper';
import { BoOfferService } from 'app/core/services/admin-bo/bo-offers.service';
import { BoQuoteService } from 'app/core/services/admin-bo/bo-quotes.service';
import { AppState } from 'app/core/store/app.states';
import { HandtoolDirective } from 'app/handtool.directive';

import { ToastService } from 'app/services';
import { selectEnvPayloadService } from 'app/core/store/service/service.selectors';
import { fetchTreeOfferAffretment, fetchTreeOfferSuccessAffretment, resetTreeOfferAffretment, setTreeOfferModeAffretment, treeOfferActionFailureAffretment } from 'app/core/store/tree-offer-affreetment/tree-offer-affreetment.actions';
import { selectTreeDisableActionsAffretment, selectTreeLoadingServicesAffretment, selectTreeOfferAffretment, selectTreeOfferIsLoadingAffretment, selectTreeOutputOfferAffretment } from 'app/core/store/tree-offer-affreetment/tree-offer-affreetment.selectors';
import { PermissionService } from 'app/core/services/permission.service';

@Component({
  selector: 'app-affretment-condition-tree',
  templateUrl: './affretment-condition-tree.component.html',
  styleUrls: ['./affretment-condition-tree.component.css']
})
export class AffretmentConditionTreeComponent implements OnInit {

  @ViewChild('orgContainer', { static: true }) orgContainer: ElementRef;
  @ViewChild(HandtoolDirective) handtool:HandtoolDirective;
  zoomIcrement = 0.1;
  zoomScale = 1;
  collapsedconv = true;
  collapsedcond = false;

  offerTree = null;
  isLoadingServices$ = this.store.select(selectTreeLoadingServicesAffretment);
  isLoadingTree$ = this.store.select(selectTreeOfferIsLoadingAffretment);
  disableActions$ = this.store.select(selectTreeDisableActionsAffretment);
  isLoadingOfferDetailsSave = false;
  offerUuid = null; mode = null; type_tree = null;

  constructor(
    private store: Store<AppState>,
    public boOfferService: BoOfferService,
    public boQuoteService: BoQuoteService,
    private _toast: ToastService,
    private _navigationHelper: NavigationHelper,
    private _activatedRoute: ActivatedRoute,
    private router: Router,
    private _treeHelper: TreeOfferHelper,
    public permissionService: PermissionService
  ) { }

  ngOnInit(): void {
    this.store.dispatch(resetTreeOfferAffretment()); // clear cache
    this.type_tree = this.router.url.split('/')[1]; const mode_tree = this.router.url.split('/')[2];
    this.mode = mode_tree === 'create' ? 'CREATE' : mode_tree === 'update' ? 'UPDATE' : 'READ';
    const disableActions = this.mode === 'READ' ? true : false;
    this.store.dispatch(setTreeOfferModeAffretment({ mode: this.mode, disableActions }));

    // fetch offer commercial data
    this.offerUuid = this._activatedRoute.snapshot.paramMap.get('uuid');
    this.store.dispatch(fetchTreeOfferAffretment());

    // // fetch offer
    if (this.type_tree === "tree-offer-affretement") {
      this.boOfferService.getOffer(this.offerUuid).subscribe(
        (res: any) => {
          const payload = res.response; console.log(payload);

          // // redirect to update mode
          // if (mode_tree === 'create' && (payload.transport.length !== 0 && payload.services.length !== 0)) {
          //   this.router.navigate(['tree-offer-affretement/update/' + this.offerUuid]); return;
          // }

          // // redirect to create mode
          // if (mode_tree === 'update' && payload.transport.length === 0 && payload.services.length === 0) {
          //   this.router.navigate(['tree-offer-affretement/create/' + this.offerUuid]); return;
          // }

          const prepared_data = this._treeHelper.prepareTreeDataToLoad(payload);
          this.store.dispatch(fetchTreeOfferSuccessAffretment({ payload: prepared_data }));
        },
        (error) => {
          this._toast.error('Offre commerciale est introuvable !');
          this._navigationHelper.navigate(ROUTES['offercommerciales'].name);
          this.store.dispatch(treeOfferActionFailureAffretment({ error }));
        }
      );
    }

    // fetch quote
    if (this.type_tree === "tree-quote-affretement") {
      // this.boQuoteService.getQuoteTree(this.offerUuid).subscribe(
      //   (res: any) => {
      //     const payload = res.response; console.log(payload);

      //     //* quote is not last version ( readonly )
      //     if (!payload.commerciale_offer.is_last_version && ['create', 'update'].includes(mode_tree)) {
      //       this.router.navigate(['tree-quote/details/' + this.offerUuid]); return;
      //     }

      //     // //* quote is last version and status == accepted or rejected or created ( readonly )
      //     if (payload.commerciale_offer.is_last_version && ['ACCEPTED', 'REJECTED', 'CREATED'].includes(payload.commerciale_offer.status)
      //       && ['create', 'update'].includes(mode_tree)) {
      //       this.router.navigate(['tree-quote/details/' + this.offerUuid]); return;
      //     }

      //     //* quote is last version and status == draft ( read , create , update )
      //     if (payload.commerciale_offer.is_last_version && payload.commerciale_offer.status === "DRAFT") {
      //       // redirect to update mode
      //       if (mode_tree === 'create' && (payload.transport.length !== 0 && payload.services.length !== 0)) {
      //         this.router.navigate(['tree-quote/update/' + this.offerUuid]); return;
      //       }
      //       // redirect to create mode
      //       if (mode_tree === 'update' && payload.transport.length === 0 && payload.services.length === 0) {
      //         this.router.navigate(['tree-quote/create/' + this.offerUuid]); return;
      //       }
      //     }
      //   },
      //   (error) => {
      //     this._toast.error('Devis est introuvable !');
      //     this._navigationHelper.navigate(ROUTES['devis'].name);
      //     this.store.dispatch(treeOfferActionFailure({ error }));
      //   }
      // );

      // const prepared_data = this._treeHelper.prepareTreeDataToLoad(payload);

      let prepared_data = {
        commerciale_offer : {
          quote_parent : {
            reference : 'AF-1',
            customer : {
               name : 'Ahmed moloude',
            }
          },
          status : 'DRAFT',
          version : 'V1',
          end_date : '2023-10-12',
          start_date : '2023-10-12'
        },
        services : [],
        transport : []
      }


      this.store.dispatch(fetchTreeOfferSuccessAffretment({ payload: prepared_data }));
    }
    this.store.select(selectTreeOfferAffretment).subscribe((res) =>{

        console.log('response received' , res);
        this.offerTree = res
       }
    );
  }

  saveOnCreateMode() {
    const params = { templates_offers: [], conditions: [] }; let services = []; let transport = [];
    this.store.select(selectTreeOutputOfferAffretment).subscribe(res => {
      params.templates_offers = res.add.templates_offers; params.conditions = res.add.conditions
      services = res.add.conditions.filter(item => item.meta_.is_service)
      transport = res.add.conditions.filter(item => !item.meta_.is_service)
    })
    // if (services.length === 0) { this._toast.warn("Pas de services definies !"); return; }
    // if (transport.length === 0) { this._toast.warn("Pas de conditions de transport definies !"); return; }
    this.store.select(selectEnvPayloadService).subscribe(res => {
      // if(services.length != res.length){
      //   this._toast.warn("Merci de remplir tous les services !"); return
      // }
      // else {
        if (params.conditions.length !== 0) {
          this.isLoadingOfferDetailsSave = true;

          // save offer details
          if (this.type_tree === "tree-offer-affretement") {
            this.boOfferService.updateOfferDetailsAffertment(this.offerUuid, params).subscribe(
              (res) => {
                this._toast.success('Offre commerciale crée avec succéss !'); this._navigationHelper.navigate(ROUTES['offercommerciales'].name);
                this.store.dispatch(resetTreeOfferAffretment()); this.isLoadingOfferDetailsSave = false;
              },
              (error) => { this._toast.warn('Une erreur est survenu !'); this.isLoadingOfferDetailsSave = false; }
            );
          }

          // // save devis details
          // if (this.type_tree === "tree-quote") {
          //   this.boQuoteService.updateQuoteDetails(this.offerUuid, params).subscribe(
          //     (res) => {
          //       this._toast.success('Devis crée avec succéss !'); this._navigationHelper.navigate(ROUTES['devis'].name);
          //       this.store.dispatch(resetTreeOfferAffretment()); this.isLoadingOfferDetailsSave = false;
          //     },
          //     (error) => { this._toast.warn('Une erreur est survenu !'); this.isLoadingOfferDetailsSave = false; }
          //   );
          // }
        } else {
          this._toast.warn('Pas de conditions renseigner !');
        }
      // }
    })


  }
  // saveOnUpdateMode() {
  //   const params = { templates_offers: [], added: [], deleted: [] }; let services = []; let transport = [];
  //   this.store.select(selectTreeOutputOffer).subscribe(res => {
  //     params.templates_offers = res.add.templates_offers; params.added = res.add.conditions; params.deleted = res.delete.conditions
  //     services = res.add.conditions.concat(res.saved.conditions).filter(item => item.meta_.is_service)
  //     transport = res.add.conditions.concat(res.saved.conditions).filter(item => !item.meta_.is_service)
  //   })
  //   console.log('SERVICES', services)
  //   this.store.select(selectEnvPayloadService).subscribe(res => {
  //     // if(services.length != res.length){
  //     //   this._toast.warn("Merci de remplir tous les services !"); return
  //     // }
  //     // else {
  //       if (services.length === 0) { this._toast.warn("Pas de services definies !"); return; }
  //   if (transport.length === 0) { this._toast.warn("Pas de conditions de transport definies !"); return; }


  //   if (params.added.length !== 0 || params.deleted.length !== 0) {
  //     this.isLoadingOfferDetailsSave = true;

  //     // save offer details
  //     if (this.type_tree === "tree-offer") {
  //       this.boOfferService.updateOfferDetails(this.offerUuid, params).subscribe(
  //         (res) => {
  //           this._toast.success('Offre commerciale modifié avec succéss !'); this._navigationHelper.navigate(ROUTES['offercommerciales'].name);
  //           this.store.dispatch(resetTreeOffer()); this.isLoadingOfferDetailsSave = false;
  //         },
  //         (error) => { this._toast.warn('Une erreur est survenu !'); this.isLoadingOfferDetailsSave = false; }
  //       );
  //     }

  //     // save devis details
  //     if (this.type_tree === "tree-quote") {
  //       this.boQuoteService.updateQuoteDetails(this.offerUuid, params).subscribe(
  //         (res) => {
  //           this._toast.success('Devis modifié avec succéss !'); this._navigationHelper.navigate(ROUTES['devis'].name);
  //           this.store.dispatch(resetTreeOffer()); this.isLoadingOfferDetailsSave = false;
  //         },
  //         (error) => { this._toast.warn('Une erreur est survenu !'); this.isLoadingOfferDetailsSave = false; }
  //       );
  //     }

  //   } else {
  //     this._toast.warn('Offre commerciale non modifié !');
  //   }
  //     // }
  //   })
  //   // console.log('SAVED', res.add.conditions)

  //   // check if at least one services and tranport

  // }
  saveOfferTree() {
    if (this.mode === 'CREATE') {
      this.saveOnCreateMode();
    }
    // if (this.mode === 'UPDATE') {
    //   this.saveOnUpdateMode();
    // }
  }

  zoomIn(){
    this.handtool.zoomIn();
  }
  zoomOut(){
    this.handtool.zoomOut();
  }
  reinit(){
    this.handtool.reinit()
  }

}
