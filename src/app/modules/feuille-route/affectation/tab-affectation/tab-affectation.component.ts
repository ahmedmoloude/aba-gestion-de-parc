import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
// import { selectParc } from 'app/core/store/resources/resources.selectors';
import { selectEnvparcPayload } from 'app/core/store/parc/parc.selectors';
import { PersonelService } from 'app/core/services/personel.service';
@Component({
  selector: 'app-tab-affectation',
  templateUrl: './tab-affectation.component.html',
  styleUrls: ['./tab-affectation.component.css'],
})
export class TabAffectationComponent implements OnInit {
  selectedTabIndex = 0;
  parcs : any;
  Conducteur_disponible:number=0;
  truck_dispo : number = 0  ;


  constructor(private store: Store<AppState>, private personelService:PersonelService ) {}

  ngOnInit(): void {
    this.store.select(selectEnvparcPayload).subscribe((res) => {  
      this.parcs = res.length
      console.log("parcs nbr", this.parcs)
    });
    this.personelService.getConducteurDisponible().subscribe((res:any)=>{
      this.Conducteur_disponible = res.response
    })

  this.getTruckDispo()
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.selectedTabIndex = this.selectedTabIndex + 1;
    this.selectedTabIndex = tabChangeEvent.index;
  }
  getTruckDispo(){
    // comment 
    this.personelService.getTruckDispoCount().subscribe((res:any)=>{
      this.truck_dispo = res.response
  })
  }
}
