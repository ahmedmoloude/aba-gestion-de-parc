import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-stock',
  templateUrl: './dialog-stock.component.html',
  styleUrls: ['./dialog-stock.component.css'],
})
export class DialogStockComponent implements OnInit {
  headerColumuns = [
    'N° d’expédition',
    'N° de declaration',
    'Expediteur',
    'Destinataire',
  ];
  constructor() {}

  ngOnInit(): void {}
}
