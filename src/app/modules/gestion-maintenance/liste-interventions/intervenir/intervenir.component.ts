import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DetailVehiculeComponent } from '../detail-vehicule/detail-vehicule.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { InterventionMaintenance, Truck } from 'app/core/models/maintenance/intervention-maintenance.model';
import { loadReparators } from 'app/core/store/maintenance/reparator/reparator.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { ReparatorState } from 'app/core/store/maintenance/reparator/reparator.reducer';
import { Observable } from 'rxjs';
import { MaintenanceStateEnum } from 'app/core/store/maintenance/maintenance-intervention/maintenance-intervention.reducer';
import { Diagnostique } from 'app/core/models/maintenance/diagnostique.model';

@Component({
  selector: 'app-intervenir',
  templateUrl: './intervenir.component.html',
  styleUrls: ['./intervenir.component.css']
})
export class IntervenirComponent implements OnInit {

  @Input() intervention: InterventionMaintenance;
  @Output() intervenir = new EventEmitter<any>();

  interventionForm: FormGroup;

  categoryList: any[] = [];

  reparatorListTest = [
    {id:0, name: 'ahmed', reference: "14251"},
    {id:1, name: 'hajar', reference: "14252"},
    {id:2, name: 'sami', reference: "14255"},
    {id:3, name: 'adam', reference: "14525"},
    {id:4, name: 'aya', reference: "14625"},

  ]

  reparator$: Observable<ReparatorState> = this.store.select(state => state.reparator);
  reparatorList = [];
  selectedOption: string = 'interne';
  // rechangeForm: FormGroup;



  types = ['PNEU', 'KILOMETRAGE'];

  searchStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}
  contentStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}

  constructor(public dialog: MatDialog,
              private fb: FormBuilder,
              private store: Store<AppState>) {
    // this.rechangeForm = this.fb.group({
    //   rechanges: this.fb.array([])
    // });
  }

  ngOnInit(): void {
    this.store.dispatch(loadReparators());
    this.groupPiecesByCategories();
    this.initForm();

    this.reparator$.subscribe(
      (resp) => {
        if(resp?.dataState == MaintenanceStateEnum.SUCCESS && resp?.reparators){
          this.reparatorList = resp.reparators;
        }
      }
    );
  }

  groupPiecesByCategories() {
    this.categoryList = this.intervention?.diagnostiques?.reduce((acc, item) => {
      const { category } = item;
      const { name } = category;
      if (!acc[name]) {
        acc[name] = [];
      }
      // if(item.piece_rechange)
      acc[name].push(item);
      return acc;
    }, []);
    const sortedCategoryList = Object.keys(this.categoryList).sort().reduce((acc, key) => {
      const category = this.categoryList[key]
      if (category.length>1) {
        acc[key] = this.filterNonNullPieceRechange(category);
      } else {
        acc[key] = category;
      }
      return acc;
    }, []);
    this.categoryList = sortedCategoryList

   console.log('categoryList sorted', sortedCategoryList)

    console.log('categories');
    console.log(this.categoryList);
  }

  filterNonNullPieceRechange(array) {
    return array.filter(item => item.piece_rechange);
  }

  groupByCategory(){
    const grouped = this.intervention?.diagnostiques?.reduce((acc, item) => {
      const { category } = item;
      const { name } = category;
      if (!acc[name]) {
        acc[name] = [];
      }
      // if(item.piece_rechange)
      acc[name].push(item);
      return acc;
    }, {});

    this.categoryList = Object.entries(grouped).map(([categoryName, diagnostiques]) => ({
      category: categoryName,
      diagnostiques,
    }));
    console.log('categoryName++++++++++++++++++++', this.categoryList);

  }

  getQuantiteARecuperer(quantityDemandee: number, quantityStock: number): number{
    return Math.min(quantityDemandee, quantityStock);;
  }

  getQuantiteAAcheter(quantityDemandee: number, quantityStock: number): number{
    return Math.max(0, quantityDemandee - quantityStock);
  }

  initForm(){
    this.interventionForm = this.fb.group({
      categories: this.fb.array([]),
    });
    const categories = this.interventionForm?.get('categories') as FormArray;

    for (const key in this.categoryList) {
      if (Object.prototype.hasOwnProperty.call(this.categoryList, key)) {
        const element = this.categoryList[key];
        console.log('element');
        console.log(element);

        const reparatorGroup = this.fb.group({
          code : null,
          type : null,
        });

        const categoryGroup = this.fb.group({
          place: ['INTERNE',[ Validators.required]],
          category: [element[0].category,[ Validators.required]],
          reparators: this.fb.array([reparatorGroup]),
          pieces: this.fb.array([])
        });

        for (const item of element) {
          if(item.piece_rechange){
            const piecegroup = this.fb.group({
              id : item.id,
              quantity : [item.quantity, [Validators.required, this.validateQuantity.bind(this, item.quantity)]],
            });
            const pieces = categoryGroup?.get('pieces') as FormArray;
            pieces?.push(piecegroup);
          }
        }
        categories?.push(categoryGroup)
      }
    }
    console.log('interventionForm');
    console.log(this.interventionForm);
  }

  get categories() {
    return this.interventionForm?.get('categories') as FormArray;
  }

  validateQuantity(control, quantity) {
    const value = control.value;

    // Check if the value is a number and within the desired range
    if (isNaN(value) || value < 0 || value > quantity) {
      return { 'invalidQuantity': true };
    }

    return null;
  }



  getReparators(parentIndex: number):  FormArray{
    const category = this.categories.controls[parentIndex] as FormGroup;
    return category.controls.reparators as FormArray;
  }

  addReparator(parentIndex: number) {
    const reparatorGroup = this.fb.group({
      code :'',
      type : '',
    });

    const reparators = this.getReparators(parentIndex);
    reparators?.push(reparatorGroup);
  }

  removeReparator(index: number, parentIndex: number) {
    const reparators = this.getReparators(parentIndex);
    reparators.removeAt(index);
  }

  selectReparator(event, index: number, parentIndex: number){
    const reparators = this.getReparators(parentIndex);
    const reparator =  reparators.controls[index]  as FormGroup;
    reparator.controls.code.setValue(event.id)
  }

  getPrices(quantity, prixTTC, quantity_stock) {
    const prixMoyenTTC = (prixTTC*quantity)/quantity_stock;
    const prixHT: number = prixMoyenTTC / (1 + 0.2);
    const prixUnitaire: number = prixHT / quantity;
    const tva: number = prixMoyenTTC - prixHT;
    return {prixMoyenTTC:prixMoyenTTC.toFixed(2), prixHT: prixHT.toFixed(2), prixUnitaire: prixUnitaire.toFixed(2), tva: tva.toFixed(2)}
  }

  getPiecesPrices(quantity, prixUnitaire) {
    const prixHT: number = prixUnitaire * quantity;
    const prixTTC: number = prixHT * 1.2;
    const tva: number = prixTTC - prixHT;
    const prixMoyenTTC = (prixTTC/quantity);
    return {prixMoyenTTC:prixMoyenTTC.toFixed(2), prixHT: prixHT.toFixed(2), prixTTC: prixTTC.toFixed(2), tva: tva.toFixed(2)}
  }

  createIntervention() {
    console.log('intervention Form');
    console.log(this.interventionForm);
    console.log(this.interventionForm.value);
    console.log(JSON.stringify(this.interventionForm.value, null, 2));
    let categories = this.interventionForm.value.categories.map((originalCategory) => {
      return {
        place: originalCategory.place,
        category: originalCategory.category,
        reparators: originalCategory.reparators.map((reparator) => {if(reparator.code) return reparator.code }),
        pieces: originalCategory.pieces
      };
    });


    this.intervenir.emit(categories);
  }
}
