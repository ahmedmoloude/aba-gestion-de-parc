export interface IndexData {
  [i: number]: {
    [j: number]: {
      [k: number]: any;
    };
  };
}

export interface ReservationState {
  dateReservation: any;
  destinataire: any;
  expediteur:any;
  marchandise: any;
  point_Chargement: any;
  destinataire_infos: any;
  modePort: any;
  vehicule_services: any;
  vehicules: any;
  detailsMarchandise: any[];
  currentStep: number;
  demandes: any[];
  nbrPalettesGInitial: number;
  poidsGInitial: number;
  volumeGInitial: number;
  nbrPalettesG: number;
  poidsG: number;
  volumeG: number;
  valeurDeclareG: number;
  currentNbrPalettesG: number;
  EnvoiData: IndexData;
  totalPalettesEnvoi: number;
  RetourData: IndexData;
  edit_mode: boolean;
  loading: boolean;
  error: {
    action: string;
    error: any;
  } | null;
  status: 'INIT' | 'LOADING' | 'SUCCESS' | 'ERROR';
  uuid?: string | null;
  type_affretment_id : number | null;
}

export const initialReservationState: ReservationState = {
  type_affretment_id : null,
  dateReservation: {},
  destinataire: {},
  expediteur:{},
  marchandise: {},
  point_Chargement: {},
  destinataire_infos: {},
  modePort: {},
  vehicule_services: {},
  vehicules: {},
  detailsMarchandise: [],
  currentStep: 0,
  nbrPalettesGInitial: 0,
  poidsGInitial: 0,
  volumeGInitial: 0,
  nbrPalettesG: 0,
  currentNbrPalettesG: undefined || 0,
  poidsG: 0,
  volumeG: 0,
  valeurDeclareG: 0,
  totalPalettesEnvoi: 0,
  EnvoiData: {},
  edit_mode: false,
  // EnvoiData: [
  //   [
  //     { id: '1', position: 'text' },
  //     { id: '2', position: 'text' },
  //   ],
  //   [{ id: '3', position: 'text' }],
  //   [{ id: '4', position: 'text' }],
  // ],

  RetourData: {},
  demandes: [],
  loading: false,
  error: { action: '', error: null },
  status: 'INIT',
};
