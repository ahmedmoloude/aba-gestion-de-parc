import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VehiculeService } from 'app/core/services/vehicule.service';

@Component({
  selector: 'app-dialog-transport',
  templateUrl: './dialog-transport.component.html',
  styleUrls: ['./dialog-transport.component.css']
})
export class DialogTransportComponent implements OnInit {
  typeForm: FormGroup;
  truckTypes: any[];
  tonnage: any[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<DialogTransportComponent>,
              private formBuilder: FormBuilder,
              private vehiculeService: VehiculeService
  ) { }

  ngOnInit(): void {

    this.vehiculeService.getTruckType().subscribe((data: any) => {
      this.truckTypes = data.response
      console.log('DATA', data)
    })

    this.typeForm = this.formBuilder.group({
      type: [''], // Initial value can be set here
      tonnage: [''], // Initial value can be set here
      prix_min: [''] // Initial value can be set here
    });

    this.typeForm.get('type').valueChanges.subscribe(type => {
      console.log('TEST', this.truckTypes.filter(e => e.id == type))
      this.tonnage = this.truckTypes.filter(e => e.id == type)[0]['tonnages']
    })
  }

  addType(){
    // this.dialogRef.close(this.typeForm.value);

    let camion = this.truckTypes.find(e => e.id ==this.typeForm.value.type)
    console.log('CAM', camion)
    this.dialogRef.close({
      ...this.typeForm.value,
      camion_name: camion.name,
      prix_min: this.typeForm.get('prix_min').value,
      tonnage_name: camion.tonnages.find(e => e.id == this.typeForm.value.tonnage).name
    });
    console.log(this.truckTypes)
  }

}
