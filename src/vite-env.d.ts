/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_BASE_DOMAIN: string;
  readonly VITE_APP_CASINO_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
