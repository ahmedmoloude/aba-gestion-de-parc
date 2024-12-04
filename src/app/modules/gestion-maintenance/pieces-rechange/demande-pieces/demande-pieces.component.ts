import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-demande-pieces',
  templateUrl: './demande-pieces.component.html',
  styleUrls: ['./demande-pieces.component.css'],
})
export class DemandePiecesComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit(): void {}
  historiquesortie() {
    this._router.navigate(['historiquesortie']);
  }
}
