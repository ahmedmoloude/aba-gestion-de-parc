import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'environments/environment';
@Component({
  selector: 'app-dialog-commentaire',
  templateUrl: './dialog-commentaire.component.html',
  styleUrls: ['./dialog-commentaire.component.css']
})
export class DialogCommentaireComponent implements OnInit {

  pointChargement : any =[];
  images: any[] = [];
  url = environment.STORAGE + '/points_dechargement/';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    this.pointChargement = this.data["point"];
    this.pointChargement.images.forEach((image) => {
      this.images.push(this.url + this.pointChargement.id + '/' + image.file);
    });
    console.table(this.images);
    console.log("data get edit", this.pointChargement)
  }

}
