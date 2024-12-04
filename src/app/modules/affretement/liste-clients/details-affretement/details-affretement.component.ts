import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AffretementService } from 'app/core/services/affretement.service';
import { MapMarchandiseComponent } from '../steps-reservations/marchandise/map-marchandise/map-marchandise.component';
import { DetailMarchandiseComponent } from '../steps-reservations/marchandise/detail-marchandise/detail-marchandise.component';
import { VisualiserEnvoiComponent } from '../steps-reservations/marchandise/visualiser-envoi/visualiser-envoi.component';
import { VisualiserRetourComponent } from '../steps-reservations/marchandise/visualiser-retour/visualiser-retour.component';
import { VisualiserDocumentComponent } from '../steps-reservations/list-marchandise/visualiser-document/visualiser-document.component';
import { DialogRefuserComponent } from '../dialog-refuser/dialog-refuser.component';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { cloneDeep } from 'lodash';
import { ToastService } from 'app/services';
import Swal from 'sweetalert2';
import { NzMarks } from 'ng-zorro-antd/slider';
import { DiscountDialogComponent } from '../discount-dialog/discount-dialog.component';

@Component({
  selector: 'app-details-affretement',
  templateUrl: './details-affretement.component.html',
  styleUrls: ['./details-affretement.component.css'],
})
export class DetailsAffretementComponent implements OnInit {
  marks: NzMarks =  {
    0: '0 %',
    10: '10 %',
    20: '20 %',
    30: '30 %',
    40: '40 %',
    50: '50 %',
    60: '60 %',
    70: '70 %',
    80: '80 %',
    90: '90 %',
    100: '100 %'
} 
  slider_value = 0;
  calcul_details: any;
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

  headerDechargement = [
    'Date / heure de livraison',
    'Ville d’arrivée',
    'Adresse de déchargement',
    'Localisation',
  ];

  headerDestinataire = [
    'Date / heure de livraison (estimation)',
    'Date / heure de livraison (reelle)',
    'Ville de d’arrivée',
    'Code de déclaration',
    'Adresse de chargement',
    'Carte',
  ];
  headerEnvoie = [
    'Type de palettes',
    'Nbr de palettes',
    'Retour des palettes',
    'Nbr de support ajoutés',
    'Palettes avec support / Sans support ',
  ];

  returnFonds = {
    CHECK: 'chèque',
    TRAIT: 'traite',
    ESPECE: 'espèce',
    CachOnDelivery : 'espèce'
  };
  headerRetour = ['Type de palettes'];
  headerVehicule = ['Type de camion', 'Tonnage', 'Poids max de véhicule (T)'];
  headerServices = ['Service', 'Nombre'];


 rubricsObject = {
    'TRANSPORT': 'Transport',
    'BL': 'Bon de livraison ',
    'FACTURE': 'Facture',
    'REMBOURSEMENT': 'C/Remboursement',
    'TRAITE': 'C/Traite',
    'CHEQUE': 'C/chèque',
    'ADV': 'ADV',
    'IMMOBILISATION': 'Immobilisation ',
    'TRANSPALETTE': 'Transpalette',
    'POINT_DECHARGEMENT': 'Point dechargement ',
    'MANUTENTION': 'Manutention',
    'RETOUR_PALEETE': 'Retour palette',
    'DROIT_DE_TIMBRE': 'Droits de timbre',
    'DROIT_FIXE': 'Droit Fixe',
    'DROIT_VARIABLE': 'Droit Variable',
  };
  servicesReservation = [];

  detailsToogle: boolean = false;
  uuid: string;
  details: any;
  isSpinner: boolean = true;
  decision: boolean = false;
  spinner: boolean = false;
  isTaxation: boolean = false;
  showTaxation: boolean = false;

  immob_days: FormControl = new FormControl(0);

  services: FormArray = new FormArray([
    new FormGroup({
      name: new FormControl(''),
      id: new FormControl(''),
      nbr: new FormControl(''),
    }),
  ]);

  distanceBetweenCities = [];
  mappingFormGroup: FormGroup;

