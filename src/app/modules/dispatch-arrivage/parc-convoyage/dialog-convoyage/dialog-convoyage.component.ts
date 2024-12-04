import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-convoyage',
  templateUrl: './dialog-convoyage.component.html',
  styleUrls: ['./dialog-convoyage.component.css'],
})
export class DialogConvoyageComponent implements OnInit {
  headerColumuns = [
    'N° d’expédition',
    'N° de declaration',
    'Expediteur',
    'Destinataire',
  ];

  constructor() {}

  ngOnInit(): void {}
}
