import { environment } from '../../environments/environment';

export class
  Config {
  private static url = environment.URL;
  private static storageUrl = environment.STORAGE;

  public static get api(): any {
    const download_canvas =  this.url + 'download-canvas';
    const auth_url: string = this.url + 'auth';
    const accounts_url: string = this.url + 'users';
    const tasks_url: string = this.url + 'tasks';
    const complaint_url: string = this.url + 'complaints';
    const complaint_reason_url: string = this.url + 'complaint-reasons';
    const message_url: string = this.url + 'messages';
    const templates_url_list: string = this.url + 'templates';
    const templates_url_import: string = this.url + 'template-import';
    const templates_url_activities: string = this.url + 'activities';
    const templates_url_details: string = this.url + 'detailsTemplate/';
    const prod_category: string = this.url + 'productcategory';
    const grid_add: string = this.url + 'horsnomme';
    const grid_delete: string = this.url + 'deletegridhorsnomme';
    const updategrid: string = this.url + 'updategridhorsnomme';
    const add_poid_volumique: string = this.url + 'createPoidVolumique';
    const getTaxe: string = this.url + 'getTaxe';
    const getTva: string = this.url + 'getTva';
    const getTypeRdv: string = this.url + 'getTypeRdv';
    const addGlobalConfig: string = this.url + 'GlobalConfig';
    const allBasisCalcul: string = this.url + 'allBasisCalcul';
    const rubric: string = this.url + 'rubrics';
    const getrubrics: string = this.url + 'rubrics';
    const gettypes: string = this.url + 'getProductTypes';
    const createtype: string = this.url + 'nature';
    const getnaturetype: string = this.url + 'allproductcategory';
    const updatenatureproduct: string = this.url + 'updatenature';
    const deletenature: string = this.url + 'nature';
    const addTask: string = this.url + 'commercialTask';
    const getAllTask: string = this.url + 'commercialTask';
    const editTask: string = this.url + 'commercialTask/';
    const getTaskByDate: string = this.url + 'getTaskByDate';
    const UserCommercial: string = this.url + 'UserCommercial';
    const deletTask: string = this.url + 'commercialTask/';
    const getcommercialTasksable: string = this.url + 'getcommercialTasksable/';
    const Rdv: string = this.url + 'rendez-vous';
    const getCustomers: string = this.url + 'getCustomer';
    const addContact: string = this.url + 'contacts';
    const getContact: string = this.url + 'contacts';
    const deletContact: string = this.url + 'contact/';
    const editContact: string = this.url + 'updatecontact/';
    const addProspect: string = this.url + 'prospects/create';

    const getProspects: string = this.url + 'prospects';
    const uploadficheProspects: string = this.url + 'uploadProspectFiche';
    const deleteFicheProspects: string = this.url + 'deleteFicheProspects';

    const convertProspct: string = this.url + 'prospect/convert';
    const filtre_prospect: string = this.url + 'prospect/filtre';

    const getMotPort: string = this.url + 'modport';
    const getcustomer: string = this.url + 'allCustomers';
    const getCustomersProspects: string = this.url + 'getCustomersProspects';
    const getcustomer_filtre: string = this.url + 'customers/filtre';
    const createCustomer: string = this.url + 'customers';
    const updateCustomer: string = this.url + 'customers/update';
    const customerDetails: string = this.url + 'customerDetails/';
    const customer: string = this.url + 'customer/';
    const accountCustomers: string = this.url + 'getcustomers/encompte';

    const sectors: string = this.url + 'sectors';
    const addEntity: string = this.url + 'entity/add';
    const addPolygon: string = this.url + 'polygon/add';
    const editPolygons: string = this.url + 'polygons/edit';
    const addCentre: string = this.url + 'centre/add';

    const passagePlanified: string = this.url + 'PassagePlanified';
    const ramassageLight: string = this.url + 'expedition/demande_remassage_light';
    const allCities: string = this.url + 'cities';
    const CitiesAgence: string = this.url + 'cities-agencies';
    const personnels: string = this.url + 'personnels';
    const services: string = this.url + 'services';
    const TypeOfEpis: string = this.url + 'TypeOfEpis';
    const epis: string = this.url + 'conducteurs';
    const allCountries = this.url + 'countries';


    const store_distance_between_cities = this.url + 'store-distance-between-cities';

    // Bill
    const prefacturation: string = this.url + 'facture/prefacturation';
    const generateBill: string = this.url + 'facture/generate';
    const getBills: string = this.url + 'facture/list';
    const getBill: string = this.url + 'facture/';
    const getBillDetail: string = this.url + 'facture/';
    const printBill: string = this.storageUrl;
    const addAttachmentToBill: string = this.url + 'facture/attachements';
    const recalculateBill: string = this.url + 'facture/recalculer';
    const getBillsHistory: string = this.url + 'facture/list/historiques';
    const cancelBill: string = this.url + 'facture/annuler';
    const addMotifToBill: string = this.url + 'facture/add_motif';
    const getPayedBills: string = this.url + 'facture/list/payed';
    const getCustomerPayedBills: string = this.url + 'facture/list-payed';
    const exportFacture: string = this.url + 'facture/export';
    const regenerateFacture: string = this.url + 'facture/regenerateFacture';



    // Discount
    const getDiscountTypes: string = this.url + 'remise/type/list';
    const createDiscount: string = this.url + 'remise/create';
    const validateRemise: string = this.url + 'remise';

    // Avoir
    const getAvoirs: string = this.url + 'avoir/list';
    const getAvoir: string = this.url + 'avoir';
    const createAvoir: string = this.url + 'avoir/create';
    const updateAvoir: string = this.url + 'avoir/update';
    const deleteAvoir: string = this.url + 'avoir/delete';
    const getFactureAvoir: string = this.url + 'avoir/facture';
    const getMontantAvoir: string = this.url + 'avoir/convention';
    const exportAvoir: string = this.url + 'avoir/data/export';
    const rapportAvoir: string = this.url + 'avoir/list/rapport';
    const exportPdfAvoir: string = this.url + 'avoir/pdf/export';

    // Receipt
    const getReceipts: string = this.url + 'paiement/list';
    const createReceipt: string = this.url + 'paiement/create';

    // Unpaid
    const getUnpaids: string = this.url + 'impaye/list';
    const createUnpaid: string = this.url + 'impaye/create';
    const unpaidCustomers: string = this.url + 'impaye/customer_reglements';

    // creance
    const getCreanceClientStatistics: string = this.url + 'recouvrement/list/statistiques';
    const getCreanceClientList: string = this.url + 'recouvrement/list';
    const getCreanceClientdetail: string = this.url + 'recouvrement';
    const getCreanceByRange: string = this.url + 'recouvrement/range'


    // affretment
    const saveAffretementDevis: string = this.url + 'devis/save';

    const deleteTransportConditionsAffretment : string = this.url + 'affretment-offer/delete-conditions';

    // recouvreur
    const getRecouvreurs: string = this.url + 'recouvreur/list';

    // getDemandesDocuments
    const getDemandesDocuments: string = this.url + 'get_documents_demande';
    const updateDemandeDocumentStatus: string = this.url + 'change_status_document';
    const deliverDemandeDocuments: string = this.url + 'remis_document';

    const blStorage: string = this.storageUrl + '/demande_bl_images';
    const factureStorage: string = this.storageUrl + '/demande_facture_images';
    const attachementsStrorage: string = this.storageUrl + 'demande_attachements';

    // caisse
    // caisseCarte
    const getCaisseCartes: string = this.url + 'carte_caisse_filter';
    const addCaisseCarte: string = this.url + 'carte_caisse';
    const alimenterCaisseCarte: string = this.url + 'alimentation_carte';
    const affecterCaisseCarte: string = this.url + 'affecter-carte-caisse';
    const desaffecterCaisseCarte: string = this.url + 'desafecter-carte-caisse';
    const getMouvementCaisseCarte: string = this.url + 'historiques_alimentation';
    const deleteCaisseCarte: string = this.url + 'carte_caisse';

    // receptionDocument (BlFacture reception Cheque Traite)
    const getDocuments: string = this.url + 'reception/list_documents';
    const getChecksTraits: string = this.url + 'reception/list_check_trait';

    const confirmDocumentsReception: string = this.url + 'reception/valide_documents';

    // retourCrbt
    const getTRetoursCrbtToValidate: string = this.url + 'reception/list_crb';
    const validateTRetourCrbt: string = this.url + 'reception/valide_crb';
    const annulateTRetourCrbt: string = this.url + 'carte';

    // validationVersement
    const getVersementsToValidate: string = this.url + 'versement/list_validate';
    const validateVersement: string = this.url + 'versement/validate';
    const annulateVersement: string = this.url + 'carte';

    // versement
    const getVersements: string = this.url + 'reception/list_versements';
    const emettreVersement: string = this.url + 'carte';
    const validateVersements: string = this.url + 'reception/valide_versements';
    // maintenance
    // Maintenance Intervention
    const getMaintenanceInterventions: string = this.url + 'intervention_list';
    const getDiagnosticDetail: string = this.url + 'diagnostique';
    const createDiagnostic: string = this.url + 'diagnostique/create';
    const createIntervention: string = this.url + 'intervenir';
    const closeIntervention: string = this.url + 'intervention_cloture';
    const addPieceToIntervention: string = this.url + 'intervention_attachements';

    //piece rechange
    const getPiecesRechange: string = this.url + 'piece_rechange_list';
    const getInventoryList: string = this.url + 'invantory';
    const addInventory: string = this.url + 'invantory/create';
    const getInventoryHistoric: string = this.url + 'invantory/histories';
    const searchPieceName: string = this.url + 'name_piece';


    // Reparator
    const getReparators: string = this.url + 'getReparator';

    // pneu
    const getPneus: string = this.url + 'pneu';
    const createPneu: string = this.url + 'pneu/create';
    const getPneu: string = this.url + 'pneu/details';
    const affectPneu: string = this.url + 'pneu/affecter';
    const desaffectPneu: string = this.url + 'pneu/desaffecter';
    const updatePneu: string = this.url + 'pneu/update';
    const deletePneu: string = this.url + 'pneu';

    // planning
    const getPlannings: string = this.url + 'planning/list';
    const addPlanning: string = this.url + 'planning/create';
    const accomplishPlanning: string = this.url + 'planning/accomplir';
    const updatePlanning: string = this.url + 'planning/update';
    const deletePlanning: string = this.url + 'planning';

    // category
    const getCategories: string = this.url + 'categories_intervention';
    const addCategory: string = this.url + 'category/create';
    const updateCategory: string = this.url + 'category/update';
    const deleteCategory: string = this.url + 'category';

    //demande pieces
    const getDemandePiecesList: string = this.url + 'demandes_pieces';
    const getDemandePiecesBonCommande: string = this.url + 'bon_commande';
    const CompleteDemandePiecesCommande: string = this.url + 'completer_commande';
    const generateDemandePiecesBonAchat: string = this.url + 'generate_bon_achat';
    const getDemandePiecesHistoric: string = this.url + 'historique_demande_pieces';
    const getDemandePiecesDetail: string = this.url + 'details_demande_pieces';
    const getDemandePiecesBonSortie: string = this.url + 'generate_bon_sortie';
    const addDemandePiecesattachment: string = this.url + 'intervention_attachements';

    const getDemandePiecesBon: string = this.url + 'find_bon';

    const getModeReglementList: string = this.url + 'list_mode_reglements';

    // role\
    const getRoles: string = this.url + 'roles/list';
    const addRole: string = this.url + 'roles/create';
    const getRoleHabilities: string = this.url + 'abilities/role';
    const addRoleHabilities: string = this.url + 'abilities/create';

    // agency Expense
    const getNatures:string = this.url + 'nature_depence';
    const addNature: string = this.url + 'nature_depence';
    const getSuppliers:string = this.url + 'fournisseur_depence';
    const addSupplier: string = this.url + 'fournisseur_depence';
    const deleteNature: string = this.url + 'nature_depence';
    const deleteSupplier: string = this.url + 'fournisseur_depence';

    //Auth
    return {
      defaultDrivers: {
        base: this.url +  'default-drivers',
      },
      download_canvas,
      store_distance_between_cities,
      allCountries,
      deleteTransportConditionsAffretment,
      auth: {
        login: auth_url + '/login',
        logout: auth_url + '/logout',
        me: auth_url + '/me',
        user_by_confirmation_token: this.url + 'user-by-confirmation-token',
        set_password: this.url + 'set-password',
      },
      accounts: {
        list: accounts_url,
        create: accounts_url,
        upadate: accounts_url,
        delete: accounts_url,
      },
      affretement: {
        refuse_discount : this.url + 'decline-discount',
        confirm_discount : this.url + 'confirm-discount',
        create_discount : this.url + 'affretment-discount',
        get_palettes_types: this.url + 'palette-types',
        update_demande: this.url + 'update-demande',
        types : this.url + 'types-affretment',
        save_trajectory: this.url + 'save_the_trajectory',
        get_distance_between_cities : this.url + 'get-distance-between-cities',
        get_demande_trajectories : this.url + 'demande_trajectories',
        get_calendar: this.url + 'get_affectation_calendar',
        demande_affretement: this.url + 'demande_affretement',
        get_vehicule_affectation: this.url + 'get_vehicule_affectation',
        get_conducteur_affectation: this.url + 'get_conducteur_affectation',
        create: this.url + 'demande_affretement',
        list :this.url + 'demande_affretement',
        detail:this.url + 'demande_by_uuid',
        list_vehicule: this.url + 'getAlltrucks',
        get_vehicule_demande: this.url + 'get_vehicule_demande',
        get_vehicule_type: this.url + 'truck_type',
        affectation_demande: this.url + 'affectation_demande',
        desaffectation_demande: this.url + 'desaffectation_demande',
        status_demande: this.url + 'status_demande',
        status_point_chargement: this.url + 'status_point_chargement',
        approbation_chargement: this.url + 'approbation_chargement',
        approbation_dechargement: this.url + 'approbation_dechargement',
        motifs_affretement: this.url + 'motifs_affretement',
        services_affretement:this.url+'services_affretement',
        type_trajet_demande:this.url+'type_trajet_demande',
        taxation : this.url + 'affretment_taxation',
        taxation_test : this.url + 'tarif',
        selectable_services: this.url + 'selectable-rubrics-affretment',
        getDemandesDocuments: getDemandesDocuments,
        updateDemandeDocumentStatus: updateDemandeDocumentStatus,
        deliverDemandeDocuments: deliverDemandeDocuments,
        blStorage:blStorage,
        factureStorage: factureStorage,
        attachementsStrorage: attachementsStrorage,
        download_decleartion : this.url + 'download-declaration',
        get_confirmed_demandes : this.url + 'get_confirmed_demandes',
        update_status_demande : this.url + 'update_status_demande',
        create_demande_light : this.url + 'create-demande-light',
        get_demandes_light : this.url + 'get-demandes-light',
        update_demande_light_amount : this.url + 'update-amount-demande-light',
        get_demande_light_taxation_details : this.url + 'get-demande-light-taxation-details',
        delete_demande_light : this.url + 'delete-demande-light',
        export_light_demandes : this.url + 'export-light-demandes'
    
      },
      ports: {
        list: this.url + 'modport',
      },
    adresses: {
        search: this.url + 'adresse/search',
        by_type: this.url + 'adresse-by-type',
        create: this.url + 'adresse',
        update: this.url + 'adresse',
        delete: this.url + 'adresse',
         cities: this.url + 'cities-agencies',
        zones: this.url + 'zones',
        get_customer_addresses: this.url + 'get_customer_addresses',
        get_customer_addresses_by_id: this.url + 'adresse',
      },

      transfert: {
        list: this.url + 'transfert',
        affecter: this.url + 'affecter-transfert',
      },
      tasks: {
        list: tasks_url,
        create: tasks_url,
        update: tasks_url,
        delete: tasks_url,
        get: tasks_url,
      },
      customers: {
        search: this.url + 'customers/search',
        searchList: this.url + 'customers/searchByName',
        accountCustomers: accountCustomers,
        unpaidCustomers: unpaidCustomers,
      },
      complaints: {
        list: complaint_url,
        create: complaint_url,
        delete: complaint_url,
        reason: {
          list: complaint_reason_url,
        },
      },
      messages: {
        list: message_url,
        create: message_url,
      },
      prod_category: {
        list: prod_category,
        type: gettypes,
        create: createtype,
        get: getnaturetype,
        delete: deletenature,
        update: updatenatureproduct,
      },
      grids: {
        list: this.url + 'grids',
        get: this.url + 'grids',
        grids_activated: this.url + 'grids-active',
        import: this.url + 'grids-import',
        update: this.url + 'grids',
        create_hors_normes: grid_add,
        delete_hors_normes: grid_delete,
        update_hors_normes: updategrid,
      },
      grids_affretment : {
        list : this.url + 'affretment-grids',
        details : this.url + 'affretment-grid-details',
        get_services_by_grid : this.url + 'affretment-services-by-grid',
        get_transport_coditions : this.url + 'grid-affretment-transport',
        get_services_global : this.url + 'affretment-public-services',
        get_services_specefique : this.url + 'affretment-specefique-services',
        import_grid : this.url + 'grids-import-affretment',
        get_grids_transport : this.url + 'affretment-get-grids-transport',
        get_grids_specific : this.url + 'affretment-get-grids-specific',
        get_grids_global : this.url + 'affretment-get-grids-global',
        active_grid : this.url + 'affretment-active-grid',
        import_offre_affretemenet : this.url + 'affretement-import-offre',
      },
      offers: {
        get_special_offers_details : this.url + 'get-special-offers-details',
        store_special_offers_details : this.url + 'store-special-offers-details',
        special_offers : this.url + 'special-offers',
        create_special_offer : this.url + 'create-special-offer',
        upload_attached_piece : this.url + 'upload_attached_piece',
        list: this.url + 'offers',
        all: this.url + 'all-offers',
        get: this.url + 'offers',
        get_grid_conditions: this.url + 'offer/transportation_params',
        inherit_condition: this.url + 'offers/inherit_transport',
        update: this.url + 'offers',
        create: this.url + 'offers/init',
        download: this.url + 'offer/download',
        affretment_update : this.url + 'update-offer-affretment'
      },
      quotes: {
        list: this.url + 'quotes',
        validate: this.url + 'quotes',
        create: this.url + 'quotes',
        get: this.url + 'quotes',
        //
        confirm: this.url + 'quotes-confirm',
        rollback: this.url + 'quotes-rollback',
        accept: this.url + 'quotes-accept',
        decline: this.url + 'quotes-decline',
        new_version: this.url + 'quotes-version',
        //
        get_quote_tree: this.url + 'quotes-tree',
        update_quote_details: this.url + 'quotes-tree',
        download_quote: this.url + 'quotes-pdf',
      },
      ressources: {
        cities_categories: this.url + 'cities-categories',
        rubrics_calcul_basis: this.url + 'rubrics',
        categories_products: this.url + 'products',
        sectors: sectors,
        zones: this.url + 'zones',
        axes: this.url + 'axe',
        drivers: this.url + 'drivers',
        trucks: this.url + 'getAlltrucks',
        get_edges : this.url + 'edges',
      },
      templates: {
        list: templates_url_list,
        activities: templates_url_activities,
        details: templates_url_details,
        import: templates_url_import,
        get: this.url + 'offers',
        update: this.url + 'offers',
      },
      parametre: {
        addPV: add_poid_volumique,
        getTva: getTva,
        getTaxe: getTaxe,
        getPV: this.url + 'getPV',
        getTypeRdv: getTypeRdv,
        motif: this.url + 'motif',
        addGlobalConfig: addGlobalConfig,
        editGlobalConfig: this.url + 'UpdateGlobalConfig',
        deletGlobalConfig: this.url + 'DeleteGlobalConfig',
        allBasisCalcul: allBasisCalcul,
        rubric: rubric,
        getrubrics: getrubrics,
        addLimitation: this.url + 'limitation',
        deleteLimitation: this.url + 'DeleteGlobalConfig',
        updateLimitation: this.url + 'UpdateGlobalConfig',
        prestataire: this.url + 'prestataire',
        objectif: this.url + 'objectif',
        objectif_commercial: this.url + 'objectif_commercial',
        objectif_agence: this.url + 'objectif_agence',
        color: this.url + 'color',
        country: this.url + 'country',
        role:{
          getRoles:getRoles,
          addRole:addRole,
          getRoleHabilities: getRoleHabilities,
          addRoleHabilities: addRoleHabilities
        }
      },
      task: {
        addTask: addTask,
        getAllTask: getAllTask,
        editTask: editTask,
        deletTask: deletTask,
        getcommercialTasksable: getcommercialTasksable,
        UserCommercial: UserCommercial,
        getTaskByDate: getTaskByDate,
      },

      rdv: {
        Rdv: Rdv,
      },
      motport: {
        getmotport: getMotPort,
      },
      customer: {
        customersPagaineted : this.url + 'customersPagaineted',
        getcustomer: getcustomer,
        createCustomer: createCustomer,
        updateCustomer: updateCustomer,
        customer: customer,
        customerDetails: customerDetails,
        getcustomers: getCustomers,
        filtre: getcustomer_filtre,
        getCustomersProspects : getCustomersProspects,
        detail_customer : this.url + 'detail-customer/',
        search: this.url + 'customers/search',
        create: this.url + 'customers',
        list: this.url + 'getCustomersProspects',
        by_type: this.url + 'search_customer',

      },
      contact: {
        addContact: addContact,
        getContact: getContact,
        deletContact: deletContact,
        editContact: editContact,
        departement : this.url + 'departement_contact',
        fonction : this.url + 'fonction_contact'
      },
      prospect: {
        addProspect: addProspect,
        getProspects: getProspects,
        convertProspct: convertProspct,
        filtre_prospect: filtre_prospect,
        uploadficheProspects : uploadficheProspects,
        deleteFicheProspects : deleteFicheProspects
      },
      tour: {
        delete : this.url + 'delete-tour',
        download_pdf : this.url + 'download-tour-pdf',
        list: this.url + 'tour',
        tourAffectation: this.url + 'tours',
        affecter: this.url + 'affecterTour',
        listByIds: this.url + 'tour-ids',
        initTour: this.url + 'tour',
        getDetails: this.url + 'tour',
        getPassageToPlanify: this.url + 'tour/planification',
        planifyPassage: this.url + 'tour-item',
        unPlanifyPassage: this.url + 'tour-item',
        planifyTour: this.url + 'tour',
        mergeTours: this.url + 'tour-merge',
        dailyTours: this.url + 'tours-reguliers',
      },
      covoyage: {
        list: this.url + 'covoyage',
        covoyageAffectation: this.url + 'listCovoyage',
        editCovoyage: this.url + 'editCovoyage',
        initCovoyage: this.url + 'covoyage',
        updateCovoyage: this.url + 'covoyage',
        covoyageKpis: this.url + 'covoyage-kpis',
        covoyageExpToPlanify: this.url + 'covoyage-planification',
        planifyExpedition: this.url + 'covoyage-exp',
        unPlanifyExpedition: this.url + 'covoyage-exp',
        dailyCovoyages: this.url + 'covoyages-daily',
        downloadLoadingSheet : this.url + 'covoyage-loading-sheet',
      },
      passagePlanified: {
        passagePlanified: passagePlanified,
      },
      ramassageLight: {
        ramassageLight: ramassageLight,
        allCities: allCities,
      },
      axes: {
        axe: this.url + 'axe',
        updateAxe: this.url + 'updateAxe',
        CitiesAgence: CitiesAgence,
      },
      agences: {
        cities: this.url + 'citiesZone',
        zone: this.url + 'zone',
        create: this.url + 'agence',
        update: this.url + 'updateAgence',
      },
      planifiedCovoyage: {
        planifiedCovoyage: this.url + 'PlanifiedCovoyage',
      },
      search: {
        citiesFilter: this.url + 'citiesFilter',
        TruckFilter: this.url + 'TruckFilter',
      },
      activityComercial: {
        addRdv: this.url + 'comercial_activity',
        getRdv: this.url + 'getRdv',
        getTask: this.url + 'getTask',
        addTache: this.url + 'comercial_activity_task',
        other: this.url + 'comercial_activity',
        filter: this.url + 'comercial_activity',
        export: this.url + 'export',
        deletePJ: this.url + 'deletePJ',
      },
      vehicule: {
        get_all_tonnages: this.url + 'tonnage',
        media: this.url + 'media',
        brand: this.url + 'brand',
        gamme: this.url + 'gamme',
        modele: this.url + 'modele',
        category: this.url + 'truck_category',
        service: this.url + 'services',
        parc: this.url + 'parc',
        zone: this.url + 'zones',
        type: this.url + 'truck_type',
        tonnage: this.url + 'tonnage',
        truck: this.url + 'trucks',
        contart: this.url + 'trucks_contrat',
        document: this.url + 'trucks_document',
        sinistre: this.url + 'trucks_sinistre',
        countDocument: this.url + 'count_document',
        statusVehicule: this.url + 'statutTruck',
        trucksByStatus: this.url + 'trucksByStatus',
        detailsTruck: this.url + 'details_truck',
        extincteur: this.url + 'extincteur',
        recharger_extincteur: this.url + 'recharger-extincteur',
        remplacement: this.url + 'remplacement',
        intervention: this.url + 'intervention',
        panne: this.url + 'panne',
        name_piece: this.url + 'name_piece',
        family_piece: this.url + 'family_piece',
        piece_rechange: this.url + 'piece_rechange',
        piece_rechange_list: this.url + 'piece_rechange_list',
        alimenter_piece_rechange: this.url + 'alimenter_piece_rechange',
        mouvements_stocks: this.url + 'mouvements_stocks',
        intervention_filtre: this.url + 'intervention_filtre',
        citerne: this.url + 'citerne',
        allCiterne: this.url + 'allCiterne',
        citerne_filtre: this.url + 'citerne_filtre',
        carte: this.url + 'carte',
        getAllCarte: this.url + 'getAllCarte',
        carte_filters: this.url + 'carte_filters',
        typeExtincteur: this.url + 'type_extincteur',
        volume: this.url + 'volume',
        // disponibilite: this.url + 'truck_disponible',
        parcs: this.url + 'parcs',
        // disponibilite_filtre: this.url + 'disponibilite_filtre',
        mouvement: this.url + 'mouvement',
        jaugeage: this.url + 'jaugeage',
        depense: this.url + 'depense',
        affecterCarte: this.url + 'affecter-carte',
        allTruck: this.url + 'getAlltrucks',
        getDocumentByType: this.url + 'getDocumentByType',
        missionInfraction: this.url + 'missionInfraction',
        gps: this.url + 'gps',
        associer_gps : this.url + 'associer_gps',
      },
      personnels: {
        personnels: this.url + 'personnels',
        getPersonnel: this.url + 'getPersonnel',
        getPersonnel2: this.url + 'getPersonnel2',
        addEpisToPersonnel: this.url + 'addEpisToPersonnel',
        personnelsUpdate: this.url + 'personnelsUpdate',
        filter: this.url + 'personnels/filter',
        disponibilite: this.url + 'conducteur_diponible',
        availablity: this.url + 'availablity',
        tonnage: this.url + 'tonnage',
        personnelbyFunction: this.url + 'personnelbyfunction',
        personnelbyUuid: this.url + 'personnelbyUuid',
        parc: this.url + 'parc',
        getPersonnelDispWithFiltre: this.url + 'getPersonnelDispWithFiltre',
        cities: this.url + 'cities',
        getEpisAll: this.url + 'getEpisAll',
        getEpisWithFiltre: this.url + 'getEpisWithFiltre',
        Conducteur_disponible: this.url + 'conducteur_dispo_affectation',
        getTruckDispoCount: this.url + 'truck_disponible_count',
        export : this.url + 'export-personnels'
      },
      services: {
        services: this.url + 'services',
      },
      TypeOfEpis: {
        TypeOfEpis: this.url + 'TypeOfEpis'
      },
      epis: {
        epis: this.url + 'getPersoneEpi',
      },
      roadmap: {
        getAll: this.url + 'feuille_route',
        filtre: this.url + 'feuille_route/filtre'
      },
      geofencing: {
        addEntity: addEntity,
        addPolygon: addPolygon,
        editPolygons: editPolygons,
        addCentre: addCentre,
      },
      commercial : {
        getCommercialKPIS : this.url + 'commercial-kpis',
        getLinkedCustomers : this.url + 'commercial-linked-customers',
      },
      objectif : {
        AffectationObjectif : this.url + 'affectation-objectif',
        AffectationYear : this.url + 'affectation-year',
        createWithSector : this.url + 'createWithSector',
        getAsscoiatedObjectifes : this.url + 'getAsscoiatedObjectifes',
        editWithSector : this.url + 'editWithSector',
      },
      bill: {
        generateBill: generateBill,
        getBills: getBills,
        getBill: getBill,
        getBillDetail: getBillDetail,
        printBill: printBill,
        prefacturation: prefacturation,
        addAttachmentToBill: addAttachmentToBill,
        recalculateBill: recalculateBill,
        getBillsHistory: getBillsHistory,
        cancelBill: cancelBill,
        addMotifToBill :addMotifToBill,
        getPayedBills: getPayedBills,
        getCustomerPayedBills:getCustomerPayedBills,
        exportFacture:exportFacture,
        searchList: this.url + 'facture/search_facture',
        regenerateFacture: regenerateFacture
      },
      specialOffersBill : {
         getOne : this.url + 'special-prefacture-details',
         simulateCRON : this.url + 'simulate-special-pre-facturation',
         getAll : this.url + 'special-offers-prefactures',
         calculate_sepecial_facture : this.url + 'calculate-sepecial-facture'
      },
      discount: {
        getDiscountTypes: getDiscountTypes,
        createDiscount: createDiscount,
        validateRemise: validateRemise,
      },
      avoir: {
        getAvoirs: getAvoirs,
        getAvoir: getAvoir,
        createAvoir: createAvoir,
        updateAvoir: updateAvoir,
        deleteAvoir: deleteAvoir,
        getFactureAvoir: getFactureAvoir,
        getMontantAvoir:getMontantAvoir,
        exportAvoir: exportAvoir,
        rapportAvoir: rapportAvoir,
        exportPdfAvoir: exportPdfAvoir
      },
      receipt:{
        getReceipts: getReceipts,
        createReceipt: createReceipt
      },
      unpaid:{
        getUnpaids: getUnpaids,
        createUnpaid: createUnpaid
      },
      creance:{
        getCreanceClientStatistics: getCreanceClientStatistics,
        getCreanceClientList: getCreanceClientList,
        getCreanceClientdetail: getCreanceClientdetail,
        getCreanceByRange: getCreanceByRange
      },
      affretementDevis:{
        saveAffretementDevis: saveAffretementDevis,
      },
      recouvreur: {
        getRecouvreurs: getRecouvreurs,
        searchList: this.url + 'recouvreur/search_recouvreur',
      },
      caisse: {
        caisseCarte: {
          getCaisseCartes: getCaisseCartes,
          addCaisseCarte: addCaisseCarte,
          alimenterCaisseCarte: alimenterCaisseCarte,
          affecterCaisseCarte: affecterCaisseCarte,
          desaffecterCaisseCarte: desaffecterCaisseCarte,
          getMouvementCaisseCarte: getMouvementCaisseCarte,
          deleteCaisseCarte: deleteCaisseCarte,
        },
        receptionDocuments: {
          getDocuments: getDocuments,
          confirmDocumentsReception: confirmDocumentsReception,
          getChecksTraits: getChecksTraits,
        },
        retourCrbt : {
          getTRetoursCrbtToValidate: getTRetoursCrbtToValidate,
          validateTRetourCrbt: validateTRetourCrbt,
          annulateTRetourCrbt: annulateTRetourCrbt,
        },
        validationVersement : {
          getVersementsToValidate: getVersementsToValidate,
          validateVersement: validateVersement,
          annulateVersement: annulateVersement,
        },
        versement : {
          getVersements: getVersements,
          emettreVersement: emettreVersement,
          validateVersements: validateVersements,
        }
      },
      maintenance: {
        intervention:{
          getMaintenanceInterventions: getMaintenanceInterventions,
          getDiagnosticDetail: getDiagnosticDetail,
          createDiagnostic: createDiagnostic,
          createIntervention: createIntervention,
          closeIntervention: closeIntervention,
          addPieceToIntervention: addPieceToIntervention
        },
        piecesRechange: {
          getPiecesRechange: getPiecesRechange,
          getInventoryList: getInventoryList,
          addInventory: addInventory,
          getInventoryHistoric: getInventoryHistoric,
          searchPieceName:searchPieceName
        },
        reparator: {
          getReparators: getReparators
        },
        pneumatique: {
          getPneus:getPneus,
          createPneu: createPneu,
          getPneu: getPneu,
          affectPneu: affectPneu,
          desaffectPneu: desaffectPneu,
          updatePneu: updatePneu,
          deletePneu: deletePneu,
        },
        planning: {
          getPlannings: getPlannings,
          addPlanning: addPlanning,
          accomplishPlanning: accomplishPlanning,
          updatePlanning: updatePlanning,
          deletePlanning: deletePlanning,
        },
        category: {
          getCategories: getCategories,
          addCategory: addCategory,
          updateCategory: updateCategory,
          deleteCategory: deleteCategory,
        },
        demandePiece: {
          getDemandePiecesList: getDemandePiecesList,
          getDemandePiecesHistoric: getDemandePiecesHistoric,
          getDemandePiecesDetail: getDemandePiecesDetail,
          getDemandePiecesBonCommande: getDemandePiecesBonCommande,
          getDemandePiecesBon: getDemandePiecesBon,
          generateDemandePiecesBonAchat: generateDemandePiecesBonAchat,
          getDemandePiecesBonSortie: getDemandePiecesBonSortie,
          CompleteDemandePiecesCommande: CompleteDemandePiecesCommande,
          addDemandePiecesattachment: addDemandePiecesattachment
        }
      },
      reglement: {
        getModeReglementList:getModeReglementList,
      },
      expense: {
        getNatures: getNatures,
        addNature: addNature,
        getSuppliers: getSuppliers,
        addSupplier: addSupplier,
        deleteSupplier: deleteSupplier,
        deleteNature: deleteNature
      }


    };
  }
}
