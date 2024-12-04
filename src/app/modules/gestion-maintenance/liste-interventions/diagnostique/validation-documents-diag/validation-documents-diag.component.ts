import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-validation-documents-diag',
  templateUrl: './validation-documents-diag.component.html',
  styleUrls: ['./validation-documents-diag.component.css']
})
export class ValidationDocumentsDiagComponent implements OnInit {
  headerColumuns = [
    'Nom de pièce',
    'Quantité demandée',
    'Prix unitaire',
    'Prix HT',
    'TVA',
    'Total TTC',
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
