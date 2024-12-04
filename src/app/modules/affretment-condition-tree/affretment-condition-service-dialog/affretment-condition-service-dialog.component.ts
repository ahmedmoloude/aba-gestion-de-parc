import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store, select } from '@ngrx/store';
import { TreeOfferHelper } from 'app/core/helpers/treeOffer.helper';
import { BoOfferService } from 'app/core/services/admin-bo/bo-offers.service';
import { AppState } from 'app/core/store/app.states';
import { selectAllCity, selectCategoriesProducts, selectCitiesAndCategories, selectRubricAndCalculBasis } from 'app/core/store/resources/resources.selectors';
import { addConditionServicesAffretment, addConditionTransportAffretment, treeOutput_deleteConditions_add_affretment, treeOutput_newConditions_add_affretment, treeOutput_newConditions_delete_affretment, treeOutput_savedConditions_delete_affretment, updateConditionServicesAffretment, updateConditionTransportAffretment } from 'app/core/store/tree-offer-affreetment/tree-offer-affreetment.actions';
import { selectConditionsHashAffretment, selectConditionsMetaIdsAffretment, selectTreeDisableActionsAffretment, selectTreeOutputConditionsAffretment } from 'app/core/store/tree-offer-affreetment/tree-offer-affreetment.selectors';
import { ToastService } from 'app/services';

@Component({
  selector: 'app-affretment-condition-service-dialog',
  templateUrl: './affretment-condition-service-dialog.component.html',
  styleUrls: ['./affretment-condition-service-dialog.component.css']
})
export class AffretmentConditionServiceDialogComponent implements OnInit {

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
    public dialogRefAffretment: MatDialogRef<AffretmentConditionServiceDialogComponent>,
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
      .select(selectTreeOutputConditionsAffretment)
      .subscribe((res) => (this.conditionsOutput = res));
    this.store
      .select(selectConditionsHashAffretment)
      .subscribe((res) => (this.conditionsHash = res));
    this.store.select(selectConditionsMetaIdsAffretment).subscribe((res) => {
      this.conditionsMetaIds = res.all;
      this.loadedConditionsMetaIds = res.loaded;
    });
    this.store
      .select(selectTreeDisableActionsAffretment)
      .subscribe((res) => (this.disableActions = res));

    console.log(this.conditionsHash, this.conditionsMetaIds, 'log');

    this.loadRessources();
    const {
      formated_origin,
      formated_dest,
    } = this.formatGroupedFields(editData);

