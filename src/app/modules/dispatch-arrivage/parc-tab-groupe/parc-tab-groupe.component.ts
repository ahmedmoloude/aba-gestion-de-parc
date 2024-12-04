import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parc-tab-groupe',
  templateUrl: './parc-tab-groupe.component.html',
  styleUrls: ['./parc-tab-groupe.component.css'],
})
export class ParcTabGroupeComponent implements OnInit {
  showDiv = {
    convoyage: false,
    livraison: false,
    transit: false,
    stock: false,
  };

  constructor() {}

  ngOnInit(): void {}
}
