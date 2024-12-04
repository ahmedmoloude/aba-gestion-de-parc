import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TreeOfferHelper } from 'app/core/helpers/treeOffer.helper';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { BoOfferService } from 'app/core/services/admin-bo/bo-offers.service';
import { AppState } from 'app/core/store/app.states';
import { addConvTransport, addConvTransportFailure, addConvTransportSuccess, selectConvServices, selectConvServicesFailure, selectConvServicesSuccess, treeOutput_allConditionsSevices_delete, treeOutput_deleteConditions_add, treeOutput_newConditions_add, treeOutput_newTemplateOffers_add } from 'app/core/store/tree-offer/tree-offer.actions';
import { selectConditionsHash, selectConventionsValidation, selectTreeOutputConditions } from 'app/core/store/tree-offer/tree-offer.selectors';
import { ToastService } from 'app/services';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-convention-dialog',
  templateUrl: './convention-dialog.component.html',
  styleUrls: ['./convention-dialog.component.css'],
})
export class ConventionDialogComponent implements OnInit {
  headerColumuns = ['Nom de template', 'Date de création'];
  p: number = 1;
  grids = null; selected_grids = []; type_selected_grid = null;
  isLoading = false;
  conv = null;
  conventionValidators: any;
  conditionsHash: string[];
  conditionsOutput: any;

  constructor(public dialogRef: MatDialogRef<ConventionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private store: Store<AppState>,
    public boOfferService: BoOfferService,
    public boGridService: BoGridService,
    private _toast: ToastService,
    private _treeHelper: TreeOfferHelper, private router: Router,) { }


  ngOnInit(): void {
    this.store.select(selectConventionsValidation).subscribe(res => this.conventionValidators = res);
    this.store.select(selectConditionsHash).subscribe(res => this.conditionsHash = res)
    this.store.select(selectTreeOutputConditions).subscribe(res => this.conditionsOutput = res)

    this.isLoading = true;
    forkJoin({
      offers: this.boOfferService.fetchAllOffers(),
      grids_template: this.boGridService.fetchListGrids('TEMPLATE'),
      grids_public: this.boGridService.fetchListGrids('PUBLIC')
    })
      .subscribe((res: any) => {
        const current_offer_uuid = this.router.url.split("/")[3]; //this._activatedRoute.snapshot.paramMap.get("uuid")
        const offers = res.offers.response.filter((item: any) => item.uuid !== current_offer_uuid);
        const grids_template = res.grids_template.response;
        const grids_public = res.grids_public.response;
        this.grids = { offers, grids_public, grids_template };

        this.selected_grids = [...grids_template];
        this.type_selected_grid = "template";
        this.isLoading = false;
      });
  }

  onSelectBaseGrid(event: any) {
    switch (this.grids && event?.target.value) {
      case 'template':
        this.selected_grids = [...this.grids.grids_template];
        this.type_selected_grid = "template";
        break;
      case 'public':
        this.selected_grids = [...this.grids.grids_public];
        this.type_selected_grid = "public";
        break;
      case 'offer':
        this.selected_grids = [...this.grids.offers];
        this.type_selected_grid = "offer";
        break;
      default:
        break;
    }
    this.conv = null;
  }

