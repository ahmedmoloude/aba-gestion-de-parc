import { Component, OnInit,Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { VehiculeService } from 'app/core/services/vehicule.service';
import { AppState } from 'app/core/store/app.states';
import { selectEnvVehiculeDocumentPayload, selectEnvVehiculeDocumentIsLoading } from 'app/core/store/vehiculedocument/vehiculedocument.selectors';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-assurance',
  templateUrl: './assurance.component.html',
  styleUrls: ['./assurance.component.css'],
})
export class AssuranceComponent implements OnInit {
  spinner : boolean = false;
  vehicule: any;
  documents: any;
  asurances: any;
  vignettes: any;
  visites: any;
  carteGrises: any;
  autorisations: any;
  tachygraphes: any;
  essieus: any;
  @Input()
  item : string;
  url = environment.STORAGE + '/document_vehicule/';
  
  constructor(private store: Store<AppState>,
              private vehiculeService: VehiculeService,) { }


  ngOnInit(): void {
    console.log(this.item, " vehicule get ")

    // this.vehiculeService.getTruckDocument().subscribe(
    //   (data) => {
    //     console.log('data', data["response"]);
    //     // this._toast.success("Documents ajouté avec succés");
    //     this.spinner = false;
    //     // this.dialogRef.close(data["response"]);
    //   },
    //   (error) => {
    //     console.log('error', error);
    //     this.spinner = false;
    //     // this._toast.error("Une erreur est survenue");
    // });

    // this.store.select(selectEnvVehiculeDocumentPayload).subscribe((res) => { 
    //   console.log("documents", res)
    //   this.documents = res.filter(document => document.truck_id == this.id);
    //   console.log(" documents ========>", this.documents)

    //   this.asurances = this.documents.filter(assurance => assurance.type == "ASSURANCE");
    //   // console.log(" asurances ========>", this.asurances)
    //   this.vignettes = this.documents.filter(vignette => vignette.type == "VIGNETTE");
    //   // console.log(" vignettes ========>", this.vignettes)
    //   this.visites = this.documents.filter(visite => visite.type == "VISITE_TECHNIQUE");
    //   // console.log(" visites ========>", this.visites)
    //   this.carteGrises = this.documents.filter(carte => carte.type == "CARTE_GRISE");
    //   // console.log(" carteGrises ========>", this.carteGrises)
    //   this.tachygraphes = this.documents.filter(tach => tach.type == "CARNET_TACHYGRAPHIQUE");
    //   // console.log(" tachygraphes ========>", this.tachygraphes)
    //   this.autorisations = this.documents.filter(autorisation => autorisation.type == "AUTORISATION");
    //   // console.log(" autorisations ========>", this.autorisations)
    //   this.essieus = this.documents.filter(essieu => essieu.type == "TAXE_ESSIEU");
    //   // console.log(" essieus ========>", this.essieus)
    // });

    // this.store.select(selectEnvVehiculeDocumentIsLoading).subscribe((res) => {  
    //   this.spinner = res;
    // });
  }

}
