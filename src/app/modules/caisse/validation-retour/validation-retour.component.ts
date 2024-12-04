import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PermissionService } from 'app/core/services/permission.service';
import { AgenceState } from 'app/core/store/agence/agence.reducer';
import { AppState } from 'app/core/store/app.states';
import { loadRetourCrbts, validateRetourCrbt } from 'app/core/store/caisse/retour-crbt/retour-crbt.actions';
import { retourCrbtState } from 'app/core/store/caisse/retour-crbt/retour-crbt.reducer';
import { RessourceState } from 'app/core/store/resources/resources.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-validation-retour',
  templateUrl: './validation-retour.component.html',
  styleUrls: ['./validation-retour.component.css']
})
export class ValidationRetourComponent implements OnInit {
  p: number = 1;

  headerColumuns = [
    'Date',
    'TTotal espèce EXP',
    'Total espèce arrivage',
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
    }
  ];

  retourCrbts$: Observable<retourCrbtState> = this.store.select(state => state.retourCrbt);
  // ressource$: Observable<RessourceState> = this.store.select(state => state.ressources);
  // cities;

  agence$: Observable<AgenceState> = this.store.select(state => state.agence);
  agences;
  constructor(private store: Store<AppState>,
    public permissionService: PermissionService) { }

  ngOnInit(): void {
    this.store.dispatch(loadRetourCrbts(null));
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
    let retourCrbt = {
      agency_id : formValue.agency_id
    }
    this.store.dispatch(loadRetourCrbts({data: retourCrbt}));

  }

  validateRetourCRBT(id: number) {
    this.store.dispatch(validateRetourCrbt({data:{crb_id:id}}));
  }
}
