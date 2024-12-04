import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastService } from 'app/services';
@Component({
  selector: 'app-add-entity',
  templateUrl: './add-entity.component.html',
  styleUrls: ['./add-entity.component.css']
})
export class AddEntityComponent implements OnInit {
  spinner = false;
  showInput = false;
  form: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AddEntityComponent>,
    private toast: ToastService
    ) { }

  ngOnInit(): void {
    this.setForm();
    console.log('DAAAAAAAATA', this.data)
  }

  setForm() {
    this.form = new FormGroup({
      city_name: new FormControl('', Validators.required),
      city_code: new FormControl('', Validators.required),
      zone_name: new FormControl('', Validators.required),
      zone_code: new FormControl('', Validators.required),
      sector_name: new FormControl('', Validators.required),
      sector_code: new FormControl('', Validators.required),
    });
  }

  addEntity(data){
    if(data.type == 'CITY'){
      if(!this.form.value.city_name || !this.form.value.city_code){
        this.toast.error('Merci d\'entrer le nom et le code de la ville')
        return
      }
    }
    if(data.type == 'ZONE'){
      if(!this.form.value.zone_name || !this.form.value.zone_code){
        this.toast.error('Merci d\'entrer le nom et le code de la zone')
        return
      }
    }
    if(data.type == 'SECTOR'){
      if(!this.form.value.sector_name || !this.form.value.sector_code){
        this.toast.error('Merci d\'entrer le nom et le code du secteur')
        return
      }
    }

    this.dialogRef.close({
      entity: data.type,
      city_name: this.form.value.city_name, 
      city_code: this.form.value.city_code, 
      zone_name: this.form.value.zone_name, 
      zone_code: this.form.value.zone_code, 
      sector_name: this.form.value.sector_name, 
      sector_code: this.form.value.sector_code, 
      city_id: data.city_id, 
      zone_id: data.zone_id, 
    })
  }

  closeDialog(){
    this.dialogRef.close("CLOSE")
  }

  

}
