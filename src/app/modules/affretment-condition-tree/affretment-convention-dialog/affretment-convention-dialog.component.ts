import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {  Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TreeOfferHelper } from 'app/core/helpers/treeOffer.helper';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { BoOfferService } from 'app/core/services/admin-bo/bo-offers.service';
import { AppState } from 'app/core/store/app.states';
import { addConvTransportAffretment, addConvTransportSuccessAffretment, selectConvServicesAffretment, selectConvServicesFailureAffretment, selectConvServicesSuccessAffretment, treeOutput_allConditionsSevices_delete_affretment, treeOutput_deleteConditions_add_affretment, treeOutput_newConditions_add_affretment, treeOutput_newTemplateOffers_add_affretment } from 'app/core/store/tree-offer-affreetment/tree-offer-affreetment.actions';
import { selectConditionsHashAffretment, selectConventionsValidationAffretment, selectTreeOutputConditionsAffretment } from 'app/core/store/tree-offer-affreetment/tree-offer-affreetment.selectors';
import { ToastService } from 'app/services';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-affretment-convention-dialog',
  templateUrl: './affretment-convention-dialog.component.html',
  styleUrls: ['./affretment-convention-dialog.component.css']
})
export class AffretmentConventionDialogComponent implements OnInit {

  headerColumuns = ['Nom de template', 'Date de création'];
  p: number = 1;
  grids = null; selected_grids = []; type_selected_grid = null;
  isLoading = false;
  conv = null;
  conventionValidators: any;
  conditionsHash: string[];
  conditionsOutput: any;

  constructor(public dialogRef: MatDialogRef<AffretmentConventionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private store: Store<AppState>,
    public boOfferService: BoOfferService,
    public boGridService: BoGridService,
    private _toast: ToastService,
    private _treeHelper: TreeOfferHelper, private router: Router,) { }


  ngOnInit(): void {
    this.store.select(selectConventionsValidationAffretment).subscribe(res => this.conventionValidators = res);
    this.store.select(selectConditionsHashAffretment).subscribe(res => this.conditionsHash = res)
    this.store.select(selectTreeOutputConditionsAffretment).subscribe(res => this.conditionsOutput = res)

    this.isLoading = true;
    forkJoin({
      grids_public: this.boGridService.getAffretmentGrids()
    })
      .subscribe((res: any) => {
        const current_offer_uuid = this.router.url.split("/")[3]; //this._activatedRoute.snapshot.paramMap.get("uuid")
        // const offers = res.offers.response.filter((item: any) => item.uuid !== current_offer_uuid);
        const grids_public = res.grids_public.response;
        this.grids = { grids_public };
        this.isLoading = false;
      });
  }

  onSelectBaseGrid(event: any) {
    switch (this.grids && event?.target.value) {
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
      this.store.dispatch(addConvTransportAffretment());
      // 1 - get all grid details transport for this grid 
      // 2 - add condition

      this.boGridService.getGridDetailsAffretment(this.conv?.uuid, 1).subscribe((res: any) => {


          const data = res.response.grid;
          const convention = this.conv;
          const meta_ = this._treeHelper.generateNodeMeta_({ type_rubric: 'TRAN', type_grid: 'GRD', conv_id: convention.id })
          const node_conv = { id: convention.id, uuid: convention.uuid, type: this.type_selected_grid, title: convention.title, conditions: data?.services[0]?.details || [], meta_ }
          this.store.dispatch(treeOutput_newTemplateOffers_add_affretment({ payload: { templatable_id: convention.id, templatable_type: 'Grid', is_service: false } })) // todo remove this : add to templates_offers
          this.store.dispatch(addConvTransportSuccessAffretment({ payload: node_conv }))




  
          const conditions_to_add = JSON.parse(JSON.stringify(data?.services[0]?.details || [])) // deep clone object
          for (const [idx, cond] of conditions_to_add.entries()) {
            cond.type_parent = 'Grid';
            cond.parent_id = convention.id
            cond.rubric_id = cond?.rubric?.id
            this._treeHelper.addMetaToCondTransport(cond, data?.id, idx, 'GRD', false) // append meta to condition
          }
          // add condition to  tree output 
          this.store.dispatch(
            treeOutput_newConditions_add_affretment({ payload: conditions_to_add })
          );
      
      }, error => {
        this._toast.error("Erreur d'ajout de convention service !")
        this.store.dispatch(selectConvServicesFailureAffretment({ error }))
      })

    }

    if (this.type_selected_grid === 'offer') {
      // this.store.dispatch(addConvTransportAffretment()); const data = this.conv;
      // const meta_ = this._treeHelper.generateNodeMeta_({ type_rubric: 'TRAN', type_grid: 'OFFR', conv_id: data.id })
      // const conv_node = { id: data.id, uuid: data.uuid, type: this.type_selected_grid, title: data.reference, conditions: [], meta_ }
      // this.store.dispatch(addConvTransportSuccessAffretment({ payload: conv_node }))


    }

    this.dialogRef.close()

  }

