import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TreeOfferHelper } from 'app/core/helpers/treeOffer.helper';
import { BoOfferService } from 'app/core/services/admin-bo/bo-offers.service';
import { AppState } from 'app/core/store/app.states';
import {
  selectCategoriesProducts,
  selectCitiesAndCategories,
  selectRubricAndCalculBasis,
} from 'app/core/store/resources/resources.selectors';
import {
  addConditionServices,
  addConditionTransport,
  treeOutput_deleteConditions_add,
  treeOutput_newConditions_add,
  treeOutput_newConditions_delete,
  treeOutput_savedConditions_delete,
  updateConditionServices,
  updateConditionTransport,
} from 'app/core/store/tree-offer/tree-offer.actions';
import {
  selectConditionsHash,
  selectConditionsMetaIds,
  selectTreeDisableActions,
  selectTreeOutputConditions,
} from 'app/core/store/tree-offer/tree-offer.selectors';
import { ToastService } from 'app/services';
import { ConditionHeritDialogComponent } from '../condition-herit-dialog/condition-herit-dialog.component';

@Component({
  selector: 'app-condition-dialog',
  templateUrl: './condition-dialog.component.html',
  styleUrls: ['./condition-dialog.component.css'],
})
export class ConditionDialogComponent implements OnInit {
  conditionForm: FormGroup;
  conditionsToAdd: any[];
  cities: any[];
  rubric = null;
  rubric_calcul_basics: any[];
  products_categories: any[];
  onInitCondHash = null;
  newCondHash = null;
  condMetaId = null;
  conditionsHash: string[]; // hash of conditions
  conditionsMetaIds: string[]; // meta_ids of all conditions
  loadedConditionsMetaIds: string[]; // meta_ids of saved conditions
  conditionsOutput: any; // all conditions
  disableActions: boolean;
  isLoading: boolean;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ConditionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private store: Store<AppState>,
    private _treeHelper: TreeOfferHelper,
    private _toast: ToastService,
    private boOfferservice: BoOfferService
  ) {}

  ngOnInit(): void {
    const editData = this.dialogData.editData;

    // on init current hash
    this.onInitCondHash = this._treeHelper.generateConditionHash({
      origin_id: editData?.origine?.id,
      origin_type: editData?.originable_type,
      dest_id: editData?.destination?.id,
      dest_type: editData?.destinationable_type,
      prod_cat_id: editData?.product_category?.id,
      prod_cat_type: editData?.type_product_category,
      cal_basis_id: editData?.basis_calcul?.id,
      rubric_id: this.dialogData.rubric_id,
    });

    // get hash of duplicated conditions and meta ids conditions
    this.store
      .select(selectTreeOutputConditions)
      .subscribe((res) => (this.conditionsOutput = res));
    this.store
      .select(selectConditionsHash)
      .subscribe((res) => (this.conditionsHash = res));
    this.store.select(selectConditionsMetaIds).subscribe((res) => {
      this.conditionsMetaIds = res.all;
      this.loadedConditionsMetaIds = res.loaded;
    });
    this.store
      .select(selectTreeDisableActions)
      .subscribe((res) => (this.disableActions = res));

    console.log(this.conditionsHash, this.conditionsMetaIds, 'log');

    this.loadRessources();
    const {
      formated_basis_calcul,
      formated_origin,
      formated_dest,
      formated_prd_cat,
    } = this.formatGroupedFields(editData);

    this.conditionForm = new FormGroup({
      origine: new FormControl(
        { value: formated_origin, disabled: this.disableActions },
        [Validators.required]
      ),
      destination: new FormControl(
        { value: formated_dest, disabled: this.disableActions },
        [Validators.required]
      ),
      basis_calcul: new FormControl(
        { value: formated_basis_calcul, disabled: this.disableActions },
        [Validators.required]
      ),
      product_category: new FormControl({
        value: formated_prd_cat,
        disabled: this.disableActions,
      }),
      tranches: new FormArray([]),
    });
    if (editData) this.loadTranchesData(editData.tranches);
  }

  loadRessources() {
    this.store
      .select(selectCitiesAndCategories)
      .subscribe((res) => (this.cities = res));
    this.store
      .select(selectCategoriesProducts)
      .subscribe((res) => (this.products_categories = res));
    this.store.select(selectRubricAndCalculBasis).subscribe((res) => {
      this.rubric_calcul_basics = [];
      const temp_ = res.find((item) => item.id === this.dialogData.rubric_id);
      if (temp_) {
        const { calcul_basis, ...rubric } = temp_;
        this.rubric_calcul_basics = calcul_basis;
        this.rubric = rubric;
      }
    });
  }
  openHeritConditionDialog(): void {
    this.dialog
      .open(ConditionHeritDialogComponent, {
        disableClose: true,
        width: '800px',
        data: {
          conv_id: this.dialogData.conv_id,
          editMode: this.dialogData.editMode,
          conv_type: this.dialogData.conv_type,
          rubric_id: this.dialogData.rubric_id,
        },
      })
      .afterClosed()
      .subscribe((output) => {
        if (output) {
          this.isLoading = true;
          this.boOfferservice.inheritCondition(output).subscribe(
            (res: any) => {
              const payload = res.response;
              if (payload.length === 0) {
                this._toast.error('Pas de conditions trouvée !');
                this.isLoading = false;
                return;
              }
              // format groupped field patch it form
              const {
                formated_basis_calcul,
                formated_origin,
                formated_dest,
                formated_prd_cat,
              } = this.formatGroupedFields(payload[0]);
              this.conditionForm.patchValue({
                origine: formated_origin,
                destination: formated_dest,
                basis_calcul: formated_basis_calcul,
                product_category: formated_prd_cat,
              });
              // clear and load tranches
              this.clearFormArray(this.tranches);
              this.loadTranchesData(payload[0].tranches);
              this.isLoading = false;
            },
            (error) => {
              this._toast.error(
                'Erreur de la recupération de la condition hérité !'
              );
              this.isLoading = false;
            }
          );
        }
      });
  }

  // apis base calcul by rubric , categorie product , location
  // min < max if != 1 , check if intervalles not intersect and order by asc
  // if min = max = 1 accept one tranche, if type val coef max 100
  // check max is infinty , avoid same city as origine and destination
  // delete tranche , add formGroup
  // show max poids only in some cases

  /* form group stuff */
  get tranches() {
    return this.conditionForm.controls['tranches'] as FormArray;
  }
  formatGroupedFields(editData: any) {
    const formated_basis_calcul = editData?.basis_calcul?.id;
    const formated_origin = editData?.origine?.id
      ? editData?.originable_type + '_' + editData?.origine?.id
      : '*';
    const formated_dest = editData?.destination?.id
      ? editData?.destinationable_type + '_' + editData?.destination?.id
      : '*';
    const formated_prd_cat = editData?.product_category?.id
      ? 'product_' + editData?.product_category?.id
      : editData?.type_product_category
      ? 'type_' + editData?.type_product_category
      : '*';

    return {
      formated_basis_calcul,
      formated_origin,
      formated_dest,
      formated_prd_cat,
    };
  }
  loadTranchesData(tranches: any[]) {
    for (let tranche of tranches) {
      this.tranches.push(
        new FormGroup({

          min_by_package : new FormControl(
            { value: tranche.min_by_package, disabled: this.disableActions },
            [Validators.min(0)]
          ),
          min: new FormControl(
            { value: tranche.min, disabled: this.disableActions },
            [Validators.required, Validators.min(1)]
          ),
          max: new FormControl(
            { value: tranche.max, disabled: this.disableActions },
            [Validators.required, Validators.min(1)]
          ),
          type_val: new FormControl(
            { value: tranche.type_val, disabled: this.disableActions },
            [Validators.required]
          ),
          calcul_val: new FormControl(
            { value: tranche.calcul_val, disabled: this.disableActions },
            [Validators.required, Validators.min(0)]
          ),
          min_val: new FormControl(
            { value: tranche.min_val, disabled: this.disableActions },
            [Validators.min(0)]
          ),
          max_val: new FormControl(
            { value: tranche.max_val, disabled: this.disableActions },
            [Validators.min(0)]
          ),
          sup_calcul_basis_id: new FormControl({
            value: tranche.sup_calcul_basis_id,
            disabled: this.disableActions,
          }),
          u_sup: new FormControl(
            { value: tranche.u_sup, disabled: this.disableActions },
            [Validators.min(1)]
          ),
          val_sup: new FormControl(
            { value: tranche.val_sup, disabled: this.disableActions },
            [Validators.min(0)]
          ),
          max_poids: new FormControl(
            { value: tranche.max_poids, disabled: this.disableActions },
            [Validators.min(0)]
          ),
        })
      );
    }
  }
  addNewTranche() {
    const isTransport = this.rubric.id == 1;
    // move unité sup inputs value to the lastest tranche
    let last_tranche = null;
    const last_idx = this.tranches.value.length - 1;
    if (last_idx >= 0) {
      last_tranche = this.tranches.value[last_idx];
      this.tranches.controls[last_idx].patchValue({
        u_sup: null,
        val_sup: null,
        max_poids: null,
        sup_calcul_basis_id: null,
      });
    }

    this.tranches.push(
      new FormGroup({
        min_by_package : new FormControl(
          { value: null, disabled: this.disableActions },
          [Validators.min(0)]
        ),
        min: new FormControl(null, [Validators.required, Validators.min(1)]),
        max: new FormControl(null, [Validators.required, Validators.min(1)]),
        type_val: new FormControl(isTransport ? 'PRICE' : null, [
          Validators.required,
        ]),
        calcul_val: new FormControl(null, [
          Validators.required,
          Validators.min(0),
        ]),
        min_val: new FormControl(null, [Validators.min(0)]),
        max_val: new FormControl(null, [Validators.min(0)]),
        //
        sup_calcul_basis_id: new FormControl(null),
        u_sup: new FormControl(null, [Validators.min(1)]),
        val_sup: new FormControl(null, [Validators.min(0)]),
        max_poids: new FormControl(null, [Validators.min(0)]),
        //
        // sup_calcul_basis_id: new FormControl(last_tranche?.sup_calcul_basis_id, [Validators.required]),
        // u_sup: new FormControl(last_tranche?.u_sup, [Validators.min(1)]),
        // val_sup: new FormControl(last_tranche?.val_sup, [Validators.min(0)]),
        // max_poids: new FormControl(last_tranche?.max_poids, [Validators.min(0)]),
      })
    );
  }
  removeTranche(idx: number) {
    this.tranches.removeAt(idx);
    // reset sup values
    if (this.tranches.value.length == 1)
      this.tranches.controls[0].patchValue({
        sup_calcul_basis_id: null,
        u_sup: null,
        val_sup: null,
        max_poids: null,
      });
  }
  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  };

  onChangeSupBasicCalcul(idx: number) {
    this.tranches.controls[idx].patchValue({
      u_sup: null,
      val_sup: null,
      max_poids: null,
    });
  }
  getLisSupBasicCalcul() {
    if (!this.conditionForm.value.basis_calcul)
      return { max_poids_sup: [], sup: [] };
    if (this.conditionForm.value.basis_calcul != 2 && this.rubric.id == 1) {
      // case : transport and basics calcul is not poids
      const sup = this.rubric_calcul_basics.filter(
        (item) =>
          item.id == 2 || item.id == this.conditionForm.value.basis_calcul
      );
      const max_poids_sup = this.rubric_calcul_basics.filter(
        (item) => item.id == 2
      );
      return { max_poids_sup, sup };
    } else {
      // case services or basics calcul is poids
      const sup = this.rubric_calcul_basics.filter(
        (item) => item.id == this.conditionForm.value.basis_calcul
      );
      return { max_poids_sup: [], sup };
    }
  }
  onChangeBasicCalcul() {
    for (let idx in this.tranches.value)
      this.tranches.controls[idx].patchValue({
        sup_calcul_basis_id: null,
        u_sup: null,
        val_sup: null,
        max_poids: null,
      });
  }

  /* submit actions */
  addNewCondition() {
    // check unicity of condition
    if (this.conditionsHash.includes(this.newCondHash)) {
      this._toast.warn('Attention, la condition deja existante !');
      return;
    }

    // add condition to tree output
    this.store.dispatch(
      treeOutput_newConditions_add({ payload: this.conditionsToAdd })
    );

    // add condition to tree
    const payload = this.buildConditionNode(); // build same grouped object from api

    if (this.dialogData.rubric_type === 'transport') {
      this.store.dispatch(
        addConditionTransport({
          idx_convention: this.dialogData.position_conv,
          payload,
        })
      );
      this.dialogRef.close();
    }

    if (this.dialogData.rubric_type === 'services') {
      this.store.dispatch(
        addConditionServices({
          idx_convention: this.dialogData.position_conv,
          payload,
        })
      );
      this.dialogRef.close();
    }

    console.log('form .....', this.conditionForm.value);
    console.log('output .....', this.conditionsToAdd);
  }
  editCondition() {
    // if duplicate a herited condition case do check unicity
    // case his new hash is already exist
    // const isHerited = !this.conditionsMetaIds.includes(this.condMetaId);
    // if (isHerited && this.conditionsHash.includes(this.newCondHash)) {
    //   this._toast.warn('Attention, la condition deja existante !'); return;
    // }

    // case his new hash is already exist and different by with the initial hash
    const isDuplicated = this.conditionsMetaIds.includes(this.condMetaId);
    if (
      isDuplicated &&
      this.onInitCondHash !== this.newCondHash &&
      this.conditionsHash.includes(this.newCondHash)
    ) {
      this._toast.warn('Attention, la condition deja existante !');
      return;
    }

    // case: condition is already saved
    if (this.loadedConditionsMetaIds.includes(this.condMetaId)) {
      // add it to conditions to delete
      const deleted_ids = this.conditionsOutput.loaded_conditions
        .filter((item: any) => item.meta_.cond_id === this.condMetaId)
        .map((item: any) => item.id);
      this.store.dispatch(
        treeOutput_deleteConditions_add({ payload: deleted_ids })
      );

      // delete it from loaded conditions
      this.store.dispatch(
        treeOutput_savedConditions_delete({ cond_id: this.condMetaId })
      );
    } else {
      // case: condition is a new condition to save
      this.store.dispatch(
        treeOutput_newConditions_delete({ cond_id: this.condMetaId })
      ); // delete conditions from output
    }

    // two cases : update or duplicate a herited condition
    this.store.dispatch(
      treeOutput_newConditions_add({ payload: this.conditionsToAdd })
    );

    // add condition to tree
    const payload = this.buildConditionNode(); // build same grouped object from api

    if (this.dialogData.rubric_type === 'transport') {
      this.store.dispatch(
        updateConditionTransport({
          idx_convention: this.dialogData.position_conv,
          idx: this.dialogData.position_cond,
          payload,
        })
      );
      this.dialogRef.close();
    }

    if (this.dialogData.rubric_type === 'services') {
      this.store.dispatch(
        updateConditionServices({
          idx_convention: this.dialogData.position_conv,
          idx: this.dialogData.position_cond,
          payload,
        })
      );
      this.dialogRef.close();
    }

    // ** if is last herited condition delete template_id template_offers **
    console.log('form .....', this.conditionForm.value);
    console.log('output .....', this.conditionsToAdd);
  }
  onFormSubmit() {
    if (!this.conditionForm.valid || this.tranches.value.length === 0) {
      console.log('form is not valid !');
      return;
    }

    this.formatTranchesToConditions();
    if (this.dialogData.editMode) {
      this.editCondition();
    } else {
      this.addNewCondition();
    }
  }

  /* submit helpers */
  formatTranchesToConditions() {
    const conditions = [];
    for (let tranche of this.tranches.value) {
      const splited_origine =
        this.conditionForm.value.origine !== '*'
          ? this.conditionForm.value.origine.split('_')
          : null;
      const splited_dest =
        this.conditionForm.value.destination !== '*'
          ? this.conditionForm.value.destination.split('_')
          : null;
      const splited_categ =
        this.conditionForm.value.product_category !== '*'
          ? this.conditionForm.value.product_category.split('_')
          : null;
      const cond = {
        originable_id: splited_origine ? splited_origine[1] : null,
        originable_type: splited_origine ? splited_origine[0] : null,
        destinationable_id: splited_dest ? splited_dest[1] : null,
        destinationable_type: splited_dest ? splited_dest[0] : null,
        calcul_basis_id: this.conditionForm.value.basis_calcul,
        prod_category_id:
          splited_categ && splited_categ[0] === 'product'
            ? splited_categ[1]
            : null,
        type_product_category:
          splited_categ && splited_categ[0] === 'type'
            ? splited_categ[1]
            : null,
        //
        rubric_id: this.dialogData.rubric_id,
        parent_id: this.dialogData.conv_id,
        type_parent: this.dialogData.conv_type === 'offer' ? 'Offer' : 'Grid',
      };

      // generate meta
      const type_grid = this.dialogData.conv_type === 'offer' ? 'OFFR' : 'GRD';
      if (this.dialogData.rubric_type === 'transport') {
        this._treeHelper.addMetaToCondTransport(
          cond,
          this.dialogData.conv_id,
          this.dialogData.position_cond,
          type_grid,
          true
        );
      }
      if (this.dialogData.rubric_type === 'services') {
        this._treeHelper.addMetaToCondServices(
          cond,
          this.dialogData.rubric_id,
          this.dialogData.position_cond,
          type_grid,
          true
        );
      }

      for (const [key, value] of Object.entries(tranche))
        if (value !== '' && value !== null) cond[key] = value;
      conditions.push(cond);
    }
    this.conditionsToAdd = conditions;
    this.newCondHash = this.conditionsToAdd[0].meta_.cond_hash; // new hash generated
    this.condMetaId = this.conditionsToAdd[0].meta_.cond_id; // condition meta id
  }
  buildConditionNode() {
    // todo compare this object with groupped data come from api
    const splited_origine =
      this.conditionForm.value.origine !== '*'
        ? this.conditionForm.value.origine.split('_')
        : null;
    const splited_dest =
      this.conditionForm.value.destination !== '*'
        ? this.conditionForm.value.destination.split('_')
        : null;
    const splited_categ =
      this.conditionForm.value.product_category !== '*'
        ? this.conditionForm.value.product_category.split('_')
        : null;
    const grouped_fields = {
      originable_type: splited_origine ? splited_origine[0] : null,
      origine: splited_origine
        ? this.cities.find(
            (item) =>
              item.id == splited_origine[1] && item.model == splited_origine[0]
          )
        : null,
      destinationable_type: splited_dest ? splited_dest[0] : null,
      destination: splited_dest
        ? this.cities.find(
            (item) =>
              item.id == splited_dest[1] && item.model == splited_dest[0]
          )
        : null,
      basis_calcul: this.rubric_calcul_basics.find(
        (item) => item.id == this.conditionForm.value.basis_calcul
      ),
      rubric: this.rubric,
      product_category:
        splited_categ && splited_categ[0] === 'product'
          ? this.products_categories.find((item) => item.id == splited_categ[1])
          : null,
      type_product_category:
        splited_categ && splited_categ[0] === 'type' ? splited_categ[1] : null,
    };

    const tranches = [];
    const meta_ = this.conditionsToAdd[0].meta_;
    for (let item of this.tranches.value) {
      const tranche = { ...item, ...grouped_fields };
      tranches.push(tranche);
    }

    return { ...grouped_fields, meta_, tranches };
  }
}
