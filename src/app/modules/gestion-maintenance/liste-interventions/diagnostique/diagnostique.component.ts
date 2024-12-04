import { Component, OnDestroy, OnInit } from '@angular/core';
import { DetailVehiculeComponent } from '../detail-vehicule/detail-vehicule.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ValidationDiagComponent } from './validation-diag/validation-diag.component';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { Observable, Subscription } from 'rxjs';
import { DiagnostiqueState } from 'app/core/store/maintenance/diagnostique/diagnostique.reducer';
import { MaintenanceStateEnum } from 'app/core/store/maintenance/maintenance-intervention/maintenance-intervention.reducer';
import { loadDiagnostique } from 'app/core/store/maintenance/diagnostique/diagnostique.actions';
import { Truck } from 'app/core/models/maintenance/intervention-maintenance.model';
import { loadPieceRechanges } from 'app/core/store/maintenance/piece-rechange/piece-rechange.actions';
import { PieceRechangeState } from 'app/core/store/maintenance/piece-rechange/piece-rechange.reducer';
import { cloneDeep } from 'lodash';
import { DiagnostiqueRequest } from 'app/core/models/maintenance/diagnostique-request.model';
import { BonCommandeComponent } from '../../demande-pieces-maintenance/bon-commande/bon-commande.component';
import { InterventionBonCommandeComponent } from '../intervenir/intervention-bon-commande/intervention-bon-commande';
import { CategoryState } from 'app/core/store/maintenance/category/category.reducer';
import { loadCategories } from 'app/core/store/maintenance/category/category.actions';

@Component({
  selector: 'app-diagnostique',
  templateUrl: './diagnostique.component.html',
  styleUrls: ['./diagnostique.component.css']
})
export class DiagnostiqueComponent implements OnInit, OnDestroy {
  rechangegroup: FormGroup;
  diagnostiqueForm: FormGroup;
  types = ['PNEU', 'KILOMETRAGE'];
  searchStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'};
  contentStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'};

  pieceRechange$: Observable<PieceRechangeState> = this.store.select(state => state.pieceRechange);
  piecesRechange = [];
  diagnostique$: Observable<DiagnostiqueState> = this.store.select(state => state.diagnostique);
  diagnostiqueSubscription: Subscription;
  intervention;

  category$: Observable<CategoryState> = this.store.select(state => state.category);
  categorySubscription: Subscription;
  categories = [];

  constructor(public dialog: MatDialog,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadCategories());
    this.categorySubscription = this.category$.subscribe(
      (resp) => {
        if(resp?.dataState == MaintenanceStateEnum.SUCCESS && resp?.categories)
          this.categories = resp.categories;
          this.initForm();
      }
    );

    this.store.dispatch(loadPieceRechanges());
    this.pieceRechange$.subscribe(
      (resp) => {
        if(resp?.dataState == MaintenanceStateEnum.SUCCESS && resp?.piecesRechange){
          let data = cloneDeep(resp.piecesRechange);
          console.log(data);
          if (data)
          this.piecesRechange = data.map(e => ({...e, piece : e.name.name}));
        }
      }
    );

