import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-ramassage',
  templateUrl: './dialog-ramassage.component.html',
  styleUrls: ['./dialog-ramassage.component.css']
})
export class DialogRamassageComponent implements OnInit {

  searchStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}
  contentStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}

  cities: any;
  agence : any;
  chauffeur : any;
  constructor() { }

  ngOnInit(): void {
  }

  departChange(event) {
  }

  departAgence(event){

  }
  departChauffeur(event){

  }

}
