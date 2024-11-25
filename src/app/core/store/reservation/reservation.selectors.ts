import { createSelector } from '@ngrx/store';
import { AppState } from '../app.states';
import { ReservationState } from './reservation.state';

export const appSelectReservation = (state: AppState) => state.reservation;

export const selectReservationDestinataire = createSelector(
  appSelectReservation,
  (state: ReservationState) => ({ destinataireList: state.destinataire })
);
export const selectReservationExpediteur = createSelector(
  appSelectReservation,
  (state: ReservationState) => ({ expediteur: state.expediteur })
);
export const selectReservationVehicules = createSelector(
  appSelectReservation,
  (state: ReservationState) => ({ vehicules: state.vehicules })
);
export const selectReservationData = createSelector(
  appSelectReservation,
  (state: ReservationState) => ({ state })
);

export const selectReservationDate = createSelector(
  appSelectReservation,
  (state: ReservationState) => ({ dateReservation: state.dateReservation })
);


export const selectTypeAffretment = createSelector(
  appSelectReservation,
  (state: ReservationState) => ( state.type_affretment_id )
);

export const selectDemandesReservation = createSelector(
  appSelectReservation,
  (state: ReservationState) => ({ demandes: state.demandes })
);

export const checkStatusAfterAddReservation = createSelector(
  appSelectReservation,
  (state: ReservationState) => ({
    status: state.status,
  })
);

export const SelectdetailsMarchandiseReservation = createSelector(
  appSelectReservation,
  (state: ReservationState) => ({
    detailsMarchandise: state.detailsMarchandise,
  })
);

export const SelectTotalPalettesEnvoi = createSelector(
  appSelectReservation,
  (state: ReservationState) => ({
    totalPalettesEnvoi: state.totalPalettesEnvoi,
  })
);

export const SelectEnvoiDataReservation = createSelector(
  appSelectReservation,
  (state: ReservationState) => ({
    envoiData: state.EnvoiData,
  })
);

export const SelectRetourDataReservation = createSelector(
  appSelectReservation,
  (state: ReservationState) => ({
    retourData: state.RetourData,
  })
);

export const SelectLoaderReservation = createSelector(
  appSelectReservation,
  (state: ReservationState) => ({
    loading: state.loading,
  })
);

export const SelectStatusReservation = createSelector(
  appSelectReservation,
  (state: ReservationState) => ({
    status: state.status,
  })
);

// export const SelectLoaderReservation = createSelector(
//   appSelectReservation,
//   (state: ReservationState) => state.loading
// );


export const SelectCurrentDemandeUUID = createSelector(
  appSelectReservation,
  (state: ReservationState) => state.uuid
);


export const SelectNbrPalttesGReservation = createSelector(
  appSelectReservation,
  (state: ReservationState) => ({
    nbrPalettesG: state.detailsMarchandise.reduce(
      (acc, p) => acc + Number(p.nbr_palettes),
      0
    ),
    nbrPalettesGInitial: state.nbrPalettesGInitial,
    currentNbrPalettesG: state.currentNbrPalettesG,
  })
);

export const SelectPoidsGReservation = createSelector(
  appSelectReservation,
  (state: ReservationState) => ({
    poidsG: state.detailsMarchandise.reduce(
      (acc, p) => acc + Number(p.poids),
      0
    ),
    poidsGInitial: state.poidsGInitial,
  })
);

export const SelectVolumeGReservation = createSelector(
  appSelectReservation,
  (state: ReservationState) => ({
    volumeG: state.detailsMarchandise.reduce(
      (acc, p) => acc + Number(p.volume),
      0
    ),
    volumeGInitial: state.volumeGInitial,
  })
);

export const SelectValeurDeclareGReservation = createSelector(
  appSelectReservation,
  (state: ReservationState) => ({
    valeurDeclareG: state.detailsMarchandise.reduce(
      (acc, p) => acc + Number(p.valeur_declaree),
      0
    ),
  })
);
