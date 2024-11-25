import { createAction, props } from '@ngrx/store';

export const reservationInit = createAction(
  '[Reservation] Reset Reservation Action'
);

export const getDateReservation = createAction(
  '[Reservation] Get Date Reservation Action'
);
export const getDateReservationSuccess = createAction(
  '[Reservation] Get Date Reservation Action Success',
  props<{ dateReservation: any ,  affretment_type_id : number }>()
);

export const getDestinataire = createAction(
  '[Reservation] Get Destinataire Action'
);
export const getDestinataireSuccess = createAction(
  '[Reservation] Get Destinataire Action Success',
  props<{ destinataire: any }>()
);
export const getExpediteurSuccess = createAction(
  '[Reservation] Get Expediteur Action Success',
  props<{ expediteur: any }>()
);

export const deleteDestinataireSuccess = createAction(
  '[Reservation] delete Destinataire Action Success',
  props<{ position: number }>()
);

export const getMarchandise = createAction(
  '[Reservation] Get Marchandise Action'
);
export const getMarchandiseSuccess = createAction(
  '[Reservation] Get Marchandise Action Success',
  props<{ marchandise: any }>()
);

export const getPointChargement = createAction(
  '[Reservation] Get Point Chargement Action'
);
export const getPointChargementSuccess = createAction(
  '[Reservation] Get Point Chargement Action Success',
  props<{ point_Chargement: any }>()
);

export const getDestinataireInfos = createAction(
  '[Reservation] Get Destinataire infos Action'
);
export const getDestinataireInfosSuccess = createAction(
  '[Reservation] Get Destinataire infos Action Success',
  props<{ destinataire_infos: any }>()
);

export const getModePort = createAction('[Reservation] Get Mode Port Action');
export const getModePortSuccess = createAction(
  '[Reservation] Get Mode Port Action Success',
  props<{ modePort: any }>()
);

export const getVehiculeServices = createAction(
  '[Reservation] Get Vehicule & Services Action'
);
export const getVehiculeServicesSuccess = createAction(
  '[Reservation] Get Vehicule & Services Action Success',
  props<{ vehicule_services: any }>()
);

export const getVehicules = createAction('[Reservation] Get Vehicules Action');
export const getVehiculesSuccess = createAction(
  '[Reservation] Get Vehicules Action Success',
  props<{ vehicules: any }>()
);

export const getCurrentStepSuccess = createAction(
  '[Reservation] Get Current Step  Action Success',
  props<{ currentStep?: number; edit_mode?: boolean }>()
);

export const getDetailsMarchandiseSuccess = createAction(
  '[Reservation] Get Details Marchandise Action Success',
  props<{ detailsMarchandise: any[] }>()
);

export const addDetailsMarchandiseSuccess = createAction(
  '[Reservation] Add Details Marchandise Action Success',
  props<{ detail: any; position: number }>()
);

// export const addAllDetailsMarchandiseSuccess = createAction(
//   '[Reservation] Add Details Marchandise Action Success',
//   props<{ details: any }>()
// );

export const deleteDetailsMarchandiseSuccess = createAction(
  '[Reservation] Delete Details Marchandise Action Success',
  props<{ position: number }>()
);

export const deletePointChargementSuccess = createAction(
  '[Reservation] Delete Point chargement Action Success',
  props<{ position: number }>()
);

export const deletePointDechargementSuccess = createAction(
  '[Reservation] Delete Point dechargement Action Success',
  props<{ indexDestinataire: number; indexAddress: number }>()
);

export const deleteEnvoiSuccess = createAction(
  '[Reservation] Delete Envoi Action Success',
  props<{
    indexDestinataire: number;
    indexDechargement: number;
    indexEnvoi: number;
  }>()
);

export const deleteRetourSuccess = createAction(
  '[Reservation] Delete Retour Action Success',
  props<{
    indexDestinataire: number;
    indexDechargement: number;

    indexRetour: number;
    deleteAll?: boolean; // Add '?' to make it optional
  }>()
);

