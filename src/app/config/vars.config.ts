// LocalStorage Variables name
export const USER_SlUG = '_current';
export const TOKEN_SlUG = '_token';
export const CRYPT_KEY = 'someKey123';

export const ERROR_MSG_500 =
  'Le site Web a rencontré une erreur inattendue. Veuillez essayer de nouveau plus tard';
export const DEMO_login = {
  email: '',
  password: '',
};

export const DETAILS_COMPLAINT = {
  Expedition: {
    name: 'expeditions',
    label: 'Expédition',
  },
  Invoice: {
    name: 'invoices',
    label: 'Facture',
  },
  Package: {
    name: 'packages',
    label: 'Colis',
  },
  ReturnDocument: {
    name: 'return_document',
    label: 'Retour de document',
  },
  General: {
    label: 'Générale',
  },
};

export const COMPLAINT_STATUS = {
  CREATED: {
    name: 'Soumis',
    id: 0,
    color: 'badge-info',
    last: false,
  },
  IN_PROGRESS: {
    name: 'En cours de traitement',
    id: 1,
    color: 'badge-warning',
    last: false,
  },
  FINISHED: {
    name: 'Cloturé',
    id: 2,
    color: 'badge-success',
    last: true,
    type: 'sucess',
  },
  UNSOLVED: {
    name: 'Non résolue',
    id: 3,
    color: 'badge-danger',
    last: true,
    type: 'error',
  },
};

export const TASK_STATUS = {
  OPEN: {
    name: 'A faire',
    id: 0,
    color: 'badge-info',
  },
  IN_PROGRESS: {
    name: 'En cours de traitement',
    id: 1,
    color: 'badge-warning',
  },
  UNSOLVED: {
    name: 'Non résolue',
    id: 2,
    color: 'badge-danger',
  },
  DONE: {
    name: 'Résolue',
    id: 2,
    color: 'badge-success',
  },
};

export const RETURN_DOCUMENT_STATUS = {
  CREATED: {
    name: 'Créé',
    id: 0,
    color: 'badge-info',
  },
  IN_PROGRESS: {
    name: 'En cours de traitement',
    id: 1,
    color: 'badge-warning',
  },
  SCANNED: {
    name: 'Scanné',
    id: 2,
    color: 'badge-success',
  },
};