  // TODO duplicated code refactor it 
  getTransportConvention() {
    if (this.type_selected_grid === 'template' || this.type_selected_grid === 'public') {
      this.store.dispatch(addConvTransport()); const data = this.conv;
      const meta_ = this._treeHelper.generateNodeMeta_({ type_rubric: 'TRAN', type_grid: 'GRD', conv_id: data.id })
      const node_conv = { id: data.id, uuid: data.uuid, type: this.type_selected_grid, title: data.title, conditions: [], meta_ }
      this.store.dispatch(treeOutput_newTemplateOffers_add({ payload: { templatable_id: data.id, templatable_type: 'Grid', is_service: false } })) // todo remove this : add to templates_offers
      this.store.dispatch(addConvTransportSuccess({ payload: node_conv }))

      // heritage of conditions
      // this.store.dispatch(addConvTransport()); 
      // this.boGridService.getGridDetails(this.conv?.uuid, 1).subscribe((res: any) => {
      //   const data = res.response;
      //   const meta_ = this._treeHelper.generateNodeMeta_({ type_rubric: 'TRAN', type_grid: 'GRD', conv_id: data.id })

      //   const conv = {
      //     id: data.id, uuid: data.uuid, type: this.type_selected_grid, title: data.title,
      //     conditions: this.type_selected_grid === "public" ? [] : [...data.details], meta_
      //   }
      //   if (data.details.length === 0) {
      //     this._toast.warn("Pas de conditions definies dans cette grille !")
      //     this.store.dispatch(addConvTransportFailure({ error: "Empty conditions !" })); return;
      //   }

      //   this.store.dispatch(treeOutput_newTemplateOffers_add({ payload: { templatable_id: data.id, templatable_type: 'Grid', is_service: false } })) // add to templates_offers
      //   this.store.dispatch(addConvTransportSuccess({ payload: conv }))
      // }, error => {
      //   this._toast.error("Erreur d'ajout de convention transport !")
      //   this.store.dispatch(addConvTransportFailure({ error }))
      // })

      this.dialogRef.close()
    }

    if (this.type_selected_grid === 'offer') {
      this.store.dispatch(addConvTransport()); const data = this.conv;
      const meta_ = this._treeHelper.generateNodeMeta_({ type_rubric: 'TRAN', type_grid: 'OFFR', conv_id: data.id })
      const conv_node = { id: data.id, uuid: data.uuid, type: this.type_selected_grid, title: data.reference, conditions: [], meta_ }
      this.store.dispatch(addConvTransportSuccess({ payload: conv_node }))

      // duplication of conditions
      // this.store.dispatch(addConvTransport())
      // this.boOfferService.getOfferDetails(this.conv?.uuid, 1).subscribe((res: any) => {
      //   const data = res.response; let cond_to_duplicate = [];
      //   // add condition meta and transform tranches to conditions output
      //   for (const [idx, cond] of data.details.entries()) {
      //     this._treeHelper.addMetaToCondTransport(cond, data.id, idx, 'OFFR', false) // append meta to condition
      //     cond_to_duplicate = cond_to_duplicate.concat(this._treeHelper.formatTranchesToConditions(cond, data.id, this.type_selected_grid)) // format grouped tranches to conditions
      //   }

      //   const meta_ = this._treeHelper.generateNodeMeta_({ type_rubric: 'TRAN', type_grid: 'OFFR', conv_id: data.id })
      //   const conv = {
      //     id: data.id, uuid: data.uuid, type: this.type_selected_grid, title: data.reference,
      //     conditions: [...data.details], meta_
      //   }

      //   // check if convention conditions is empty
      //   if (conv.conditions.length === 0) {
      //     this._toast.warn("Pas de conditions definies dans cette offre commerciale !")
      //     this.store.dispatch(addConvTransportFailure({ error: "Empty conditions !" })); return;
      //   }

      //   // check unicity of conditions  
      //   const cond_already_exists = cond_to_duplicate.filter(item => this.conditionsHash.includes(item.meta_.cond_hash))
      //   cond_to_duplicate = cond_to_duplicate.filter(item => !this.conditionsHash.includes(item.meta_.cond_hash)) // remove conditions with existant hash 
      //   conv.conditions = conv.conditions.filter(item => !this.conditionsHash.includes(item.meta_.cond_hash)) // remove conditions nodes with existant hash 

      //   // check if convention conditions is empty after filter
      //   if (conv.conditions.length === 0) {
      //     this._toast.warn("Attention, toutes les conditions sont deja existantes dans l'offre commerciale !")
      //     this.store.dispatch(addConvTransportFailure({ error: "Empty conditions !" })); return;
      //   }
      //   if (cond_already_exists.length !== 0)
      //     this._toast.warn("Attention, certains conditions sont deja existantes dans l'offre commerciale !");

      //   this.store.dispatch(treeOutput_newConditions_add({ payload: cond_to_duplicate })) // duplication conditions
      //   this.store.dispatch(addConvTransportSuccess({ payload: conv }))
      // }, error => {
      //   this._toast.error("Erreur d'ajout de convention transport !")
      //   this.store.dispatch(addConvTransportFailure({ error }))
      // })

      this.dialogRef.close()
    }
  }

