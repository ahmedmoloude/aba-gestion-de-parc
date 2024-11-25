import { Component, OnInit,Inject } from '@angular/core';
import { PersonelService } from 'app/core/services/personel.service';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {  MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-historique-epi',
  templateUrl: './historique-epi.component.html',
  styleUrls: ['./historique-epi.component.css'],
})
export class HistoriqueEpiComponent implements OnInit {
  headerColumuns = [
    'Type',
    'N° de série',
    'Date d’attribution',
    'Montant',
  ];
  isLoading :boolean = false
  telePhonneTotale :number=0;
  casqueTotale : number = 0;
  ChaussureSecuriteTotale : number = 0 ;
  GantsTotale : number = 0 ;
  epis : [];
  uuid:any;
  form = new FormGroup({});
  constructor(private personelService:PersonelService, private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public dialogData: any, 
    ) {}
  
  ngOnInit(): void {
    this.getEpis()
    this.initialseForm()
  }
  getEpis(){
    this.isLoading = true
     this.personelService.getEpisAllOfPersonnel(this.dialogData.uuid).subscribe((res:any)=>{
      this.epis = res.response.epis
      this.telePhonneTotale = res.response.totaleTelephone
      this.casqueTotale = res.response.totleCasque 
      this.ChaussureSecuriteTotale = res.response.ChaussureSecuriteTotale
      this.GantsTotale = res.response.GantsTotale
      this.isLoading = false
     })
  }
  initialseForm(){
    this.form = new FormGroup({
      type:new FormControl("", Validators.required),
      date_attr : new FormControl("", Validators.required),
      date_mise_à_jours :new FormControl("", Validators.required),
    })
  }
  filtrer(){
    this.personelService.getEpisWithFiltre(this.form.value).subscribe((res:any)=>{
      this.epis = res.response.epis
    })
  }
}
