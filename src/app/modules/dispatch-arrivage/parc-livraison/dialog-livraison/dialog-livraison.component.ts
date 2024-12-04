import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-livraison',
  templateUrl: './dialog-livraison.component.html',
  styleUrls: ['./dialog-livraison.component.css'],
})
export class DialogLivraisonComponent implements OnInit {
  headerColumuns = [
    'N° d’expédition',
    'N° de declaration',
    'Expediteur',
    'Destinataire',
  ];
  constructor() {}

  ngOnInit(): void {}
}