  constructor(
    private affretementService: AffretementService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private _router: Router,
    private affretmentService: AffretementService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.affretementService.getDistanceBetweenCities().subscribe((res) => {
      this.distanceBetweenCities = res;
    });
    this.uuid = this.route.snapshot.paramMap.get('uuid');

    this.mappingFormGroup = new FormGroup({
      trucks: this.formBuilder.array([]),
    });


    this.affretmentService
      .getSelectableServicesAffretment()
      .subscribe((services) => {
        this.servicesReservation = services;
      });
    let route_url = this._router.url.split('/')[1];


    if (route_url == 'decisionAffretment') {
      this.decision = true;
    }

    
    if (route_url == 'taxation-affretement') {
      this.isTaxation = true;
    }

    console.log(this.uuid);
    this.affretementService.detailsByUuid(this.uuid).subscribe((data) => {
      if (data.success) {
        this.details = data.response;

        let trajectories = this.details.trajectories;

        console.log('trajectories...', trajectories);

        this.isSpinner = false;

        let points_dechargements = this.details?.demande_destinataires
          .map((item) => {
            return item.points_dechargement.map((point) => point);
          })
          .flat(1);

        let points_chargements = this?.details?.points_chargements;
        // add all trucks
        trajectories?.forEach((truck) => {
          let trucks = this.mappingFormGroup.get('trucks') as FormArray;

          let group: FormGroup = new FormGroup({
            // truck_id : new FormControl(truck.id),
            sum_km: new FormControl(0),
            truck_type_id: new FormControl(truck.truck_type.id),
            tonnage_id: new FormControl(truck.tonnage.id),
            immob_days: new FormControl(0),
            has_retour : new FormControl(truck?.has_retour || false ),
            truck_name: new FormControl(
              truck.truck_type?.name + '  ' + truck.tonnage.name + ' T '
            ),
            points_chargements: new FormArray([]),
            points_dechargements: new FormArray([]),
            nodes: new FormArray([]),
          });

          let nodes_form_array = group.get('nodes') as FormArray;

          let truck_trajectory = JSON.parse(truck.trajectory);

          console.log('truck trajectory', truck_trajectory);

          if (truck_trajectory.length > 0) {
            truck_trajectory.forEach((t) => {
              nodes_form_array.push(
                new FormGroup({
                  adresse_id: new FormControl(t.adresse_id),
                  city_id: new FormControl(t.city_id),
                  city: new FormControl(t.city),
                  title: new FormControl(t.title),
                  type: new FormControl(t.type),
                })
              );
            });
          }

          trucks.push(group);
          let points_chargements_form_array = group.get(
            'points_chargements'
          ) as FormArray;
          points_chargements.forEach((point_chargement) => {
            let is_selected_point_chargement = truck_trajectory?.find(
              (t) => t.adresse_id === point_chargement.adresse.id
            )
              ? true
              : false;

            console.log(
              'is_selected_point_chargement',
              is_selected_point_chargement
            );
            let point_chargement_group = new FormGroup({
              id: new FormControl(point_chargement.id),
              city: new FormControl(point_chargement.city.name),
              city_id: new FormControl(point_chargement.city_id),
              title: new FormControl(point_chargement.adresse.adress),
              value: new FormControl(is_selected_point_chargement),
            });

            point_chargement_group.get('value').valueChanges.subscribe((v) => {
              if (v) {


                console.log('value changed' , v)
                let allReadyExist = nodes_form_array.value.find(
                  (v) => v.adresse_id == point_chargement.adresse.id
                );

                if (!allReadyExist) {
                  nodes_form_array.push(
                    new FormGroup({
                      adresse_id: new FormControl(point_chargement.adresse.id),
                      city_id: new FormControl(point_chargement.city_id),
                      city: new FormControl(point_chargement.city.name),
                      title: new FormControl(point_chargement.adresse.adress),
                      type: new FormControl('CHARGEMENT'),
                    })
                  );
                }
              }

              this.getDistanceBetweenCities(group);
            });
            points_chargements_form_array.push(point_chargement_group);

            points_chargements_form_array.valueChanges.subscribe((data) => {
              const atLeastOneChecked = data.some(
                (item) => item.value === true
              );
              const pointsDechargementsControl = group.get(
                'points_dechargements'
              ) as FormArray;

              console.log('at least one is checked ', atLeastOneChecked);
              if (atLeastOneChecked) {
                pointsDechargementsControl.controls.forEach((control) => {
                  control.enable();
                });
                pointsDechargementsControl.updateValueAndValidity();
              } else {
                pointsDechargementsControl.controls.forEach((control) => {
                  control.get('value').setValue(false);
                  control.disable();
                  control.updateValueAndValidity();
                });
                pointsDechargementsControl.updateValueAndValidity();

                const nodesFormArray = group.get('nodes') as FormArray;
                nodesFormArray.clear();
              }
            });
          });

          let points_decchargements_form_array = group.get(
            'points_dechargements'
          ) as FormArray;
          points_dechargements.forEach((point_dechargement) => {
            let is_selected_point_dechargement = truck_trajectory?.find(
              (t) => t.adresse_id === point_dechargement.adresse.id
            )
              ? true
              : false;

            console.warn(
              'is_selected_point_chargement',
              is_selected_point_dechargement
            );

            let points_dechargement_form_group: FormGroup = new FormGroup({
              id: new FormControl(point_dechargement.id),
              title: new FormControl(point_dechargement.adresse.adress),
              city_id: new FormControl(point_dechargement.city_id),
              city: new FormControl(point_dechargement.city.name),
              value: new FormControl(is_selected_point_dechargement),
            });

            points_dechargement_form_group
              .get('value')
              .valueChanges.subscribe((v) => {
                if (v) {
                  let allReadyExist = nodes_form_array.value.find(
                    (v) => v.adresse_id == point_dechargement.adresse.id
                  );
                  if (!allReadyExist) {
                    nodes_form_array.push(
                      new FormGroup({
                        adresse_id: new FormControl(
                          point_dechargement.adresse.id
                        ),
                        city_id: new FormControl(point_dechargement.city_id),
                        city: new FormControl(point_dechargement.city.name),
                        title: new FormControl(
                          point_dechargement.adresse.adress
                        ),
                        type: new FormControl('DECHARGEMENT'),
                      })
                    );
                  }
                } else {
                  const indexToRemove = nodes_form_array.value.findIndex(
                    (item) => item.adresse_id === point_dechargement.adresse.id
                  );

                  if (indexToRemove !== -1) {
                    // Remove the item from the 'nodes_form_array' at the given index
                    nodes_form_array.removeAt(indexToRemove);
                  }
                }

                this.getDistanceBetweenCities(group);
              });

            points_decchargements_form_array.push(
              points_dechargement_form_group
            );
          });

          if (nodes_form_array.value.length == 0) {
            points_decchargements_form_array.disable();
          }

          this.getDistanceBetweenCities(group);
        });
      }
    });
  }

