const themeHasTopGames: boolean = import.meta.env.THEME_HAS_TOP_GAMES
  ? import.meta.env.THEME_HAS_TOP_GAMES == 'true'
  : true;

export { themeHasTopGames };
