import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { addRole } from 'app/core/store/role/role.actions';
import { RoleState, StateEnum } from 'app/core/store/role/role.reducer';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-dialog-role',
  templateUrl: './dialog-role.component.html',
  styleUrls: ['./dialog-role.component.css']
})
export class DialogRoleComponent implements OnInit, OnDestroy {

  functions = {
    Conducteur: 'DRIVER', // mobile
    Pointeur: 'POINTER', // mobile
    ACCOMPAGNATEUR : 'ACCOMPAGNATEUR',

    Pompiste: 'POMPISTE',
    Commercial: 'COMMERCIAL',
    Caissier: 'CAISSIER',
    'Super viseur caissier': 'SEUPERVISORCAISSIER',
    Reparateur: 'REPARATOR',
    "Chef d'agence": 'CHEF_D_AGENCE',
    Administrateur: 'ADMINISTRATEUR',
    Archive: 'ARCHIVE',
    Arrivage: 'ARRIVAGE',
    Assistante: 'ASSISTANTE',
    Atelier: 'ATELIER',
    Contrôle: 'CONTROLE',
    Exploitation: 'EXPLOIATATION',
    Facturation: 'FACTURATION',
    Global: 'GLOBAL',
    Logistique: 'LOGISTIQUE',
    Manœuvre: 'MANOEUVRE',
    Opération: 'OPERATION',
    'Poste de garde': 'POSTE_DE_GARDE',
    Ramasseur: 'RAMASSEUR',
    Réclamation: 'RECLAMATION',
    Recouvrement: 'RECOUVREMENT',
    Comptabilité: 'COMPTABILITE',
    Personnel: 'PERSONNEL',
    Standardiste: 'STANDARDISTE',
    Taxateur: 'TAXATEUR',
  };

  spinner: boolean = false;

  name = new FormControl(null,[Validators.required]);
  function = new FormControl(null,[Validators.required]);

  role$: Observable<RoleState> = this.store.select(state => state.role);
  roleSubscription: Subscription;

  constructor(private store: Store<AppState>,
              private dialogRef: MatDialogRef<DialogRoleComponent>,
    ) { }

  ngOnInit(): void {
  }

  addRole() {
    console.log('hey');

    if(this.name.invalid) return;
    if(this.function.invalid) return;
    console.log({data: this.name.value});
    this.store.dispatch(addRole({data: {name: this.name.value, function: this.function.value}}));
    this.roleSubscription = this.role$.subscribe(
      (resp) => {
        if(resp.roleState == StateEnum.SUCCESS) {
          this.dialogRef.close(resp.role)
        }
        if(resp?.roleState==StateEnum.SUCCESS  || resp?.roleState==StateEnum.ERROR) {
          this.spinner = false;
        }
      }
    );
  }

  ngOnDestroy() {
    this.roleSubscription?.unsubscribe();
  }

}
