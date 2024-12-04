import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Config } from 'app/config';
import { AppState } from 'app/core/store/app.states';
import { DiagnostiqueState } from 'app/core/store/maintenance/diagnostique/diagnostique.reducer';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-intervention-validation-documents',
  templateUrl: './intervention-validation-documents.component.html',
  styleUrls: ['./intervention-validation-documents.component.css']
})
export class InterventionValidationDocumentsComponent implements OnInit, OnDestroy {
  headerColumuns = [
    'Nom de pièce',
    'Quantité demandée',
    // 'Prix unitaire',
    // 'Prix HT',
    // 'TVA',
    // 'Total TTC',
  ];

  diagnostique$: Observable<DiagnostiqueState> = this.store.select(state => state.diagnostique);
  diagnostiqueSubscription: Subscription;

  demande= this.data;

  url: string = Config.api.bill.printBill;

  sommePrixUnitaire;
  sommeMontantHT;
  sommeTva;
  sommeMontantTTC;

  constructor(private dialogRef: MatDialogRef<InterventionValidationDocumentsComponent>,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) private data: string) { }

  ngOnInit(): void {
  }

  calculateSum(arr, property) {
    return arr?.reduce((sum, item) => sum + this.getFloatValue(item[property]), 0);
  }

  getFloatValue(value) {
    if(typeof value == 'number'){
      return value;
    }
    return parseFloat(value);
  }

  calculerSommePrixUnitaire(elements: { prix_unitaire: number }[]): number {
     this.sommePrixUnitaire = elements.reduce((total, element) => total + element.prix_unitaire, 0);

    return this.sommePrixUnitaire;
  }

  calculerSommeMontantHT(elements: { montant_ht: number }[]): number {
    this.sommeMontantHT = elements.reduce((total, element) => total + element.montant_ht, 0);
    return this.sommeMontantHT;
  }

  calculerTva(elements: { tva: number }[]): number {
    this.sommeTva = elements.reduce((total, element) => total + element.tva, 0);
    return this.sommeTva;
  }

  calculerSommeMontantTTC(elements: { montant_ttc: number }[]): number {
    this.sommeMontantTTC = elements.reduce((total, element) => total + element.montant_ttc, 0);
    return this.sommeMontantTTC;
  }

  printBonCommande(path: string){
    const link = document.createElement('a');
    link.href = this.url+path;
    link.target = '_blank';
    link.download = 'Bon de commande interne N° ' + this.demande + '.pdf';
    link.click();
  }

  ngOnDestroy(): void {
    this.diagnostiqueSubscription?.unsubscribe();
  }
}
