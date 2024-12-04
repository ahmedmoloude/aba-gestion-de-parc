import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AffretementService } from 'app/core/services/affretement.service';
import { selectProfil } from 'app/core/store/profil/profil.selectors';
import {
  SelectLoaderReservation,
  SelectRetourDataReservation,
  checkStatusAfterAddReservation,
  selectReservationData,
  selectReservationExpediteur,
  selectTypeAffretment,
} from 'app/core/store/reservation/reservation.selectors';
import { Observable, Subscription, async } from 'rxjs';
import { ToastService } from 'app/core/services/toast.service';
import {
  addDemande,
  reservationInit,
  restoreStatus,
  updateDemande,
} from 'app/core/store/reservation/reservation.actions';
import { NavigationHelper } from 'app/core/helpers';
import { ROUTES, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { MapMarchandiseComponent } from '../marchandise/map-marchandise/map-marchandise.component';
import { DetailMarchandiseComponent } from '../marchandise/detail-marchandise/detail-marchandise.component';
import { VisualiserEnvoiComponent } from '../marchandise/visualiser-envoi/visualiser-envoi.component';
import { VisualiserRetourComponent } from '../marchandise/visualiser-retour/visualiser-retour.component';
import { VisualiserDocumentComponent } from './visualiser-document/visualiser-document.component';
import { PortService } from 'app/core/services/port.service';
import { AppState } from 'app/core/store/app.states';

@Component({
  selector: 'app-list-marchandise',
  templateUrl: './list-marchandise.component.html',
  styleUrls: ['./list-marchandise.component.css'],
})
export class ListMarchandiseComponent implements OnInit, OnDestroy {
  expediteur :any;
  dateReservation: any;
  destinataires: any[];
  destinataire_infos: any;
  marchandise: any;
  modePort: any;
  points_Chargement: any[];
  vehicules: any[];
  services: any[];
  checkedStates: any;
  destinatairesData: any[];
  checked: boolean = true;
  CurrentProfil: any;
  detailsToogle: boolean = false;
  confirmation: boolean = false;
  status: string;
  retourData: any;
  mode_ports = [];
  sumTotalElements: number;
  type_affretmnet_id: any;
  edit_mode: boolean = false;
  uuid: string = '';

  constructor(
    private store: Store<AppState>,
    private affretementService: AffretementService,
    private _toast: ToastService,
    private _navigationHelper: NavigationHelper,
    public dialog: MatDialog,
    private portService: PortService,
    private router: Router
  ) {}

  step: number = 3;

  @Output() stepBackEvent = new EventEmitter<number>();
  @Output() stepNextEvent = new EventEmitter<number>();

  reservationData$: Observable<any> = this.store.select(selectReservationData);
  profilData$: Observable<any> = this.store.select(selectProfil);
  statusCheck$: Observable<any> = this.store.select(
    checkStatusAfterAddReservation
  );
  statusCheckSubscription: Subscription;

  goBack() {
    this.stepBackEvent.emit(this.step);
  }

  returnFonds = {
    CHECK: 'chèque',
    TRAIT: 'traite',
    ESPECE: 'espèce',
    CachOnDelivery : 'espèce'
  };

  typeAffretment$ : Observable<any> = this.store.select(selectTypeAffretment)

  ngOnInit(): void {


    this.store.dispatch(restoreStatus());


    this.uuid = this.router.url.split('/')[2]

    this.typeAffretment$.subscribe((data) => {
      this.type_affretmnet_id = data
    })
    this.portService.getListPort().subscribe((data) => {
      this.mode_ports = data.response;
      // console.log(this.mode_ports);
    });
    // const json = {
    //   date_debut: '2023-05-12',
    //   date_fin: '2023-05-27',
    //   customer_id: 2,
    //   marchandise_globale: {
    //     nbr_palette: 10,
    //     poids: 2,
    //     volume: 2,
    //     valeur_declare: 2,
    //   },
    //   destinataires: [
    //     {
    //       id_destinataire: 10,
    //       point_dechargement: [
    //         {
    //           adresse_id: 2,
    //           date: '2023-05-12T00:00',
    //           city_id: 61,
    //         },
    //       ],
    //       envois: [
    //         {
    //           type_palette: 'Américan',
    //           nbr_palette: 3,
    //           references_envois: ['jhb', 'khjg', 'kj'],
    //         },
    //       ],
    //       retours: [
    //         {
    //           type_palette: 'Américan',
    //           references_retours: ['khjg', 'kj', 'jbh'],
    //         },
    //       ],
    //     },
    //   ],
    //   vehicules_ids: [1],
    //   points_chargements: [
    //     {
    //       adresse_id: 100,
    //       date: '2023-05-12T00:00',
    //       city_id: 112,
    //       details: {
    //         nature: 'Palettisées',
    //         nbr_palette: '10',
    //         poids: 2,
    //         volume: '2',
    //         valeur_declare: '2',
    //         largeur: '3',
    //         longueur: '3',
    //         hauteur: '2',
    //         images: [Blob, Blob],
    //       },
    //     },
    //   ],
    //   services: [
    //     {
    //       id: 1,
    //       nbr: 2,
    //     },
    //   ],
    //   by_client: true,
    // };
    // this.store.dispatch(addDemande({ data: this.convertJsonToFormData(json) }));


    this.edit_mode =  this.router.url.split('/')[1] == 'stepsreservations-edit' ? true : false;
    this.reservationData$.subscribe((data) => {
      console.log('reservation Data ', data);
      this.dateReservation = data.state?.dateReservation;
      this.destinataires = data.state?.destinataire?.destinataires;
      this.checkedStates = data.state?.destinataire_infos?.checkedStates;
      this.destinatairesData = data.state?.destinataire_infos.destinatairesData;

      this.marchandise = data.state?.marchandise;
      this.modePort = data.state?.modePort;
      this.points_Chargement = data.state?.point_Chargement;
      this.vehicules = data.state?.vehicule_services?.vehicules;
      this.services = data.state?.vehicule_services?.services;
      this.expediteur = data.state?.expediteur
    });

    // this.profilData$.subscribe((p) => {
    //   console.log('profil Data', p);
    //   this.CurrentProfil = p;
    // });

    this.store.select(selectReservationExpediteur).subscribe((data:any)=>{
       this.CurrentProfil = data.expediteur.id;
       console.log( 'id expediteur =======>',this.CurrentProfil )

     })

    this.store.select(SelectRetourDataReservation).subscribe((data) => {
      this.retourData = data.retourData;
    });

    const retourDataArray: any[][][] = Object.values(this.retourData).map(
      (outerObj) =>
        Object.values(outerObj).map((innerObj) => Object.values(innerObj))
    );

    console.log('retourDataArray', retourDataArray);

    this.sumTotalElements = 0;

    retourDataArray.forEach((outerArray: any[]) => {
      outerArray.forEach((innerArray: any[]) => {
        innerArray.forEach((obj: any) => {
          const palettesAdditionel = obj.palettes_additionel;
          const palettesRetour = obj.palettes_retour;

          const additionelElements = Object.keys(palettesAdditionel).length;
          const retourElements = Object.keys(palettesRetour).length;
          if (!isNaN(additionelElements) || !isNaN(retourElements)) {
            this.sumTotalElements += additionelElements + retourElements;
          }
        });
      });
    });
  }

  localisation(lat: any, lng: any): void {
    const dataAdress = { position: { coordinates: [lat, lng] } };
    const dialogRef = this.dialog.open(MapMarchandiseComponent, {
      width: '700px',
      data: { dataAdress },
    });
    dialogRef.afterClosed().subscribe((data) => {
      console.log(data);
    });
  }

  detailsmarchandise(index: any): void {
    const dialogRef = this.dialog.open(DetailMarchandiseComponent, {
      width: '761px',
      data: {
        detailsmarchandiseIndex: index,
        visual: true,
      },
    });
    dialogRef.afterClosed().subscribe((data: any) => {});
  }

  visualiserEnvoiSupports(supports: any) {
    console.log(supports);
    const dialogRef = this.dialog.open(VisualiserEnvoiComponent, {
      width: '429px',
      data: {
        visualiserSupports: supports,
      },
    });
    dialogRef.afterClosed().subscribe((data: any) => {});
  }

  //visualiserRetourSupports(supports: any) {
  visualiserRetourSupports(i, j, k) {
    console.log(' visualiserRetourSupports', i, j, k);
    const dialogRef = this.dialog.open(VisualiserRetourComponent, {
      width: '884px',
      data: {
        // visualiserSupports: supports,
        i: i,
        j: j,
        k: k,
      },
    });
    dialogRef.afterClosed().subscribe((data: any) => {});
  }

  visualiserDocuments(documents) {
    console.log(documents);
    const dialogRef = this.dialog.open(VisualiserDocumentComponent, {
      width: '429px',
      data: {
        visualiserDocuments: documents,
      },
    });
    dialogRef.afterClosed().subscribe((data: any) => {});
  }

  detailsOpen() {
    this.detailsToogle = !this.detailsToogle;
  }

  confirmer() {
    const destinataires_ids: number[] = this.destinataires.map(
      (d: any) => d.id
    );
    const vehiculesPost = this.vehicules.map((v: any) => {
      return {
        tonnage_id: v.tonnage,
        truck_type_id: v.id,
      };
    });
    const services = this.services.map((s) => {
      return {
        id: s.id,
        nbr: parseInt(s.nbr),
        title: s.name,
      };
    });
    const destinataires = this.destinataires?.map(
      (destinataire: any, index: number) => {
        const pointsDechargementArray = this.destinatairesData[index]
          .pointsGeoArray as Array<any>;

        console.warn('pointsDechargementArray ....'  , pointsDechargementArray)


        
        return {
          id_destinataire: destinataire.id as number,
          point_dechargement: pointsDechargementArray?.map((p) => {
            const retourFondsArray = p.retourFondsFormArray as Array<any>;
            const envoisArray = p.envoisFormArray as Array<any>;
            const retoursArray = p.retoursFormArray as Array<any>;

            return {
              dec_code : p.dec_code || '',
              adresse_id: p.adresse_id,
              date: p.date,
              city_id: p.city_id,
              type_palettes: p.type_palettes || p.type_palette,
              gerbage: p.gerbage === true ? 1 : 0,
              retour_fonds: p.retour_fonds === true ? 1 : 0,
              retour_documents: p.retour_documents === true ? 1 : 0,
              fonds: retourFondsArray.map((r) => {
                return {
                  type: r.type_retour_fond,
                  montant: r.montant_fond,
                };
              }),
              documents: [
                {
                  type: p.type_factures,
                  references: p.facture_references,
                },
                {
                  type: p.type_bls,
                  references: p.bl_references,
                },
              ],
              envois: envoisArray.map((e) => {
                return {
                  type_palette: e.type_palette,
                  nbr_palette: e.nbr_palette,
                  references_envois: e.envoiReferences,
                };
              }),
              retours: retoursArray.map((rp) => {
                return {
                  type_palette: rp.type_palette,

                  references_retours: [
                    ...rp.retourReferences,
                    ...rp.retourReferencesAddit || [],
                  ],
                };
              }),
            };
          }),
        };
      }
    );

    console.warn('poimts chargments '  , this.points_Chargement )
    
    const points_chargements = this.points_Chargement?.map((p: any) => {
      const imagesBlob = [];
      const imagesArray = p.details?.images as Array<any>;
      if (imagesArray?.length > 0) {
        imagesArray.forEach((img: any) => {
          // Convert Base64 to Blob
          // const byteCharacters = atob(img.file?.split(',')[1]);
          // const mimeString = img.file
          //   ?.split(',')[0]
          //   .split(':')[1]
          //   .split(';')[0];
          // // or const byteNumbers = new Array(byteCharacters.length);
          // const byteNumbers = new ArrayBuffer(byteCharacters.length);
          // for (let i = 0; i < byteCharacters.length; i++) {
          //   byteNumbers[i] = byteCharacters.charCodeAt(i);
          // }
          // const byteArray = new Uint8Array(byteNumbers);
          // const blob = new Blob([byteArray], { type: mimeString });
          imagesBlob.push(img.file);
        });
      }

      return {
        adresse_id: p.adresse_id,
        //date: '2023-05-19',
        date: p.date,
        city_id: p.city_id,
        type_palette_chargement : p?.details?.type_palette_chargement,
        //type: p.type,
        details: {
          nature: p.details?.nature_palette,
          nbr_palette: p.details?.nbr_palettes,
          poids: p.details?.poids,
          volume: p.details?.volume,
          valeur_declare: p.details?.valeur_declaree,
          largeur: p.details?.largeur,
          longueur: p.details?.longueur,
          hauteur: p.details?.hauteur,
          images: imagesBlob,
        },
      };
    });

    const marchandise: any = {
      nbr_palette: parseInt(this.marchandise.nbr_palettes),
      poids: parseInt(this.marchandise.poids),
      volume: parseInt(this.marchandise.volume),
      valeur_declare: parseInt(this.marchandise.valeur_declare),
      port_id: this.modePort,
      type_affretmnet_id : this.type_affretmnet_id
    };

    const newReservation = {
      date_debut: this.dateReservation.date_debut,
      date_fin: this.dateReservation.date_fin,
      customer_id: this.CurrentProfil,
      marchandise_globale: { ...marchandise },

      destinataires: destinataires,
      vehicules: vehiculesPost,
      points_chargements: points_chargements,
      services: services,
      by_client: false,
    };

    console.log('newReservation', newReservation);


    Swal.fire({
      //title: 'Etes-vous sur(e) de vouloir ajouter ce client ?',
      text: this.edit_mode ?  'Etes-vous sur(e) de vouloir modifier cette demande ?' : 'Etes-vous sur(e) de vouloir confirmer cette demande ?',
      icon: 'warning',
      iconColor: 'yellow',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'green',
      cancelButtonColor: 'black',

      /*customClass: {
        title: 'my-title-class',
      },*/
    }).then((result) => {
      if (result.value) {


        
        console.log('new reservation  ***** ' ,newReservation)

        if (this.edit_mode) {
          this.store.dispatch(updateDemande({
            data : this.convertJsonToFormData(newReservation),
            uuid : this.uuid
          }))
        }
        else{
          this.store.dispatch(
            addDemande({ data: this.convertJsonToFormData(newReservation) })
          );
        }

        this.store.dispatch(restoreStatus());
        this.statusCheckSubscription = this.statusCheck$.subscribe((data) => {
          this.status = data.status;


          if (this.status === 'INIT') {
             return;
          }

          if (this.status === 'SUCCESS') {
            this.goNext();
            Swal.fire({
              text: this.edit_mode ? 'Réservation Modifer avec succès!' :  'Réservation Enregistrée avec succès!',
              icon: 'success',
            });
          } else if (this.status === 'LOADING') {
            Swal.fire({
              text: this.edit_mode  ? "Modification  en cours d'éxcecution, Veuillez patienter... " : "Enregistrement en cours d'éxcecution, Veuillez patienter...",
              //title:"Enregistrement en cours d'éxcecution, Veuillez patienter...",
              showConfirmButton: false,
              allowOutsideClick: false,

              timer: 10000,
              timerProgressBar: true,
              didOpen: () => {
                Swal.showLoading();
              },
            });
          } else {
            Swal.fire({
              text: "une erreur s'est produite veuillez réessayer ultérieurement!",
              icon: 'error',
            });
          }
        });
      } else {
      }
    });

    // this.affretementService.create(reservationPost).subscribe(
    //   (e) => {
    //     this._toast.success('affretement added avec succès !');
    //   },
    //   (error) => {
    //     this._toast.error(error);
    //   }
    // );

    //this._navigationHelper.navigate(ROUTES['listeclients'].name);
  }

  resetReservationState() {
    this.store.dispatch(reservationInit());
  }

  ngOnDestroy(): void {
    if (this.statusCheckSubscription) {
      this.statusCheckSubscription.unsubscribe();
    }
  }

  headerColumuns = [
    'Type',
    'Code client',
    'Prénom',
    'Nom',
    'Email',
    'Téléphone',
  ];
  headerMarchndise = ['Nbr palettes', 'Poids', 'Volume', 'Valeur déclarée'];
  headerChargement = [
    'Date / heure d’enlèvement',
    'Ville d’enlèvement',
    'Adresse de chargement',
  ];
  headerDestinataire = [
    'Date / heure de livraison',
    'Ville de d’arrivée',
    'Adresse de dechargement',
    'Carte',
  ];
  headerEnvoie = [
    'Type de palettes',
    'Nbr de palettes',
    'Retour des palettes',
    'Nbr de support ajoutés',
  ];
  headerRetour = ['Type de palettes'];
  headerVehicule = ['Type de camion', 'Tonnage', 'Charge utile (T)'];
  headerServices = [
    'Service',
    'Nbr'
  ];

  jsonToFormData(json: any): FormData {
    const formData = new FormData();
    for (const key in json) {
      if (json.hasOwnProperty(key)) {
        const value = json[key];
        if (Array.isArray(value)) {
          for (let i = 0; i < value.length; i++) {
            const subValue = value[i];
            for (const subKey in subValue) {
              if (subValue.hasOwnProperty(subKey)) {
                formData.append(`${key}[${i}][${subKey}]`, subValue[subKey]);
              }
            }
          }
        } else {
          formData.append(key, value);
        }
      }
    }
    return formData;
  }

  convertJsonToFormData(
    jsonData: any,
    formData?: FormData,
    parentKey?: string
  ) {
    formData = formData || new FormData();

    for (let key in jsonData) {
      if (!jsonData.hasOwnProperty(key)) {
        continue;
      }

      let value = jsonData[key];
      let formKey = parentKey ? `${parentKey}[${key}]` : key;

      if (
        typeof value === 'object' &&
        !Array.isArray(value) &&
        value !== null
      ) {
        if (value instanceof Blob) {
          formData.append(formKey, value); // Append Blob to FormData
        } else {
          this.convertJsonToFormData(value, formData, formKey); // Recursively process nested objects
        }
      } else if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          if (
            typeof value[i] === 'object' &&
            !Array.isArray(value[i]) &&
            value[i] !== null
          ) {
            if (value[i] instanceof Blob) {
              formData.append(`${formKey}[${i}]`, value[i]); // Append Blob within the array to FormData
            } else {
              this.convertJsonToFormData(
                value[i],
                formData,
                `${formKey}[${i}]`
              ); // Recursively process nested objects within the array
            }
          } else {
            formData.append(`${formKey}[${i}]`, value[i]); // Append array element to FormData
          }
        }
      } else {
        formData.append(formKey, value); // Append the key-value pair to FormData
      }
    }

    return formData;
  }

  modePortIselected(id) {
    return this.mode_ports?.find((port) => port.id == id)?.title;
  }

  goNext() {
    this.stepNextEvent.emit(this.step);
  }



  getAdresse(adresse){
    return typeof adresse === 'string' ? adresse : adresse?.adress
  }
}
