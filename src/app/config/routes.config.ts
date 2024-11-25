import { environment } from './../../environments/environment.prod';
/*
  Liste des noms des routes pour changer l'envoi des lien par nom de route et non pas par route
  path: [la route définit dans dans le fichier routing],
  route: [La route pour la navigation],
  name: [Nom de la route],
*/

export const ROUTES = {
  '404': {
    path: '404',
    route: '/404',
    name: '404',
  },
  login: {
    path: 'login',
    route: '/login',
    name: 'login',
  },
  logout: {
    path: 'logout',
    route: '/logout',
    name: 'logout',
  },
  // dashboard: {
  //   path: 'dashboard',
  //   route: '/dashboard',
  //   name: 'dashboard',
  tournees: {
    path: 'tournees',
    route: '/tournees',
    name: 'tournees',
  },
  ramassagelight: {
    path: 'ramassagelight',
    route: '/ramassagelight',
    name: 'ramassagelight',
  },
  passageplanifies: {
    path: 'passageplanifies',
    route: '/passageplanifies',
    name: 'passageplanifies',
  },
  passagereguliers: {
    path: 'passagereguliers',
    route: '/passagereguliers',
    name: 'passagereguliers',
  },
  tourneescloture: {
    path: 'tourneescloture',
    route: '/tourneescloture',
    name: 'tourneescloture',
  },
  detailstournees: {
    path: 'detailstournees',
    route: '/detailstournees',
    name: 'detailstournees',
    params: 1,
  },
  'planification-tour': {
    path: 'planification-tour',
    route: '/planification-tour',
    name: 'planification-tour',
    params: 1,
  },
  'planification-tours': {
    path: 'planification-tours',
    route: '/planification-tours',
    name: 'planification-tours',
    params: 1,
  },
  reclamations: {
    path: 'reclamations',
    route: '/reclamations',
    name: 'reclamations',
    params: 0,
  },
  parametre: {
    path: 'parametre',
    route: '/parametre',
    name: 'parametre',
  },
  convoyage: {
    path: 'convoyage',
    route: '/convoyage',
    name: 'convoyage',
  },
  listeconvoyage: {
    path: 'listeconvoyage',
    route: '/listeconvoyage',
    name: 'listeconvoyage',
  },
  generationcovoyage: {
    path: 'generationcovoyage',
    route: '/generationcovoyage',
    name: 'generationcovoyage',
    params: 1,
  },
  rdvs: {
    path: 'rdvs',
    route: '/rdvs',
    name: 'rdvs',
  },
  rendezvous: {
    path: 'rendezvous',
    route: '/rendezvous',
    name: 'rendezvous',
  },
  tasks: {
    path: 'tasks',
    route: '/tasks',
    name: 'tasks',
  },
  contacts: {
    path: 'contacts',
    route: '/contacts',
    name: 'contacts',
  },
  compte: {
    path: 'compte',
    route: '/compte',
    name: 'compte',
  },
  prospects: {
    path: 'prospects',
    route: '/prospects',
    name: 'prospects',
  },
  devis: {
    path: 'devis',
    route: '/devis',
    name: 'devis',
  },
  historiqueversions: {
    path: 'historiqueversions',
    route: '/historiqueversions',
    name: 'historiqueversions',
  },
  detailsclient: {
    path: 'detailsclient',
    route: '/detailsclient',
    name: 'detailsclient',
    params: 1,
  },
  tarifaire: {
    path: 'publique',
    route: '/publique',
    name: 'publique',
  },
  listtemplate: {
    path: 'listtemplate',
    route: '/listtemplate',
    name: 'listtemplate',
  },
  offercommerciales: {
    path: 'offercommerciales',
    route: '/offercommerciales',
    name: 'offercommerciales',
  },

  'tree-offer': {
    path: 'tree-offer',
    route: '/tree-offer',
    name: 'tree-offer',
    params: 2,
  },
  'tree-quote': {
    path: 'tree-quote',
    route: '/tree-quote',
    name: 'tree-quote',
    params: 2,
  },
  parc: {
    path: 'parc',
    route: '/parc',
    name: 'parc',
  },
  listvehicules: {
    path: 'listvehicules',
    route: '/listvehicules',
    name: 'listvehicules',
  },
  detailsvehicule: {
    path: 'detailsvehicule',
    route: '/detailsvehicule',
    name: 'detailsvehicule',
  },
  detailsvehicules: {
    path: 'detailsvehicules',
    route: '/detailsvehicules',
    name: 'detailsvehicules',
    params: 1,
  },
  vehiculereforme: {
    path: 'vehiculereforme',
    route: '/vehiculereforme',
    name: 'vehiculereforme',
  },
  documents: {
    path: 'documents',
    route: '/documents',
    name: 'documents',
  },
  status: {
    path: 'status',
    route: '/status',
    name: 'status',
  },
  listdocument: {
    path: 'listdocument',
    route: '/listdocument',
    name: 'listdocument',
    params: 1,
  },
  liststatusvehicule: {
    path: 'liststatusvehicule',
    route: '/liststatusvehicule',
    name: 'liststatusvehicule',
    params: 1,
  },
  listdetailsvehicule: {
    path: 'listdetailsvehicule',
    route: '/listdetailsvehicule',
    name: 'listdetailsvehicule',
    params: 1,
  },
  gestionpersonnel: {
    path: 'gestionpersonnel',
    route: '/gestionpersonnel',
    name: 'gestionpersonnel',
  },
  addpersonnel: {
    path: 'addpersonnel',
    route: '/addpersonnel',
    name: 'addpersonnel',
  },
  detailpersonnel: {
    path: 'detailpersonnel',
    route: '/detailpersonnel',
    name: 'detailpersonnel',
    params: 1,
  },
  editpersonnel: {
    path: 'editpersonnel',
    route: '/editpersonnel',
    name: 'editpersonnel',
    params: 1,
  },
  vehiculeremplacement: {
    path: 'vehiculeremplacement',
    route: '/vehiculeremplacement',
    name: 'vehiculeremplacement',
  },
  detailremplacement: {
    path: 'detailremplacement',
    route: '/detailremplacement',
    name: 'detailremplacement',
    params: 1,
  },
  extincteur: {
    path: 'extincteur',
    route: '/extincteur',
    name: 'extincteur',
  },
  gestionciternes: {
    path: 'gestionciternes',
    route: '/gestionciternes',
    name: 'gestionciternes',
  },
  demandeintervention: {
    path: 'demandeintervention',
    route: '/demandeintervention',
    name: 'demandeintervention',
  },
  listecartes: {
    path: 'listecartes',
    route: '/listecartes',
    name: 'listecartes',
  },
  consomationcarburant: {
    path: 'consomationcarburant',
    route: '/consomationcarburant',
    name: 'consomationcarburant',
  },
  depensesautoroute: {
    path: 'depensesautoroute',
    route: '/depensesautoroute',
    name: 'depensesautoroute',
  },
  mouvementstocks: {
    path: 'mouvementstocks',
    route: '/mouvementstocks',
    name: 'mouvementstocks',
    params: 1,
  },
  gestiondisponibilites: {
    path: 'gestiondisponibilites',
    route: '/gestiondisponibilites',
    name: 'gestiondisponibilites',
  },
  affectation: {
    path: 'affectation',
    route: '/affectation',
    name: 'affectation',
  },
  listefeuille: {
    path: 'listefeuille',
    route: '/listefeuille',
    name: 'listefeuille',
  },
  detailfeuille: {
    path: 'detailfeuille/:uuid',
    route: '/detailfeuille',
    name: 'detailfeuille',
    params: 1,
  },
  geofencing: {
    path: 'geofencing',
    route: '/geofencing',
    name: 'geofencing',
  },
  mouvementstockcartes: {
    path: 'mouvementstockcartes',
    route: '/mouvementstockcartes',
    name: 'mouvementstockcartes',
    params: 1,
  },
  listefactures: {
    path: 'listefactures',
    route: '/listefactures',
    name: 'listefactures',
  },
  genererfacture: {
    path: 'genererfacture',
    route: '/genererfacture',
    name: 'genererfacture',
    params: 1,
  },
  getfacture: {
    path: 'getfacture',
    route: '/getfacture',
    name: 'getfacture',
    params: 1,
  },
  generationfacture: {
    path: 'generationfacture',
    route: '/generationfacture',
    name: 'generationfacture',
  },
  expnonfacture: {
    path: 'expnonfacture',
    route: '/expnonfacture',
    name: 'expnonfacture',
  },
  etatcontrole: {
    path: 'etatcontrole',
    route: '/etatcontrole',
    name: 'etatcontrole',
  },
  avoir: {
    path: 'avoir',
    route: '/avoir',
    name: 'avoir',
  },
  listerequetes: {
    path: 'listerequetes',
    route: '/listerequetes',
    name: 'listerequetes',
  },
  demande_pieces: {
    path: 'demande_pieces',
    route: '/demande_pieces',
    name: 'demande_pieces',
  },
  piecesrechange: {
    path: 'piecesrechange',
    route: '/piecesrechange',
    name: 'piecesrechange',
  },
  planning: {
    path: 'planning',
    route: '/planning',
    name: 'planning',
  },
  gps: {
    path: 'gps',
    route: '/gps',
    name: 'gps',
  },
  gestioncommerciaux: {
    path: 'gestioncommerciaux',
    route: '/gestioncommerciaux',
    name: 'gestioncommerciaux',
  },
  detailcommerciaux: {
    path: 'detailcommerciaux',
    route: '/detailcommerciaux',
    name: 'detailcommerciaux',
    params: 1,
  },
  detailobjectif: {
    path: 'detailobjectif',
    route: '/detailobjectif',
    name: 'detailobjectif',
    params: 1,
  },
  demandepieces: {
    path: 'demandepieces',
    route: '/demandepieces',
    name: 'demandepieces',
  },
  historiquesortie: {
    path: 'historiquesortie',
    route: '/historiquesortie',
    name: 'historiquesortie',
  },
  remise: {
    path: 'remise',
    route: '/remise',
    name: 'remise',
  },
  encaissement: {
    path: 'encaissement',
    route: '/encaissement',
    name: 'encaissement',
  },
  recouvrement: {
    path: 'recouvrement',
    route: '/recouvrement',
    name: 'recouvrement',
  },
  gestionimpayes: {
    path: 'gestionimpayes',
    route: '/gestionimpayes',
    name: 'gestionimpayes',
  },
  affectationobjectifs: {
    path: 'affectationobjectifs',
    route: '/affectationobjectifs',
    name: 'affectationobjectifs',
  },
  fiche_customer: {
    path: 'fiche_customer',
    route: '/fiche_customer',
    name: 'fiche_customer',
  },
  edit_customer: {
    path: 'edit_customer',
    route: '/edit_customer',
    name: 'edit_customer',
    params: 1,
  },
  listeclients: {
    path: 'listeclients',
    route: '/listeclients',
    name: 'listeclients',
  },

  listedemandesLight: {
    path: 'listedemandesLight',
    route: '/listedemandesLight',
    name: 'listedemandesLight',
  },
  newDemandeLight: {
    path: 'newDemandeLight',
    route: '/newDemandeLight',
    name: 'newDemandeLight',
  },

  demandeLightEditTaxation: {
    path: 'demandeLightEditTaxation',
    route: '/demandeLightEditTaxation',
    name: 'demandeLightEditTaxation',
    params: 1
  },
  listemissions: {
    path: 'listemissions',
    route: '/listemissions',
    name: 'listemissions',
  },
  suivimissions: {
    path: 'suivimissions',
    route: '/suivimissions',
    name: 'suivimissions',
  },
  affectation_affretement: {
    path: 'affectation_affretement',
    route: '/affectation_affretement',
    name: 'affectation_affretement',
  },
  detailsAffretement: {
    path: 'detailsAffretement/:uuid',
    route: '/detailsAffretement',
    name: 'detailsAffretement',
    params: 1,
  },
  decisionAffretment: {

    path: 'decisionAffretment/:uuid',
    route: '/decisionAffretment',
    name: 'decisionAffretment',
    params: 1,
  },
  'taxation-affretement': {
    path: 'taxation-affretement/:uuid',
    route: '/taxation-affretement',
    name: 'taxation-affretement',
    params: 1,
  },
  demandesconfirmees: {
    path: 'demandesconfirmees',
    route: '/demandesconfirmees',
    name: 'demandesconfirmees',
  },
  documentsgestion: {
    path: 'documentsgestion',
    route: '/documentsgestion',
    name: 'documentsgestion',
  },
  stepsreservations: {
    path: 'stepsreservations',
    route: '/stepsreservations',
    name: 'stepsreservations',
  },
  listaffectation: {
    path: 'listaffectation',
    route: '/listaffectation',
    name: 'listaffectation',
  },
  listprestataire: {
    path: 'listprestataire',
    route: '/listprestataire',
    name: 'listprestataire',
    params: 1,
  },
  delivery_matrix: {
    path: 'delivery_matrix',
    route: '/delivery_matrix',
    name: 'delivery_matrix',
  },
  detailpieces: {
    path: 'detailpieces/:uuid',
    route: '/detailpieces',
    name: 'detailpieces',
    params: 1,
  },
  mouvementdestock: {
    path: 'mouvementdestock/:uuid',
    route: '/mouvementdestock',
    name: 'mouvementdestock',
    params: 1,
  },
  mouvementstockglobal: {
    path: 'mouvementstockglobal',
    route: '/mouvementstockglobal',
    name: 'mouvementstockglobal',
  },
  grilleaffretement: {
    path: 'grilleaffretement',
    route: '/grilleaffretement',
    name: 'grilleaffretement',
  },
  'tree-quote-affretement': {
    path: 'tree-quote-affretement',
    route: '/tree-quote-affretement',
    name: 'tree-quote-affretement',
    params: 2,
  },

  'tree-offer-affretement': {
    path: 'tree-offer-affretement',
    route: '/tree-offer-affretement',
    name: 'tree-offer-affretement',
    params: 2,
  },
  affectationcartes: {
    path: 'affectationcartes',
    route: '/affectationcartes',
    name: 'affectationcartes',
  },
  validationversement: {
    path: 'validationversement',
    route: '/validationversement',
    name: 'validationversement',
  },
  affretementDevis: {
    path: 'affretement-offer',
    route: '/affretement-offer',
    name: 'affretementDevis',
    params: 2,
  },

  'affretement-devis' : {
    path: 'affretement-devis',
    route: '/affretement-devis',
    name: 'affretementDevis',
    params: 2,
  },
  validationretour: {
    path: 'validationretour',
    route: '/validationretour',
    name: 'validationretour',
  },
  versement: {
    path: 'versement',
    route: '/versement',
    name: 'versement',
  },
  receptiontraite: {
    path: 'receptiontraite',
    route: '/receptiontraite',
    name: 'receptiontraite',
  },
  receptionfactures: {
    path: 'receptionfactures',
    route: '/receptionfactures',
    name: 'receptionfactures',
  },
  'stepsreservations-edit' :
  {
    path: 'stepsreservations-edit',
    route: '/stepsreservations-edit',
    name: 'stepsreservations-edit',
    params : 1
  },
  listeinterventions: {
    path: 'listeinterventions',
    route: '/listeinterventions',
    name: 'listeinterventions',
  },
  diagnostique :{
    path: 'diagnostique',
    route: '/diagnostique',
    name: 'diagnostique',
    params : 1
  },
  intervenir :{
    path: 'intervenir',
    route: '/intervenir',
    name: 'intervenir',
  },
  detailinterventions :{
    path: 'detailinterventions',
    route: '/detailinterventions',
    name: 'detailinterventions',
    params : 1
  },
  inventairerechange :{
    path: 'inventairerechange',
    route: '/inventairerechange',
    name: 'inventairerechange',
  },
  historiquedemande :{
    path: 'historiquedemande',
    route: '/historiquedemande',
    name: 'historiquedemande',
  },
  pneumatique :{
    path: 'pneumatique',
    route: '/pneumatique',
    name: 'pneumatique',
  },


  confirm_user: {
    path: 'confirm-user/:user_token',
    route: '/confirm-user',
    name: 'confirm-user',
  },

  specialOffercommerciale: {
    path: 'special-offers',
    route: '/special-offers',
    name: 'special-offers',
  },

  editspecialOffercommerciale : {
    path: 'edit-special-offers',
    route: '/edit-special-offers',
    name: 'edit-special-offers',
    params :1
  },

  specialOffersFacturation: {
    path: 'special-offers-facturation',
    route: '/special-offers-facturation',
    name: 'special-offers-facturation',
  },

  TaxspecialOffersFacturation : {
    path: 'tax-special-offers',
    route: '/tax-special-offers',
    name: 'tax-special-offers',
    params :1
  },

};
