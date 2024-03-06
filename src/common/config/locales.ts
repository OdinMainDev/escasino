// TODO: исправить ошибки

const defaultLanguages: string[] = import.meta.env.DEFAULT_LANGUAGES
  ? import.meta.env.DEFAULT_LANGUAGES.split(',')
  : ['en', 'ru'];

const defaultLanguage: string = import.meta.env.DEFAULT_LANGUAGE
  ? import.meta.env.DEFAULT_LANGUAGE
  : 'ru';

export { defaultLanguages, defaultLanguage };
