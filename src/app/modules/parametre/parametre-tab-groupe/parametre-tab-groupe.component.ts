import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { fetchProductNature } from 'app/core/store/productcategory/productcategory.actions';
import { selectNatureProduct } from 'app/core/store/productcategory/productcategory.selector';

@Component({
  selector: 'app-parametre-tab-groupe',
  templateUrl: './parametre-tab-groupe.component.html',
  styleUrls: ['./parametre-tab-groupe.component.css']
})
export class ParametreTabGroupeComponent implements OnInit {
  constructor(public dialog: MatDialog,private store: Store<AppState>) { }

  ngOnInit(): void {

  }



}
