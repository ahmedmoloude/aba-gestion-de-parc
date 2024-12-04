
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.states';
import { treeOutput_savedConditions_load } from '../store/tree-offer/tree-offer.actions';

@Injectable({ providedIn: 'root' })
export class TreeOfferHelper {

  public constructor(private store: Store<AppState>) { }

  generateNodeMeta_(params: {
    type_rubric: string,
    type_grid: 'GRD' | 'OFFR', // grid , offer
    conv_id: number, // grid_id or template_id
    cond_pos?: number, // condition postion
    tranche_pos?: number, // tranche position 
  }) {
    let cond_id = null; let tranche_id = null;
    const conv_id = `${params.type_rubric}-${params.type_grid}-${params.conv_id}`

    if (params?.cond_pos !== undefined && params?.cond_pos !== null) cond_id = `${conv_id}-${params.cond_pos}`
    if (cond_id && params?.tranche_pos !== undefined && params?.tranche_pos !== null)
      tranche_id = `${cond_id}-${params.tranche_pos}`

    //cond_id = TRAN-GRD|OFFR-grid_id-idx , SERV-GRD|OFFR-rubric_id-idx
    return { conv_id, cond_id, tranche_id }
  }

  generateConditionHash(params: {
    origin_id: number; origin_type: string;
    dest_id: number; dest_type: string;
    prod_cat_id: number; prod_cat_type: string;
    cal_basis_id: number; rubric_id: number;
  }) {
    const origin = params.origin_id ? `${params.origin_type}:${params.origin_id}` : "*"
    const dest = params.dest_id ? `${params.dest_type}:${params.dest_id}` : "*"
    const prod_cat = params.prod_cat_id ? params.prod_cat_id : params.prod_cat_type ? params.prod_cat_type : "*"
    const rub_cal_basic = `${params.rubric_id}` //`${params.rubric_id}:${params.cal_basis_id}`

    return `${origin}-${dest}-${prod_cat}-${rub_cal_basic}`
  }

  getParamsOfConditionHash(cond: any, rubric_id: number, isFormSubmit: boolean) {
    const origin_type = cond.originable_type
    const dest_type = cond.destinationable_type
    const prod_cat_type = cond.type_product_category
    const origin_id = !isFormSubmit ? cond.origine?.id : cond.originable_id
    const dest_id = !isFormSubmit ? cond.destination?.id : cond.destinationable_id
    const prod_cat_id = !isFormSubmit ? cond.product_category?.id : cond.prod_category_id
    const cal_basis_id = !isFormSubmit ? cond.basis_calcul.id : cond.calcul_basis_id
    return { origin_id, origin_type, dest_id, dest_type, prod_cat_id, prod_cat_type, cal_basis_id, rubric_id }
  }

  // generate services conditions meta and hash 
  addMetaToCondServices(cond: any, rubric_id: number, cond_pos: number, type_grid: 'GRD' | 'OFFR', isFormSubmit: boolean) {
    cond.meta_ = this.generateNodeMeta_({ type_rubric: 'SERV', type_grid, conv_id: rubric_id, cond_pos })
    const hash_params = this.getParamsOfConditionHash(cond, rubric_id, isFormSubmit)
    cond.meta_.cond_hash = this.generateConditionHash(hash_params);
    cond.meta_.is_service = true
  }
  // generate transport conditions meta and hash 
  addMetaToCondTransport(cond: any, conv_id: number, cond_pos: number, type_grid: 'GRD' | 'OFFR', isFormSubmit: boolean) {


     if (!Object.isExtensible(cond)) {
        cond = { ...cond };
      }

    cond.meta_ = this.generateNodeMeta_({ type_rubric: 'TRAN', type_grid, conv_id, cond_pos })
    const hash_params = this.getParamsOfConditionHash(cond, 1, isFormSubmit)
    cond.meta_.cond_hash = this.generateConditionHash(hash_params);
    cond.meta_.is_service = false

    console.log('condition after add'  , cond)
  }

  formatTranchesToConditions(cond: any, parent_conv_id: any, type_conv: string) {
    const conditions = []
    for (let tranche of cond.tranches) {
      const flattten_cond = {
        originable_id: cond.origine ? cond.origine.id : null,
        originable_type: cond.originable_type,
        destinationable_id: cond.destination ? cond.destination.id : null,
        destinationable_type: cond.destinationable_type,
        calcul_basis_id: cond.basis_calcul.id,
        prod_category_id: cond.product_category ? cond.product_category.id : null,
        type_product_category: cond.type_product_category,
        //
        rubric_id: cond.rubric.id, parent_id: parent_conv_id,
        type_parent: type_conv === 'offer' ? 'Offer' : "Grid",
        meta_: cond.meta_
      }

      const skipped_keys = ['basis_calcul', 'destinationable', 'originable', "rubric", "created_at",
        "offerable_id", "offerable_type", "potential", "updated_at", "uuid"]
      for (const [key, value] of Object.entries(tranche))
        if (value !== "" && value !== null && !skipped_keys.includes(key)) flattten_cond[key] = value
      conditions.push(flattten_cond)
    }
    return conditions;
  }

