import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BoOfferService } from 'app/core/services/admin-bo/bo-offers.service';
import { ToastService } from 'app/services';

@Component({
  selector: 'app-condition-herit-dialog',
  templateUrl: './condition-herit-dialog.component.html',
  styleUrls: ['./condition-herit-dialog.component.css']
})
export class ConditionHeritDialogComponent implements OnInit {
  heritedConditionForm: FormGroup;
  isLoading = false;
  gridType: 'Offer' | 'Grid';
  //
  heritedConditions: any[] = [];
  origineSelect: { id: string, label: string }[] = [];
  destinationSelect: { id: string, label: string }[] = [];
  productCategorieSelect: { id: string, label: string }[] = [];
  calculBasicsSelect: { id: string, label: string }[] = [];

  constructor(public dialogRef: MatDialogRef<ConditionHeritDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any, private boOfferservice: BoOfferService,
    private _toast: ToastService) { }

  ngOnInit(): void {
    this.gridType = this.dialogData.conv_type === 'offer' ? 'Offer' : 'Grid'
    this.isLoading = true
    this.boOfferservice.getGridConditions(this.gridType, this.dialogData.conv_id, this.dialogData.rubric_id).subscribe((res: any) => {
      const payload = res.response; this.heritedConditions = payload.details;
      this.getListOrigine(); this.isLoading = false;
      console.log(this.heritedConditionForm.value)
    }, error => {
      this.isLoading = false;
      this._toast.error("Erreur de la recuperation des conditions !")
    })

    this.heritedConditionForm = new FormGroup({
      origine: new FormControl("", [Validators.required]),
      destination: new FormControl("", [Validators.required]),
      categorie_produit: new FormControl("", [Validators.required]),
      basis_calcul: new FormControl("", [Validators.required]),
    });
  }

  onChangeOrigin() {
    // reset destination, product categorie, calcul basics
    this.heritedConditionForm.patchValue({ destination: "", categorie_produit: "", basis_calcul: "" });
    this.destinationSelect = []; this.productCategorieSelect = []; this.calculBasicsSelect = [];
    const { origine } = this.heritedConditionForm.value; this.getListDestination(origine)
  }
  onChangeDestination() {
    // reset product categorie, calcul basics
    this.heritedConditionForm.patchValue({ categorie_produit: "", basis_calcul: "" });
    this.productCategorieSelect = []; this.calculBasicsSelect = [];
    const { origine, destination } = this.heritedConditionForm.value; this.getListProductCat(origine, destination)
  }
  onChangeProductCat() {
    // reset calcul basics
    this.heritedConditionForm.patchValue({ basis_calcul: "" }); this.calculBasicsSelect = [];
    const { origine, destination, categorie_produit } = this.heritedConditionForm.value
    this.getListCalculBasic(origine, destination, categorie_produit)
  }
  onFormSubmit() {
    if (this.heritedConditionForm.invalid) { console.log("form invalid"); return; }
    const values = this.heritedConditionForm.value;
    const splited_origine = values.origine !== '*' ? values.origine.split('_') : null;
    const splited_dest = values.destination !== '*' ? values.destination.split('_') : null;
    const splited_cat = values.categorie_produit !== '*' ? values.categorie_produit.split('_') : null;

    const payload = {
      parent_type: this.gridType, parent_id: this.dialogData.conv_id, rubric_id: this.dialogData.rubric_id,
      origine_id: splited_origine ? splited_origine[1] : null,
      type_origne: splited_origine ? splited_origine[0] : null,
      destiantion_id: splited_dest ? splited_dest[1] : null,
      type_destination: splited_dest ? splited_dest[0] : null,
      prod_id: splited_cat && splited_cat[0] === 'Product' ? splited_cat[1] : null,
      type_product_category: splited_cat && splited_cat[0] === 'Category' ? splited_cat[1] : null,
      calcul_basic_id: values.basis_calcul,
    }
    this.dialogRef.close(payload)
  }

  /* form group helpers */
  filterConditions(params: { origineId: string, destinationId: string | boolean, productCatId: string | boolean }) {
    const { origineId, destinationId, productCatId } = params
    return this.heritedConditions.filter((item) => {
      let condOrigin = false; let condDest = false; let condProdCat = false;
      if (origineId === "*") condOrigin = item.originable === null; // origin all cities
      if (origineId !== "*") condOrigin = item.originable_type + '_' + item.originable?.id === origineId; // origin specific city
      if (params.destinationId === false && params.productCatId === false) return condOrigin; // * filter with origin only
      //
      if (destinationId === "*") condDest = item.destinationable === null; // destination all cities
      if (destinationId !== "*") condDest = item.destinationable_type + '_' + item.destinationable?.id === destinationId; // destination specific city
      if (params.destinationId !== false && params.productCatId === false) return condOrigin && condDest; // * filter with origin and destination
      //
      if (productCatId === "*") condProdCat = item.categorie_produit === null && item.type_product_category === null; // all categories
      if (productCatId !== "*" && productCatId.toString().startsWith("Product_"))
        condProdCat = 'Product_' + item.categorie_produit?.id === productCatId; // specific product categorie
      if (productCatId !== "*" && productCatId.toString().startsWith("Category_"))
        condProdCat = 'Category_' + item.type_product_category === productCatId; // specific type product categorie
      return condOrigin && condDest && condProdCat; // * filter with origin , destination and product categorie
    })
  }
  getListOrigine() {
    const temp_ = {}
    for (const item of this.heritedConditions) {
      const id = item.originable ? item.originable_type + '_' + item.originable.id : "*";
      temp_[id] = item.originable ? { id, label: item.originable.name } : { id, label: "Tout" };
    } console.log(temp_); this.origineSelect = Object.values({ ...temp_ })
  }
  getListDestination(origineId: string) {
    const temp_ = {}
    for (const item of this.filterConditions({ origineId, destinationId: false, productCatId: false })) {
      const id = item.destinationable ? item.destinationable_type + '_' + item.destinationable.id : "*";
      temp_[id] = item.destinationable ? { id, label: item.destinationable.name } : { id, label: "Tout" };
    } console.log(temp_); this.destinationSelect = Object.values({ ...temp_ })
  }
  getListProductCat(origineId: string, destinationId: string) {
    const temp_ = {}
    for (const item of this.filterConditions({ origineId, destinationId, productCatId: false })) {
      const id = item.categorie_produit ? 'Product_' + item.categorie_produit.id : item.type_product_category ? 'Category_' + item.type_product_category : "*";
      temp_[id] = item.categorie_produit ? { id, label: item.categorie_produit.title } : item.type_product_category ? { id, label: item.type_product_category } : { id, label: "Tout" };
    } console.log(temp_); this.productCategorieSelect = Object.values({ ...temp_ })
  }
  getListCalculBasic(origineId: string, destinationId: string, productCatId: string) {
    const temp_ = {}
    for (const item of this.filterConditions({ origineId, destinationId, productCatId })) {
      const id = item.basis_calcul.id; temp_[id] = { id, label: item.basis_calcul.title_affichage }
    } console.log(temp_); this.calculBasicsSelect = Object.values({ ...temp_ })
  }
}
