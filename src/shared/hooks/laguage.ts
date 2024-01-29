import { useState, useEffect } from 'react';

const useLanguageFromUrl = (): string | null => {
  const [language, setLanguage] = useState<string | null>(null);

  useEffect(() => {
    const urlPath = window.location.pathname;
    const languageCode = urlPath.split('/')[1];

    if (/^[a-zA-Z]{2}$/.test(languageCode)) {
      setLanguage(languageCode);
    }
  }, [window.location.pathname]);

  return language;
};

export default useLanguageFromUrl;
