import { concat } from 'rxjs';
import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'app/core/store/app.states';
import { selectTruckService } from 'app/core/store/resources/resources.selectors';
import { selectEnvparcPayload } from 'app/core/store/parc/parc.selectors';
import { BoGridService } from 'app/core/services/admin-bo/bo-grids.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { addVehicule, updateVehicule } from 'app/core/store/vehicule/vehicule.actions';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastService } from 'app/core';
import { selectEnvVehiculeStatus, selectEnvVehiculeIsLoading } from 'app/core/store/vehicule/vehicule.selectors';
import { selectEnvbrandPayload } from 'app/core/store/brand/brand.selectors';
import { selectEnvtruckCategoryPayload } from 'app/core/store/truckCategory/truckCategory.selectors';
import { selectEnvtruckTypePayload } from 'app/core/store/truckType/truckType.selectors';
import { selectEnvtonnagePayload } from 'app/core/store/tonnage/tonnage.selectors';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { SharedAutcompleteComponent } from 'app/shared/components/shared-autcomplete/shared-autcomplete.component';
import { selectAllCityAgence } from 'app/core/store/resources/resources.selectors';
import { VehiculeService } from 'app/core/services/vehicule.service';
import * as moment from 'moment';
import { environment } from 'environments/environment';
import Swal from 'sweetalert2';
// import { NgxDropzoneModule } from 'ngx-dropzone';

@Component({
  selector: 'app-dialog-vehicules',
  templateUrl: './dialog-vehicules.component.html',
  styleUrls: ['./dialog-vehicules.component.css'],
})
export class DialogVehiculesComponent implements OnInit {
  @ViewChildren(SharedAutcompleteComponent)
  searchComponents: QueryList<SharedAutcompleteComponent>;
  cities: any;
  parcs: any;
  brands: any;
  modeles: any;
  gammes: any;
  tonnages: any;
  categories: any;
  services: any;
  types: any;
  image_src: string;
  zones: any;
  files: any;
  code: any;
  servicesId = new Array();
  colors: any;
  carburants = ['DIESEL', 'ESSENCE', 'HYBRIDE', 'ELECTRIQUE'];
  status = ['REFORME', 'En circulation', 'En panne', 'Vendue'];
  TypeReformes = ['PNEU', 'KILOMETRAGE'];
  myControl = new FormControl('');
  options: string[] = ['Casablanca', 'Rabat', 'Fes'];
  reforme: boolean = false;
  vente: boolean = false;
  change: boolean = true;
  gps: boolean = false;
  createVehicule: FormGroup;
  spinnerAdd: boolean = false;
  display_img: boolean = false;
  file: any;
  type: any;
  item: any;
  picture_name: string;
  form_btn: any;
  date_now: any;
  date_sortie: any;
  searchStyle = {
    border: '1px solid #ccc',
    'border-radius': '3px',
    padding: '0.5rem',
  };
  contentStyle = {
    border: '1px solid #ccc',
    'border-radius': '3px',
    padding: '0.5rem',
  };
  url = environment.STORAGE + '/vehicule/';
  maxSize = 281;
  images: any = [];
  images_aff: any = [];
  matriculeMask = [
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /[A-Za-z\u0600-\u06FF]/,
    ' ',
    /\d/,
  ];

  constructor(
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogVehiculesComponent>,
    private boGridService: BoGridService,
    private vehiculeService: VehiculeService,
    private _toast: ToastService
  ) {}

