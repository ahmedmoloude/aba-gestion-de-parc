import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Truck } from 'app/core/models/maintenance/intervention-maintenance.model';

@Component({
  selector: 'app-detail-vehicule',
  templateUrl: './detail-vehicule.component.html',
  styleUrls: ['./detail-vehicule.component.css']
})
export class DetailVehiculeComponent implements OnInit {

  truck: Truck = this.data;

  constructor(@Inject(MAT_DIALOG_DATA) private data: Truck) { }

  ngOnInit(): void {
  }

}
