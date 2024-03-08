const languages = (import.meta.env.VITE_DEFAULT_LANGUAGES as string).split(',');
const defaultLanguages: string[] = languages.length > 0 ? languages : ['ru', 'en'];
const defaultLanguage: string = (import.meta.env.VITE_DEFAULT_LANGUAGE as string) ?? 'ru';

export { defaultLanguages, defaultLanguage };
