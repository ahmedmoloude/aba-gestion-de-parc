import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-palette',
  templateUrl: './service-palette.component.html',
  styleUrls: ['./service-palette.component.css'],
})
export class ServicePaletteComponent implements OnInit {
  headerColumuns = ['Rubrique', 'Base de calcul', 'Valeur'];
  p: number = 1;
  constructor() {}

  ngOnInit(): void {}
}
