import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-transit',
  templateUrl: './dialog-transit.component.html',
  styleUrls: ['./dialog-transit.component.css'],
})
export class DialogTransitComponent implements OnInit {
  headerColumuns = [
    'N° d’expédition',
    'N° de declaration',
    'Expediteur',
    'Destinataire',
  ];
  constructor() {}

  ngOnInit(): void {}
}
