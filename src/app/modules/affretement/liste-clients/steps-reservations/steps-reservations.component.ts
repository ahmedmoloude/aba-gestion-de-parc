import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AffretementService } from 'app/core/services/affretement.service';
import { addDetailsMarchandiseSuccess, addEnvoiData, addNbrPalettesGlobal, addRetourData, getCurrentStepSuccess, getDestinataireInfosSuccess, getDestinataireSuccess, getExpediteurSuccess, getMarchandiseSuccess, getModePortSuccess, getPointChargementSuccess, getVehiculeServicesSuccess } from 'app/core/store/reservation/reservation.actions';

@Component({
  selector: 'app-steps-reservations',
  templateUrl: './steps-reservations.component.html',
  styleUrls: ['./steps-reservations.component.css'],
})
export class StepsReservationsComponent implements OnInit {
  step = 1;
  hiddenSteps = [];
  editMode = false;
  uuid = null;
  loading = true;

  constructor(private router: Router ,public affretmentService : AffretementService , private store : Store) {}
  ngOnInit(): void {

    this.editMode = this.router.url.split('/')[1] == 'stepsreservations-edit' ? true : false;
    this.uuid = this.router.url.split('/')[2]
    if (this.editMode) {
      this.affretmentService.detailsByUuid(this.uuid).subscribe((data) => {
        this.loading = false;
        this.store.dispatch(getExpediteurSuccess({expediteur : data.response.client}))
        this.store.dispatch(getDestinataireSuccess({destinataire : {destinataires : data.response.demande_destinataires}}))
        this.store.dispatch(
          getMarchandiseSuccess({ marchandise: data.response.marchandise_globale })
        );
       
        const destinataire_infosData = {
          destinatairesData: data.response.demande_destinataires,
          checkedStates: [],
        };
        this.store.dispatch(
          getDestinataireInfosSuccess({
            destinataire_infos: destinataire_infosData,
          })
        )


        this.store.dispatch(
          getPointChargementSuccess({
            point_Chargement: data.response.points_chargements.map((e) => {
              e.details.nbr_palettes =  Number(e.details.nbr_palette)
              e.details.valeur_declaree = Number(e.details.valeur_declare);
              return e;
            })
          })
        );


        console.warn(' response .. ....' , data.response)

        data.response.points_chargements.forEach((element ,i) => {

          this.store.dispatch(addDetailsMarchandiseSuccess({
            detail: element.details,
            position: i
          }))

         
        });
        this.store.dispatch(
          getModePortSuccess({ modePort: data.response.marchandise_globale.port_id })
        );

        this.store.dispatch(
          getVehiculeServicesSuccess({
            vehicule_services: {
            vehicules: data.response.vehicules,
            services: data.response.services
          }})
        );

        this.store.dispatch(addNbrPalettesGlobal({ nbrPalettesG: data.response.marchandise_globale.nbr_palette }));

        // this.store.dispatch(
        //   addRetourData({
        //     retour: validSupportsRetour,
        //     indexDestinataire: i,
        //     indexDechargement: j,
        //     indexRetour: indexRetour,
        //   })
        // );

        data.response.demande_destinataires.forEach((element , i) => {

            element.points_dechargement.forEach((point , j) => {
              point.item_retours.map((item , indexRetour) => {


                const validSupportsRetour = {
                  palettes_retour: item.references_retours,
                  palettes_additionel: {},
                };
            
                this.store.dispatch(
                  addRetourData({
                    retour: validSupportsRetour,
                    indexDestinataire: i,
                    indexDechargement: j,
                    indexRetour: indexRetour,
                  })
                );

              })


              point.item_envois.forEach((env , indexEnvoi) => {

                const envoi: any = {
                  idPalette: env?.id_palette,
                  type_palette: env.type_palette,
                  nbrPalettes: env.nbr_palette,
                  references: env.references_envois,
                };
            
                console.log('index envoi', indexEnvoi);
                this.store.dispatch(
                  addEnvoiData({
                    envoi: envoi,
                    indexDestinataire: i,
                    indexDechargement: j,
                    indexEnvoi: indexEnvoi,
                  })
                );
              });
            });
        });

       
        this.store.dispatch(getCurrentStepSuccess({ currentStep: 2, edit_mode : true}));
        this.step = 2;
        console.warn('edit data ' ,   data)
      })
      console.log('edit mode enabled')
    }
    else{
      this.loading = false;
    }
  }
  goNext($step) {
    this.hideSteps($step);
    this.step = $step + 1;
  }
  hideSteps(step) {
    switch (step) {
      case 1:
        break;
      case 2:
        this.hiddenSteps = this.hiddenSteps.concat([1, 2]);
        break;
      case 3:
        break;
    }
  }
  goBack($step) {
    if (this.step > 1) {
      this.step = $step - 1;
      this.hiddenSteps = this.hiddenSteps.filter((step) => step !== this.step);
    }
  }
}
