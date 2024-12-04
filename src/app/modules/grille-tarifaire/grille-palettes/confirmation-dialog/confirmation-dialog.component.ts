import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css'],
})
export class ConfirmationDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>, private store: Store<AppState>, @Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit(): void {}

  action() {
    this.store.dispatch(this.data.action(this.data.payload))
    this.dialogRef.close();
  }
}
