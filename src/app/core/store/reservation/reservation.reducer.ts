import { createReducer, on } from '@ngrx/store';
import { cloneDeep } from 'lodash';

import {
  // addAllDetailsMarchandiseSuccess,
  addDemande,
  addDemandeSuccess,
  addDetailsMarchandiseSuccess,
  addEnvoiData,
  addNbrPalettesG,
  addNbrPalettesGlobal,
  addRetourData,
  addValeurDeclareG,
  addpoidsG,
  addvolumeG,
  currentNbrPalettesG,
  deleteDestinataireSuccess,
  deleteDetailsMarchandiseSuccess,
  deleteEnvoiSuccess,
  deletePointChargementSuccess,
  deletePointDechargementSuccess,
  deleteRetourSuccess,
  deleteServiceSuccess,
  deleteVehiculeSuccess,
  getCurrentStepSuccess,
  getDateReservation,
  getDateReservationSuccess,
  getDemandes,
  getDemandesSuccess,
  getDestinataire,
  getDestinataireInfos,
  getDestinataireInfosSuccess,
  getDestinataireSuccess,
  getDetailsMarchandiseSuccess,
  getExpediteurSuccess,
  getMarchandise,
  getMarchandiseSuccess,
  getModePort,
  getModePortSuccess,
  getPointChargement,
  getPointChargementSuccess,
  getReservationFailure,
  getVehiculeServices,
  getVehiculeServicesSuccess,
  getVehicules,
  getVehiculesSuccess,
  reservationInit,
  resetNbrPalettesG,
  restoreNbrPalettesG,
  restorePoidsG,
  restoreStatus,
  restoreTotalPalettesEnvoi,
  restoreVolumeG,
  updateNbrPalettesDetailsMarchandiseSuccess,
  updateNbrPalettesG,
  updatePoidsG,
  updateTotalPalettesEnvoi,
  updateVolumeG,
} from './reservation.actions';
import { initialReservationState } from './reservation.state';

