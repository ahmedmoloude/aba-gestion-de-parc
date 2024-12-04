import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { Router } from '@angular/router';
import { ConventionDialogComponent } from 'app/modules/offer-commerciales/convention/convention-dialog/convention-dialog.component';
import { selectTreeDisableActionsAffretment, selectTreeOfferAffretment, selectTreeOutputConditionsAffretment } from 'app/core/store/tree-offer-affreetment/tree-offer-affreetment.selectors';
import { AffretmentConventionDialogComponent } from '../affretment-convention-dialog/affretment-convention-dialog.component';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { selectConvServicesAffretment, selectConvServicesFailureAffretment, selectConvServicesSuccessAffretment, treeOutput_allConditionsSevices_delete_affretment, treeOutput_deleteConditions_add_affretment, treeOutput_newConditions_add_affretment, treeOutput_newTemplateOffers_add_affretment } from 'app/core/store/tree-offer-affreetment/tree-offer-affreetment.actions';
import { TreeOfferHelper } from 'app/core/helpers/treeOffer.helper';
import { ToastService } from 'app/services';
@Component({
  selector: 'app-affretment-tree-header',
  templateUrl: './affretment-tree-header.component.html',
  styleUrls: ['./affretment-tree-header.component.css']
})
export class AffretmentTreeHeaderComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private store: Store<AppState>,
    private router: Router,
    public boGridService: BoGridService,
    private _treeHelper: TreeOfferHelper,
    private _toast : ToastService
  ) {}
  disableActions$ = this.store.select(selectTreeDisableActionsAffretment);
  offer = null;
  type_tree = null;

  conditionsOutput : any;

  ngOnInit(): void {

    this.store.select(selectTreeOutputConditionsAffretment).subscribe(res => this.conditionsOutput = res)

    this.type_tree = this.router.url.split('/')[1];
    this.store
      .select(selectTreeOfferAffretment)
      .subscribe((res) => {
        this.offer = res.commerciale_offer
        console.log('offer...' , this.offer)
      }
      );
  }

  openDialog(type_rubric: string): void {


    if (type_rubric == 'service-global') {

      this.store.dispatch(selectConvServicesAffretment())

      this.boGridService.getAffretmentDetailsServiesGlobal().subscribe((res) => {
        const data = res.response.grid; const conv_services = []; let cond_to_duplicate = [];

        this.store.dispatch(treeOutput_newTemplateOffers_add_affretment({ payload: { templatable_id: data.id, templatable_type: 'Grid', is_service: false } })) // todo remove this : add to templates_offers

        for (const rubric of data.services) {
          // add condition meta and transform tranches to conditions output
          for (const [idx, cond] of rubric.details.entries()) {
            this._treeHelper.addMetaToCondServices(cond, rubric.id, idx, 'GRD', false) // append meta to condition
            cond_to_duplicate = cond_to_duplicate.concat(this._treeHelper.formatTranchesToConditions(cond, data.id, 'public')) // format grouped tranches to conditions
          }

          let conv: any = { id: rubric.id, title: rubric.title, conditions: rubric.details }
          conv.parent_grid = { id: data.id, uuid: data.uuid, type: 'public', title: data.title }
          conv.meta_ = this._treeHelper.generateNodeMeta_({ type_rubric: 'SERV', type_grid: 'GRD', conv_id: rubric.id });
          conv_services.push(conv)
        }

        if (conv_services.length === 0) {
          this._toast.warn("Pas de services definies globalment !")
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
        
      })
      return;
    }
    this.dialog.open(AffretmentConventionDialogComponent, {
      disableClose: true,
      width: '831px',
      data: { type_rubric },
    });
  }

  isProspect() {
    if (this.type_tree == 'tree-offer-affretement') {
      return this.offer.customer?.is_prospect
    }
    else {
      return this.offer.quote_parent.customer?.is_prospect || false
    }
  }
}