export const deleteServiceSuccess = createAction(
  '[Reservation] Delete Service Action Success',
  props<{ position: number }>()
);

export const deleteVehiculeSuccess = createAction(
  '[Reservation] Delete Vehicule Action Success',
  props<{ position: number }>()
);

export const getDemandes = createAction('[Reservation] Get Demandes Action');
export const getDemandesSuccess = createAction(
  '[Reservation] Get Demandes Action Success',
  props<{ demandes: any[] }>()
);


export const updateDemande = createAction(
  '[Reservation] update Demande Action',
  props<{ data: any , uuid }>()
);

export const addDemande = createAction(
  '[Reservation] add Demande Action',
  props<{ data: any }>()
);
export const addDemandeSuccess = createAction(
  '[Reservation] add Demande  Action Success',
  props<{ demande: any }>()
);

export const addNbrPalettesGlobal = createAction(
  '[Reservation] Add Nbr Palettes global Action Success',
  props<{ nbrPalettesG: number }>()
);

export const addNbrPalettesG = createAction(
  '[Reservation] Add Nbr Palettes global for details Action Success',
  props<{ nbrPalettesG: number }>()
);

export const restoreNbrPalettesG = createAction(
  '[Reservation] restore Nbr Palettes global for details Action Success',
  props<{ nbrPalettesG: number }>()
);

export const restorePoidsG = createAction(
  '[Reservation] restore poids global for details Action Success',
  props<{ poidsG: number }>()
);

export const restoreVolumeG = createAction(
  '[Reservation] restore volume global for details Action Success',
  props<{ volumeG: number }>()
);

export const updateNbrPalettesG = createAction(
  '[Reservation] update Nbr Palettes global Action Success',
  props<{ newNbrPalettesG: number }>()
);

export const updateNbrPalettesDetailsMarchandiseSuccess = createAction(
  '[Reservation] update Nbr Palettes Details Marchandise Action Success'
);

export const currentNbrPalettesG = createAction(
  '[Reservation] update current Nbr Palettes Action Success',
  props<{ currentNbrPalettes: number }>()
);

export const addTotalPalettesEnvoi = createAction(
  '[Reservation] add Total Palettes Envoi Action Success',
  props<{ nbrPalettes: number }>()
);
export const updateTotalPalettesEnvoi = createAction(
  '[Reservation] update Total Palettes Envoi Action Success',
  props<{ nbrPalettes: number }>()
);

export const restoreTotalPalettesEnvoi = createAction(
  '[Reservation] restore nbr Palettes Envoi Action Success',
  props<{ nbrPalettes: number }>()
);

export const resetNbrPalettesG = createAction(
  '[Reservation] reset Nbr Palettes global Action Success'
);

export const addpoidsG = createAction(
  '[Reservation] Add poids global Action Success',
  props<{ poidsG: number }>()
);

export const updatePoidsG = createAction(
  '[Reservation] update Poids global Action Success',
  props<{ newPoidsG: number }>()
);

export const addvolumeG = createAction(
  '[Reservation] Add volume global Action Success',
  props<{ volumeG: number }>()
);

export const updateVolumeG = createAction(
  '[Reservation] update Volume global Action Success',
  props<{ newVolumeG: number }>()
);

export const addValeurDeclareG = createAction(
  '[Reservation] Add valeur declare global Action Success',
  props<{ valeurDeclareG: number }>()
);

export const addEnvoiData = createAction(
  '[Reservation] Add Envoi Data Action Success',
  props<{
    envoi: any;
    indexDestinataire: number;
    indexDechargement: number;
    indexEnvoi: number;
  }>()
);

export const addRetourData = createAction(
  '[Reservation] Add Retour Data Action Success',
  props<{
    retour: any;
    indexDestinataire: number;
    indexDechargement: number;
    indexRetour: number;
  }>()
);

export const getReservationFailure = createAction(
  '[Reservation] Get Reservation Action Error',
  props<{ action: string; error: any }>()
);

export const successfulAction = createAction('[Action] successful Action');


export const restoreStatus = createAction('[Action] Restore Status Action')
