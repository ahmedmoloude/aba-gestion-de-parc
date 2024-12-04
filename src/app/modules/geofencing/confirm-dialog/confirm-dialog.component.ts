import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastService } from 'app/services';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  spinner = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    private toast: ToastService
    ) { }

  ngOnInit(): void {
    console.log('DAAAAAAAATA', this.data)
  }

  saveGeo(data){
    this.dialogRef.close("SAVE")
  }
  
  saveMarker(){
    
    this.dialogRef.close("SAVE")
  }

  closeDialog(){
    this.dialogRef.close("CLOSE")
  }

  

}

