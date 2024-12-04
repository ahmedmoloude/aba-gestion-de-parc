import { selectEnvparcPayload } from 'app/core/store/parc/parc.selectors';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'app/services';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { PersonelService } from '../../../../app/core/services/personel.service';
import { TypeServiceService } from '../../../../app/core/services/type-service.service';
import { RessouresService } from '../../../../app/core/services/ressoures.service';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import {
  FormControl,
  FormGroup,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { selectEnvPayloadAgence } from 'app/core/store/agence/agence.selectors';
import { Observable } from 'rxjs';
import { RoleState, StateEnum } from 'app/core/store/role/role.reducer';
import { loadRoles } from 'app/core/store/role/role.actions';
import { PHONE_REGEX } from 'app/shared/validators/validators';
@Component({
  selector: 'app-add-personnel',
  templateUrl: './add-personnel.component.html',
  styleUrls: ['./add-personnel.component.css'],
})
export class AddPersonnelComponent implements OnInit {
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

  getFunctionByName(f) {
    return this.functions[f];
  }

  f: FormGroup;
  tonnages: any = [];
  zonnes: any = [];
  isCommerciale: boolean = false;
  Childrens: any = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  parcs: any = [];
  image_src: string;
  picture_name: string;
  showEndDate: boolean = false;
  steInterimShow: boolean = false;
  display_img: boolean = false;
  isaddConatct: boolean = false;
  files: any;
  Conducteur: boolean = false;
  cities: any;
  isLoading: boolean = false;
  services: any;
  alert_config: {
    title: 'le personnel a été ajouté avec succès';
    icon: 'success';
    confirmBtn: "D'acoords";
  };
  showRolesInput = false;
  agencies = [];

  role$: Observable<RoleState> = this.store.select((state) => state.role);
  roles = [];
  tempRoles = [];

  constructor(
    private personelservice: PersonelService,
    private typeServiceService: TypeServiceService,
    private _router: Router,
    private boGridService: BoGridService,
    private _toast: ToastService,
    private ressouresService: RessouresService,
    private store: Store<AppState>
  ) {}
  ngOnInit(): void {
    this.store.dispatch(loadRoles());
    this.getServices();
    this.getTonnage();
    // this.getParcs()
    this.setForm();
    this.getAllZonnes();

    this.store.select(selectEnvparcPayload).subscribe((res) => {
      // console.log(" parc========>", res)
      this.parcs = res;
    });

    this.store.select(selectEnvPayloadAgence).subscribe((res) => {
      this.agencies = res;
    });

    this.role$.subscribe((resp) => {
      if (resp.rolesState == StateEnum.SUCCESS) {
        this.roles = resp.roles;
      }
    });
    this.f.get('function').valueChanges.subscribe((value) => {
      if (value === 'POINTER') {
        // Appliquer un validateur requis au champ agency_id si la fonction est 'POINTER'
        this.f.get('agency_id').setValidators([Validators.required]);
        this.f.get('agency_id').updateValueAndValidity(); // Mettre à jour la validité
      } else {
        // Sinon, retirer tous les validateurs du champ agency_id
        this.f.get('agency_id').clearValidators();
        this.f.get('agency_id').updateValueAndValidity(); // Mettre à jour la validité
      }
    });
  }
  imgInputChange(fileInputEvent: any) {
    this.files = fileInputEvent.target.files[0];
    this.picture_name = this.files.name;
    var reader = new FileReader();
    reader.readAsDataURL(fileInputEvent.target.files[0]);
    reader.onload = (event: any) => {
      this.image_src = event.target.result;
      this.display_img = true;
    };
  }

  // Méthode pour parcourir et afficher des erreurs de validation spécifiques pour chaque champ
  getFormValidationErrors() {
    Object.keys(this.f.controls).forEach((key) => {
      const controlErrors = this.f.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((keyError) => {
          let message = this.getErrorMessage(key, keyError);
          this._toast.error(message);
        });
      }
    });
  }

  // Retourne un message d'erreur basé sur le type d'erreur
  getErrorMessage(fieldName: string, validatorName: string): string {
    const messages = {
      required: `${fieldName} est requis`,
      email: `Veuillez saisir une adresse email valide`,
      // Ajoutez d'autres messages personnalisés pour différents types d'erreurs ici
    };

    return messages[validatorName] || `${fieldName} est invalide`;
  }

  submit() {
    this.isLoading = true;
    if (this.f.invalid) {
      this.getFormValidationErrors(); // Supposons que cette méthode parcourt les erreurs et les enregistre quelque part
      this._toast.error("Vous n'avez pas rempli tous les champs obligatoires");
      this.isLoading = false;
      return; // arrêter l'exécution plus loin si le formulaire est invalide
    }
    var formData = new FormData();
    for (var key in this.f.value) {
      if (key.includes('date')) {
        var value = this.convert(this.f.value[key]);
        formData.append(key, value);
      } else {
        formData.append(key, this.f.value[key]);
      }
    }
    if (this.files) {
      formData.append('profile_picture_url', this.files);
      this.personelservice.addUser(formData).subscribe(
        (res) => {
          this.isLoading = false;
          this._toast.success(' le personnel a été bien ajouté ');
          this._router.navigate(['gestionpersonnel']);
        },
        (error) => {
          console.log(error);
          this._toast.error("vous n'avez pas rempli tous les champs");
          this.isLoading = false;
        }
      );
    } else {
      this._toast.error("vous n'avez pas rempli la photo de profil");
      this.isLoading = false;
    }
  }
  convert(str) {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join('-');
  }
  villeSelectedForBirthplace($event) {
    var birth_place = this.cities.find(
      (city) => city.name == $event.option.value
    ).name;
    this.f.controls['birth_place'].setValue(birth_place);
  }
  villeSelectedForTown($event) {
    var town = this.cities.find(
      (city) => city.name == $event.option.value
    ).name;
    this.f.controls['town'].setValue(town);
  }
  filterCity(event: any) {
    if (event.target.value.length > 2) {
      this.boGridService
        .citiesFilter(event.target.value.toUpperCase())
        .subscribe(
          (data) => {
            this.cities = data;
          },
          (error) => {
            console.log('error', error);
          }
        );
    }
  }
  filterCityForTown(event) {
    console.log(event);
    if (event.target.value.length > 2) {
      this.boGridService
        .citiesFilter(event.target.value.toUpperCase())
        .subscribe(
          (data) => {
            this.cities = data;
          },
          (error) => {
            console.log('error', error);
          }
        );
    }
  }
  typeOfContrartChange(event) {
    console.log(event.value);
    this.f.get('date_end_contrart').clearValidators();
    this.f.get('date_end_contrart').updateValueAndValidity();
    if (event.value === 'cdd') {
      // this.f.get('date_end_contrart').setValidators(Validators.required)
      this.showEndDate = true;
      this.steInterimShow = false;
    } else if (event.value === 'Interim') {
      // this.f.get('date_end_contrart').setValidators(Validators.required)
      this.steInterimShow = true;
      this.showEndDate = true;
    } else {
      // this.f.get('date_end_contrart').clearValidators();
      this.showEndDate = false;
      this.steInterimShow = false;
    }

    console.log('showEndDate', this.showEndDate);
  }
  addConatct() {
    this.isaddConatct = true;
  }
  moinContact() {
    this.isaddConatct = false;
  }
  getFonction(event) {
    console.log('ROLES', this.roles);
    if (event.value == 'DRIVER') {
      this.Conducteur = true;
      this.isCommerciale = false;
    } else if (event.value == 'COMMERCIAL') {
      this.isCommerciale = true;
      console.log(this.isCommerciale);
    } else {
      this.Conducteur = false;
      this.isCommerciale = false;
    }

    this.tempRoles = this.roles.filter((r) => r.function == event.value);
    this.showRolesInput = true;
  }

  getTonnage() {
    this.personelservice.getTonnage().subscribe((res: any) => {
      this.tonnages = res.response;
    });
  }

  // getParcs(){
  //   this.personelservice.getParc().subscribe((res:any)=>{
  //     this.parcs = res
  //   })
  // }

  getServices() {
    this.typeServiceService.getAllServices().subscribe((res) => {
      this.services = res;
    });
  }
  start_time: any;
  setDateDebut(e) {
    console.log('DATE DEBUT', e);
    this.start_time = e;
  }
  getAllZonnes() {
    this.ressouresService.getZones().subscribe((response: any) => {
      this.zonnes = response;
    });
  }

  setForm() {
    this.f = new FormGroup({
      matricule: new FormControl('', Validators.required),
      cin: new FormControl('', Validators.required),
      first_name: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-ZÀ-ÿ ]+$/),
      ]),
      last_name: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-ZÀ-ÿ ]+$/),
      ]),
      gsm_personnel: new FormControl('', [
        Validators.required,
        Validators.pattern(PHONE_REGEX),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      direction: new FormControl('', Validators.required),
      departement: new FormControl('', Validators.required),
      service_id: new FormControl('', Validators.required),
      parc: new FormControl('', Validators.required),
      contract_type: new FormControl('', Validators.required),
      code: new FormControl('', Validators.required),
      function: new FormControl('', Validators.required),
      role_id: new FormControl(null, Validators.required),
      gsm_professionnel: new FormControl('', [
        Validators.required,
        Validators.pattern(PHONE_REGEX),
      ]),
      entry_date: new FormControl(''),
      affectation: new FormControl(''),
      dirver_licence_numero: new FormControl(''),
      dirver_licence_type: new FormControl(''),
      end_date_cin: new FormControl(''),
      birth_date: new FormControl(''),
      birth_place: new FormControl(''),
      town: new FormControl(''),
      family_situation: new FormControl(''),
      children_number: new FormControl(''),
      adress: new FormControl(''),
      cnss_number: new FormControl(''),
      interim_company: new FormControl(''),
      statut: new FormControl(''),
      dirver_licence_validity_date: new FormControl(''),
      contact_contact_1: new FormControl(''),
      contact_1_gsm: new FormControl('', Validators.pattern(PHONE_REGEX)),
      contact_contact_2: new FormControl(''),
      contact_2_gsm: new FormControl('', Validators.pattern(PHONE_REGEX)),
      experience_studies_level: new FormControl(''),
      experience_pro_experience: new FormControl(''),
      experience_diplome: new FormControl(''),
      experience_former_job: new FormControl(''),
      fixe_professionnel: new FormControl('', Validators.pattern(PHONE_REGEX)),
      date_end_contrart: new FormControl(''),
      cart_pro_num: new FormControl(''),
      zonne: new FormControl(''),
      color: new FormControl(''),
      agency_id: new FormControl(''),
    });
  }
}