  ngOnInit() {
    this.date_now = moment().format('YYYY-MM-DD');
    console.log('NOW', this.date_now);
    this.item = this.data['item'];
    this.type = this.data['type'];
    console.log('type item', this.type, this.item);
    this.setForm();

    this.store
      .select(selectAllCityAgence)
      .subscribe((res) => (this.cities = res));

    // this.store.select(selectEnvbrandPayload).subscribe((res) => {
    //   // console.log(" brand========>", res)
    //   this.brands = res
    // });

    this.store.select(selectEnvparcPayload).subscribe((res) => {
      // console.log(" parc========>", res)
      this.parcs = res;
    });

    this.store.select(selectEnvtonnagePayload).subscribe((res) => {
      // console.log(" tonnage========>", res)
      this.tonnages = res;
    });

    this.store.select(selectEnvtruckCategoryPayload).subscribe((res) => {
      // console.log(" categories========>", res)
      this.categories = res;
    });

    this.store.select(selectTruckService).subscribe((res) => {
      // console.log(" services========>", res)
      this.services = res;
    });

    this.store.select(selectEnvtruckTypePayload).subscribe((res) => {
      // console.log(" type========>", res)
      this.types = res;
    });

    this.vehiculeService.getColor().subscribe(
      (data) => {
        console.log('data', data);
        this.colors = data['response'];
        // console.log('colors', this.colors);
        setTimeout(() => {
          this.searchComponents.toArray()[8]?.selectObject(this.item?.color);
        });
      },
      (error) => {
        console.log('error', error);
      }
    );

    this.vehiculeService.getBrand().subscribe(
      (data) => {
        console.log('data', data);
        this.brands = data['response'];
        // console.log('brands', this.brands);
        setTimeout(() => {
          this.searchComponents.toArray()[3]?.selectObject(this.item?.brand);
        });
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  ngAfterViewInit() {
    if (this.data['type'] == 'edit') {
      this.searchComponents.toArray()[0]?.selectObject(this.item?.city);
      this.searchComponents.toArray()[1]?.selectObject(this.item?.parc);
      this.searchComponents.toArray()[2]?.selectObject(this.item?.zone);
      this.searchComponents.toArray()[3]?.selectObject(this.item?.brand);
      this.searchComponents.toArray()[4]?.selectObject(this.item?.modele);
      this.searchComponents.toArray()[5]?.selectObject(this.item?.gamme);
      this.searchComponents.toArray()[6]?.selectObject(this.item?.truck_type);
      this.searchComponents
        .toArray()[7]
        ?.selectObject(this.item?.truck_category);
      this.searchComponents.toArray()[8]?.selectObject(this.item?.color);
    }
  }

  setMaxSize(event) {
    console.log(event.target.value);
    this.maxSize = 281 - event.target.value.length;
  }

  setForm() {
    if (this.data['type'] == 'add') {
      this.form_btn = 'Ajouter';
      console.log('form set');
      //  Marque - type - N° dechâssis - date d'entrée - Carburant - tonnage - kilométrage initial - taille de réservoir - puissance fiscal -
      this.createVehicule = new FormGroup({
        activity: new FormControl('', Validators.required),
        code_interne: new FormControl('', Validators.required),
        city_id: new FormControl('', Validators.required),
        parc_id: new FormControl('', Validators.required),
        service: new FormControl('', Validators.required),
        n_chassis: new FormControl('', Validators.required),
        brand_id: new FormControl('', Validators.required),
        zone_id: new FormControl('', Validators.required),
        modele_id: new FormControl('', Validators.required),
        truck_type_id: new FormControl('', Validators.required),
        tonnage_id: new FormControl('', Validators.required),
        date_entree_vehicule: new FormControl('', Validators.required),
        km_initial: new FormControl('', [Validators.required, Validators.min(0)]),
        carburant: new FormControl('', Validators.required),
        taille_reservoir: new FormControl('', [ Validators.required,Validators.min(0)]),
        puissance_fiscale: new FormControl('', [Validators.required,Validators.min(0)]),
        truck_category_id: new FormControl(''),
        color_id: new FormControl(''),
        date_sortie: new FormControl(''),
        date_circulation: new FormControl(''),
        consomation_carburant: new FormControl('', [Validators.min(0)]),
        consomation_carburant_reel: new FormControl('', [Validators.min(0)]),
        adblue: new FormControl(''),
        nbr_scelle: new FormControl(''),
        carNumberPart1 :  new FormControl(""),
        carNumberPart2 :  new FormControl("" ,[ Validators.maxLength(1), Validators.pattern('^[A-Za-z\u0600-\u06FF]$')]),
        carNumberPart3 :  new FormControl("" , [Validators.maxLength(2)]),
        matricule: new FormControl('',Validators.pattern(/^\d+ [A-Za-z\u0600-\u06FF] \d{1,2}$/)),
        gamme_id: new FormControl(''),
        city: new FormControl(''),
        capacite_consommation: new FormControl({ value: '', disabled: true }, [Validators.min(0)]),
        taux_consommation_theorique: new FormControl({ value: '', disabled: true },[Validators.min(0)]),
        taux_consommation_reel: new FormControl({ value: '', disabled: true }, [Validators.min(0)]),
        n_w: new FormControl(''),
        commentaire: new FormControl(''),
        // status: new FormControl("", Validators.required),
        // kilometrage: new FormControl({ value: '', disabled: true }, [Validators.min(0)]),
        // type_reforme: new FormControl({ value: '', disabled: true }),
        // date_entree: new FormControl({ value: '', disabled: true }),
        // date_reforme: new FormControl({ value: '', disabled: true }),
        // date_vente: new FormControl(""),
        // gps: new FormControl("", Validators.required),
        // date_installation_gps : new FormControl({ value: '', disabled: true }),
        // // date_installation_gps: new FormControl(),
        // imei_gps: new FormControl({ value: '', disabled: true }),
        // prestataire: new FormControl({ value: '', disabled: true }),
      });
    } else {
      this.form_btn = "Modifier"
      this.code = this.item.code_interne
      console.log("length service id=======> ", this.item.services.length)
      for(var i=0; i< this.item.services.length; i++){
        // console.log("for service=======> ", this.item.services[i])
        // console.log("for id=======> ", this.item.services[i].id)
        this.servicesId.push(this.item.services[i].id);
      }
      console.log('sevice_id', this.servicesId);

      let matricule = this.item.matricule.split(' ');

      this.createVehicule = new FormGroup({
        city_id: new FormControl(this.item.city_id, Validators.required),
        parc_id: new FormControl(this.item.parc_id, Validators.required),
        service: new FormControl(this.servicesId, Validators.required),
        brand_id: new FormControl(this.item.brand_id, Validators.required),
        gamme_id: new FormControl(this.item.gamme_id, Validators.required),
        zone_id: new FormControl(this.item.zone_id, Validators.required),
        modele_id: new FormControl(this.item.modele_id, Validators.required),
        puissance_fiscale: new FormControl(this.item.puissance_fiscale, Validators.required),
        truck_type_id: new FormControl(this.item.truck_type_id, Validators.required),
        tonnage_id: new FormControl(this.item.tonnage_id, Validators.required),
        km_initial: new FormControl(this.item.km_initial, Validators.required),
        activity: new FormControl(this.item.activity, Validators.required),
        status: new FormControl(this.item.last_status?.status, Validators.required),
        date_entree_vehicule: new FormControl(this.item.date_entree_vehicule, Validators.required),
        code_interne: new FormControl( this.item.code_interne,Validators.required),
        n_chassis: new FormControl(this.item.n_chassis, Validators.required),
        carburant: new FormControl(this.item.carburant, Validators.required),
        taille_reservoir: new FormControl(this.item.taille_reservoir, Validators.required),
        date_sortie: new FormControl(this.item.date_sortie),
        color_id: new FormControl(this.item.color_id),
        city: new FormControl(this.item.city?.name),
        truck_category_id: new FormControl(this.item.truck_category_id),
        date_circulation: new FormControl(this.item.date_circulation),
        consomation_carburant: new FormControl(this.item.consomation_carburant),
        consomation_carburant_reel: new FormControl(this.item.consomation_carburant_reel),
        nbr_scelle: new FormControl(this.item.nbr_scelle),
        adblue: new FormControl(this.item.adblue),
        carNumberPart1 :  new FormControl(matricule[0]),
        carNumberPart2 :  new FormControl(matricule[1] ,[ Validators.maxLength(1), Validators.pattern('^[A-Za-z\u0600-\u06FF]$')]),
        carNumberPart3 :  new FormControl(matricule[2] , [Validators.maxLength(2)]),
        matricule: new FormControl(this.item.matricule,Validators.pattern(/^\d+ [A-Za-z\u0600-\u06FF] \d{1,2}$/)),
        capacite_consommation: new FormControl(this.item.capacite_consommation),
        taux_consommation_theorique: new FormControl(this.item.taux_consommation_theorique),
        taux_consommation_reel: new FormControl(this.item.taux_consommation_reel),
        kilometrage: new FormControl(this.item.kilometrage),
        type_reforme: new FormControl(this.item.type_reforme),
        date_entree: new FormControl(this.item.date_entree),
        date_reforme: new FormControl(this.item.date_reforme),
        date_vente: new FormControl(this.item.date_vente),
        n_w: new FormControl(this.item.n_w),
        commentaire: new FormControl(this.item.commentaire),
      });

      this.createVehicule.get('date_vente').clearValidators();
      this.createVehicule.get('date_vente').updateValueAndValidity();
      this.createVehicule.get('kilometrage').clearValidators();
      this.createVehicule.get('kilometrage').updateValueAndValidity();
      this.createVehicule.get('type_reforme').clearValidators();
      this.createVehicule.get('type_reforme').updateValueAndValidity();
      this.createVehicule.get('date_entree').clearValidators();
      this.createVehicule.get('date_entree').updateValueAndValidity();
      this.createVehicule.get('date_reforme').clearValidators();
      this.createVehicule.get('date_reforme').updateValueAndValidity();
      this.createVehicule.controls['kilometrage'].disable();
      this.createVehicule.controls['type_reforme'].disable();
      this.createVehicule.controls['date_entree'].disable();
      this.createVehicule.controls['date_reforme'].disable();
      this.reforme = false;
      this.vente = false;

      if (this.item.last_status?.status == 'REFORME') {
        console.log('STATYUS REFORME');
        // this.createVehicule
        //   .get('kilometrage')
        //   .setValidators(Validators.required);
        // this.createVehicule
        //   .get('type_reforme')
        //   .setValidators(Validators.required);
        this.createVehicule
          .get('date_entree')
          .setValidators(Validators.required);
        // this.createVehicule
        //   .get('date_reforme')
        //   .setValidators(Validators.required);

        // this.createVehicule.get('kilometrage').setValue(this.item.last_status?.kilometrage)
        // this.createVehicule.get('type_reforme').setValue(this.item.last_status?.type_reforme)
        // this.createVehicule.get('date_entree').setValue(this.item.last_status?.date_entree)
        // this.createVehicule.get('date_reforme').setValue(this.item.last_status?.date_reforme)

        this.createVehicule.controls['kilometrage'].enable();
        this.createVehicule.controls['type_reforme'].enable();
        this.createVehicule.controls['date_entree'].enable();
        this.createVehicule.controls['date_reforme'].enable();
      }

      if (this.item.last_status?.status == 'Vendue') {
        // this.createVehicule
        //   .get('date_vente')
        //   .setValidators(Validators.required);
        this.createVehicule
          .get('date_vente')
          .setValue(this.item.last_status?.date_vente);
        this.vente = true;
      }

      if (this.item.status == 'REFORME') {
        this.createVehicule.controls['kilometrage'].enable();
        this.createVehicule.controls['type_reforme'].enable();
        this.createVehicule.controls['date_entree'].enable();
        this.createVehicule.controls['date_reforme'].enable();
      } else {
        this.createVehicule.controls['kilometrage'].disable();
        this.createVehicule.controls['type_reforme'].disable();
        this.createVehicule.controls['date_entree'].disable();
        this.createVehicule.controls['date_reforme'].disable();
      }

      if (this.item.adblue == true) {
        this.createVehicule.controls['adblue'].setValue('1');
        this.createVehicule.controls['capacite_consommation'].enable();
        this.createVehicule.controls['taux_consommation_theorique'].enable();
        this.createVehicule.controls['taux_consommation_reel'].enable();
      } else {
        this.createVehicule.controls['adblue'].setValue('0');
        this.createVehicule.controls['capacite_consommation'].disable();
        this.createVehicule.controls['taux_consommation_theorique'].disable();
        this.createVehicule.controls['taux_consommation_reel'].disable();
      }

      this.zones = this.item.city?.zones;
      this.modeles = this.item.brand?.modeles;
      // console.log("zone  ", this.zones)
      // console.log(" modeles ", this.modeles)
      this.gammes = this.modeles?.find(
        (m) => m.id == this.item.modele_id
      )?.gammes;
      // console.log("gammes ", this.gammes)
      this.display_img = true;
      this.images_aff = this.item.images;
      console.log('IMAGES', this.images_aff);
      // this.image_src = this.url + this.item.id + '/' + this.item.image;
      // console.log("IMG SRC ", this.image_src)
    }
  }

  formatMatricule(event: any) {
    // Obtenez la valeur actuelle du champ
    let inputValue: string = event.target.value;

    // Supprimez tous les caractères non numériques et non alphabétiques
    inputValue = inputValue.replace(/[^0-9a-zA-Z\u0600-\u06FF]/g, '');

    // Appliquez le modèle spécifique (NNNN L N)
    let formattedValue = '';
    for (let i = 0; i < inputValue.length; i++) {
      // if (i === 4 || i === 6) {
      //   formattedValue += ' ';
      // }
      if ((i < 4 && /^[0-9]$/.test(inputValue[i])) || (i === 5 && /^[A-Za-z\u0600-\u06FF]$/.test(inputValue[i])) || (i === 7 && /^[0-9]$/.test(inputValue[i]))) {
        formattedValue += inputValue[i];
      }
    }

    // Mettez à jour la valeur du champ avec le format appliqué
    this.createVehicule.controls.matricule.setValue(formattedValue);
  }

  limitInputLength(event: any): void {
    const inputValue: string = event.target.value;

    // Limitez la longueur à 4 caractères
    if (inputValue.length > 4) {
      event.target.value = inputValue.slice(0, 3);
    }
    console.log('carNumberPart1',this.createVehicule.controls.carNumberPart1.value);

  }
  limitInputOneLength(event: any): void {
    const inputValue: string = event.target.value;

    // Limitez la longueur à 4 caractères
    if (inputValue.length > 2) {
      event.target.value = inputValue.slice(0,1);
    }
    console.log('carNumberPart3',this.createVehicule.controls.carNumberPart3.value);

  }

  onChange(event) {
    // this.servicesId = [];
    this.change = false;
    this.servicesId = new Array();
    console.log('event', event.value);
    this.servicesId.push(event.value);
    console.log('onchange', this.servicesId);
  }

  filterCity(event: any) {
    if (event) {
      this.createVehicule.controls['city_id'].setValue(event.id);
      this.zones = this.cities?.find((city) => city.id == event.id).zones;
      setTimeout(() => {
        this.searchComponents.toArray()[2].selectObject(this.item?.zone);
      });
    }
  }

  filterZone(event) {
    if (event) {
      this.createVehicule.controls['zone_id'].setValue(event.id);
    }
  }

  filterColor(event) {
    if (event) {
      this.createVehicule.controls['color_id'].setValue(event.id);
    }
  }

  filterParc(event) {
    if (event) {
      this.createVehicule.controls['parc_id'].setValue(event.id);
    }
  }

  filterCategorie(event) {
    if (event) {
      this.createVehicule.controls['truck_category_id'].setValue(event.id);
    }
  }

  filterType(event) {
    if (event) {
      this.createVehicule.controls['truck_type_id'].setValue(event.id);
    }
  }

  filterGamme(event) {
    if (event) {
      this.createVehicule.controls['gamme_id'].setValue(event.id);
    }
  }

  filterModele(event) {
    if (event) {
      this.createVehicule.controls['modele_id'].setValue(event.id);
      this.gammes = this.modeles?.find(
        (modele) => modele.id == event.id
      )?.gammes;
      setTimeout(() => {
        // this.searchComponents.toArray()[3].selectObject(this.item?.modele)
        this.searchComponents.toArray()[5].selectObject(this.item?.gamme);
      });
    }
  }

  filterBrand(event) {
    if (event) {
      this.createVehicule.controls['brand_id'].setValue(event.id);
      this.modeles = this.brands?.find((brand) => brand.id == event.id).modeles;
      setTimeout(() => {
        // this.searchComponents.toArray()[2].selectObject(this.item?.brand)
        this.searchComponents.toArray()[4].selectObject(this.item?.modele);
        // this.searchComponents.toArray()[4].selectObject(this.item?.gamme)
      });
    }
  }

  setDateDebut(value) {
    console.log('DATE DEBUT', value);
    this.date_sortie = value;
  }

  statusReforme($event) {
    this.createVehicule.get('date_vente').clearValidators();
    this.createVehicule.get('date_vente').updateValueAndValidity();
    this.createVehicule.get('kilometrage').clearValidators();
    this.createVehicule.get('kilometrage').updateValueAndValidity();
    this.createVehicule.get('type_reforme').clearValidators();
    this.createVehicule.get('type_reforme').updateValueAndValidity();
    this.createVehicule.get('date_entree').clearValidators();
    this.createVehicule.get('date_entree').updateValueAndValidity();
    this.createVehicule.get('date_reforme').clearValidators();
    this.createVehicule.get('date_reforme').updateValueAndValidity();
    this.createVehicule.controls['kilometrage'].disable();
    this.createVehicule.controls['type_reforme'].disable();
    this.createVehicule.controls['date_entree'].disable();
    this.createVehicule.controls['date_reforme'].disable();
    this.reforme = false;
    this.vente = false;
    if ($event.value == 'REFORME') {
      // this.createVehicule.get('kilometrage').setValidators(Validators.required);
      // this.createVehicule
      //   .get('type_reforme')
      //   .setValidators(Validators.required);
      this.createVehicule.get('date_entree').setValidators(Validators.required);
      // this.createVehicule
      //   .get('date_reforme')
      //   .setValidators(Validators.required);
      this.reforme = true;
      this.createVehicule.controls['kilometrage'].enable();
      this.createVehicule.controls['type_reforme'].enable();
      this.createVehicule.controls['date_entree'].enable();
      this.createVehicule.controls['date_reforme'].enable();
    }
    if ($event.value == 'Vendue') {
      // this.createVehicule.get('date_vente').setValidators(Validators.required);
      this.vente = true;
    }
  }

  statusGps($event) {
    this.createVehicule.controls['date_installation_gps'].disable();
    this.createVehicule.controls['imei_gps'].disable();
    this.createVehicule.controls['prestataire'].disable();
    this.gps = false;
    // console.log("status Gps", $event.value);
    if ($event.value == 1) {
      this.gps = true;
      this.createVehicule.controls['date_installation_gps'].enable();
      this.createVehicule.controls['imei_gps'].enable();
      this.createVehicule.controls['prestataire'].enable();
    }
  }

  statusAdblue($event) {
    this.createVehicule.get('capacite_consommation').clearValidators();
    this.createVehicule.get('capacite_consommation').updateValueAndValidity();
    this.createVehicule.get('taux_consommation_theorique').clearValidators();
    this.createVehicule
      .get('taux_consommation_theorique')
      .updateValueAndValidity();
    this.createVehicule.get('taux_consommation_reel').clearValidators();
    this.createVehicule.get('taux_consommation_reel').updateValueAndValidity();
    this.createVehicule.controls['capacite_consommation'].disable();
    this.createVehicule.controls['taux_consommation_theorique'].disable();
    this.createVehicule.controls['taux_consommation_reel'].disable();
    this.gps = false;
    // console.log("status Gps", $event.value);
    if ($event.value == 1) {
      this.gps = true;
      // this.createVehicule
      //   .get('capacite_consommation')
      //   .setValidators(Validators.required);
      // this.createVehicule
      //   .get('taux_consommation_theorique')
      //   .setValidators(Validators.required);
      // this.createVehicule
      //   .get('taux_consommation_reel')
      //   .setValidators(Validators.required);
      this.createVehicule.controls['capacite_consommation'].enable();
      this.createVehicule.controls['taux_consommation_theorique'].enable();
      this.createVehicule.controls['taux_consommation_reel'].enable();
    }
  }

  onSelectImage(fileInputEvent: any) {
    this.file = fileInputEvent.target.files[0];
    this.picture_name = this.file.name;
    var reader = new FileReader();
    reader.readAsDataURL(fileInputEvent.target.files[0]);
    reader.onload = (event: any) => {
      this.image_src = event.target.result;
      this.display_img = true;
      this.file['file'] = event.target.result;
    };
    this.images.push(this.file);
    console.log('IMAGES []', this.images);
  }

  removeImage(i) {
    Swal.fire({
      title: "Êtes-vous sûr(e) de vouloir supprimer l'image ?",
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.images.splice(i, 1);
      }
    });
  }

  addVehicule() {
    this.createVehicule.controls.matricule.setValue(
      this.createVehicule.controls.carNumberPart1.value + ' ' + this.createVehicule.controls.carNumberPart2.value + ' ' +this.createVehicule.controls.carNumberPart3.value
    );
    console.log('this.createVehicule');
    console.log(this.createVehicule);
    console.log(this.createVehicule.value);


    if (this.createVehicule.invalid) {
      console.log('INVALID');
      this._toast.warn('Veuillez remplir tous les champs obligatoires');
      return;
    }
    if (
      !(
        this.createVehicule.controls.n_w.value ||
        this.createVehicule.controls.matricule.value
      )
    ) {
      this._toast.warn('Veuillez remplir le matricule ou le WWW!');
      return;
    }
    console.log('add', this.createVehicule.value);

    const formData = new FormData();
    for (var i = 0; i < this.servicesId.length; i++) {
      for (var j = 0; j < this.servicesId[i].length; j++) {
        formData.append('service_ids[]', this.servicesId[i][j]);
      }
    }
    for (var key in this.createVehicule.value) {
      if(!(key == 'carNumberPart1' || key== 'carNumberPart2' || key== 'carNumberPart3')) {
        if (this.createVehicule.value[key]) {
          formData.append(key, this.createVehicule.value[key]);
        }
      }
    }

    if (this.data['type'] == 'add') {
      if (this.images.length) {
        // formData.append('image', this.file)
        for (var i = 0; i < this.images.length; i++) {
          console.log('images[]', this.images[i]);
          formData.append('images[]', this.images[i]);
        }
      } else {
        formData.append('images[]', null);
      }
        this.store.dispatch(addVehicule({ data: formData }));
        this.store.select(selectEnvVehiculeIsLoading).subscribe((res) => {
          console.log('spinner', res);
          this.spinnerAdd = res;
        });
        this.store.select(selectEnvVehiculeStatus).subscribe((res) => {
          console.log('status', res);
          if (res == 'SUCCESS') {
            this.dialogRef.close();
          }
        });
      // } else {
      //   this._toast.error("Remplir l'image !");
      // }
    } else {
      if (this.change) {
        for (var i = 0; i < this.servicesId.length; i++) {
          // console.log(this.servicesId[i], "array id service[i]")
          formData.append('service_ids[]', this.servicesId[i]);
        }
      }

      if (this.images.length) {
        // formData.append('image', this.file)
        for (var i = 0; i < this.images.length; i++) {
          console.log('images[]', this.images[i]);
          formData.append('images[]', this.images[i]);
        }
      } else {
        formData.append('images[]', null);
      }
      // if (!this.images.length && !this.images_aff.length) {
      //   this._toast.error("Remplir l'image !");
      // } else {
        this.store.dispatch(
          updateVehicule({ data: formData, uuid: this.item.uuid })
        );
        this.store.select(selectEnvVehiculeIsLoading).subscribe((res) => {
          this.spinnerAdd = res;
        });
        this.store.select(selectEnvVehiculeStatus).subscribe((res) => {
          if (res == 'SUCCESS') {
            this.dialogRef.close(true);
          }
        });
      // }
    }
  }

  deletImage(uuid) {
    console.log(uuid), 'uuid';
    Swal.fire({
      title: "Êtes-vous sûr(e) de vouloir supprimer l'image ?",
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'red',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.vehiculeService.deletMedia(uuid).subscribe(
          (data) => {
            console.log('delet', data),
              this._toast.success('Image supprimé avec succès!');
            this.images_aff = this.images_aff.filter(function (obj) {
              return obj.uuid !== uuid;
            });
          },
          (error) => {
            console.log('error', error);
            this._toast.error(
              "Une erreur est survenue lors de la suppression de l'image !"
            );
          }
        );
      }
    });
  }
}
