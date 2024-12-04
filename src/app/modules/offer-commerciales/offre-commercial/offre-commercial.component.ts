import { ConventionDialogComponent } from './../convention/convention-dialog/convention-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import {
  selectTreeDisableActions,
  selectTreeOffer,
} from 'app/core/store/tree-offer/tree-offer.selectors';
import { Router } from '@angular/router';
@Component({
  selector: 'app-offre-commercial',
  templateUrl: './offre-commercial.component.html',
  styleUrls: ['./offre-commercial.component.css'],
})
export class OffreCommercialComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private store: Store<AppState>,
    private router: Router
  ) {}
  disableActions$ = this.store.select(selectTreeDisableActions);
  offer = null;
  type_tree = null;

  ngOnInit(): void {
    this.type_tree = this.router.url.split('/')[1];
    this.store
      .select(selectTreeOffer)
      .subscribe((res) => (this.offer = res.commerciale_offer));
  }

  openDialog(type_rubric: string): void {
    this.dialog.open(ConventionDialogComponent, {
      disableClose: true,
      width: '831px',
      data: { type_rubric },
    });
  }

  isProspect() {
    if (this.type_tree == 'tree-offer') {
      return this.offer.customer?.is_prospect
    }
    else {
      return this.offer.quote_parent.customer?.is_prospect || false
    }
  }
}
