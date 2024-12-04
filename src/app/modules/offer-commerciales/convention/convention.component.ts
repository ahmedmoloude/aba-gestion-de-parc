import { ConditionDialogComponent } from './../condition/condition-dialog/condition-dialog.component';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import {
  removeConvTransport,
  treeOutput_deleteConditions_add,
  treeOutput_newConditions_delete,
  treeOutput_newTemplateOffers_delete,
  treeOutput_savedConditions_delete,
} from 'app/core/store/tree-offer/tree-offer.actions';
import {
  selectTreeDisableActions,
  selectTreeOfferServices,
  selectTreeOfferTransport,
  selectTreeOutputConditions,
} from 'app/core/store/tree-offer/tree-offer.selectors';

@Component({
  selector: 'app-convention',
  templateUrl: './convention.component.html',
  styleUrls: ['./convention.component.css'],
})
export class ConventionComponent implements OnInit {
  @Input() grid: any;
  @Input() position: number;
  @Input() rubric_type: string; // transport , services , services-parent
  disableActions$ = this.store.select(selectTreeDisableActions);
  services$ = this.store.select(selectTreeOfferServices); // services nodes
  conditionsOutput: any;

  expand = true;
  constructor(public dialog: MatDialog, private store: Store<AppState>) {
    this.store
      .select(selectTreeOutputConditions)
      .subscribe((res) => (this.conditionsOutput = res));
  }

  ngOnInit(): void {}
  openConditionDialog(editMode: boolean): void {
    this.dialog.open(ConditionDialogComponent, {
      disableClose: true,
      width: '1000px',
      data: {
        position_conv: this.position, // convention position
        position_cond: this.grid.conditions.length, // condition position
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
        editData: null, // editMode is false
      },
    });
  }

  // used only in transport case
  onDeleteConvention() {
    // case: condition is already saved
    const deleted_ids = this.conditionsOutput.loaded_conditions
      .filter((item: any) => item.meta_.conv_id === this.grid?.meta_?.conv_id)
      .map((item: any) => item.id);
    this.store.dispatch(
      treeOutput_deleteConditions_add({ payload: deleted_ids })
    );
    // remove all conditions of convention from tree loaded output
    this.store.dispatch(
      treeOutput_savedConditions_delete({ conv_id: this.grid?.meta_?.conv_id })
    );

    // case: condition is a new condition to save
    // remove all conditions of convention from tree new output
    this.store.dispatch(
      treeOutput_newConditions_delete({ conv_id: this.grid?.meta_?.conv_id })
    );

    // remove template_id from offers templates
    this.store.dispatch(
      treeOutput_newTemplateOffers_delete({ templatable_id: this.grid?.id })
    );

    this.store.dispatch(removeConvTransport({ idx: this.position }));
  }
}