  // Todo duplicated code refactor it 
  getServicesConvention() {
    // Todo if services not empty show waring alert 
    if (this.type_selected_grid === 'template' || this.type_selected_grid === 'public') {
      this.store.dispatch(selectConvServicesAffretment())
      this.boGridService.getAffretmentServicesByGrid(this.conv?.uuid).subscribe((res: any) => {
        const data = res.response.grid; const conv_services = []; let cond_to_duplicate = [];

        const convention = this.conv;

        this.store.dispatch(treeOutput_newTemplateOffers_add_affretment({ payload: { templatable_id: convention.id, templatable_type: 'Grid', is_service: true } })) // todo remove this : add to templates_offers

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
          this.store.dispatch(selectConvServicesFailureAffretment({ error: "Empty services !" })); return;
        }

        // // already saved conditions to delete
        // const deleted_ids = this.conditionsOutput.loaded_conditions
        //   .filter((item: any) => item.meta_.is_service).map((item: any) => item.id)
        // this.store.dispatch(treeOutput_deleteConditions_add_affretment({ payload: deleted_ids }))
        // // delete all conditions services
        // this.store.dispatch(treeOutput_allConditionsSevices_delete_affretment())


        console.log('conditions to duplicate ' ,cond_to_duplicate )

        // check unicity of conditions is not neccessary beacause it's already grouped
        this.store.dispatch(treeOutput_newConditions_add_affretment({ payload: cond_to_duplicate })) // duplication conditions 
        this.store.dispatch(selectConvServicesSuccessAffretment({ payload: conv_services }))
      }, error => {
        this._toast.error("Erreur d'ajout de convention service !")
        this.store.dispatch(selectConvServicesFailureAffretment({ error }))
      })
      this.dialogRef.close()
    }

    if (this.type_selected_grid === 'offer') {
      this.store.dispatch(selectConvServicesAffretment())
      this.boOfferService.getOfferDetails(this.conv?.uuid, 0).subscribe((res: any) => {
        const data = res.response.offer; const conv_services = []; let cond_to_duplicate = [];
        for (const [ rubric_index,rubric] of data.services) {
          // add condition meta and transform tranches to conditions output
          for (const [idx, cond] of rubric.details.entries()) {
            this._treeHelper.addMetaToCondServices(cond, rubric.id, idx, 'OFFR', false) // append meta to condition
            
            cond_to_duplicate = cond_to_duplicate.concat(this._treeHelper.formatTranchesToConditions(cond, data.id, this.type_selected_grid)) // format grouped tranches to conditions
          }

          let conv: any = { id: rubric.id, title: rubric.title, conditions: rubric.details }
          conv.parent_grid = { id: data.id, uuid: data.uuid, type: this.type_selected_grid, title: data.reference }
          conv.meta_ = this._treeHelper.generateNodeMeta_({ type_rubric: `SERV-${res.response.offer.id}`, type_grid: 'OFFR', conv_id: rubric.id });
          conv_services.push(conv)
        }
        if (conv_services.length === 0) {
          this._toast.warn("Pas de services definies dans cette offre !")
          this.store.dispatch(selectConvServicesFailureAffretment({ error: "Empty services !" })); return;
        }

        // already saved conditions to delete
        const deleted_ids = this.conditionsOutput.loaded_conditions
          .filter((item: any) => item.meta_.is_service).map((item: any) => item.id)
        this.store.dispatch(treeOutput_deleteConditions_add_affretment({ payload: deleted_ids }))
        // delete all conditions services
        this.store.dispatch(treeOutput_allConditionsSevices_delete_affretment())

        // check unicity of conditions is not neccessary beacause it's already grouped
        this.store.dispatch(treeOutput_newConditions_add_affretment({ payload: cond_to_duplicate })) // duplication conditions 
        this.store.dispatch(selectConvServicesSuccessAffretment({ payload: conv_services }))
      }, error => {
        this._toast.error("Erreur d'ajout de convention service !")
        this.store.dispatch(selectConvServicesFailureAffretment({ error }))
      })
      this.dialogRef.close()
    }
  }

  onSelectConvention() {

    console.log('convention selected ...');
    // check grid already added , one public grid , service , offer, one template by activity sector
    if (this.dialogData.type_rubric === 'transport') {
      if (this.type_selected_grid === 'offer' && this.conventionValidators.conv_types.includes(this.type_selected_grid)) {
        this._toast.warn("Attention, un seul heritage d'offre commerciale est autorisé !"); return;
      }
      // if (this.type_selected_grid === 'public' && this.conventionValidators.conv_types.includes(this.type_selected_grid)) {
      //   this._toast.warn("Attention, une seul heritage de grille standard est autorisé !"); return;
      // }
    }


    console.log('rubric type' , this.dialogData.type_rubric )
    if (this.dialogData.type_rubric === 'transport') this.getTransportConvention()
    if (this.dialogData.type_rubric === 'services') this.getServicesConvention()
    // toaster error msg
  }
}
