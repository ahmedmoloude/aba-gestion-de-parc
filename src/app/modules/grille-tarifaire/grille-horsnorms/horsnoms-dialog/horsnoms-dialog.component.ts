import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { addGridDetails, updateGridHorsnorm } from 'app/core/store/grids/grids.actions';
import { selectActiveGrid, selectHorsnormTransport } from 'app/core/store/grids/grids.selectors';
import { fetchProductCategory } from 'app/core/store/productcategory/productcategory.actions';
import { selectallproductcategory, selectNatureProduct } from 'app/core/store/productcategory/productcategory.selector';
import { ToastService } from 'app/services';

@Component({
  selector: 'app-horsnoms-dialog',
  templateUrl: './horsnoms-dialog.component.html',
  styleUrls: ['./horsnoms-dialog.component.css'],
})

export class HorsnomsDialogComponent implements OnInit {

  productcategory: any = [];
  horsnormForm: FormGroup;
  selectedMove: string = null;
  offerable_id: any = null;
  __form_btn: string = null;
  __form_text: string = null;

  constructor(public dialogRef: MatDialogRef<HorsnomsDialogComponent>,
    private store: Store<AppState>,
    public formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any, private _toaster: ToastService) { }

  ngOnInit(): void {
    this.store
      .select(selectNatureProduct)
      .subscribe((res) => { this.productcategory = res,this.productcategory = this.productcategory.filter(g => g.type != 'Colis' && g.type != 'Palette'), console.log(this.productcategory,'product_category_test') });
    this.setForm(this.productcategory);
    if (this.data.uuid) {
      this.__form_btn = "Modifier";
      this.__form_text = "Modifier un colis hors norms";
    }else{
      this.__form_btn = "Ajouter";
      this.__form_text = "Ajouter un colis hors norms";
    }
  }

  setForm(params) {
    if (Object.keys(this.data).length > 0) {
      this.store.select(selectActiveGrid).subscribe((res) => { (this.offerable_id = res.grid_active.id) });
      this.horsnormForm = new FormGroup({
        prod_category_id: new FormControl(this.data.product_id, Validators.required),
        offerable_id: new FormControl(this.offerable_id),
        price: new FormControl(this.data.price, Validators.required),
      })
    } else {
      this.horsnormForm = new FormGroup({
        prod_category_id: new FormControl('', Validators.required),
        offerable_id: new FormControl(''),
        price: new FormControl('', Validators.required),
      })
    }
  }


  onSubmit() {
    if (this.horsnormForm.invalid) {
      this._toaster.warn('Certains champs ne sont pas definies !')
      return;
    }
    if (this.data.uuid) {
      const uuId = this.data.uuid;
      this.store.dispatch(updateGridHorsnorm({ uuid: uuId, data: this.horsnormForm.value }));
      this.dialogRef.close();
      this.store.select(selectHorsnormTransport).subscribe((res) => { console.log(res) });
    }
    else {
      this.store.select(selectActiveGrid).subscribe((res) => { this.horsnormForm.controls['offerable_id'].setValue(res.grid_active.id); });
      this.store.dispatch(addGridDetails({ data: this.horsnormForm.value }));
      this.dialogRef.close();
    }
  }

  moveSelected(move: string) {
    this.selectedMove = move;
    this.horsnormForm.controls['natures'].setValue(this.selectedMove);
  }

}
