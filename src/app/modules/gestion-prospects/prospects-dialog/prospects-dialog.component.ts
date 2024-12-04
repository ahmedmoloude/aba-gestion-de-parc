import { phoneValidator, PHONE_REGEX } from './../../../shared/validators/validators';
import { ProspectService } from 'app/core/services/prospects.service';
import { selectSectorActivity } from './../../../core/store/resources/resources.selectors';
import { ToastService } from 'app/services';
import { selectNatureProduct } from 'app/core/store/productcategory/productcategory.selector';
import { selectEnvtonnagePayload } from 'app/core/store/tonnage/tonnage.selectors';
import { Component, Inject, OnInit, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { selectAllCityAgence, selectCitiesAndCategories, selectUserCommercial } from 'app/core/store/resources/resources.selectors';
import { addProspect, fetchProspects } from 'app/core/store/prospects/prospects.actions';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { selectProspectIsLoading } from 'app/core/store/prospects/prospects.selectors';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { selectAuthUser } from 'app/core/store/profil/profil.selectors';
import { SharedAutcompleteComponent } from 'app/shared/components/shared-autcomplete/shared-autcomplete.component';
import { PersonelService } from 'app/core/services/personel.service';

@Component({
  selector: 'app-prospects-dialog',
  templateUrl: './prospects-dialog.component.html',
  styleUrls: ['./prospects-dialog.component.css'],
})
export class ProspectsDialogComponent implements OnInit {
  @ViewChildren(SharedAutcompleteComponent) searchComponents: QueryList<SharedAutcompleteComponent>;
  disabledCamion = false;
  createProspectLoading =  false ;
  maxSize = 281
  user: any;
  commercials: any = [];
  today = new Date
  cities = []
  zones = []
  sectors = []
  agencies = []
  fiche :any = []
  activities  = []
  destinations  = []
  spinnerAdd  : boolean = false
  typeClient = 'Entreprise'
  selectedNatureTransport = [
    {'id': 1, 'name': 'Messagerie'},
  ]
  services  = [
    {'id': 1, 'name': 'Messagerie'},
    {'id': 2, 'name': 'Afferetement'}
  ]
  natures_marchandises  = [
    {'id': 1, 'name': 'Colis'},
    {'id': 2, 'name': 'Palette'},
    {'id': 3, 'name': 'Hors normes'}
  ]
  periodes  = [
    {'id': 1, 'name': 'Mensuelle'},
    {'id': 2, 'name': 'Trimestrielle'},
    {'id': 3, 'name': 'Semestrielle'},
    {'id': 4, 'name': 'Annuelle'},
  ]
  tonnages  = []
  marchandise  = [];
    // {'id': 1, 'name': 'Carton'},
    // {'id': 2, 'name': 'Sac'},
    // {'id': 3, 'name': 'Palette'},
    // {'id': 4, 'name': 'Document'},
    // {'id': 5, 'name': 'Autre'},
  // ]
  // destinations  = [
  //   {'id': 1, 'name': 'Grandes ville'},
  //   {'id': 2, 'name': 'Petite ville'},
  //   {'id': 3, 'name': 'Patelins'},
  //   {'id': 4, 'name': 'Grandes surfaces'},
  // ]
  type_collecte  = [
    {'id': 1, 'name': 'A l\'agence'},
    {'id': 2, 'name': 'Ramassage'}
  ]
  nature_livraison  = [
    {'id': 1, 'name':  'En gare'},
    {'id': 2, 'name': 'A domicile'}
  ]
  nature_prix  = [
    {'id': 1, 'name':  'Grille standard'},
    {'id': 2, 'name': 'Forfait'}
  ]
  type_contrat  = [
    {'id': 1, 'name':  'Cash'},
    {'id': 2, 'name': 'En compte'}
  ]
  retour_fond  = [
    {'id': 1, 'name':  "Chèque"},
    {'id': 2, 'name': "Traite"},
    {'id': 3, 'name': 'CRBT'}
  ]
  retour_document  = [
    {'id': 1, 'name':  'BL'},
    {'id': 2, 'name': 'FACTURE'}
  ]
  port_exp  = [
    {'id': 1, 'name':  'PP'},
    {'id': 2, 'name': 'PPE'},
    {'id': 3, 'name': 'PD'},
    {'id': 4, 'name': 'PDE'}
  ]
  port_dest  = [
    {'id': 1, 'name':  'PD'},
    {'id': 2, 'name': 'PDE'}
  ]

  prospectFormGroup : FormGroup = new FormGroup({
    name: new FormControl("" , [Validators.required,]),
    name_contact: new FormControl("" , [Validators.required, Validators.pattern('[a-zA-Z ]+')]),
    phone: new FormControl("" , [Validators.required, Validators.pattern(PHONE_REGEX), phoneValidator()]),
    email: new FormControl("" , Validators.email ),
    Social_reason: new FormControl("" ),
    Adress_1: new FormControl("" , Validators.required),
    Adress_2: new FormControl("" ),
    fax: new FormControl("", [Validators.pattern(PHONE_REGEX), phoneValidator()] ),
    identity_number: new FormControl("" , [Validators.required ,Validators.minLength(14), Validators.maxLength(14), Validators.pattern('[0-9]+')]),
    tonnage: new FormControl(""),
    secteur_activite: new FormControl(""),
    secteur_ramassage: new FormControl(""),
    nature_marchandie: new FormControl(""),
    poids: new FormControl(""),
    volume: new FormControl(""),
    prix_propose: new FormControl(""),
    nbr_colis: new FormControl(""),
    agence_id: new FormControl("" , Validators.required),
    nature_transport: new FormControl("" , Validators.required),
    type_marchandie: new FormControl("" , Validators.required),
    city_id: new FormControl(""),
    zone_id: new FormControl("" , Validators.required),
    sector_id: new FormControl("" , Validators.required),
    destination: new FormControl(""),
    type_collecte: new FormControl(""),
    nature_prix: new FormControl(""),
    nature_livraison: new FormControl(""),
    type_contrat: new FormControl(""),
    type_retour_fond: new FormControl(""),
    type_retour_document: new FormControl(""),
    transport_actuel: new FormControl(""),
    // date: new FormControl(""),
    port: new FormControl(""),
    port_exp: new FormControl(""),
    port_dest: new FormControl(""),
    p_colisage: new FormControl(""),
    p_ca: new FormControl(""),
    periode_ca: new FormControl(""),
    periode_colisage: new FormControl(""),
    date_prospection: new FormControl(""),
    remarques: new FormControl(""),
    type: new FormControl("entity" ,Validators.required, ),
    type_client: new FormControl(this.typeClient ,Validators.required, ),
    user_id: new FormControl(""),
    by_sdtm: new FormControl("1"),
    // update_mode: new FormControl(false,Validators.required, ),
  })

  constructor(
          private  boGridService : BoGridService,
          private store: Store<AppState>,
          private toast : ToastService,
          private dialogRef: MatDialogRef<ProspectsDialogComponent>,
          @Inject(MAT_DIALOG_DATA) public dialogData: any,
          private cdr: ChangeDetectorRef,
          private prospectService: ProspectService,
          private personelService : PersonelService
    ) {}

    ngAfterViewInit(){
      // this.searchComponents

    // this.cdr.detectChanges();
    if(this.dialogData["edit_mode"]){
      // this.searchComponents.toArray()[0].selectObject(this.item.city)
    }
  }

  get isInvalid() {
    return this.prospectFormGroup.get("phone") && this.prospectFormGroup.get("phone").invalid && (this.prospectFormGroup.get("phone").dirty || this.prospectFormGroup.get("phone").touched)
    }

  get isInvalidFax() {
    return this.prospectFormGroup.get("fax") && this.prospectFormGroup.get("fax").invalid && (this.prospectFormGroup.get("fax").dirty || this.prospectFormGroup.get("fax").touched)
    }

  get isInvalidEmail() {
    return this.prospectFormGroup.get("email") && this.prospectFormGroup.get("email").invalid && (this.prospectFormGroup.get("email").dirty || this.prospectFormGroup.get("email").touched)
    }

  get isInvalidName() {
    return this.prospectFormGroup.get("name_contact") && this.prospectFormGroup.get("name_contact").invalid && (this.prospectFormGroup.get("name_contact").dirty || this.prospectFormGroup.get("name_contact").touched)
    }

  get isInvalidICE() {
    return this.prospectFormGroup.get("identity_number") && this.prospectFormGroup.get("identity_number").invalid && (this.prospectFormGroup.get("identity_number").dirty || this.prospectFormGroup.get("identity_number").touched)
    }

  ngOnInit(): void {
    // this.boGridService.fetchListActivity().subscribe(data => {
    //   this.activities = data;
    //   console.log("SECTEUR ACTIVITY", this.activities)
    // }, error => {
    //   console.log("error", error);
    // })

    this.personelService.personnelbyFunction(null, 'COMMERCIAL').subscribe(
      (data: any) => {
        console.log('data Commerciale', data);
        this.commercials =  data.response;
        this.store.select(selectAuthUser).subscribe((res) => {

          // this.user = JSON.parse(JSON.stringify(res))
          if(!this.dialogData["edit_mode"]){
            // this.prospectFormGroup.patchValue({
            //   user_id: this.user.id
            // })
          }else{
            this.fiche = this.dialogData["customer"].last_fiche
            // this.user = this.fiche.user
            this.typeClient = this.fiche.type
            console.log('hhhnnnnMMMM', this.typeClient, this.prospectFormGroup)
            this.prospectFormGroup.patchValue({type_client: this.typeClient})
            this.initUpdateForm();
            setTimeout(() => this.searchComponents['_results'][1].selectObject(this.fiche.city))
            this.agencies = this.fiche.city.agencies
            this.zones = this.fiche.city.zones
            this.sectors = this.fiche.zone.sectors
            setTimeout(() => this.searchComponents['_results'][2].selectObject(this.fiche.agence))
            setTimeout(() => this.searchComponents['_results'][9].selectObject(this.fiche.zone))
            setTimeout(() => this.searchComponents['_results'][10].selectObject(this.fiche.sector))
            setTimeout(() => this.searchComponents['_results'][23].selectObject(this.fiche.nature_prix))
            setTimeout(() => this.searchComponents['_results'][25].selectObject(this.fiche.type_contrat))
            setTimeout(() => this.searchComponents['_results'][7].selectObject(this.fiche.secteur_activity))
            setTimeout(() => this.searchComponents['_results'][32].selectObject(this.fiche.periode_colisage))
            setTimeout(() => this.searchComponents['_results'][34].selectObject(this.fiche.periode_ca))
            setTimeout(() => {
              this.fiche.nature_transport.forEach(element => {
                this.searchComponents['_results'][13].toggleSelection(element)
                this.searchComponents['_results'][13].onClickOutside()
              });
            })
            setTimeout(() => {
              this.fiche.nature_marchandie.forEach(element => {
                this.searchComponents['_results'][17].toggleSelection(element)
                this.searchComponents['_results'][17].onClickOutside()
              });
            })
            setTimeout(() => {
              this.fiche.tonnage.forEach(element => {
                this.searchComponents['_results'][14].toggleSelection(element)
                this.searchComponents['_results'][14].onClickOutside()
              });
            })
            setTimeout(() => {
              this.fiche.type_marchandie.forEach(element => {
                this.searchComponents['_results'][16].toggleSelection(element)
                this.searchComponents['_results'][16].onClickOutside()
              });
            })
            setTimeout(() => {
              this.fiche.destination.forEach(element => {
                this.searchComponents['_results'][20].toggleSelection(element)
                this.searchComponents['_results'][20].onClickOutside()
              });
            })
            setTimeout(() => {
              this.fiche.type_collecte.forEach(element => {
                this.searchComponents['_results'][21].toggleSelection(element)
                this.searchComponents['_results'][21].onClickOutside()
              });
            })
            setTimeout(() => {
              this.fiche.nature_livraison.forEach(element => {
                this.searchComponents['_results'][22].toggleSelection(element)
                this.searchComponents['_results'][22].onClickOutside()
              });
            })
            setTimeout(() => this.searchComponents['_results'][25].selectObject(this.fiche.type_contrat))
            setTimeout(() => {
              this.fiche.type_retour_fond.forEach(element => {
                this.searchComponents['_results'][27].toggleSelection(element)
                this.searchComponents['_results'][27].onClickOutside()
              });
            })
            setTimeout(() => {
              this.fiche.type_retour_document.forEach(element => {
                this.searchComponents['_results'][28].toggleSelection(element)
                this.searchComponents['_results'][28].onClickOutside()
              });
            })
            setTimeout(() => {
              this.fiche.port_exp.forEach(element => {
                this.searchComponents['_results'][29].toggleSelection(element)
                this.searchComponents['_results'][29].onClickOutside()
              });
            })
            setTimeout(() => {
              this.fiche.port_dest.forEach(element => {
                this.searchComponents['_results'][30].toggleSelection(element)
                this.searchComponents['_results'][30].onClickOutside()
              });
            })


            this.user = this.commercials.find((c) => c.id ==  this.fiche.user_id)
            console.log('user' , this.user)

            setTimeout(() => {
              this.searchComponents['_results'][0].selectObject(this.user)
             })
          }

          // let isExist = this.commercials.some((element) => {
          //   return element.id === this.user.id;
          // });
          // if(!isExist) this.commercials.push(this.user)
          console.log(" user commercial 2========>", this.commercials)
        });
      },
      (error) => {
        console.log('error', error);
      }
    );


    // this.store.select(selectProspectIsLoading).subscribe((isLoading) => this.createProspectLoading = isLoading)
    this.store.select(selectAllCityAgence).subscribe((res) => this.cities = res);
    this.store.select(selectSectorActivity).subscribe((res) => {
      this.activities = res;
      console.log("SECTEUR ACTIVITY", this.activities)
    });

    this.store.select(selectCitiesAndCategories).subscribe((res : any) => {
      this.destinations = [{'id': 2000, 'name': 'TOUTES DESTINATIONS'}, ...res]
      // this.destinations = res;
      // this.destinations.unshift({'id': 2000, 'name': 'Toutes destinations'})
      console.log("DESTINATIONS", this.destinations)
    });

    this.store.select(selectEnvtonnagePayload).subscribe((res) => {
      // console.log(" tonnage========>", res)
      this.tonnages = JSON.parse(JSON.stringify(res))
      this.tonnages = this.tonnages.map(t => {
        t.name = t.name+'T'
        return t
      })
    });

    this.store.select(selectNatureProduct).subscribe((res) => {
      (this.marchandise = res)
    });

    // console.log("TONNAGE", this.tonnages)
    // console.log("NATURE", this.marchandise)
    // console.log("editMode", this.dialogData["edit_mode"])
    // console.log("customer", this.dialogData["customer"])
    // console.log("from_prospect", this.dialogData["from_prospect"])


    // this.boGridService.fetchListActivity().subscribe(data => {
    //   this.activities = data;
    //   console.log(this.activities)
    //   console.log(this.cities)
    // }, error => {
    //   console.log("error", error);
    // })




    this.prospectFormGroup.controls.type.valueChanges.subscribe(type => {
      switch (type) {
       case 'entity':
         this.prospectFormGroup.get('identity_number').setValidators(
           [Validators.required, Validators.minLength(11)]);
         this.prospectFormGroup.get('identity_number').updateValueAndValidity();
         break;
       case 'individual':
         this.prospectFormGroup.get('identity_number').setValidators([Validators.required,
           Validators.minLength(8)]);
         this.prospectFormGroup.get('identity_number').updateValueAndValidity();
       default:
         break;
      }
   })

  }



  initUpdateForm(){
    if (this.dialogData["edit_mode"]) {
      // console.log("EDIT MODE",this.dialogData)
      // console.log("EDIT DICHE",this.fiche)

      console.log("fiche", this.fiche)
      // console.log("name", this.fiche.name)
      // console.log("phone", this.fiche.phone)
      // console.log("email", this.fiche.email)
      // console.log("destination", this.fiche.destination);
      // console.log("nature_livraison", this.fiche.nature_livraison);
      // console.log("nature_prix", this.fiche.nature_prix);
      // console.log("nature_transport", this.fiche.nature_transport);
      // console.log("port", this.fiche.port);
      // console.log("type_collecte", this.fiche.type_collecte);
      // console.log("type_contrat", this.fiche.type_contrat);
      // console.log("type_marchandie", this.fiche.type_marchandie);
      // console.log("type_retour_document", this.fiche.type_retour_document);
      // console.log("type_retour_fond", this.fiche.type_retour_fond);



      this.prospectFormGroup.patchValue({
        name: this.fiche.Social_reason,
        name_contact: this.fiche.name,
        phone: this.fiche.phone,
        email: this.fiche.email,
        Social_reason: this.fiche.Social_reason,
        Adress_1:  this.fiche.Adress_1,
        Adress_2: this.fiche.Adress_2,
        identity_number: this.fiche.identity_number,
        potentiel: this.fiche.potentiel,
        city_id: this.fiche.city_id,
        type : this.fiche.type,
        fax : this.fiche.fax,
        tonnage: this.fiche.tonnage,
        secteur_activite: this.fiche.secteur_activite,
        secteur_ramassage: this.fiche.sector.name,
        nature_marchandie: this.fiche.nature_marchandie,
        poids: this.fiche.poids,
        volume: this.fiche.volume,
        prix_propose: this.fiche.prix_propose,
        nbr_colis: this.fiche.nbr_colis,
        agence_id: this.fiche.agence_id,
        nature_transport: this.fiche.nature_transport,
        type_marchandie: this.fiche.type_marchandie,
        destination: this.fiche.destination,
        type_collecte: this.fiche.type_collecte,
        nature_prix: this.fiche.nature_prix,
        nature_livraison: this.fiche.nature_livraison,
        type_contrat: this.fiche.type_contrat,
        type_retour_fond: this.fiche.type_retour_fond,
        type_retour_document: this.fiche.type_retour_document,
        transport_actuel: this.fiche.transport_actuel,
        // date: this.fiche.date,
        port: this.fiche.port,
        port_exp: this.fiche.port_exp,
        port_dest: this.fiche.port_dest,
        p_colisage: this.fiche.p_colisage,
        p_ca: this.fiche.p_ca,
        remarques: this.fiche.remarques,
        type_client: this.typeClient,
        user_id: this.fiche.user_id,
        periode_ca: this.fiche.periode_ca,
        periode_colisage: this.fiche.periode_colisage,
        date_prospection: this.fiche.date_prospection,
        // update_mode: true,
      })
    }
  }

  submit(){

    console.log("PROSPECT", this.prospectFormGroup.value)

    this.prospectFormGroup.markAllAsTouched();

    if (!this.prospectFormGroup.valid) {
      console.log('form is not valid !');
      this.getFormValidationErrors();
      this.toast.warn("Remplir tous les champs obligatoires")

      return;
    }

    this.createProspectLoading = true;


    console.log('DAAAATA', this.dialogData)

    let update_mode = this.dialogData["edit_mode"] ?? false

    this.prospectService.addProspect(Object.assign(this.prospectFormGroup.value,
      {update_mode : update_mode , id_prospect : update_mode ? this.dialogData["customer"].id : null}
      )).subscribe((response : any) => {
        this.createProspectLoading = true;
        // console.log("RESPONSE", response)
        console.log("RESPONSE", response["response"])
        this.dialogRef.close(response["response"]);
    });

    // this.store.dispatch(addProspect({ data: Object.assign(this.prospectFormGroup.value,
    //   {update_mode : update_mode , id_prospect : update_mode ? this.dialogData["customer"].id : null}

    //   )}
    //   ));
    // this.dialogRef.close();
  }

  ngOnDestroy(){
    // this.store.dispatch(fetchProspects());
  }

  get f(): { [key: string]: AbstractControl } {
    return this.prospectFormGroup.controls;
  }

  getMsgErrors(controlName: string, validators: string[]) {

    const errorMsg = {
      required: 'Ce champ est obligatoire !',
      minlength: `Ce champ doit contenir au moins @ chiffres !`,
      maxlength: 'Ce champ ne doit pas depasser 14 chiffres!',
      email: 'Ce champ doit etre une adresse mail !',
    }

    const fieldForm = this.prospectFormGroup.get(controlName);
    if (fieldForm.touched && !fieldForm.valid) {
      for (const v of validators) {
        const errors = fieldForm.errors[v]
        if (errors) {

          if (fieldForm.errors?.minlength) {
             errorMsg.minlength  = errorMsg.minlength.replace("@", fieldForm.errors?.minlength.requiredLength);
          }
          return errorMsg[v];
        }
      }
    }
  }



  getFormValidationErrors() {
    Object.keys(this.prospectFormGroup.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.prospectFormGroup.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
         console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }

  oncityChange(city){
    if(city){
      this.zones = city.zones
      var id = city.id;
      console.log("ID CITY", id)
      this.agencies = city.agencies
      this.prospectFormGroup.controls['city_id'].setValue(id);
    }else{
      this.agencies = [];
      this.zones = [];
      this.sectors = [];
    }
  }

  onZoneChange(zone){
    if(zone){
      this.sectors = zone.sectors
      var id = zone.id;
      console.log("ID ZONE", id)
      this.prospectFormGroup.controls['zone_id'].setValue(id);
    }else{
      // this.agencies = [];
      // this.zones = [];
      this.sectors = [];
    }
  }

  onSecteurActivityChange(secteur){
    if(secteur){
      console.log(secteur, "SECTEUR")
      console.log(secteur.id, "SECTEUR ID")
      this.prospectFormGroup.controls['secteur_activite'].setValue(secteur.id);
    }
  }

  onPerideColisageChange(periode){
    if(periode){
      console.log(periode, "periode colisage")
      this.prospectFormGroup.controls['periode_colisage'].setValue(JSON.stringify(periode));
    }
  }

  onPerideCaChange(periode){
    if(periode){
      console.log(periode, "periode CA")
      this.prospectFormGroup.controls['periode_ca'].setValue(JSON.stringify(periode));
    }
  }

  onSectorChange(sector){
    if(sector){
      // this.sectors = zone.sectors
      var id = sector.id;
      console.log("ID SECTOR", id)
      this.prospectFormGroup.controls['sector_id'].setValue(id);
      this.prospectFormGroup.controls['secteur_ramassage'].setValue(sector.name);
    }else{
      // this.agencies = [];
      // this.zones = [];
      // this.sectors = [];
    }
  }

  onagenceChange(agence){
    if(agence){
      console.log("AGENCE", agence)
      this.prospectFormGroup.controls['agence_id'].setValue(agence.id);
    }
  }

  onNatureTransportChange(nature){
    if(nature){
      this.selectedNatureTransport = nature;
      this.prospectFormGroup.controls['nature_transport'].setValue(JSON.stringify(nature));
      // this.prospectFormGroup.controls['nature_transport'].setValue(nature);
    }
    const containsMessagerie = nature.some(item => item.name === "Messagerie");
    const containsAfferetement = nature.some(item => item.name === "Afferetement");

    if (containsMessagerie && containsAfferetement) {
      this.disabledCamion = false
      // Handle both present
    } else if (containsMessagerie) {
      this.disabledCamion = true
      console.log("The list contains only Messagerie.");
      // Handle only Messagerie present
    } else if (containsAfferetement) {
      this.disabledCamion = false
      console.log("The list contains only Afferetement.");
      // Handle only Afferetement present
    } else {
      this.disabledCamion = true
      console.log("The list does not contain Messagerie or Afferetement.");
      // Handle neither present
    }

  }

  onNatureMarchandiseChange(nature){
    if(nature){
      // this.selectedNatureTransport = nature;
      console.table(nature)
      this.prospectFormGroup.controls['nature_marchandie'].setValue(JSON.stringify(nature));
      // this.prospectFormGroup.controls['nature_transport'].setValue(nature);
    }

  }

  onCamionChange(camion){
    if(camion){
      console.log("CAMION", camion)
      this.prospectFormGroup.controls['tonnage'].setValue(JSON.stringify(camion));
      // this.prospectFormGroup.controls['tonnage'].setValue(camion);
    }
  }

  onMarchandiseChange(marchandises){
    if(marchandises){
      console.log("Marchandise", marchandises)
      this.prospectFormGroup.controls['type_marchandie'].setValue(JSON.stringify(marchandises));
      // this.prospectFormGroup.controls['type_marchandie'].setValue(marchandises);
    }
  }

  onCollecteChange(collecte){
    if(collecte){
      console.log("Collecte", collecte)
      this.prospectFormGroup.controls['type_collecte'].setValue(JSON.stringify(collecte));
      // this.prospectFormGroup.controls['type_collecte'].setValue(collecte);
    }
  }

  onDestinationChange(destination){
    if(destination){
      console.log("DESTINATION", destination)
      let desti = JSON.stringify(destination)
      // console.log(desti, "JSON DESTINATION111")
      console.log(JSON.parse(JSON.stringify(destination)), "JSON DESTINATION222")
      this.prospectFormGroup.controls['destination'].setValue(JSON.stringify(destination) );
      // this.prospectFormGroup.controls['destination'].setValue(JSON.stringify(destination) );
      // this.prospectFormGroup.controls['destination'].setValue(destination);
    }
  }

  onLivraisonChange(livraison){
    if(livraison){
      console.log("LIVRAISON", livraison)
      this.prospectFormGroup.controls['nature_livraison'].setValue(JSON.stringify(livraison) );
      // this.prospectFormGroup.controls['nature_livraison'].setValue(livraison);
    }
  }

  onNaturePrixChange(prix){
    if(prix){
      console.log("PRIX NATURE", prix)
      this.prospectFormGroup.controls['nature_prix'].setValue(JSON.stringify(prix));
      // this.prospectFormGroup.controls['nature_prix'].setValue(prix);
    }
  }

  onContratChange(contrat){
    if(contrat){
      console.log("TYPE CONTRAT", contrat)
      this.prospectFormGroup.controls['type_contrat'].setValue(JSON.stringify(contrat));
      // this.prospectFormGroup.controls['type_contrat'].setValue(contrat);
    }
  }

  onRetourFondChange(fond){
    if(fond){
      console.log("RETOUR FOND", fond)
      this.prospectFormGroup.controls['type_retour_fond'].setValue(JSON.stringify(fond));
      // this.prospectFormGroup.controls['type_retour_fond'].setValue(fond);
    }
  }

  onRetourDocumentChange(document){
    if(document){
      console.log("RETOUR DOCUMENT", document)
      this.prospectFormGroup.controls['type_retour_document'].setValue(JSON.stringify(document));
      // this.prospectFormGroup.controls['type_retour_document'].setValue(document);
    }
  }

  onPortChange(port){
    if(port){
      console.log("Port", port)
      this.prospectFormGroup.controls['port'].setValue(JSON.stringify(port));
      // this.prospectFormGroup.controls['port'].setValue(port);
    }
  }
  onPortDestChange(port){
    if(port){
      console.log("Port", port)
      this.prospectFormGroup.controls['port_dest'].setValue(JSON.stringify(port));
      // this.prospectFormGroup.controls['port'].setValue(port);
    }
  }
  onPortExpChange(port){
    if(port){
      console.log("Port", port)
      this.prospectFormGroup.controls['port_exp'].setValue(JSON.stringify(port));
      // this.prospectFormGroup.controls['port'].setValue(port);
    }
  }
  onUserChange(user){
    if(user){
      this.user = user
      // console.log('USER', this.user)
      this.prospectFormGroup.patchValue({user_id: this.user.id})
    }else{
      this.prospectFormGroup.patchValue({user_id: "s"})
    }
  }

  setMaxSize(event){
    console.log(event.target.value)
    this.maxSize = 281 - event.target.value.length
  }

}
