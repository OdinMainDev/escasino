const themeHasTopGames: boolean = import.meta.env.VITE_THEME_HAS_TOP_GAMES //чтобы использовать эти env надо добавить VITE в начале названия
  ? import.meta.env.VITE_THEME_HAS_TOP_GAMES == 'true'
  : false;

export { themeHasTopGames };