    this.conditionForm = new FormGroup({
      origine: new FormControl(
        { value: formated_origin, disabled: this.disableActions },
      ),
      destination: new FormControl(
        { value: formated_dest, disabled: this.disableActions },
      ),
      tranches: new FormArray([]),
    });
    if (editData) this.loadTranchesData(editData.tranches);
  }

  loadRessources() {
    this.store
      .select(selectAllCity)
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


  /* form group stuff */
  get tranches() {
    return this.conditionForm.controls['tranches'] as FormArray;
  }
  formatGroupedFields(editData: any) {
    const formated_origin = editData?.origine?.id;
    const formated_dest = editData?.destination?.id;
  

    return {
      formated_origin,
      formated_dest,
    };
  }
  loadTranchesData(tranches: any[]) {
    for (let tranche of tranches) {
      this.tranches.push(
        new FormGroup({
          tranche_min: new FormControl(
            { value: tranche.tranche_min, disabled: this.disableActions },
          ),
          tranche_max: new FormControl(
            { value: tranche.tranche_max, disabled: this.disableActions },
          ),
          type_val: new FormControl(
            { value: tranche.type_val || 'PRICE', disabled: this.disableActions },
            [Validators.required]
          ),
          tranche_prix: new FormControl(
            { value: tranche.tranche_prix, disabled: this.disableActions },
          ),
          min_prix: new FormControl(
            { value: tranche.min_prix, disabled: this.disableActions },
            [Validators.min(0)]
          ),
          max_prix: new FormControl(
            { value: tranche.max_prix, disabled: this.disableActions },
            [Validators.min(0)]
          ),
          prix_supp: new FormControl(
            { value: tranche.prix_supp, disabled: this.disableActions },
            [Validators.min(0)]
          )
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
        prix_supp: null,
        supp_calcul_basis_affretement_id: null,
      });
    }

    this.tranches.push(
      new FormGroup({
        tranche_min: new FormControl(null, [Validators.required, Validators.min(1)]),
        tranche_max: new FormControl(null, [Validators.required, Validators.min(1)]),
        type_val: new FormControl(isTransport ? 'PRICE' : null, [
          Validators.required,
        ]),
        tranche_prix: new FormControl(null, [
          Validators.required,
          Validators.min(0),
        ]),
        min_prix: new FormControl(null, [Validators.min(0)]),
        max_prix: new FormControl(null, [Validators.min(0)]),
        //
        supp_calcul_basis_affretement_id: new FormControl(null),
        // u_sup: new FormControl(null, [Validators.min(1)]),
        prix_supp: new FormControl(null, [Validators.min(0)]),
        //
        // supp_calcul_basis_affretement_id: new FormControl(last_tranche?.supp_calcul_basis_affretement_id, [Validators.required]),
        // u_sup: new FormControl(last_tranche?.u_sup, [Validators.min(1)]),
        // prix_supp: new FormControl(last_tranche?.prix_supp, [Validators.min(0)]),
        // max_poids: new FormControl(last_tranche?.max_poids, [Validators.min(0)]),
      })
    );
  }
  removeTranche(idx: number) {
    this.tranches.removeAt(idx);
    // reset sup values
    if (this.tranches.value.length == 1)
      this.tranches.controls[0].patchValue({
        // supp_calcul_basis_affretement_id: null,
        // u_sup: null,
        prix_supp: null,
      });
  }
  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  };

  onChangeSupBasicCalcul(idx: number) {
    this.tranches.controls[idx].patchValue({
      // u_sup: null,
      prix_supp: null,
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
        // supp_calcul_basis_affretement_id: null,
        // u_sup: null,
        prix_supp: null,
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
      treeOutput_newConditions_add_affretment({ payload: this.conditionsToAdd })
    );

    // add condition to tree
    const payload = this.buildConditionNode(); // build same grouped object from api

    if (this.dialogData.rubric_type === 'transport') {
      this.store.dispatch(
        addConditionTransportAffretment({
          idx_convention: this.dialogData.position_conv,
          payload,
        })
      );
      this.dialogRefAffretment.close();
    }

    if (this.dialogData.rubric_type === 'services') {
      this.store.dispatch(
        addConditionServicesAffretment({
          idx_convention: this.dialogData.position_conv,
          payload,
        })
      );
      this.dialogRefAffretment.close();
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
        treeOutput_deleteConditions_add_affretment({ payload: deleted_ids })
      );

      // delete it from loaded conditions
      this.store.dispatch(
        treeOutput_savedConditions_delete_affretment({ cond_id: this.condMetaId })
      );
    } else {
      // case: condition is a new condition to save
      this.store.dispatch(
        treeOutput_newConditions_delete_affretment({ cond_id: this.condMetaId })
      ); // delete conditions from output
    }


    console.log('conditions to add' , this.conditionsToAdd )

    // two cases : update or duplicate a herited condition
    this.store.dispatch(
      treeOutput_newConditions_add_affretment({ payload: this.conditionsToAdd })
    );

    // add condition to tree
    const payload = this.buildConditionNode(); // build same grouped object from api

    if (this.dialogData.rubric_type === 'transport') {
      this.store.dispatch(
        updateConditionTransportAffretment({
          idx_convention: this.dialogData.position_conv,
          idx: this.dialogData.position_cond,
          payload,
        })
      );
      this.dialogRefAffretment.close();
    }

    if (this.dialogData.rubric_type === 'services') {
      console.log('idx_convention ' , this.dialogData.position_conv,  this.dialogData.position_cond, payload )
      this.store.dispatch(
        updateConditionServicesAffretment({
          idx_convention: this.dialogData.position_conv,
          idx: this.dialogData.position_cond,
          payload,
        })
      );
      this.dialogRefAffretment.close();
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
        this.conditionForm.value.origine
      const splited_dest =
        this.conditionForm.value.destination
      const cond = {
        originable_id: splited_origine,
        originable_type: 'City',
        destinationable_id: splited_dest,
        destinationable_type: 'City',
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
    const id_origine =
      this.conditionForm.value.origine
    const id_dest =
      this.conditionForm.value.destination

      
    const grouped_fields = {
      originable_type: 'City',
      origine: this.cities.find((c) => c.id ==  id_origine),
      destinationable_type: 'City',
      destination: this.cities.find((c) => c.id ==  id_dest),
      rubric: this.rubric,
    };

    const tranches = [];
    const meta_ = this.conditionsToAdd[0].meta_;
    for (let item of this.tranches.value) {
      const tranche = { ...item, ...grouped_fields };
      tranches.push(tranche);
    }

    return { ...grouped_fields, meta_, tranches };
  }


  getFormValidationErrors(formGroup: FormGroup | FormArray): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.getFormValidationErrors(control);
      } else {
        const controlErrors: ValidationErrors = control.errors;
        if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            console.log(`Control: ${key}, Error: ${keyError}, Value: ${controlErrors[keyError]}`);
          });
        }
      }
    });
  }
}
