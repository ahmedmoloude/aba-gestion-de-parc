import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-affect-role-habilitation',
  templateUrl: './affect-role-habilitation.component.html',
  styleUrls: ['./affect-role-habilitation.component.css']
})
export class AffectRoleHabilitationComponent implements OnInit {

  @Output() validate = new EventEmitter<boolean>();

  showDiv: boolean = false;
  showParc: boolean = false;
  showVehicules: boolean = false;
  showMaintenance : boolean = false;
  showFeuille : boolean = false;
  showConsommation : boolean = false;
  showCommerciale : boolean = false ;
  showTarifaire : boolean = false;
  showFacturation : boolean = false;
  showCreances : boolean = false;
  showCaisse : boolean = false;
  showAffretement : boolean = false;
  showConfiguration : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  validateHabilitation(){
    this.validate.emit(true);
  }


  toggleDiv() {
    this.showDiv = !this.showDiv;
  }
  toggleParc(){
    this.showParc = !this.showParc;
  }
  toggleVehicules(){
    this.showVehicules = !this.showVehicules;
  }
  toggleMaintenance(){
    this.showMaintenance = !this.showMaintenance;
  }
  toggleFeuille(){
    this.showFeuille = !this.showFeuille;
  }
  toggleConsommation(){
    this.showConsommation = !this.showConsommation;
  }
  toggleCommerciale(){
    this.showCommerciale = !this.showCommerciale;
  }
  toggleTarifaire(){
    this.showTarifaire = !this.showTarifaire;
  }
  toggleFacturation(){
    this.showFacturation = !this.showFacturation;
  }
  toggleCreances(){
    this.showCreances = !this.showCreances;
  }
  toggleCaisse(){
    this.showCaisse = !this.showCaisse;
  }
  toggleAffretement(){
    this.showAffretement = !this.showAffretement;
  }
  toggleConfiguration(){
    this.showConfiguration = !this.showConfiguration;
  }

}
