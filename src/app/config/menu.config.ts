import { environment } from './../../environments/environment';
// Liste des menus pour les titre, sidebar et breadcrumb
import { ROUTES } from './routes.config';

export const MENU = [
      {
        label: 'Gestion des véhicules',
        routeName: null,
        isMenu: true,
        items: [
          {
            label: 'Véhicules',
            routeName: ROUTES['listvehicules'].name,
            isMenu: true
          },
          {
            label: 'Statuts véhicules',
            routeName: ROUTES['status'].name,
            isMenu: true
          },
          {
            label: 'Détails véhicules',
            routeName: ROUTES['detailsvehicule'].name,
            isMenu: true
          },
          {
            label: 'Documents',
            routeName: ROUTES['documents'].name,
            isMenu: true
          },
          {
            label: 'Véhicule de remplacement',
            routeName: ROUTES['vehiculeremplacement'].name,
            isMenu: true
          },
          {
            label: 'GPS',
            routeName: ROUTES['gps'].name,
            isMenu: true
          },
          {
            label: 'Extincteur',
            routeName: ROUTES['extincteur'].name,
            isMenu: true
          }
        ]
      },
      {
        label: 'Gestion des personnels',
        routeName: ROUTES['gestionpersonnel'].name,
        isMenu: true
      },
      {
        label: 'Gestion maintenance',
        routeName: null,
        isMenu: true,
        items: [
          {
            label: 'Liste des interventions',
            routeName: ROUTES['listeinterventions'].name,
            isMenu: true
          },
          {
            label: 'Pièces de rechange',
            routeName: ROUTES['piecesrechange'].name,
            isMenu: true
          },
          {
            label: 'Demande de pièces',
            routeName: ROUTES['demande_pieces'].name,
            isMenu: true
          },
          {
            label: 'Pneumatique',
            routeName: ROUTES['pneumatique'].name,
            isMenu: true
          },
          {
            label: 'Planning',
            routeName: ROUTES['planning'].name,
            isMenu: true
          }
        ]
      },
      {
        label: 'Demande d\'intervention',
        routeName: ROUTES['demandeintervention'].name,
        isMenu: true
      },
      {
        label: 'Liste des cartes',
        routeName: ROUTES['listecartes'].name,
        isMenu: true
      },
      {
        label: 'Feuille de route',
        routeName: null,
        isMenu: true,
        items: [
          {
            label: 'Gestion des disponibilités',
            routeName: ROUTES['gestiondisponibilites'].name,
            isMenu: true
          },
          {
            label: 'Liste des feuilles de route',
            routeName: ROUTES['listefeuille'].name,
            isMenu: true
          },
          {
            label: 'Affectation',
            routeName: ROUTES['affectation'].name,
            isMenu: true
          }
        ]
      },
      {
        label: 'Consommation/Dépenses',
        routeName: null,
        isMenu: true,
        items: [
          {
            label: 'Plein et suivi d\'approvisionnement',
            routeName: ROUTES['consomationcarburant'].name,
            isMenu: true
          },
          {
            label: 'Carburant / Autoroute',
            routeName: ROUTES['depensesautoroute'].name,
            isMenu: true
          }
        ]
      },
      {
        label: 'Gestion des citernes',
        routeName: ROUTES['gestionciternes'].name,
        isMenu: true
      },
  {
    // addpersonnel
    isMenu: false,
    parentMenu: ROUTES['addpersonnel'].name,
    label: 'add personnel',
    routeName: ROUTES['addpersonnel'].name,
    icon: 'covoyage',
    icon_title: '',
    name: '',
    role: [null],
    id_group: 14,
    items: null,
    hasBtn: false,
    target: 'read',
    isCustom: true,
  },
  {
    // detailpersonnel
    isMenu: false,
    parentMenu: ROUTES['detailpersonnel'].name,
    label: 'Detail personnel',
    routeName: ROUTES['detailpersonnel'].name,
    icon: 'covoyage',
    icon_title: '',
    name: '',
    role: [null],
    id_group: 14,
    items: null,
    hasBtn: false,
    target: 'read',
    isCustom: true,
  },
  {
    // detailpersonnel
    isMenu: false,
    parentMenu: ROUTES['editpersonnel'].name,
    label: 'Detail editPersonnel',
    routeName: ROUTES['editpersonnel'].name,
    icon: 'covoyage',
    icon_title: '',
    name: '',
    role: [null],
    id_group: 14,
    items: null,
    hasBtn: false,
    target: 'read',
    isCustom: true,
  },
  // {
  //   // generationcovoyage
  //   isMenu: false,
  //   parentMenu: ROUTES['generationcovoyage'].name,
  //   label: 'Géneration d’un Convoyage',
  //   routeName: ROUTES['generationcovoyage'].name,
  //   icon: 'covoyage',
  //   icon_title: 'covoyage',
  //   name: 'Géneration d’un Convoyage',
  //   role: [null],
  //   id_group: 14,
  //   items: null,
  //   hasBtn: false,
  //   target: 'read',
  //   isCustom: true,
  // },
  // {
  //   // listdocument
  //   isMenu: false,
  //   parentMenu: ROUTES['listdocument'].name,
  //   label: 'list document',
  //   routeName: ROUTES['listdocument'].name,
  //   icon: 'covoyage',
  //   icon_title: '',
  //   name: '',
  //   role: [null],
  //   id_group: 14,
  //   items: null,
  //   hasBtn: false,
  //   target: 'read',
  //   isCustom: true,
  // },
  // {
  //   // listdocument
  //   isMenu: false,
  //   parentMenu: ROUTES['liststatusvehicule'].name,
  //   label: 'list document',
  //   routeName: ROUTES['liststatusvehicule'].name,
  //   icon: 'covoyage',
  //   icon_title: '',
  //   name: '',
  //   role: [null],
  //   id_group: 14,
  //   items: null,
  //   hasBtn: false,
  //   target: 'read',
  //   isCustom: true,
  // },
  // {
  //   // listdocument
  //   isMenu: false,
  //   parentMenu: ROUTES['listdetailsvehicule'].name,
  //   label: 'list document',
  //   routeName: ROUTES['listdetailsvehicule'].name,
  //   icon: 'covoyage',
  //   icon_title: '',
  //   name: '',
  //   role: [null],
  //   id_group: 14,
  //   items: null,
  //   hasBtn: false,
  //   target: 'read',
  //   isCustom: true,
  // },
  // {
  //   // detail remplacement
  //   isMenu: false,
  //   parentMenu: ROUTES['detailremplacement'].name,
  //   label: 'detail remplacement',
  //   routeName: ROUTES['detailremplacement'].name,
  //   icon: 'covoyage',
  //   icon_title: '',
  //   name: '',
  //   role: [null],
  //   id_group: 14,
  //   items: null,
  //   hasBtn: false,
  //   target: 'read',
  //   isCustom: true,
  // },
  // {
  //   // mouvement-stocks
  //   isMenu: false,
  //   parentMenu: ROUTES['mouvementstocks'].name,
  //   label: 'Mouvement des stocks',
  //   routeName: ROUTES['mouvementstocks'].name,
  //   icon: 'covoyage',
  //   icon_title: '',
  //   name: '',
  //   role: [null],
  //   id_group: 14,
  //   items: null,
  //   hasBtn: false,
  //   target: 'read',
  //   isCustom: true,
  // },
  // {
  //   // detailfeuille
  //   isMenu: false,
  //   parentMenu: ROUTES['detailfeuille'].name,
  //   label: 'detail feuille',
  //   routeName: ROUTES['detailfeuille'].name,
  //   icon: 'covoyage',
  //   icon_title: '',
  //   name: '',
  //   role: [null],
  //   id_group: 14,
  //   items: null,
  //   hasBtn: false,
  //   target: 'read',
  //   isCustom: true,
  // },
  // {
  //   // mouvementstockcartes
  //   isMenu: false,
  //   parentMenu: ROUTES['mouvementstockcartes'].name,
  //   label: 'Mouvement stock cartes',
  //   routeName: ROUTES['mouvementstockcartes'].name,
  //   icon: 'covoyage',
  //   icon_title: '',
  //   name: '',
  //   role: [null],
  //   id_group: 14,
  //   items: null,
  //   hasBtn: false,
  //   target: 'read',
  //   isCustom: true,
  // },
  // {
  //   // geofencing
  //   isMenu: false,
  //   parentMenu: ROUTES['geofencing'].name,
  //   label: 'Geofencing',
  //   routeName: ROUTES['geofencing'].name,
  //   icon: 'covoyage',
  //   icon_title: '',
  //   name: '',
  //   role: [null],
  //   id_group: 14,
  //   items: null,
  //   hasBtn: false,
  //   target: 'read',
  //   isCustom: true,
  // },
  // {
  //   //Générer une facture
  //   isMenu: false,
  //   parentMenu: ROUTES['genererfacture'].name,
  //   label: 'Générer une facture',
  //   routeName: ROUTES['genererfacture'].name,
  //   icon: 'facteur',
  //   icon_title: '',
  //   name: '',
  //   role: [null],
  //   id_group: 14,
  //   items: null,
  //   hasBtn: false,
  //   target: 'read',
  //   isCustom: true,
  //   parent: 'listefactures',
  // },
  // {
  //   //detail affretement facture
  //   isMenu: false,
  //   parentMenu: ROUTES['getfacture'].name,
  //   label: 'Visulaisation détaillée',
  //   routeName: ROUTES['getfacture'].name,
  //   icon: 'facteur',
  //   icon_title: '',
  //   name: '',
  //   role: [null],
  //   id_group: 14,
  //   items: null,
  //   hasBtn: false,
  //   target: 'read',
  //   isCustom: true,
  //   parent: 'listefactures',
  // },
  // {
  //   //Génération de facture
  //   isMenu: false,
  //   parentMenu: ROUTES['generationfacture'].name,
  //   label: 'Génération de facture',
  //   routeName: ROUTES['generationfacture'].name,
  //   icon: 'facteur',
  //   icon_title: '',
  //   name: '',
  //   role: [null],
  //   id_group: 14,
  //   items: null,
  //   hasBtn: false,
  //   target: 'read',
  //   isCustom: true,
  //   parent: 'listefactures',
  // },
  // {
  //   //État de contrôle
  //   isMenu: false,
  //   parentMenu: ROUTES['etatcontrole'].name,
  //   label: 'État de contrôle',
  //   routeName: ROUTES['etatcontrole'].name,
  //   icon: 'facteur',
  //   icon_title: '',
  //   name: '',
  //   role: [null],
  //   id_group: 14,
  //   items: null,
  //   hasBtn: false,
  //   target: 'read',
  //   isCustom: true,
  //   parent: 'listefactures',
  // },
  // {
  //   //detailcommerciaux
  //   isMenu: false,
  //   parentMenu: ROUTES['detailcommerciaux'].name,
  //   label: 'detail commerciaux',
  //   routeName: ROUTES['detailcommerciaux'].name,
  //   icon: 'facteur',
  //   icon_title: '',
  //   name: '',
  //   role: [null],
  //   id_group: 14,
  //   items: null,
  //   hasBtn: false,
  //   target: 'read',
  //   isCustom: true,
  //   parent: 'listefactures',
  // },
  // {
  //   //detailobjectif
  //   isMenu: false,
  //   parentMenu: ROUTES['detailobjectif'].name,
  //   label: 'detail objectif',
  //   routeName: ROUTES['detailobjectif'].name,
  //   icon: 'facteur',
  //   icon_title: '',
  //   name: '',
  //   role: [null],
  //   id_group: 14,
  //   items: null,
  //   hasBtn: false,
  //   target: 'read',
  //   isCustom: true,
  //   parent: 'listefactures',
  // },
  // {
  //   //demandepieces
  //   isMenu: false,
  //   parentMenu: ROUTES['demandepieces'].name,
  //   label: 'Demande de pièces',
  //   routeName: ROUTES['demandepieces'].name,
  //   icon: 'facteur',
  //   icon_title: '',
  //   name: '',
  //   role: [null],
  //   id_group: 14,
  //   items: null,
  //   hasBtn: false,
  //   target: 'read',
  //   isCustom: true,
  //   parent: 'listefactures',
  // },
  // {
  //   //historiquesortie
  //   isMenu: false,
  //   parentMenu: ROUTES['historiquesortie'].name,
  //   label: 'Historique des bons de sortie',
  //   routeName: ROUTES['historiquesortie'].name,
  //   icon: 'facteur',
  //   icon_title: '',
  //   name: '',
  //   role: [null],
  //   id_group: 14,
  //   items: null,
  //   hasBtn: false,
  //   target: 'read',
  //   isCustom: true,
  //   parent: 'listefactures',
  // },
];