    let uuid: string = this.route.snapshot.params['uuid'];
    let status = true;
    if(uuid) {
      this.diagnostiqueSubscription = this.diagnostique$.subscribe(
        (resp) => {
          if (resp?.dataState != MaintenanceStateEnum.SUCCESS || !resp?.maintenanceIntervention) {
            status = false;
          }
          else if(resp?.maintenanceIntervention){
            this.intervention = resp.maintenanceIntervention;
          }
        }
      )
      if(!status) {
        this.store.dispatch(loadDiagnostique({data: uuid}));
      }
    }

  }

  initForm() {
    const rechangeGroup = this.fb.group({
      reference : [null, Validators.required],
      type : [null, Validators.required],
      quantite : [null, Validators.required]
    });
    this.rechangegroup = this.fb.group({
      category: [null, Validators.required],
      rechanges: this.fb.array([
        rechangeGroup
      ],Validators.required),
      filteredCategories: [this.categories]
    });

    this.diagnostiqueForm = this.fb.group({
      interventions: this.fb.array([this.rechangegroup], Validators.required)
    });
  }

  selectPieceRechange(event, j, i){
    console.log(event);
    const intervention = this.interventions.controls[j] as FormGroup;
    const rechanges = intervention.controls.rechanges as FormArray;
    const rechange = rechanges.controls[i] as FormGroup;
    rechange.controls.reference.setValue(event.id)
  }

  get interventions() {
    return this.diagnostiqueForm.get('interventions') as FormArray;
  }

  addIntervention() {
    const filterdCategories = this.getFiltredCategories(this.interventions.length - 1);
    if(filterdCategories && filterdCategories?.length>0) {
      const rechangeGroup = this.fb.group({
        reference : [null, Validators.required],
        type : [null, Validators.required],
        quantite : [null, Validators.required],
      });
      const interventionGroup = this.fb.group({
        category: [null, Validators.required],
        rechanges: this.fb.array([rechangeGroup]),
        filteredCategories: [filterdCategories]
      });
      this.interventions.push(interventionGroup);
    }
  }

  removeIntervention(index: number) {
    this.interventions.removeAt(index);
  }

  getFiltredCategories(index: number){
    let filterdCategories = this.categories;
    for (let i = 0; i < this.interventions.length; i++) {
      const selectedCategory = this.interventions.at(i).get('category').value;
      filterdCategories = filterdCategories.filter(category => category.id !== selectedCategory);
    }
    return filterdCategories;
  }

  onCategoryChange(index: number) {
    const selectedCategory = this.interventions.at(index).get('category').value;
    // const filterdCategories = this.interventions.at(index).get('filteredCategories').value;
    let filterdCategories = this.categories;
    for (let i = 0; i < this.interventions.length; i++) {
      if(i!==index) {
        const selectedCategory = this.interventions.at(i).get('category').value;
        filterdCategories = filterdCategories.filter(category => category.id !== selectedCategory);
      }
    }
    this.interventions.at(index).get('filteredCategories').setValue(filterdCategories);
    // Check if the selected category is already used in another intervention
    const isCategoryUsed = this.interventions.value
      .filter((_, i) => i !== index) // Exclude the current intervention
      .some((intervention) => intervention.category === selectedCategory);

    if (isCategoryUsed) {
      console.error('Category already selected in another intervention');
      this.interventions.at(index).get('category').setValue(null, { emitEvent: false });
    } else {
      this.interventions.at(index).get('filteredCategories').setValue(filterdCategories);
    }
  }


  get rechanges() {
    return this.rechangegroup.get('rechanges') as FormArray;
  }

  addRechange(j) {
    const rechangeGroup = this.fb.group({
      reference : [null, Validators.required],
      type : [null, Validators.required],
      quantite : [null, Validators.required],
    });

    const intervention = this.interventions.controls[j] as FormGroup;
    const rechanges = intervention.controls.rechanges as FormArray;
    rechanges.push(rechangeGroup);
  }

  removeRechange(j, index: number) {
    const intervention = this.interventions.controls[j] as FormGroup;
    const rechanges = intervention.controls.rechanges as FormArray;
    rechanges.removeAt(index);
  }

  historiquevehicule( data: Truck): void {
    this.dialog.open(DetailVehiculeComponent, {
      disableClose: true,
      width: '741px',
      height: '100vh',
      data:  data,
      position: { right: '0px' },
    });
  }

  filterType(event){
    console.log(event)
  }

  validationdocument(): void {
    if(this.diagnostiqueForm.invalid) return;
    console.log('this.diagnostiqueForm.value');
    console.log(this.diagnostiqueForm.value);
    let formvalue = this.diagnostiqueForm.value.interventions;
    let request: DiagnostiqueRequest = new DiagnostiqueRequest();
    request.demande_intervention_id = this.intervention.id;
    let data = [];
    for (const item of formvalue) {
        if (item.rechanges.length < 1) {
          let category = {
            category_id: item.category,
            type: 'category',
            piece_rechange_id: null,
            type_piece_rechange:null,
            quantity: null,
          }
          data.push(category);
        } else {
          for (const iterator of item.rechanges) {
            let piece = {
              piece_rechange_id: iterator.reference,
              type_piece_rechange:iterator.type,
              quantity: iterator.quantite,
              category_id: item.category,
              type: 'piece'
            }
            data.push(piece);
          }
        }
    }
    request.data = data;
    console.log('request');
    console.log(request);

    const dialogRef = this.dialog.open(ValidationDiagComponent, {
      disableClose: false,
      width: '552px',
      data: {demande: this.intervention.n_demande,request: request},
    });
  }

  getBonCommande(data): void {
    const dialogRef = this.dialog.open(InterventionBonCommandeComponent, {
      disableClose: false,
      width: '650px',
      data: data,
    });
}


  // intervenir
  createIntervention(event) {
    console.log('createIntervention');
    console.log(event);
    this.getBonCommande(event);
  }

  ngOnDestroy(): void {
    this.diagnostiqueSubscription?.unsubscribe();
    this.categorySubscription?.unsubscribe();
  }
}
