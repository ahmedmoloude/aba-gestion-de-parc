import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import {
  recreateMetaAfterDeleteCondition,
  removeConditionServices,
  removeConditionTransport,
  removeConvTransport,
  treeOutput_deleteConditions_add,
  treeOutput_newConditions_delete,
  treeOutput_newTemplateOffers_delete,
  treeOutput_savedConditions_delete,
} from 'app/core/store/tree-offer/tree-offer.actions';
import {
  selectConditionsMetaIds,
  selectTreeDisableActions,
  selectTreeOutputConditions,
} from 'app/core/store/tree-offer/tree-offer.selectors';
import { ConditionDialogComponent } from './condition-dialog/condition-dialog.component';

@Component({
  selector: 'app-condition',
  templateUrl: './condition.component.html',
  styleUrls: ['./condition.component.css'],
})
export class ConditionComponent implements OnInit {
  @Input() grid: any; // used only in condition dialog
  @Input() position_conv: number;
  @Input() position: number;
  @Input() rubric_type: string;
  @Input() condition: any;
  disableActions$ = this.store.select(selectTreeDisableActions);
  conditionsOutput: any;
  conditionsMetaIds: string[]; // meta_ids of all conditions
  loadedConditionsMetaIds: string[]; // meta_ids of saved conditions


  tranche_headres: string[] = ['De', 'À', 'Type de valeur' , 'Valeur'  , 'Minimum par expedition' ,  'Maximum par expedition', 'Minimum par colis'];
  tranches_visible: boolean = true;

  constructor(public dialog: MatDialog, private store: Store<AppState>) {}


  get filterHeaders(){
    let basis_calcul_is_weight = this.condition?.basis_calcul?.title_affichage === 'Poids'
    return basis_calcul_is_weight ?  this.tranche_headres :  this.tranche_headres.filter((e) => e !== 'Minimum par colis')
  }

  ngOnInit(): void {
    console.log('condition' , this.condition)
    this.store
      .select(selectTreeOutputConditions)
      .subscribe((res) => (this.conditionsOutput = res));
    this.store.select(selectConditionsMetaIds).subscribe((res) => {
      this.conditionsMetaIds = res.all;
      this.loadedConditionsMetaIds = res.loaded;
    });
  }

  openConditionDialog(editMode: boolean): void {
    this.dialog.open(ConditionDialogComponent, {
      disableClose: true,
      width: '1000px',
      data: {
        position_conv: this.position_conv, // convention position
        position_cond: this.position, // condition position
        conv_title: this.grid?.title,
        conv_id:
          this.rubric_type === 'transport'
            ? this.grid?.id
            : this.grid?.parent_grid?.id,
        conv_type:
          this.rubric_type === 'transport'
            ? this.grid?.type
            : this.grid?.parent_grid?.type,
        rubric_id: this.rubric_type === 'transport' ? 1 : this.grid?.id,
        rubric_type: this.rubric_type,
        editMode,
        editData: this.condition, // editMode is true
      },
    });
  }

  onDeleteCondition() {
    // case: condition is already saved
    if (this.loadedConditionsMetaIds.includes(this.condition?.meta_?.cond_id)) {
      // add it to conditions to delete
      const deleted_ids = this.conditionsOutput.loaded_conditions
        .filter(
          (item: any) => item.meta_.cond_id === this.condition?.meta_?.cond_id
        )
        .map((item: any) => item.id);
      this.store.dispatch(
        treeOutput_deleteConditions_add({ payload: deleted_ids })
      );

      // delete it from loaded conditions
      this.store.dispatch(
        treeOutput_savedConditions_delete({
          cond_id: this.condition?.meta_?.cond_id,
        })
      );
    } else {
      // case: condition is a new condition to save
      this.store.dispatch(
        treeOutput_newConditions_delete({
          cond_id: this.condition?.meta_?.cond_id,
        })
      );
    }

    if (this.rubric_type === 'transport') {
      this.store.dispatch(
        removeConditionTransport({
          idx_convention: this.position_conv,
          idx: this.position,
        })
      );
    }
    if (this.rubric_type === 'services') {
      this.store.dispatch(
        removeConditionServices({
          idx_convention: this.position_conv,
          idx: this.position,
        })
      );
    }

    // recreate meta ids
    this.store.dispatch(
      recreateMetaAfterDeleteCondition({
        deleted_idx: this.position,
        conv_meta: this.grid?.meta_?.conv_id,
        entity: 'output',
      })
    );
    this.store.dispatch(
      recreateMetaAfterDeleteCondition({
        deleted_idx: this.position,
        idx_convention: this.position_conv,
        entity: this.rubric_type,
      })
    );

    // if last condition and grid is template or offer and rubric is transport remove convention node
    if (
      this.grid.conditions.length === 1 &&
      this.rubric_type === 'transport' &&
      (this.grid?.type === 'offer' || this.grid?.type === 'template')
    ) {
      this.store.dispatch(removeConvTransport({ idx: this.position_conv }));
      this.store.dispatch(
        treeOutput_newTemplateOffers_delete({ templatable_id: this.grid?.id })
      ); // remove template_id from offers templates
    }

    // ** if last condition herited remove id_template from template_offers **
  }


  // TODO add to helper 
  formatCurrency(value) {
    if (value) {
        return  Number(value).toLocaleString("fr-FR") || value;    
    }
    return '-';
  }

  getPourcentage(value) {
    let pourcentage = value * 100;

    if (isNaN(pourcentage)) {
      return 0;
    }
    return this.round(pourcentage , 2) ;
  }

  round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }
}
