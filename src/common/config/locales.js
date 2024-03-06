// TODO: исправить ошибку

export const defaultLanguages = import.meta.env.DEFAULT_LANGUAGES
  ? import.meta.env.DEFAULT_LANGUAGES.split(',')
  : ['en', 'ru'];
  
export const defaultLanguage = import.meta.env.DEFAULT_LANGUAGE
  ? import.meta.env.DEFAULT_LANGUAGE
  : 'ru';
