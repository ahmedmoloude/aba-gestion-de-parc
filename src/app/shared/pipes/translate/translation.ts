// app/translate/translation.ts

import { InjectionToken } from '@angular/core';

// import translations
//import { LANG_EN_NAME, LANG_EN_TRANS } from './lang-en';
import { LANG_FR_NAME, LANG_FR_TRANS } from './lang-fr';
import { LANG_ES_NAME, LANG_ES_TRANS } from './lang-es';

// translation token
export const TRANSLATIONS = new InjectionToken('translations');

// all translations
const dictionary = {
  //"en": LANG_EN_TRANS,
  fr: LANG_FR_TRANS,
  es: LANG_ES_TRANS,
};

// providers
export const TRANSLATION_PROVIDERS = [
  { provide: TRANSLATIONS, useValue: dictionary },
];
