// TODO: исправить ошибки

const defaultLanguages: string[] = import.meta.env.VITE_DEFAULT_LANGUAGES
  ? import.meta.env.VITE_DEFAULT_LANGUAGES.split(',')
  : ['en', 'ru'];

const defaultLanguage: string = import.meta.env.VITE_DEFAULT_LANGUAGE
  ? import.meta.env.VITE_DEFAULT_LANGUAGE
  : 'ru';

export { defaultLanguages, defaultLanguage };
