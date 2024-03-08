// TODO: исправить ошибки

// Исправил
const languages = import.meta.env.VITE_DEFAULT_LANGUAGES as string;
const defaultLanguages: string[] = languages.split(',');

const defaultLanguage: string = (import.meta.env.VITE_DEFAULT_LANGUAGE as string) ?? 'ru';

export { defaultLanguages, defaultLanguage };