  /* ---------- Load tree data ---------------*/
  prepareTreeDataToLoad(data: { commerciale_offer: any, transport: any[], services: any[], services_parent: any }) {
    const transport = this.loadTransportConventions(data.transport)
    const services = this.loadServicesConvention(data.services, data.services_parent)
    return { commerciale_offer: data.commerciale_offer, transport, services }
  }

  // todo duplicated code refactor it 
  loadTransportConventions(conventions: any[]) {
    const nodes_conventions = []; let saved_conditions = [];
    for (let conv_item of conventions) {
      // get type of parent
      let type_selected_grid = null;
      if (conv_item?.type_parent === "Grid") type_selected_grid = conv_item?.parent.type === 'TEMPLATE' ? 'template' : 'public'
      else if (conv_item?.type_parent === "Offer") type_selected_grid = 'offer';

      if (type_selected_grid === 'template' || type_selected_grid === 'public') {
        // add condition meta and transform tranches to conditions output
        for (const [idx, cond] of conv_item.details.entries()) {
          this.addMetaToCondTransport(cond, conv_item.parent.id, idx, 'GRD', false) // append meta to condition
          saved_conditions = saved_conditions.concat(this.formatTranchesToConditions(cond, conv_item.parent.id, type_selected_grid)) // format grouped tranches to conditions
        }

        const meta_ = this.generateNodeMeta_({ type_rubric: 'TRAN', type_grid: 'GRD', conv_id: conv_item.parent.id })
        const conv = {
          id: conv_item.parent.id, uuid: conv_item.parent.uuid, type: type_selected_grid, title: conv_item.parent.title,
          conditions: [...conv_item.details], meta_
        }
        nodes_conventions.push(conv);
        // no need to load saved templates_offers
      }
      if (type_selected_grid === 'offer') {
        // add condition meta and transform tranches to conditions output
        for (const [idx, cond] of conv_item.details.entries()) {
          this.addMetaToCondTransport(cond, conv_item.parent.id, idx, 'OFFR', false) // append meta to condition
          saved_conditions = saved_conditions.concat(this.formatTranchesToConditions(cond, conv_item.parent.id, type_selected_grid)) // format grouped tranches to conditions
        }

        const meta_ = this.generateNodeMeta_({ type_rubric: 'TRAN', type_grid: 'OFFR', conv_id: conv_item.parent.id })
        const conv = {
          id: conv_item.parent.id, uuid: conv_item.parent.uuid, type: type_selected_grid, title: conv_item.parent.reference,
          conditions: [...conv_item.details], meta_
        }
        nodes_conventions.push(conv);
      }
    }

    // Add saved conditions to conditions output (saved object)
    this.store.dispatch(treeOutput_savedConditions_load({ payload: saved_conditions }))

    // Add nodes conventions of transport to tree
    return nodes_conventions;
  }

  // todo duplicated code refactor it 
  loadServicesConvention(conventions: any[], services_parent: any) {
    // get type of parent
    let type_selected_grid = null;
    if (services_parent?.type_parent === "Grid") type_selected_grid = services_parent?.parent.type === 'TEMPLATE' ? 'template' : 'public'
    else if (services_parent?.type_parent === "Offer") type_selected_grid = 'offer';

    const nodes_conventions = []; let saved_conditions = [];
    if (type_selected_grid === 'template' || type_selected_grid === 'public') {
      for (const rubric of conventions) {
        // add condition meta and transform tranches to conditions output
        for (let [idx, cond] of rubric.details.entries()) {
          this.addMetaToCondServices(cond, rubric.id, idx, 'GRD', false) // append meta to condition
          saved_conditions = saved_conditions.concat(this.formatTranchesToConditions(cond, services_parent.parent.id, type_selected_grid)) // format grouped tranches to conditions
        }

        let conv: any = { id: rubric.id, title: rubric.title, conditions: rubric.details } // todo title_affichage
        conv.parent_grid = { id: services_parent.parent.id, uuid: services_parent.parent.uuid, type: type_selected_grid, title: services_parent.parent.title }
        conv.meta_ = this.generateNodeMeta_({ type_rubric: 'SERV', type_grid: 'GRD', conv_id: rubric.id });
        nodes_conventions.push(conv)
      }
    }

    if (type_selected_grid === 'offer') {
      for (const rubric of conventions) {
        // add condition meta and transform tranches to conditions output
        for (let [idx, cond] of rubric.details.entries()) {
          this.addMetaToCondServices(cond, rubric.id, idx, 'OFFR', false) // append meta to condition
          saved_conditions = saved_conditions.concat(this.formatTranchesToConditions(cond, services_parent.parent.id, type_selected_grid)) // format grouped tranches to conditions
        }

        let conv: any = { id: rubric.id, title: rubric.title, conditions: rubric.details } // todo title_affichage
        conv.parent_grid = { id: services_parent.parent.id, uuid: services_parent.parent.uuid, type: type_selected_grid, title: services_parent.parent.reference }
        conv.meta_ = this.generateNodeMeta_({ type_rubric: 'SERV', type_grid: 'OFFR', conv_id: rubric.id });
        nodes_conventions.push(conv)
      }
    }

    // Add saved conditions to conditions output (saved object)
    this.store.dispatch(treeOutput_savedConditions_load({ payload: saved_conditions }))

    // Add nodes conventions of services to tree
    return nodes_conventions;
  }
}