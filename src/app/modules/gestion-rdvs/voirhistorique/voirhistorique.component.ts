import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-voirhistorique',
  templateUrl: './voirhistorique.component.html',
  styleUrls: ['./voirhistorique.component.css']
})
export class VoirhistoriqueComponent implements OnInit {

  item : any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    this.item = this.data["item"];
    console.log("item", this.item)
  }

}
