export const isAppDebug: boolean = import.meta.env.VITE_APP_DEBUG
  ? import.meta.env.VITE_APP_DEBUG == 'true'
  : false;