  localisation(lat: any, lng: any): void {
    console.log(lat, lng);
    const dataAdress = { position: { coordinates: [lat, lng] } };
    const dialogRef = this.dialog.open(MapMarchandiseComponent, {
      width: '700px',
      data: { dataAdress },
    });
    dialogRef.afterClosed().subscribe((data) => {
      console.log(data);
    });
  }

  detailsmarchandise(details: any): void {
    const dialogRef = this.dialog.open(DetailMarchandiseComponent, {
      width: '761px',
      data: {
        detailsmarchandise: details,
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
  visualiserRetourSupports(supports: any) {

    console.log('reftrences retour..' , supports)
    const dialogRef = this.dialog.open(VisualiserRetourComponent, {
      width: '884px',
      data: {
        visualiserDetails: true,
        visualiserSupports: supports,
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

  refuser(demande) {
    const dialogRef = this.dialog.open(DialogRefuserComponent, {
      width: '491px',
      data: { demande },
    });
  }

  prendreEnCharge(uuid) {
    console.log('UUID', uuid);
    this.spinner = true;
    let data = {
      uuid: uuid,
      statut: 'EN_ATTENTE_AFFECTATION',
    };
    this.affretementService.changerStatutDemande(data).subscribe(
      (data) => {
        // this._toast.success("Décision prise avec succées")
        this.spinner = false;
        this._router.navigate([`listeclients`]);
      },
      (error) => {
        console.log('error', error);
      }
    );
  }

  get total_service() {
    const services = this.calcul_details?.services || [];

    let totalValue = 0;

    for (const key in services) {
        totalValue += services[key]?.ttc;
    }

    return totalValue?.toFixed(2);
  }


  get total_service_global() {
    const services = this.calcul_details?.services_global || [];

    let totalValue = 0;

    for (const key in services) {
      // if (typeof services[key] === 'number') {
        totalValue += services[key]?.ttc;
      // }
    }

    return totalValue?.toFixed(2);
  }


  get total_service_ht() {
    const services = this.calcul_details?.services || [];

    let totalValue = 0;

    for (const key in services) {
        totalValue += services[key]?.ht;
    }

    return totalValue?.toFixed(2);
  }


  get total_service_global_ht() {
    const services = this.calcul_details?.services_global || [];

    let totalValue = 0;

    for (const key in services) {
        totalValue += services[key]?.ht;
    }

    return totalValue?.toFixed(2);
  }
  onServiceChange(service, i) {
    console.log('service ', service);
    const serviceform = this.services.at(i) as FormGroup;
    serviceform.controls['id'].setValue(service.id);
    // serviceform.controls['name'].setValue(service.name);
    console.log('serviceform ', serviceform);

    console.log(this.services.value);
  }

  addService() {
    const serviceForm = new FormGroup({
      id: new FormControl(null, []),
      name: new FormControl('', []),
      nbr: new FormControl(null, []),
    });
    this.services.push(serviceForm);
  }

  deleteService(i) {
    this.services.removeAt(i);
  }

  calculer() {
    this.isSpinner = true;

    this.details.immobilisation = this.immob_days.value;
    // call the matrix livraiosn service
    this.affretementService.taxataion(this.details).subscribe(
      (res) => {
        this.calcul_details = res;
        this.isSpinner = false;
      },
      (err) => {
        this.isSpinner = false;
      }
    );
  }

  validate() {
    Swal.fire({
      text: 'êtes-vous sûr de vouloir confirmer cette trajectoire ?',
      icon: 'warning',
      iconColor: 'yellow',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      confirmButtonColor: 'green',
      cancelButtonColor: 'black',
    }).then((result) => {
      if (result.value) {
        this.isSpinner = true;

        let output = {
          update_mode: true,
          demande_id: this.details.id,
          trucks: [],
        };
        //
        this.mappingFormGroup.value.trucks.forEach((truck) => {
          output.trucks.push({
            has_retour : truck.has_retour,
            tonnage_id: truck.tonnage_id,
            truck_type_id: truck.truck_type_id,
            trajectory: truck.nodes,
          });
        });

        this.affretementService
          .updateDemandeTrajectories(output)
          .subscribe((res) => {
            this.isSpinner = false;

            console.log('child before function called' , res.response.child)
            this.mapTrucksAndCalculate(res?.response?.child);
          } , (error) => {
            this.isSpinner = false;

          });
      }
    });
  }

  redirect(){
    this._router.navigate(['/listeclients']);
  }

  mapTrucksAndCalculate(child) {


    console.log('mapTrucksAndCalculate called..' , child);

    if (this.isTaxation) {
      let output = cloneDeep(this.details);

      output.child = child ?? null;

      this.showTaxation = true;

      if (child) {
        child.vehicules = cloneDeep(this.mappingFormGroup.get('trucks').value);

        child.customer_id = child.client.id;
        child.vehicules = child.vehicules.map((v) => {

          if (v.has_retour) {


            
            
            v.origin = v.nodes[v.nodes.length - 1]?.city_id

            console.warn('origin ' , v.origin)
            v.destination = v.nodes[0]?.city_id

            console.warn('destination  ' ,  v.destination)

            return v;

          }

        });
        child.vehicules  =  child.vehicules.filter(v => v != null)
        console.log('child trucks' , child.vehicules)
      }



      output.customer_id = output.client.id;
      output.destinataires = output.demande_destinataires;

      output.destinataires = output.destinataires.map((destinataire) => {
        return {
          ...destinataire,
          point_dechargement: destinataire.points_dechargement.map((point) => {
            return {
              ...point,
              documents: point.retour_documents.map((doc) => {
                return {
                  type: doc?.type,
                  references: doc?.references_documents.map((ref) => ref),
                };
              }),
              fonds: point.retour_fonds.map((doc) => {
                return {
                  type: doc?.type,
                  montant: doc?.montant,
                };
              }),
            };
          }),
        };
      });

      let trucks = this.mappingFormGroup.get('trucks').value.map((v) => {

        console.log('v modes' , v)
        v.origin = v.nodes[0].city_id;

        v.destinations = v.nodes
          .filter((node) => node.type == 'DECHARGEMENT')
          .map((n) => n.city_id);

        return v;
      });

      output.vehicules = trucks;


      console.log('details', this.details);

      this.affretementService.taxataion(output).subscribe((res) => {
        this.calcul_details = res;
      });
    }
  }



  getDistanceBetweenCities(truck_form: FormGroup) {
    console.log('truck form ', truck_form);
  
    const nodes = truck_form.get('nodes')?.value;
    console.log('nodes', nodes);
  
    let maxDistance = 0;
  
    if (nodes && nodes.length >= 2) {
      let start_city = nodes[0]?.city_id;
  
      if (start_city) {
        for (let i = 1; i < nodes.length; i++) {
          let end_city = nodes[i]?.city_id;
  
          if (end_city) {
            let v = this.distanceBetweenCities.find(
              (c) =>
                (c.ville_depart_id == start_city && c.ville_arrivee_id == end_city) ||
                (c.ville_depart_id == end_city && c.ville_arrivee_id == start_city)
            );
  
            if (v) {
              let distance = Number(v.distance);
              if (distance > maxDistance) {
                maxDistance = distance;
              }
            }
          }
        }
      }
    }



    console.warn('sum km ,' , maxDistance)
  
    truck_form.get('sum_km').setValue(Number(maxDistance));
  }
  
  

  e(): boolean {
    let trucksFormArray = this.mappingFormGroup.get('trucks') as FormArray;

    let points_dechargements = this.details?.demande_destinataires
    .map((item) => {
      return item.points_dechargement.map((point) => point);
    })
    .flat(1);

    let points_chargements = this?.details?.points_chargements;

    trucksFormArray.controls.forEach((truckFormGroup : FormGroup ) => {
      let nodes = truckFormGroup.get('nodes').value;
    });

    return true;
  }




  openDiscountPopUp(is_forfait : boolean = false){
    if (Object.keys(this.calcul_details).length > 0) {
      let dialogref =  this.dialog.open(DiscountDialogComponent , {
        panelClass: 'full-screen-dialog',
        maxWidth: '100vw',
        maxHeight: '100vh',
        width: '90vw',
        data : {
          demande_id : this.details.id,
          calcul_details : this.calcul_details,
          is_forfait
        }
      })


      dialogref.afterClosed().subscribe((o) => {
        if (o) {
          this.redirect()
        }
      })
    }
  }


  multiply(a , b) {
     return (a * b).toFixed(0)
  }

  getPaletteswithSupNumbers(refrences){
    return refrences?.filter((v) => v != '')?.length || 0
  }

  getPaletteswithNoSupNumbers(refrences){
    return refrences?.filter((v) => v == '')?.length || 0
  }


  add(arr) {
    let total = 0;
    arr.forEach(element => {
        if (!isNaN(element)) { // Check if the element is a valid number
            total += parseFloat(element); // Parse the element to float and add to total
        } else {
            console.log(`Ignoring non-numeric element: ${element}`);
        }
    });
    return total.toFixed(2);
}
  
}
