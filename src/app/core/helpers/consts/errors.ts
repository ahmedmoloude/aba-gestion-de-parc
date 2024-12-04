/**
 * objet des erreurs
 * @type {{field: string; required: string; minlength: string; maxlength: string; email: string; number: string; string: string; text: string; alphanum: string; mismatch: string; pattern: string; exist: string; caracters: string}}
 */
// Liste des errors selon les types utilisée pour error pipe
export const ERRORS = {
  field: '',
  required: 'Le champ est obligatoire',
  obligatoire: 'Champ obligatoire',
  minlength: 'Le champ doit avoir au minimum {$var} caractaires',
  maxlength: 'Le champ doit avoir au maximum  caractaires',
  email:
    'Le champ doit avoir une adresse email valide comme <span class="badge badge-light">ex@example.net</span>',
  number:
    'Le champ doit être numérique comme <span class="badge badge-light">745</span>',
  string: 'Le champ doit être une chaîne de caractères',
  name: 'Le champ doit être une chaîne de caractères comme <span class="badge badge-light">text</span>',
  password:
    'Le champ doit être une chaîne de caractères comme <span class="badge badge-light">aaa4AA</span>',
  text: 'Le champ doit être une chaîne de caractères',
  alphanum: 'Le champ doit être alphanumérique',
  mismatch: "Le champ n'est pas identique a la valeur saisie précédemment",
  pattern: 'Le champ doit respecter le format précisé, exemple :',
  exist: 'Le champ contient une valeur existante',
  caracters: ' ',
  extension: 'Selectionner une image (png,gif, jpeg,jpg)',
  no_results: 'Sin resultados',
  assign_calcul: 'Error de cálculo (distancia y duración)',
  /*Custom validators :*/
  date: 'Le champ doit avoir une date valide',
  min: 'Le champ doit avoir au minimum ',
  max: 'Le champ doit avoir au maximum ',
};
