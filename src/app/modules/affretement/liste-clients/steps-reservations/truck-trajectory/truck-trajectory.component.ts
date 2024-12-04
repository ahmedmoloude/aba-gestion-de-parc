import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AffretementService } from 'app/core/services/affretement.service';
import { selectProfil } from 'app/core/store/profil/profil.selectors';
import { reservationInit } from 'app/core/store/reservation/reservation.actions';
import {
  SelectCurrentDemandeUUID,
  checkStatusAfterAddReservation,
  selectReservationData,
} from 'app/core/store/reservation/reservation.selectors';
import { ToastService } from 'app/services';
import { Observable, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-truck-trajectory',
  templateUrl: './truck-trajectory.component.html',
  styleUrls: ['./truck-trajectory.component.css'],
})
export class TruckTrajectoryComponent implements OnInit {
  mappingFormGroup: FormGroup;
  uuid: String;
  details: any;

  spinner = false;

  step: number = 4;

  @Output() stepBackEvent = new EventEmitter<number>();

  reservationData$: Observable<any> = this.store.select(selectReservationData);
  profilData$: Observable<any> = this.store.select(selectProfil);
  statusCheck$: Observable<any> = this.store.select(
    checkStatusAfterAddReservation
  );
  statusCheckSubscription: Subscription;

  goBack() {
    this.stepBackEvent.emit(this.step);
  }

  constructor(
    public store: Store,
    private formBuilder: FormBuilder,
    private affretementService: AffretementService,
    private router: Router,
    private _toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.mappingFormGroup = new FormGroup({
      trucks: this.formBuilder.array([]),
    });

    this.store.select(SelectCurrentDemandeUUID).subscribe((uuid) => {
      this.affretementService.detailsByUuid(uuid).subscribe((data) => {
        if (data.success) {
          this.details = data.response;

          let points_dechargements = this.details?.demande_destinataires
            .map((item) => {
              return item.points_dechargement.map((point) => point);
            })
            .flat(1);

          let points_chargements = this?.details?.points_chargements;
          // add all trucks
          this?.details?.vehicules?.forEach((truck) => {
            let trucks = this.mappingFormGroup.get('trucks') as FormArray;

            let group: FormGroup = new FormGroup({
              immob_days: new FormControl(0),
              truck_id: new FormControl(truck.id),
              truck_name: new FormControl(
                truck.truck_type?.name + '  ' + truck.tonnage.name + ' T '
              ),
              tonnage_id: new FormControl(truck.tonnage.id),
              truck_type_id: new FormControl(truck.truck_type.id),
              points_chargements: new FormArray([]),
              points_dechargements: new FormArray([]),
              nodes: new FormArray([], Validators.required),
            });

            let nodes_form_array = group.get('nodes') as FormArray;

            trucks.push(group);
            let points_chargements_form_array = group.get(
              'points_chargements'
            ) as FormArray;
            points_chargements.forEach((point_chargement) => {
              let point_chargement_group = new FormGroup({
                id: new FormControl(point_chargement.id),
                city: new FormControl(point_chargement.city.name),
                city_id: new FormControl(point_chargement.city_id),
                title: new FormControl(point_chargement.adresse.adress),
                value: new FormControl(false),
              });

              point_chargement_group
                .get('value')
                .valueChanges.subscribe((v) => {
                  if (v) {
                    let allReadyExist = nodes_form_array.value.find(
                      (v) => v.adresse_id == point_chargement.adresse.id
                    );

                    if (!allReadyExist) {
                      nodes_form_array.push(
                        new FormGroup({
                          adresse_id: new FormControl(
                            point_chargement.adresse.id
                          ),
                          city_id: new FormControl(point_chargement.city_id),
                          city: new FormControl(point_chargement.city.name),
                          title: new FormControl(
                            point_chargement.adresse.adress
                          ),

                          type: new FormControl('CHARGEMENT'),
                        })
                      );
                    }
                  }
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
              let points_dechargement_form_group: FormGroup = new FormGroup({
                id: new FormControl(point_dechargement.id),
                title: new FormControl(point_dechargement.adresse.adress),
                city_id: new FormControl(point_dechargement.city_id),
                city: new FormControl(point_dechargement.city.name),
                value: new FormControl(false),
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
                    // Find the index of the item with the matching adresse_id in the 'nodes_form_array'
                    const indexToRemove = nodes_form_array.value.findIndex(
                      (item) =>
                        item.adresse_id === point_dechargement.adresse.id
                    );

                    if (indexToRemove !== -1) {
                      // Remove the item from the 'nodes_form_array' at the given index
                      nodes_form_array.removeAt(indexToRemove);
                    }
                  }
                });

              points_decchargements_form_array.push(
                points_dechargement_form_group
              );
            });
            points_decchargements_form_array.disable();
          });

          console.log('trucks formgroup ', this.mappingFormGroup.value);

          this.spinner = false;
          console.log('DETAILS ', this.details);
          // console.log(this.details.demande_destinataires);
        }
      });
    });
  }

  submit() {
    // if (!this.checkPointsUsage()) {
    //   // Display an error message or take appropriate action

    //   this._toastService.warn(
    //     'vous devez utiliser tous les points de chargements et déchargements'
    //   );
    //   return;
    // }

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
        let output = {
          update_mode: false,
          demande_id: this.details.id,
          trucks: [],
        };
        //
        this.mappingFormGroup.value.trucks.forEach((truck) => {
          output.trucks.push({
            tonnage_id: truck.tonnage_id,
            truck_type_id: truck.truck_type_id,
            trajectory: truck.nodes,
          });
        });

        // this.affretementService.SaveTrajectory(output).subscribe((data) => {
        //   this.store.dispatch(reservationInit());
        //   this.router.navigate(['/listeclients']);
        // });
      }
    });
  }

  // checkPointsUsage(): boolean {
  //   let trucksFormArray = this.mappingFormGroup.get('trucks') as FormArray;

  //   // Loop through each truck
  //   for (let i = 0; i < trucksFormArray.length; i++) {
  //     let truckFormGroup = trucksFormArray.at(i) as FormGroup;
  //     let pointsChargementsFormArray = truckFormGroup.get(
  //       'points_chargements'
  //     ) as FormArray;
  //     let pointsDechargementsFormArray = truckFormGroup.get(
  //       'points_dechargements'
  //     ) as FormArray;

  //     // Check if at least one point_chargement is used
  //     if (
  //       !pointsChargementsFormArray.value.some((point) => point.value === true)
  //     ) {
  //       return false;
  //     }

  //     // Check if at least one point_dechargement is used
  //     if (
  //       !pointsDechargementsFormArray.value.some(
  //         (point) => point.value === true
  //       )
  //     ) {
  //       return false;
  //     }
  //   }

  //   return true;
  // }
}
