'use client';

import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import amCommon from '../../public/locales/am/common.json';
import arCommon from '../../public/locales/ar/common.json';
import enCommon from '../../public/locales/en/common.json';
import ruCommon from '../../public/locales/ru/common.json';
import { getOptions } from './settings';

// Initialize i18next only on the client side
i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    ...getOptions(),
    debug: false, // Disable debug mode
    detection: {
      caches: ['localStorage', 'cookie'],
      order: ['querystring', 'localStorage', 'cookie', 'navigator', 'htmlTag', 'path', 'subdomain'],
    },
    resources: {
      en: { common: enCommon },
      am: { common: amCommon },
      ar: { common: arCommon },
      ru: { common: ruCommon },
    },
  });

export default i18next;
