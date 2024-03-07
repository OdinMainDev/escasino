// TODO: import.meta.env.THEME_HAS_TOP_GAMES - undefined ( исправить этот момент )
const themeHasTopGames: boolean = import.meta.env.THEME_HAS_TOP_GAMES
  ? import.meta.env.THEME_HAS_TOP_GAMES == 'true'
  : false;

export { themeHasTopGames };
