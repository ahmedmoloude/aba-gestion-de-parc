import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { Observable } from 'rxjs';
import { selectTruckService } from 'app/core/store/resources/resources.selectors';
import { selectEnvparcPayload } from 'app/core/store/parc/parc.selectors';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastService } from 'app/core';
import { selectEnvcarteIsLoading, selectEnvcarteStatus } from 'app/core/store/carte/carte.selectors';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { addcarte, updatecarte } from 'app/core/store/carte/carte.actions';
import { VehiculeService } from 'app/core/services/vehicule.service';
import { selectEnvprestatairePayload } from 'app/core/store/prestataire/prestataire.selectors';
import { SharedAutcompleteComponent } from 'app/shared/components/shared-autcomplete/shared-autcomplete.component';

@Component({
  selector: 'app-cartes-dialog',
  templateUrl: './cartes-dialog.component.html',
  styleUrls: ['./cartes-dialog.component.css'],
})
export class CartesDialogComponent implements OnInit {
  @ViewChildren(SharedAutcompleteComponent) searchComponents: QueryList<SharedAutcompleteComponent>;

  filteredOptions: Observable<string[]>;
  createCarte = new FormGroup({});
  parcs : any;
  prestataires : any;
  services : any;
  carte : any;
  form_btn : any;
  spinnerAdd : boolean;
  types = [ 'AUTOROUTE', 'GAZOILE', 'EASY_ONE', 'JAWAZ' ];
  type = 'AUTOROUTE';
  start_time : any
  end_time : any;
  searchStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}
  contentStyle = {'border': '1px solid #ccc', 'border-radius': '3px', 'padding': '0.5rem'}

  setDateDebut(value){
    console.log("DATE DEBUT", value)
    this.start_time= value;
  }

  setDateFin(value){
    console.log("DATE FIN", value)
    this.end_time= value;
  }

  constructor(private store: Store<AppState>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<CartesDialogComponent>,
              private vehiculeService : VehiculeService,
              private _toast: ToastService,) {}

  ngAfterViewInit(){
    if(this.data["type"] == "edit"){
      this.searchComponents.toArray()[0].selectObject(this.carte?.parc)
    }
  }

    ngOnInit(): void {
      this.store.select(selectEnvparcPayload).subscribe((res) => {
        this.parcs = res
      });

      this.store.select(selectTruckService).subscribe((res) => {
        this.services = res
      });

      this.store.select(selectEnvprestatairePayload).subscribe((res) => {
        this.prestataires = res.filter(d => d.type == 'CARTE')
        console.log('CARTE', this.prestataires);
      });

      this.setForm();
    }

    filterParc(event){
      if(event){
        this.createCarte.controls['parc_id'].setValue(event.id);
      }
    }

    setForm(){
      // Parc - type de carte - N° de carte - service - frs - date début - date d'expiration - solde - plafond
      if(this.data["type"] == "add"){
        this.form_btn = "Ajout"
        console.log("form set")
        this.createCarte = new FormGroup({
          parc_id: new FormControl("", Validators.required),
          type: new FormControl("", Validators.required),
          n_carte: new FormControl("", Validators.required),
          solde: new FormControl("", Validators.required),
          plafond: new FormControl("", Validators.required),
          end_date: new FormControl("",  Validators.required),
          service_id: new FormControl("", Validators.required),
          prestataire_id: new FormControl("", Validators.required),
          start_date: new FormControl("", Validators.required),
          status: new FormControl(""),
          libelle: new FormControl(""),
          montant: new FormControl(""),
          type_paiement: new FormControl(""),
          date_update: new FormControl(""),
        })
      }else{
        this.carte = this.data["item"]
        console.log("item recu", this.carte)
        this.form_btn = "Modification"
        this.createCarte = new FormGroup({
          type: new FormControl(this.carte.type, Validators.required),
          n_carte: new FormControl(this.carte.n_carte, Validators.required),
          libelle: new FormControl(this.carte.libelle, Validators.required),
          service_id: new FormControl(this.carte.service_id, Validators.required),
          prestataire_id: new FormControl(this.carte.prestataire_id, Validators.required),
          start_date: new FormControl(this.carte.start_date, Validators.required),
          end_date: new FormControl(this.carte.end_date,  Validators.required),
          parc_id: new FormControl(this.carte.parc_id, Validators.required),
          plafond: new FormControl(this.carte.plafond, Validators.required),
          status: new FormControl(this.carte.status),
          montant: new FormControl(this.carte.montant),
          type_paiement: new FormControl(this.carte.type_paiement),
          solde: new FormControl({ value: this.carte.solde, disabled: true }),
          date_update: new FormControl(""),
        })
      }
    }

    typeCarte($event){
      console.log("type", $event.value)
      this.type = $event.value
      console.log("type222=>", this.type)

    }

    addCarte(){
      if(this.data["type"] == "add"){
        if(this.createCarte.get("solde").value > this.createCarte.get("plafond").value){
          this._toast.warn("Le solde ne doit pas dépasser le plafond");
        }else{
          this.spinnerAdd = true
          console.log(this.createCarte.value)
          this.vehiculeService.addCarte(this.createCarte.value).subscribe(
            (data) => {
              console.log('data', data);
              this._toast.success("Carte ajouté avec succés");
              this.spinnerAdd = false;
              this.dialogRef.close(data["response"]);
            },
            (error) => {
              console.log('error', error);
              this.spinnerAdd = false;
              this._toast.error("Une erreur est survenue");
          });
        }
      }else{
        console.log("edit=============>")
        console.log("solde", this.createCarte.get("solde").value)
        console.log("plafond", this.createCarte.get("plafond").value)

        console.log("solde", Number(this.createCarte.get("solde").value))
        console.log("plafond", Number(this.createCarte.get("plafond").value))
        console.log("type", this.data["type"])
        if( Number(this.createCarte.get("solde").value) > Number(this.createCarte.get("plafond").value)){
          this._toast.warn("Le solde ne doit pas dépasser le plafond");
        }else{
        console.log("modifier api=============>")

          this.spinnerAdd = true
          console.log(this.createCarte.value)
          this.vehiculeService.updateCarte(this.createCarte.value, this.carte.uuid).subscribe(
            (data) => {
              console.log('data', data);
              this._toast.success("Carte modifié avec succés");
              this.spinnerAdd = false;
              this.dialogRef.close('data');
            },
            (error) => {
              console.log('error', error);
              this.spinnerAdd = false;
              this._toast.error("Une erreur est survenue");
          });
        }
      }

      // console.log("form", this.createCarte.value)
      // this.store.dispatch(addcarte({ data: this.createCarte.value}));
      //   this.store.select(selectEnvcarteIsLoading).subscribe((res) => {
      //     // console.log("spinner", res);
      //     this.spinnerAdd = res
      //   });
      //   this.store.select(selectEnvcarteStatus).subscribe((res) => {
      //     // console.log("status", res);
      //     if(res == 'SUCCESS'){
      //       this.dialogRef.close();
      //     }
      //   });


    }
}
