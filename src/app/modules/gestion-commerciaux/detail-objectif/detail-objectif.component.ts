import { PersonelService } from './../../../core/services/personel.service';
import { CommercialService } from './../../../core/services/commercial.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-objectif',
  templateUrl: './detail-objectif.component.html',
  styleUrls: ['./detail-objectif.component.css']
})
export class DetailObjectifComponent implements OnInit {

  uuid :any;
  details : any;
  spinner : boolean = false;
  headerColumuns = ['Objectif', 'Année', 'Janvier', 'Février', 'Mars', 'Avril', 'Mai',
  'Juin', 'Juillet', 'Aôut', 'Séptembre', 'Octobre', 'Novembre', 'Décembre'];

  constructor(private commercialService : CommercialService ,
              private personelservice : PersonelService ,
              private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.uuid = this.route.snapshot.params.uuid;

    this.spinner = true;
    this.personelservice.personnelbyUuid(this.uuid).subscribe((res:any) => {
      this.details = res.response;
      console.log("details", this.details)
      this.spinner = false;
    })

  }

}
