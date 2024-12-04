import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-historiquestatut',
  templateUrl: './historiquestatut.component.html',
  styleUrls: ['./historiquestatut.component.css']
})
export class HistoriquestatutComponent implements OnInit {

  item : any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    this.item = this.data["item"];
    console.log("item", this.item)
  }

}
