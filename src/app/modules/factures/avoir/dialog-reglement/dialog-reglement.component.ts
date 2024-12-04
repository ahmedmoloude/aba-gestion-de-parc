import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-reglement',
  templateUrl: './dialog-reglement.component.html',
  styleUrls: ['./dialog-reglement.component.css'],
})
export class DialogReglementComponent implements OnInit {
  validations = [];
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
    public dialogRef: MatDialogRef<DialogReglementComponent>,
  ) { }

  ngOnInit(): void {
    console.log('DIALOGDATA ', this.dialogData)
    let workflow  = this.dialogData.workflow
    workflow = [...workflow];
    this.validations = workflow.sort((a,b) => a.niveau - b.niveau)
  }
}
