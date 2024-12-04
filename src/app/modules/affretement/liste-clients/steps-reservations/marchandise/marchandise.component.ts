import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  addDetailsMarchandiseSuccess,
  addEnvoiData,
  addNbrPalettesG,
  addNbrPalettesGlobal,
  addRetourData,
  addValeurDeclareG,
  addpoidsG,
  addvolumeG,
  currentNbrPalettesG,
  deleteDetailsMarchandiseSuccess,
  deleteEnvoiSuccess,
  deletePointChargementSuccess,
  deletePointDechargementSuccess,
  deleteRetourSuccess,
  deleteServiceSuccess,
  deleteVehiculeSuccess,
  getCurrentStepSuccess,
  getDestinataireInfosSuccess,
  getMarchandiseSuccess,
  getModePortSuccess,
  getPointChargementSuccess,
  getVehiculeServicesSuccess,
  getVehicules,
  restoreNbrPalettesG,
  restorePoidsG,
  restoreTotalPalettesEnvoi,
  updateNbrPalettesDetailsMarchandiseSuccess,
} from 'app/core/store/reservation/reservation.actions';
import {
  SelectEnvoiDataReservation,
  SelectNbrPalttesGReservation,
  SelectPoidsGReservation,
  SelectRetourDataReservation,
  SelectTotalPalettesEnvoi,
  SelectValeurDeclareGReservation,
  SelectVolumeGReservation,
  selectReservationData,
  selectReservationDate,
  selectReservationDestinataire,
  selectReservationVehicules,
  selectTypeAffretment,
} from 'app/core/store/reservation/reservation.selectors';
import { Observable, Subject, concat, from } from 'rxjs';
import { MatCheckbox } from '@angular/material/checkbox';
import { VehiculeService } from 'app/core/services/vehicule.service';
import { ToastService } from 'app/services';
import { VisualiserRetourComponent } from './visualiser-retour/visualiser-retour.component';
import { VisualiserEnvoiComponent } from './visualiser-envoi/visualiser-envoi.component';
import { MapMarchandiseComponent } from './map-marchandise/map-marchandise.component';
import { DetailMarchandiseComponent } from './detail-marchandise/detail-marchandise.component';
import { SelectChargementComponent } from '../../select-chargement/select-chargement.component';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { SupportDialogComponent } from './support-dialog/support-dialog.component';
import { DialogNmbsupportComponent } from './dialog-nmbsupport/dialog-nmbsupport.component';
import { selectCities } from 'app/core/store/location/location.selectors';
import { SelectDechargementComponent } from '../../select-dechargement/select-dechargement.component';
import { map, mergeMap, startWith, takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { DateAdapter } from '@angular/material/core';
import { PortService } from 'app/core/services/port.service';
import { AffretementService } from 'app/core/services/affretement.service';
import { AppState } from 'app/core/store/app.states';
export interface Facteur {
  name: string;
}
export interface ChekedDestinataire {
  retour_fonds: boolean;
  retour_documents: boolean;
}

@Component({
  selector: 'app-marchandise',
  templateUrl: './marchandise.component.html',
  styleUrls: ['./marchandise.component.css'],
})
export class MarchandiseComponent implements OnInit, AfterViewInit {

  isPanelExpanded: boolean[] = []; // Initialize this array based on your requirements

  marchandiseReservationForm: FormGroup;
  // marchandiseForm: FormGroup;
  chargementForm: FormGroup;
  portForm: FormGroup;
  destinataireForm: FormGroup;
  totalDestinataireForm: FormGroup;
  vsForm: FormGroup;
  addressChange: any;
  myDestinataires: Array<any>;
  destinatairesGroup: FormGroup;
  pointGeoForm: FormGroup;
  checkedStates: any = [];
  showTemplate1: boolean = false;
  showTemplate2: boolean = false;
  //@ViewChild('showTemplate1') showTemplate1: ElementRef;
  // @ViewChild('showTemplate2') showTemplate2: ElementRef;
  // @ViewChild('checkboxGerbage') checkboxGerbage: ElementRef;
  @ViewChild('checkboxGerbage') checkboxGerbage: MatCheckbox;
  @ViewChild('inputNbrPlattes') inputNbrPlattes: ElementRef<InputEvent>;

  // @ViewChild('typepallet') typepallet: ElementRef;
  checkedDestinataires: any = [];
  myVehicules: [];
  vehiculesReservation: any[];
  selectedVehicule: any;
  vehiculeSpinner: boolean = true;
  modeEnvoi: string = 'ajout';

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  min_bl: number = 0;
  max_bl: number = 999;
  min_fa: number = 0;
  max_fa: number = 999;
  facteurs: Facteur[] = [];
  @Output() stepNextEvent = new EventEmitter<number>();
  @Output() stepBackEvent = new EventEmitter<number>();

  step: number = 2;
  data_points_Chargement: Array<any> = [];
  data_checkedStates: Array<any> = [];
  data_destinatairesData: Array<any> = [];
  data_marchandise: any;
  data_modePort: any;
  data_vehicules: Array<any> = [];
  data_services: Array<any> = [];
  cities: any[];
  vehiculeChange: any;
  data_step: any;
  test: '';
  // { id: 1, type: 'Américan', dimension: '1200x1000', disabled: false },
  // {
  //   id: 2,
  //   type: 'Américan traités',
  //   dimension: '1200x1000',
  //   disabled: false,
  // },
  // { id: 3, type: 'Euro', dimension: '1200x800', disabled: false },
  // { id: 4, type: 'ISO', dimension: '1200x1000', disabled: false },
  palettes: any[] = [
  ];
  type_documents: any[] = ['Facture', 'BL'];

  servicesReservation = [];

  envoiPaletteSelected: any;
  envoiPaletteSelectedDimension: any;
  edit_mode: boolean;
  dateReservation: any;
  nbrPalettesState: { nbrPalettesG: number };

  type_affretmnet_id ;


  volumeG = 0;
  nbrPalettesG = 0;
  valeurDeclareG = 0;
  poidsGlobal = 0;
  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private vehiculeService: VehiculeService,
    private portService: PortService,
    private _toast: ToastService,
    private cdr: ChangeDetectorRef,
    private affretmentService: AffretementService
  ) {}

  dateReservation$: Observable<any> = this.store.select(selectReservationDate);
  typeAffretment$ : Observable<any> = this.store.select(selectTypeAffretment)

  destinataireList$: Observable<any> = this.store.select(
    selectReservationDestinataire
  );

  minDate: string;
  maxDate: string;
  reservationData$: Observable<any> = this.store.select(selectReservationData);
  dateTime: FormControl;
  envoiData: any;
  retourData: any;
  totalPalettesEnvoi: number;
  ports: any[];


  ngOnInit(): void {


    this.store.select(SelectPoidsGReservation).subscribe((data) => {
      this.poidsGlobal = data.poidsG;
    });
    this.store.select(SelectVolumeGReservation).subscribe((data) => {
      this.volumeG = data.volumeG;
    });
    this.store.select(SelectNbrPalttesGReservation).subscribe((data) => {
      this.nbrPalettesG = data.nbrPalettesG;
    });
    this.store.select(SelectValeurDeclareGReservation).subscribe((data) => {
      this.valeurDeclareG = data.valeurDeclareG;
    });
    this.affretmentService.getPaletteTypes().subscribe((res) => {
      this.palettes = res;
    });

    this.store.dispatch(getVehicules());
    this.affretmentService
      .getSelectableServicesAffretment()
      .subscribe((services) => {
        this.servicesReservation = services;
      });
    this.portService.getListPort().subscribe((data) => {
      this.ports = data.response.filter((port) => port.for_receive == false);
      console.log(this.ports);
    });

    this.store.select(selectReservationVehicules).subscribe((data: any) => {
      this.vehiculesReservation = data.vehicules || [];
      if (typeof  this.vehiculesReservation === 'object') {
        this.vehiculesReservation = Object.values(this.vehiculesReservation);
      }
    });

    console.log(this.minDate);
    this.dateReservation$.subscribe((data) => {
      this.dateReservation = data.dateReservation;
      let debut: string = this.dateReservation.date_debut;
      let fin: string = this.dateReservation.date_fin;
      this.minDate = debut + 'T00:00';
      this.maxDate = fin + 'T00:00';
      console.log(this.dateReservation);
    });
    this.typeAffretment$.subscribe((data) => {
      this.type_affretmnet_id = data
    })

    this.store.select(SelectEnvoiDataReservation).subscribe((data) => {
      this.envoiData = data.envoiData;
    });
    this.store.select(SelectRetourDataReservation).subscribe((data) => {
      this.retourData = data.retourData;
    });

    // this.minDate = (this.dateReservation.date_debut + 'T00:00') as string;
    // this.maxDate = (this.dateReservation.date_debut + 'T00:00') as string;

    this.store.select(SelectNbrPalttesGReservation).subscribe((data) => {
      this.nbrPalettesState = data;
    });

    this.store.select(SelectTotalPalettesEnvoi).subscribe((data) => {
      this.totalPalettesEnvoi = data.totalPalettesEnvoi;
    });

    this.destinataireList$.subscribe((data) => {
      this.myDestinataires = data.destinataireList.destinataires;
    });

    // this.destinataireVehicules$.subscribe((data) => {
    //   this.myVehicules = data.vehicules;
    // this.myVehicules?.length > 0
    //   ? (this.vehiculeSpinner = false)
    //   : (this.vehiculeSpinner = true);

    //   console.log(data.vehicules);
    // });

    this.store.select(selectCities).subscribe((res) => {
      this.cities = res;
    });

    this.reservationData$.subscribe((data) => {
      this.data_step = data.state.currentStep;
      this.edit_mode = data.state.edit_mode;
      this.data_points_Chargement = data.state.point_Chargement;
      if (typeof this.data_points_Chargement === 'object') {
        this.data_points_Chargement = Object.values(this.data_points_Chargement);
      }
      this.data_checkedStates = data.state.destinataire_infos.checkedStates;
      this.data_destinatairesData =
        data.state.destinataire_infos.destinatairesData;
      this.data_marchandise = data.state.marchandise;
      this.data_modePort = data.state.modePort;
      this.data_vehicules = data.state.vehicule_services.vehicules || [];
      this.data_services = data.state.vehicule_services.services || [];
    });

    if (this.edit_mode) {
      this.reservationFormStep()
    }
    else{
      this.reservationFormInit();
    }

  }

  reservationFormStep() {


    console.log('d ' , this.data_marchandise)
    this.marchandiseReservationForm = new FormGroup({});

    // this.marchandiseForm = new FormGroup({
    //   nbr_palettes: new FormControl(this.data_marchandise?.nbr_palettes || this.data_marchandise?.nbr_palette , [
    //     Validators.required,
    //   ]),
    //   poids: new FormControl(this.data_marchandise?.poids, [
    //     Validators.required,
    //     Validators.min(1),
    //   ]),
    //   volume: new FormControl(this.data_marchandise?.volume, [
    //     Validators.required,
    //   ]),
    //   valeur_declare: new FormControl(this.data_marchandise?.valeur_declare, [
    //     Validators.required,
    //   ]),
    // });

    this.portForm = new FormGroup({
      port_id: new FormControl(this.data_modePort, [Validators.required]),
    });

    //get services ----------
    const servicesFormArray2 = this.fb.array([]);
    this.data_services.forEach((service: any) => {
      const serviceForm = this.fb.group({
        id: this.fb.control(service?.id, [,]),
        name: this.fb.control(service?.name || service?.title_affichage, [,]),
        nbr: this.fb.control(Number(service?.nbr) , [Validators.min(0)]),
      });
      servicesFormArray2.push(serviceForm);
    });
    //get vehicules

    const vehiculesFormArray2 = this.fb.array([]);



    console.log('here in edit mode ..')
    console.log('data vehicules ' , this.data_vehicules)
    if (this.data_vehicules.length > 0) {

      this.data_vehicules?.forEach((vehicule: any) => {

        let tonnage =  typeof vehicule?.tonnage === 'object' ? vehicule.tonnage.name : vehicule?.tonnage

        console.log('tonnage ' , tonnage)
        const vehiculeForm = this.fb.group({
          id: this.fb.control(vehicule?.id, [Validators.required]),
          type_camion: this.fb.control(vehicule?.type_camion || vehicule?.truck_type?.name, [
            Validators.required,
          ]),
          tonnage: this.fb.control(


            parseInt(tonnage)
           ,
            [Validators.required]
          ),
          poids_vehicule: this.fb.control(vehicule?.poids_vehicule, [
          ]),
        });
        vehiculesFormArray2.push(vehiculeForm);
      });
    }


    console.log('vechiules' , vehiculesFormArray2.value)

    //set the vsForm
    this.vsForm = this.fb.group({
      services: servicesFormArray2 ,
      vehicules: vehiculesFormArray2,
    });

    //get the points Chargements
    const chargements2 = this.fb.array([]);

    console.log('points chargements: ',this.data_points_Chargement);


    this.data_points_Chargement?.forEach((chargement: any) => {
      const chargementForm = this.fb.group({
        date: this.fb.control(chargement?.date, [Validators.required]),
        ville: new FormControl(chargement?.ville || chargement.city?.name),
        country: new FormControl(chargement?.country || chargement?.city?.country?.name, [Validators.required]),
        adresse_id: new FormControl(chargement?.adresse_id, [
          Validators.required,
        ]),
        address: new FormControl(chargement?.address || chargement?.adresse?.adress, [Validators.required]),
        city_id: new FormControl(chargement?.city_id, [Validators.required]),
        customer_id: new FormControl(chargement?.customer_id, [
          Validators.required,
        ]),
        //type: new FormControl(null, [Validators.required]),
        details: new FormControl(chargement.details, [Validators.required]),

        type: new FormControl(chargement?.type, [Validators.required]),
        type_palette_chargement: new FormControl(chargement?.type_palette_chargement ||  chargement?.details?.type_palette_chargement , [Validators.required]),
      });
      chargements2.push(chargementForm);
    });
    //set the chargementForm
    this.chargementForm = this.fb.group({
      chargements: chargements2,
    });

    this.destinatairesGroup = this.fb.group({
      destinatairesFormArray: this.fb.array([]),
    });

    for (let i = 0; i < this.myDestinataires?.length; i++) {
      if (!this.data_destinatairesData[i]) {
        console.log('index' + i + 'dosnt exist');

        const envoisForm = this.fb.group({
          id: this.fb.control('', [Validators.required]),
          type_palette: this.fb.control('', [Validators.required]),
          dimension_palette: this.fb.control('', [Validators.required]),
          nbr_palette: this.fb.control(null, [Validators.required]),
          envoiReferences: this.fb.control([]),
        });
        const retoursForm = this.fb.group({
          id: this.fb.control('', []),
          type_palette: this.fb.control('', []),
          dimension_palette: this.fb.control('', []),
          nbr_palette: this.fb.control(null, []),
          retourReferences: this.fb.control([], []),
          retourReferencesAddit: this.fb.control([], []),
        });
        const retourFondsForm = this.fb.group({
          type_retour_fond: this.fb.control('', []),
          montant_fond: this.fb.control(null, []),
        });
        // const retourDocumentsForm = this.fb.group({
        //   facture_references: new FormControl([]),
        //   bl_references: new FormControl([]),
        // });
        const facture_references = new FormControl([]);
        const bl_references = new FormControl([]);
        const gerbageControl = this.fb.control(false, []);
        const retour_fondsControl = this.fb.control(false, []);
        const retour_documentsValue = this.fb.control(false, [
          Validators.required,
        ]);

        const pointsGeoForm = this.fb.group({
          date: this.fb.control(this.minDate, [Validators.required]),
          ville: this.fb.control('', [Validators.required]),
          country: this.fb.control(''),
          adress_decharge: this.fb.control('', [Validators.required]),
          type: this.fb.control(0, [Validators.required]),
          adresse_id: new FormControl(null, [Validators.required]),
          city_id: new FormControl(null, [Validators.required]),
          customer_id: new FormControl(null, [Validators.required]),
          lat: new FormControl(null, [Validators.required]),
          lng: new FormControl(null, [Validators.required]),
          type_palettes: this.fb.control('expediteur', [Validators.required]),
          gerbage: gerbageControl,
          retour_fonds: retour_fondsControl,
          retour_documents: retour_documentsValue,
          envoisFormArray: this.fb.array([envoisForm]),
          retoursFormArray: this.fb.array([retoursForm]),
          retourFondsFormArray: this.fb.array([retourFondsForm]),
          type_factures: this.fb.control('Facture', [Validators.required]),
          type_bls: this.fb.control('BL', [Validators.required]),
          facture_references: facture_references,
          bl_references: bl_references,
            dec_code : new FormControl('')
        });

        this.destinataireForm = this.fb.group({
          pointsGeoArray: this.fb.array([pointsGeoForm]),
        });
        this.destinatairesFormArray.push(this.destinataireForm);
        this.isPanelExpanded.push(true)


        // this.checkedStates.push({
        //   type_palettes: 'expediteur',
        //   retour_fonds: false,
        //   retour_documents: false,
        //   gerbage: false,
        // });
      } else {
        const pointsGeoArray2 = this.fb.array([]);
        const pointsGeoData = this.data_destinatairesData[i]
          .pointsGeoArray  as Array<any> || this.data_destinatairesData[i].points_dechargement as Array<any>;

        console.warn('point GeoArray' , pointsGeoData);

        console.warn('data_destinatairesData ...' , this.data_destinatairesData);

        pointsGeoData?.forEach((p, j) => {
          const envoisFormArray2 = this.fb.array([]);
          const envoisData = p.envoisFormArray as Array<any>  || p.item_envois as Array<any>;
          envoisData?.forEach((e) => {
            const envoiForm = this.fb.group({
              type_palette: this.fb.control(e?.type_palette ?? '', [
                Validators.required,
              ]),
              nbr_palette: this.fb.control(e?.nbr_palette ?? '', [
                Validators.required,
              ]),
              envoiReferences: this.fb.control(e?.envoiReferences || e?.references_envois),
              dimension_palette: this.fb.control(e?.dimension_palette ?? '', [
                Validators.required,
              ]),
              id: this.fb.control(e?.id ?? '', [Validators.required]),
            });
            envoisFormArray2.push(envoiForm);
          });

          const retoursFormArray2 = this.fb.array([]);
          const retoursData = p.retoursFormArray as Array<any> || p.item_retours as Array<any>;
          retoursData?.forEach((r) => {
            const retourForm = this.fb.group({
              type_palette: this.fb.control(r?.type_palette ?? '', [
                Validators.required,
              ]),
              id: this.fb.control(r?.id ?? '', []),
              dimension_palette: this.fb.control(r?.dimension_palette ?? '', [
                ,
              ]),
              nbr_palette: this.fb.control(r?.nbr_palette ?? '', [,]),
              retourReferences: this.fb.control(r?.retourReferences || r?.references_retours, [,]),
              retourReferencesAddit: this.fb.control(
                r?.retourReferencesAddit  || [],
                []
              ),
            });

            retoursFormArray2.push(retourForm);
          });

          const retourFondsFormArray2 = this.fb.array([]);
          const retourFondsData = p.retourFondsFormArray as Array<any> || p.retour_fonds ;
          retourFondsData?.forEach((rf) => {
            const retourFondForm = this.fb.group({
              type_retour_fond: this.fb.control(rf?.type_retour_fond || rf?.type , [
                Validators.required,
              ]),
              montant_fond: this.fb.control(rf?.montant_fond || rf?.montant, [
                Validators.required,
              ]),
            });
            retourFondsFormArray2.push(retourFondForm);
          });

          const type_palettesControl = this.fb.control(p.type_palettes, [
            Validators.required,
          ]);
          const gerbageControl = this.fb.control(p.gerbage, [
            Validators.required,
          ]);
          const retour_fondsControl = this.fb.control(p.retour_fonds, [
            Validators.required,
          ]);
          const retour_documentsControl = this.fb.control(p.retour_documents, [
            Validators.required,
          ]);
          const facture_references2 = new FormControl([]);
          const bl_references2 = new FormControl([]);

          // facture_references2.setValue(p.facture_references);
          // bl_references2.setValue(p.bl_references);

          const factures = facture_references2.value as any[];
          const bls = bl_references2.value as any[];


          if (p?.facture_references) {
            p?.facture_references?.forEach((value: any) => {
              factures.push(value);
            });
          }
          else{
            p?.retour_documents.filter((doc) => doc.type == 'Facture')?.forEach(element => {

              console.warn('element' , element)
              factures.push(...element.references_documents)
            });
            console.warn('factures' , factures)
          }


          if (p?.bl_references) {
            p?.bl_references?.forEach((value) => {
              bls.push(value);
            });
          }
          else{
            p?.retour_documents.filter((doc) => doc.type == 'BL')?.forEach(element => {
              bls.push(...element.references_documents)
            });
          }


          console.warn('geo point' , p)

          const pointGeoForm = this.fb.group({
            adress_decharge: this.fb.control(p?.adress_decharge || p?.adresse, [
              Validators.required,
            ]),

            date: this.fb.control(p?.date ?? '', [Validators.required]),
            ville: new FormControl(p?.ville || p?.city?.name, [Validators.required]),
            country: this.fb.control(p?.country || p?.city?.country?.name),
            adresse_id: new FormControl(p?.adresse_id ?? '', [
              Validators.required,
            ]),
            city_id: new  FormControl(p?.city_id ?? '', [Validators.required]),
            customer_id: new FormControl(p?.customer_id ?? '', [
              Validators.required,
            ]),
            lat: new FormControl(p?.lat ?? '', [Validators.required]),
            lng: new FormControl(p?.lng ?? '', [Validators.required]),
            type: new FormControl(p?.type ?? '', [Validators.required]),
            type_palettes: type_palettesControl,
            gerbage: gerbageControl,
            retour_fonds: retour_fondsControl,
            retour_documents: retour_documentsControl,
            envoisFormArray: envoisFormArray2,
            retoursFormArray: retoursFormArray2,
            retourFondsFormArray: retourFondsFormArray2,
            type_factures: this.fb.control('Facture', [
              Validators.required,
            ]),
            type_bls: this.fb.control('BL', [Validators.required]),
            facture_references: facture_references2,
            bl_references: bl_references2,
            dec_code: new FormControl(p?.dec_code || '')

          });

          pointsGeoArray2.push(pointGeoForm);
        });

        this.destinataireForm = this.fb.group({
          pointsGeoArray: pointsGeoArray2,
        });

        this.destinatairesFormArray.push(this.destinataireForm);
        this.isPanelExpanded.push(true)

        //this.checkedStates.push(this.data_checkedStates[i]);
      }
    }
    console.log('this.checkedStates step', this.checkedStates);

  }

  reservationFormInit() {

    console.log('reservation form init ....')
    // this.marchandiseForm = new FormGroup({
    //   nbr_palettes: new FormControl(0, [
    //     Validators.required,
    //     Validators.min(1),
    //   ]),
    //   poids: new FormControl(0, [Validators.required, Validators.min(1)]),
    //   volume: new FormControl(0, [Validators.required, Validators.min(1)]),
    //   valeur_declare: new FormControl('', [Validators.required]),
    // });

    this.portForm = new FormGroup({
      port_id: new FormControl('', [Validators.required]),
    });
    const servicesFormArray = this.fb.group({
      id: this.fb.control(null, []),
      name: this.fb.control('', []),
      nbr: this.fb.control(null, [Validators.min(0)]),
    });

    const vehiculesFormArray = this.fb.group({
      id: this.fb.control('', [Validators.required]),
      type_camion: this.fb.control('', [Validators.required]),
      tonnage: this.fb.control(null, [Validators.required]),
      poids_vehicule: this.fb.control(null),
    });
    this.vsForm = this.fb.group({
      vehicules: this.fb.array([vehiculesFormArray]),
      services: this.fb.array([servicesFormArray]),
    });

    const chargementFormArray = new FormGroup({
      date: this.fb.control(this.minDate, [Validators.required]),
      ville: new FormControl('', [Validators.required]),
      country: new FormControl(''),
      adresse_id: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      city_id: new FormControl(null, [Validators.required]),
      customer_id: new FormControl(null, [Validators.required]),
      //type: new FormControl(null, [Validators.required]),
      details: new FormControl(null, [Validators.required]),
      lat: new FormControl(null, [Validators.required]),
      lng: new FormControl(null, [Validators.required]),

      type: new FormControl(1, [Validators.required]),
    });
    this.chargementForm = this.fb.group({
      chargements: this.fb.array([chargementFormArray]),
    });

    this.destinatairesGroup = this.fb.group({
      // destinatairesFormArray: this.fb.array([this.destinataireForm]),
      destinatairesFormArray: this.fb.array([]),
    });

    for (let i = 0; i < this.myDestinataires?.length; i++) {
      // const envoisForm = this.fb.group({
      //   id: this.fb.control('', [Validators.required]),
      //   type_palette: this.fb.control('', [Validators.required]),
      //   dimension_palette: this.fb.control('', [Validators.required]),
      //   nbr_palette: this.fb.control(null, [Validators.required]),
      // });
      // const retoursForm = this.fb.group({
      //   id: this.fb.control('', []),
      //   type_palette: this.fb.control('', []),
      //   dimension_palette: this.fb.control('', []),
      //   nbr_palette: this.fb.control(null, []),
      //   retourReferences: this.fb.control([], []),
      //   retourReferencesAddit: this.fb.control([], []),
      // });
      const retourFondsForm = this.fb.group({
        type_retour_fond: this.fb.control('', []),
        montant_fond: this.fb.control(null, []),
      });
      // const retourDocumentsForm = this.fb.group({
      //   facture_references: new FormControl([]),
      //   bl_references: new FormControl([]),
      // });
      const facture_references = new FormControl([]);
      const bl_references = new FormControl([]);
      const gerbageControl = this.fb.control(false, []);
      const retour_fondsControl = this.fb.control(false, []);
      const retour_documentsValue = this.fb.control(false, [
        Validators.required,
      ]);

      const pointsGeoForm = this.fb.group({
        date: this.fb.control(this.minDate, [Validators.required]),
        ville: this.fb.control('', [Validators.required]),
        country: new FormControl(''),
        adress_decharge: this.fb.control('', [Validators.required]),
        type: this.fb.control(0, [Validators.required]),
        adresse_id: new FormControl(null, [Validators.required]),
        city_id: new FormControl(null, [Validators.required]),
        customer_id: new FormControl(null, [Validators.required]),
        lat: new FormControl(null, [Validators.required]),
        lng: new FormControl(null, [Validators.required]),
        type_palettes: this.fb.control('expediteur', [Validators.required]),
        gerbage: gerbageControl,
        retour_fonds: retour_fondsControl,
        retour_documents: retour_documentsValue,
        envoisFormArray: this.fb.array([]),
        retoursFormArray: this.fb.array([]),
        retourFondsFormArray: this.fb.array([retourFondsForm]),
        type_factures: this.fb.control('Facture', [Validators.required]),
        type_bls: this.fb.control('BL', [Validators.required]),
        facture_references: facture_references,
        bl_references: bl_references,
        dec_code : new FormControl('')
      });

      this.destinataireForm = this.fb.group({
        pointsGeoArray: this.fb.array([pointsGeoForm]),
      });
      this.destinatairesFormArray.push(this.destinataireForm);
      this.isPanelExpanded.push(true)
    }

    console.log('this.destinatairesFormArray', this.destinatairesFormArray);
    // this.checkedStates = this.myDestinataires.map(
    //   (e: any) =>
    //     (e = {
    //       type_palettes: 'expediteur',
    //       retour_fonds: false,
    //       retour_documents: false,
    //       gerbage: false,
    //     })
    // );

    //  this.checkedStates = this.myDestinataires.map((row: Array<any>) => {
    //   return row.map(
    //     (e: any) =>
    //       (e = {
    //         type_palettes: 'expediteur',
    //         retour_fonds: false,
    //         retour_documents: false,
    //         gerbage: false,
    //       })
    //   );
    // });

    // console.log('this.checkedStates', this.checkedStates);

    this.marchandiseReservationForm = new FormGroup({});
  }

  // onPaletteChange(event, i) {
  //this syntaxe work but give error cause i try to assign a value to a read-only property of an object.
  //Specifically, you are trying to assign a value to the type_palettes property of the checkedStates[i] object.
  //  this.checkedStates[i].type_palettes = event.value;
  // }

  nbrPaletteGlobalChange(event) {
    const nbrPalettesG = Number(event.target.value.replace(/ /g, ''));

    this.store.dispatch(addNbrPalettesGlobal({ nbrPalettesG: nbrPalettesG }));

    // this.store.dispatch(currentNbrPalettesG({ currentNbrPalettes: undefined }));
    this.store.dispatch(updateNbrPalettesDetailsMarchandiseSuccess());
  }
  poidsGlobalChange(event) {
    const poids = Number(event.target.value);
    this.store.dispatch(addpoidsG({ poidsG: poids }));
    const postDataVehicule = {
      date_debut: this.dateReservation.date_debut,
      date_fin: this.dateReservation.date_fin,
      poids: poids,
    };

    /* this.vehiculeService
      .getListVehiculesAffretement(postDataVehicule)
      .subscribe((data) => {
        console.log('data véhicule :', data);
        this.vehiculesReservation = data.response;
        this.vehiculesReservation?.length > 0
          ? (this.vehiculeSpinner = false)
          : (this.vehiculeSpinner = true);
      });*/
  }
  volumeGlobalChange(event) {
    const volume = Number(event.target.value);

    this.store.dispatch(addvolumeG({ volumeG: volume }));
  }
  valeurDeclareGlobalChange(event) {
    const valeur_declare = Number(event.target.value.replace(/ /g, ''));

    this.store.dispatch(addValeurDeclareG({ valeurDeclareG: valeur_declare }));
  }

  envoiPaletteChange(palette: any, i: number, j: number, k: number) {
    //this.envoiPaletteSelectedDimension = palette.dimension as string;

    const envoiformGroup = this.destinatairesFormArrayEnvoisArray(i, j).at(
      k
    ) as FormGroup;

    //set the dimension implicite
    envoiformGroup.controls['dimension_palette'].setValue(
      palette.dimension as string
    );
    envoiformGroup.controls['id'].setValue(palette.id as number);
  }

  retourPaletteChange(palette: any, i: number, j: number, k: number) {
    const retourformGroup = this.destinatairesFormArrayRetoursArray(i, j).at(
      k
    ) as FormGroup;

    //set the dimension implicite
    retourformGroup.controls['dimension_palette']?.setValue(
      palette.dimension as string
    );
    retourformGroup.controls['id']?.setValue(palette.id as number);
    retourformGroup.controls['type_palette']?.setValue(palette.title as string);
    console.warn('palette change ..', retourformGroup);
  }

  // getPalettes(destIndex, geoPointIndex) {
  //   let available_types = this.palettes;

  //   let retoursFormArray = this.destinatairesFormArrayRetoursArray(
  //     destIndex,
  //     geoPointIndex
  //   );

  //   console.log('retoursFormArray', retoursFormArray);

  //   for (const retour of retoursFormArray.controls) {
  //     const typePalette = retour.get('type_palette')?.value as string;

  //     available_types = available_types.map((a) => {
  //       if (a.type === typePalette) {
  //         a.s;
  //         return { ...a, disabled: true };
  //       } else {
  //         return a;
  //       }
  //     });
  //   }

  //   // console.log('available_types', available_types);
  //   return available_types;
  // }

  // checkExistingPaletteType(type: string): boolean {
  //   // Assuming `destinatairesGroup` contains the existing palettes

  //   return false;
  // }
  onPaletteChange() {
    console.log('in change palette');
    /* const newState = {
      ...this.checkedStates[i][j],
      type_palettes: event.value,
    };
    this.checkedStates[i][j] = newState;*/
  }

  onGerbageChange(event, i, j) {
    console.log(event, i, j);
    /* const newState = {
      ...this.checkedStates[i][j],
      gerbage: event,
    };
    this.checkedStates[i][j] = newState;*/
  }
  onRetourFondsChange(event, i, j) {
    console.log(event, i, j);
    /* const newState = {
      ...this.checkedStates[i],
      retour_fonds: event,
    };
    this.checkedStates[i] = newState;*/
  }

  onRetourDocumentsChange(checked: boolean, i: number, j: number) {
    console.log(checked, i, j);
    /* const newState = {
      ...this.checkedStates[i],
      retour_documents: checked,
    };
    this.checkedStates[i] = newState;*/
  }

  onVehiculeChange(vehicule, i) {
    console.log('vehiculeChange', vehicule);
    const vehiculeform = this.vehicules.at(i) as FormGroup;
    vehiculeform.controls['type_camion'].setValue(vehicule.name);
    // console.log('this.tonnageVehicules', this.tonnageVehicules);
    // vehiculeform.controls['tonnage'].setValue(vehicule.tonnage);
    // vehiculeform.controls['poids_vehicule'].setValue(vehicule.capacite_consommation);
    vehiculeform.controls['id'].setValue(vehicule.id);
    // vehiculeform.controls['type_camion'].setValue(vehicule.type_camion);

    console.log(vehiculeform);
  }

  filterCategorieProducts(i: number) {
    return this.vehiculesReservation?.filter(
      (item: any) => item.id === this.vehicules?.value[i].id
    );
  }

  updateTonnageVehicules(i: number): number[] {
    const vehicule = this.vehiculesReservation?.find(
      (item: any) => item?.id === this?.vehicules?.value[i]?.id
    );


    console.log('cars ' , vehicule)

    return vehicule ? vehicule.tonnages : [];
  }


  tonnageByVehicule(type: string): number[] {

    const vehicule = this.vehiculesReservation?.find(
      (item: any) => item?.name === type
    );


    return vehicule ? vehicule.tonnages : [];
  }
  onVehiculeChangee(id, i) {
    console.log('onVehiculeChange', id, i);
    const selectedVehicule = this.vehiculesReservation?.find((e) => (e.id = id));
    console.log('selectedVehicule', selectedVehicule);
    const vehiculeform = this.vehicules.at(i) as FormGroup;
    vehiculeform.patchValue({
      type_camion: selectedVehicule.truck_type.name,
      tonnage: selectedVehicule.tonnage.name,
      poids_vehicule: selectedVehicule.capacite_consommation,
    });
  }

  onServiceChange(service, i) {
    console.log('service ', service);
    const serviceform = this.services.at(i) as FormGroup;
    serviceform.controls['id'].setValue(service.id);
    // serviceform.controls['name'].setValue(service.name);
    console.log('serviceform ', serviceform);

    console.log(this.services.value);
  }

  onAddressChange(address, i) {
    console.log('onAddressChange parent', address);
    console.log('position of child in parent', i);

    const addresschange = this.chargements.at(i);
    addresschange.patchValue(address);
  }

  onAddressdechargeChange(address, i, j) {
    const destformGroup = this.destinatairesFormArray.at(i) as FormGroup;
    const pointGeoArray = destformGroup.controls['pointsGeoArray'] as FormArray;
    const decharhgeformGroup = pointGeoArray.at(j) as FormGroup;

    //set the formgroup
    decharhgeformGroup.patchValue(address);
    console.log('onAddressdechargeChange parent', address);
    console.log('position', i, j);
    console.log(decharhgeformGroup);
  }

  @ViewChildren(SelectChargementComponent)
  selectChargementComponents: QueryList<SelectChargementComponent>;
  // ngAfterViewInit is used in case if we use spinner in component child to get addresses api else use only ngoninit
  @ViewChildren(SelectDechargementComponent)
  selectDechargementComponents: QueryList<SelectDechargementComponent>;

  ngAfterViewInit() {
    if (this.selectChargementComponents.length > 0) {
      console.warn('length is bigger than 0 .. ' )
      for (let i = 0; i < this.data_points_Chargement?.length; i++) {
        console.warn('selectChargementComponent before' , this.selectChargementComponents.get(i).addressChange )

        this.selectChargementComponents.get(i).addressChange =
          this.data_points_Chargement[i];
          console.warn('selectChargementComponent after' , this.selectChargementComponents.get(i).addressChange )
        }
    }

    const addressDechargementList = [];

    if (this.data_destinatairesData) {
      this.data_destinatairesData.forEach((item) => {
        if (item.pointsGeoArray) {
          item.pointsGeoArray.forEach((point) => {
            addressDechargementList.push(point);
          });
        }
        else{
          item.points_dechargement.forEach((point) => {
            console.warn('point ' , point)
            addressDechargementList.push(point);
          });

        }
      });
    }
    console.log('addressDechargementList', addressDechargementList);

    if (this.selectDechargementComponents.length > 0) {
      for (let i = 0; i < addressDechargementList?.length; i++) {
        this.selectDechargementComponents.get(i).addressChange =
          addressDechargementList[i];
      }
      /* this.data_destinatairesData.forEach((e) => {
        const pointDechargeArray = this.data_destinatairesData[0]
          .pointsGeoArray as Array<any>;
        let j = 0;
        pointDechargeArray.forEach((pd: any) => {
          console.log(j, pd);
          componentsArray[j].addressChange = pd;
          j = j + 1;
        });
      });*/
    }
    console.log(
      'this.selectDechargementComponents',
      this.selectDechargementComponents
    );

    // Trigger change detection manually  ==> this.cdr.detectChanges(); ==> optionnel i can remove it
    // if selectChargementComponents detecte change this subscribe willl be notified
    //this.selectChargementComponents.changes.subscribe((data) => {
    // console.log('changes data ', data);
    //      Retrieve the lost data here
    // });
  }

  onCitiesChange(city, i) {
    console.log('onCitiesChange', city);
    const citychange = this.chargements.at(i);
    citychange.patchValue(city);
  }

  addchargement() {
    if (this.nbrPalettesState.nbrPalettesG > 0) {
      const chargementForm = new FormGroup({
        date: this.fb.control(this.minDate, [Validators.required]),
        ville: new FormControl('', [Validators.required]),
        country: new FormControl(''),
        adresse_id: new FormControl(null, [Validators.required]),
        address: new FormControl(null, [Validators.required]),
        city_id: new FormControl(null, [Validators.required]),
        customer_id: new FormControl(null, [Validators.required]),
        lat: new FormControl(null, [Validators.required]),
        lng: new FormControl(null, [Validators.required]),
        type_palette_chargement: new FormControl('', [Validators.required]),

        //type: new FormControl(null, [Validators.required]),
        //type for test
        type: new FormControl(1, [Validators.required]),
        details: new FormControl(null, [Validators.required]),
      });
      this.chargements.push(chargementForm);
    }
  }

  addService() {
    const serviceForm = new FormGroup({
      id: this.fb.control(null, []),
      name: this.fb.control('', []),
      nbr: this.fb.control(null, [Validators.min(0)]),
    });
    this.services.push(serviceForm);
  }

  addVehicule() {
    const vehiculeForm = this.fb.group({
      id: this.fb.control('', [Validators.required]),
      type_camion: this.fb.control('', [Validators.required]),
      tonnage: this.fb.control('', [Validators.required]),
      poids_vehicule: this.fb.control(null, ),
    });
    this.vehicules.push(vehiculeForm);

    console.log('vehicules value' , this.vehicules.value )
  }

  addDechargement(index: any) {
    console.log('destinataire : ', index);
    const pointsGeoF = this.destinatairesGroup.get(
      `destinatairesFormArray.${index}.pointsGeoArray`
    ) as FormArray;

    const retourFondsForm = this.fb.group({
      type_retour_fond: this.fb.control('', []),
      montant_fond: this.fb.control(null, []),
    });

    const facture_references = new FormControl([]);
    const bl_references = new FormControl([]);
    const gerbageControl = this.fb.control(false, []);
    const retour_fondsControl = this.fb.control(false, []);
    const retour_documentsValue = this.fb.control(false, [Validators.required]);


    this.pointGeoForm = new FormGroup({
      date: this.fb.control(this.minDate, [Validators.required]),
      ville: this.fb.control('', [Validators.required]),
      country: new FormControl(''),
      adress_decharge: this.fb.control('', [Validators.required]),
      type: this.fb.control(0, [Validators.required]),
      adresse_id: new FormControl(null, [Validators.required]),
      city_id: new FormControl(null, [Validators.required]),
      customer_id: new FormControl(null, [Validators.required]),
      lat: new FormControl(null, [Validators.required]),
      lng: new FormControl(null, [Validators.required]),
      type_palettes: this.fb.control('expediteur', [Validators.required]),
      gerbage: gerbageControl,
      retour_fonds: retour_fondsControl,
      retour_documents: retour_documentsValue,
      envoisFormArray: this.fb.array([]),
      retoursFormArray: this.fb.array([]),
      retourFondsFormArray: this.fb.array([retourFondsForm]),
      type_factures: this.fb.control('Facture', [Validators.required]),
      type_bls: this.fb.control('BL', [Validators.required]),
      facture_references: facture_references,
      bl_references: bl_references,
    });

    console.log(' pointsGeoF Array length before =>', pointsGeoF.length);
    pointsGeoF.push(this.pointGeoForm);
    console.log(
      ' this.destinatairesFormArray =>',
      this.destinatairesFormArray.value
    );
    console.log(' pointsGeoF Array length after =>', pointsGeoF.length);
    console.log(' pointsGeoF Array item after =>', pointsGeoF.value);
  }

  addRetour(i: any, j: any, palette: any) {
    console.log('palette', palette);
    let retoursFormArray = this.destinatairesFormArrayRetoursArray(i, j);

    console.log('retoursFormArray before', retoursFormArray);

    for (const retour of retoursFormArray.controls) {
      const typePalette = retour.get('type_palette')?.value as string;
      if (typePalette == palette.title) {
        this._toast.warn('type de palette déjà sélectionné');
        return;
      }
    }
    const retourForm = new FormGroup({
      id: this.fb.control(palette.id, []),
      type_palette: this.fb.control(palette.title, []),
      dimension_palette: this.fb.control(palette.dimension, []),
      nbr_palette: this.fb.control(null, []),
      retourReferences: this.fb.control([], []),
      retourReferencesAddit: this.fb.control([], []),
    });
    this.destinatairesFormArrayRetoursArray(i, j).push(retourForm);

    const validSupportsRetour = {
      palettes_retour: {},
      palettes_additionel: {},
    };

    let indexRetour = retoursFormArray.length - 1;

    this.store.dispatch(
      addRetourData({
        retour: validSupportsRetour,
        indexDestinataire: i,
        indexDechargement: j,
        indexRetour: indexRetour,
      })
    );
  }

  addEnvoi(i: any, j: any, palette: any) {
    console.log('in add envoi', palette);

    console.log(' i j ', i, j);

    let envoiFromArray = this.destinatairesFormArrayEnvoisArray(i, j);

    console.log('envoiFromArray before', envoiFromArray);

    for (const retour of envoiFromArray.controls) {
      const typePalette = retour.get('type_palette')?.value as string;

      if (typePalette == palette.title) {
        this._toast.warn('type de palette déjà sélectionné');
        return;
      }
    }
    // if (this.totalPalettesEnvoi > 0) {
    const envoiForm = new FormGroup({
      id: this.fb.control(palette.id, [Validators.required]),
      type_palette: this.fb.control(palette.title, [Validators.required]),
      nbr_palette: this.fb.control(null, [Validators.required]),
      envoiReferences: this.fb.control([],),
      dimension_palette: this.fb.control(palette.dimension, [
        Validators.required,
      ]),
    });
    this.destinatairesFormArrayEnvoisArray(i, j).push(envoiForm);

    const envoi: any = {
      idPalette: palette.id,
      type_palette: palette.title,
      nbrPalettes: null,
      references: [],
    };

    let indexEnvoi = envoiFromArray.length - 1;
    console.log('index envoi', indexEnvoi);
    this.store.dispatch(
      addEnvoiData({
        envoi: envoi,
        indexDestinataire: i,
        indexDechargement: j,
        indexEnvoi: indexEnvoi,
      })
    );

    console.log('envoiFromArray after', envoiFromArray);

    // }
  }

  addRetourFond(i: any, j: any) {
    const retourFondForm = new FormGroup({
      type_retour_fond: this.fb.control('', []),
      montant_fond: this.fb.control(null, []),
    });
    this.destinatairesFormArrayretourFondsFormArray(i, j).push(retourFondForm);
  }

  get chargements() {
    return this.chargementForm.controls['chargements'] as FormArray;
  }

  get services() {
    return this.vsForm.controls['services'] as FormArray;
  }

  get vehicules() {
    return this.vsForm.controls['vehicules'] as FormArray;
  }

  get destinatairesFormArray() {
    return this.destinatairesGroup.controls[
      'destinatairesFormArray'
    ] as FormArray;
  }

  destinatairesFormArrayPointsGeoArray(index) {
    return this.destinatairesGroup.get(
      `destinatairesFormArray.${index}.pointsGeoArray`
    ) as FormArray;

    // return this.destinatairesFormArray
    //  .at(index)
    //  .get('pointsGeoArray') as FormArray;
  }

  destinatairesFormArrayEnvoisArray(i, j) {
    return this.destinatairesGroup.get(
      `destinatairesFormArray.${i}.pointsGeoArray.${j}.envoisFormArray`
    ) as FormArray;
  }

  pointDechargementFormControlTypePalettes(i, j) {
    return this.destinatairesGroup.get(
      `destinatairesFormArray.${i}.pointsGeoArray.${j}.type_palettes`
    ) as FormControl;
  }

  destinatairesFormArrayRetoursArray(i, j) {
    return this.destinatairesGroup.get(
      `destinatairesFormArray.${i}.pointsGeoArray.${j}.retoursFormArray`
    ) as FormArray;
  }

  destinatairesFormArrayretourFondsFormArray(i, j) {
    return this.destinatairesGroup.get(
      `destinatairesFormArray.${i}.pointsGeoArray.${j}.retourFondsFormArray`
    ) as FormArray;
  }

  destinatairesFormArrayretourDocumentsFormArray(i, j) {
    return this.destinatairesGroup.get(
      `destinatairesFormArray.${i}.pointsGeoArray.${j}.retourDocumentsFormArray`
    ) as FormArray;
  }

  destinatairesFormArrayRetour_documents(index) {
    return this.destinatairesGroup.get(
      `destinatairesFormArray.${index}.retour_documents`
    ) as FormControl;
  }

  destinatairesFormArrayRetour_fonds(index) {
    return this.destinatairesGroup.get(
      `destinatairesFormArray.${index}.retour_fonds`
    ) as FormControl;
  }

  destinatairesFormArrayGerbage(index) {
    return this.destinatairesGroup.get(
      `destinatairesFormArray.${index}.gerbage`
    ) as FormControl;
  }

  get pointsGeoArray() {
    return this.destinataireForm.controls['pointsGeoArray'] as FormArray;
  }
  get envoisFormArray() {
    return this.destinataireForm.controls['envoisFormArray'] as FormArray;
  }
  get retoursFormArray() {
    return this.destinataireForm.controls['retoursFormArray'] as FormArray;
  }
  get retourFondsFormArray() {
    return this.destinataireForm.controls['retourFondsFormArray'] as FormArray;
  }

  deleteChargement(i) {
    Swal.fire({
      text: 'Êtes-vous sûr(e) de vouloir supprimer ce point de chargement ?',
      icon: 'warning',
      iconColor: 'yellow',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'green',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        const chargementForm = this.chargements.at(i) as FormGroup;
        const details = chargementForm.controls['details'].value as any;
        const nbr_palette = Number(
          details?.nbr_palettes > 0 ? details.nbr_palettes : 0
        );
        // restore nbr palettes & poids in the store
        const poids = Number(details?.poids > 0 ? details.poids : 0);
        this.store.dispatch(restoreNbrPalettesG({ nbrPalettesG: nbr_palette }));
        this.store.dispatch(restorePoidsG({ poidsG: poids }));
        //delete chargement item from the formArray
        this.chargements.removeAt(i);
        //dispatch action to delete detailmarchandise item from store
        this.store.dispatch(deleteDetailsMarchandiseSuccess({ position: i }));
        console.log('point chargement form deleted !');

        //dispatch action to delete point chargement item from store
        if (
          this.data_points_Chargement &&
          this.data_points_Chargement[i] !== undefined
        ) {
          this.store.dispatch(deletePointChargementSuccess({ position: i }));
          console.log('point chargement store deleted !');
        }
      }
    });
  }

  deleteService(i) {
    Swal.fire({
      text: 'Êtes-vous sûr(e) de vouloir supprimer ce service ?',
      icon: 'warning',
      iconColor: 'yellow',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'green',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.services.removeAt(i);
        console.log('service form deleted !');

        if (this.data_services && this.data_services[i] !== undefined) {
          this.store.dispatch(deleteServiceSuccess({ position: i }));
          console.log('service store deleted !');
        }
      }
    });
  }

  deleteVehicule(i) {
    Swal.fire({
      text: 'Êtes-vous sûr(e) de vouloir supprimer ce vehicule ?',
      icon: 'warning',
      iconColor: 'yellow',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'green',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.vehicules.removeAt(i);
        console.log('vehicule form deleted !');
        if (this.data_vehicules && this.data_vehicules[i] !== undefined) {
          this.store.dispatch(deleteVehiculeSuccess({ position: i }));
          console.log('vehicule store deleted !');
        }
      }
    });
  }

  deleteDechargement(i: any, j: any) {
    const pointsGeo = this.destinatairesGroup.get(
      `destinatairesFormArray.${i}.pointsGeoArray`
    ) as FormArray;

    Swal.fire({
      text: 'Êtes-vous sûr(e) de vouloir supprimer ce point déchargement ?',
      icon: 'warning',
      iconColor: 'yellow',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'green',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        pointsGeo.removeAt(j);
        console.log('dechargement form deleted !');

        if (
          this.data_destinatairesData &&
          this.data_destinatairesData[i] &&
          this.data_destinatairesData[i].pointsGeoArray[j]
        ) {
          this.store.dispatch(
            deletePointDechargementSuccess({
              indexDestinataire: i,
              indexAddress: j,
            })
          );
          console.log('dechargement store deleted !');
        }
      }
    });
  }

  deleteEnvoi(i: any, j: any, k: any, palette: any) {
    const envoiDataArray: any[][][] = Object.values(this.envoiData).map(
      (outerObj) =>
        Object.values(outerObj).map((innerObj) => Object.values(innerObj))
    );
    const retourDataArray: any[][][] = Object.values(this.retourData).map(
      (outerObj) =>
        Object.values(outerObj).map((innerObj) => Object.values(innerObj))
    );

    const envois = this.destinatairesGroup.get(
      `destinatairesFormArray.${i}.pointsGeoArray.${j}.envoisFormArray`
    ) as FormArray;
    const retours = this.destinatairesGroup.get(
      `destinatairesFormArray.${i}.pointsGeoArray.${j}.retoursFormArray`
    ) as FormArray;

    console.log('palette.title', palette);
    console.log('retours..', retours);

    Swal.fire({
      text: 'Êtes-vous sûr(e) de vouloir supprimer cet envoi ?',
      icon: 'warning',
      iconColor: 'yellow',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'green',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        envois.removeAt(k);

        // console.log('retours at k', retours.at(k));
        if (
          envoiDataArray &&
          envoiDataArray[i] &&
          envoiDataArray[i][j] &&
          envoiDataArray[i][j][k]
        ) {
          const obj = envoiDataArray[i][j][k];

          obj?.nbrPalettes > 0
            ? this.store.dispatch(
                restoreTotalPalettesEnvoi({ nbrPalettes: obj.nbrPalettes })
              )
            : '';
          // if (
          //   this.data_destinatairesData &&
          //   this.data_destinatairesData[i] &&
          //   this.data_destinatairesData[i].envoisFormArray[j]
          // ) {

          this.store.dispatch(
            deleteEnvoiSuccess({
              indexDestinataire: i,
              indexDechargement: j,
              indexEnvoi: k,
            })
          );
          console.log('envoi palettes store deleted !');
        }

        let indexRetour = 0;

        for (const retour of retours.controls) {
          const typePalette = retour.get('type_palette')?.value as string;
          if (typePalette == palette.type_palette) {
            console.log('in condition..');

            console.warn('index retour ', indexRetour);

            console.log('retour from group palette', retour);

            if (retour.get('retourReferencesAddit').value.length > 0) {
              retour.get('retourReferences').setValue([]);

              this.store.dispatch(
                deleteRetourSuccess({
                  indexDestinataire: i,
                  indexDechargement: j,
                  indexRetour: indexRetour,
                  deleteAll: false,
                })
              );
              console.log('retour palettes store deleted not all !');
            } else {
              retours.removeAt(indexRetour);

              console.log('index retour ', indexRetour);

              this.store.dispatch(
                deleteRetourSuccess({
                  indexDestinataire: i,
                  indexDechargement: j,
                  indexRetour: indexRetour,
                })
              );
              console.log('retour palettes store deleted !');
            }
          }
          indexRetour++;
        }
      }
    });
  }

  deleteRetour(i: any, j: any, k: any) {
    const retours = this.destinatairesGroup.get(
      `destinatairesFormArray.${i}.pointsGeoArray.${j}.retoursFormArray`
    ) as FormArray;

    const retourDataArray: any[][][] = Object.values(this.retourData).map(
      (outerObj) =>
        Object.values(outerObj).map((innerObj) => Object.values(innerObj))
    );

    Swal.fire({
      text: 'Êtes-vous sûr(e) de vouloir supprimer ce retour ?',
      icon: 'warning',
      iconColor: 'yellow',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'green',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        retours.removeAt(k);
        console.log('retour palettes form deleted !');

        if (
          retourDataArray &&
          retourDataArray[i] &&
          retourDataArray[i][j] &&
          retourDataArray[i][j][k]
        ) {
          this.store.dispatch(
            deleteRetourSuccess({
              indexDestinataire: i,
              indexDechargement: j,
              indexRetour: k,
            })
          );
          console.log('retour palettes store deleted !');
        }
      }
    });
  }

  deleteRetourFond(i: any, j: any, k: any) {
    const retourFonds = this.destinatairesGroup.get(
      `destinatairesFormArray.${i}.pointsGeoArray.${j}.retourFondsFormArray`
    ) as FormArray;

    Swal.fire({
      text: 'Êtes-vous sûr(e) de vouloir supprimer ce Retour de Fond ?',
      icon: 'warning',
      iconColor: 'yellow',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'green',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        retourFonds.removeAt(k);
        console.log('retour fonds form deleted !');
        //remove from the store
      }
    });
  }

  deleteRetourDocumenttest(i: any, j: any) {
    const retourFonds = this.destinatairesGroup.get(
      `destinatairesFormArray.${i}.retourFondsFormArray`
    ) as FormArray;
    retourFonds.removeAt(j);
  }

  addRetourDocument(
    event: MatChipInputEvent,
    type: string,
    i: number,
    j: number
  ): void {
    const input = event.input;
    const value = event.value;

    const references = this.getReferences(type, i, j) as string[]; //
    console.log('references .... ', references);
    if ((value || '').trim()) {
      // add only if it does not already exist
      if (references.findIndex((x) => x === value) === -1) {
        references?.push(value.trim());
      } else {
        this._toast.warn('Référence dupliquée !');
      }
    }
    if (input) {
      input.value = '';
    }
  }

  deleteRetourDocument(
    reference: string,
    type: string,
    i: number,
    j: number
  ): void {
    console.log(reference);
    const references = this.getReferences(type, i, j);
    const filteredReferences: any = references.filter(
      (e: string) => e !== reference
    );
    this.setReferences(filteredReferences, type, i, j);
    console.log(this.getReferences(type, i, j));
  }

  setReferences(
    references: string[],
    type: string,
    i: number,
    j: number
  ): void {
    const pointDechargementArray = this.destinatairesGroup.get(
      `destinatairesFormArray.${i}.pointsGeoArray`
    ) as FormArray;
    const pointDechargement = pointDechargementArray.at(j) as FormGroup;

    if (type === 'Facture') {
      pointDechargement.controls['facture_references'].setValue(references);
    } else if (type === 'BL') {
      pointDechargement.controls['bl_references'].setValue(references);
    }
  }

  getReferences(type: string, i: number, j: number) {
    const pointDechargementArray = this.destinatairesGroup.get(
      `destinatairesFormArray.${i}.pointsGeoArray`
    ) as FormArray;
    const pointDechargement = pointDechargementArray.at(j) as FormGroup;
    const factures = pointDechargement.controls['facture_references']
      .value as any[];
    const bls = pointDechargement.controls['bl_references'].value as any[];

    if (type === 'Facture') {
      return factures;
    } else if (type === 'BL') {
      return bls;
    } else {
      return [];
    }
  }

  goNext() {
    this.stepNextEvent.emit(this.step);
  }

  goBack() {
    this.stepBackEvent.emit(this.step);
    this.store.dispatch(
      getCurrentStepSuccess({ currentStep: this.step - 1, edit_mode: true })
    );
    this.store.dispatch(
      getMarchandiseSuccess({
        marchandise: {
          nbr_palettes: this.nbrPalettesG,
          poids: this.poidsGlobal,
          volume: this.volumeG,
          valeur_declare: this.valeurDeclareG,
        },
      })    );
    this.store.dispatch(
      getPointChargementSuccess({
        point_Chargement: this.chargementForm.value.chargements,
      })
    );

    console.log(' port form', this.portForm.value);
    this.store.dispatch(
      getModePortSuccess({ modePort: this.portForm.value.port_id })
    );
    this.store.dispatch(
      getVehiculeServicesSuccess({ vehicule_services: this.vsForm.value })
    );
    const destinataire_infosData = {
      destinatairesData: this.destinatairesGroup.value.destinatairesFormArray,
      checkedStates: this.checkedStates,
    };
    this.store.dispatch(
      getDestinataireInfosSuccess({
        destinataire_infos: destinataire_infosData,
      })
    );
  }

  generateRealNumberSequence(x: number, y: number): number[] {
    // const sequence: number[][] = [];

    for (let i = 1; i <= x; i++) {
      const remainder = x % i;
      const quotient = Math.floor(x / i);
      if (remainder === 0 && quotient <= y) {
        //case1
        console.log('case1');
        const sequence = new Array(quotient).fill(i);
        return sequence;
      } else if (remainder !== 0 && quotient < y) {
        //case2
        console.log('case2');
        const sequence = new Array(quotient).fill(i);
        sequence.push(remainder);
        return sequence;
      }
    }
  }

  // defaultPalettesNumber(i: number): number {
  //   const nbr_palettes_global =
  //   const nbr_point_charg = this.chargements.length;

  //   /*  let defaultNumber: any =
  //     nbr_palettes_global % nbr_point_charg === 0
  //       ? nbr_palettes_global / nbr_point_charg
  //       : Math.floor(nbr_palettes_global / nbr_point_charg);*/

  //   const sequence: any[] = this.generateRealNumberSequence(
  //     nbr_palettes_global,
  //     nbr_point_charg
  //   );

  //   let defaultNumber: any = sequence[i];

  //   return defaultNumber;
  // }

  nbrPalttesGlobal: any;
  detailsmarchandise(index: any): void {
    const address = this.chargements.at(index).get('address').value as string;



    if (address === null || undefined) {
      this._toast.warn('Veuillez séléctionner une addresse de chargement !');
    } else {
      this.store.select(SelectNbrPalttesGReservation).subscribe((data) => {
        this.nbrPalttesGlobal = data.nbrPalettesG;
      });

      const dialogRef = this.dialog.open(DetailMarchandiseComponent, {
        width: '800px',
        disableClose: true,
        data: {
          detailsmarchandiseIndex: index,
          addressChargement: address,
        },
      });

      dialogRef.afterClosed().subscribe((data: any) => {
        console.log('OUTPUT details', data);
        if (typeof data === 'object') {
          const chargementForm = this.chargements.at(index) as FormGroup;
          const details = chargementForm.controls['details'] as FormControl;
          details.setValue(data);
          console.log(this.chargements.value);
          // this.myform.get('location').setValue(output.address);
        }
      });
    }
  }
  mapmarchandise(): void {
    this.dialog.open(MapMarchandiseComponent, {
      width: '1000px',
      data: {},
    });
  }

  Visualiserenvoi(i: any, j: any, k: any): void {
    if (Object.keys(this.envoiData).length > 0) {
      const dialogRef = this.dialog.open(VisualiserEnvoiComponent, {
        width: '429px',
        data: { i: i, j: j, k: k },
      });
      dialogRef.afterClosed().subscribe((data) => {
        console.log(data);
      });
    } else {
      this._toast.info('Aucune référence à visualiser !');
    }
  }
  Visualiserretour(i: any, j: any, k: any): void {
    if (Object.keys(this.retourData).length > 0) {
      const dialogRef = this.dialog.open(VisualiserRetourComponent, {
        width: '884px',
        data: { i: i, j: j, k: k },
      });
      dialogRef.afterClosed().subscribe((data) => {
        console.log(data);
      });
    } else {
      this._toast.info('Aucune référence à visualiser !');
    }
  }

  handleInputChange(event, i, j, k) {
    console.log('Event value change', event);
    let sum = 0;
    // const destinatairesFormArray = this.destinatairesGroup.get(
    //   'destinatairesFormArray'
    // ) as FormArray;

    // destinatairesFormArray.controls.forEach((destinataireForm) => {
    //   const pointsGeoArray = destinataireForm.get(
    //     'pointsGeoArray'
    //   ) as FormArray;

    //   pointsGeoArray.controls.forEach((pointGeo) => {
    //     const envoisFormArray = pointGeo.get('envoisFormArray') as FormArray;

    //     envoisFormArray.controls.forEach((envoi: AbstractControl) => {
    //       if (envoi instanceof FormGroup) {
    //         const nbrPaletteControl = envoi.get('nbr_palette');
    //         if (nbrPaletteControl && nbrPaletteControl.value) {
    //           sum += Number(nbrPaletteControl.value);
    //         }
    //       }
    //     });
    //   });
    // });

    // console.log('sum nbr palette change : ', sum);

    // const nbrPalettesTotal =
    //   this.marchandiseForm.controls['nbr_palettes'].value;

    // if (sum >= Number(nbrPalettesTotal)) {
    //   const startIndex = i + 1;
    //   const endIndex = destinatairesFormArray.length;
    //   console.log(startIndex);
    //   console.log(endIndex);

    //   for (let i = startIndex; i < endIndex; i++) {
    //     const destinataireForm = destinatairesFormArray.at(i) as FormGroup;
    //     const pointsGeoArray = destinataireForm.get(
    //       'pointsGeoArray'
    //     ) as FormArray;

    //     pointsGeoArray.controls.forEach((pointGeo) => {
    //       const envoisFormArray = pointGeo.get('envoisFormArray') as FormArray;
    //       const retoursFormArray = pointGeo.get(
    //         'retoursFormArray'
    //       ) as FormArray;

    //       envoisFormArray.clear();
    //       // retoursFormArray.clear();

    //       envoisFormArray.push(this.createMessageFormGroup());
    //     });
    //   }
    // } else {
    //   const startIndex = i + 1;
    //   const endIndex = destinatairesFormArray.length;

    //   for (let i = startIndex; i < endIndex; i++) {
    //     const destinataireForm = destinatairesFormArray.at(i) as FormGroup;
    //     const pointsGeoArray = destinataireForm.get(
    //       'pointsGeoArray'
    //     ) as FormArray;

    //     pointsGeoArray.controls.forEach((pointGeo) => {
    //       const envoisFormArray = pointGeo.get('envoisFormArray') as FormArray;

    //       envoisFormArray.clear();

    //       const envoisForm = this.fb.group({
    //         id: this.fb.control('', [Validators.required]),
    //         type_palette: this.fb.control('', [Validators.required]),
    //         dimension_palette: this.fb.control('', [Validators.required]),
    //         nbr_palette: this.fb.control(null, [Validators.required]),
    //         envoiReferences: this.fb.control([], [Validators.required]),
    //       });
    //       envoisFormArray.push(envoisForm);
    //     });
    //   }
    // }

    // // get the new value
    // const envoiformGroup = this.destinatairesFormArrayEnvoisArray(i, j).at(
    //   k
    // ) as FormGroup;

    // const nbrPalettesNew = envoiformGroup.get('nbr_palette').value;
    // // update nbrpalettes store after value changes

    // console.log('the current value: ', this.totalPalettesEnvoi);

    // //trigger the change methode
    // //this.triggerChange(i, j, k);
  }

  triggerChange(i, j, k) {
    // Create a subject to manually trigger initial value
    const initialValueSubject = new Subject<any>();

    const envoiformGroup = this.destinatairesFormArrayEnvoisArray(i, j).at(
      k
    ) as FormGroup;

    const nbr_paletteControl = envoiformGroup.get('nbr_palette');
    let previousValue = nbr_paletteControl.value;

    const nbr_palettes_parType_test = nbr_paletteControl.valueChanges
      .pipe(startWith(nbr_paletteControl.value), takeUntil(initialValueSubject))
      .subscribe((currentValue) => {
        console.log('Previous value:', Number(previousValue));
        console.log('Current value:', Number(currentValue));
        // previousValue = currentValue;
      });

    // Trigger the initial value manually
    initialValueSubject.next();
  }

  createMessageFormGroup(): FormGroup {
    return this.fb.group({
      message: ['0 palettes disponibles !'],
    });
  }

  openEnvoiDialogsupport(i: any, j: any, k: any): void {
    const nbrPalettesTotal = this.nbrPalttesGlobal;

    const destinatairesFormArray = this.destinatairesGroup.get(
      'destinatairesFormArray'
    ) as FormArray;
    let sumCurrentTotalPalettes = 0;

    destinatairesFormArray.controls.forEach((destinataireGroup: FormGroup) => {
      const pointsGeoArray = destinataireGroup.get(
        'pointsGeoArray'
      ) as FormArray;

      pointsGeoArray.controls.forEach((pointGroup: FormGroup) => {
        const envoisFormArray = pointGroup.get('envoisFormArray') as FormArray;
        const envoisArray = envoisFormArray.value as Array<any>;

        envoisArray.forEach((envoi: any) => {
          const nbrPalette = parseInt(envoi.nbr_palette, 10);
          if (!isNaN(nbrPalette)) {
            sumCurrentTotalPalettes += nbrPalette;
          }
        });
      });
    });

    console.log('Sum of nbr_palette:', sumCurrentTotalPalettes);
    const envoiformGroup = this.destinatairesFormArrayEnvoisArray(i, j).at(
      k
    ) as FormGroup;

    //get id palette
    const id = envoiformGroup.controls['id'].value as number;
    //get nbr palette
    const nbr_palettes_parType = envoiformGroup.controls['nbr_palette']
      .value as number;
    //get type palette
    const type_palette = envoiformGroup.controls['type_palette']
      .value as string;

    if (
      nbr_palettes_parType > 0 &&
      type_palette !== '' &&
      sumCurrentTotalPalettes <= parseInt(nbrPalettesTotal)
    ) {
      if (
        (nbr_palettes_parType <= this.totalPalettesEnvoi &&
          this.totalPalettesEnvoi !== 0) ||
        (nbr_palettes_parType <= this.totalPalettesEnvoi &&
          this.totalPalettesEnvoi === 0) ||
        (nbr_palettes_parType >= this.totalPalettesEnvoi &&
          this.totalPalettesEnvoi !== 0) ||
        (nbr_palettes_parType >= this.totalPalettesEnvoi &&
          this.totalPalettesEnvoi === 0)
      ) {
        console.log(typeof nbrPalettesTotal);
        console.log(typeof this.totalPalettesEnvoi);

        const dialogRef = this.dialog.open(SupportDialogComponent, {
          width: '704px',
          disableClose: true,

          data: {
            indexDest: i,
            indexDecharge: j,
            indexEnvoi: k,
            idPalette: id,
            type_palette: type_palette,
            nbrPalettes: nbr_palettes_parType,
            mode: this.modeEnvoi,
          },
        });

        dialogRef.afterClosed().subscribe((data) => {

          console.log('envoi refrences', data);
          if (data) {
            const objReferences: any = data;
            const references: any[] = Object.values(objReferences); // ['ref5', 'ref4', 'ref3']
            //  envoiReferences

            const envoiFormControl = envoiformGroup.get(
              'envoiReferences'
            ) as FormControl;
            envoiFormControl.setValue(references);
            /*  references.forEach((ref) => {
          envoiReferences.push(ref);
        });*/
            console.log(
              'this.destinatairesFormArray',
              this.destinatairesFormArray
            );
            // console.log(envoiReferences);
          }
        });
      } else {
        this._toast.warn(
          'nbr Total des palettes est ' +
            nbrPalettesTotal +
            ', il vous reste ' +
            this.totalPalettesEnvoi
        );
      }
    } else if (type_palette === '') {
      this._toast.warn('Veuillez saisir un type de palette!');
    } else if (nbr_palettes_parType <= 0) {
      this._toast.warn('Veuillez entrer un nombre de palette!');
    } else {
      this._toast.warn(
        'nbr Total des palettes est ' +
          nbrPalettesTotal +
          ', il vous reste ' +
          this.totalPalettesEnvoi
      );
    }
  }
  /*openEnvoiDialogsupportEdit(i: any, j: any): void {
    const nbrPalettesTotal = this.marchandiseForm.controls['nbr_palettes']
      .value as number;

    const destformGroup = this.destinatairesFormArray.at(i) as FormGroup;
    const envoiformArray = destformGroup.controls[
      'envoisFormArray'
    ] as FormArray;
    const envoiformGroup = envoiformArray.at(j) as FormGroup;

    //get id palette
    const id = envoiformGroup.controls['id'].value as number;
    //get nbr palette
    const nbr_palettes_parType = envoiformGroup.controls['nbr_palette']
      .value as number;
    //get type palette
    const type_palette = envoiformGroup.controls['type_palette']
      .value as string;

    this.store.select(SelectTotalPalettesEnvoi).subscribe((data) => {
      this.totalPalettesEnvoi = data.totalPalettesEnvoi;
    });

    console.log(nbrPalettesTotal);
    console.log(this.totalPalettesEnvoi);

    const dialogRef = this.dialog.open(SupportDialogComponent, {
      width: '704px',
      disableClose: true,

      data: {
        indexDest: i,
        indexEnvoi: j,
        idPalette: id,
        type_palette: type_palette,
        nbrPalettes: nbr_palettes_parType,
        mode: this.modeEnvoi,
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      //push references inside envoiReferences
      console.log(data);
      const objReferences: any = data;
      if (objReferences !== undefined) {
        this.modeEnvoi = 'edit';
        // if (Object.keys(objReferences)?.length > 0) {
        const references: any[] = Object.values(objReferences);
        const envoiReferences = envoiformGroup.controls['envoiReferences']
          .value as Array<any>;
        if (Object.isExtensible(envoiReferences)) {
          references.forEach((ref) => {
            envoiReferences.push(ref);
          });
        } else {
          console.log('envoiReferences is not extensible');
        }
      }
    });
  }*/

  openRetourDialogsupport(i: any, j: any, k: any, type): void {
    // get type palettes point dechargement

    console.log('type ', type);
    const type_palettes_dechargement =
      this.pointDechargementFormControlTypePalettes(i, j).value as string;

    console.log('type palettes dechargement', type_palettes_dechargement);
    const envoiformArray = this.destinatairesFormArrayEnvoisArray(i, j);

    let envoiformGroup: FormGroup | undefined;

    envoiformArray.controls.forEach((control) => {
      if (control.get('type_palette')?.value === type) {
        envoiformGroup = control as FormGroup;
      }
    });

    console.log('envoiformGroup', envoiformGroup);

    //get nbr palette
    const nbr_palettes_parType =
      envoiformGroup?.controls['nbr_palette']?.value || (0 as number);

    console.log('nbr_palettes_parType', nbr_palettes_parType);

    // get retours destinataire

    const retourformGroup = this.destinatairesFormArrayRetoursArray(i, j).at(
      k
    ) as FormGroup;

    console.log('retourformGroup', retourformGroup);

    //set the controls implicite
    const dimension: any = retourformGroup.get('dimension_palette')?.value;
    const id_palette: any = retourformGroup.get('id')?.value;
    let type_palette: any = retourformGroup.get('type_palette')
      ?.value as string;
    retourformGroup.controls['type_palette']?.valueChanges.subscribe(
      (data: string) => {
        type_palette = data;
      }
    );

    console.log('type_palette', type_palette);

    console.log('curent retourformGroup', retourformGroup);
    // optionnel :get refeferences from envoiformgroup after

    if (type_palette !== '') {
      const dialogRef = this.dialog.open(DialogNmbsupportComponent, {
        width: '944px',
        data: {
          indexDest: i,
          indexDecharge: j,
          indexRetour: k,
          id_palette: id_palette,
          type_palette: type_palette,
          type_palettes_dechargement: type_palettes_dechargement,
          nbr_palettes_parType: nbr_palettes_parType,
        },
      });

      dialogRef.afterClosed().subscribe((data: any) => {
        //push references inside retourReferences

        console.log('returned data', data);
        if (data) {
          const arrayReferencesRetour = (
            data !== undefined
              ? Object.values(data?.palettes_retour)
              : console.log('References undefined !')
          ) as Array<any>;
          const arrayReferencesAddit = (
            data !== undefined
              ? Object.values(data?.palettes_additionel)
              : console.log('References undefined !')
          ) as Array<any>;

          const retourReferencesFormControl = retourformGroup.get(
            'retourReferences'
          ) as FormControl;
          retourReferencesFormControl.setValue(arrayReferencesRetour);
          const retourReferencesAdditFormControl = retourformGroup.get(
            'retourReferencesAddit'
          ) as FormControl;
          retourReferencesAdditFormControl.setValue(arrayReferencesAddit);
          // arrayReferencesRetour?.length > 0
          //   ? arrayReferencesRetour.forEach((e) => retourReferences.push(e))
          //   : console.log('retour References empty !');
          // arrayReferencesAddit?.length > 0
          //   ? arrayReferencesAddit.forEach((e) => retourReferencesAddit.push(e))
          //   : console.log('retour References Additionnel empty !');
        }
      });
    } else if (type_palette === '') {
      this._toast.warn('Veuillez saisir un type de palette retour!');
    } else if (nbr_palettes_parType <= 0) {
      this._toast.warn("Veuillez entrer un nombre de palette d'envoi!");
    } else {
      this._toast.error('Erreur Vérifier les conditions!');
    }
  }

  transform(objects: any = []) {
    return Object.values(objects);
  }

  selectPointgeo(i) {
    const dataAdress: any = {
      position: { coordinates: [32.4279, -9.1386] },
    };

    //MapDialogComponent
    const dialogRef = this.dialog.open(MapMarchandiseComponent, {
      width: '1000px',
      data: { dataAdress }, //isPreviewMode: false
    });

    dialogRef.afterClosed().subscribe((output) => {
      console.log('OUTPUT ADRESSE', output);
      // this.myform.get('location').setValue(output.address);
    });
  }

  onSubmitMarchandise() {
    console.log(
      'marchandiseReservationForm',
      this.marchandiseReservationForm.value
    );
    console.log('chargementForm', this.chargementForm.value);
    // console.log('portForm', this.portForm.value);
    console.log('vsForm', this.vsForm.value);
    console.log('destinatairesGroup : ', this.destinatairesGroup.value);
    console.log('checkedStates', this.checkedStates);

    //for (let i = 0; i < this.myDestinataires.length; i++) {
    // const formValue: any = this.destinataireForm.get(`${i}`);
    // console.log(`destinataireForm ${i} value:`, formValue);
    // }
    let sum = 0;
    const destinatairesFormArray = this.destinatairesGroup.get(
      'destinatairesFormArray'
    ) as FormArray;

    destinatairesFormArray.controls.forEach((destinataireForm) => {
      const pointsGeoArray = destinataireForm.get(
        'pointsGeoArray'
      ) as FormArray;

      pointsGeoArray.controls.forEach((pointGeo) => {
        const envoisFormArray = pointGeo.get('envoisFormArray') as FormArray;

        envoisFormArray.controls.forEach((envoi: AbstractControl) => {
          if (envoi instanceof FormGroup) {
            const nbrPaletteControl = envoi.get('nbr_palette');
            if (nbrPaletteControl && nbrPaletteControl.value) {
              sum += Number(nbrPaletteControl.value);
            }
          }
        });
      });
    });

    const nbrPalettesTotal =
     this.nbrPalettesG;

    if (sum > Number(nbrPalettesTotal)) {
      console.log('sum ', sum);
      console.log('nbr palettes total ', nbrPalettesTotal);
      this._toast.error(
        'number de palettes mentionner est supérieur ou nombre de palette total'
      );
      return;
    }

    this.store.dispatch(
      getCurrentStepSuccess({ currentStep: this.step + 1, edit_mode: true })
    );
    this.store.dispatch(
      getMarchandiseSuccess({
        marchandise: {
          nbr_palettes: this.nbrPalettesG,
          poids: this.poidsGlobal,
          volume: this.volumeG,
          valeur_declare: this.valeurDeclareG,
        },
      })
    );
    this.store.dispatch(
      getPointChargementSuccess({
        point_Chargement: this.chargementForm.value.chargements,
        })
      );
      this.store.dispatch(
        getModePortSuccess({ modePort: this.portForm.value.port_id })
      );


      console.log('vs form value ' , this.vsForm.value)
      this.store.dispatch(
        getVehiculeServicesSuccess({ vehicule_services: this.vsForm.value })
      );
      const destinataire_infosData = {
        destinatairesData: this.destinatairesGroup.value.destinatairesFormArray,
        checkedStates: this.checkedStates,
      };

      this.store.dispatch(
        getDestinataireInfosSuccess({
          destinataire_infos: destinataire_infosData,
        })
      );
      this.goNext();
  }


  isValidFormGroupOrArray(control: AbstractControl): boolean {
    if (control instanceof FormGroup || control instanceof FormArray) {
      if (control.valid) {
        return true;
      } else {
        console.error(`Validation errors found in ${control instanceof FormGroup ? 'FormGroup' : 'FormArray'}:`);
        this.getFormValidationErrors(control);
        return false;
      }
    }
    return false;
  }


  getFormValidationErrors(formGroup: FormGroup | FormArray): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.getFormValidationErrors(control);
      } else {
        const controlErrors: ValidationErrors = control.errors;
        if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            console.log(`Control: ${key}, Error: ${keyError}, Value: ${controlErrors[keyError]}`);
          });
        }
      }
    });
  }
  
}