export const reservationReducer = createReducer(
  initialReservationState,

  on(reservationInit, () => initialReservationState),

  on(getDateReservation, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(getDateReservationSuccess, (state, { dateReservation  , affretment_type_id}) => ({
    ...state,
    dateReservation: dateReservation,
    type_affretment_id : affretment_type_id,
    loading: false,
    status: 'SUCCESS',
    error: null,
  })),

  on(getDestinataire, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(getDestinataireSuccess, (state, { destinataire }) => {
    console.warn("getDestinataireSuccess action triggered:", destinataire);

    return {
      ...state,
      destinataire: destinataire,
      loading: false,
      status: 'SUCCESS',
      error: null
    };
  }),

  on(deleteDestinataireSuccess, (state, { position }) => {
    const newArray = Object.assign([], state.destinataire?.destinataires);
    if (newArray.length > 0) {
      newArray?.splice(position, 1);
    }
    const newdDestinataireInfos: any = {
      ...state.destinataire_infos,
    };

    let updatedDestinataires_infos = {};

    if (Object.keys(newdDestinataireInfos).length !== 0) {
      const updatedDestinatairesData = [
        ...newdDestinataireInfos.destinatairesData?.slice(0, position),
        ...newdDestinataireInfos.destinatairesData?.slice(position + 1),
      ];
      const updatedcheckedStates = [
        ...newdDestinataireInfos.checkedStates?.slice(0, position),
        ...newdDestinataireInfos.checkedStates?.slice(position + 1),
      ];

      updatedDestinataires_infos = {
        ...newdDestinataireInfos,
        destinatairesData: updatedDestinatairesData,
        checkedStates: updatedcheckedStates,
      };
    } else {
      updatedDestinataires_infos = { ...state.destinataire_infos };
    }

    let EnvoiData = { ...state.EnvoiData };
    if (EnvoiData[position]) {
      delete EnvoiData[position];
      const sortedKeys1 = Object.keys(EnvoiData).sort(
        (a: any, b: any) => a - b
      );
      const newEnvoiData: any = {};
      sortedKeys1.forEach((key, index) => {
        newEnvoiData[index] = EnvoiData[key];
      });
      EnvoiData = newEnvoiData;
    }
    let retourData = { ...state.RetourData };
    if (retourData[position]) {
      delete retourData[position];
      const sortedKeys2 = Object.keys(retourData).sort(
        (a: any, b: any) => a - b
      );
      const newRetourData: any = {};
      sortedKeys2.forEach((key, index) => {
        newRetourData[index] = retourData[key];
      });
      retourData = newRetourData;
    }

    return {
      ...state,
      destinataire: { destinataires: newArray },
      destinataire_infos: updatedDestinataires_infos,
      EnvoiData: EnvoiData,
      RetourData: retourData,
      loading: false,
      status: 'SUCCESS',
      error: null,
    };
  }),


  on(getExpediteurSuccess, (state, { expediteur }) => {
    console.warn("getExpediteurSuccess action triggered:", expediteur);

    return {
      ...state,
      expediteur: expediteur,
      loading: false,
      status: 'SUCCESS',
      error: null,
    };
  }),
  

  on(
    deletePointDechargementSuccess,
    (state, { indexDestinataire, indexAddress }) => {
      console.log(state.destinataire_infos.destinatairesData);

      const newdDestinataireInfos: any =
        state.destinataire_infos.destinatairesData !== undefined
          ? { ...state.destinataire_infos }
          : '';

      const updatedDestinatairesData = [
        ...newdDestinataireInfos?.destinatairesData?.slice(
          0,
          indexDestinataire
        ),
        {
          ...newdDestinataireInfos?.destinatairesData[indexDestinataire],
          pointsGeoArray: newdDestinataireInfos?.destinatairesData[
            indexDestinataire
          ].pointsGeoArray
            ? [
                ...newdDestinataireInfos?.destinatairesData[
                  indexDestinataire
                ].pointsGeoArray?.slice(0, indexAddress),
                ...newdDestinataireInfos.destinatairesData[
                  indexDestinataire
                ].pointsGeoArray?.slice(indexAddress + 1),
              ]
            : undefined,
        },
        ...newdDestinataireInfos.destinatairesData?.slice(
          indexDestinataire + 1
        ),
      ];

      const updatedDestinataires_infos = {
        ...newdDestinataireInfos,
        destinatairesData: updatedDestinatairesData,
      };

      return {
        ...state,
        destinataire_infos: updatedDestinataires_infos,
        loading: false,
        status: 'SUCCESS',
        error: null,
      };
    }
  ),

  on(getMarchandise, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(getMarchandiseSuccess, (state, { marchandise }) => ({
    ...state,
    marchandise: marchandise,
    loading: false,
    status: 'SUCCESS',
    error: null,
  })),

  on(getPointChargement, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(getPointChargementSuccess, (state, { point_Chargement }) => ({
    ...state,
    point_Chargement: point_Chargement,
    loading: false,
    status: 'SUCCESS',
    error: null,
  })),

  on(getDestinataireInfos, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(getDestinataireInfosSuccess, (state, { destinataire_infos }) => ({
    ...state,
    destinataire_infos: destinataire_infos,
    loading: false,
    status: 'SUCCESS',
    error: null,
  })),

  on(getModePort, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(getModePortSuccess, (state, { modePort }) => ({
    ...state,
    modePort: modePort,
    loading: false,
    status: 'SUCCESS',
    error: null,
  })),

  on(getVehiculeServices, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(getVehiculeServicesSuccess, (state, { vehicule_services }) => {
    console.warn('Vehicule Services Data:', vehicule_services); // Add this line to log the data
    return {
      ...state,
      vehicule_services: vehicule_services,
      loading: false,
      status: 'SUCCESS',
      error: null,
    };
  }),
  
  on(deleteVehiculeSuccess, (state, { position }) => {
    const newArray: any[] = Object.assign(
      [],
      state.vehicule_services.vehicules
    );
    newArray?.splice(position, 1);

    return {
      ...state,
      vehicule_services: {
        vehicules: newArray,
        services: [...state.vehicule_services.services],
      },
      loading: false,
      status: 'SUCCESS',
      error: null,
    };
  }),

  on(deleteServiceSuccess, (state, { position }) => {
    const newArray: any[] = Object.assign([], state.vehicule_services.services);

    newArray?.splice(position, 1);

    return {
      ...state,
      vehicule_services: {
        vehicules: [...state.vehicule_services.vehicules],
        services: newArray,
      },
      loading: false,
      status: 'SUCCESS',
      error: null,
    };
  }),

  on(getVehicules, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(getVehiculesSuccess, (state, { vehicules }) => ({
    ...state,
    vehicules: vehicules,
    loading: false,
    status: 'SUCCESS',
    error: null,
  })),

  on(getDemandes, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(getDemandesSuccess, (state, { demandes }) => ({
    ...state,
    demandes: demandes,
    loading: false,
    status: 'SUCCESS',
    error: null,
  })),

  on(addDemande, (state) => ({
    ...state,
    loading: true,
    status: 'LOADING',
    error: null,
  })),
  on(addDemandeSuccess, (state, { demande }) => ({
    ...state,
    demandes: [...state.demandes, demande],
    uuid: demande.uuid,
    loading: false,
    status: 'SUCCESS',
    error: null,
  })),

  on(getReservationFailure, (state, { action, error }) => ({
    ...state,
    loading: false,
    status: 'ERROR',
    error: { action, error },
  })),

  on(getCurrentStepSuccess, (state, { currentStep, edit_mode }) => ({
    ...state,
    currentStep: currentStep,
    edit_mode: edit_mode || state.edit_mode,
    loading: false,
    status: 'SUCCESS',
    error: null,
  })),

  on(getDetailsMarchandiseSuccess, (state, { detailsMarchandise }) => ({
    ...state,
    detailsMarchandise: detailsMarchandise,
    loading: false,
    status: 'SUCCESS',
    error: null,
  })),

  on(addDetailsMarchandiseSuccess, (state, { detail, position }) => {
    const newArray = [...state.detailsMarchandise];
    newArray.splice(position, 1, detail);
    // if (Array.isArray(newArray[position])) {
    //   newArray[position].push(detail);
    // } else {
    //   newArray[position] = [detail];
    // }
    return {
      ...state,
      detailsMarchandise: newArray,
      loading: false,
      status: 'SUCCESS',
      error: null,
    };
  }),

  on(updateNbrPalettesDetailsMarchandiseSuccess, (state) => {
    const array = [...state.detailsMarchandise];
    console.log(array);
    const newArray =
      array.length > 0
        ? array.map((item) => ({ ...item, nbr_palettes: '0' }))
        : [];

    // if (Array.isArray(newArray[position])) {
    //   newArray[position].push(detail);
    // } else {
    //   newArray[position] = [detail];
    // }
    console.log(newArray);
    return {
      ...state,
      detailsMarchandise: newArray,
      loading: false,
      status: 'SUCCESS',
      error: null,
    };
  }),

  // on(addAllDetailsMarchandiseSuccess, (state, { details }) => {
  //   const newDetails = details?.map((e: any) => e.details[0]);
  //   return {
  //     ...state,
  //     detailsMarchandise: [...newDetails],
  //     loading: false,
  //     status: 'SUCCESS',
  //     error: null,
  //   };
  // }),

  on(deleteDetailsMarchandiseSuccess, (state, { position }) => {
    // const newArray = [...state.detailsMarchandise];
    const newArray = Object.assign([], state.detailsMarchandise);

    newArray.splice(position, 1);
    return {
      ...state,
      detailsMarchandise: newArray,
      loading: false,
      status: 'SUCCESS',
      error: null,
    };
  }),

  on(deletePointChargementSuccess, (state, { position }) => {
    //  const newArray = [...state.point_Chargement];
    const newArray = Object.assign([], state.point_Chargement);

    newArray.splice(position, 1);

    return {
      ...state,
      point_Chargement: newArray,
      loading: false,
      status: 'SUCCESS',
      error: null,
    };
  }),

  on(addNbrPalettesGlobal, (state, { nbrPalettesG }) => {
    return {
      ...state,
      nbrPalettesG: nbrPalettesG,
      nbrPalettesGInitial: nbrPalettesG,
      totalPalettesEnvoi: nbrPalettesG,
      loading: false,
      status: 'SUCCESS',
      error: null,
    };
  }),
  on(addNbrPalettesG, (state, { nbrPalettesG }) => {
    return {
      ...state,
      nbrPalettesG: nbrPalettesG,
      loading: false,
      status: 'SUCCESS',
      error: null,
    };
  }),

  on(restoreNbrPalettesG, (state, { nbrPalettesG }) => {
    return {
      ...state,
      nbrPalettesG: state.nbrPalettesG + nbrPalettesG,
      loading: false,
      status: 'SUCCESS',
      error: null,
    };
  }),

  on(restorePoidsG, (state, { poidsG }) => {
    return {
      ...state,
      poidsG: state.poidsG + poidsG,
      loading: false,
      status: 'SUCCESS',
      error: null,
    };
  }),

  on(restoreVolumeG, (state, { volumeG }) => {
    return {
      ...state,
      volumeG: state.volumeG + volumeG,
      loading: false,
      status: 'SUCCESS',
      error: null,
    };
  }),

  on(updateNbrPalettesG, (state, { newNbrPalettesG }) => {
    return {
      ...state,
      nbrPalettesG: state.nbrPalettesG - newNbrPalettesG,
      loading: false,
      status: 'SUCCESS',
      error: null,
    };
  }),

  on(updateTotalPalettesEnvoi, (state, { nbrPalettes }) => {
    return {
      ...state,
      totalPalettesEnvoi: state.totalPalettesEnvoi - nbrPalettes,
      loading: false,
      status: 'SUCCESS',
      error: null,
    };
  }),

  on(restoreTotalPalettesEnvoi, (state, { nbrPalettes }) => {
    const restoreNbrPalettes =
      Number(state.totalPalettesEnvoi) + Number(nbrPalettes);
    return {
      ...state,
      totalPalettesEnvoi: restoreNbrPalettes,
      loading: false,
      status: 'SUCCESS',
      error: null,
    };
  }),

  on(resetNbrPalettesG, (state) => {
    return {
      ...state,
      nbrPalettesG: state.nbrPalettesGInitial,
      poidsG: state.poidsGInitial,
      loading: false,
      status: 'SUCCESS',
      error: null,
    };
  }),

  on(currentNbrPalettesG, (state) => {
    return {
      ...state,
      currentNbrPalettesG: state.currentNbrPalettesG,
      loading: false,
      status: 'SUCCESS',
      error: null,
    };
  }),

  on(addpoidsG, (state, { poidsG }) => {
    return {
      ...state,
      poidsG: poidsG,
      poidsGInitial: poidsG,
      loading: false,
      status: 'SUCCESS',
      error: null,
    };
  }),

  on(updatePoidsG, (state, { newPoidsG }) => {
    return {
      ...state,
      poidsG: state.poidsG - newPoidsG,
      loading: false,
      status: 'SUCCESS',
      error: null,
    };
  }),

  on(addvolumeG, (state, { volumeG }) => {
    return {
      ...state,
      volumeG: volumeG,
      volumeGInitial: volumeG,
      loading: false,
      status: 'SUCCESS',
      error: null,
    };
  }),

  on(updateVolumeG, (state, { newVolumeG }) => {
    return {
      ...state,
      volumeG: state.volumeG - newVolumeG,
      loading: false,
      status: 'SUCCESS',
      error: null,
    };
  }),

  on(addValeurDeclareG, (state, { valeurDeclareG }) => {
    const newvaleurDeclareG =
      state.valeurDeclareG === 0 ? valeurDeclareG : valeurDeclareG;

    return {
      ...state,
      valeurDeclareG: newvaleurDeclareG,
      loading: false,
      status: 'SUCCESS',
      error: null,
    };
  }),


  on(restoreStatus , (state) => {
    return {
    ...state,
    status : 'INIT'
    }
  }),

  // on(addEnvoiData, (state, { envoi, indexDestinataire, indexEnvoi }) => {
  //   console.log('reducer', envoi, indexDestinataire, indexEnvoi);

  //   const newArray = [...state.EnvoiData[indexDestinataire]];

  //   console.log('---------->', newArray);
  //   newArray.splice(indexEnvoi, 1, envoi);

  //   const newEnvoiData = [...state.EnvoiData];
  //   newEnvoiData[indexDestinataire] = newArray;

  //   return {
  //     ...state,
  //     EnvoiData: newEnvoiData,
  //     loading: false,
  //     status: 'SUCCESS',
  //     error: null,
  //   };
  // }),

  on(
    addEnvoiData,
    (state, { envoi, indexDestinataire, indexDechargement, indexEnvoi }) => {
      return {
        ...state,
        EnvoiData: {
          ...state.EnvoiData,
          [indexDestinataire]: {
            ...(state.EnvoiData[indexDestinataire] || {}),
            [indexDechargement]: {
              ...(state.EnvoiData[indexDestinataire]?.[indexDechargement] ||
                {}),
              [indexEnvoi]: envoi,
            },
          },
        },
        loading: false,
        status: 'SUCCESS',
        error: null,
      };
    }
  ),

  on(
    deleteEnvoiSuccess,
    (state, { indexDestinataire, indexDechargement, indexEnvoi }) => {
      const newdDestinataireInfos = JSON.parse(
        JSON.stringify(state.destinataire_infos)
      );

      const destinatairesData = newdDestinataireInfos?.destinatairesData;
      if (destinatairesData) {
        const destinataire = destinatairesData[indexDestinataire];
        if (destinataire) {
          const pointsGeoArray = destinataire.pointsGeoArray;
          if (pointsGeoArray) {
            const envoisFormArray =
              pointsGeoArray[indexDechargement]?.envoisFormArray;
            if (envoisFormArray instanceof Array) {
              envoisFormArray.splice(indexEnvoi, 1);
            }
          }
        }
      }

      const EnvoiData = state.EnvoiData;
      const envoiDataArray =
        Object.keys(EnvoiData).length > 0
          ? Object.values(EnvoiData).map((outerObj) =>
              Object.values(outerObj).map((innerObj) => Object.values(innerObj))
            )
          : undefined;

      if (
        envoiDataArray &&
        envoiDataArray[indexDestinataire] &&
        envoiDataArray[indexDestinataire][indexDechargement]
      ) {
        envoiDataArray[indexDestinataire][indexDechargement].splice(
          indexEnvoi,
          1
        );
      } else {
        console.log('Undefined index:', indexDestinataire, indexDechargement);
      }

      const newEnvoiData = envoiDataArray.reduce((acc, curr, index) => {
        acc[index] = curr.reduce((innerAcc, innerCurr, innerIndex) => {
          innerAcc[innerIndex] = { ...innerCurr };
          return innerAcc;
        }, {});
        return acc;
      }, {});

      return {
        ...state,
        EnvoiData: newEnvoiData,
        destinataire_infos: newdDestinataireInfos,
        loading: false,
        status: 'SUCCESS',
        error: null,
      };
    }
  ),

  /*
  on(
    deleteEnvoiSuccess,
    (state, { indexDestinataire, indexDechargement, indexEnvoi }) => {
      const newdDestinataireInfos: any = {
        ...state.destinataire_infos,
      };

      const updatedDestinatairesData =
        newdDestinataireInfos?.destinatairesData?.length > 0
          ? [
              ...newdDestinataireInfos.destinatairesData.slice(
                0,
                indexDestinataire
              ),
              {
                ...newdDestinataireInfos?.destinatairesData[indexDestinataire],
                envoisFormArray: newdDestinataireInfos?.destinatairesData[
                  indexDestinataire
                ].envoisFormArray
                  ? [
                      ...newdDestinataireInfos?.destinatairesData[
                        indexDestinataire
                      ].envoisFormArray?.slice(0, indexEnvoi),
                      ...newdDestinataireInfos.destinatairesData[
                        indexDestinataire
                      ].envoisGeoArray?.slice(indexEnvoi + 1),
                    ]
                  : [],
              },
              ...newdDestinataireInfos.destinatairesData?.slice(
                indexDestinataire + 1
              ),
            ]
          : undefined;

      const updatedDestinataires_infos = {
        ...newdDestinataireInfos,
        destinatairesData: updatedDestinatairesData || [],
      };

      const EnvoiData = state.EnvoiData;
      console.log(EnvoiData);
      const envoiDataArray =
        Object.keys(EnvoiData).length > 0
          ? Object.keys(EnvoiData).map((key) =>
              Object.keys(EnvoiData[key]).map(
                (innerKey) => EnvoiData[key][innerKey]
              )
            )
          : undefined;
      envoiDataArray[indexDestinataire]
        ? envoiDataArray[indexDestinataire].splice(indexEnvoi, 1)
        : console.log('undefined index :', indexEnvoi);

      const newEnvoidata = envoiDataArray.reduce((acc, curr, index) => {
        acc[index] = curr.reduce((innerAcc, innerCurr, innerIndex) => {
          innerAcc[innerIndex] = innerCurr;
          return innerAcc;
        }, {});
        return acc;
      }, {});

      return {
        ...state,
        destinataire_infos: updatedDestinataires_infos,
        EnvoiData: newEnvoidata,
        loading: false,
        status: 'SUCCESS',
        error: null,
      };
    }
  ),*/

  on(
    addRetourData,
    (state, { retour, indexDestinataire, indexDechargement, indexRetour }) => {
      return {
        ...state,
        RetourData: {
          ...state.RetourData,
          [indexDestinataire]: {
            ...(state.RetourData[indexDestinataire] || {}),
            [indexDechargement]: {
              ...(state.RetourData[indexDestinataire]?.[indexDechargement] ||
                {}),
              [indexRetour]: retour,
            },
          },
        },
        loading: false,
        status: 'SUCCESS',
        error: null,
      };
    }
  ),

  on(
    deleteRetourSuccess,
    (
      state,
      { indexDestinataire, indexDechargement, indexRetour, deleteAll = true }
    ) => {
      const newdDestinataireInfos = cloneDeep(state.destinataire_infos);

      //
      console.log('delete All', deleteAll);
      const destinatairesData = newdDestinataireInfos?.destinatairesData;
      if (destinatairesData) {
        const destinataire = destinatairesData[indexDestinataire];
        if (destinataire) {
          const pointsGeoArray = destinataire.pointsGeoArray;
          if (pointsGeoArray) {
            const retoursFormArray =
              pointsGeoArray[indexDechargement]?.retoursFormArray;
            if (retoursFormArray instanceof Array) {
              console.log('retoursFormArray', retoursFormArray);
              if (deleteAll) {
                retoursFormArray.splice(indexRetour, 1);
              } else {
                const retour = retoursFormArray[indexRetour];

                console.log('retoru before ', retour);
                if (retour) {
                  retour.palettes_retour = {};
                  console.log('retour after', retour);
                }
              }
            }
          }
        }
      }

      const retourData = state.RetourData;

      const retourDataArray =
        Object.keys(retourData).length > 0
          ? Object.values(retourData).map((outerObj) =>
              Object.values(outerObj).map((innerObj) => Object.values(innerObj))
            )
          : undefined;

      console.log('dataArray', retourDataArray);

      if (
        retourDataArray &&
        retourDataArray[indexDestinataire] &&
        retourDataArray[indexDestinataire][indexDechargement]
      ) {
        if (deleteAll) {
          retourDataArray[indexDestinataire][indexDechargement].splice(
            indexRetour,
            1
          );
        } else {
          let retour =
            retourDataArray[indexDestinataire][indexDechargement][indexRetour];

          console.log('retoru before', retour);
          if (retour) {
            let newretour = {
              palettes_retour: {},
              palettes_additionel: retour.palettes_additionel,
            };

            retour = newretour;
            console.log('retour after', retour);
          }
        }
      }

      const newRetourdata = retourDataArray.reduce((acc, curr, index) => {
        acc[index] = curr.reduce((innerAcc, innerCurr, innerIndex) => {
          innerAcc[innerIndex] = { ...innerCurr };
          return innerAcc;
        }, {});
        return acc;
      }, {});

      return {
        ...state,
        destinataire_infos: newdDestinataireInfos,
        RetourData: newRetourdata,
        loading: false,
        status: 'SUCCESS',
        error: null,
      };
    }
  )

  //
);

function isElementExists(array: any[][], i: number, j: number): boolean {
  // Check if the first dimension (i) exists
  if (array[i] !== undefined) {
    // Check if the second dimension (j) exists
    if (array[i][j] !== undefined) {
      return true; // Element exists at (i, j)
    }
  }
  return false; // Element doesn't exist at (i, j)
}

function deleteItemObject(
  dataObjects: any,
  i: number,
  j: number,
  k: number
): any {
  // Check if the specified indexes exist in the dataObjects
  if (
    dataObjects.hasOwnProperty(i) &&
    dataObjects[i].hasOwnProperty(j) &&
    dataObjects[i][j].hasOwnProperty(k)
  ) {
    // Remove the item at the specified position
    const updatedDataObjects = { ...dataObjects }; // Create a shallow copy of dataObjects

    updatedDataObjects[i][j].splice(k, 1);

    // Reorganize the indexes
    let newIndex = 0;
    const newDataObjects: any = {};
    for (const x in updatedDataObjects) {
      if (updatedDataObjects.hasOwnProperty(x)) {
        newDataObjects[x] = {};
        let newIndexY = 0;
        for (const y in updatedDataObjects[x]) {
          if (updatedDataObjects[x].hasOwnProperty(y)) {
            newDataObjects[x][newIndexY] = {};
            let newIndexZ = 0;
            for (const z in updatedDataObjects[x][y]) {
              if (updatedDataObjects[x][y].hasOwnProperty(z)) {
                newDataObjects[x][newIndexY][newIndexZ] =
                  updatedDataObjects[x][y][z];
                newIndexZ++;
              }
            }
            newIndexY++;
          }
        }
      }
      newIndex++;
    }

    return newDataObjects;
  }

  return dataObjects;
}
