'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate: {
        TranslateElement: new (
          options: { pageLanguage: string; autoDisplay: boolean; includedLanguages: string },
          elementId: string
        ) => void;
      };
    };
  }
}

function suppressToolbar() {
  // Hide the injected iframe toolbar
  document.querySelectorAll<HTMLElement>('.goog-te-banner-frame, .skiptranslate iframe').forEach(el => {
    el.style.display = 'none';
  });
  // Remove the top offset Google pushes onto body
  document.body.style.top = '0px';
  document.documentElement.style.setProperty('top', '0px', 'important');
}

export function GoogleTranslateProvider() {
  useEffect(() => {
    if (document.getElementById('google-translate-script')) return;

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: 'en', autoDisplay: false, includedLanguages: 'en,am,ar,ru' },
        'google_translate_element'
      );
      // Run immediately after init
      suppressToolbar();
    };

    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    // Watch for Google's toolbar being injected / re-injected
    const observer = new MutationObserver(() => suppressToolbar());
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['style'] });

    return () => observer.disconnect();
  }, []);

  return <div id="google_translate_element" className="hidden" />;
}

export function changeGoogleLanguage(langCode: string) {
  const combo = document.querySelector<HTMLSelectElement>('.goog-te-combo');
  if (combo) {
    combo.value = langCode;
    combo.dispatchEvent(new Event('change'));
    // Suppress toolbar again after language change triggers re-render
    setTimeout(suppressToolbar, 100);
    setTimeout(suppressToolbar, 500);
  }
}
