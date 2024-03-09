const themeHasTopGames: boolean = import.meta.env.VITE_THEME_HAS_TOP_GAMES
  ? import.meta.env.VITE_THEME_HAS_TOP_GAMES == 'true'
  : false;

export { themeHasTopGames };
