import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-detail-demande-dialog',
  templateUrl: './detail-demande-dialog.component.html',
  styleUrls: ['./detail-demande-dialog.component.css']
})
export class DetailDemandeDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<DetailDemandeDialogComponent>,) { }

  ngOnInit(): void {
    console.log('DATA ', this.data)
  }

}
