import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FeuilleDeRouteService} from '../../../../core/services/feuille-de-route.service'
import { environment } from 'environments/environment';
import { PersonelService } from '../../../../core/services/personel.service';
import { element } from 'protractor';
import {VehiculeService} from '../../../../core/services/vehicule.service';
@Component({
  selector: 'app-detail-feuille',
  templateUrl: './detail-feuille.component.html',
  styleUrls: ['./detail-feuille.component.css']
})
export class DetailFeuilleComponent implements OnInit {
  RoadMap : any ;
  spinner : boolean = false ;
  // url = environment.STORAGE;
  prod_url  = environment.STORAGE
  cities : any = [];
  citerns : any = [];
  parcs : any = [];
  url = environment.STORAGE + '/depense/';
  url_infraction = environment.STORAGE + '/sinistre_vehicule/';


  mapTypeToName = {
    TOUR : 'Tournée',
    COVOYAGE : 'Convoyage',
    AFFRETMENT : 'Affrétement',
    TRANSFERT : 'Transfert'
  }


  mapTypeTour  = {
    PICKUP : 'Ramassage',
    DELIVERY : 'Livraison',
    MIXTE : 'Mixe'
  }

  constructor(private router: Router , private vehiculeService:VehiculeService , private route: ActivatedRoute, private feuilleDeRouteService : FeuilleDeRouteService ,private personelService :PersonelService) { }

  ngOnInit(): void {
    this.vehiculeService.getCiterne().subscribe((res:any)=>{
      this.citerns = res.response.data
    })
    const uuid = this.route.snapshot.params.uuid;
    this.getFeulleDeRout(uuid)
    this.getallCities()
  }
  getFeulleDeRout(uuid){
    this.spinner = true
    this.feuilleDeRouteService.getRoadMap(uuid).subscribe((res:any)=>{
      this.RoadMap = res.response
      this.spinner = false
    })
  }
  checkFileType(file : string){
     const regex = new RegExp('[^.]+$');
     if((/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(file) ){
      return "IMG";
     }
     else if(file.match(regex)[0]==='pdf'){
      return "PDF";
     }
     else{
      return "none" ;
     }
     // comment

  }
  getPdf(url,id){
    window.open(this.prod_url+'/depense/'+id +'/'+url);
    return false;
  }
  getallCities(){
    this.personelService.getAllCities().subscribe((res)=>{
      this.cities = res
    })
  }
  getCity(id) {
    let citie = ''
    this.cities.forEach(element => {
      if(element.id === id) {
        citie = element.name
      }
    }
    );
     return citie ;
  }
  getActivite(string:string){
    var name = '';
    var activite = string.split('\\')
    name = activite[activite.length-1];
    return name == 'Demande' ? 'Affrétement' : name ;
  }
  getParck(id:number){
    var name = ''
    this.citerns.forEach(element=>{
      if(element.parc.id === id)
      {
       name = element.name
      }
    })
    let citerne = this.citerns?.find(e => e.parc?.id == id)
    return citerne? citerne.name + ' - ' + citerne.parc?.name : '---' ;
  }




  redirectToDetails(type : string , uuid  , status?) {
    if (type == 'TOUR') {
      if (status === 'INITIALIZED' || status === 'PLANED'){
        this.router.navigate([`/planification-tour/${uuid}`]);
      }
      else this.router.navigate([`/detailstournees/${uuid}`]);
    }
    else if(type =='AFFRETMENT'){
      this.router.navigate([`detailsAffretement/${uuid}`]);
    }
  }


}
