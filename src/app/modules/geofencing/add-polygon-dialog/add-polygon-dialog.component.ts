import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastService } from 'app/services';
@Component({
  selector: 'app-add-polygon-dialog',
  templateUrl: './add-polygon-dialog.component.html',
  styleUrls: ['./add-polygon-dialog.component.css']
})
export class AddPolygonDialogComponent implements OnInit {
  spinner = false;
  showInput = false;
  filter: FormGroup;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AddPolygonDialogComponent>,
    private toast: ToastService
    ) { }

  ngOnInit(): void {
    this.setForm();
    console.log('DAAAAAAAATA', this.data)
  }

  setForm() {
    this.filter = new FormGroup({
      city_id: new FormControl('', Validators.required),
      zone_id: new FormControl('', Validators.required),
      zone_name: new FormControl('', Validators.required),
      zone_code: new FormControl('', Validators.required),
    });
  }

  closeDialog(){
    this.dialogRef.close("CLOSE")
  }

  savePolygon(type){
    if(type == 'ZONE'){
      if((!this.filter.value.zone_id || parseInt(this.filter.value.zone_id) == 0) && (this.filter.value.zone_name == "" || this.filter.value.zone_code == "" )){
        this.toast.error('Merci d\'entrer le nom et le code de la zone')
        return
      }
    }
    let typeRequest = (parseInt(this.filter.value.zone_id) == 0 && this.filter.value.zone_name) ? 'ADD' : 'UPDATE';
    this.dialogRef.close({
      zoneOrCity: type,
      zone_id:this.filter.value.zone_id, 
      zone_name:this.filter.value.zone_name,
      zone_code:this.filter.value.zone_code,
      typeRequest:typeRequest
    })
  }

  saveMarker(){
    
    this.dialogRef.close("SAVE")
  }

  onZoneChange(event){
    this.showInput = parseInt(event.value) == 0 ?  true : false;
  }
  

}
