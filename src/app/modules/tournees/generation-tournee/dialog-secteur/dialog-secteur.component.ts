import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dialog-secteur',
  templateUrl: './dialog-secteur.component.html',
  styleUrls: ['./dialog-secteur.component.css'],
})
export class DialogSecteurComponent implements OnInit {
  toppings = new FormControl();

  toppingList = ['Vial Medical', 'Sud Ice', 'Onion', 'Atlas Voyage'];
  selectedToppings;
  constructor() {}

  ngOnInit(): void {}
}
