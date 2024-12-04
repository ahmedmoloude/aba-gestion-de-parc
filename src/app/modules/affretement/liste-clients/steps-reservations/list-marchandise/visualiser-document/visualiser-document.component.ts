import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-visualiser-document',
  templateUrl: './visualiser-document.component.html',
  styleUrls: ['./visualiser-document.component.css'],
})
export class VisualiserDocumentComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<VisualiserDocumentComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {}

  documents: any[];
  ngOnInit(): void {
    console.log(this.dialogData);
    this.documents = this.dialogData?.visualiserDocuments;
    console.log(this.documents);
  }
}