  // Todo duplicated code refactor it 
  getServicesConvention() {
    // Todo if services not empty show waring alert 
    if (this.type_selected_grid === 'template' || this.type_selected_grid === 'public') {
      this.store.dispatch(selectConvServices())
      this.boGridService.getGridDetails(this.conv?.uuid, 0).subscribe((res: any) => {
        const data = res.response.grid; const conv_services = []; let cond_to_duplicate = [];
        for (const rubric of data.services) {
          // add condition meta and transform tranches to conditions output
          for (const [idx, cond] of rubric.details.entries()) {
            this._treeHelper.addMetaToCondServices(cond, rubric.id, idx, 'GRD', false) // append meta to condition
            cond_to_duplicate = cond_to_duplicate.concat(this._treeHelper.formatTranchesToConditions(cond, data.id, this.type_selected_grid)) // format grouped tranches to conditions
          }

          let conv: any = { id: rubric.id, title: rubric.title, conditions: rubric.details }
          conv.parent_grid = { id: data.id, uuid: data.uuid, type: this.type_selected_grid, title: data.title }
          conv.meta_ = this._treeHelper.generateNodeMeta_({ type_rubric: 'SERV', type_grid: 'GRD', conv_id: rubric.id });
          conv_services.push(conv)
        }
        if (conv_services.length === 0) {
          this._toast.warn("Pas de services definies dans cette grille !")
          this.store.dispatch(selectConvServicesFailure({ error: "Empty services !" })); return;
        }

        // already saved conditions to delete
        const deleted_ids = this.conditionsOutput.loaded_conditions
          .filter((item: any) => item.meta_.is_service).map((item: any) => item.id)
        this.store.dispatch(treeOutput_deleteConditions_add({ payload: deleted_ids }))
        // delete all conditions services
        this.store.dispatch(treeOutput_allConditionsSevices_delete())

        // check unicity of conditions is not neccessary beacause it's already grouped
        this.store.dispatch(treeOutput_newConditions_add({ payload: cond_to_duplicate })) // duplication conditions 
        this.store.dispatch(selectConvServicesSuccess({ payload: conv_services }))
      }, error => {
        this._toast.error("Erreur d'ajout de convention service !")
        this.store.dispatch(selectConvServicesFailure({ error }))
      })
      this.dialogRef.close()
    }

    if (this.type_selected_grid === 'offer') {
      this.store.dispatch(selectConvServices())
      this.boOfferService.getOfferDetails(this.conv?.uuid, 0).subscribe((res: any) => {
        const data = res.response.offer; const conv_services = []; let cond_to_duplicate = [];
        for (const rubric of data.services) {
          // add condition meta and transform tranches to conditions output
          for (const [idx, cond] of rubric.details.entries()) {
            this._treeHelper.addMetaToCondServices(cond, rubric.id, idx, 'OFFR', false) // append meta to condition
            cond_to_duplicate = cond_to_duplicate.concat(this._treeHelper.formatTranchesToConditions(cond, data.id, this.type_selected_grid)) // format grouped tranches to conditions
          }

          let conv: any = { id: rubric.id, title: rubric.title, conditions: rubric.details }
          conv.parent_grid = { id: data.id, uuid: data.uuid, type: this.type_selected_grid, title: data.reference }
          conv.meta_ = this._treeHelper.generateNodeMeta_({ type_rubric: 'SERV', type_grid: 'OFFR', conv_id: rubric.id });
          conv_services.push(conv)
        }
        if (conv_services.length === 0) {
          this._toast.warn("Pas de services definies dans cette offre !")
          this.store.dispatch(selectConvServicesFailure({ error: "Empty services !" })); return;
        }

        // already saved conditions to delete
        const deleted_ids = this.conditionsOutput.loaded_conditions
          .filter((item: any) => item.meta_.is_service).map((item: any) => item.id)
        this.store.dispatch(treeOutput_deleteConditions_add({ payload: deleted_ids }))
        // delete all conditions services
        this.store.dispatch(treeOutput_allConditionsSevices_delete())

        // check unicity of conditions is not neccessary beacause it's already grouped
        this.store.dispatch(treeOutput_newConditions_add({ payload: cond_to_duplicate })) // duplication conditions 
        this.store.dispatch(selectConvServicesSuccess({ payload: conv_services }))
      }, error => {
        this._toast.error("Erreur d'ajout de convention service !")
        this.store.dispatch(selectConvServicesFailure({ error }))
      })
      this.dialogRef.close()
    }
  }

  onSelectConvention() {
    // check grid already added , one public grid , service , offer, one template by activity sector
    if (this.dialogData.type_rubric === 'transport') {
      if (this.type_selected_grid === 'offer' && this.conventionValidators.conv_types.includes(this.type_selected_grid)) {
        this._toast.warn("Attention, un seul heritage d'offre commerciale est autorisé !"); return;
      }
      if (this.type_selected_grid === 'public' && this.conventionValidators.conv_types.includes(this.type_selected_grid)) {
        this._toast.warn("Attention, une seul heritage de grille standard est autorisé !"); return;
      }

      if (this.type_selected_grid === 'template' && this.conventionValidators.templates_ids.includes(this.conv?.id)) {
        this._toast.warn("Attention, cette template est deja existant !"); return;
      }
      // todo check if same template sector already added
      // if (this.type_selected_grid === 'template' && this.conventionValidators.templates_sector_ids.includes(this.conv?.sector_id)) {
      //   this._toast.warn("Attention, une template de secteur similaire est deja existant !"); return;
      // }
    }

    if (this.dialogData.type_rubric === 'transport') this.getTransportConvention()
    if (this.dialogData.type_rubric === 'services') this.getServicesConvention()
    // toaster error msg
  }
}
