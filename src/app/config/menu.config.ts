import { environment } from './../../environments/environment';
// Liste des menus pour les titre, sidebar et breadcrumb
import { ROUTES } from './routes.config';

export const MENU = [



      {
        label: 'Fleet management',
        routeName: null,
        isMenu: true,

        items : [

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
        ]
      },
      {
          label: 'Tower Control',
          routeName: ROUTES['towercontrol'].name,
          isMenu: true
  
      }


];
