import { Component, OnInit } from '@angular/core';
import {PersonelService} from '../../../../core/services/personel.service' ;
@Component({
  selector: 'app-disponibilite-conducteur',
  templateUrl: './disponibilite-conducteur.component.html',
  styleUrls: ['./disponibilite-conducteur.component.css'],
})

export class DisponibiliteConducteurComponent implements OnInit {
  headerColumuns = [
    'N°',
    'Conducteur',
    'Matricule',
    'NB mission effectué (mois)',
    'Km parcouru',
    // 'NB d’heures de conduites',
    'Date de fin dernière mission',
    'Statut',
    'Motif',
  ];

  inputsFiler = [
    {
      name: 'Conducteur',
      placeholder: 'Conducteur',
      type: 'text',
    },
    {
      name: 'matricule',
      placeholder: 'Immatriculation',
      type: 'text',
    },
    {
      name: 'status',
      placeholder: 'Statut',
      type: 'select',
      options: [
        {
          text: 'Disponible',
          value: 1,
        },
        {
          text: 'Indisponible',
          value: 0,
        }
      ],
    },
  ];

  conducteur_dispo : any = [];
  spinner : boolean = false ;
  links : any = [];
  filtre = {
    Conducteur: '',
    matricule : ' ',
    statut : '',
  }

  constructor(private personelService : PersonelService) {}

  ngOnInit(): void {
    this.getConducteur()
  }
  getConducteur(){
    this.spinner = true ;
    this.personelService.getConduteurDispo().subscribe((res:any)=>{
      this.conducteur_dispo = res.response.data ;
      this.links = res.response.links ;
      this.spinner = false
    })
  }
  getTheNext(event){
    this.spinner = true ;
    this.personelService.getConduteurDispo(event).subscribe((res:any)=>{
      this.conducteur_dispo = res.response.data ;
      this.links = res.response.links ;
      this.spinner = false
    })
  }

  filtrer($event){
    console.log("FILTER CDT", $event)
    this.spinner = true ;
    this.personelService.getPersonnelDispWithFiltre(event).subscribe((res:any)=>{
      this.conducteur_dispo = res.response.data ;
      this.links = res.response.links ;
      this.spinner = false
    })

  }

  getPersonnelsWithFiltre(){
    this.spinner = true ;
    this.personelService.getPersonnelDispWithFiltre(this.filtre).subscribe((res:any)=>{
      this.conducteur_dispo = res.response.data ;
      this.links = res.response.links ;
      this.spinner = false
    })
  }
  getStatut(event) {
    this.filtre.statut = event.value
  }
  getMatricule(event){
    this.filtre.matricule =event.target.value
  }
  getConducteur2(event){
    this.filtre.Conducteur = event.target.value
  }
  lastDateOfMission(convoyages,transferts ,tours){

      var dates = []
      if (convoyages.length!=0) {
        dates.push(
         convoyages.reduce((m,v,i) => (v.start_date > m.start_date) && i ? v : m).start_date
        )
       }
    if(transferts.length !=0){
        dates.push(
          transferts.reduce((m,v,i) => (v.start_date > m.start_date) && i ? v : m).start_date
        )
    }
    if(tours.length !=0 ){
      dates.push(
        tours.reduce((m,v,i) => (v.start_date > m.start_date) && i ? v : m).start_date
      )
    }
        if(dates && dates.length !=0){
          return dates.reduce(function (a, b) {
            return a > b ? a : b;
        });
        }
        else {
          return '---';
        }
  }
  getNumberOfMissionByMounth(convoyages,transferts ,tours){
    let i  = 0
    var date = new Date();
    var first_date = new Date(date);
    var lastDay = new Date(first_date);
    lastDay.setUTCDate(1);
    lastDay.setUTCMonth(lastDay.getUTCMonth() + 1);
    lastDay.setUTCDate(0) ;
    if(convoyages.length!=0){
      convoyages.forEach(element => {
        if(element.start_date < lastDay.toJSON().substring(0, 10)){
          i++
        }
      });
    }
    if(transferts.length!=0){
      convoyages.forEach(element => {
        if(element.start_date < lastDay.toJSON().substring(0, 10)){
          i++
        }
      });
    }
    if(tours.length!=0){
      convoyages.forEach(element => {
        if(element.start_date < lastDay.toJSON().substring(0, 10)){
          i++
        }
      });
    }
    return i ;
  }

  getNumberOfMission(missions) {
    let numberOfMission = 0;
    for (const mission of missions) {
        numberOfMission += mission.missions?.length;
    }
    return numberOfMission;
  }

  getKmParcouru(froute_closed: any[]) {
    let distance_totale = 0;
    // Calcul de la distance totale parcourue
    for (const trajet of froute_closed) {
        const distance_parcourue = trajet.km_fin - trajet.km_depart;
        distance_totale += distance_parcourue;
    }
    return distance_totale;
  }

}
