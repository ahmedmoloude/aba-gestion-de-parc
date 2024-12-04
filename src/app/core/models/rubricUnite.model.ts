export interface RubricUnite {
  min_max_unite: string;
  is_coef_usable: boolean;
  value_unite: string;
  value_sup_unite: string;
}

const rubrics = [
  'BL',
  'FACTURE',
  'POINT_DECHARGEMENT',
  'REMBOURSEMENT',
  'TRAITE',
  'CHEQUE',
  'ADV',
  'TRANSPALETTE',
  'RETOUR_PALETTE',
  'DROIT_DE_TIMBRE',
  'DROIT_FIXE',
  'DROIT_VARIABLE',

  // "TRANSPORT",
  // "MANUTENTION",
  // "IMMOBILISATION",
];

export function getUnitsByrubric(rubric: string): RubricUnite {
  let rubricUnite: RubricUnite;

  switch (rubric) {
    case 'ADV':
      rubricUnite = {
        min_max_unite: 'DH',
        is_coef_usable: true,
        value_unite: 'DH',
        value_sup_unite: 'DH',
      };
      break;
    case 'BL':
      rubricUnite = {
        min_max_unite: 'NB BL',
        is_coef_usable: false,
        value_unite: 'BL',
        value_sup_unite: 'BL',
      };
      break;

    case 'FACTURE':
      rubricUnite = {
        min_max_unite: 'NB Facture',
        is_coef_usable: false,
        value_unite: 'Facture',
        value_sup_unite: 'Facture',
      };
      break;
    case 'REMBOURSEMENT':
      rubricUnite = {
        min_max_unite: 'DH',
        is_coef_usable: true,
        value_unite: 'DH',
        value_sup_unite: 'DH',
      };
      break;
    case 'TRAITE':
      rubricUnite = {
        min_max_unite: 'DH',
        is_coef_usable: true,
        value_unite: 'DH',
        value_sup_unite: 'DH',
      };
      break;

    case 'CHEQUE':
      rubricUnite = {
        min_max_unite: 'DH',
        is_coef_usable: true,
        value_unite: 'DH',
        value_sup_unite: 'DH',
      };
      break;

    case 'TRANSPALETTE':
      rubricUnite = {
        min_max_unite: 'Transpalette',
        is_coef_usable: false,
        value_unite: 'DH',
        value_sup_unite: 'DH',
      };
      break;

    case 'RETOUR_PALETTE':
      rubricUnite = {
        min_max_unite: 'Palette',
        is_coef_usable: false,
        value_unite: 'DH',
        value_sup_unite: 'DH',
      };
      break;
    case 'DROIT_DE_TIMBRE':
      rubricUnite = {
        min_max_unite: 'DH',
        is_coef_usable: false,
        value_unite: 'DH',
        value_sup_unite: 'DH',
      };
      break;

    case 'DROIT_FIXE':
      rubricUnite = {
        min_max_unite: 'DH',
        is_coef_usable: false,
        value_unite: 'DH',
        value_sup_unite: 'DH',
      };
      break;

    case 'DROIT_VARIABLE':
      rubricUnite = {
        min_max_unite: 'DH',
        is_coef_usable: false,
        value_unite: 'DH',
        value_sup_unite: 'DH',
      };
      break;
    default:
    rubricUnite = {
        min_max_unite: "DH",
        is_coef_usable: true,
        value_unite: "DH",
        value_sup_unite: "DH"
    };
  }

  return rubricUnite;
}
