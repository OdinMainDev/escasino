export const isAppDebug: boolean = import.meta.env.VITE_APP_DEBUG
  ? import.meta.env.VITE_APP_DEBUG == 'true'
  : false;

export const gamesHeaderTypeCover = (import.meta.env.VITE_GAME_HEADER as string) === 'cover'; // classic or cover
