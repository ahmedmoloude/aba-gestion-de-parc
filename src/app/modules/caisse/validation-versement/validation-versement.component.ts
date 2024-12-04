import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PermissionService } from 'app/core/services/permission.service';
import { AgenceState } from 'app/core/store/agence/agence.reducer';
import { AppState } from 'app/core/store/app.states';
import { loadValidationVersements, validateVersement } from 'app/core/store/caisse/validation-versement/validation-versement.actions';
import { validationVersementState } from 'app/core/store/caisse/validation-versement/validation-versement.reducer';
import { RessourceState } from 'app/core/store/resources/resources.reducer';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-validation-versement',
  templateUrl: './validation-versement.component.html',
  styleUrls: ['./validation-versement.component.css']
})
export class ValidationVersementComponent implements OnInit {
  p: number = 1;

  headerColumuns = [
    'Date',
    'PPCR',
    'Chéque',
    'Total EXP',
    'PD',
    'CRB',
    'Total arrivage',
    'Total',
  ];
  inputsFiler = [
    // {
    //   name: 'ville',
    //   placeholder: 'Ville',
    //   type: 'select',
    //   options: [],
    // },
    {
      name: 'agency_id',
      placeholder: 'Agence',
      type: 'select',
      options: [],
    },
  ];

  validationVersement$: Observable<validationVersementState> = this.store.select(state => state.validationVersement);
  // ressource$: Observable<RessourceState> = this.store.select(state => state.ressources);
  // cities;

  agence$: Observable<AgenceState> = this.store.select(state => state.agence);
  agences;
  constructor(private store: Store<AppState>,
    public permissionService: PermissionService) { }

  ngOnInit(): void {
    this.store.dispatch(loadValidationVersements(null));
    // this.ressource$.subscribe(
    //   (resp) => {
    //     this.cities = resp.cityAgence;
    //     for(var i=0; i<this.cities.length; i++){
    //       this.inputsFiler["0"].options.push({
    //         'text' : this.cities[i].name,
    //         'value' : `${this.cities[i].id}`,
    //       })
    //     }
    //   }
    // )
    this.agence$.subscribe(
      (resp) => {
        this.agences = resp.payload;
        for(var i=0; i<this.agences.length; i++){
          this.inputsFiler["0"].options.push({
            'text' : this.agences[i].name,
            'value' : `${this.agences[i].id}`,
          })
        }
      }
    )
  }

  filtrer($event){
    console.log("FILTER RDV", $event)
    let formValue = $event;
    let validationVersement = {
      agency_id : formValue.agency_id
    }
    this.store.dispatch(loadValidationVersements({data: validationVersement}));
  }

  validateVersement(id: number) {
    this.store.dispatch(validateVersement({data: {versement_id:id}}));

  }
}
