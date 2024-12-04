import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-convention-tab-groupe',
  templateUrl: './convention-tab-groupe.component.html',
  styleUrls: ['./convention-tab-groupe.component.css'],
})
export class ConventionTabGroupeComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ConventionTabGroupeComponent>) {}

  ngOnInit(): void {}
}
